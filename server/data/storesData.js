// Supermarket Chains & Store Directory for Slovakia (SK) and surrounding regions

const CHAINS = {
  kaufland: {
    id: 'kaufland',
    name: 'Kaufland',
    country: 'Slovakia',
    code: 'SK',
    brandColor: '#e10915',
    logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=100&auto=format&fit=crop&q=80',
    website: 'https://www.kaufland.sk',
    flyerUrl: 'https://www.kaufland.sk/aktualne-letaky.html',
    loyaltyProgram: 'Kaufland Card',
    leafletsCycle: {
      startsOnDay: 4, // Thursday
      endsOnDay: 3,   // Wednesday
      durationDays: 7
    },
    description: 'Veľké hypermarkety s bohatým výberom čerstvého tovaru a vlastnou značkou K-Classic.'
  },
  lidl: {
    id: 'lidl',
    name: 'Lidl',
    country: 'Slovakia',
    code: 'SK',
    brandColor: '#0050aa',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop&q=80',
    website: 'https://www.lidl.sk',
    flyerUrl: 'https://www.lidl.sk/c/online-letaky/s10022472',
    loyaltyProgram: 'Lidl Plus',
    leafletsCycle: {
      startsOnDay: 1, // Monday
      endsOnDay: 0,   // Sunday
      durationDays: 7
    },
    description: 'Diskontný reťazec známy vysokou kvalitou, privátnymi značkami Pilos, Pikok a tematickými týždňami.'
  },
  billa: {
    id: 'billa',
    name: 'Billa',
    country: 'Slovakia',
    code: 'SK',
    brandColor: '#eab308',
    logo: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=100&auto=format&fit=crop&q=80',
    website: 'https://www.billa.sk',
    flyerUrl: 'https://www.billa.sk/akcie/aktualny-letak',
    loyaltyProgram: 'Billa Bonus',
    leafletsCycle: {
      startsOnDay: 3, // Wednesday
      endsOnDay: 2,   // Tuesday
      durationDays: 7
    },
    description: 'Supermarkety zamerané na čerstvé pečivo, lahôdky a značku Slovenská Farma a Clever.'
  },
  tesco: {
    id: 'tesco',
    name: 'Tesco',
    country: 'Slovakia',
    code: 'SK',
    brandColor: '#0284c7',
    logo: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&auto=format&fit=crop&q=80',
    website: 'https://tesco.sk',
    flyerUrl: 'https://tesco.sk/akciove-letaky/',
    loyaltyProgram: 'Clubcard',
    leafletsCycle: {
      startsOnDay: 3, // Wednesday
      endsOnDay: 2,   // Tuesday
      durationDays: 7
    },
    description: 'Hypermarkety a expresy so zľavami cez Clubcard a ponukou Tesco Finest.'
  },
  fresh: {
    id: 'fresh',
    name: 'FRESH / FRESH Plus',
    country: 'Slovakia',
    code: 'SK',
    brandColor: '#16a34a',
    logo: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=100&auto=format&fit=crop&q=80',
    website: 'https://potravinyfresh.sk',
    flyerUrl: 'https://potravinyfresh.sk/letaky',
    loyaltyProgram: 'Fresh Karta',
    leafletsCycle: {
      startsOnDay: 4, // Thursday
      endsOnDay: 3,   // Wednesday
      durationDays: 7
    },
    description: 'Slovenská sieť potravín so silným zastúpením regionálnych a bio produktov FRESH Exclusive.'
  }
};

const CITIES = [
  { id: 'bratislava', name: 'Bratislava', region: 'Bratislavský kraj', lat: 48.1486, lng: 17.1077, isCapital: true },
  { id: 'kosice', name: 'Košice', region: 'Košický kraj', lat: 48.7164, lng: 21.2611 },
  { id: 'zilina', name: 'Žilina', region: 'Žilinský kraj', lat: 49.2232, lng: 18.7394 },
  { id: 'nitra', name: 'Nitra', region: 'Nitriansky kraj', lat: 48.3061, lng: 18.0764 },
  { id: 'banska_bystrica', name: 'Banská Bystrica', region: 'Banskobystrický kraj', lat: 48.7363, lng: 19.1462 },
  { id: 'trnava', name: 'Trnava', region: 'Trnavský kraj', lat: 48.3774, lng: 17.5883 },
  { id: 'presov', name: 'Prešov', region: 'Prešovský kraj', lat: 48.9984, lng: 21.2393 },
  { id: 'trencin', name: 'Trenčín', region: 'Trenčiansky kraj', lat: 48.8945, lng: 18.0445 },
  { id: 'poprad', name: 'Poprad', region: 'Prešovský kraj', lat: 49.0512, lng: 20.2970 }
];

