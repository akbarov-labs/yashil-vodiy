import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import * as D from './data.js';
import { t as tr, money, area, clock, quarter, num } from './i18n.js';
import { makeSky, newSkyState, skyState, sunAngles, dirFromAngles, directSunHours } from './sky.js';
import { buildCity, POI } from './city.js';
import { buildComplex, floorY, SLAB, APT } from './complex.js';
import { buildApartment } from './apartment.js';

const $ = (s) => document.querySelector(s);
const sm = (a, b, x) => { const u = Math.min(1, Math.max(0, (x - a) / (b - a))); return u * u * (3 - 2 * u); };
const fade = (w, t) => sm(w[0], w[1], t) * (1 - sm(w[2], w[3], t));

export function start({ reduce = false, onFail } = {}) {
  const story = $('#story'), stage = $('#stage'), canvas = $('#gl'), labelsEl = $('#labels');
  const cards = [...document.querySelectorAll('.card')];
  const railBtns = [...document.querySelectorAll('#rail button')];
  const bar = $('#chbar');

  const eco = innerWidth < 900 || (navigator.hardwareConcurrency || 8) <= 4;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: eco, powerPreference: 'high-performance' });
  } catch (e) { onFail?.(); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, eco ? 1.5 : 1.6));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xcfdeeb, 0.00021);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 14000);

  const sky = makeSky();
  scene.add(sky.mesh, sky.stars);
  const sun = new THREE.DirectionalLight(0xffffff, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(eco ? 1024 : 2048, eco ? 1024 : 2048);
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 1600;
  sun.shadow.bias = -0.0004;
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight(0xc7d9ec, 0x6e6550, 0.9);
  scene.add(hemi);

  const city = buildCity({ eco, maxAniso });
  const complex = buildComplex({ eco, maxAniso });
  const apt = buildApartment({ maxAniso });
  scene.add(city.group, complex.group, apt.group);

  const pmrem = new THREE.PMREMGenerator(renderer);
  let envRT = null, envEl = 999, envTime = 0, envPending = false;
  function regenEnv() {
    const rt = pmrem.fromScene(sky.envScene, 0.02, 0.1, 1000);
    if (envRT) envRT.dispose();
    envRT = rt;
    scene.environment = rt.texture;
  }

  let composer = null, bloom = null;
  if (!eco) {
    const rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 4 });
    composer = new EffectComposer(renderer, rt);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.3, 0.5, 0.98);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
  }

  // ---------- state ----------
  const state = { floor: D.FLOOR_DEFAULT, hour: 13, season: 1, hover: null };
  const S = newSkyState();
  const sunDir = new THREE.Vector3(), lightDir = new THREE.Vector3();
  const anchor = new THREE.Vector3();
  let camRows = [];
  let pickK = 0;

  function placeApartment() {
    anchor.set(APT.x0, floorY(state.floor) + SLAB, APT.z);
    apt.group.position.copy(anchor);
    apt.group.updateMatrixWorld(true);
    camRows = D.CAMERA.map(r => (r[7] ? [r[0], r[1] + anchor.x, r[2] + anchor.y, r[3] + anchor.z, r[4], r[5], r[6]] : r.slice(0, 7)));
  }
  placeApartment();

  // ---------- labels ----------
  const labels = [];
  function addLabel(kind, getPos, text, times) {
    const el = document.createElement('div');
    el.className = 'lbl lbl-' + kind;
    labelsEl.appendChild(el);
    labels.push({ el, getPos, text, times, shown: false });
  }
  const icons = {
    M: '<i class="ic ic-m">M</i>',
    school: '<i class="ic"><svg viewBox="0 0 24 24"><path d="M3 9l9-5 9 5-9 5z" fill="currentColor"/><path d="M7 11v5c3 2 7 2 10 0v-5" fill="none" stroke="currentColor" stroke-width="2"/></svg></i>',
    park: '<i class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6" fill="currentColor"/><rect x="11" y="13" width="2" height="8" fill="currentColor"/></svg></i>',
    mall: '<i class="ic"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z" fill="currentColor"/><path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="2"/></svg></i>',
  };
  for (const k of Object.keys(POI)) {
    const P = POI[k];
    addLabel('poi', () => P.pos.clone().setY(62), () => `<span class="pill">${icons[P.icon]}<span class="tx"><b>${tr(P.key)}</b><small>${tr(P.sub)}</small></span></span>`, D.LABEL_TIMES.poi);
  }
  addLabel('home', () => new THREE.Vector3(0, 70, -20), () => `<span class="pill"><b>${tr('poi.home')}</b></span>`, D.LABEL_TIMES.poi);
  const Y = complex.yardLabels;
  for (const [k, key] of [['garden', 'am.garden'], ['play', 'am.play'], ['kinder', 'am.kinder'], ['sport', 'am.sport'], ['parking', 'am.parking'], ['shops', 'am.shops']]) {
    addLabel('am', () => Y[k], () => `<span>${tr(key)}</span>`, D.LABEL_TIMES.amenity);
  }
  for (const L of apt.labels) {
    addLabel('room', () => apt.group.localToWorld(L.local.clone()), () => `<span><b>${tr(L.key)}</b><small>${area(L.area)}</small></span>`, D.LABEL_TIMES.room);
  }
  const viewTag = $('#viewTag');
  function renderLabelText() { for (const L of labels) L.el.innerHTML = L.text(); viewTag.textContent = tr('view', { n: state.floor + 1 }); }
  renderLabelText();

  const v3 = new THREE.Vector3();
  function updateLabels(t) {
    const w = stage.clientWidth, h = stage.clientHeight;
    for (const L of labels) {
      const k = fade(L.times, t);
      if (k < 0.01) { if (L.shown) { L.el.style.opacity = 0; L.el.style.visibility = 'hidden'; L.shown = false; } continue; }
      v3.copy(L.getPos()).project(camera);
      if (v3.z > 1 || v3.z < -1) { L.el.style.visibility = 'hidden'; L.shown = false; continue; }
      const x = (v3.x * 0.5 + 0.5) * w, y = (-v3.y * 0.5 + 0.5) * h;
      L.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      L.el.style.opacity = k.toFixed(3);
      L.el.style.visibility = 'visible';
      L.shown = true;
    }
    viewTag.style.opacity = fade(D.LABEL_TIMES.view, t).toFixed(3);
  }

  // ---------- chapter UI ----------
  let activeCh = -1;
  function setChapter(i) {
    if (i === activeCh) return;
    activeCh = i;
    cards.forEach((c, k) => { const on = k === i; c.classList.toggle('is-active', on); c.inert = !on; });
    railBtns.forEach((b, k) => { b.classList.toggle('is-active', k === i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
  }

  const bDate = $('#bDate'), bStage = $('#bStage'), bFill = $('#bFill'), bPct = $('#bPct'), bToday = $('#bToday');
  bToday.style.left = ((D.TODAY - D.BUILD_START) / D.BUILD_SPAN * 100).toFixed(1) + '%';
  let lastBuild = '';
  function updateBuild(p) {
    const date = D.BUILD_START + p * D.BUILD_SPAN;
    const y = Math.floor(date + 1e-6), q = Math.min(4, Math.floor((date - y) * 4 + 1e-6) + 1);
    let stageKey = D.BUILD_STAGES[0][1];
    for (const [th, k] of D.BUILD_STAGES) if (p >= th) stageKey = k;
    const key = y + '|' + q + '|' + stageKey + '|' + Math.round(p * 100);
    if (key === lastBuild) return;
    lastBuild = key;
    bDate.textContent = quarter(q, y);
    bStage.textContent = tr(stageKey);
    bFill.style.width = (p * 100).toFixed(1) + '%';
    bPct.textContent = Math.round(p * 100) + '% ' + tr('build.done');
  }

  const fpNum = $('#fpNum'), fpOf = $('#fpOf'), fpMeta = $('#fpMeta'), fpFlats = $('#fpFlats'), fpDown = $('#fpDown'), fpUp = $('#fpUp');
  function renderFloorUI() {
    fpNum.textContent = state.floor + 1;
    fpOf.textContent = tr('fp.of', { n: D.TOWER_A_FLOORS });
    const sts = D.FLATS.map((f, k) => D.flatStatus(state.floor, k));
    const free = sts.filter(s => s === 'free').length;
    fpMeta.textContent = tr('fp.free', { n: free }) + ' · ' + tr('fp.ppm', { p: money(D.ppmFor(state.floor)) });
    fpFlats.innerHTML = D.FLATS.map((f, k) => `<li class="st-${sts[k]}${f.tour ? ' is-tour' : ''}"><b>${tr('fp.r' + f.r)}</b><span>${area(f.a)}</span><em>${tr('st.' + sts[k])}</em></li>`).join('');
    fpDown.disabled = state.floor <= D.PICK_MIN;
    fpUp.disabled = state.floor >= D.PICK_MAX;
    viewTag.textContent = tr('view', { n: state.floor + 1 });
  }
  function setFloor(f) {
    f = Math.max(D.PICK_MIN, Math.min(D.PICK_MAX, f));
    if (f === state.floor) return;
    state.floor = f;
    placeApartment();
    renderFloorUI();
    invalidate();
  }
  fpDown.addEventListener('click', () => setFloor(state.floor - 1));
  fpUp.addEventListener('click', () => setFloor(state.floor + 1));
  $('#fpGo').addEventListener('click', () => scrollToTime(48.8));

  const sunRange = $('#sunRange'), sunClock = $('#sunClock'), sunHours = $('#sunHours');
  const seasonBtns = [...document.querySelectorAll('[data-season]')];
  sunRange.value = state.hour;
  function renderSunUI() {
    sunClock.textContent = clock(state.hour);
    sunHours.textContent = tr('sun.hours', { h: num(directSunHours(state.season ? 355 : 172), 1) });
    seasonBtns.forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.season === state.season)));
  }
  sunRange.addEventListener('input', () => { state.hour = +sunRange.value; renderSunUI(); invalidate(); });
  seasonBtns.forEach(b => b.addEventListener('click', () => { state.season = +b.dataset.season; renderSunUI(); invalidate(); }));

  railBtns.forEach((b, i) => b.addEventListener('click', () => scrollToTime(D.CHAPTERS[i].start + (i ? 1.6 : 0))));

  function scrollToTime(tt) {
    const top = scrollY + story.getBoundingClientRect().top;
    const span = story.offsetHeight - stage.clientHeight;
    scrollTo({ top: top + span * (tt / D.DURATION), behavior: reduce ? 'auto' : 'smooth' });
  }

  function onLang() { renderLabelText(); renderFloorUI(); renderSunUI(); lastBuild = ''; invalidate(); }
  window.addEventListener('langchange', onLang);
  renderFloorUI(); renderSunUI();

  // ---------- picking floors on the tower ----------
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pickAt(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    return complex.pickFloor(ray.ray);
  }
  canvas.addEventListener('pointermove', (e) => {
    if (pickK < 0.5 || e.pointerType !== 'mouse') { if (state.hover != null) { state.hover = null; canvas.style.cursor = ''; invalidate(); } return; }
    const f = pickAt(e);
    canvas.style.cursor = f != null ? 'pointer' : '';
    if (f !== state.hover) { state.hover = f; invalidate(); }
  });
  canvas.addEventListener('click', (e) => { if (pickK < 0.5) return; const f = pickAt(e); if (f != null) setFloor(f); });

  // ---------- camera ----------
  const tgt = new THREE.Vector3(), camPos = new THREE.Vector3(), shadowC = new THREE.Vector3();
  let camDist = 100;
  function setCamera(t, windowK) {
    const rows = camRows;
    let a = rows[0], b = rows[0], s = 0;
    if (t >= rows[rows.length - 1][0]) { a = b = rows[rows.length - 1]; }
    else if (t > rows[0][0]) {
      let i = 1; while (rows[i][0] < t) i++;
      a = rows[i - 1]; b = rows[i];
      const u = (t - a[0]) / (b[0] - a[0]); s = u * u * (3 - 2 * u);
    }
    const L = (k) => a[k] + (b[k] - a[k]) * s;
    tgt.set(L(1), L(2), L(3));
    camDist = Math.exp(Math.log(a[4]) + (Math.log(b[4]) - Math.log(a[4])) * s);
    // portrait screens see less sideways, so step back (but never in the view from the window)
    const narrow = camera.aspect < 1 ? Math.min(1.5, 0.6 + 0.42 / camera.aspect) : 1;
    camDist *= 1 + (narrow - 1) * (1 - windowK);
    const el = L(5) * Math.PI / 180, az = L(6) * Math.PI / 180;
    camPos.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(camDist).add(tgt);
    camera.position.copy(camPos);
    camera.lookAt(tgt);
    const phone = stage.clientWidth < 760;
    camera.fov = (phone ? 52 : 42) + 12 * windowK;
    camera.near = Math.min(2, Math.max(0.06, camDist * 0.0035));
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }

  function layout() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    if (composer) { composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(w, h); }
    camera.aspect = w / h;
    if (w < 760) camera.setViewOffset(w, h, 0, Math.round(h * 0.15), w, h);
    else camera.setViewOffset(w, h, -Math.round(Math.min(w * 0.15, 250)), 0, w, h);
    camera.updateProjectionMatrix();
  }

  // ---------- render one moment of the story ----------
  function render(t, now) {
    const chIdx = D.CHAPTERS.reduce((acc, c, i) => (t + 0.001 >= c.start ? i : acc), 0);
    setChapter(chIdx);
    bar.style.transform = `scaleX(${(t / D.DURATION).toFixed(4)})`;

    // sun: story clock, handed to the visitor's slider in the sunlight chapter
    const sk = D.track(D.SUNCTL, t);
    const storyH = D.track(D.SUN, t);
    const hour = storyH + (state.hour + 24 - storyH) * sk;
    const doy = 172 + (355 - 172) * state.season * sk;
    const sa = sunAngles(hour, doy);
    dirFromAngles(sa.el, sa.az, sunDir);
    skyState(sa.el, S);
    sky.update(S, sunDir);
    const liftK = D.track(D.LIFT, t);
    const windowK = D.track(D.WINDOW, t);
    if (S.sunInt > 0.02) { sun.color.copy(S.sunCol); sun.intensity = S.sunInt; lightDir.copy(sunDir); }
    else { sun.color.set('#8fa5d8'); sun.intensity = 0.32 * S.night; dirFromAngles(38, 150, lightDir); }
    hemi.color.copy(S.hemiSky); hemi.groundColor.copy(S.hemiGround);
    const inside = liftK * (1 - windowK);
    hemi.intensity = S.hemiInt * (1 - 0.6 * inside);
    scene.environmentIntensity = S.envInt * (1 - 0.62 * inside);
    scene.fog.color.copy(S.fog);
    renderer.toneMappingExposure = S.exposure;
    if (Math.abs(sa.el - envEl) > 1.0) {
      if (now - envTime > 150 || envEl === 999) { regenEnv(); envEl = sa.el; envTime = now; envPending = false; }
      else envPending = true;
    } else envPending = false;

    // buildings
    const p = D.track(D.BUILD, t);
    complex.update({ p, lift: liftK, cut: state.floor, t, landscape: sm(0.86, 1, p) });
    complex.setNight(S.night);
    apt.group.visible = liftK > 0.04;
    apt.ceilingMat.colorWrite = windowK > 0.97;
    pickK = D.track(D.PICK, t);
    complex.setHighlight(state.floor, pickK * (1 - liftK), state.hover);

    // district
    city.update(t, S, D.track(D.ROUTES, t), D.track(D.POIS, t));

    // camera and shadows
    setCamera(t, windowK);
    sky.mesh.position.copy(camera.position);
    sky.stars.position.copy(camera.position);
    const half = Math.min(320, Math.max(11, camDist * 0.6, windowK * 26));
    shadowC.copy(tgt).lerp(camPos, windowK * 0.85);
    const sc = sun.shadow.camera;
    sc.left = sc.bottom = -half; sc.right = sc.top = half; sc.updateProjectionMatrix();
    sun.position.copy(shadowC).addScaledVector(lightDir, 700);
    sun.target.position.copy(shadowC);
    sun.shadow.normalBias = half / 2048 * 1.6;

    updateLabels(t);
    if (chIdx === 2) updateBuild(p);

    if (composer) { bloom.strength = 0.22 + 0.42 * S.night; composer.render(); }
    else renderer.render(scene, camera);
  }

  // ---------- loop: scroll sets the target time, the shown time eases toward it ----------
  let time = 0, target = 0, drawnT = -1, dirty = true, raf = 0, last = performance.now(), visible = true;
  function readTarget() {
    const r = story.getBoundingClientRect();
    const span = r.height - stage.clientHeight;
    return Math.min(1, Math.max(0, -r.top / (span || 1))) * D.DURATION;
  }
  function frame(now) {
    raf = 0;
    const dt = Math.min(0.25, (now - last) / 1000); last = now;
    target = readTarget();
    if (reduce) time = target;
    else { time += (target - time) * (1 - Math.exp(-dt * 5)); if (Math.abs(target - time) < 0.002) time = target; }
    if (time !== drawnT || dirty) { render(time, now); drawnT = time; dirty = false; }
    $('#hint').classList.toggle('gone', time > 0.35);
    if (time !== target || envPending) schedule();
  }
  function schedule() { if (!raf && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function invalidate() { dirty = true; schedule(); }

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => { layout(); invalidate(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) invalidate(); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) invalidate(); }, { rootMargin: '100px' }).observe(story);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onFail?.(); });

  layout();
  time = target = readTarget();
  render(time, performance.now());
  drawnT = time;
  stage.classList.add('is-ready');
  schedule();

  if (new URLSearchParams(location.search).has('debug')) {
    window.__world = {
      render: (tt) => render(tt, performance.now() + 1e6), state, setFloor, scene, camera, renderer, S,
      go: (tt) => {
        const top = scrollY + story.getBoundingClientRect().top;
        scrollTo(0, top + (story.offsetHeight - stage.clientHeight) * tt / D.DURATION);
        time = target = readTarget();
        render(time, performance.now() + 1e6); drawnT = time;
        return +time.toFixed(2);
      },
    };
  }
}
