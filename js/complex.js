import * as THREE from 'three';
import { rng } from './city.js';

// The three towers, built from instanced facade parts so that construction progress,
// the floor picker and the "lift the upper floors" reveal only change instance matrices.

export const FH = 3.3, GF = 4.5, SLAB = 0.32;
export const floorY = (i) => (i <= 0 ? 0 : GF + (i - 1) * FH);
export const floorH = (i) => (i === 0 ? GF : FH);

export const TOWERS = [
  { cx: 0, cz: -58, w: 60, d: 18, floors: 16, delay: 0, balcony: 'S', crane: [24, -72] },
  { cx: -62, cz: -5, w: 18, d: 52, floors: 12, delay: 0.08, balcony: 'E', crane: [-77, 10] },
  { cx: 62, cz: -5, w: 18, d: 52, floors: 9, delay: 0.16, balcony: 'W', crane: [77, -18] },
];
// The showcased apartment sits on tower A's south facade between x = 3 and x = 18.
export const APT = { x0: 3, x1: 18, z: -49 };

function std(color, rough = 0.85, metal = 0, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, ...extra });
}

function faces(T) {
  const hw = T.w / 2, hd = T.d / 2;
  return [
    { id: 'S', n: [0, 1], ax: 'x', from: T.cx - hw, len: T.w, plane: T.cz + hd },
    { id: 'N', n: [0, -1], ax: 'x', from: T.cx - hw, len: T.w, plane: T.cz - hd },
    { id: 'E', n: [1, 0], ax: 'z', from: T.cz - hd, len: T.d, plane: T.cx + hw },
    { id: 'W', n: [-1, 0], ax: 'z', from: T.cz - hd, len: T.d, plane: T.cx - hw },
  ];
}

