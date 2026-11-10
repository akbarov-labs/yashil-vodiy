import { initLang, setLang, getLang, t, money, usd, area, num } from './i18n.js';
import { DURATION, CHAPTERS, LAYOUTS, ppmFor, FLOOR_DEFAULT } from './data.js';

const $ = (s) => document.querySelector(s);
const story = $('#story'), stage = $('#stage');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- language ----------
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
function onLang() {
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === getLang())));
  document.title = t('meta.title');
  document.querySelectorAll('[data-num]').forEach(el => { el.textContent = num(+el.dataset.num, 1); });
  renderLayouts();
  renderCalc();
  if (fbKey) $('#fbText').textContent = t(fbKey);
}
window.addEventListener('langchange', onLang);

// ---------- header ----------
const hdr = $('#hdr');
function onScroll() { hdr.classList.toggle('is-solid', story.getBoundingClientRect().bottom < 70); }
addEventListener('scroll', onScroll, { passive: true });

function timeToY(tt) {
  const top = scrollY + story.getBoundingClientRect().top;
  return top + (story.offsetHeight - stage.clientHeight) * (tt / DURATION);
}
document.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', (e) => {
  if (story.classList.contains('is-static')) return;
  e.preventDefault();
  scrollTo({ top: timeToY(CHAPTERS[+a.dataset.jump].start + 1.6), behavior: reduce ? 'auto' : 'smooth' });
}));

// ---------- booking dialog ----------
const dlg = $('#dlg');
document.querySelectorAll('[data-visit]').forEach(b => b.addEventListener('click', () => dlg.showModal()));
$('#dlgClose').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

// ---------- layouts ----------
function planSVG(L) {
  const pad = 0.6, minP = L.loggia ? L.loggia[1] : 0;
  const W = L.w + pad * 2, H = L.d - minP + pad * 2;
  const X = (x) => (x + pad).toFixed(2), Y = (p) => (p - minP + pad).toFixed(2);
  let s = `<svg viewBox="0 0 ${W.toFixed(2)} ${H.toFixed(2)}" role="img" aria-hidden="true">`;
  if (L.loggia) { const [x, p, w, d] = L.loggia; s += `<rect x="${X(x)}" y="${Y(p)}" width="${w}" height="${d}" class="pl-loggia"/>`; }
  for (const [x, p, w, d] of L.rooms) s += `<rect x="${X(x)}" y="${Y(p)}" width="${w}" height="${d}" class="pl-room"/>`;
  s += `<rect x="${X(0)}" y="${Y(0)}" width="${L.w}" height="${L.d}" class="pl-outer"/>`;
  return s + '</svg>';
}
function renderLayouts() {
  $('#layGrid').innerHTML = LAYOUTS.map((L, i) => `
    <article class="lay-card${L.tour ? ' is-featured' : ''}">
      <div class="lay-plan">${planSVG(L)}</div>
      <div class="lay-body">
        <h3>${t('lay.r' + L.r)}</h3>
        <p class="lay-area">${area(L.a)}</p>
        <p class="lay-price">${t('lay.from', { p: money(L.a * ppmFor(1)) })}</p>
        ${L.tour ? `<button type="button" class="btn btn-ghost-dark" data-tour>${t('lay.tour')}</button>` : `<button type="button" class="btn btn-ghost-dark" data-pick="${i}">${t('lay.calc')}</button>`}
      </div>
    </article>`).join('');
  $('#layGrid [data-tour]')?.addEventListener('click', () => {
    if (story.classList.contains('is-static')) return;
    scrollTo({ top: timeToY(50), behavior: reduce ? 'auto' : 'smooth' });
  });
  document.querySelectorAll('#layGrid [data-pick]').forEach(b => b.addEventListener('click', () => {
    calc.layout = +b.dataset.pick; renderCalc();
    $('#payment').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));
}

// ---------- instalment calculator ----------
const calc = { layout: 2, down: 40, term: 24 };
const TERMS = [12, 24, 36];
$('#payDown').addEventListener('input', (e) => { calc.down = +e.target.value; renderCalc(); });
function renderCalc() {
  $('#payLayout').innerHTML = LAYOUTS.map((L, i) => `<button type="button" aria-pressed="${i === calc.layout}" data-i="${i}">${t('lay.r' + L.r)}</button>`).join('');
  $('#payTerm').innerHTML = TERMS.map(n => `<button type="button" aria-pressed="${n === calc.term}" data-n="${n}">${t('pay.months', { n })}</button>`).join('');
  document.querySelectorAll('#payLayout button').forEach(b => b.addEventListener('click', () => { calc.layout = +b.dataset.i; renderCalc(); }));
  document.querySelectorAll('#payTerm button').forEach(b => b.addEventListener('click', () => { calc.term = +b.dataset.n; renderCalc(); }));
  const L = LAYOUTS[calc.layout];
  const price = L.a * ppmFor(FLOOR_DEFAULT);
  const first = price * calc.down / 100;
  const monthly = (price - first) / calc.term;
  $('#payDownPct').textContent = calc.down + '%';
  $('#payPrice').textContent = money(price);
  $('#payFirst').textContent = money(first);
  $('#payMonthly').textContent = money(monthly);
  $('#payUsd').textContent = usd(monthly);
}

// ---------- 3D tour or static fallback ----------
let fbKey = null;
function goStatic(key, canLoad) {
  fbKey = key;
  story.classList.add('is-static');
  stage.classList.remove('is-ready');
  $('#fbNote').hidden = false;
  $('#fbText').textContent = t(key);
  $('#fbBtn').hidden = !canLoad;
  document.querySelectorAll('.card').forEach(c => { c.inert = false; });
}
function hasWebGL2() {
  try { return !!document.createElement('canvas').getContext('webgl2'); } catch (e) { return false; }
}
function load3D() {
  fbKey = null;
  story.classList.remove('is-static');
  $('#fbNote').hidden = true;
  import('./story.js')
    .then(m => m.start({ reduce, onFail: () => goStatic('fb.fail', false) }))
    .catch(err => { console.error(err); goStatic('fb.fail', false); });
}
$('#fbBtn').addEventListener('click', () => { load3D(); scrollTo({ top: timeToY(0) }); });

initLang();
onLang();
onScroll();
requestAnimationFrame(onScroll);
addEventListener('load', onScroll);

if (!hasWebGL2()) goStatic('fb.fail', false);
else if (reduce) goStatic('fb.text', true);
else (window.requestIdleCallback || ((f) => setTimeout(f, 60)))(load3D, { timeout: 600 });
