// Real-world Slovak grocery products & promotional pricing data

const CATEGORIES = [
  { id: 'all', nameEn: 'All Categories', nameSk: 'Všetky kategórie', icon: 'Grid' },
  { id: 'dairy', nameEn: 'Dairy & Eggs', nameSk: 'Mliečne & Vajcia', icon: 'Egg' },
  { id: 'meat', nameEn: 'Meat & Poultry', nameSk: 'Mäso & Hydina', icon: 'Beef' },
  { id: 'bakery', nameEn: 'Bakery & Bread', nameSk: 'Pečivo & Chlieb', icon: 'Croissant' },
  { id: 'produce', nameEn: 'Fruits & Veg', nameSk: 'Ovocie & Zelenina', icon: 'Apple' },
  { id: 'pantry', nameEn: 'Pantry & Staples', nameSk: 'Trvanlivé & Špajza', icon: 'Package' },
  { id: 'drinks', nameEn: 'Beverages & Beer', nameSk: 'Nápoje & Pivo', icon: 'Coffee' },
  { id: 'household', nameEn: 'Hygiene & Home', nameSk: 'Drogéria & Domácnosť', icon: 'Sparkles' }
];

// Current weekly flyer cycle (e.g. Nov 05, 2026 - Nov 11, 2026)
const CURRENT_CYCLE = {
  cycleId: 'cycle-w45-2026',
  cycleName: 'Týždeň 45 / Aktuálne letáky',
  validFrom: '2026-11-05T00:00:00Z',
  validUntil: '2026-11-11T23:59:59Z',
  totalDeals: 36,
  status: 'active',
  items: [
    {
      id: 'maslo-250g',
      nameEn: 'Fresh Butter 82% 250g',
      nameSk: 'Čerstvé maslo 82% 250g',
      category: 'dairy',
      unit: '250g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Tradičné slovenské maslo s minimálnym obsahom tuku 82 %.',
      prices: {
        kaufland: { price: 1.49, regularPrice: 2.39, isOffer: true, discountPercent: 38, badge: 'Letákový trhák', flyerPage: 3 },
        lidl: { price: 1.69, regularPrice: 2.29, isOffer: true, discountPercent: 26, badge: 'Pilos kvalita', flyerPage: 1 },
        billa: { price: 2.29, regularPrice: 2.49, isOffer: false, discountPercent: 8, badge: null, flyerPage: null },
        tesco: { price: 1.89, regularPrice: 2.39, isOffer: true, discountPercent: 21, badge: 'Clubcard zľava', flyerPage: 4 },
        fresh: { price: 1.79, regularPrice: 2.19, isOffer: true, discountPercent: 18, badge: 'Fresh akcia', flyerPage: 2 }
      }
    },
    {
      id: 'mlieko-15-1l',
      nameEn: 'Semi-skimmed Milk 1.5% 1L',
      nameSk: 'Mlieko polotučné 1,5% 1L UHT',
      category: 'dairy',
      unit: '1L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Trvanlivé polotučné mlieko ošetrené UHT technológiou.',
      prices: {
        kaufland: { price: 0.79, regularPrice: 0.99, isOffer: true, discountPercent: 20, badge: 'K-Classic', flyerPage: 5 },
        lidl: { price: 0.69, regularPrice: 0.99, isOffer: true, discountPercent: 30, badge: 'Lidl Plus kupón', flyerPage: 2 },
        billa: { price: 0.95, regularPrice: 1.05, isOffer: false, discountPercent: 9, badge: null, flyerPage: null },
        tesco: { price: 0.79, regularPrice: 0.99, isOffer: true, discountPercent: 20, badge: 'Tesco akcia', flyerPage: 6 },
        fresh: { price: 0.85, regularPrice: 0.99, isOffer: true, discountPercent: 14, badge: null, flyerPage: null }
      }
    },
    {
      id: 'vajcia-10ks',
      nameEn: 'Barn Eggs M 10 pcs',
      nameSk: 'Vajcia z podstielkového chovu M 10ks',
      category: 'dairy',
      unit: '10ks',
      unitPriceBase: 'ks',
      image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Slovenské čerstvé podstielkové vajcia veľkosti M.',
      prices: {
        kaufland: { price: 1.59, regularPrice: 2.39, isOffer: true, discountPercent: 33, badge: 'Kaufland Card', flyerPage: 4 },
        lidl: { price: 1.79, regularPrice: 2.19, isOffer: true, discountPercent: 18, badge: 'Čerstvosť', flyerPage: 3 },
        billa: { price: 2.19, regularPrice: 2.49, isOffer: false, discountPercent: 12, badge: null, flyerPage: null },
        tesco: { price: 1.49, regularPrice: 2.29, isOffer: true, discountPercent: 35, badge: 'Super cena Clubcard', flyerPage: 1 },
        fresh: { price: 1.85, regularPrice: 2.15, isOffer: true, discountPercent: 14, badge: 'Slovenské', flyerPage: 3 }
      }
    },
    {
      id: 'kuracie-rezne-1kg',
      nameEn: 'Chicken Breast Fillets 1kg',
      nameSk: 'Kuracie prsné rezne chladené 1kg',
      category: 'meat',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Čerstvé chladené kuracie prsia bez kostí a kože, pôvod Slovensko / EÚ.',
      prices: {
        kaufland: { price: 5.49, regularPrice: 7.99, isOffer: true, discountPercent: 31, badge: 'Mäsiarsky pult', flyerPage: 2 },
        lidl: { price: 4.89, regularPrice: 7.49, isOffer: true, discountPercent: 35, badge: 'Super Sobota', flyerPage: 1 },
        billa: { price: 6.29, regularPrice: 7.99, isOffer: true, discountPercent: 21, badge: 'Slovenská Farma', flyerPage: 5 },
        tesco: { price: 5.79, regularPrice: 7.89, isOffer: true, discountPercent: 27, badge: 'Clubcard', flyerPage: 3 },
        fresh: { price: 5.19, regularPrice: 7.39, isOffer: true, discountPercent: 30, badge: 'Top akcia', flyerPage: 2 }
      }
    },
    {
      id: 'bravcove-kare-1kg',
      nameEn: 'Pork Loin boneless 1kg',
      nameSk: 'Bravčové karé bez kosti 1kg',
      category: 'meat',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Chladené bravčové karé bez kosti v celku.',
      prices: {
        kaufland: { price: 4.29, regularPrice: 6.49, isOffer: true, discountPercent: 34, badge: 'Výhodná kúpa', flyerPage: 6 },
        lidl: { price: 4.49, regularPrice: 6.19, isOffer: true, discountPercent: 27, badge: 'Mäso z pultu', flyerPage: 5 },
        billa: { price: 5.19, regularPrice: 6.69, isOffer: true, discountPercent: 22, badge: 'Zľava týždňa', flyerPage: 4 },
        tesco: { price: 4.69, regularPrice: 6.39, isOffer: true, discountPercent: 27, badge: 'Tesco ponuka', flyerPage: 7 },
        fresh: { price: 4.99, regularPrice: 6.29, isOffer: true, discountPercent: 21, badge: null, flyerPage: null }
      }
    },
    {
      id: 'chlieb-psenicno-razny-500g',
      nameEn: 'Traditional Sourdough Bread 500g',
      nameSk: 'Konzumný chlieb pšenično-ražný 500g',
      category: 'bakery',
      unit: '500g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Chrumkavý bochník chleba s rascou pečený viackrát denne.',
      prices: {
        kaufland: { price: 0.89, regularPrice: 1.29, isOffer: true, discountPercent: 31, badge: 'Z našej pekárne', flyerPage: 8 },
        lidl: { price: 0.89, regularPrice: 1.19, isOffer: true, discountPercent: 25, badge: 'Vždy čerstvé', flyerPage: 4 },
        billa: { price: 1.19, regularPrice: 1.35, isOffer: false, discountPercent: 11, badge: null, flyerPage: null },
        tesco: { price: 0.95, regularPrice: 1.25, isOffer: true, discountPercent: 24, badge: 'Tesco pekáreň', flyerPage: 8 },
        fresh: { price: 0.85, regularPrice: 1.15, isOffer: true, discountPercent: 26, badge: 'Lokálna pekáreň', flyerPage: 4 }
      }
    },
    {
      id: 'rohlik-klasik-43g',
      nameEn: 'Standard Bread Roll 43g (Rohlík)',
      nameSk: 'Rohlík obyčajný 43g',
      category: 'bakery',
      unit: '1ks',
      unitPriceBase: 'ks',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Klasický slovenský biely rohlík.',
      prices: {
        kaufland: { price: 0.12, regularPrice: 0.14, isOffer: true, discountPercent: 14, badge: 'Top cena', flyerPage: 8 },
        lidl: { price: 0.11, regularPrice: 0.14, isOffer: true, discountPercent: 21, badge: 'Trhák', flyerPage: 4 },
        billa: { price: 0.13, regularPrice: 0.14, isOffer: false, discountPercent: 7, badge: null, flyerPage: null },
        tesco: { price: 0.12, regularPrice: 0.14, isOffer: false, discountPercent: 14, badge: null, flyerPage: null },
        fresh: { price: 0.11, regularPrice: 0.13, isOffer: true, discountPercent: 15, badge: 'Čerstvý rohlík', flyerPage: 4 }
      }
    },
    {
      id: 'banany-1kg',
      nameEn: 'Cavendish Bananas 1kg',
      nameSk: 'Banány žlté 1kg',
      category: 'produce',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Sladké zrelé banány I. akostnej triedy.',
      prices: {
        kaufland: { price: 1.09, regularPrice: 1.69, isOffer: true, discountPercent: 36, badge: 'Ovocný trhák', flyerPage: 1 },
        lidl: { price: 1.19, regularPrice: 1.69, isOffer: true, discountPercent: 30, badge: 'Pondelková zľava', flyerPage: 1 },
        billa: { price: 1.49, regularPrice: 1.79, isOffer: true, discountPercent: 17, badge: null, flyerPage: 3 },
        tesco: { price: 1.15, regularPrice: 1.69, isOffer: true, discountPercent: 32, badge: 'Clubcard', flyerPage: 2 },
        fresh: { price: 1.25, regularPrice: 1.65, isOffer: true, discountPercent: 24, badge: null, flyerPage: null }
      }
    },
    {
      id: 'jablka-gala-1kg',
      nameEn: 'Apples Gala Slovak 1kg',
      nameSk: 'Jablká Gala slovenské 1kg',
      category: 'produce',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Chrumkavé sladké jablká od slovenských ovocinárov.',
      prices: {
        kaufland: { price: 0.99, regularPrice: 1.59, isOffer: true, discountPercent: 38, badge: 'Slovenské ovocie', flyerPage: 2 },
        lidl: { price: 0.89, regularPrice: 1.49, isOffer: true, discountPercent: 40, badge: 'Super cena týždňa', flyerPage: 2 },
        billa: { price: 1.29, regularPrice: 1.69, isOffer: true, discountPercent: 24, badge: 'Slovenská Farma', flyerPage: 2 },
        tesco: { price: 1.09, regularPrice: 1.59, isOffer: true, discountPercent: 31, badge: 'Tesco ponuka', flyerPage: 3 },
        fresh: { price: 0.85, regularPrice: 1.45, isOffer: true, discountPercent: 41, badge: 'Región', flyerPage: 1 }
      }
    },
    {
      id: 'zemiaky-25kg',
      nameEn: 'Potatoes washed 2.5kg bag',
      nameSk: 'Zemiaky prané žlté 2,5kg balenie',
      category: 'produce',
      unit: '2.5kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Kvalitné prané konzumné zemiaky varný typ B.',
      prices: {
        kaufland: { price: 1.79, regularPrice: 2.79, isOffer: true, discountPercent: 36, badge: 'Kaufland Card', flyerPage: 3 },
        lidl: { price: 1.69, regularPrice: 2.59, isOffer: true, discountPercent: 35, badge: 'Lidl Plus kupón', flyerPage: 3 },
        billa: { price: 2.29, regularPrice: 2.89, isOffer: true, discountPercent: 21, badge: null, flyerPage: 4 },
        tesco: { price: 1.99, regularPrice: 2.79, isOffer: true, discountPercent: 29, badge: 'Výhodné balenie', flyerPage: 5 },
        fresh: { price: 1.89, regularPrice: 2.69, isOffer: true, discountPercent: 30, badge: null, flyerPage: null }
      }
    },
    {
      id: 'olej-slnecnicovy-1l',
      nameEn: 'Sunflower Oil 1L (Raciol/Classic)',
      nameSk: 'Slnečnicový olej 100% 1L',
      category: 'pantry',
      unit: '1L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Všestranný rastlinný olej na smaženie a varenie.',
      prices: {
        kaufland: { price: 1.39, regularPrice: 2.19, isOffer: true, discountPercent: 37, badge: 'Trhák týždňa', flyerPage: 7 },
        lidl: { price: 1.49, regularPrice: 2.09, isOffer: true, discountPercent: 29, badge: 'Vita D\'or', flyerPage: 6 },
        billa: { price: 1.89, regularPrice: 2.29, isOffer: true, discountPercent: 17, badge: null, flyerPage: 7 },
        tesco: { price: 1.35, regularPrice: 2.19, isOffer: true, discountPercent: 38, badge: 'Tesco Clubcard', flyerPage: 6 },
        fresh: { price: 1.55, regularPrice: 2.15, isOffer: true, discountPercent: 28, badge: null, flyerPage: null }
      }
    },
    {
      id: 'muka-hladka-1kg',
      nameEn: 'Wheat Flour Smooth 00 Extra 1kg',
      nameSk: 'Pšeničná múka hladká 00 Extra 1kg',
      category: 'pantry',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Slovenská múka z mlynu Pohronský Ruskov.',
      prices: {
        kaufland: { price: 0.59, regularPrice: 0.89, isOffer: true, discountPercent: 34, badge: 'K-Classic', flyerPage: 9 },
        lidl: { price: 0.55, regularPrice: 0.85, isOffer: true, discountPercent: 35, badge: 'Castello', flyerPage: 7 },
        billa: { price: 0.75, regularPrice: 0.89, isOffer: false, discountPercent: 16, badge: null, flyerPage: null },
        tesco: { price: 0.59, regularPrice: 0.89, isOffer: true, discountPercent: 34, badge: 'Výhodná cena', flyerPage: 8 },
        fresh: { price: 0.52, regularPrice: 0.85, isOffer: true, discountPercent: 39, badge: 'Fresh múka', flyerPage: 5 }
      }
    },
    {
      id: 'cukor-krystalovy-1kg',
      nameEn: 'Granulated Sugar 1kg',
      nameSk: 'Cukor biely kryštálový 1kg',
      category: 'pantry',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Korunný cukor z cukrovej repy.',
      prices: {
        kaufland: { price: 0.89, regularPrice: 1.29, isOffer: true, discountPercent: 31, badge: 'Kaufland trhák', flyerPage: 9 },
        lidl: { price: 0.89, regularPrice: 1.25, isOffer: true, discountPercent: 29, badge: 'Sladká ponuka', flyerPage: 7 },
        billa: { price: 1.09, regularPrice: 1.29, isOffer: true, discountPercent: 16, badge: null, flyerPage: null },
        tesco: { price: 0.95, regularPrice: 1.29, isOffer: true, discountPercent: 26, badge: 'Clubcard', flyerPage: 9 },
        fresh: { price: 0.99, regularPrice: 1.25, isOffer: true, discountPercent: 21, badge: null, flyerPage: null }
      }
    },
    {
      id: 'ryza-gulatovzrnna-1kg',
      nameEn: 'Round Grain Rice 1kg',
      nameSk: 'Ryža guľatozrnná lúpaná 1kg',
      category: 'pantry',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Vysokokvalitná guľatozrnná ryža vhodná do rizota aj mliečnej kaše.',
      prices: {
        kaufland: { price: 1.19, regularPrice: 1.79, isOffer: true, discountPercent: 34, badge: 'K-Classic', flyerPage: 10 },
        lidl: { price: 1.25, regularPrice: 1.69, isOffer: true, discountPercent: 26, badge: 'Golden Sun', flyerPage: 8 },
        billa: { price: 1.59, regularPrice: 1.89, isOffer: false, discountPercent: 16, badge: null, flyerPage: null },
        tesco: { price: 1.19, regularPrice: 1.79, isOffer: true, discountPercent: 34, badge: 'Tesco akcia', flyerPage: 10 },
        fresh: { price: 1.29, regularPrice: 1.75, isOffer: true, discountPercent: 26, badge: null, flyerPage: null }
      }
    },
    {
      id: 'spagety-500g',
      nameEn: 'Spaghetti Pasta Semolina 500g',
      nameSk: 'Špagety semolínové 500g Barilla/K-Classic',
      category: 'pantry',
      unit: '500g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Talianske cestoviny z tvrdej pšenice semolina.',
      prices: {
        kaufland: { price: 0.89, regularPrice: 1.49, isOffer: true, discountPercent: 40, badge: 'Taliansky týždeň', flyerPage: 11 },
        lidl: { price: 0.99, regularPrice: 1.39, isOffer: true, discountPercent: 29, badge: 'Combino', flyerPage: 9 },
        billa: { price: 1.29, regularPrice: 1.69, isOffer: true, discountPercent: 24, badge: 'Clever akcia', flyerPage: 8 },
        tesco: { price: 1.10, regularPrice: 1.49, isOffer: true, discountPercent: 26, badge: null, flyerPage: null },
        fresh: { price: 0.95, regularPrice: 1.45, isOffer: true, discountPercent: 34, badge: 'Fresh akcia', flyerPage: 6 }
      }
    },
    {
      id: 'bryndza-125g',
      nameEn: 'Authentic Slovak Bryndza 125g',
      nameSk: 'Liptov Bryndza plnotučná 125g',
      category: 'dairy',
      unit: '125g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Pravá slovenská bryndza s chráneným zemepisným označením.',
      prices: {
        kaufland: { price: 1.29, regularPrice: 1.89, isOffer: true, discountPercent: 32, badge: 'Slovenské srdce', flyerPage: 4 },
        lidl: { price: 1.39, regularPrice: 1.79, isOffer: true, discountPercent: 22, badge: 'Pilos tradícia', flyerPage: 3 },
        billa: { price: 1.69, regularPrice: 1.99, isOffer: false, discountPercent: 15, badge: null, flyerPage: null },
        tesco: { price: 1.35, regularPrice: 1.89, isOffer: true, discountPercent: 29, badge: 'Clubcard', flyerPage: 5 },
        fresh: { price: 1.19, regularPrice: 1.85, isOffer: true, discountPercent: 36, badge: 'Lokálny farmár', flyerPage: 2 }
      }
    },
    {
      id: 'syr-eidam-45-100g',
      nameEn: 'Edam Cheese block 45% 100g',
      nameSk: 'Syr Eidam 45% tehla 100g',
      category: 'dairy',
      unit: '100g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Klasický polotvrdý zrejúci syr Eidam 45% tuku v sušine.',
      prices: {
        kaufland: { price: 0.69, regularPrice: 0.99, isOffer: true, discountPercent: 30, badge: 'Syrový pult', flyerPage: 5 },
        lidl: { price: 0.65, regularPrice: 0.95, isOffer: true, discountPercent: 32, badge: 'Pilos Eidam', flyerPage: 3 },
        billa: { price: 0.89, regularPrice: 1.05, isOffer: false, discountPercent: 15, badge: null, flyerPage: null },
        tesco: { price: 0.72, regularPrice: 0.99, isOffer: true, discountPercent: 27, badge: 'Tesco akcia', flyerPage: 4 },
        fresh: { price: 0.68, regularPrice: 0.95, isOffer: true, discountPercent: 28, badge: null, flyerPage: null }
      }
    },
    {
      id: 'pilsner-urquell-05l',
      nameEn: 'Pilsner Urquell Beer Can 0.5L',
      nameSk: 'Plzeňský Prazdroj 12° ležiak plech 0,5L',
      category: 'drinks',
      unit: '0.5L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1608270191763-95244b74bbbe?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Svetlý ležiak s plnou chuťou a príjemnou chmeľovou horkosťou.',
      prices: {
        kaufland: { price: 0.99, regularPrice: 1.49, isOffer: true, discountPercent: 34, badge: 'Pivný festival', flyerPage: 14 },
        lidl: { price: 1.09, regularPrice: 1.45, isOffer: true, discountPercent: 25, badge: 'Výhodné multipack', flyerPage: 12 },
        billa: { price: 1.25, regularPrice: 1.49, isOffer: false, discountPercent: 16, badge: null, flyerPage: null },
        tesco: { price: 0.95, regularPrice: 1.49, isOffer: true, discountPercent: 36, badge: 'Clubcard trhák', flyerPage: 13 },
        fresh: { price: 1.15, regularPrice: 1.45, isOffer: true, discountPercent: 21, badge: null, flyerPage: null }
      }
    },
    {
      id: 'kofola-original-2l',
      nameEn: 'Kofola Original 2L PET',
      nameSk: 'Kofola Original 2L PET',
      category: 'drinks',
      unit: '2L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Tradičný československý kolový nápoj s bylinným extraktom KOFO.',
      prices: {
        kaufland: { price: 0.99, regularPrice: 1.59, isOffer: true, discountPercent: 38, badge: 'Letákový hit', flyerPage: 15 },
        lidl: { price: 1.09, regularPrice: 1.49, isOffer: true, discountPercent: 27, badge: 'Svieža akcia', flyerPage: 13 },
        billa: { price: 1.39, regularPrice: 1.59, isOffer: false, discountPercent: 13, badge: null, flyerPage: null },
        tesco: { price: 0.99, regularPrice: 1.59, isOffer: true, discountPercent: 38, badge: 'Clubcard ponuka', flyerPage: 14 },
        fresh: { price: 1.05, regularPrice: 1.49, isOffer: true, discountPercent: 30, badge: 'Fresh zľava', flyerPage: 7 }
      }
    },
    {
      id: 'birell-nealko-05l',
      nameEn: 'Birell Non-Alcoholic Radler Pomelo-Grep 0.5L',
      nameSk: 'Birell nealko Pomelo & Grep 0,5L plech',
      category: 'drinks',
      unit: '0.5L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Osviežujúci nealkoholický miešaný nápoj z piva s príchuťou pomela a grepu.',
      prices: {
        kaufland: { price: 0.69, regularPrice: 0.99, isOffer: true, discountPercent: 30, badge: 'Akciová cena', flyerPage: 15 },
        lidl: { price: 0.69, regularPrice: 0.95, isOffer: true, discountPercent: 27, badge: 'Osvieženie', flyerPage: 13 },
        billa: { price: 0.85, regularPrice: 0.99, isOffer: false, discountPercent: 14, badge: null, flyerPage: null },
        tesco: { price: 0.72, regularPrice: 0.99, isOffer: true, discountPercent: 27, badge: null, flyerPage: null },
        fresh: { price: 0.65, regularPrice: 0.95, isOffer: true, discountPercent: 32, badge: 'Top cena', flyerPage: 8 }
      }
    },
    {
      id: 'kava-zrnkova-1kg',
      nameEn: 'Coffee Beans Tchibo Barista Espresso 1kg',
      nameSk: 'Káva zrnková Tchibo Barista Espresso 1kg',
      category: 'pantry',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Prémiová 100% káva Arabica pražená tradičným bubnovým pražením.',
      prices: {
        kaufland: { price: 11.99, regularPrice: 18.99, isOffer: true, discountPercent: 37, badge: 'Kaufland Card megazľava', flyerPage: 12 },
        lidl: { price: 12.99, regularPrice: 17.99, isOffer: true, discountPercent: 28, badge: 'Bellarom/Tchibo', flyerPage: 10 },
        billa: { price: 13.49, regularPrice: 18.99, isOffer: true, discountPercent: 29, badge: 'Billa Bonus', flyerPage: 10 },
        tesco: { price: 11.49, regularPrice: 18.99, isOffer: true, discountPercent: 39, badge: 'Clubcard trhák', flyerPage: 11 },
        fresh: { price: 13.99, regularPrice: 17.99, isOffer: false, discountPercent: 22, badge: null, flyerPage: null }
      }
    },
    {
      id: 'persil-gel-praci-15l',
      nameEn: 'Persil Washing Gel 1.5L / 30 washes',
      nameSk: 'Persil prací gél Deep Clean 1,5L (30 praní)',
      category: 'household',
      unit: '1.5L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Prací gél s hĺbkovým čistiacim účinkom na farebnú aj bielu bielizeň.',
      prices: {
        kaufland: { price: 7.99, regularPrice: 13.99, isOffer: true, discountPercent: 43, badge: 'Super akcia', flyerPage: 16 },
        lidl: { price: 8.49, regularPrice: 12.99, isOffer: true, discountPercent: 35, badge: 'Formil / Persil', flyerPage: 14 },
        billa: { price: 9.99, regularPrice: 14.49, isOffer: true, discountPercent: 31, badge: 'Drogéria', flyerPage: 12 },
        tesco: { price: 7.49, regularPrice: 13.99, isOffer: true, discountPercent: 46, badge: 'Najnižšia cena Clubcard', flyerPage: 15 },
        fresh: { price: 8.99, regularPrice: 13.49, isOffer: true, discountPercent: 33, badge: null, flyerPage: null }
      }
    },
    {
      id: 'jar-na-riad-900ml',
      nameEn: 'Jar Dishwashing Liquid Lemon 900ml',
      nameSk: 'Jar prostriedok na riad Citrón 900ml',
      category: 'household',
      unit: '900ml',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Účinný tekutý prostriedok na ručné umývanie riadu s odmasťovacou silou.',
      prices: {
        kaufland: { price: 2.19, regularPrice: 3.49, isOffer: true, discountPercent: 37, badge: 'Výhodné balenie', flyerPage: 17 },
        lidl: { price: 2.29, regularPrice: 3.29, isOffer: true, discountPercent: 30, badge: 'W5 / Jar', flyerPage: 15 },
        billa: { price: 2.79, regularPrice: 3.49, isOffer: true, discountPercent: 20, badge: null, flyerPage: 14 },
        tesco: { price: 1.99, regularPrice: 3.49, isOffer: true, discountPercent: 43, badge: 'Clubcard zľava', flyerPage: 16 },
        fresh: { price: 2.39, regularPrice: 3.39, isOffer: true, discountPercent: 29, badge: null, flyerPage: null }
      }
    },
    {
      id: 'toaletny-papier-8ks',
      nameEn: 'Toilet Paper Harmony 3-ply 8 rolls',
      nameSk: 'Toaletný papier Harmony Soft 3-vrstvový 8ks',
      category: 'household',
      unit: '8ks',
      unitPriceBase: 'ks',
      image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Jemný biely trojvrstvový toaletný papier zo 100% celulózy.',
      prices: {
        kaufland: { price: 2.29, regularPrice: 3.69, isOffer: true, discountPercent: 38, badge: 'Letákový hit', flyerPage: 18 },
        lidl: { price: 2.19, regularPrice: 3.49, isOffer: true, discountPercent: 37, badge: 'Floralys', flyerPage: 16 },
        billa: { price: 2.89, regularPrice: 3.69, isOffer: true, discountPercent: 22, badge: null, flyerPage: 15 },
        tesco: { price: 2.49, regularPrice: 3.69, isOffer: true, discountPercent: 32, badge: 'Clubcard', flyerPage: 17 },
        fresh: { price: 2.59, regularPrice: 3.59, isOffer: true, discountPercent: 28, badge: null, flyerPage: null }
      }
    }
  ]
};