function plotTextures(maxAniso) {
  const N = 2048, SZ = 180, S = N / SZ;
  const X = (x) => (x + SZ / 2) * S, Z = (z) => (z + SZ / 2) * S;
  const R = rng(3);
  // landscaped
  const cv = document.createElement('canvas'); cv.width = cv.height = N;
  const g = cv.getContext('2d');
  g.fillStyle = '#6c8a50'; g.fillRect(0, 0, N, N);
  for (let i = 0; i < 9000; i++) { g.fillStyle = R() < 0.5 ? 'rgba(40,70,30,.10)' : 'rgba(170,190,110,.10)'; const r = (0.4 + R() * 1.6) * S; g.beginPath(); g.arc(R() * N, R() * N, r, 0, 7); g.fill(); }
  const pave = (fill) => { g.fillStyle = fill; };
  // perimeter sidewalk and plazas around the towers
  pave('#d6cebf'); g.fillRect(0, 0, N, 7 * S); g.fillRect(0, N - 7 * S, N, 7 * S); g.fillRect(0, 0, 7 * S, N); g.fillRect(N - 7 * S, 0, 7 * S, N);
  for (const T of TOWERS) { g.fillRect(X(T.cx - T.w / 2 - 5), Z(T.cz - T.d / 2 - 5), (T.w + 10) * S, (T.d + 10) * S); }
  // main boulevard
  pave('#ddd5c6'); g.fillRect(X(-4), Z(-50), 8 * S, 140 * S);
  g.fillStyle = 'rgba(0,0,0,.06)'; for (let z = -50; z < 90; z += 1.2) g.fillRect(X(-4), Z(z), 8 * S, 0.06 * S);
  // curved cross paths
  g.strokeStyle = '#d9d0c0'; g.lineCap = 'round';
  g.lineWidth = 3.6 * S;
  g.beginPath(); g.moveTo(X(-53), Z(-8)); g.bezierCurveTo(X(-25), Z(28), X(25), Z(28), X(53), Z(-8)); g.stroke();
  g.beginPath(); g.moveTo(X(-53), Z(30)); g.bezierCurveTo(X(-30), Z(48), X(-10), Z(52), X(0), Z(60)); g.stroke();
  g.beginPath(); g.moveTo(X(53), Z(28)); g.bezierCurveTo(X(40), Z(60), X(20), Z(66), X(0), Z(72)); g.stroke();
  g.lineWidth = 3 * S;
  g.beginPath(); g.ellipse(X(0), Z(4), 22 * S, 14 * S, 0, 0, 7); g.stroke();
  // pool surround
  g.fillStyle = '#e2dccf'; g.beginPath(); g.ellipse(X(0), Z(4), 11 * S, 7.5 * S, 0, 0, 7); g.fill();
  // playground
  g.fillStyle = '#c96b4b'; g.beginPath(); g.arc(X(-28), Z(30), 11 * S, 0, 7); g.fill();
  g.fillStyle = '#e2a54d'; g.beginPath(); g.arc(X(-28), Z(30), 6 * S, 0, 7); g.fill();
  g.fillStyle = '#e7d9a8'; g.fillRect(X(-24), Z(24), 5 * S, 5 * S);
  // sports court
  g.fillStyle = '#3e6a58'; g.fillRect(X(18), Z(26), 22 * S, 32 * S);
  g.fillStyle = '#4f826d'; g.fillRect(X(21), Z(29), 16 * S, 26 * S);
  g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 0.15 * S; g.strokeRect(X(21), Z(29), 16 * S, 26 * S);
  g.beginPath(); g.moveTo(X(21), Z(42)); g.lineTo(X(37), Z(42)); g.stroke();
  g.beginPath(); g.arc(X(29), Z(42), 2 * S, 0, 7); g.stroke();
  // kindergarten yard
  g.fillStyle = '#7fa9b6'; g.fillRect(X(-66), Z(56), 36 * S, 17 * S);
  g.fillStyle = '#e4b45c'; g.beginPath(); g.arc(X(-56), Z(64), 4 * S, 0, 7); g.fill();
  g.fillStyle = '#d6cebf'; g.fillRect(X(-66), Z(74), 36 * S, 13 * S);
  // parking ramp
  g.fillStyle = '#3a3c3f'; g.fillRect(X(68), Z(58), 9 * S, 24 * S);
  // flower beds
  for (const [x, z, c] of [[-12, -38, '#b67c9a'], [12, -38, '#d6ad57'], [-14, 80, '#d6ad57'], [14, 80, '#b67c9a'], [-40, 5, '#c98d6a'], [40, 5, '#b67c9a']]) {
    g.fillStyle = c; g.beginPath(); g.ellipse(X(x), Z(z), 4.5 * S, 2.2 * S, 0, 0, 7); g.fill();
  }
  // entrance plaza
  g.fillStyle = '#ddd5c6'; g.beginPath(); g.arc(X(0), Z(90), 16 * S, Math.PI, 2 * Math.PI); g.fill();

  // construction site
  const cv2 = document.createElement('canvas'); cv2.width = cv2.height = 1024;
  const g2 = cv2.getContext('2d'); const S2 = 1024 / SZ;
  g2.fillStyle = '#8f7a62'; g2.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 5000; i++) { g2.fillStyle = R() < 0.5 ? 'rgba(60,45,30,.14)' : 'rgba(190,170,140,.12)'; const r = (0.5 + R() * 2.5) * S2; g2.beginPath(); g2.arc(R() * 1024, R() * 1024, r, 0, 7); g2.fill(); }
  g2.strokeStyle = 'rgba(70,55,40,.35)'; g2.lineWidth = 2.2 * S2;
  g2.beginPath(); g2.moveTo(0, 900); g2.bezierCurveTo(300, 700, 500, 820, 1024, 640); g2.stroke();
  g2.fillStyle = '#9d9a94';
  for (const T of TOWERS) g2.fillRect((T.cx - T.w / 2 - 3 + 90) * S2, (T.cz - T.d / 2 - 3 + 90) * S2, (T.w + 6) * S2, (T.d + 6) * S2);

  const mk = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; return t; };
  return { land: mk(cv), dirt: mk(cv2) };
}

