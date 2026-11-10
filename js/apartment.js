import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// The showcased 3-room apartment (94.5 m²), modelled as a dollhouse: walls, windows, floors and
// furniture, merged by material. Plan coordinates: x along the facade (0..15 m), p = depth from
// the facade (0..6.3 m inward, negative = loggia). Local z = −p, so −z points into the building.

export const AW = 15, AD = 6.3, WH = 2.85;

export const ROOMS = [
  { k: 'rm.living', x: 0, p: 0, w: 6.6, d: 6.3, floor: 'wood', at: [3.6, 2.3] },
  { k: 'rm.bed1', x: 6.6, p: 0, w: 4.4, d: 3.5, floor: 'wood', at: [8.8, 1.6] },
  { k: 'rm.bed2', x: 11, p: 0, w: 4, d: 3.5, floor: 'wood', at: [12.6, 1.8] },
  { k: 'rm.hall', x: 6.6, p: 3.5, w: 8.4, d: 1.2, floor: 'wood', at: [7.8, 4.6], area: 13.9 },
  { k: null, x: 6.6, p: 4.7, w: 2.4, d: 1.6, floor: 'tile' },
  { k: 'rm.ward', x: 9, p: 4.7, w: 2.6, d: 1.6, floor: 'wood', at: [10.3, 5.5] },
  { k: 'rm.bath', x: 11.6, p: 4.7, w: 3.4, d: 1.6, floor: 'tile', at: [13.3, 5.4] },
  { k: 'rm.loggia', x: 0, p: -1.5, w: 11, d: 1.5, floor: 'deck', at: [5.0, -0.75] },
];

// [x1, p1, x2, p2, thickness, openings along the segment]
const WALLS = [
  [0, 0, 15, 0, 0.3, [{ a: 0.4, b: 6.2, s: 0, h: 2.6, ty: 'win' }, { a: 7.4, b: 10.2, s: 0, h: 2.6, ty: 'win' }, { a: 11.8, b: 14.2, s: 0.85, h: 2.5, ty: 'win' }]],
  [0, 6.3, 15, 6.3, 0.3, [{ a: 7.2, b: 8.2, s: 0, h: 2.15, ty: 'door', shut: true }]],
  [0, 0, 0, 6.3, 0.3, []],
  [15, 0, 15, 6.3, 0.3, []],
  [6.6, 0, 6.6, 3.5, 0.12, []],
  [6.6, 3.5, 6.6, 6.3, 0.12, [{ a: 0.15, b: 2.2, s: 0, h: 2.4, ty: 'open' }]],
  [11, 0, 11, 3.5, 0.12, []],
  [6.6, 3.5, 15, 3.5, 0.12, [{ a: 1.6, b: 2.5, s: 0, h: 2.15, ty: 'door' }, { a: 4.8, b: 5.7, s: 0, h: 2.15, ty: 'door' }]],
  [9, 4.7, 15, 4.7, 0.12, [{ a: 0.6, b: 1.4, s: 0, h: 2.15, ty: 'door' }, { a: 3.0, b: 3.8, s: 0, h: 2.15, ty: 'door' }]],
  [9, 4.7, 9, 6.3, 0.12, []],
  [11.6, 4.7, 11.6, 6.3, 0.12, []],
  [0, 0, 0, -1.5, 0.22, []],
  [11, 0, 11, -1.5, 0.22, []],
];

function canvasTex(draw, size, maxAniso) {
  const cv = document.createElement('canvas'); cv.width = cv.height = size;
  draw(cv.getContext('2d'), size);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = maxAniso;
  return t;
}