// Upcoming weekly flyer cycle (e.g. Nov 12, 2026 - Nov 18, 2026)
// Used when the current offer period expires or when previewing upcoming leaflets!
const UPCOMING_CYCLE = {
  cycleId: 'cycle-w46-2026',
  cycleName: 'Týždeň 46 / Budúce letáky (Nové ponuky)',
  validFrom: '2026-11-12T00:00:00Z',
  validUntil: '2026-11-18T23:59:59Z',
  totalDeals: 38,
  status: 'upcoming',
  items: [
    {
      id: 'maslo-250g',
      nameEn: 'Fresh Butter 82% 250g',
      nameSk: 'Čerstvé maslo 82% 250g',
      category: 'dairy',
      unit: '250g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Tradičné slovenské maslo s minimálnym obsahom tuku 82 %.',
      prices: {
        kaufland: { price: 1.79, regularPrice: 2.39, isOffer: true, discountPercent: 25, badge: 'Kaufland ponuka', flyerPage: 4 },
        lidl: { price: 1.39, regularPrice: 2.29, isOffer: true, discountPercent: 39, badge: 'Lidl Plus bomba týždňa', flyerPage: 1 },
        billa: { price: 1.99, regularPrice: 2.49, isOffer: true, discountPercent: 20, badge: 'Billa Bonus', flyerPage: 3 },
        tesco: { price: 1.65, regularPrice: 2.39, isOffer: true, discountPercent: 31, badge: 'Clubcard', flyerPage: 2 },
        fresh: { price: 1.59, regularPrice: 2.19, isOffer: true, discountPercent: 27, badge: 'Fresh zľava', flyerPage: 1 }
      }
    },
    {
      id: 'mlieko-15-1l',
      nameEn: 'Semi-skimmed Milk 1.5% 1L',
      nameSk: 'Mlieko polotučné 1,5% 1L UHT',
      category: 'dairy',
      unit: '1L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Trvanlivé polotučné mlieko ošetrené UHT technológiou.',
      prices: {
        kaufland: { price: 0.65, regularPrice: 0.99, isOffer: true, discountPercent: 34, badge: 'Super cena K-Classic', flyerPage: 1 },
        lidl: { price: 0.75, regularPrice: 0.99, isOffer: true, discountPercent: 24, badge: null, flyerPage: 5 },
        billa: { price: 0.89, regularPrice: 1.05, isOffer: true, discountPercent: 15, badge: 'Clever akcia', flyerPage: 4 },
        tesco: { price: 0.72, regularPrice: 0.99, isOffer: true, discountPercent: 27, badge: 'Clubcard', flyerPage: 5 },
        fresh: { price: 0.79, regularPrice: 0.99, isOffer: true, discountPercent: 20, badge: null, flyerPage: null }
      }
    },
    {
      id: 'vajcia-10ks',
      nameEn: 'Barn Eggs M 10 pcs',
      nameSk: 'Vajcia z podstielkového chovu M 10ks',
      category: 'dairy',
      unit: '10ks',
      unitPriceBase: 'ks',
      image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Slovenské čerstvé podstielkové vajcia veľkosti M.',
      prices: {
        kaufland: { price: 1.69, regularPrice: 2.39, isOffer: true, discountPercent: 29, badge: null, flyerPage: null },
        lidl: { price: 1.49, regularPrice: 2.19, isOffer: true, discountPercent: 32, badge: 'Super Sobota', flyerPage: 2 },
        billa: { price: 1.99, regularPrice: 2.49, isOffer: true, discountPercent: 20, badge: 'Billa zľava', flyerPage: 5 },
        tesco: { price: 1.29, regularPrice: 2.29, isOffer: true, discountPercent: 44, badge: 'Mega zľava Clubcard', flyerPage: 1 },
        fresh: { price: 1.75, regularPrice: 2.15, isOffer: true, discountPercent: 19, badge: null, flyerPage: null }
      }
    },
    {
      id: 'kuracie-rezne-1kg',
      nameEn: 'Chicken Breast Fillets 1kg',
      nameSk: 'Kuracie prsné rezne chladené 1kg',
      category: 'meat',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Čerstvé chladené kuracie prsia bez kostí a kože, pôvod Slovensko / EÚ.',
      prices: {
        kaufland: { price: 4.79, regularPrice: 7.99, isOffer: true, discountPercent: 40, badge: 'Kaufland Card pecka', flyerPage: 1 },
        lidl: { price: 5.29, regularPrice: 7.49, isOffer: true, discountPercent: 29, badge: 'Pondelok čerstvosť', flyerPage: 3 },
        billa: { price: 5.89, regularPrice: 7.99, isOffer: true, discountPercent: 26, badge: 'Slovenská Farma', flyerPage: 4 },
        tesco: { price: 5.19, regularPrice: 7.89, isOffer: true, discountPercent: 34, badge: 'Clubcard zľava', flyerPage: 3 },
        fresh: { price: 4.95, regularPrice: 7.39, isOffer: true, discountPercent: 33, badge: 'Fresh trhák', flyerPage: 2 }
      }
    },
    {
      id: 'bravcove-kare-1kg',
      nameEn: 'Pork Loin boneless 1kg',
      nameSk: 'Bravčové karé bez kosti 1kg',
      category: 'meat',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Chladené bravčové karé bez kosti v celku.',
      prices: {
        kaufland: { price: 3.99, regularPrice: 6.49, isOffer: true, discountPercent: 39, badge: 'Mäsiarska zľava', flyerPage: 3 },
        lidl: { price: 4.19, regularPrice: 6.19, isOffer: true, discountPercent: 32, badge: 'Super cena', flyerPage: 4 },
        billa: { price: 4.89, regularPrice: 6.69, isOffer: true, discountPercent: 27, badge: 'Akcia týždňa', flyerPage: 6 },
        tesco: { price: 4.49, regularPrice: 6.39, isOffer: true, discountPercent: 30, badge: 'Clubcard', flyerPage: 4 },
        fresh: { price: 4.39, regularPrice: 6.29, isOffer: true, discountPercent: 30, badge: 'Slovenské bravčové', flyerPage: 2 }
      }
    },
    {
      id: 'chlieb-psenicno-razny-500g',
      nameEn: 'Traditional Sourdough Bread 500g',
      nameSk: 'Konzumný chlieb pšenično-ražný 500g',
      category: 'bakery',
      unit: '500g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Chrumkavý bochník chleba s rascou pečený viackrát denne.',
      prices: {
        kaufland: { price: 0.95, regularPrice: 1.29, isOffer: true, discountPercent: 26, badge: null, flyerPage: null },
        lidl: { price: 0.79, regularPrice: 1.19, isOffer: true, discountPercent: 34, badge: 'Zlatý chlieb akcia', flyerPage: 2 },
        billa: { price: 1.09, regularPrice: 1.35, isOffer: true, discountPercent: 19, badge: null, flyerPage: 5 },
        tesco: { price: 0.89, regularPrice: 1.25, isOffer: true, discountPercent: 29, badge: 'Pekáreň zľava', flyerPage: 6 },
        fresh: { price: 0.79, regularPrice: 1.15, isOffer: true, discountPercent: 31, badge: 'Tradičný peceň', flyerPage: 3 }
      }
    },
    {
      id: 'rohlik-klasik-43g',
      nameEn: 'Standard Bread Roll 43g (Rohlík)',
      nameSk: 'Rohlík obyčajný 43g',
      category: 'bakery',
      unit: '1ks',
      unitPriceBase: 'ks',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Klasický slovenský biely rohlík.',
      prices: {
        kaufland: { price: 0.10, regularPrice: 0.14, isOffer: true, discountPercent: 29, badge: 'Cenový hit', flyerPage: 3 },
        lidl: { price: 0.10, regularPrice: 0.14, isOffer: true, discountPercent: 29, badge: 'Rohlík za babku', flyerPage: 2 },
        billa: { price: 0.12, regularPrice: 0.14, isOffer: false, discountPercent: 14, badge: null, flyerPage: null },
        tesco: { price: 0.11, regularPrice: 0.14, isOffer: true, discountPercent: 21, badge: null, flyerPage: null },
        fresh: { price: 0.10, regularPrice: 0.13, isOffer: true, discountPercent: 23, badge: 'Čerstvý rohlík', flyerPage: 3 }
      }
    },
    {
      id: 'banany-1kg',
      nameEn: 'Cavendish Bananas 1kg',
      nameSk: 'Banány žlté 1kg',
      category: 'produce',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Sladké zrelé banány I. akostnej triedy.',
      prices: {
        kaufland: { price: 1.15, regularPrice: 1.69, isOffer: true, discountPercent: 32, badge: null, flyerPage: null },
        lidl: { price: 0.99, regularPrice: 1.69, isOffer: true, discountPercent: 41, badge: 'Trhák týždňa Lidl', flyerPage: 1 },
        billa: { price: 1.35, regularPrice: 1.79, isOffer: true, discountPercent: 25, badge: 'Billa ponuka', flyerPage: 2 },
        tesco: { price: 1.05, regularPrice: 1.69, isOffer: true, discountPercent: 38, badge: 'Clubcard', flyerPage: 2 },
        fresh: { price: 1.19, regularPrice: 1.65, isOffer: true, discountPercent: 28, badge: null, flyerPage: null }
      }
    },
    {
      id: 'jablka-gala-1kg',
      nameEn: 'Apples Gala Slovak 1kg',
      nameSk: 'Jablká Gala slovenské 1kg',
      category: 'produce',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Chrumkavé sladké jablká od slovenských ovocinárov.',
      prices: {
        kaufland: { price: 0.89, regularPrice: 1.59, isOffer: true, discountPercent: 44, badge: 'Top slovenská úroda', flyerPage: 2 },
        lidl: { price: 0.99, regularPrice: 1.49, isOffer: true, discountPercent: 34, badge: null, flyerPage: 3 },
        billa: { price: 1.19, regularPrice: 1.69, isOffer: true, discountPercent: 30, badge: 'Slovenská Farma', flyerPage: 2 },
        tesco: { price: 0.95, regularPrice: 1.59, isOffer: true, discountPercent: 40, badge: 'Clubcard akcia', flyerPage: 3 },
        fresh: { price: 0.79, regularPrice: 1.45, isOffer: true, discountPercent: 46, badge: 'Super cena Fresh', flyerPage: 1 }
      }
    },
    {
      id: 'zemiaky-25kg',
      nameEn: 'Potatoes washed 2.5kg bag',
      nameSk: 'Zemiaky prané žlté 2,5kg balenie',
      category: 'produce',
      unit: '2.5kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Kvalitné prané konzumné zemiaky varný typ B.',
      prices: {
        kaufland: { price: 1.59, regularPrice: 2.79, isOffer: true, discountPercent: 43, badge: 'Veľké rodinné balenie', flyerPage: 2 },
        lidl: { price: 1.79, regularPrice: 2.59, isOffer: true, discountPercent: 31, badge: null, flyerPage: 4 },
        billa: { price: 2.19, regularPrice: 2.89, isOffer: true, discountPercent: 24, badge: null, flyerPage: 5 },
        tesco: { price: 1.69, regularPrice: 2.79, isOffer: true, discountPercent: 39, badge: 'Clubcard trhák', flyerPage: 4 },
        fresh: { price: 1.75, regularPrice: 2.69, isOffer: true, discountPercent: 35, badge: 'Slovenský pestovateľ', flyerPage: 3 }
      }
    },
    {
      id: 'olej-slnecnicovy-1l',
      nameEn: 'Sunflower Oil 1L (Raciol/Classic)',
      nameSk: 'Slnečnicový olej 100% 1L',
      category: 'pantry',
      unit: '1L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Všestranný rastlinný olej na smaženie a varenie.',
      prices: {
        kaufland: { price: 1.45, regularPrice: 2.19, isOffer: true, discountPercent: 34, badge: null, flyerPage: 7 },
        lidl: { price: 1.29, regularPrice: 2.09, isOffer: true, discountPercent: 38, badge: 'Vita D\'or bomba', flyerPage: 4 },
        billa: { price: 1.69, regularPrice: 2.29, isOffer: true, discountPercent: 26, badge: 'Clever zľava', flyerPage: 8 },
        tesco: { price: 1.39, regularPrice: 2.19, isOffer: true, discountPercent: 37, badge: 'Clubcard', flyerPage: 5 },
        fresh: { price: 1.49, regularPrice: 2.15, isOffer: true, discountPercent: 31, badge: null, flyerPage: null }
      }
    },
    {
      id: 'muka-hladka-1kg',
      nameEn: 'Wheat Flour Smooth 00 Extra 1kg',
      nameSk: 'Pšeničná múka hladká 00 Extra 1kg',
      category: 'pantry',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Slovenská múka z mlynu Pohronský Ruskov.',
      prices: {
        kaufland: { price: 0.52, regularPrice: 0.89, isOffer: true, discountPercent: 42, badge: 'Múka za bezkonkurenčnú cenu', flyerPage: 5 },
        lidl: { price: 0.59, regularPrice: 0.85, isOffer: true, discountPercent: 31, badge: null, flyerPage: 8 },
        billa: { price: 0.69, regularPrice: 0.89, isOffer: true, discountPercent: 22, badge: 'Clever akcia', flyerPage: 7 },
        tesco: { price: 0.55, regularPrice: 0.89, isOffer: true, discountPercent: 38, badge: 'Tesco Clubcard', flyerPage: 6 },
        fresh: { price: 0.58, regularPrice: 0.85, isOffer: true, discountPercent: 32, badge: null, flyerPage: null }
      }
    },
    {
      id: 'cukor-krystalovy-1kg',
      nameEn: 'Granulated Sugar 1kg',
      nameSk: 'Cukor biely kryštálový 1kg',
      category: 'pantry',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Korunný cukor z cukrovej repy.',
      prices: {
        kaufland: { price: 0.85, regularPrice: 1.29, isOffer: true, discountPercent: 34, badge: 'K-Classic akcia', flyerPage: 6 },
        lidl: { price: 0.82, regularPrice: 1.25, isOffer: true, discountPercent: 34, badge: 'Lidl Plus kupón', flyerPage: 5 },
        billa: { price: 0.99, regularPrice: 1.29, isOffer: true, discountPercent: 23, badge: null, flyerPage: null },
        tesco: { price: 0.89, regularPrice: 1.29, isOffer: true, discountPercent: 31, badge: 'Clubcard', flyerPage: 7 },
        fresh: { price: 0.92, regularPrice: 1.25, isOffer: true, discountPercent: 26, badge: null, flyerPage: null }
      }
    },
    {
      id: 'ryza-gulatovzrnna-1kg',
      nameEn: 'Round Grain Rice 1kg',
      nameSk: 'Ryža guľatozrnná lúpaná 1kg',
      category: 'pantry',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Vysokokvalitná guľatozrnná ryža vhodná do rizota aj mliečnej kaše.',
      prices: {
        kaufland: { price: 1.09, regularPrice: 1.79, isOffer: true, discountPercent: 39, badge: 'Výhodné rodinné', flyerPage: 8 },
        lidl: { price: 1.15, regularPrice: 1.69, isOffer: true, discountPercent: 32, badge: 'Golden Sun zľava', flyerPage: 6 },
        billa: { price: 1.49, regularPrice: 1.89, isOffer: true, discountPercent: 21, badge: null, flyerPage: 9 },
        tesco: { price: 1.12, regularPrice: 1.79, isOffer: true, discountPercent: 37, badge: 'Clubcard cena', flyerPage: 7 },
        fresh: { price: 1.22, regularPrice: 1.75, isOffer: true, discountPercent: 30, badge: null, flyerPage: null }
      }
    },
    {
      id: 'spagety-500g',
      nameEn: 'Spaghetti Pasta Semolina 500g',
      nameSk: 'Špagety semolínové 500g Barilla/K-Classic',
      category: 'pantry',
      unit: '500g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Talianske cestoviny z tvrdej pšenice semolina.',
      prices: {
        kaufland: { price: 0.95, regularPrice: 1.49, isOffer: true, discountPercent: 36, badge: null, flyerPage: null },
        lidl: { price: 0.85, regularPrice: 1.39, isOffer: true, discountPercent: 39, badge: 'Italiamo týždeň', flyerPage: 1 },
        billa: { price: 1.15, regularPrice: 1.69, isOffer: true, discountPercent: 32, badge: 'Barilla v akcii', flyerPage: 7 },
        tesco: { price: 0.99, regularPrice: 1.49, isOffer: true, discountPercent: 34, badge: 'Tesco akcia', flyerPage: 8 },
        fresh: { price: 0.89, regularPrice: 1.45, isOffer: true, discountPercent: 39, badge: 'Fresh zľava', flyerPage: 4 }
      }
    },
    {
      id: 'bryndza-125g',
      nameEn: 'Authentic Slovak Bryndza 125g',
      nameSk: 'Liptov Bryndza plnotučná 125g',
      category: 'dairy',
      unit: '125g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Pravá slovenská bryndza s chráneným zemepisným označením.',
      prices: {
        kaufland: { price: 1.35, regularPrice: 1.89, isOffer: true, discountPercent: 29, badge: null, flyerPage: null },
        lidl: { price: 1.25, regularPrice: 1.79, isOffer: true, discountPercent: 30, badge: 'Lidl Plus', flyerPage: 4 },
        billa: { price: 1.49, regularPrice: 1.99, isOffer: true, discountPercent: 25, badge: 'Slovenská farma', flyerPage: 6 },
        tesco: { price: 1.29, regularPrice: 1.89, isOffer: true, discountPercent: 32, badge: 'Clubcard zľava', flyerPage: 4 },
        fresh: { price: 1.15, regularPrice: 1.85, isOffer: true, discountPercent: 38, badge: 'Východniarska akcia', flyerPage: 1 }
      }
    },
    {
      id: 'syr-eidam-45-100g',
      nameEn: 'Edam Cheese block 45% 100g',
      nameSk: 'Syr Eidam 45% tehla 100g',
      category: 'dairy',
      unit: '100g',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Klasický polotvrdý zrejúci syr Eidam 45% tuku v sušine.',
      prices: {
        kaufland: { price: 0.62, regularPrice: 0.99, isOffer: true, discountPercent: 37, badge: 'Kaufland Card pecka', flyerPage: 4 },
        lidl: { price: 0.69, regularPrice: 0.95, isOffer: true, discountPercent: 27, badge: null, flyerPage: null },
        billa: { price: 0.79, regularPrice: 1.05, isOffer: true, discountPercent: 25, badge: 'Pultová akcia', flyerPage: 5 },
        tesco: { price: 0.65, regularPrice: 0.99, isOffer: true, discountPercent: 34, badge: 'Clubcard', flyerPage: 5 },
        fresh: { price: 0.66, regularPrice: 0.95, isOffer: true, discountPercent: 31, badge: null, flyerPage: null }
      }
    },
    {
      id: 'pilsner-urquell-05l',
      nameEn: 'Pilsner Urquell Beer Can 0.5L',
      nameSk: 'Plzeňský Prazdroj 12° ležiak plech 0,5L',
      category: 'drinks',
      unit: '0.5L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1608270191763-95244b74bbbe?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Svetlý ležiak s plnou chuťou a príjemnou chmeľovou horkosťou.',
      prices: {
        kaufland: { price: 1.05, regularPrice: 1.49, isOffer: true, discountPercent: 30, badge: null, flyerPage: 13 },
        lidl: { price: 0.99, regularPrice: 1.45, isOffer: true, discountPercent: 32, badge: 'Super víkend', flyerPage: 12 },
        billa: { price: 0.89, regularPrice: 1.49, isOffer: true, discountPercent: 40, badge: 'Billa trhák týždňa', flyerPage: 1 },
        tesco: { price: 1.05, regularPrice: 1.49, isOffer: true, discountPercent: 30, badge: null, flyerPage: 14 },
        fresh: { price: 1.09, regularPrice: 1.45, isOffer: true, discountPercent: 25, badge: null, flyerPage: null }
      }
    },
    {
      id: 'kofola-original-2l',
      nameEn: 'Kofola Original 2L PET',
      nameSk: 'Kofola Original 2L PET',
      category: 'drinks',
      unit: '2L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Tradičný československý kolový nápoj s bylinným extraktom KOFO.',
      prices: {
        kaufland: { price: 1.09, regularPrice: 1.59, isOffer: true, discountPercent: 31, badge: null, flyerPage: 14 },
        lidl: { price: 0.95, regularPrice: 1.49, isOffer: true, discountPercent: 36, badge: 'Lidl Plus kupón', flyerPage: 11 },
        billa: { price: 1.15, regularPrice: 1.59, isOffer: true, discountPercent: 28, badge: 'Akcia nápoje', flyerPage: 12 },
        tesco: { price: 1.05, regularPrice: 1.59, isOffer: true, discountPercent: 34, badge: null, flyerPage: 13 },
        fresh: { price: 0.99, regularPrice: 1.49, isOffer: true, discountPercent: 34, badge: 'Fresh hit', flyerPage: 6 }
      }
    },
    {
      id: 'birell-nealko-05l',
      nameEn: 'Birell Non-Alcoholic Radler Pomelo-Grep 0.5L',
      nameSk: 'Birell nealko Pomelo & Grep 0,5L plech',
      category: 'drinks',
      unit: '0.5L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Osviežujúci nealkoholický miešaný nápoj z piva s príchuťou pomela a grepu.',
      prices: {
        kaufland: { price: 0.65, regularPrice: 0.99, isOffer: true, discountPercent: 34, badge: 'Akciový nápoj', flyerPage: 14 },
        lidl: { price: 0.62, regularPrice: 0.95, isOffer: true, discountPercent: 35, badge: 'Lidl Plus', flyerPage: 12 },
        billa: { price: 0.79, regularPrice: 0.99, isOffer: true, discountPercent: 20, badge: null, flyerPage: 13 },
        tesco: { price: 0.69, regularPrice: 0.99, isOffer: true, discountPercent: 30, badge: 'Clubcard', flyerPage: 14 },
        fresh: { price: 0.69, regularPrice: 0.95, isOffer: true, discountPercent: 27, badge: null, flyerPage: null }
      }
    },
    {
      id: 'kava-zrnkova-1kg',
      nameEn: 'Coffee Beans Tchibo Barista Espresso 1kg',
      nameSk: 'Káva zrnková Tchibo Barista Espresso 1kg',
      category: 'pantry',
      unit: '1kg',
      unitPriceBase: 'kg',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Prémiová 100% káva Arabica pražená tradičným bubnovým pražením.',
      prices: {
        kaufland: { price: 12.49, regularPrice: 18.99, isOffer: true, discountPercent: 34, badge: 'Kaufland káva', flyerPage: 11 },
        lidl: { price: 10.99, regularPrice: 17.99, isOffer: true, discountPercent: 39, badge: 'Bellarom / Tchibo trhák', flyerPage: 1 },
        billa: { price: 11.99, regularPrice: 18.99, isOffer: true, discountPercent: 37, badge: 'Billa Bonus zľava', flyerPage: 9 },
        tesco: { price: 12.99, regularPrice: 18.99, isOffer: true, discountPercent: 32, badge: 'Clubcard', flyerPage: 10 },
        fresh: { price: 12.89, regularPrice: 17.99, isOffer: true, discountPercent: 28, badge: null, flyerPage: null }
      }
    },
    {
      id: 'persil-gel-praci-15l',
      nameEn: 'Persil Washing Gel 1.5L / 30 washes',
      nameSk: 'Persil prací gél Deep Clean 1,5L (30 praní)',
      category: 'household',
      unit: '1.5L',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&auto=format&fit=crop&q=80',
      isStaple: false,
      description: 'Prací gél s hĺbkovým čistiacim účinkom na farebnú aj bielu bielizeň.',
      prices: {
        kaufland: { price: 7.49, regularPrice: 13.99, isOffer: true, discountPercent: 46, badge: 'Kaufland Card trhák', flyerPage: 1 },
        lidl: { price: 7.89, regularPrice: 12.99, isOffer: true, discountPercent: 39, badge: 'Čistý domov', flyerPage: 15 },
        billa: { price: 8.99, regularPrice: 14.49, isOffer: true, discountPercent: 38, badge: 'Drogéria akcia', flyerPage: 14 },
        tesco: { price: 8.29, regularPrice: 13.99, isOffer: true, discountPercent: 41, badge: 'Clubcard', flyerPage: 16 },
        fresh: { price: 8.49, regularPrice: 13.49, isOffer: true, discountPercent: 37, badge: null, flyerPage: null }
      }
    },
    {
      id: 'jar-na-riad-900ml',
      nameEn: 'Jar Dishwashing Liquid Lemon 900ml',
      nameSk: 'Jar prostriedok na riad Citrón 900ml',
      category: 'household',
      unit: '900ml',
      unitPriceBase: 'l',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Účinný tekutý prostriedok na ručné umývanie riadu s odmasťovacou silou.',
      prices: {
        kaufland: { price: 1.99, regularPrice: 3.49, isOffer: true, discountPercent: 43, badge: 'Jar bomba týždňa', flyerPage: 16 },
        lidl: { price: 2.15, regularPrice: 3.29, isOffer: true, discountPercent: 35, badge: 'Lidl akcia', flyerPage: 14 },
        billa: { price: 2.49, regularPrice: 3.49, isOffer: true, discountPercent: 29, badge: null, flyerPage: 13 },
        tesco: { price: 2.19, regularPrice: 3.49, isOffer: true, discountPercent: 37, badge: 'Clubcard', flyerPage: 15 },
        fresh: { price: 2.19, regularPrice: 3.39, isOffer: true, discountPercent: 35, badge: 'Super cena', flyerPage: 8 }
      }
    },
    {
      id: 'toaletny-papier-8ks',
      nameEn: 'Toilet Paper Harmony 3-ply 8 rolls',
      nameSk: 'Toaletný papier Harmony Soft 3-vrstvový 8ks',
      category: 'household',
      unit: '8ks',
      unitPriceBase: 'ks',
      image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&auto=format&fit=crop&q=80',
      isStaple: true,
      description: 'Jemný biely trojvrstvový toaletný papier zo 100% celulózy.',
      prices: {
        kaufland: { price: 2.39, regularPrice: 3.69, isOffer: true, discountPercent: 35, badge: null, flyerPage: 17 },
        lidl: { price: 1.99, regularPrice: 3.49, isOffer: true, discountPercent: 43, badge: 'Floralys super zľava', flyerPage: 1 },
        billa: { price: 2.69, regularPrice: 3.69, isOffer: true, discountPercent: 27, badge: 'Clever hygiena', flyerPage: 15 },
        tesco: { price: 2.29, regularPrice: 3.69, isOffer: true, discountPercent: 38, badge: 'Clubcard', flyerPage: 16 },
        fresh: { price: 2.45, regularPrice: 3.59, isOffer: true, discountPercent: 32, badge: null, flyerPage: null }
      }
    }
  ]
};

