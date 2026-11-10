// All page text in three languages. Elements with data-i18n="key" are filled from here.

const STR = {
  en: {
    'meta.title': 'Yashil Vodiy Residence · Concept',
    'brand.sub': 'Residence',
    'nav.location': 'Location', 'nav.construction': 'Construction', 'nav.apartments': 'Apartments', 'nav.payment': 'Payment',
    'cta.short': 'Book a visit',
    'skip': 'Skip the 3D tour',
    'hero.eyebrow': 'Concept residential complex · Tashkent',
    'ch1.title': 'A green valley in the city',
    'ch1.text': 'Three towers around a car-free garden courtyard, four minutes from the metro. Keys are handed over in Q4 2027.',
    'ch1.f1': 'towers', 'ch1.f2': 'apartments', 'ch1.f3': 'ha garden',
    'scroll': 'Scroll to explore', 'rail.home': 'Overview',
    'ch2.eyebrow': 'Location', 'ch2.title': 'Everything within a walk',
    'ch2.text': 'The metro, a school and a shopping mall are minutes away, and Chinor Park begins across the street.',
    'poi.metro': 'Metro station', 'poi.metroT': '4 min walk',
    'poi.school': 'School', 'poi.schoolT': '7 min walk',
    'poi.park': 'Chinor Park', 'poi.parkT': 'across the street',
    'poi.mall': 'Shopping mall', 'poi.mallT': '5 min by car',
    'poi.home': 'Yashil Vodiy',
    'ch3.eyebrow': 'Construction', 'ch3.title': 'Watch it rise',
    'ch3.text': 'Follow the build from the foundation to the keys. Every stage has a date on the public schedule.',
    'build.s0': 'Foundation', 'build.s1': 'Frame', 'build.s2': 'Facade', 'build.s3': 'Landscaping', 'build.s4': 'Keys handed over',
    'build.today': 'Today', 'build.done': 'built',
    'ch4.eyebrow': 'Courtyard', 'ch4.title': 'A courtyard without cars',
    'ch4.text': 'Cars stay in the underground car park. Above it are gardens, a playground, a sports court and a kindergarten for 120 children.',
    'am.garden': 'Garden without cars', 'am.play': 'Playground', 'am.kinder': 'Kindergarten · 120 places',
    'am.sport': 'Sports court', 'am.parking': 'Underground parking · 380 spaces', 'am.shops': 'Cafés and shops',
    'ch5.eyebrow': 'Choose a floor', 'ch5.title': 'Pick your floor',
    'ch5.text': 'Tap the tower or use the buttons to see what is available. The upper floors look out to the mountains.',
    'fp.floor': 'Floor', 'fp.of': 'of {n}', 'fp.down': 'Lower floor', 'fp.up': 'Higher floor',
    'fp.free': '{n} of 8 available', 'fp.ppm': 'from {p} per m²',
    'fp.r1': '1 room', 'fp.r2': '2 rooms', 'fp.r3': '3 rooms', 'fp.r4': '4 rooms',
    'st.free': 'Available', 'st.res': 'Reserved', 'st.sold': 'Sold',
    'fp.go': 'See the 3-room apartment', 'fp.hint': 'Tap the tower to choose a floor',
    'ch6.eyebrow': 'The apartment', 'ch6.title': 'Three rooms, 94.5 m²',
    'ch6.text': 'A 42 m² kitchen-living room opens onto a 16 m² loggia. Both bedrooms face the garden.',
    'rm.living': 'Kitchen-living room', 'rm.bed1': 'Bedroom', 'rm.bed2': 'Children’s room', 'rm.hall': 'Hall',
    'rm.ward': 'Wardrobe', 'rm.bath': 'Bathroom', 'rm.loggia': 'Loggia',
    'ch7.eyebrow': 'Sunlight', 'ch7.title': 'Sun in every room',
    'ch7.text': 'Drag the time of day. In summer the loggia shades the rooms from the high sun; in winter the low sun reaches deep inside.',
    'sun.time': 'Time of day', 'sun.summer': 'Summer', 'sun.winter': 'Winter',
    'sun.hours': 'Direct sun on the windows: about {h} h a day', 'view': 'View from floor {n}',
    'lay.eyebrow': 'Layouts', 'lay.title': 'Find your layout',
    'lay.text': 'Four layouts, each with a loggia and 2.85 m ceilings.',
    'lay.r1': '1-room', 'lay.r2': '2-room', 'lay.r3': '3-room', 'lay.r4': '4-room',
    'lay.from': 'from {p}', 'lay.tour': 'Explore in 3D', 'lay.calc': 'Calculate instalments',
    'pay.eyebrow': 'Payment', 'pay.title': 'Interest-free instalments',
    'pay.text': 'Pay part now and the rest in equal monthly payments, with no interest and no bank.',
    'pay.layout': 'Apartment', 'pay.down': 'Down payment', 'pay.term': 'Term', 'pay.months': '{n} months',
    'pay.price': 'Apartment price', 'pay.first': 'Down payment', 'pay.monthly': 'Monthly payment',
    'pay.note': 'Illustrative figures for a concept project, at 12,100 so’m to the dollar.',
    'end.title': 'Come and see the site',
    'end.text': 'At the sales office we show you the scale model and take you to the construction site.',
    'end.btn': 'Book a visit',
    'dlg.title': 'This is a concept demo',
    'dlg.text': 'Yashil Vodiy Residence is a fictional project by Akbarov Labs. It shows how a developer’s website can tell its story in 3D. On a real site, this button opens the booking form.',
    'dlg.link': 'Visit akbarovlabs.uz', 'dlg.close': 'Close',
    'foot.concept': 'Yashil Vodiy Residence is a fictional concept. Prices, dates and locations are illustrative.',
    'foot.made': 'Website concept by', 'foot.how': 'How this page works',
    'load': 'Loading the 3D tour',
    'fb.text': 'The 3D tour is off on this device. Here is the project in brief.',
    'fb.btn': 'Load the 3D tour', 'fb.fail': '3D is not available in this browser, so here is the project in brief.',
    'u.som': 'so’m', 'u.mln': 'mln so’m', 'u.bn': 'bn so’m',
    'q': 'Q{q} {y}',
  },
  ru: {
    'meta.title': 'Yashil Vodiy Residence · Концепт',
    'brand.sub': 'Residence',
    'nav.location': 'Расположение', 'nav.construction': 'Стройка', 'nav.apartments': 'Квартиры', 'nav.payment': 'Оплата',
    'cta.short': 'Записаться',
    'skip': 'Пропустить 3D-тур',
    'hero.eyebrow': 'Концепт жилого комплекса · Ташкент',
    'ch1.title': 'Зелёная долина посреди города',
    'ch1.text': 'Три башни вокруг двора-сада без машин, четыре минуты до метро. Ключи — в IV квартале 2027 года.',
    'ch1.f1': 'башни', 'ch1.f2': 'квартиры', 'ch1.f3': 'га сада',
    'scroll': 'Листайте, чтобы посмотреть', 'rail.home': 'Обзор',
    'ch2.eyebrow': 'Расположение', 'ch2.title': 'Всё в шаговой доступности',
    'ch2.text': 'Метро, школа и торговый центр — в нескольких минутах, а парк «Чинор» начинается прямо через дорогу.',
    'poi.metro': 'Станция метро', 'poi.metroT': '4 мин пешком',
    'poi.school': 'Школа', 'poi.schoolT': '7 мин пешком',
    'poi.park': 'Парк «Чинор»', 'poi.parkT': 'через дорогу',
    'poi.mall': 'Торговый центр', 'poi.mallT': '5 мин на машине',
    'poi.home': 'Yashil Vodiy',
    'ch3.eyebrow': 'Строительство', 'ch3.title': 'Как растёт дом',
    'ch3.text': 'Следите за стройкой от фундамента до ключей. У каждого этапа есть дата в открытом графике.',
    'build.s0': 'Фундамент', 'build.s1': 'Каркас', 'build.s2': 'Фасад', 'build.s3': 'Благоустройство', 'build.s4': 'Ключи выданы',
    'build.today': 'Сегодня', 'build.done': 'готово',
    'ch4.eyebrow': 'Двор', 'ch4.title': 'Двор без машин',
    'ch4.text': 'Машины остаются в подземном паркинге. Над ним — сад, детская и спортивная площадки и детский сад на 120 мест.',
    'am.garden': 'Сад без машин', 'am.play': 'Детская площадка', 'am.kinder': 'Детский сад · 120 мест',
    'am.sport': 'Спортплощадка', 'am.parking': 'Подземный паркинг · 380 мест', 'am.shops': 'Кафе и магазины',
    'ch5.eyebrow': 'Выбор этажа', 'ch5.title': 'Выберите этаж',
    'ch5.text': 'Нажмите на башню или используйте кнопки, чтобы увидеть свободные квартиры. С верхних этажей видны горы.',
    'fp.floor': 'Этаж', 'fp.of': 'из {n}', 'fp.down': 'Этаж ниже', 'fp.up': 'Этаж выше',
    'fp.free': 'Свободно {n} из 8', 'fp.ppm': 'от {p} за м²',
    'fp.r1': '1-комн.', 'fp.r2': '2-комн.', 'fp.r3': '3-комн.', 'fp.r4': '4-комн.',
    'st.free': 'Свободна', 'st.res': 'Бронь', 'st.sold': 'Продана',
    'fp.go': 'Смотреть 3-комнатную', 'fp.hint': 'Нажмите на башню, чтобы выбрать этаж',
    'ch6.eyebrow': 'Квартира', 'ch6.title': 'Три комнаты, 94,5 м²',
    'ch6.text': 'Кухня-гостиная 42 м² выходит на лоджию 16 м². Обе спальни смотрят во двор-сад.',
    'rm.living': 'Кухня-гостиная', 'rm.bed1': 'Спальня', 'rm.bed2': 'Детская', 'rm.hall': 'Прихожая',
    'rm.ward': 'Гардеробная', 'rm.bath': 'Ванная', 'rm.loggia': 'Лоджия',
    'ch7.eyebrow': 'Солнце', 'ch7.title': 'Солнце в каждой комнате',
    'ch7.text': 'Двигайте время суток. Летом лоджия защищает комнаты от высокого солнца, а зимой низкое солнце проходит глубоко в квартиру.',
    'sun.time': 'Время суток', 'sun.summer': 'Лето', 'sun.winter': 'Зима',
    'sun.hours': 'Прямое солнце в окнах: около {h} ч в день', 'view': 'Вид с {n} этажа',
    'lay.eyebrow': 'Планировки', 'lay.title': 'Найдите свою планировку',
    'lay.text': 'Четыре планировки, в каждой — лоджия и потолки 2,85 м.',
    'lay.r1': '1-комнатная', 'lay.r2': '2-комнатная', 'lay.r3': '3-комнатная', 'lay.r4': '4-комнатная',
    'lay.from': 'от {p}', 'lay.tour': 'Смотреть в 3D', 'lay.calc': 'Рассчитать рассрочку',
    'pay.eyebrow': 'Оплата', 'pay.title': 'Беспроцентная рассрочка',
    'pay.text': 'Внесите часть сейчас, а остаток — равными ежемесячными платежами, без процентов и без банка.',
    'pay.layout': 'Квартира', 'pay.down': 'Первый взнос', 'pay.term': 'Срок', 'pay.months': '{n} мес.',
    'pay.price': 'Стоимость квартиры', 'pay.first': 'Первый взнос', 'pay.monthly': 'Ежемесячный платёж',
    'pay.note': 'Расчёт условный, для концепт-проекта, по курсу 12 100 сум за доллар.',
    'end.title': 'Приезжайте посмотреть стройку',
    'end.text': 'В офисе продаж покажем макет и проведём на строительную площадку.',
    'end.btn': 'Записаться на визит',
    'dlg.title': 'Это концепт-демо',
    'dlg.text': 'Yashil Vodiy Residence — вымышленный проект Akbarov Labs. Он показывает, как сайт застройщика может рассказывать свою историю в 3D. На реальном сайте эта кнопка открывает форму записи.',
    'dlg.link': 'Перейти на akbarovlabs.uz', 'dlg.close': 'Закрыть',
    'foot.concept': 'Yashil Vodiy Residence — вымышленный концепт. Цены, сроки и расположение условны.',
    'foot.made': 'Концепт сайта —', 'foot.how': 'Как устроена эта страница',
    'load': 'Загружаем 3D-тур',
    'fb.text': 'На этом устройстве 3D-тур выключен. Вот проект вкратце.',
    'fb.btn': 'Загрузить 3D-тур', 'fb.fail': 'В этом браузере 3D недоступен, поэтому вот проект вкратце.',
    'u.som': 'сум', 'u.mln': 'млн сум', 'u.bn': 'млрд сум',
    'q': '{qr} кв. {y}',
  },
  uz: {
    'meta.title': 'Yashil Vodiy Residence · Konsept',
    'brand.sub': 'Residence',
    'nav.location': 'Joylashuv', 'nav.construction': 'Qurilish', 'nav.apartments': 'Xonadonlar', 'nav.payment': 'Toʻlov',
    'cta.short': 'Yozilish',
    'skip': '3D turni oʻtkazib yuborish',
    'hero.eyebrow': 'Turar joy majmuasi konsepti · Toshkent',
    'ch1.title': 'Shahar ichidagi yashil vodiy',
    'ch1.text': 'Avtomobilsiz bogʻ-hovli atrofida uchta minora, metrogacha toʻrt daqiqa. Kalitlar 2027-yilning 4-choragida topshiriladi.',
    'ch1.f1': 'minora', 'ch1.f2': 'xonadon', 'ch1.f3': 'ga bogʻ',
    'scroll': 'Koʻrish uchun pastga aylantiring', 'rail.home': 'Umumiy',
    'ch2.eyebrow': 'Joylashuv', 'ch2.title': 'Hammasi piyoda masofada',
    'ch2.text': 'Metro, maktab va savdo markazi bir necha daqiqalik yoʻlda, Chinor bogʻi esa roʻparada boshlanadi.',
    'poi.metro': 'Metro bekati', 'poi.metroT': 'piyoda 4 daqiqa',
    'poi.school': 'Maktab', 'poi.schoolT': 'piyoda 7 daqiqa',
    'poi.park': 'Chinor bogʻi', 'poi.parkT': 'roʻparada',
    'poi.mall': 'Savdo markazi', 'poi.mallT': 'mashinada 5 daqiqa',
    'poi.home': 'Yashil Vodiy',
    'ch3.eyebrow': 'Qurilish', 'ch3.title': 'Bino qanday koʻtariladi',
    'ch3.text': 'Poydevordan kalitlargacha boʻlgan jarayonni kuzating. Har bir bosqichning sanasi ochiq jadvalda koʻrsatilgan.',
    'build.s0': 'Poydevor', 'build.s1': 'Karkas', 'build.s2': 'Fasad', 'build.s3': 'Obodonlashtirish', 'build.s4': 'Kalitlar topshirildi',
    'build.today': 'Bugun', 'build.done': 'qurildi',
    'ch4.eyebrow': 'Hovli', 'ch4.title': 'Avtomobilsiz hovli',
    'ch4.text': 'Mashinalar yer osti avtoturargohida qoladi. Uning tepasida bogʻ, bolalar maydonchasi, sport maydoni va 120 oʻrinli bogʻcha joylashgan.',
    'am.garden': 'Avtomobilsiz bogʻ', 'am.play': 'Bolalar maydonchasi', 'am.kinder': 'Bogʻcha · 120 oʻrin',
    'am.sport': 'Sport maydoni', 'am.parking': 'Yer osti avtoturargohi · 380 oʻrin', 'am.shops': 'Kafe va doʻkonlar',
    'ch5.eyebrow': 'Qavat tanlash', 'ch5.title': 'Qavatingizni tanlang',
    'ch5.text': 'Boʻsh xonadonlarni koʻrish uchun minorani bosing yoki tugmalardan foydalaning. Yuqori qavatlardan togʻlar koʻrinadi.',
    'fp.floor': 'Qavat', 'fp.of': '{n} qavatdan', 'fp.down': 'Pastki qavat', 'fp.up': 'Yuqori qavat',
    'fp.free': '8 tadan {n} tasi boʻsh', 'fp.ppm': '1 m² uchun {p} dan',
    'fp.r1': '1 xonali', 'fp.r2': '2 xonali', 'fp.r3': '3 xonali', 'fp.r4': '4 xonali',
    'st.free': 'Sotuvda', 'st.res': 'Band qilingan', 'st.sold': 'Sotilgan',
    'fp.go': '3 xonali xonadonni koʻrish', 'fp.hint': 'Qavat tanlash uchun minorani bosing',
    'ch6.eyebrow': 'Xonadon', 'ch6.title': 'Uch xona, 94,5 m²',
    'ch6.text': '42 m² li oshxona-mehmonxona 16 m² li lodjiyaga chiqadi. Ikkala yotoqxona ham bogʻ tomonga qaragan.',
    'rm.living': 'Oshxona-mehmonxona', 'rm.bed1': 'Yotoqxona', 'rm.bed2': 'Bolalar xonasi', 'rm.hall': 'Dahliz',
    'rm.ward': 'Kiyim xonasi', 'rm.bath': 'Hammom', 'rm.loggia': 'Lodjiya',
    'ch7.eyebrow': 'Quyosh nuri', 'ch7.title': 'Har bir xonada quyosh',
    'ch7.text': 'Kun vaqtini suring. Yozda lodjiya xonalarni baland quyoshdan toʻsadi, qishda esa past quyosh xonadonning ichkarisigacha yetib boradi.',
    'sun.time': 'Kun vaqti', 'sun.summer': 'Yoz', 'sun.winter': 'Qish',
    'sun.hours': 'Derazalarga toʻgʻridan-toʻgʻri quyosh: kuniga taxminan {h} soat', 'view': '{n}-qavatdan manzara',
    'lay.eyebrow': 'Rejalar', 'lay.title': 'Oʻzingizga mos rejani toping',
    'lay.text': 'Toʻrt xil reja, har birida lodjiya va 2,85 m balandlikdagi shiftlar.',
    'lay.r1': '1 xonali', 'lay.r2': '2 xonali', 'lay.r3': '3 xonali', 'lay.r4': '4 xonali',
    'lay.from': '{p} dan', 'lay.tour': '3D da koʻrish', 'lay.calc': 'Toʻlovni hisoblash',
    'pay.eyebrow': 'Toʻlov', 'pay.title': 'Foizsiz muddatli toʻlov',
    'pay.text': 'Bir qismini hozir toʻlang, qolganini esa teng oylik toʻlovlar bilan — foizsiz va banksiz.',
    'pay.layout': 'Xonadon', 'pay.down': 'Boshlangʻich toʻlov', 'pay.term': 'Muddat', 'pay.months': '{n} oy',
    'pay.price': 'Xonadon narxi', 'pay.first': 'Boshlangʻich toʻlov', 'pay.monthly': 'Oylik toʻlov',
    'pay.note': 'Konsept loyiha uchun taxminiy hisob-kitob, kurs: 1 dollar = 12 100 soʻm.',
    'end.title': 'Qurilish maydonini koʻrishga keling',
    'end.text': 'Sotuv ofisida sizga maketni koʻrsatamiz va qurilish maydoniga olib boramiz.',
    'end.btn': 'Tashrifga yozilish',
    'dlg.title': 'Bu konsept namoyish',
    'dlg.text': 'Yashil Vodiy Residence — Akbarov Labs tomonidan yaratilgan xayoliy loyiha. U quruvchi kompaniya sayti oʻz hikoyasini 3D da qanday aytib berishi mumkinligini koʻrsatadi. Haqiqiy saytda bu tugma yozilish formasini ochadi.',
    'dlg.link': 'akbarovlabs.uz saytiga oʻtish', 'dlg.close': 'Yopish',
    'foot.concept': 'Yashil Vodiy Residence — xayoliy konsept. Narxlar, sanalar va joylashuv taxminiy.',
    'foot.made': 'Sayt konsepti:', 'foot.how': 'Sahifa qanday ishlaydi',
    'load': '3D tur yuklanmoqda',
    'fb.text': 'Bu qurilmada 3D tur oʻchirilgan. Quyida loyiha haqida qisqacha.',
    'fb.btn': '3D turni yuklash', 'fb.fail': 'Bu brauzerda 3D ishlamaydi, shuning uchun loyiha haqida qisqacha.',
    'u.som': 'soʻm', 'u.mln': 'mln soʻm', 'u.bn': 'mlrd soʻm',
    'q': '{y}-yil {q}-chorak',
  },
};