const STORES = [
  // Bratislava stores
  {
    id: 'kauf-ba-trnavska',
    chainId: 'kaufland',
    name: 'Kaufland Bratislava - Nové Mesto',
    cityId: 'bratislava',
    cityName: 'Bratislava',
    address: 'Trnavská cesta 41/A, 831 04 Bratislava',
    lat: 48.1632,
    lng: 17.1425,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Veľké parkovisko', 'Čerstvá pekáreň', 'Zálohomat fliaš', 'Nabíjacia stanica EV'],
    mall: 'Polus / VIVO! okolie'
  },
  {
    id: 'kauf-ba-petrzalka',
    chainId: 'kaufland',
    name: 'Kaufland Bratislava - Petržalka',
    cityId: 'bratislava',
    cityName: 'Bratislava',
    address: 'Romanova 34, 851 02 Petržalka',
    lat: 48.1172,
    lng: 17.1121,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Podzemné parkovisko', 'Mäsiarstvo', 'Zálohomat', 'Lekáreň'],
    mall: 'Petržalka Centrum'
  },
  {
    id: 'lidl-ba-ruzinov',
    chainId: 'lidl',
    name: 'Lidl Bratislava - Ružinov',
    cityId: 'bratislava',
    cityName: 'Bratislava',
    address: 'Ružinovská 1E, 821 02 Bratislava',
    lat: 48.1565,
    lng: 17.1558,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Vlastné parkovisko', 'Pekáreň Chrumkavé pečivo', 'Zálohomat', 'Lidl Plus kupóny'],
    mall: null
  },
  {
    id: 'lidl-ba-trencianska',
    chainId: 'lidl',
    name: 'Lidl Bratislava - Nivy / Trenčianska',
    cityId: 'bratislava',
    cityName: 'Bratislava',
    address: 'Trenčianska 53, 821 09 Bratislava',
    lat: 48.1492,
    lng: 17.1390,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Parkovanie 90 min zadarmo', 'Pekáreň', 'Samoobslužné pokladne'],
    mall: 'Nivy okolie'
  },
  {
    id: 'billa-ba-bajkalska',
    chainId: 'billa',
    name: 'Billa Bratislava - Bajkalská',
    cityId: 'bratislava',
    cityName: 'Bratislava',
    address: 'Bajkalská 19/A, 821 01 Bratislava',
    lat: 48.1580,
    lng: 17.1490,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Pult lahôdok', 'Teplý pult', 'Bio kútik', 'Parkovisko'],
    mall: null
  },
  {
    id: 'billa-ba-eurovea',
    chainId: 'billa',
    name: 'Billa Eurovea Galleria',
    cityId: 'bratislava',
    cityName: 'Bratislava',
    address: 'Pribinova 8, 811 09 Bratislava (Eurovea)',
    lat: 48.1404,
    lng: 17.1215,
    openingHours: 'Po - So: 08:00 - 21:00, Ne: 08:00 - 21:00',
    facilities: ['Nákupné centrum Eurovea', 'Veľký výber čerstvého sushi a šalátov', 'Garážové parkovanie'],
    mall: 'Eurovea'
  },
  {
    id: 'tesco-ba-zlatepiesky',
    chainId: 'tesco',
    name: 'Tesco Extra Zlaté Piesky',
    cityId: 'bratislava',
    cityName: 'Bratislava',
    address: 'Cesta na Senec 2, 821 04 Bratislava',
    lat: 48.1882,
    lng: 17.1856,
    openingHours: 'Po - Ne: 06:00 - 22:00',
    facilities: ['Otvorené od 06:00', 'Čerpacia stanica Tesco', 'Optika', 'Scan & Shop', 'Obrovské parkovisko'],
    mall: 'Shopping Palace Zlaté Piesky'
  },
  {
    id: 'fresh-ba-dubravka',
    chainId: 'fresh',
    name: 'FRESH Plus Bratislava - Dúbravka',
    cityId: 'bratislava',
    cityName: 'Bratislava',
    address: 'Saratovská 6/D, 841 02 Bratislava',
    lat: 48.1895,
    lng: 17.0392,
    openingHours: 'Po - So: 06:30 - 20:00, Ne: 08:00 - 18:00',
    facilities: ['Bio & regionálne potraviny', 'Čerstvý chlieb', 'Zálohovanie'],
    mall: null
  },

  // Košice stores (Fresh is especially strong here)
  {
    id: 'fresh-ke-hlavna',
    chainId: 'fresh',
    name: 'FRESH Plus Košice - Hlavná',
    cityId: 'kosice',
    cityName: 'Košice',
    address: 'Hlavná 111, 040 01 Košice',
    lat: 48.7230,
    lng: 21.2560,
    openingHours: 'Po - So: 06:30 - 20:30, Ne: 08:00 - 19:00',
    facilities: ['Lokálne pekárenské výrobky', 'Vlastná značka FRESH Exclusive', 'Farmárske mliečne výrobky'],
    mall: null
  },
  {
    id: 'kauf-ke-popradska',
    chainId: 'kaufland',
    name: 'Kaufland Košice - Západ',
    cityId: 'kosice',
    cityName: 'Košice',
    address: 'Popradská 92, 040 11 Košice',
    lat: 48.7112,
    lng: 21.2289,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Parkovisko', 'Mäsiarstvo', 'Pekáreň', 'Zálohomat'],
    mall: 'OC Galéria okolie'
  },
  {
    id: 'lidl-ke-jantarova',
    chainId: 'lidl',
    name: 'Lidl Košice - Jantárová',
    cityId: 'kosice',
    cityName: 'Košice',
    address: 'Jantárová 30, 040 01 Košice',
    lat: 48.7095,
    lng: 21.2642,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Pekáreň', 'Veľké parkovisko', 'Lidl Plus zľavy'],
    mall: null
  },
  {
    id: 'billa-ke-aupark',
    chainId: 'billa',
    name: 'Billa Košice - Aupark',
    cityId: 'kosice',
    cityName: 'Košice',
    address: 'Námestie osloboditeľov 1, 040 01 Košice (Aupark)',
    lat: 48.7180,
    lng: 21.2625,
    openingHours: 'Po - Ne: 07:00 - 21:00',
    facilities: ['Nákupné centrum Aupark Košice', 'Lahôdky', 'Čerstvé šaláty'],
    mall: 'Aupark Košice'
  },
  {
    id: 'tesco-ke-trolejbusova',
    chainId: 'tesco',
    name: 'Tesco Extra Košice - Džungľa',
    cityId: 'kosice',
    cityName: 'Košice',
    address: 'Trolejbusová 1, 040 01 Košice',
    lat: 48.7420,
    lng: 21.2690,
    openingHours: 'Po - Ne: 06:00 - 22:00',
    facilities: ['Nonstop čerpacia stanica', 'Scan&Shop', 'Autoumyváreň', 'Lekáreň'],
    mall: null
  },

  // Žilina stores
  {
    id: 'kauf-za-vysokoskolakov',
    chainId: 'kaufland',
    name: 'Kaufland Žilina - Vlčince',
    cityId: 'zilina',
    cityName: 'Žilina',
    address: 'Vysokoškolákov 37, 010 08 Žilina',
    lat: 49.2135,
    lng: 18.7610,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Veľké parkovisko', 'Mäsiarstvo', 'Pekáreň', 'Zálohovanie'],
    mall: 'Dubeň Shopping Center'
  },
  {
    id: 'lidl-za-spanyolova',
    chainId: 'lidl',
    name: 'Lidl Žilina - Hliny',
    cityId: 'zilina',
    cityName: 'Žilina',
    address: 'V. Spanyola 43, 010 01 Žilina',
    lat: 49.2162,
    lng: 18.7410,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Parkovisko', 'Pekáreň', 'Samoobslužné pokladne'],
    mall: null
  },
  {
    id: 'billa-za-mirage',
    chainId: 'billa',
    name: 'Billa Žilina - OC Mirage',
    cityId: 'zilina',
    cityName: 'Žilina',
    address: 'Námestie A. Hlinku 7B, 010 01 Žilina (Mirage)',
    lat: 49.2245,
    lng: 18.7415,
    openingHours: 'Po - Ne: 07:00 - 21:00',
    facilities: ['Nákupné centrum Mirage', 'Garážové parkovanie zadarmo', 'Čerstvý pult'],
    mall: 'Mirage Shopping Center'
  },

  // Nitra stores
  {
    id: 'kauf-nr-chrenova',
    chainId: 'kaufland',
    name: 'Kaufland Nitra - Chrenová',
    cityId: 'nitra',
    cityName: 'Nitra',
    address: 'Akademická 1/A, 949 01 Nitra',
    lat: 48.3075,
    lng: 18.0990,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Parkovisko', 'Pekáreň', 'Mäsiarstvo'],
    mall: 'Centro Nitra okolie'
  },
  {
    id: 'lidl-nr-stefanikova',
    chainId: 'lidl',
    name: 'Lidl Nitra - Štefánikova',
    cityId: 'nitra',
    cityName: 'Nitra',
    address: 'Štefánikova trieda 61, 949 01 Nitra',
    lat: 48.3015,
    lng: 18.0820,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Parkovisko', 'Pekáreň', 'Zálohomat'],
    mall: 'Mlyny okolie'
  },

  // Banská Bystrica
  {
    id: 'kauf-bb-radvan',
    chainId: 'kaufland',
    name: 'Kaufland Banská Bystrica - Radvaň',
    cityId: 'banska_bystrica',
    cityName: 'Banská Bystrica',
    address: 'Námestie Ľ. Štúra 31, 974 05 Banská Bystrica',
    lat: 48.7230,
    lng: 19.1360,
    openingHours: 'Po - So: 07:00 - 21:00, Ne: 08:00 - 20:00',
    facilities: ['Parkovisko', 'Pekáreň', 'Mäsiarstvo'],
    mall: 'Radvaň Park'
  },
  {
    id: 'billa-bb-europa',
    chainId: 'billa',
    name: 'Billa Europa SC Banská Bystrica',
    cityId: 'banska_bystrica',
    cityName: 'Banská Bystrica',
    address: 'Na Troskách 25, 974 01 Banská Bystrica',
    lat: 48.7305,
    lng: 19.1378,
    openingHours: 'Po - Ne: 07:00 - 21:00',
    facilities: ['Europa Shopping Center', 'Garáž', 'Čerstvý pult'],
    mall: 'Europa Shopping Center'
  }
];