// Public Slovak Leaflet links & web cover metadata
const LEAFLETS_METADATA = [
  {
    chainId: 'kaufland',
    chainName: 'Kaufland',
    title: 'Aktuálny leták Kaufland Slovensko',
    validPeriod: 'Štv 05.11 - Str 11.11.2026',
    validFrom: '2026-11-05T00:00:00Z',
    validUntil: '2026-11-11T23:59:59Z',
    pagesCount: 48,
    coverUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80',
    webLink: 'https://www.kaufland.sk/aktualne-letaky.html',
    source: 'kaufland.sk'
  },
  {
    chainId: 'lidl',
    chainName: 'Lidl',
    title: 'Aktuálny leták Lidl Slovensko - Správna voľba',
    validPeriod: 'Pon 02.11 - Ned 08.11.2026',
    validFrom: '2026-11-02T00:00:00Z',
    validUntil: '2026-11-08T23:59:59Z',
    pagesCount: 52,
    coverUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80',
    webLink: 'https://www.lidl.sk/c/online-letaky/s10022472',
    source: 'lidl.sk'
  },
  {
    chainId: 'billa',
    chainName: 'Billa',
    title: 'Billa hlavný leták - Presne podľa mojej chuti',
    validPeriod: 'Str 04.11 - Uto 10.11.2026',
    validFrom: '2026-11-04T00:00:00Z',
    validUntil: '2026-11-10T23:59:59Z',
    pagesCount: 36,
    coverUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500&auto=format&fit=crop&q=80',
    webLink: 'https://www.billa.sk/akcie/aktualny-letak',
    source: 'billa.sk'
  },
  {
    chainId: 'tesco',
    chainName: 'Tesco',
    title: 'Tesco leták s Clubcard zľavami',
    validPeriod: 'Str 04.11 - Uto 10.11.2026',
    validFrom: '2026-11-04T00:00:00Z',
    validUntil: '2026-11-10T23:59:59Z',
    pagesCount: 40,
    coverUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&auto=format&fit=crop&q=80',
    webLink: 'https://tesco.sk/akciove-letaky/',
    source: 'tesco.sk'
  },
  {
    chainId: 'fresh',
    chainName: 'FRESH / FRESH Plus',
    title: 'FRESH akčný leták - Čerstvé a slovenské',
    validPeriod: 'Štv 05.11 - Str 18.11.2026',
    validFrom: '2026-11-05T00:00:00Z',
    validUntil: '2026-11-18T23:59:59Z',
    pagesCount: 24,
    coverUrl: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=500&auto=format&fit=crop&q=80',
    webLink: 'https://potravinyfresh.sk/letaky',
    source: 'potravinyfresh.sk'
  }
];

module.exports = {
  CATEGORIES,
  CURRENT_CYCLE,
  UPCOMING_CYCLE,
  LEAFLETS_METADATA
};
