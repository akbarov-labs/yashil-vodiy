import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// The district around the complex: a 1.8 km grid of streets, white massing buildings,
// trees, traffic, street lights, points of interest and the mountains to the north-east.

export const HALF = 900;
const ROADS = [-700, -500, -300, -100, 100, 300, 500, 700];
const BLOCKS = [-800, -600, -400, -200, 0, 200, 400, 600, 800];
const SPECIAL = { '0,0': 'plot', '0,200': 'park', '-200,200': 'park', '-200,-200': 'school', '400,-400': 'mall', '400,200': 'metro' };

export function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export const POI = {
  metro: { pos: new THREE.Vector3(318, 0, 118), key: 'poi.metro', sub: 'poi.metroT', icon: 'M' },
  school: { pos: new THREE.Vector3(-200, 0, -228), key: 'poi.school', sub: 'poi.schoolT', icon: 'school' },
  park: { pos: new THREE.Vector3(-90, 0, 190), key: 'poi.park', sub: 'poi.parkT', icon: 'park' },
  mall: { pos: new THREE.Vector3(400, 0, -410), key: 'poi.mall', sub: 'poi.mallT', icon: 'mall' },
};

const ROUTE_PATHS = [
  [[88, 40], [100, 40], [100, 100], [318, 100], [318, 110]],
  [[-88, -30], [-100, -30], [-100, -100], [-200, -100], [-200, -200]],
  [[-20, 88], [-20, 100], [-60, 100], [-90, 150]],
  [[88, -20], [100, -20], [100, -300], [400, -300], [400, -350]],
];

function std(color, rough = 0.9, metal = 0, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...extra });
}

function nonIndexed(g) { return g.index ? g.toNonIndexed() : g; }