function makeMaterials(maxAniso) {
  let seed = 3;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  // oak planks: texture covers 2 m × 2 m
  const wood = canvasTex((g, N) => {
    const rows = 11, rh = N / rows;
    for (let r = 0; r < rows; r++) {
      let x = -rnd() * N * 0.6;
      while (x < N) {
        const len = N * (0.5 + rnd() * 0.45);
        const l = 58 + rnd() * 10, s = 38 + rnd() * 8;
        g.fillStyle = `hsl(32, ${s}%, ${l}%)`; g.fillRect(x, r * rh, len, rh);
        for (let k = 0; k < 9; k++) { g.strokeStyle = `rgba(90,60,30,${0.05 + rnd() * 0.07})`; g.lineWidth = 1 + rnd() * 1.5; g.beginPath(); const yy = r * rh + rnd() * rh; g.moveTo(x, yy); g.bezierCurveTo(x + len * 0.3, yy + (rnd() - 0.5) * 6, x + len * 0.7, yy + (rnd() - 0.5) * 6, x + len, yy); g.stroke(); }
        g.fillStyle = 'rgba(60,40,20,.35)'; g.fillRect(x, r * rh, 2, rh);
        x += len;
      }
      g.fillStyle = 'rgba(60,40,20,.3)'; g.fillRect(0, r * rh, N, 1.5);
    }
  }, 1024, maxAniso);
  // large stone tiles: texture covers 2.4 m × 2.4 m (4 × 4 tiles)
  const tile = canvasTex((g, N) => {
    const n = 4, ts = N / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const l = 84 + rnd() * 4;
      g.fillStyle = `hsl(36, 12%, ${l}%)`; g.fillRect(i * ts, j * ts, ts, ts);
      for (let k = 0; k < 40; k++) { g.fillStyle = `rgba(120,110,95,${rnd() * 0.06})`; g.beginPath(); g.arc(i * ts + rnd() * ts, j * ts + rnd() * ts, 2 + rnd() * 10, 0, 7); g.fill(); }
    }
    g.strokeStyle = 'rgba(150,140,125,.8)'; g.lineWidth = 3;
    for (let i = 0; i <= n; i++) { g.beginPath(); g.moveTo(i * ts, 0); g.lineTo(i * ts, N); g.stroke(); g.beginPath(); g.moveTo(0, i * ts); g.lineTo(N, i * ts); g.stroke(); }
  }, 512, maxAniso);

  const S = (c, r = 0.85, m = 0, e = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, ...e });
  return {
    wall: S('#f1ede6', 0.93), cap: S('#3b3f3d', 0.85), slab: S('#e9e4da', 0.85),
    wood: S('#ffffff', 0.62, 0, { map: wood }), tile: S('#ffffff', 0.35, 0, { map: tile }), deck: S('#cfc6b6', 0.85),
    front: S('#8d9b86', 0.55), front2: S('#d9cab2', 0.6), quartz: S('#efece6', 0.3), black: S('#1f2123', 0.5),
    metal: S('#9ea3a6', 0.3, 0.9), brass: S('#b8945a', 0.32, 0.85), oak: S('#b88b5d', 0.6), walnut: S('#6b4b34', 0.55),
    white: S('#f4f2ee', 0.6), oat: S('#d8cdbb', 0.95), olive: S('#6f7b57', 0.95), terra: S('#b6694a', 0.95),
    linen: S('#f4f2ed', 0.95), duvet: S('#c6cdbb', 0.95), kids: S('#e3a95f', 0.95), rug: S('#cbbda5', 1), rug2: S('#b5a38a', 1),
    kidsRug: S('#8fb2c3', 1), ceramic: S('#f6f6f4', 0.22), mirror: S('#dfe7ec', 0.04, 1), pot: S('#b3704d', 0.85),
    leaf: S('#4e7a3c', 0.8), frame: S('#33373a', 0.45, 0.3),
    glass: new THREE.MeshStandardMaterial({ color: '#d8eaf0', roughness: 0.03, metalness: 0.1, transparent: true, opacity: 0.14, depthWrite: false }),
    ceiling: S('#f5f2ec', 0.95, 0, { colorWrite: false, depthWrite: false }),
  };
}

