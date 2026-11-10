import * as THREE from 'three';

const D2R = Math.PI / 180;
const sm = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); };

// Sun position for Tashkent (41.3° N, 69.2° E, UTC+5). Returns degrees; azimuth from north, clockwise.
export function sunAngles(hour, doy) {
  const lat = 41.3 * D2R;
  const decl = 23.44 * D2R * Math.sin(2 * Math.PI * (284 + doy) / 365);
  const H = ((((hour % 24) + 24) % 24) - 0.38 - 12) * 15 * D2R; // solar noon is about 12:23 local time
  const sinEl = Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(H);
  const el = Math.asin(sinEl);
  let c = (Math.sin(decl) - sinEl * Math.sin(lat)) / (Math.cos(el) * Math.cos(lat));
  c = Math.max(-1, Math.min(1, c));
  let az = Math.acos(c);
  if (H > 0) az = 2 * Math.PI - az;
  return { el: el / D2R, az: az / D2R };
}

// Scene axes: east is +x, north is −z.
export function dirFromAngles(el, az, out) {
  const e = el * D2R, a = az * D2R;
  return out.set(Math.cos(e) * Math.sin(a), Math.sin(e), -Math.cos(e) * Math.cos(a));
}

// Hours of direct sun on a south-facing window (normal +z) on a given day.
export function directSunHours(doy) {
  const v = new THREE.Vector3();
  let hrs = 0;
  for (let h = 4; h < 21; h += 0.05) {
    const s = sunAngles(h, doy);
    if (s.el > 4 && dirFromAngles(s.el, s.az, v).z / Math.cos(s.el * D2R) > 0.17) hrs += 0.05;
  }
  return Math.round(hrs * 2) / 2;
}

const C = (h) => new THREE.Color(h);
const P = {
  topN: C('#070d1c'), topT: C('#24365f'), topD: C('#4a7fc0'),
  horN: C('#121a2c'), horG: C('#f0a06a'), horD: C('#cfdeeb'),
  sunG: C('#ff9a52'), sunD: C('#fff1dc'),
  hemiN: C('#26314d'), hemiD: C('#c7d9ec'),
  grN: C('#121110'), grD: C('#6e6550'),
};

export function newSkyState() {
  return {
    top: new THREE.Color(), hor: new THREE.Color(), fog: new THREE.Color(), sunCol: new THREE.Color(),
    hemiSky: new THREE.Color(), hemiGround: new THREE.Color(),
    sunInt: 0, hemiInt: 0, envInt: 0, night: 0, stars: 0, sunVis: 0, exposure: 1,
  };
}

// Everything about the light follows from the sun's elevation, so the story clock and the
// visitor's sun slider always produce a consistent sky.
export function skyState(el, o) {
  o.top.copy(P.topN).lerp(P.topT, sm(-15, -3, el)).lerp(P.topD, sm(-2, 24, el));
  o.hor.copy(P.horN).lerp(P.horG, sm(-11, -0.5, el)).lerp(P.horD, sm(3, 26, el));
  o.sunCol.copy(P.sunG).lerp(P.sunD, sm(1, 32, el));
  o.sunInt = 3.25 * sm(-1.5, 10, el);
  o.hemiSky.copy(P.hemiN).lerp(P.hemiD, sm(-6, 20, el));
  o.hemiGround.copy(P.grN).lerp(P.grD, sm(-6, 20, el));
  o.hemiInt = 0.26 + 0.5 * sm(-10, 18, el);
  o.envInt = 0.22 + 0.68 * sm(-9, 14, el);
  o.night = sm(4, -7, el);
  o.stars = sm(-5, -14, el);
  o.sunVis = sm(-3, 0.5, el);
  o.exposure = 0.84 + 0.56 * o.night;
  o.fog.copy(o.hor).lerp(o.top, 0.18);
  return o;
}

export function makeSky() {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTop: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uGround: { value: new THREE.Color() },
      uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uSunCol: { value: new THREE.Color() }, uSunVis: { value: 1 },
    },
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main(){
        vDir = position;
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uTop, uHor, uGround, uSunDir, uSunCol; uniform float uSunVis;
      varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = mix(uHor, uTop, pow(clamp(h, 0.0, 1.0), 0.42));
        c = mix(c, uGround, smoothstep(0.0, -0.06, h));
        float s = max(dot(d, uSunDir), 0.0);
        c += uSunCol * uSunVis * (pow(s, 1400.0) * 30.0 + pow(s, 14.0) * 0.32 + pow(s, 3.0) * 0.10);
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    side: THREE.BackSide, depthWrite: false, depthTest: true, fog: false,
  });
  const geo = new THREE.SphereGeometry(1, 48, 24);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.setScalar(6000);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;

  // Second copy for baking the reflection map.
  const envScene = new THREE.Scene();
  const envMesh = new THREE.Mesh(geo, mat);
  envMesh.scale.setScalar(100);
  envScene.add(envMesh);

  // Stars
  const n = 900, pos = new Float32Array(n * 3);
  let s = 7;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    const u = rnd() * 2 * Math.PI, v = 0.06 + rnd() * 0.94;
    const r = Math.sqrt(1 - v * v);
    pos.set([Math.cos(u) * r * 5500, v * 5500, Math.sin(u) * r * 5500], i * 3);
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xdfe8ff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, fog: false, depthWrite: false });
  const stars = new THREE.Points(sg, starMat);
  stars.frustumCulled = false;
  stars.renderOrder = -9;

  function update(S, sunDir) {
    const u = mat.uniforms;
    u.uTop.value.copy(S.top);
    u.uHor.value.copy(S.hor);
    u.uGround.value.copy(S.hor).multiplyScalar(0.72);
    u.uSunDir.value.copy(sunDir);
    u.uSunCol.value.copy(S.sunCol);
    u.uSunVis.value = S.sunVis;
    starMat.opacity = S.stars * 0.9;
    stars.visible = S.stars > 0.01;
  }

  return { mesh, stars, envScene, update };
}