function groundTexture(maxAniso) {
  const N = 2048, S = N / (HALF * 2);
  const cv = document.createElement('canvas'); cv.width = cv.height = N;
  const g = cv.getContext('2d');
  const X = (x) => (x + HALF) * S, Z = (z) => (z + HALF) * S;
  const R = rng(11);
  g.fillStyle = '#a5a592'; g.fillRect(0, 0, N, N);

  for (const bx of BLOCKS) for (const bz of BLOCKS) {
    const type = SPECIAL[bx + ',' + bz] || 'city';
    g.fillStyle = '#c3bcad'; g.fillRect(X(bx - 90), Z(bz - 90), 180 * S, 180 * S);
    const ix = bx - 85, iz = bz - 85, iw = 170;
    if (type === 'park') {
      g.fillStyle = '#6a874c'; g.fillRect(X(ix), Z(iz), iw * S, iw * S);
      for (let i = 0; i < 260; i++) { g.fillStyle = R() < 0.5 ? 'rgba(48,80,40,.35)' : 'rgba(140,170,95,.25)'; const r = (3 + R() * 9) * S; g.beginPath(); g.arc(X(ix + R() * iw), Z(iz + R() * iw), r, 0, 7); g.fill(); }
      g.strokeStyle = '#d4cab3'; g.lineWidth = 3.2 * S;
      g.beginPath(); g.moveTo(X(ix), Z(bz + 10)); g.bezierCurveTo(X(bx - 30), Z(bz - 60), X(bx + 30), Z(bz + 60), X(ix + iw), Z(bz - 10)); g.stroke();
      g.beginPath(); g.moveTo(X(bx - 20), Z(iz)); g.bezierCurveTo(X(bx + 40), Z(bz - 20), X(bx - 40), Z(bz + 30), X(bx + 10), Z(iz + iw)); g.stroke();
    } else if (type === 'plot') {
      g.fillStyle = '#cfc7b8'; g.fillRect(X(ix), Z(iz), iw * S, iw * S);
    } else if (type === 'mall') {
      g.fillStyle = '#5d6062'; g.fillRect(X(ix), Z(iz), iw * S, iw * S);
      g.fillStyle = 'rgba(235,235,230,.55)';
      for (let r = 0; r < 6; r++) for (let c = 0; c < 34; c++) g.fillRect(X(ix + 6 + c * 4.6), Z(bz + 30 + r * 9), 0.25 * S, 5 * S);
    } else if (type === 'school') {
      g.fillStyle = '#aeab98'; g.fillRect(X(ix), Z(iz), iw * S, iw * S);
      g.fillStyle = '#b0573a'; g.beginPath(); g.ellipse(X(bx + 30), Z(bz + 40), 40 * S, 26 * S, 0, 0, 7); g.fill();
      g.fillStyle = '#5f8f4a'; g.beginPath(); g.ellipse(X(bx + 30), Z(bz + 40), 33 * S, 19 * S, 0, 0, 7); g.fill();
    } else {
      g.fillStyle = '#aeac9a'; g.fillRect(X(ix), Z(iz), iw * S, iw * S);
      for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(110,135,80,.55)'; g.fillRect(X(ix + 20 + R() * 110), Z(iz + 20 + R() * 110), (14 + R() * 30) * S, (10 + R() * 26) * S); }
      for (let i = 0; i < 3; i++) { g.fillStyle = 'rgba(95,97,100,.6)'; g.fillRect(X(ix + 10 + R() * 130), Z(iz + 10 + R() * 130), (12 + R() * 20) * S, (8 + R() * 12) * S); }
    }
  }
  // speckle noise so flat areas read as material, not paint
  for (let i = 0; i < 26000; i++) { g.fillStyle = R() < 0.5 ? 'rgba(0,0,0,.05)' : 'rgba(255,255,255,.05)'; g.fillRect(R() * N, R() * N, 1.5, 1.5); }
  // roads
  g.fillStyle = '#45474a';
  for (const r of ROADS) { g.fillRect(X(r - 10), 0, 20 * S, N); g.fillRect(0, Z(r - 10), N, 20 * S); }
  g.strokeStyle = 'rgba(232,228,214,.6)'; g.lineWidth = 1; g.setLineDash([5, 7]);
  for (const r of ROADS) { g.beginPath(); g.moveTo(X(r), 0); g.lineTo(X(r), N); g.stroke(); g.beginPath(); g.moveTo(0, Z(r)); g.lineTo(N, Z(r)); g.stroke(); }
  g.setLineDash([]);
  g.fillStyle = 'rgba(238,236,228,.8)';
  for (const rx of ROADS) for (const rz of ROADS) {
    for (let k = -8; k <= 8; k += 2) {
      g.fillRect(X(rx + k), Z(rz - 14), 1 * S, 3.5 * S); g.fillRect(X(rx + k), Z(rz + 10.5), 1 * S, 3.5 * S);
      g.fillRect(X(rx - 14), Z(rz + k), 3.5 * S, 1 * S); g.fillRect(X(rx + 10.5), Z(rz + k), 3.5 * S, 1 * S);
    }
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAniso;
  return tex;
}

// White massing buildings with windows drawn procedurally in the shader, so any box size works.
function windowMaterial(color) {
  const mat = std(color, 0.82);
  mat.userData.uNight = { value: 0 };
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uNight = mat.userData.uNight;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos; varying vec3 vWNrm;')
      .replace('#include <project_vertex>', `#include <project_vertex>
        vec4 wp4 = vec4(transformed, 1.0);
        vec3 wn = objectNormal;
        #ifdef USE_INSTANCING
          wp4 = instanceMatrix * wp4; wn = mat3(instanceMatrix) * wn;
        #endif
        wp4 = modelMatrix * wp4; vWPos = wp4.xyz; vWNrm = normalize(mat3(modelMatrix) * wn);`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos; varying vec3 vWNrm; uniform float uNight;')
      .replace('#include <color_fragment>', `#include <color_fragment>
        float isWall = 1.0 - step(0.5, abs(vWNrm.y));
        float uu = abs(vWNrm.x) > 0.5 ? vWPos.z : vWPos.x;
        vec2 cell = vec2(uu / 3.2, vWPos.y / 3.0);
        vec2 fc = fract(cell);
        float win = step(0.2, fc.x) * step(fc.x, 0.8) * step(0.3, fc.y) * step(fc.y, 0.85) * isWall * step(2.8, vWPos.y);
        float aa = clamp(1.6 - length(fwidth(cell)) * 2.2, 0.0, 1.0);
        float winA = mix(0.27 * isWall, win, aa);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.34, 0.39, 0.44), winA * 0.55);`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        vec2 wid = floor(cell) + floor(vWPos.xz * 0.031) * 17.0;
        float hh = fract(sin(dot(wid, vec2(12.9898, 78.233))) * 43758.5453);
        float lit = step(hh, 0.24);
        totalEmissiveRadiance += vec3(1.0, 0.72, 0.42) * winA * mix(0.4, lit, aa) * uNight * (0.6 + 0.8 * fract(hh * 13.0)) * 1.15;`);
  };
  return mat;
}

function treeGeometry() {
  const parts = [];
  const tint = (g, c) => { g = nonIndexed(g); const col = new THREE.Color(c); const n = g.attributes.position.count; const a = new Float32Array(n * 3); for (let i = 0; i < n; i++) a.set([col.r, col.g, col.b], i * 3); g.setAttribute('color', new THREE.BufferAttribute(a, 3)); return g; };
  parts.push(tint(new THREE.CylinderGeometry(0.16, 0.26, 3.0, 6).translate(0, 1.5, 0), '#4a3a2c'));
  parts.push(tint(new THREE.IcosahedronGeometry(1, 1).scale(2.3, 1.9, 2.3).translate(0, 4.3, 0), '#ffffff'));
  parts.push(tint(new THREE.IcosahedronGeometry(1, 1).scale(1.6, 1.4, 1.6).translate(0.8, 5.6, -0.4), '#f2f6ee'));
  return mergeGeometries(parts);
}

export function buildCity({ eco, maxAniso }) {
  const group = new THREE.Group();
  const R = rng(42);
  const night = { value: 0 };

  // ground
  const groundTex = groundTexture(maxAniso);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, HALF * 2), std('#ffffff', 0.96, 0, { map: groundTex }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
  group.add(ground);
  const outer = new THREE.Mesh(new THREE.PlaneGeometry(40000, 40000), std('#a6a690', 1));
  outer.rotation.x = -Math.PI / 2; outer.position.y = -3; outer.receiveShadow = false;
  group.add(outer);

  // context buildings
  const boxes = [];
  for (const bx of BLOCKS) for (const bz of BLOCKS) {
    const type = SPECIAL[bx + ',' + bz];
    if (type === 'plot' || type === 'park' || type === 'mall' || type === 'school') continue;
    const near = Math.max(Math.abs(bx), Math.abs(bz));
    const style = R();
    if (style < 0.45) { // perimeter rows of five-storey slabs (typical older block)
      const fl = 5 + (R() < 0.3 && near > 200 ? 4 : 0);
      for (const side of [0, 1, 2, 3]) {
        let s = -70;
        while (s < 60) {
          const len = 34 + R() * 26; if (s + len > 72) break;
          const c = s + len / 2;
          const off = 66 - R() * 6;
          const b = side === 0 ? [bx + c, bz - off, len, 12] : side === 1 ? [bx + c, bz + off, len, 12] : side === 2 ? [bx - off, bz + c, 12, len] : [bx + off, bz + c, 12, len];
          if (!(type === 'metro' && b[0] < bx - 40 && b[1] < bz - 40)) boxes.push([...b, fl * 3]);
          s += len + 10 + R() * 12;
        }
      }
    } else { // newer towers
      const n = 3 + Math.floor(R() * 4);
      for (let i = 0; i < n; i++) {
        const x = bx - 55 + R() * 110, z = bz - 55 + R() * 110;
        if (type === 'metro' && x < bx - 30 && z < bz - 30) continue;
        const fl = near <= 200 ? Math.round(6 + R() * 5) : Math.round(8 + R() * 12);
        const w = 16 + R() * 10, d = 16 + R() * 14;
        if (boxes.some(o => Math.abs(o[0] - x) < (o[2] + w) / 2 + 6 && Math.abs(o[1] - z) < (o[3] + d) / 2 + 6)) continue;
        boxes.push([x, z, w, d, fl * 3]);
      }
    }
  }
  // school and mall buildings
  boxes.push([-245, -235, 60, 16, 9], [-268, -195, 14, 50, 9], [-222, -195, 14, 50, 9]);
  const ctxMat = windowMaterial('#ebe6dc');
  ctxMat.userData.uNight = night;
  const unitBox = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const ctx = new THREE.InstancedMesh(unitBox, ctxMat, boxes.length);
  const m4 = new THREE.Matrix4();
  boxes.forEach((b, i) => { m4.makeScale(b[2], b[4], b[3]).setPosition(b[0], 0, b[1]); ctx.setMatrixAt(i, m4); });
  ctx.castShadow = true; ctx.receiveShadow = true;
  group.add(ctx);

  // mall
  const mall = new THREE.Group();
  const mallBody = new THREE.Mesh(unitBox, windowMaterial('#ddd8ce'));
  mallBody.material.userData.uNight = night;
  mallBody.scale.set(130, 18, 80); mallBody.position.set(400, 0, -440);
  const mallGlass = new THREE.Mesh(unitBox, std('#9fb4bf', 0.08, 1));
  mallGlass.scale.set(132, 6, 82); mallGlass.position.set(400, 6, -440);
  mallBody.castShadow = mallGlass.castShadow = true;
  mall.add(mallBody, mallGlass);
  group.add(mall);

  // metro pavilion
  const metro = new THREE.Group();
  const glassMat = std('#a9bfca', 0.06, 1);
  const pav = new THREE.Mesh(unitBox, glassMat); pav.scale.set(16, 4.2, 10); pav.position.set(318, 0, 118);
  const roof = new THREE.Mesh(unitBox, std('#e9e4da', 0.7)); roof.scale.set(19, 0.6, 13); roof.position.set(318, 4.2, 118);
  const mcv = document.createElement('canvas'); mcv.width = mcv.height = 128;
  const mg = mcv.getContext('2d'); mg.fillStyle = '#1f5fbf'; mg.beginPath(); mg.arc(64, 64, 60, 0, 7); mg.fill();
  mg.fillStyle = '#fff'; mg.font = 'bold 84px Onest, Arial, sans-serif'; mg.textAlign = 'center'; mg.textBaseline = 'middle'; mg.fillText('M', 64, 70);
  const mtex = new THREE.CanvasTexture(mcv); mtex.colorSpace = THREE.SRGBColorSpace;
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), new THREE.MeshBasicMaterial({ map: mtex, transparent: true }));
  sign.position.set(309, 7.5, 124.2);
  const pole = new THREE.Mesh(unitBox, std('#2a2d30', 0.5)); pole.scale.set(0.25, 6, 0.25); pole.position.set(309, 0, 124);
  pav.castShadow = roof.castShadow = true;
  metro.add(pav, roof, sign, pole);
  group.add(metro);

  // park pond
  const water = new THREE.Mesh(new THREE.CircleGeometry(1, 48), std('#3b6c7d', 0.06, 0.3));
  water.rotation.x = -Math.PI / 2; water.scale.set(46, 26, 1); water.position.set(-150, 0.3, 215);
  group.add(water);

  // trees
  const trees = [];
  const step = eco ? 34 : 17;
  for (const r of ROADS) {
    for (let s = -HALF + 8; s < HALF; s += step) {
      if (ROADS.some(q => Math.abs(q - s) < 16)) continue;
      for (const side of [-1, 1]) {
        const j = (R() - 0.5) * 3;
        trees.push([r + side * 12.5, s + j, 0.75 + R() * 0.45]);
        trees.push([s + j, r + side * 12.5, 0.75 + R() * 0.45]);
      }
    }
  }
  for (const [px, pz] of [[0, 200], [-200, 200]]) {
    for (let i = 0; i < (eco ? 120 : 280); i++) {
      const x = px - 82 + R() * 164, z = pz - 82 + R() * 164;
      if (((x + 150) / 52) ** 2 + ((z - 215) / 32) ** 2 < 1) continue;
      trees.push([x, z, 0.9 + R() * 0.7]);
    }
  }
  for (const bx of BLOCKS) for (const bz of BLOCKS) {
    const type = SPECIAL[bx + ',' + bz];
    if (type === 'plot' || type === 'park') continue;
    for (let i = 0; i < (eco ? 4 : 10); i++) {
      const x = bx - 80 + R() * 160, z = bz - 80 + R() * 160;
      if (boxes.some(o => Math.abs(o[0] - x) < o[2] / 2 + 3 && Math.abs(o[1] - z) < o[3] / 2 + 3)) continue;
      if (type === 'mall' && Math.abs(z - (bz - 40)) < 45) continue;
      trees.push([x, z, 0.8 + R() * 0.5]);
    }
  }
  const treeMat = std('#ffffff', 0.92, 0, { vertexColors: true });
  const treeMesh = new THREE.InstancedMesh(treeGeometry(), treeMat, trees.length);
  const q = new THREE.Quaternion(), p = new THREE.Vector3(), sc = new THREE.Vector3(), col = new THREE.Color();
  const greens = ['#5f7f3f', '#6b8a45', '#557437', '#7a9450', '#4f6e3a'].map(c => new THREE.Color(c));
  trees.forEach((tr, i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), R() * 6.28);
    m4.compose(p.set(tr[0], 0, tr[1]), q, sc.setScalar(tr[2]));
    treeMesh.setMatrixAt(i, m4);
    treeMesh.setColorAt(i, col.copy(greens[i % 5]).multiplyScalar(0.85 + R() * 0.3));
  });
  treeMesh.castShadow = !eco; treeMesh.receiveShadow = true;
  group.add(treeMesh);

  // street lights: poles by day, glowing heads by night
  const lamps = [];
  for (const r of ROADS) for (let s = -HALF + 20; s < HALF; s += eco ? 60 : 36) {
    if (ROADS.some(q2 => Math.abs(q2 - s) < 14)) continue;
    lamps.push([r + 10.6, s], [r - 10.6, s + 18], [s, r + 10.6], [s + 18, r - 10.6]);
  }
  const poleMesh = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.09, 0.12, 8, 5).translate(0, 4, 0), std('#3a3d40', 0.5, 0.4), lamps.length);
  const headMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffd9a0').multiplyScalar(3), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
  const headMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.45, 8, 6), headMat, lamps.length);
  lamps.forEach((l, i) => {
    m4.makeTranslation(l[0], 0, l[1]); poleMesh.setMatrixAt(i, m4);
    m4.makeTranslation(l[0], 8.1, l[1]); headMesh.setMatrixAt(i, m4);
  });
  group.add(poleMesh, headMesh);

  // traffic: mostly white cars, as on Tashkent streets
  const carParts = [
    nonIndexed(new THREE.BoxGeometry(1.85, 0.72, 4.4).translate(0, 0.6, 0)),
    nonIndexed(new THREE.BoxGeometry(1.6, 0.58, 2.3).translate(0, 1.25, -0.2)),
  ];
  const nCars = eco ? 50 : 110;
  const carMesh = new THREE.InstancedMesh(mergeGeometries(carParts), std('#ffffff', 0.35, 0.3), nCars);
  const cars = [];
  const carCols = ['#f4f4f2', '#f4f4f2', '#f4f4f2', '#f2f2f0', '#c9ccd0', '#25272a', '#8c2f2b', '#3b4d63'].map(c => new THREE.Color(c));
  for (let i = 0; i < nCars; i++) {
    cars.push({ axis: R() < 0.5 ? 'x' : 'z', road: ROADS[Math.floor(R() * ROADS.length)], dir: R() < 0.5 ? 1 : -1, s0: -HALF + R() * HALF * 2, v: 9 + R() * 7 });
    carMesh.setColorAt(i, carCols[i % carCols.length]);
  }
  carMesh.castShadow = !eco; carMesh.frustumCulled = false;
  group.add(carMesh);

  // mountains to the north-east (the Chimgan side)
  const ridges = [];
  const mR = rng(5);
  for (const [rad, hMul, color] of [[5200, 1, '#8798ad'], [6600, 1.35, '#9fb0c4']]) {
    const segs = 120, pos = [], colArr = [];
    const a0 = 8, a1 = 125;
    const ph = [mR() * 6, mR() * 6, mR() * 6];
    const base = new THREE.Color(color), snow = new THREE.Color('#eef2f6');
    for (let i = 0; i <= segs; i++) {
      const a = (a0 + (a1 - a0) * i / segs) * Math.PI / 180;
      const u = i / segs;
      const env = Math.sin(u * Math.PI) ** 0.6;
      const h = hMul * env * (380 + 330 * Math.sin(u * 9 + ph[0]) + 180 * Math.sin(u * 23 + ph[1]) + 90 * Math.sin(u * 51 + ph[2]) + 250);
      const x = Math.sin(a) * rad, z = -Math.cos(a) * rad;
      pos.push(x, -40, z, x, Math.max(30, h), z);
      const c1 = base.clone().multiplyScalar(0.85);
      const c2 = h > 820 * hMul ? snow : base;
      colArr.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
    }
    const idx = [];
    for (let i = 0; i < segs; i++) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(colArr, 3));
    g.setIndex(idx); g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, fog: true }));
    ridges.push(m); group.add(m);
  }

  // walking routes (location chapter): flat ribbons, revealed by drawRange
  const routeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffc768').multiplyScalar(1.6), transparent: true, opacity: 0.95, depthWrite: false });
  const routes = ROUTE_PATHS.map(path => {
    const pts = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = path[i], b = path[i + 1];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const n = Math.max(1, Math.round(len / 4));
      for (let k = 0; k < n; k++) pts.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
    }
    pts.push(path[path.length - 1]);
    const pos = [];
    const w = 3.6;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz) || 1;
      const nx = -dz / l * w, nz = dx / l * w;
      pos.push(a[0] + nx, 0.5, a[1] + nz, a[0] - nx, 0.5, a[1] - nz, b[0] + nx, 0.5, b[1] + nz,
        a[0] - nx, 0.5, a[1] - nz, b[0] - nx, 0.5, b[1] - nz, b[0] + nx, 0.5, b[1] + nz);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const m = new THREE.Mesh(g, routeMat);
    m.frustumCulled = false; m.renderOrder = 2;
    group.add(m);
    return { mesh: m, count: pos.length / 3 };
  });

  // pins: thin light beams over each place
  const beamMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffd58a').multiplyScalar(1.4), transparent: true, opacity: 0, depthWrite: false });
  const beams = [];
  for (const k of Object.keys(POI)) {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 60, 8).translate(0, 30, 0), beamMat);
    b.position.copy(POI[k].pos); b.renderOrder = 3;
    group.add(b); beams.push(b);
  }

  function update(t, S, routeK, poiK) {
    night.value = S.night;
    headMat.opacity = S.night;
    headMesh.visible = S.night > 0.02;
    // fog-tinted mountains: lighter by day, near-black by night
    const mk = 0.25 + 0.75 * (1 - S.night);
    ridges.forEach((r, i) => { r.material.color.setScalar(mk * (i ? 1.02 : 0.94)); });
    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];
      let s = c.s0 + c.dir * c.v * t * 1.2;
      s = ((s + HALF) % (HALF * 2) + HALF * 2) % (HALF * 2) - HALF;
      const lane = 3.6 * (c.axis === 'z' ? -c.dir : c.dir);
      const x = c.axis === 'z' ? c.road + lane : s, z = c.axis === 'z' ? s : c.road + lane;
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), c.axis === 'z' ? (c.dir > 0 ? 0 : Math.PI) : (c.dir > 0 ? Math.PI / 2 : -Math.PI / 2));
      m4.compose(p.set(x, 0, z), q, sc.setScalar(1));
      carMesh.setMatrixAt(i, m4);
    }
    carMesh.instanceMatrix.needsUpdate = true;
    routes.forEach(r => { const n = Math.floor(r.count / 6 * routeK) * 6; r.mesh.geometry.setDrawRange(0, n); r.mesh.visible = n > 0 && poiK > 0.01; });
    routeMat.opacity = 0.95 * poiK;
    beamMat.opacity = 0.55 * poiK;
    beams.forEach(b => { b.visible = poiK > 0.01; });
  }

  return { group, update };
}
