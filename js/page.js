import { initLang, setLang, getLang, t, money, usd, area, num } from './i18n.js';
import { DURATION, CHAPTERS, LAYOUTS, FLATS, ppmFor, PICK_MIN, PICK_MAX } from './data.js';
import { store, setStore } from './store.js';

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
window.addEventListener('storechange', () => renderCalc());

// ---------- header ----------
const hdr = $('#hdr');
function onScroll() { hdr.classList.toggle('is-solid', story.getBoundingClientRect().bottom < 70); }
addEventListener('scroll', onScroll, { passive: true });

function timeToY(tt) {
  const top = scrollY + story.getBoundingClientRect().top;
  return top + (story.offsetHeight - stage.clientHeight) * (tt / DURATION);
}
// Long jumps are instant; the 3D eases to the new moment by itself.
function go(y) { scrollTo({ top: y, behavior: reduce || Math.abs(y - scrollY) > innerHeight * 2.5 ? 'auto' : 'smooth' }); }
document.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', (e) => {
  if (story.classList.contains('is-static')) return;
  e.preventDefault();
  go(timeToY(CHAPTERS[+a.dataset.jump].start + 1.6));
}));

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
        <div class="lay-actions">
          ${L.tour ? `<button type="button" class="btn btn-ghost-dark" data-tour>${t('lay.tour')}</button>` : ''}
          <button type="button" class="btn btn-ghost-dark" data-pick="${i}">${t('lay.calc')}</button>
        </div>
      </div>
    </article>`).join('');
  $('#layGrid [data-tour]')?.addEventListener('click', () => {
    if (story.classList.contains('is-static')) return;
    go(timeToY(50));
  });
  document.querySelectorAll('#layGrid [data-pick]').forEach(b => b.addEventListener('click', () => {
    setStore({ layout: +b.dataset.pick });
    $('#payment').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));
}

// ---------- instalment calculator (shares floor and layout with the 3D story) ----------
const calc = { down: 40, term: 24 };
const TERMS = [12, 24, 36];
const payDown = $('#payDown');
payDown.addEventListener('input', () => { calc.down = +payDown.value; renderCalc(); });
$('#payFloorDown').addEventListener('click', () => setStore({ floor: Math.max(PICK_MIN, store.floor - 1) }));
$('#payFloorUp').addEventListener('click', () => setStore({ floor: Math.min(PICK_MAX, store.floor + 1) }));
$('#payLayout').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) setStore({ layout: +b.dataset.i }); });
$('#payTerm').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { calc.term = +b.dataset.n; renderCalc(); } });
function renderCalc() {
  $('#payLayout').innerHTML = LAYOUTS.map((L, i) => `<button type="button" aria-pressed="${i === store.layout}" data-i="${i}">${t('lay.r' + L.r)}</button>`).join('');
  $('#payTerm').innerHTML = TERMS.map(n => `<button type="button" aria-pressed="${n === calc.term}" data-n="${n}">${t('pay.months', { n })}</button>`).join('');
  $('#payFloorNum').textContent = store.floor + 1;
  $('#payFloorDown').disabled = store.floor <= PICK_MIN;
  $('#payFloorUp').disabled = store.floor >= PICK_MAX;
  const L = LAYOUTS[store.layout];
  const price = L.a * ppmFor(store.floor);
  const first = price * calc.down / 100;
  const monthly = (price - first) / calc.term;
  $('#payDownPct').textContent = calc.down + '%';
  payDown.setAttribute('aria-valuetext', calc.down + '%');
  $('#payPrice').textContent = money(price);
  $('#payFirst').textContent = money(first);
  $('#payMonthly').textContent = money(monthly);
  $('#payUsd').textContent = usd(monthly);
}

// ---------- booking (a demo form: validates, never sends) ----------
const bk = $('#bk'), bkForm = $('#bkForm'), bkOk = $('#bkOk');
const bkName = $('#bkName'), bkPhone = $('#bkPhone'), bkDate = $('#bkDate'), bkFlat = $('#bkFlat');
let bkCtx = null;
function flatContext(fromCalc) {
  if (fromCalc) { const L = LAYOUTS[store.layout]; return { r: L.r, a: L.a, floor: store.floor }; }
  const f = FLATS[store.flat]; return { r: f.r, a: f.a, floor: store.floor };
}
function isoDay(offset) { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); }
function openBooking(ctx) {
  bkCtx = ctx;
  bkFlat.value = t('bk.flatVal', { r: t('fp.r' + ctx.r), a: area(ctx.a), n: ctx.floor + 1 });
  bkDate.min = isoDay(1);
  if (!bkDate.value || bkDate.value < bkDate.min) bkDate.value = isoDay(2);
  ['bkNameErr', 'bkPhoneErr', 'bkDateErr'].forEach(id => { $('#' + id).textContent = ''; });
  [bkName, bkPhone, bkDate].forEach(el => el.removeAttribute('aria-invalid'));
  bkForm.hidden = false; bkOk.hidden = true;
  bk.showModal();
  bkName.focus();
}
document.querySelectorAll('[data-visit]').forEach(b => b.addEventListener('click', () => openBooking(flatContext(false))));
$('#payReserve').addEventListener('click', () => openBooking(flatContext(true)));
bk.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => bk.close()));
bk.addEventListener('click', (e) => { if (e.target === bk) bk.close(); });
window.addEventListener('langchange', () => { if (bk.open && bkCtx && !bkForm.hidden) bkFlat.value = t('bk.flatVal', { r: t('fp.r' + bkCtx.r), a: area(bkCtx.a), n: bkCtx.floor + 1 }); });

bkPhone.addEventListener('input', () => {
  const d = bkPhone.value.replace(/\D/g, '').slice(0, 9);
  bkPhone.value = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ');
});
bkForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = bkName.value.trim(), digits = bkPhone.value.replace(/\D/g, ''), date = bkDate.value;
  const errs = [
    [bkName, 'bkNameErr', name ? '' : t('bk.errName')],
    [bkPhone, 'bkPhoneErr', digits.length === 9 ? '' : t('bk.errPhone')],
    [bkDate, 'bkDateErr', date && date >= bkDate.min ? '' : t('bk.errDate')],
  ];
  let firstBad = null;
  for (const [el, id, msg] of errs) {
    $('#' + id).textContent = msg;
    if (msg) { el.setAttribute('aria-invalid', 'true'); firstBad ||= el; } else el.removeAttribute('aria-invalid');
  }
  if (firstBad) { firstBad.focus(); return; }
  const via = t({ call: 'bk.call', tg: 'bk.tg', wa: 'bk.wa' }[new FormData(bkForm).get('via')]);
  const loc = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-GB' }[getLang()];
  const when = new Date(date + 'T12:00').toLocaleDateString(loc, { day: 'numeric', month: 'long' });
  $('#bkOkText').textContent = t('bk.okText', { name, via, phone: '+998 ' + bkPhone.value, date: when });
  bkForm.hidden = true; bkOk.hidden = false;
  bkOk.querySelector('[data-close]').focus();
});

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