export const LANGS = ['uz', 'ru', 'en'];
let cur = 'en';

export const getLang = () => cur;

export function t(key, vars) {
  let s = STR[cur][key] ?? STR.en[key] ?? key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, n) => (vars[n] ?? m));
  return s;
}

export function applyDom(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
}

export function setLang(l) {
  cur = STR[l] ? l : 'en';
  document.documentElement.lang = cur;
  try { localStorage.setItem('yv-lang', cur); } catch (e) { /* storage blocked */ }
  applyDom();
  window.dispatchEvent(new CustomEvent('langchange', { detail: cur }));
}

export function initLang() {
  let l = null;
  try { l = localStorage.getItem('yv-lang'); } catch (e) { /* storage blocked */ }
  if (!l) {
    const n = (navigator.language || '').slice(0, 2).toLowerCase();
    l = n === 'ru' ? 'ru' : n === 'uz' ? 'uz' : 'en';
  }
  setLang(l);
}

// ---- number formatting ----
const dec = () => (cur === 'en' ? '.' : ',');
const grp = () => (cur === 'en' ? ',' : ' ');

export function num(v, digits = 0) {
  const neg = v < 0; v = Math.abs(v);
  let [i, f] = v.toFixed(digits).split('.');
  i = i.replace(/\B(?=(\d{3})+(?!\d))/g, grp());
  if (f && /^0+$/.test(f)) f = '';
  return (neg ? '−' : '') + i + (f ? dec() + f : '');
}

export function money(v) {
  if (v >= 1e9) return num(v / 1e9, 2) + ' ' + t('u.bn');
  if (v >= 1e6) return num(v / 1e6, 1) + ' ' + t('u.mln');
  return num(v) + ' ' + t('u.som');
}

export const usd = (som) => '≈ $' + num(Math.round(som / 12100 / 100) * 100);
export const area = (a) => num(a, 1) + ' m²';
export const clock = (h) => {
  const hh = Math.floor(h), mm = Math.round((h - hh) * 60);
  return String(hh).padStart(2, '0') + ':' + String(mm === 60 ? 0 : mm).padStart(2, '0');
};
const ROMAN = ['I', 'II', 'III', 'IV'];
export const quarter = (q, y) => t('q', { q, qr: ROMAN[q - 1], y });