export function buildComplex({ eco, maxAniso }) {
  const group = new THREE.Group();
  const R = rng(9);
  const unit = new THREE.BoxGeometry(1, 1, 1);
  const tP = new THREE.Vector3(), tS = new THREE.Vector3(), Q = new THREE.Quaternion();
  const ZERO = new THREE.Matrix4().makeScale(0, 0, 0);

  const KINDS = ['slab', 'col', 'stone', 'glass', 'lit', 'balc', 'rail'];
  const recs = Object.fromEntries(KINDS.map(k => [k, []]));

  function add(kind, ti, f, phase, x, y, z, sx, sy, sz, color) {
    const m = new THREE.Matrix4().compose(tP.set(x, y, z), Q, tS.set(sx, sy, sz));
    const inApt = ti === 0 && x > APT.x0 - 0.25 && x < APT.x1 + 0.25 && z > -56 && z < -46.3;
    recs[kind].push({ ti, f, phase, m, inApt, x, y, z, color, vis: true, dy: 0 });
  }
  function addFace(kind, T, ti, f, phase, face, s, out, y, along, h, thick, color) {
    if (face.ax === 'x') add(kind, ti, f, phase, s, y, face.plane + face.n[1] * out, along, h, thick, color);
    else add(kind, ti, f, phase, face.plane + face.n[0] * out, y, s, thick, h, along, color);
  }

  const glassTints = ['#4f6672', '#58707c', '#485e6a', '#61777f', '#536872'].map(c => new THREE.Color(c));
  const litTints = ['#ffd9a3', '#ffcf8c', '#ffe6c2', '#fff1db', '#ffd29a', '#e9eeff'].map(c => new THREE.Color(c).multiplyScalar(1.5));

  TOWERS.forEach((T, ti) => {
    for (let f = 0; f < T.floors; f++) {
      const y = floorY(f), h = floorH(f);
      add('slab', ti, f, 'frame', T.cx, y + SLAB / 2, T.cz, T.w + 0.5, SLAB, T.d + 0.5);
      for (const face of faces(T)) {
        const n = Math.max(1, Math.round(face.len / 3)), bay = face.len / n;
        const yy = y + SLAB + (h - SLAB) / 2, hh = h - SLAB;
        for (let j = 0; j < n; j++) {
          const s0 = face.from + j * bay, sc = s0 + bay / 2;
          addFace('stone', T, ti, f, 'skin', face, s0, 0.12, y + h / 2, 0.32, h, 0.55);
          if (j === n - 1 && face.id === 'S') addFace('stone', T, ti, f, 'skin', face, s0 + bay, 0.12, y + h / 2, 0.32, h, 0.55);
          const corner = j === 0 || j === n - 1;
          const panel = f > 0 && (corner || j % 4 === 2);
          if (panel) {
            addFace('stone', T, ti, f, 'skin', face, sc, 0.0, yy, bay - 0.32, hh, 0.3);
          } else {
            addFace('glass', T, ti, f, 'skin', face, sc, -0.12, yy, bay - 0.32, hh, 0.06, glassTints[Math.floor(R() * 5)]);
            if (R() < (f === 0 ? 0.92 : 0.52)) addFace('lit', T, ti, f, 'skin', face, sc, -0.06, yy - 0.05, bay - 0.55, hh - 0.35, 0.02, litTints[Math.floor(R() * 6)]);
            if (f > 0 && face.id === T.balcony && (j % 4 === 0 || j % 4 === 1)) {
              addFace('balc', T, ti, f, 'skin', face, sc, 0.78, y + 0.12, bay + 0.02, 0.24, 1.5);
              addFace('rail', T, ti, f, 'skin', face, sc, 1.5, y + 0.24 + 0.55, bay, 1.1, 0.04);
            }
          }
          if (j % 2 === 0) addFace('col', T, ti, f, 'frame', face, s0 + 0.4, -0.9, y + h / 2, 0.5, h, 0.5);
        }
        // ground floor: a stone band above the shopfronts
        if (f === 0) addFace('stone', T, ti, f, 'skin', face, face.from + face.len / 2, 0.2, h - 0.45, face.len + 0.4, 0.6, 0.5);
      }
    }
    // roof: slab, parapet, plant room. Floor index = floors, so it lifts with the upper floors.
    const yR = floorY(T.floors), F = T.floors;
    add('slab', ti, F, 'roof', T.cx, yR + 0.2, T.cz, T.w + 0.5, 0.4, T.d + 0.5);
    add('slab', ti, F, 'roof', T.cx, yR + 0.95, T.cz - T.d / 2 - 0.1, T.w + 0.5, 1.1, 0.3);
    add('slab', ti, F, 'roof', T.cx, yR + 0.95, T.cz + T.d / 2 + 0.1, T.w + 0.5, 1.1, 0.3);
    add('slab', ti, F, 'roof', T.cx - T.w / 2 - 0.1, yR + 0.95, T.cz, 0.3, 1.1, T.d + 0.5);
    add('slab', ti, F, 'roof', T.cx + T.w / 2 + 0.1, yR + 0.95, T.cz, 0.3, 1.1, T.d + 0.5);
    add('stone', ti, F, 'roof', T.cx, yR + 1.8, T.cz, Math.min(T.w, T.d) * 0.55, 3.2, Math.min(T.w, T.d) * 0.4);
    // crown: a stone pergola frame around the roof terrace, with a warm light line under the beam
    const cy = yR + 3.9, hw = T.w / 2, hd = T.d / 2;
    add('stone', ti, F, 'roof', T.cx, cy, T.cz + hd + 0.15, T.w + 0.75, 0.6, 0.6);
    add('stone', ti, F, 'roof', T.cx, cy, T.cz - hd - 0.15, T.w + 0.75, 0.6, 0.6);
    add('stone', ti, F, 'roof', T.cx + hw + 0.15, cy, T.cz, 0.6, 0.6, T.d + 0.75);
    add('stone', ti, F, 'roof', T.cx - hw - 0.15, cy, T.cz, 0.6, 0.6, T.d + 0.75);
    const nx = Math.max(2, Math.round(T.w / 6)), nz = Math.max(2, Math.round(T.d / 6));
    for (let k = 0; k <= nx; k++) for (const z of [T.cz + hd + 0.15, T.cz - hd - 0.15]) add('stone', ti, F, 'roof', T.cx - hw + k * T.w / nx, yR + 2.2, z, 0.5, 3.4, 0.5);
    for (let k = 1; k < nz; k++) for (const x of [T.cx + hw + 0.15, T.cx - hw - 0.15]) add('stone', ti, F, 'roof', x, yR + 2.2, T.cz - hd + k * T.d / nz, 0.5, 3.4, 0.5);
    const crownLight = new THREE.Color('#ffcf8a').multiplyScalar(2.2);
    add('lit', ti, F, 'roof', T.cx, cy - 0.4, T.cz + hd + 0.47, T.w, 0.12, 0.05, crownLight);
    add('lit', ti, F, 'roof', T.cx, cy - 0.4, T.cz - hd - 0.47, T.w, 0.12, 0.05, crownLight);
    add('lit', ti, F, 'roof', T.cx + hw + 0.47, cy - 0.4, T.cz, 0.05, 0.12, T.d, crownLight);
    add('lit', ti, F, 'roof', T.cx - hw - 0.47, cy - 0.4, T.cz, 0.05, 0.12, T.d, crownLight);
  });

  const MATS = {
    slab: std('#ffffff', 0.8),
    col: std('#a3a19b', 0.9),
    stone: std('#c9a983', 0.68),
    glass: std('#ffffff', 0.07, 0.92),
    lit: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    balc: std('#f2ece2', 0.8),
    rail: std('#bfd2d8', 0.05, 0.4, { transparent: true, opacity: 0.32, depthWrite: false }),
  };
  const meshes = {};
  const STONE = new THREE.Color('#f1eadf'), CONCRETE = new THREE.Color('#a6a49e');
  for (const k of KINDS) {
    const list = recs[k];
    const m = new THREE.InstancedMesh(unit, MATS[k], list.length);
    list.forEach((r, i) => { m.setMatrixAt(i, r.m); if (r.color) m.setColorAt(i, r.color); else if (k === 'slab') m.setColorAt(i, STONE); });
    m.frustumCulled = false;
    m.castShadow = k !== 'lit' && k !== 'rail';
    m.receiveShadow = k !== 'lit';
    group.add(m);
    meshes[k] = m;
  }

  // construction: safety nets and tower cranes
  const netMat = new THREE.MeshStandardMaterial({ color: '#2f6b40', roughness: 0.9, transparent: true, opacity: 0.42, depthWrite: false, side: THREE.DoubleSide });
  const nets = TOWERS.map(() => { const n = new THREE.Mesh(unit, netMat); n.visible = false; group.add(n); return n; });
  const craneMat = std('#e3ad22', 0.55, 0.3), weightMat = std('#8e8b84', 0.9);
  const cranes = TOWERS.map((T, i) => {
    const g = new THREE.Group();
    g.position.set(T.crane[0], 0, T.crane[1]);
    const mast = new THREE.Mesh(unit, craneMat); mast.scale.set(1.8, 1, 1.8); mast.position.y = 0.5;
    const head = new THREE.Group();
    const jib = new THREE.Mesh(unit, craneMat); jib.scale.set(46, 1.3, 1.3); jib.position.set(19, 0, 0);
    const cjib = new THREE.Mesh(unit, craneMat); cjib.scale.set(14, 1.1, 1.3); cjib.position.set(-8, 0, 0);
    const wt = new THREE.Mesh(unit, weightMat); wt.scale.set(4, 2.4, 2.4); wt.position.set(-13, -1, 0);
    const cab = new THREE.Mesh(unit, std('#f2f0ea', 0.6)); cab.scale.set(2.2, 2.2, 2.2); cab.position.set(1.8, -1.6, 1.6);
    const peak = new THREE.Mesh(unit, craneMat); peak.scale.set(1.2, 7, 1.2); peak.position.set(0, 3.5, 0);
    const cable = new THREE.Mesh(unit, std('#222', 0.5)); cable.scale.set(0.08, 18, 0.08); cable.position.set(26, -9, 0);
    head.add(jib, cjib, wt, cab, peak, cable);
    [mast, jib, cjib, wt, cab, peak].forEach(m => { m.castShadow = true; });
    g.add(mast, head);
    g.userData = { mast, head, cable, k: i * 2.1 };
    group.add(g);
    return g;
  });

  // site ground: landscaped plot over a construction-site plot
  const tex = plotTextures(maxAniso);
  const plotGeo = new THREE.PlaneGeometry(180, 180);
  const dirt = new THREE.Mesh(plotGeo, std('#ffffff', 1, 0, { map: tex.dirt, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  const land = new THREE.Mesh(plotGeo, std('#ffffff', 0.95, 0, { map: tex.land, transparent: true, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
  for (const p of [dirt, land]) { p.rotation.x = -Math.PI / 2; p.receiveShadow = true; group.add(p); }
  dirt.position.y = 0.02; land.position.y = 0.04;

  // courtyard: grows in as landscaping finishes
  const yard = new THREE.Group();
  group.add(yard);
  const yardLabels = buildCourtyard(yard, R, eco);

  // floor highlight for the floor picker (tower A)
  const TA = TOWERS[0];
  const hlMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffb54a'), transparent: true, opacity: 0, depthWrite: false });
  const hl = new THREE.Mesh(unit, hlMat); hl.scale.set(TA.w + 1.2, FH - 0.2, TA.d + 1.2); hl.renderOrder = 4;
  const edgeMat = new THREE.LineBasicMaterial({ color: new THREE.Color('#ffe2a8').multiplyScalar(1.5), transparent: true, opacity: 0 });
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(unit), edgeMat); edges.scale.copy(hl.scale);
  const hov = new THREE.Mesh(unit, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
  hov.scale.copy(hl.scale);
  group.add(hl, edges, hov);
  const pickBox = new THREE.Box3(new THREE.Vector3(TA.cx - TA.w / 2 - 1, floorY(1), TA.cz - TA.d / 2 - 1), new THREE.Vector3(TA.cx + TA.w / 2 + 2, floorY(TA.floors), TA.cz + TA.d / 2 + 2));

  let lastKey = '';
  const frame = [0, 0, 0], facade = [0, 0, 0];

  function update(state) {
    const { p, lift, cut, t, landscape } = state;
    TOWERS.forEach((T, i) => {
      const pk = Math.min(1, Math.max(0, (p - T.delay) / (1 - 0.16)));
      frame[i] = pk * (T.floors + 2.4);
      facade[i] = frame[i] - 2.4;
      // nets wrap the floors between the finished facade and the top of the frame
      const lo = Math.max(0, Math.floor(facade[i])), hi = Math.min(T.floors, Math.ceil(frame[i]));
      const net = nets[i];
      net.visible = pk > 0.02 && pk < 0.995 && hi > lo;
      if (net.visible) {
        const y0 = floorY(lo), y1 = floorY(hi);
        net.scale.set(T.w + 1.6, Math.max(0.1, y1 - y0), T.d + 1.6);
        net.position.set(T.cx, (y0 + y1) / 2, T.cz);
      }
      const cr = cranes[i];
      cr.visible = p < 0.995;
      if (cr.visible) {
        const H = Math.max(18, floorY(Math.min(T.floors, Math.ceil(frame[i]))) + 12);
        cr.userData.mast.scale.y = H; cr.userData.mast.position.y = H / 2;
        cr.userData.head.position.y = H + 0.65;
        cr.userData.head.rotation.y = t * 0.45 + cr.userData.k;
      }
    });
    const key = frame.map(v => Math.floor(v * 1)).join() + '|' + facade.map(v => Math.floor(v)).join() + '|' + cut + '|' + lift.toFixed(3);
    if (key !== lastKey) {
      lastKey = key;
      const liftY = lift * lift * 170;
      for (const k of KINDS) {
        const mesh = meshes[k], list = recs[k];
        let colorChanged = false;
        for (let i = 0; i < list.length; i++) {
          const r = list[i], T = TOWERS[r.ti];
          let vis;
          if (r.phase === 'frame') vis = r.f < frame[r.ti];
          else if (r.phase === 'roof') vis = facade[r.ti] >= T.floors - 0.001;
          else vis = r.f < facade[r.ti];
          let dy = 0;
          if (r.ti === 0 && lift > 0.0005) {
            if (r.f > cut) { dy = liftY; if (lift > 0.995) vis = false; }
            else if (r.f === cut && lift > 0.1 && r.inApt && r.phase !== 'frame') vis = false;
            else if (r.f === cut && lift > 0.1 && k === 'col') vis = false;
          }
          if (vis !== r.vis || dy !== r.dy) {
            r.vis = vis; r.dy = dy;
            if (!vis) mesh.setMatrixAt(i, ZERO);
            else if (dy) { const m = r.m.clone(); m.elements[13] += dy; mesh.setMatrixAt(i, m); }
            else mesh.setMatrixAt(i, r.m);
          }
          if (k === 'slab' && r.phase === 'frame') {
            const raw = r.f >= facade[r.ti];
            if (raw !== r.raw) { r.raw = raw; mesh.setColorAt(i, raw ? CONCRETE : STONE); colorChanged = true; }
          }
        }
        mesh.instanceMatrix.needsUpdate = true;
        if (colorChanged) mesh.instanceColor.needsUpdate = true;
      }
    }
    land.material.opacity = landscape;
    land.visible = landscape > 0.002;
    yard.visible = landscape > 0.002;
    yard.scale.y = Math.max(0.001, landscape);
  }

  function setNight(n) { MATS.lit.opacity = 0.92 * n; meshes.lit.visible = n > 0.01; yard.userData.setNight?.(n); }

  function setHighlight(floor, k, hoverFloor) {
    const y = floorY(floor) + FH / 2;
    hl.position.set(TA.cx, y, TA.cz); edges.position.copy(hl.position);
    hlMat.opacity = 0.48 * k; edgeMat.opacity = 1 * k;
    hl.visible = edges.visible = k > 0.01;
    const showHov = k > 0.5 && hoverFloor != null && hoverFloor !== floor;
    hov.visible = showHov;
    if (showHov) { hov.position.set(TA.cx, floorY(hoverFloor) + FH / 2, TA.cz); hov.material.opacity = 0.16; }
  }

  function pickFloor(ray) {
    const hit = ray.intersectBox(pickBox, new THREE.Vector3());
    if (!hit) return null;
    const f = Math.floor((hit.y - GF) / FH) + 1;
    return Math.max(1, Math.min(TA.floors - 1, f));
  }

  return { group, update, setNight, setHighlight, pickFloor, yardLabels };
}

function buildCourtyard(yard, R, eco) {
  const unit = new THREE.BoxGeometry(1, 1, 1);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  const std2 = (c, r = 0.8, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });

  // keep-out zones for trees
  const blocked = (x, z) => {
    if (Math.abs(x) < 6.5) return true; // boulevard
    if ((x / 25) ** 2 + ((z - 4) / 17) ** 2 < 1) return true; // pool and loop path
    if (Math.hypot(x + 28, z - 30) < 13) return true; // playground
    if (x > 15 && x < 43 && z > 23 && z < 61) return true; // sports court
    if (x < -28 && z > 53) return true; // kindergarten
    if (x > 65 && z > 55) return true; // ramp
    for (const T of TOWERS) if (Math.abs(x - T.cx) < T.w / 2 + 7 && Math.abs(z - T.cz) < T.d / 2 + 7) return true;
    return false;
  };
  const pts = [];
  let guard = 0;
  while (pts.length < (eco ? 45 : 85) && guard++ < 5000) {
    const x = -84 + R() * 168, z = -84 + R() * 168;
    if (blocked(x, z) || pts.some(o => Math.hypot(o[0] - x, o[1] - z) < 7)) continue;
    pts.push([x, z, 0.75 + R() * 0.55]);
  }
  for (let x = -80; x <= 80; x += 11) { pts.push([x, 85, 0.85]); }
  // trees reuse the city's tree look: two soft crowns on a trunk
  const trunkGeo = new THREE.CylinderGeometry(0.16, 0.24, 3, 6).translate(0, 1.5, 0);
  const crownGeo = new THREE.IcosahedronGeometry(1, 1).scale(2.2, 1.9, 2.2).translate(0, 4.2, 0);
  const trunks = new THREE.InstancedMesh(trunkGeo, std2('#4b3b2d', 0.9), pts.length);
  const crowns = new THREE.InstancedMesh(crownGeo, std2('#ffffff', 0.9), pts.length);
  const greens = ['#62843f', '#6f9046', '#577a39', '#7f9b52', '#8a9a4a'].map(c => new THREE.Color(c));
  pts.forEach((tr, i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), R() * 6.28);
    m4.compose(p.set(tr[0], 0, tr[1]), q, s.setScalar(tr[2]));
    trunks.setMatrixAt(i, m4); crowns.setMatrixAt(i, m4);
    crowns.setColorAt(i, greens[i % 5].clone().multiplyScalar(0.9 + R() * 0.25));
  });
  trunks.castShadow = crowns.castShadow = true; crowns.receiveShadow = true;
  yard.add(trunks, crowns);

  // pool
  const pool = new THREE.Mesh(new THREE.CircleGeometry(1, 40), std2('#4f9bb3', 0.05, 0.2));
  pool.rotation.x = -Math.PI / 2; pool.scale.set(9.2, 5.8, 1); pool.position.set(0, 0.12, 4);
  yard.add(pool);

  // benches along the boulevard and around the pool
  const benches = [];
  for (let z = 18; z <= 82; z += 11) benches.push([-5.3, z, 0], [5.3, z, 0]);
  for (let a = 0; a < 6.28; a += 0.9) benches.push([Math.cos(a) * 15, 4 + Math.sin(a) * 10, -a]);
  const benchMesh = new THREE.InstancedMesh(unit, std2('#8a6446', 0.7), benches.length);
  benches.forEach((b, i) => { q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), b[2]); m4.compose(p.set(b[0], 0.25, b[1]), q, s.set(0.6, 0.5, 1.9)); benchMesh.setMatrixAt(i, m4); });
  benchMesh.castShadow = true;
  yard.add(benchMesh);

  // playground pieces
  const play = [
    ['#e0563b', -30, 1.2, 27, 2.4, 2.4, 2.4], ['#f2c14e', -25, 0.7, 33, 4, 0.25, 1.2], ['#3b7fa8', -33, 1.6, 33, 0.25, 3.2, 3.6],
    ['#3b7fa8', -33, 3.2, 31.2, 0.2, 0.2, 0.2], ['#f2c14e', -28, 0.4, 36, 1.6, 0.8, 1.6], ['#7fb069', -23, 1.0, 27, 0.3, 2, 0.3],
  ];
  for (const [c, x, y, z, sx, sy, sz] of play) { const m = new THREE.Mesh(unit, std2(c, 0.6)); m.position.set(x, y, z); m.scale.set(sx, sy, sz); m.castShadow = true; yard.add(m); }
  const dome = new THREE.Mesh(new THREE.IcosahedronGeometry(2.2, 1), new THREE.MeshStandardMaterial({ color: '#e0563b', wireframe: true }));
  dome.position.set(-22, 0.6, 34); yard.add(dome);

  // basketball posts
  for (const z of [30, 54]) { const pole = new THREE.Mesh(unit, std2('#2b2e31', 0.5)); pole.scale.set(0.2, 3.3, 0.2); pole.position.set(29, 1.65, z); const bd = new THREE.Mesh(unit, std2('#f4f4f2', 0.4)); bd.scale.set(1.8, 1.1, 0.08); bd.position.set(29, 3.3, z + (z < 40 ? 0.4 : -0.4)); yard.add(pole, bd); }

  // pergola north of the pool
  const perg = new THREE.Group();
  for (let x = -9; x <= 9; x += 3) for (const z of [-14, -10]) { const c = new THREE.Mesh(unit, std2('#efe9de', 0.7)); c.scale.set(0.3, 3, 0.3); c.position.set(x, 1.5, z); c.castShadow = true; perg.add(c); }
  for (let x = -9; x <= 9; x += 1) { const b = new THREE.Mesh(unit, std2('#8a6446', 0.7)); b.scale.set(0.16, 0.2, 5); b.position.set(x, 3.1, -12); b.castShadow = true; perg.add(b); }
  yard.add(perg);

  // kindergarten: low, playful
  const kg = new THREE.Group();
  const body = new THREE.Mesh(unit, std2('#f1ece2', 0.8)); body.scale.set(30, 7, 10); body.position.set(-48, 3.5, 80);
  const kroof = new THREE.Mesh(unit, std2('#e3dccf', 0.8)); kroof.scale.set(31, 0.5, 11); kroof.position.set(-48, 7.2, 80);
  body.castShadow = body.receiveShadow = kroof.castShadow = true;
  kg.add(body, kroof);
  const kcols = ['#e07a5f', '#f2cc8f', '#81b29a', '#3d85a8', '#e07a5f', '#f2cc8f', '#81b29a', '#3d85a8', '#e07a5f'];
  kcols.forEach((c, i) => { const pnl = new THREE.Mesh(unit, std2(c, 0.6)); pnl.scale.set(2.2, 5.4, 0.3); pnl.position.set(-61 + i * 3.2, 3.6, 74.9); kg.add(pnl); });
  yard.add(kg);

  // parking ramp entrance
  const rampG = new THREE.Group();
  const rw1 = new THREE.Mesh(unit, std2('#cfc8bb', 0.8)); rw1.scale.set(0.4, 1.2, 24); rw1.position.set(68, 0.6, 70);
  const rw2 = rw1.clone(); rw2.position.x = 77;
  const canopy = new THREE.Mesh(unit, new THREE.MeshStandardMaterial({ color: '#b9cdd4', roughness: 0.05, metalness: 0.4, transparent: true, opacity: 0.45 }));
  canopy.scale.set(10, 0.15, 9); canopy.position.set(72.5, 3.2, 63);
  rampG.add(rw1, rw2, canopy);
  yard.add(rampG);

  // people for scale
  const nP = eco ? 30 : 60;
  const people = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.24, 1.15, 3, 8), std2('#ffffff', 0.85), nP);
  const pcols = ['#2f3e4e', '#c4553f', '#e9e4da', '#5a6b3f', '#2b2b2b', '#c99a3b', '#6d89a8', '#8f4f6a'].map(c => new THREE.Color(c));
  for (let i = 0; i < nP; i++) {
    let x, z;
    const r = R();
    if (r < 0.45) { x = (R() - 0.5) * 7; z = -40 + R() * 128; }
    else if (r < 0.7) { const a = R() * 6.28; x = Math.cos(a) * 22; z = 4 + Math.sin(a) * 14; }
    else if (r < 0.85) { x = -28 + (R() - 0.5) * 18; z = 30 + (R() - 0.5) * 18; }
    else { x = -48 + (R() - 0.5) * 30; z = 64 + (R() - 0.5) * 12; }
    const sc = r > 0.7 && r < 0.85 ? 0.62 : 1; // children at the playground
    m4.compose(p.set(x, 0.82 * sc, z), q.identity(), s.setScalar(sc));
    people.setMatrixAt(i, m4); people.setColorAt(i, pcols[i % pcols.length]);
  }
  people.castShadow = true;
  yard.add(people);

  // bollard lights along the paths
  const bl = [];
  for (let z = -40; z <= 86; z += 8) bl.push([-4.4, z], [4.4, z]);
  for (let a = 0; a < 6.28; a += 0.5) bl.push([Math.cos(a) * 24.5, 4 + Math.sin(a) * 16]);
  const bPost = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6).translate(0, 0.45, 0), std2('#34373a', 0.5), bl.length);
  const bHeadMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffd7a0').multiplyScalar(3), transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
  const bHead = new THREE.InstancedMesh(new THREE.SphereGeometry(0.16, 8, 6), bHeadMat, bl.length);
  bl.forEach((b, i) => { m4.makeTranslation(b[0], 0, b[1]); bPost.setMatrixAt(i, m4); m4.makeTranslation(b[0], 0.95, b[1]); bHead.setMatrixAt(i, m4); });
  yard.add(bPost, bHead);
  yard.userData.setNight = (n) => { bHeadMat.opacity = n; bHead.visible = n > 0.02; };

  return {
    garden: new THREE.Vector3(0, 4, 4),
    play: new THREE.Vector3(-28, 4.5, 30),
    kinder: new THREE.Vector3(-48, 9.5, 80),
    sport: new THREE.Vector3(29, 4.5, 42),
    parking: new THREE.Vector3(72.5, 5, 63),
    shops: new THREE.Vector3(-52.5, 5.5, -2),
  };
}