export function buildApartment({ maxAniso }) {
  const M = makeMaterials(maxAniso);
  const parts = {}; // material key -> geometries
  const put = (key, g) => { (parts[key] ||= []).push(g.index ? g.toNonIndexed() : g); };

  // box by plan coordinates: centre (x, p), bottom y, size w (along x) × h × d (along p)
  const B = (key, x, y, p, w, h, d, r = 0.02, rotY = 0) => {
    const rr = Math.min(r, Math.min(w, h, d) / 2 - 0.001);
    const g = rr > 0.004 ? new RoundedBoxGeometry(w, h, d, 2, rr) : new THREE.BoxGeometry(w, h, d);
    if (rotY) g.rotateY(rotY);
    g.translate(x, y + h / 2, -p);
    put(key, g);
  };
  const CYL = (key, x, y, p, r, h, seg = 24) => { const g = new THREE.CylinderGeometry(r, r, h, seg); g.translate(x, y + h / 2, -p); put(key, g); };
  const LEAVES = (x, y, p, s = 1) => {
    for (let i = 0; i < 4; i++) {
      const g = new THREE.IcosahedronGeometry(0.28 * s, 1);
      g.scale(1, 1.25, 1).translate(x + Math.sin(i * 2.1) * 0.16 * s, y + 0.25 * s + i * 0.17 * s, -p + Math.cos(i * 2.1) * 0.16 * s);
      put('leaf', g);
    }
  };

  // ---- walls ----
  for (const [x1, p1, x2, p2, th, ops] of WALLS) {
    const z1 = -p1, z2 = -p2, dx = x2 - x1, dz = z2 - z1, L = Math.hypot(dx, dz);
    const ang = Math.atan2(-dz, dx);
    const piece = (a, b, y0, y1, key = 'wall') => {
      if (b - a < 0.005 || y1 - y0 < 0.005) return;
      const g = new THREE.BoxGeometry(b - a, y1 - y0, th);
      g.rotateY(ang);
      const c = (a + b) / 2;
      g.translate(x1 + dx * c / L, (y0 + y1) / 2, z1 + dz * c / L);
      put(key, g);
      if (y1 >= WH - 0.001 && key === 'wall') {
        const cg = new THREE.BoxGeometry(b - a, 0.025, th + 0.004); cg.rotateY(ang);
        cg.translate(x1 + dx * c / L, WH + 0.012, z1 + dz * c / L); put('cap', cg);
      }
    };
    let cur = 0;
    const sorted = [...ops].sort((o1, o2) => o1.a - o2.a);
    for (const o of sorted) {
      piece(cur, o.a, 0, WH);
      if (o.s > 0) piece(o.a, o.b, 0, o.s);
      piece(o.a, o.b, o.h, WH);
      const along = (u) => [x1 + dx * u / L, z1 + dz * u / L];
      if (o.ty === 'win') {
        // glass, frame and mullions
        const w = o.b - o.a, hh = o.h - o.s;
        const [cx, cz] = along((o.a + o.b) / 2);
        const gl = new THREE.BoxGeometry(w, hh, 0.02); gl.rotateY(ang); gl.translate(cx, o.s + hh / 2, cz); put('glass', gl);
        const fr = (u0, u1, y0, y1) => { const [fx, fz] = along((u0 + u1) / 2); const g = new THREE.BoxGeometry(u1 - u0, y1 - y0, 0.09); g.rotateY(ang); g.translate(fx, (y0 + y1) / 2, fz); put('frame', g); };
        fr(o.a, o.b, o.h - 0.06, o.h); fr(o.a, o.b, o.s, o.s + 0.06);
        if (o.h - o.s > 2) fr(o.a, o.b, 2.08, 2.14);
        const n = Math.max(1, Math.round(w / 1.0));
        for (let k = 0; k <= n; k++) { const u = o.a + w * k / n; fr(u - 0.035, u + 0.035, o.s, o.h); }
      } else if (o.ty === 'door') {
        const w = o.b - o.a;
        if (o.shut) {
          const [cx, cz] = along((o.a + o.b) / 2);
          const g = new THREE.BoxGeometry(w - 0.04, 2.1, 0.06); g.rotateY(ang); g.translate(cx, 1.05, cz); put('walnut', g);
        } else {
          const [hx, hz] = along(o.a + 0.02);
          const open = ang + 1.25;
          const g = new THREE.BoxGeometry(w - 0.05, 2.08, 0.04);
          g.translate((w - 0.05) / 2, 1.04, 0); g.rotateY(open); g.translate(hx, 0, hz);
          put('white', g);
        }
      }
      cur = o.b;
    }
    piece(cur, L, 0, WH);
  }

  // ---- floors ----
  for (const r of ROOMS) {
    const g = new THREE.PlaneGeometry(r.w, r.d);
    g.rotateX(-Math.PI / 2);
    const uv = g.attributes.uv, k = r.floor === 'tile' ? 2.4 : 2;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * r.w / k, uv.getY(i) * r.d / k);
    g.translate(r.x + r.w / 2, 0.006, -(r.p + r.d / 2));
    put(r.floor, g);
  }
  // loggia slab under the deck
  B('slab', 5.5, -0.32, -0.75, 11, 0.32, 1.5, 0);

  // ---- kitchen-living ----
  B('front', 0.45, 0, 4.4, 0.6, 0.86, 3.5, 0.01);
  B('quartz', 0.47, 0.86, 4.4, 0.64, 0.04, 3.5, 0.005);
  B('front', 2.08, 0, 5.85, 2.65, 0.86, 0.6, 0.01);
  B('quartz', 2.08, 0.86, 5.83, 2.65, 0.04, 0.64, 0.005);
  B('front', 4.0, 0, 5.85, 1.2, 2.35, 0.6, 0.01);
  B('front', 0.33, 1.45, 4.0, 0.36, 0.72, 2.6, 0.01);
  B('black', 0.47, 0.9, 4.9, 0.5, 0.012, 0.56, 0);
  B('metal', 0.47, 0.9, 3.4, 0.42, 0.012, 0.5, 0);
  B('front', 2.7, 0, 3.85, 1.7, 0.88, 0.85, 0.02);
  B('quartz', 2.7, 0.88, 3.85, 1.85, 0.05, 1.0, 0.01);
  for (const x of [2.15, 2.7, 3.25]) { B('oak', x, 0.66, 3.1, 0.38, 0.06, 0.38, 0.02); B('black', x, 0, 3.1, 0.05, 0.66, 0.05, 0); }
  for (const x of [2.2, 2.7, 3.2]) { B('brass', x, 1.95, 3.85, 0.22, 0.22, 0.22, 0.1); B('black', x, 2.17, 3.85, 0.012, 0.68, 0.012, 0); }
  // dining
  B('oak', 4.9, 0.72, 4.55, 1.8, 0.05, 0.95, 0.02);
  for (const [x, p] of [[4.12, 4.2], [5.68, 4.2], [4.12, 4.9], [5.68, 4.9]]) B('black', x, 0, p, 0.05, 0.72, 0.05, 0);
  for (const [x, p, bp] of [[4.4, 3.85, 3.62], [5.4, 3.85, 3.62], [4.4, 5.25, 5.48], [5.4, 5.25, 5.48]]) {
    B('oat', x, 0.42, p, 0.46, 0.07, 0.46, 0.03); B('oat', x, 0.49, bp, 0.46, 0.42, 0.06, 0.03); B('black', x, 0, p, 0.36, 0.42, 0.36, 0.01);
  }
  B('black', 4.9, 1.95, 4.55, 1.2, 0.05, 0.1, 0.02);
  // lounge
  B('rug', 3.9, 0, 1.85, 2.9, 0.015, 2.6, 0);
  B('olive', 2.38, 0, 1.85, 0.95, 0.42, 2.5, 0.08);
  B('olive', 1.98, 0.42, 1.85, 0.22, 0.46, 2.5, 0.08);
  B('olive', 2.38, 0.42, 0.62, 0.95, 0.2, 0.22, 0.08);
  B('olive', 2.38, 0.42, 3.08, 0.95, 0.2, 0.22, 0.08);
  B('oat', 2.5, 0.42, 1.3, 0.7, 0.13, 0.95, 0.06);
  B('oat', 2.5, 0.42, 2.4, 0.7, 0.13, 0.95, 0.06);
  B('terra', 2.2, 0.55, 1.0, 0.16, 0.38, 0.38, 0.07);
  B('walnut', 3.95, 0, 1.85, 1.05, 0.36, 0.62, 0.12);
  B('walnut', 6.28, 0, 1.85, 0.45, 0.46, 2.2, 0.02);
  B('black', 6.49, 0.95, 1.85, 0.04, 0.72, 1.3, 0.01);
  B('terra', 5.55, 0, 0.9, 0.8, 0.42, 0.8, 0.08);
  B('terra', 5.86, 0.42, 0.9, 0.16, 0.4, 0.8, 0.06);
  CYL('black', 0.7, 0, 0.55, 0.12, 0.03); B('black', 0.7, 0.03, 0.55, 0.025, 1.5, 0.025, 0); CYL('linen', 0.7, 1.45, 0.55, 0.2, 0.28, 16);
  B('pot', 6.25, 0, 3.15, 0.42, 0.48, 0.42, 0.06); LEAVES(6.25, 0.45, 3.15, 1.2);

  // ---- bedroom ----
  B('rug2', 8.2, 0, 1.75, 2.8, 0.015, 2.6, 0);
  B('walnut', 7.85, 0, 1.75, 2.15, 0.32, 1.85, 0.03);
  B('oat', 6.78, 0, 1.75, 0.1, 1.05, 1.95, 0.03);
  B('linen', 7.9, 0.32, 1.75, 2.0, 0.2, 1.75, 0.06);
  B('duvet', 8.2, 0.5, 1.75, 1.45, 0.07, 1.82, 0.03);
  B('linen', 7.05, 0.52, 1.3, 0.34, 0.14, 0.62, 0.06); B('linen', 7.05, 0.52, 2.2, 0.34, 0.14, 0.62, 0.06);
  B('terra', 8.72, 0.56, 1.75, 0.42, 0.03, 1.86, 0.01);
  B('walnut', 6.95, 0, 0.45, 0.42, 0.5, 0.4, 0.02); B('walnut', 6.95, 0, 3.05, 0.42, 0.5, 0.4, 0.02);
  B('brass', 6.95, 0.5, 0.45, 0.14, 0.34, 0.14, 0.06); B('brass', 6.95, 0.5, 3.05, 0.14, 0.34, 0.14, 0.06);
  B('front2', 10.62, 0, 1.6, 0.6, 2.4, 2.5, 0.01);
  B('terra', 9.2, 0, 1.75, 0.42, 0.44, 1.4, 0.06);

  // ---- children's room ----
  B('kidsRug', 12.6, 0, 2.0, 1.7, 0.015, 1.7, 0.4);
  B('oak', 14.35, 0, 2.2, 1.0, 0.3, 2.05, 0.03);
  B('linen', 14.35, 0.3, 2.2, 0.92, 0.18, 1.95, 0.05);
  B('kids', 14.32, 0.46, 2.45, 0.98, 0.06, 1.5, 0.03);
  B('linen', 14.35, 0.48, 1.45, 0.6, 0.12, 0.35, 0.05);
  B('oak', 12.3, 0.72, 0.6, 1.4, 0.04, 0.62, 0.01);
  B('white', 11.66, 0, 0.6, 0.05, 0.72, 0.56, 0); B('white', 12.94, 0, 0.6, 0.05, 0.72, 0.56, 0);
  B('kidsRug', 12.3, 0.44, 1.1, 0.44, 0.06, 0.44, 0.03); B('kidsRug', 12.3, 0.5, 1.33, 0.44, 0.36, 0.05, 0.02); B('black', 12.3, 0, 1.1, 0.06, 0.44, 0.06, 0);
  B('white', 11.25, 0, 2.3, 0.3, 1.8, 1.2, 0.01);
  for (const [y, c] of [[0.55, 'terra'], [0.95, 'kids'], [1.35, 'olive']]) B(c, 11.25, y, 2.0 + y * 0.2, 0.22, 0.26, 0.35, 0.02);

  // ---- hall, wardrobe, bathroom ----
  B('front2', 8.75, 0, 5.55, 0.35, 0.9, 1.0, 0.01);
  B('mirror', 8.92, 1.05, 5.55, 0.02, 1.2, 0.7, 0);
  B('front2', 10.3, 0, 5.95, 2.4, 2.2, 0.42, 0.01);
  B('oat', 10.3, 0, 5.15, 0.9, 0.45, 0.42, 0.05);
  B('ceramic', 13.95, 0, 5.85, 1.75, 0.55, 0.66, 0.1);
  B('walnut', 12.25, 0.45, 5.95, 1.0, 0.4, 0.45, 0.01);
  B('ceramic', 12.25, 0.85, 5.95, 0.52, 0.1, 0.38, 0.04);
  B('mirror', 12.25, 1.1, 6.13, 0.8, 0.8, 0.02, 0);
  B('ceramic', 14.55, 0, 5.08, 0.38, 0.42, 0.55, 0.12);

  // ---- loggia ----
  B('oat', 1.35, 0, -0.7, 0.7, 0.36, 1.35, 0.08); B('oat', 1.35, 0.36, -0.1, 0.7, 0.42, 0.14, 0.06);
  CYL('walnut', 7.6, 0.7, -0.75, 0.32, 0.04); B('black', 7.6, 0, -0.75, 0.05, 0.7, 0.05, 0);
  B('oat', 7.05, 0.44, -0.75, 0.42, 0.06, 0.42, 0.03); B('oat', 8.15, 0.44, -0.75, 0.42, 0.06, 0.42, 0.03);
  for (const x of [9.55, 10.45]) { B('pot', x, 0, -1.2, 0.8, 0.42, 0.34, 0.03); LEAVES(x - 0.18, 0.36, -1.2, 0.8); LEAVES(x + 0.2, 0.36, -1.2, 0.7); }
  B('glass', 5.5, 0.08, -1.47, 11, 1.0, 0.02, 0);
  B('black', 5.5, 1.08, -1.47, 11, 0.04, 0.06, 0);
  for (let x = 0.2; x <= 10.8; x += 1.35) B('black', x, 0, -1.47, 0.04, 1.08, 0.04, 0);

  // ---- assemble ----
  const group = new THREE.Group();
  for (const key of Object.keys(parts)) {
    const g = mergeGeometries(parts[key]);
    const mesh = new THREE.Mesh(g, M[key]);
    const isGlass = key === 'glass';
    mesh.castShadow = !isGlass; mesh.receiveShadow = !isGlass;
    if (isGlass) mesh.renderOrder = 5;
    group.add(mesh);
  }

  // Ceiling: always casts shadow, so sunlight only enters through the windows. It is drawn only
  // in the view from the window; in the dollhouse view it is invisible.
  const ceil = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.3, 7.9), M.ceiling);
  ceil.position.set(7.5, WH + 0.16, -2.4);
  ceil.castShadow = true; ceil.receiveShadow = false;
  group.add(ceil);

  // The rest of the floor around the apartment: corridor, core and neighbours' partition walls,
  // in the same local coordinates (tower A spans local x −33..27, z +0..−18).
  const ctxParts = { wall: [], cap: [] };
  const W = (x1, z1, x2, z2, th = 0.2) => {
    const dx = x2 - x1, dz = z2 - z1, L = Math.hypot(dx, dz), ang = Math.atan2(-dz, dx);
    const g = new THREE.BoxGeometry(L, WH, th); g.rotateY(ang); g.translate((x1 + x2) / 2, WH / 2, (z1 + z2) / 2); ctxParts.wall.push(g.toNonIndexed());
    const c = new THREE.BoxGeometry(L, 0.025, th + 0.004); c.rotateY(ang); c.translate((x1 + x2) / 2, WH + 0.012, (z1 + z2) / 2); ctxParts.cap.push(c.toNonIndexed());
  };
  W(-32.6, -6.6, 0, -6.6); W(15, -6.6, 26.6, -6.6);
  W(-32.6, -11.4, -7, -11.4); W(-1, -11.4, 26.6, -11.4);
  W(-15, -0.4, -15, -6.6); W(-18, -11.4, -18, -17.6); W(-3, -11.4, -3, -17.6); W(12, -11.4, 12, -17.6);
  W(-7, -6.6, -7, -11.4, 0.3); W(-1, -6.6, -1, -11.4, 0.3);
  const coreG = new THREE.BoxGeometry(5.7, WH, 4.5); coreG.translate(-4, WH / 2, -9); ctxParts.wall.push(coreG.toNonIndexed());
  
  for (const k of ['wall', 'cap']) {
    const m = new THREE.Mesh(mergeGeometries(ctxParts[k]), M[k]);
    m.castShadow = m.receiveShadow = true;
    group.add(m);
  }

  const labels = ROOMS.filter(r => r.k).map(r => ({
    key: r.k,
    area: r.area ?? Math.round(r.w * r.d * 10) / 10,
    local: new THREE.Vector3(r.at[0], 0.3, -r.at[1]),
  }));

  return { group, ceilingMat: M.ceiling, labels };
}
