// All page text in three languages. Elements with data-i18n="key" are filled from here.

const STR = {
  en: {
    'hero.cta': 'Choose your floor',
    'hero.meta': 'Concept project · Tashkent',
    'am.parkingN': 'underground parking spaces',
    'fp.more': 'Show all 8 flats', 'fp.less': 'Hide the flats',
    'fp.go3d': 'See this apartment in 3D', 'fp.goSold': 'Sold here. Show floor {n}, where it’s free', 'fp.goPay': 'See price and instalments',
    'ap.free': 'Floor {n} · available · {p}', 'ap.sold': 'Sold on floor {n}. Still free on floors {list}.',
    'build.planned': 'Planned schedule',
    'sun.hoursS': 'South windows get direct sun for about {h} h a day. In summer the sun rises and sets behind the building.',
    'sun.hoursW': 'South windows get direct sun for about {h} h a day, low and deep into the rooms.',
    'pay.floor': 'Floor', 'pay.reserve': 'Reserve this flat',
    'trust.title': 'What protects your money.',
    'trust.dev': 'Developer', 'trust.devT': 'Vodiy Qurilish has handed over 12 buildings in Tashkent since 2011.',
    'trust.permit': 'Permits', 'trust.permitT': 'The construction permit and land rights are registered. The documents are at the sales office.',
    'trust.money': 'Your payments', 'trust.moneyT': 'They are held in an escrow account and released to the builder stage by stage.',
    'trust.keys': 'Handover', 'trust.keysT': 'Q4 2027 is written into the contract, with a penalty for every month of delay.',
    'end.office': 'Sales office', 'end.addr': 'On site at Yashil Vodiy Residence, Tashkent', 'end.hours': 'Mon–Sat, 9:00–19:00', 'end.hoursL': 'Hours',
    'bk.demo': 'Demo form · nothing is sent', 'bk.title': 'Book a visit',
    'bk.name': 'Your name', 'bk.phone': 'Phone', 'bk.via': 'How should we reach you?', 'bk.call': 'Call', 'bk.tg': 'Telegram', 'bk.wa': 'WhatsApp',
    'bk.date': 'Preferred day', 'bk.flat': 'Apartment', 'bk.send': 'Request a visit', 'bk.cancel': 'Cancel',
    'bk.errName': 'Enter your name.', 'bk.errPhone': 'Enter the 9 digits after +998.', 'bk.errDate': 'Pick a day from tomorrow on.',
    'bk.okTitle': 'Request received',
    'bk.okText': 'Thank you, {name}. On a real site the sales team would now contact you by {via} at {phone} to confirm your visit on {date}. This demo sent nothing.',
    'bk.link': 'Made by Akbarov Labs', 'bk.close': 'Close', 'bk.flatVal': '{r}, {a}, floor {n}',
    'meta.title': 'Yashil Vodiy Residence · Concept',
    'brand.sub': 'Residence',
    'nav.location': 'Location', 'nav.construction': 'Construction', 'nav.apartments': 'Apartments', 'nav.payment': 'Payment',
    'cta.short': 'Book a visit',
    'skip': 'Skip the 3D tour',
    'hero.eyebrow': 'Concept residential complex · Tashkent',
    'ch1.title': 'Choose the light you’ll live in.',
    'ch1.text': 'Pick a floor and see its sun, its view and its build date before the walls go up.', 'hero.facts': '272 flats · 3 towers · old chinar garden · keys Q4 2027', 'cta.tiny': 'Visit',
    'ch1.f1': 'towers', 'ch1.f2': 'apartments', 'ch1.f3': 'ha garden',
    'scroll': 'Scroll', 'rail.home': 'Overview',
    'ch2.eyebrow': 'Location', 'ch2.title': 'Four minutes to the metro. None to the park.',
    'ch2.text': 'Chinor Park starts across the street. The metro, a school and the mall are a short walk or drive.',
    'poi.metro': 'Metro station', 'poi.metroT': '4 min walk',
    'poi.school': 'School', 'poi.schoolT': '7 min walk',
    'poi.park': 'Chinor Park', 'poi.parkT': 'across the street',
    'poi.mall': 'Shopping mall', 'poi.mallT': '5 min by car',
    'poi.home': 'Yashil Vodiy',
    'ch3.eyebrow': 'Construction', 'ch3.title': 'Watch your floor go up.',
    'ch3.text': 'Scroll the build from foundation to keys. Solid is done, hatched is planned.',
    'build.s0': 'Foundation', 'build.s1': 'Frame', 'build.s2': 'Facade', 'build.s3': 'Landscaping', 'build.s4': 'Keys handed over',
    'build.today': 'Today', 'build.done': 'built',
    'ch4.eyebrow': 'Courtyard', 'ch4.title': 'Cars below, chinars above.',
    'ch4.text': 'All 380 parking spaces are underground. Up top: shade, a playground, a sports court and a kindergarten for 120 children.',
    'am.garden': 'Garden without cars', 'am.play': 'Playground', 'am.kinder': 'Kindergarten · 120 places',
    'am.sport': 'Sports court', 'am.parking': 'Underground parking · 380 spaces', 'am.shops': 'Cafés and shops',
    'ch5.eyebrow': 'Choose a floor', 'ch5.title': 'Which floor is yours?',
    'ch5.text': 'Tap the tower or use − and +. Each floor shows its eight flats and what is still free.',
    'fp.floor': 'Floor', 'fp.of': 'of {n}', 'fp.down': 'Lower floor', 'fp.up': 'Higher floor',
    'fp.free': '{n} of 8 available', 'fp.ppm': 'from {p} per m²',
    'fp.r1': '1 room', 'fp.r2': '2 rooms', 'fp.r3': '3 rooms', 'fp.r4': '4 rooms',
    'st.free': 'Available', 'st.res': 'Reserved', 'st.sold': 'Sold',
    'fp.go': 'See the 3-room apartment', 'fp.hint': 'Tap the tower to choose a floor',
    'ch6.eyebrow': 'The apartment', 'ch6.title': 'Three rooms, 94.5 m². Step inside.',
    'ch6.text': 'A 41.6 m² kitchen-living room opens onto a 16 m² loggia. Both bedrooms face the garden.',
    'rm.living': 'Kitchen-living room', 'rm.bed1': 'Bedroom', 'rm.bed2': 'Children’s room', 'rm.hall': 'Hall',
    'rm.ward': 'Wardrobe', 'rm.bath': 'Bathroom', 'rm.loggia': 'Loggia',
    'ch7.eyebrow': 'Sunlight', 'ch7.title': 'Drag the sun.',
    'ch7.text': 'In winter the low sun reaches deep into the rooms; in summer the loggia keeps the high sun out.',
    'sun.time': 'Time of day', 'sun.summer': 'Summer', 'sun.winter': 'Winter',
    'sun.hours': 'Direct sun on the windows: about {h} h a day', 'view': 'View from floor {n}',
    'lay.eyebrow': 'Layouts', 'lay.title': 'Four plans. Every one has a loggia.',
    'lay.text': 'Ceilings are 2.85 m throughout.',
    'lay.r1': '1-room', 'lay.r2': '2-room', 'lay.r3': '3-room', 'lay.r4': '4-room',
    'lay.from': 'from {p} on floor 2', 'lay.tour': 'Explore in 3D', 'lay.calc': 'Calculate instalments',
    'pay.eyebrow': 'Payment', 'pay.title': 'No bank, no interest.',
    'pay.text': 'Pay part now and the rest to the developer in equal monthly payments.',
    'pay.layout': 'Apartment', 'pay.down': 'Down payment', 'pay.term': 'Term', 'pay.months': '{n} months',
    'pay.price': 'Apartment price', 'pay.first': 'Down payment', 'pay.monthly': 'Monthly payment',
    'pay.note': 'Illustrative figures for a concept project, at 12,100 so’m to the dollar.',
    'end.title': 'Come and walk the site.',
    'end.text': 'At the sales office we show you the scale model, then take you onto the site in a hard hat.',
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
    'hero.cta': 'Выбрать этаж',
    'hero.meta': 'Концепт-проект · Ташкент',
    'am.parkingN': 'мест в подземном паркинге',
    'fp.more': 'Показать все 8 квартир', 'fp.less': 'Скрыть квартиры',
    'fp.go3d': 'Смотреть эту квартиру в 3D', 'fp.goSold': 'Здесь продана. Показать {n} этаж, где свободна', 'fp.goPay': 'Цена и рассрочка',
    'ap.free': '{n} этаж · свободна · {p}', 'ap.sold': 'На {n} этаже продана. Свободна на этажах: {list}.',
    'build.planned': 'Плановый график',
    'sun.hoursS': 'Южные окна получают прямое солнце около {h} ч в день. Летом солнце встаёт и садится за домом.',
    'sun.hoursW': 'Южные окна получают прямое солнце около {h} ч в день — низкое, глубоко в комнаты.',
    'pay.floor': 'Этаж', 'pay.reserve': 'Забронировать квартиру',
    'trust.title': 'Что защищает ваши деньги.',
    'trust.dev': 'Застройщик', 'trust.devT': 'Vodiy Qurilish сдал в Ташкенте 12 домов с 2011 года.',
    'trust.permit': 'Документы', 'trust.permitT': 'Разрешение на строительство и права на землю оформлены. Документы — в офисе продаж.',
    'trust.money': 'Ваши платежи', 'trust.moneyT': 'Хранятся на эскроу-счёте и переводятся застройщику поэтапно.',
    'trust.keys': 'Сдача', 'trust.keysT': 'IV квартал 2027 года прописан в договоре, с неустойкой за каждый месяц задержки.',
    'end.office': 'Офис продаж', 'end.addr': 'На территории Yashil Vodiy Residence, Ташкент', 'end.hours': 'Пн–Сб, 9:00–19:00', 'end.hoursL': 'Часы работы',
    'bk.demo': 'Демо-форма · ничего не отправляется', 'bk.title': 'Запись на визит',
    'bk.name': 'Ваше имя', 'bk.phone': 'Телефон', 'bk.via': 'Как с вами связаться?', 'bk.call': 'Звонок', 'bk.tg': 'Telegram', 'bk.wa': 'WhatsApp',
    'bk.date': 'Удобный день', 'bk.flat': 'Квартира', 'bk.send': 'Записаться', 'bk.cancel': 'Отмена',
    'bk.errName': 'Введите имя.', 'bk.errPhone': 'Введите 9 цифр после +998.', 'bk.errDate': 'Выберите день, начиная с завтрашнего.',
    'bk.okTitle': 'Заявка принята',
    'bk.okText': 'Спасибо, {name}. На реальном сайте отдел продаж связался бы с вами через {via} по номеру {phone}, чтобы подтвердить визит {date}. Это демо ничего не отправило.',
    'bk.link': 'Сделано в Akbarov Labs', 'bk.close': 'Закрыть', 'bk.flatVal': '{r}, {a}, {n} этаж',
    'meta.title': 'Yashil Vodiy Residence · Концепт',
    'brand.sub': 'Residence',
    'nav.location': 'Расположение', 'nav.construction': 'Стройка', 'nav.apartments': 'Квартиры', 'nav.payment': 'Оплата',
    'cta.short': 'Запись на визит',
    'skip': 'Пропустить 3D-тур',
    'hero.eyebrow': 'Концепт жилого комплекса · Ташкент',
    'ch1.title': 'Выберите свет, в котором будете жить.',
    'ch1.text': 'Выберите этаж и посмотрите его солнце, вид и дату постройки — до того, как поднимутся стены.', 'hero.facts': '272 квартиры · 3 башни · старый чинаровый сад · ключи IV кв. 2027', 'cta.tiny': 'Визит',
    'ch1.f1': 'башни', 'ch1.f2': 'квартиры', 'ch1.f3': 'га сада',
    'scroll': 'Листайте', 'rail.home': 'Обзор',
    'ch2.eyebrow': 'Расположение', 'ch2.title': 'Четыре минуты до метро. Ноль — до парка.',
    'ch2.text': 'Парк «Чинор» начинается через дорогу. Метро, школа и торговый центр — в нескольких минутах пешком или на машине.',
    'poi.metro': 'Станция метро', 'poi.metroT': '4 мин пешком',
    'poi.school': 'Школа', 'poi.schoolT': '7 мин пешком',
    'poi.park': 'Парк «Чинор»', 'poi.parkT': 'через дорогу',
    'poi.mall': 'Торговый центр', 'poi.mallT': '5 мин на машине',
    'poi.home': 'Yashil Vodiy',
    'ch3.eyebrow': 'Строительство', 'ch3.title': 'Смотрите, как растёт ваш этаж.',
    'ch3.text': 'Прокрутите стройку от фундамента до ключей. Сплошное — готово, штриховка — по плану.',
    'build.s0': 'Фундамент', 'build.s1': 'Каркас', 'build.s2': 'Фасад', 'build.s3': 'Благоустройство', 'build.s4': 'Ключи выданы',
    'build.today': 'Сегодня', 'build.done': 'готово',
    'ch4.eyebrow': 'Двор', 'ch4.title': 'Машины — внизу, чинары — наверху.',
    'ch4.text': 'Все 380 машиномест — под землёй. Наверху — тень, детская и спортивная площадки и детский сад на 120 мест.',
    'am.garden': 'Сад без машин', 'am.play': 'Детская площадка', 'am.kinder': 'Детский сад · 120 мест',
    'am.sport': 'Спортплощадка', 'am.parking': 'Подземный паркинг · 380 мест', 'am.shops': 'Кафе и магазины',
    'ch5.eyebrow': 'Выбор этажа', 'ch5.title': 'Какой этаж ваш?',
    'ch5.text': 'Нажмите на башню или на − и +. Для каждого этажа видно восемь квартир и что ещё свободно.',
    'fp.floor': 'Этаж', 'fp.of': 'из {n}', 'fp.down': 'Этаж ниже', 'fp.up': 'Этаж выше',
    'fp.free': 'Свободно {n} из 8', 'fp.ppm': 'от {p} за м²',
    'fp.r1': '1-комн.', 'fp.r2': '2-комн.', 'fp.r3': '3-комн.', 'fp.r4': '4-комн.',
    'st.free': 'Свободна', 'st.res': 'Бронь', 'st.sold': 'Продана',
    'fp.go': 'Смотреть 3-комнатную', 'fp.hint': 'Нажмите на башню, чтобы выбрать этаж',
    'ch6.eyebrow': 'Квартира', 'ch6.title': 'Три комнаты, 94,5 м². Заходите.',
    'ch6.text': 'Кухня-гостиная 41,6 м² выходит на лоджию 16 м². Обе спальни смотрят во двор-сад.',
    'rm.living': 'Кухня-гостиная', 'rm.bed1': 'Спальня', 'rm.bed2': 'Детская', 'rm.hall': 'Прихожая',
    'rm.ward': 'Гардеробная', 'rm.bath': 'Ванная', 'rm.loggia': 'Лоджия',
    'ch7.eyebrow': 'Солнце', 'ch7.title': 'Двигайте солнце.',
    'ch7.text': 'Зимой низкое солнце заходит глубоко в комнаты, летом лоджия закрывает от высокого.',
    'sun.time': 'Время суток', 'sun.summer': 'Лето', 'sun.winter': 'Зима',
    'sun.hours': 'Прямое солнце в окнах: около {h} ч в день', 'view': 'Вид с {n} этажа',
    'lay.eyebrow': 'Планировки', 'lay.title': 'Четыре планировки. В каждой — лоджия.',
    'lay.text': 'Потолки 2,85 м во всех квартирах.',
    'lay.r1': '1-комнатная', 'lay.r2': '2-комнатная', 'lay.r3': '3-комнатная', 'lay.r4': '4-комнатная',
    'lay.from': 'от {p} на 2 этаже', 'lay.tour': 'Смотреть в 3D', 'lay.calc': 'Рассчитать рассрочку',
    'pay.eyebrow': 'Оплата', 'pay.title': 'Без банка и без процентов.',
    'pay.text': 'Внесите часть сейчас, остальное — застройщику равными ежемесячными платежами.',
    'pay.layout': 'Квартира', 'pay.down': 'Первый взнос', 'pay.term': 'Срок', 'pay.months': '{n} мес.',
    'pay.price': 'Стоимость квартиры', 'pay.first': 'Первый взнос', 'pay.monthly': 'Ежемесячный платёж',
    'pay.note': 'Расчёт условный, для концепт-проекта, по курсу 12 100 сум за доллар.',
    'end.title': 'Приезжайте пройтись по стройке.',
    'end.text': 'В офисе продаж покажем макет, а потом проведём по площадке — в каске.',
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
    'hero.cta': 'Qavatni tanlash',
    'hero.meta': 'Konsept loyiha · Toshkent',
    'am.parkingN': 'oʻrinli yer osti avtoturargohi',
    'fp.more': 'Barcha 8 xonadonni koʻrsatish', 'fp.less': 'Xonadonlarni yashirish',
    'fp.go3d': 'Bu xonadonni 3D da koʻrish', 'fp.goSold': 'Bu yerda sotilgan. Boʻsh {n}-qavatni koʻrsatish', 'fp.goPay': 'Narx va muddatli toʻlov',
    'ap.free': '{n}-qavat · sotuvda · {p}', 'ap.sold': '{n}-qavatda sotilgan. Boʻsh qavatlar: {list}.',
    'build.planned': 'Rejadagi jadval',
    'sun.hoursS': 'Janubiy derazalarga kuniga taxminan {h} soat toʻgʻridan-toʻgʻri quyosh tushadi. Yozda quyosh uyning orqa tomonida chiqib, botadi.',
    'sun.hoursW': 'Janubiy derazalarga kuniga taxminan {h} soat quyosh tushadi: past va xonalarning ichkarisigacha.',
    'pay.floor': 'Qavat', 'pay.reserve': 'Xonadonni band qilish',
    'trust.title': 'Pulingizni nima himoya qiladi.',
    'trust.dev': 'Quruvchi', 'trust.devT': 'Vodiy Qurilish 2011-yildan beri Toshkentda 12 ta bino topshirgan.',
    'trust.permit': 'Hujjatlar', 'trust.permitT': 'Qurilish ruxsatnomasi va yer huquqi rasmiylashtirilgan. Hujjatlar sotuv ofisida.',
    'trust.money': 'Toʻlovlaringiz', 'trust.moneyT': 'Eskrou hisobida saqlanadi va quruvchiga bosqichma-bosqich oʻtkaziladi.',
    'trust.keys': 'Topshirish', 'trust.keysT': '2027-yil 4-chorak shartnomada yozilgan, har bir oy kechikish uchun jarima bilan.',
    'end.office': 'Sotuv ofisi', 'end.addr': 'Yashil Vodiy Residence hududida, Toshkent', 'end.hours': 'Du–Sha, 9:00–19:00', 'end.hoursL': 'Ish vaqti',
    'bk.demo': 'Namoyish formasi · hech narsa yuborilmaydi', 'bk.title': 'Tashrifga yozilish',
    'bk.name': 'Ismingiz', 'bk.phone': 'Telefon', 'bk.via': 'Siz bilan qanday bogʻlanaylik?', 'bk.call': 'Qoʻngʻiroq', 'bk.tg': 'Telegram', 'bk.wa': 'WhatsApp',
    'bk.date': 'Qulay kun', 'bk.flat': 'Xonadon', 'bk.send': 'Yozilish', 'bk.cancel': 'Bekor qilish',
    'bk.errName': 'Ismingizni kiriting.', 'bk.errPhone': '+998 dan keyingi 9 ta raqamni kiriting.', 'bk.errDate': 'Ertangi kundan boshlab kun tanlang.',
    'bk.okTitle': 'Soʻrov qabul qilindi',
    'bk.okText': 'Rahmat, {name}. Haqiqiy saytda sotuv boʻlimi {date} kungi tashrifni tasdiqlash uchun {phone} raqamiga {via} orqali bogʻlanardi. Bu namoyish hech narsa yubormadi.',
    'bk.link': 'Akbarov Labs tomonidan yaratilgan', 'bk.close': 'Yopish', 'bk.flatVal': '{r}, {a}, {n}-qavat',
    'meta.title': 'Yashil Vodiy Residence · Konsept',
    'brand.sub': 'Residence',
    'nav.location': 'Joylashuv', 'nav.construction': 'Qurilish', 'nav.apartments': 'Xonadonlar', 'nav.payment': 'Toʻlov',
    'cta.short': 'Tashrifga yozilish',
    'skip': '3D turni oʻtkazib yuborish',
    'hero.eyebrow': 'Turar joy majmuasi konsepti · Toshkent',
    'ch1.title': 'Yashaydigan yorugʻligingizni tanlang.',
    'ch1.text': 'Qavatni tanlang va devorlar koʻtarilmasidan oldin uning quyoshi, manzarasi va qurilish sanasini koʻring.', 'hero.facts': '272 xonadon · 3 minora · eski chinor bogʻi · kalitlar 2027 4-chorak', 'cta.tiny': 'Tashrif',
    'ch1.f1': 'minora', 'ch1.f2': 'xonadon', 'ch1.f3': 'ga bogʻ',
    'scroll': 'Pastga aylantiring', 'rail.home': 'Umumiy',
    'ch2.eyebrow': 'Joylashuv', 'ch2.title': 'Metrogacha toʻrt daqiqa. Bogʻgacha — nol.',
    'ch2.text': 'Chinor bogʻi roʻparada boshlanadi. Metro, maktab va savdo markazi piyoda yoki mashinada bir necha daqiqalik yoʻlda.',
    'poi.metro': 'Metro bekati', 'poi.metroT': 'piyoda 4 daqiqa',
    'poi.school': 'Maktab', 'poi.schoolT': 'piyoda 7 daqiqa',
    'poi.park': 'Chinor bogʻi', 'poi.parkT': 'roʻparada',
    'poi.mall': 'Savdo markazi', 'poi.mallT': 'mashinada 5 daqiqa',
    'poi.home': 'Yashil Vodiy',
    'ch3.eyebrow': 'Qurilish', 'ch3.title': 'Qavatingiz qanday koʻtarilishini kuzating.',
    'ch3.text': 'Qurilishni poydevordan kalitlargacha aylantiring. Toʻliq rang — tayyor, shtrix — reja boʻyicha.',
    'build.s0': 'Poydevor', 'build.s1': 'Karkas', 'build.s2': 'Fasad', 'build.s3': 'Obodonlashtirish', 'build.s4': 'Kalitlar topshirildi',
    'build.today': 'Bugun', 'build.done': 'qurildi',
    'ch4.eyebrow': 'Hovli', 'ch4.title': 'Mashinalar pastda, chinorlar tepada.',
    'ch4.text': '380 ta mashina oʻrnining hammasi yer ostida. Tepada — soya, bolalar va sport maydonchalari hamda 120 oʻrinli bogʻcha.',
    'am.garden': 'Avtomobilsiz bogʻ', 'am.play': 'Bolalar maydonchasi', 'am.kinder': 'Bogʻcha · 120 oʻrin',
    'am.sport': 'Sport maydoni', 'am.parking': 'Yer osti avtoturargohi · 380 oʻrin', 'am.shops': 'Kafe va doʻkonlar',
    'ch5.eyebrow': 'Qavat tanlash', 'ch5.title': 'Qaysi qavat sizniki?',
    'ch5.text': 'Minorani yoki − va + tugmalarini bosing. Har bir qavatda sakkizta xonadon va qaysilari boʻshligi koʻrinadi.',
    'fp.floor': 'Qavat', 'fp.of': '{n} qavatdan', 'fp.down': 'Pastki qavat', 'fp.up': 'Yuqori qavat',
    'fp.free': '8 tadan {n} tasi boʻsh', 'fp.ppm': '1 m² uchun {p} dan',
    'fp.r1': '1 xonali', 'fp.r2': '2 xonali', 'fp.r3': '3 xonali', 'fp.r4': '4 xonali',
    'st.free': 'Sotuvda', 'st.res': 'Band qilingan', 'st.sold': 'Sotilgan',
    'fp.go': '3 xonali xonadonni koʻrish', 'fp.hint': 'Qavat tanlash uchun minorani bosing',
    'ch6.eyebrow': 'Xonadon', 'ch6.title': 'Uch xona, 94,5 m². Kiring.',
    'ch6.text': '41,6 m² li oshxona-mehmonxona 16 m² li lodjiyaga chiqadi. Ikkala yotoqxona ham bogʻ tomonga qaragan.',
    'rm.living': 'Oshxona-mehmonxona', 'rm.bed1': 'Yotoqxona', 'rm.bed2': 'Bolalar xonasi', 'rm.hall': 'Dahliz',
    'rm.ward': 'Kiyim xonasi', 'rm.bath': 'Hammom', 'rm.loggia': 'Lodjiya',
    'ch7.eyebrow': 'Quyosh nuri', 'ch7.title': 'Quyoshni suring.',
    'ch7.text': 'Qishda past quyosh xonalarning ichkarisigacha kiradi, yozda lodjiya baland quyoshdan toʻsadi.',
    'sun.time': 'Kun vaqti', 'sun.summer': 'Yoz', 'sun.winter': 'Qish',
    'sun.hours': 'Derazalarga toʻgʻridan-toʻgʻri quyosh: kuniga taxminan {h} soat', 'view': '{n}-qavatdan manzara',
    'lay.eyebrow': 'Rejalar', 'lay.title': 'Toʻrt xil reja. Har birida lodjiya bor.',
    'lay.text': 'Barcha xonadonlarda shift balandligi 2,85 m.',
    'lay.r1': '1 xonali', 'lay.r2': '2 xonali', 'lay.r3': '3 xonali', 'lay.r4': '4 xonali',
    'lay.from': '2-qavatda {p} dan', 'lay.tour': '3D da koʻrish', 'lay.calc': 'Toʻlovni hisoblash',
    'pay.eyebrow': 'Toʻlov', 'pay.title': 'Banksiz va foizsiz.',
    'pay.text': 'Bir qismini hozir toʻlang, qolganini quruvchiga teng oylik toʻlovlar bilan.',
    'pay.layout': 'Xonadon', 'pay.down': 'Boshlangʻich toʻlov', 'pay.term': 'Muddat', 'pay.months': '{n} oy',
    'pay.price': 'Xonadon narxi', 'pay.first': 'Boshlangʻich toʻlov', 'pay.monthly': 'Oylik toʻlov',
    'pay.note': 'Konsept loyiha uchun taxminiy hisob-kitob, kurs: 1 dollar = 12 100 soʻm.',
    'end.title': 'Kelib qurilishni aylanib chiqing.',
    'end.text': 'Sotuv ofisida maketni koʻrsatamiz, keyin kaska kiyib maydonni aylantiramiz.',
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
  let l = new URLSearchParams(location.search).get('lang');
  if (!STR[l]) { l = null; try { l = localStorage.getItem('yv-lang'); } catch (e) { /* storage blocked */ } }
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
  if (v >= 1e8) return num(v / 1e6, 0) + ' ' + t('u.mln');
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