const SHOPPING_MALLS = [
  {
    id: 'mall-eurovea',
    name: 'Eurovea Galleria',
    city: 'Bratislava',
    address: 'Pribinova 8, 811 09 Bratislava',
    lat: 48.1404,
    lng: 17.1215,
    supermarket: 'Billa',
    shopsCount: 300,
    website: 'https://eurovea.sk'
  },
  {
    id: 'mall-nivy',
    name: 'Nivy Centrum & Bus Station',
    city: 'Bratislava',
    address: 'Mlynské nivy 5A, 821 09 Bratislava',
    lat: 48.1465,
    lng: 17.1298,
    supermarket: 'Lidl + Tržnica Nivy',
    shopsCount: 250,
    website: 'https://nivy.com'
  },
  {
    id: 'mall-avion',
    name: 'Avion Shopping Park',
    city: 'Bratislava',
    address: 'Ivanská cesta 16, 821 04 Bratislava',
    lat: 48.1678,
    lng: 17.1812,
    supermarket: 'Kaufland + Billa + IKEA',
    shopsCount: 160,
    website: 'https://avion.sk'
  },
  {
    id: 'mall-aupark-ba',
    name: 'Aupark Bratislava',
    city: 'Bratislava',
    address: 'Einsteinova 18, 851 01 Bratislava',
    lat: 48.1325,
    lng: 17.1085,
    supermarket: 'Billa',
    shopsCount: 240,
    website: 'https://aupark-bratislava.sk'
  },
  {
    id: 'mall-optima-ke',
    name: 'Atrium Optima Košice',
    city: 'Košice',
    address: 'Moldavská cesta 32, 040 11 Košice',
    lat: 48.6948,
    lng: 21.2335,
    supermarket: 'Billa + FRESH',
    shopsCount: 170,
    website: 'https://ocoptima.sk'
  },
  {
    id: 'mall-mirage-za',
    name: 'Mirage Shopping Center',
    city: 'Žilina',
    address: 'Námestie A. Hlinku 7B, 010 01 Žilina',
    lat: 49.2245,
    lng: 18.7415,
    supermarket: 'Billa',
    shopsCount: 100,
    website: 'https://miragesc.sk'
  }
];

module.exports = {
  CHAINS,
  CITIES,
  STORES,
  SHOPPING_MALLS
};
