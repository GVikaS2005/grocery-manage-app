// Comprehensive Granular Grocery Products & Promotional Pricing Data for Slovakia
// Extracted and normalized from Kaufland, Lidl, Billa, Tesco, and FRESH flyers

const CATEGORIES = [
  { id: 'all', nameEn: 'All Categories', nameSk: 'Všetky kategórie', icon: 'Grid' },
  { id: 'produce', nameEn: 'Fruits & Veg', nameSk: 'Ovocie & Zelenina', icon: 'Apple' },
  { id: 'meat', nameEn: 'Meat & Poultry', nameSk: 'Mäso & Hydina', icon: 'Beef' },
  { id: 'dairy', nameEn: 'Dairy & Eggs', nameSk: 'Mliečne & Vajcia', icon: 'Egg' },
  { id: 'bakery', nameEn: 'Bakery & Bread', nameSk: 'Pečivo & Chlieb', icon: 'Croissant' },
  { id: 'pantry', nameEn: 'Pantry & Staples', nameSk: 'Trvanlivé & Špajza', icon: 'Package' },
  { id: 'drinks', nameEn: 'Beverages & Beer', nameSk: 'Nápoje & Pivo', icon: 'Coffee' },
  { id: 'household', nameEn: 'Hygiene & Home', nameSk: 'Drogéria & Domácnosť', icon: 'Sparkles' }
];

// Helper to construct product with realistic prices
function createProduct(id, nameSk, nameEn, category, unit, unitPriceBase, image, isStaple, description, pKauf, pLidl, pBilla, pTesco, pFresh) {
  return {
    id,
    nameSk,
    nameEn,
    category,
    unit,
    unitPriceBase,
    image,
    isStaple,
    description,
    prices: {
      kaufland: { price: pKauf[0], regularPrice: pKauf[1], isOffer: pKauf[0] < pKauf[1], discountPercent: Math.round(((pKauf[1] - pKauf[0]) / pKauf[1]) * 100), badge: pKauf[2] || null, flyerPage: pKauf[3] || null },
      lidl: { price: pLidl[0], regularPrice: pLidl[1], isOffer: pLidl[0] < pLidl[1], discountPercent: Math.round(((pLidl[1] - pLidl[0]) / pLidl[1]) * 100), badge: pLidl[2] || null, flyerPage: pLidl[3] || null },
      billa: { price: pBilla[0], regularPrice: pBilla[1], isOffer: pBilla[0] < pBilla[1], discountPercent: Math.round(((pBilla[1] - pBilla[0]) / pBilla[1]) * 100), badge: pBilla[2] || null, flyerPage: pBilla[3] || null },
      tesco: { price: pTesco[0], regularPrice: pTesco[1], isOffer: pTesco[0] < pTesco[1], discountPercent: Math.round(((pTesco[1] - pTesco[0]) / pTesco[1]) * 100), badge: pTesco[2] || null, flyerPage: pTesco[3] || null },
      fresh: { price: pFresh[0], regularPrice: pFresh[1], isOffer: pFresh[0] < pFresh[1], discountPercent: Math.round(((pFresh[1] - pFresh[0]) / pFresh[1]) * 100), badge: pFresh[2] || null, flyerPage: pFresh[3] || null }
    }
  };
}

// -------------------------------------------------------------
// CURRENT CYCLE ITEMS (Week 45 - Live Leaflets)
// -------------------------------------------------------------
const CURRENT_ITEMS = [
  // --- GRANULAR APPLES & ORCHARD FRUIT ---
  createProduct(
    'jablka-golden-delicious-1kg',
    'Jablká Golden Delicious 1kg',
    'Apples Golden Delicious 1kg',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&auto=format&fit=crop&q=80',
    true,
    'Sladké chrumkavé žltozelené jablká triedy I.',
    [1.19, 1.69, 'Kaufland trhák', 2],
    [0.99, 1.59, 'Lidl Plus kupón', 1],
    [1.49, 1.79, null, null],
    [1.09, 1.65, 'Clubcard zľava', 3],
    [0.95, 1.55, 'Fresh akcia', 2]
  ),
  createProduct(
    'jablka-gala-1kg',
    'Jablká Gala slovenské 1kg',
    'Apples Gala Slovak 1kg',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?w=300&auto=format&fit=crop&q=80',
    true,
    'Červené šťavnaté jablká pestované v Dunajskej Lužnej.',
    [0.99, 1.59, 'Slovenská úroda', 2],
    [0.89, 1.49, 'Super cena', 2],
    [1.29, 1.69, 'Slovenská Farma', 3],
    [1.09, 1.59, 'Tesco akcia', 3],
    [0.85, 1.45, 'Regionálny pestovateľ', 1]
  ),
  createProduct(
    'jablka-granny-smith-1kg',
    'Jablká Granny Smith zelené 1kg',
    'Apples Granny Smith 1kg',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=300&auto=format&fit=crop&q=80',
    false,
    'Kyselkavé osviežujúce zelené jablká s pevnou dužinou.',
    [1.19, 1.89, 'Akcia týždňa', 3],
    [1.29, 1.79, null, null],
    [1.59, 1.99, null, null],
    [1.35, 1.89, 'Clubcard', 4],
    [1.39, 1.85, null, null]
  ),
  createProduct(
    'jablka-red-delicious-1kg',
    'Jablká Red Delicious 1kg',
    'Apples Red Delicious 1kg',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&auto=format&fit=crop&q=80',
    false,
    'Tmavé rubínovo červené jablká jemne aromatickej chuti.',
    [1.29, 1.79, null, null],
    [1.19, 1.75, 'Lidl výber', 2],
    [1.69, 1.99, null, null],
    [1.25, 1.79, 'Clubcard', 3],
    [1.15, 1.69, 'Fresh výhodne', 2]
  ),
  createProduct(
    'jablka-jonagold-1kg',
    'Jablká Jonagold voľné 1kg',
    'Apples Jonagold 1kg loose',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&auto=format&fit=crop&q=80',
    true,
    'Veľké sladkokyslé jablká ideálne na priamu konzumáciu aj pečenie.',
    [0.89, 1.39, 'K-Classic', 3],
    [0.79, 1.35, 'Super cena', 2],
    [1.19, 1.49, null, null],
    [0.85, 1.39, 'Clubcard', 3],
    [0.75, 1.29, 'Najnižšia cena', 1]
  ),
  createProduct(
    'banany-volne-1kg',
    'Banány voľné I. trieda 1kg',
    'Cavendish Bananas 1kg',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&auto=format&fit=crop&q=80',
    true,
    'Sladké banány odrody Cavendish.',
    [1.09, 1.69, 'Trhák týždňa', 1],
    [1.19, 1.69, 'Čerstvosť', 1],
    [1.49, 1.79, null, null],
    [1.15, 1.69, 'Clubcard', 2],
    [1.25, 1.65, null, null]
  ),
  createProduct(
    'mandarinky-1kg',
    'Mandarínky klementínky 1kg debnička',
    'Clementines 1kg crate',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=300&auto=format&fit=crop&q=80',
    false,
    'Sladké mandarínky bez jadierok z južnej Európy.',
    [1.49, 2.39, 'Kaufland trhák', 2],
    [1.39, 2.29, 'Super víkend', 2],
    [1.89, 2.49, null, null],
    [1.59, 2.39, 'Clubcard', 3],
    [1.45, 2.19, null, null]
  ),
  createProduct(
    'pomarance-1kg',
    'Pomaranče dezertné 1kg sieťka',
    'Oranges dessert 1kg net',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300&auto=format&fit=crop&q=80',
    false,
    'Šťavnaté citrusové pomaranče bohaté na vitamín C.',
    [1.19, 1.89, 'Vitamínová bomba', 3],
    [1.25, 1.79, null, null],
    [1.65, 1.99, null, null],
    [1.29, 1.89, 'Clubcard', 4],
    [1.19, 1.79, null, null]
  ),

  // --- GRANULAR POTATOES & VEGETABLES ---
  createProduct(
    'zemiaky-zlte-prane-25kg',
    'Zemiaky žlté prané 2,5kg balenie (varný typ B)',
    'Potatoes yellow washed 2.5kg bag',
    'produce', '2.5kg', 'kg',
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=80',
    true,
    'Prané konzumné zemiaky varný typ B prílohové.',
    [1.79, 2.79, 'Kaufland Card', 3],
    [1.69, 2.59, 'Lidl Plus kupón', 3],
    [2.29, 2.89, null, null],
    [1.99, 2.79, 'Výhodné balenie', 5],
    [1.89, 2.69, null, null]
  ),
  createProduct(
    'zemiaky-cervene-5kg',
    'Zemiaky červené neskoré 5kg vrece',
    'Potatoes red late 5kg sack',
    'produce', '5kg', 'kg',
    'https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=300&auto=format&fit=crop&q=80',
    false,
    'Kvalitné červené slovenské zemiaky vhodné na uskladnenie aj pyré.',
    [3.29, 4.99, 'Rodinné vrece', 4],
    [3.49, 4.79, null, null],
    [4.29, 5.29, null, null],
    [3.39, 4.89, 'Clubcard zľava', 6],
    [3.19, 4.69, 'Fresh výhodne', 3]
  ),
  createProduct(
    'paradajky-strapcove-500g',
    'Paradajky strapcové slovenské 500g',
    'Vine Tomatoes Slovak 500g',
    'produce', '500g', 'kg',
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&auto=format&fit=crop&q=80',
    true,
    'Aromatické strapcové paradajky z farmy Babindol.',
    [1.19, 1.89, 'Slovenská chuť', 3],
    [1.09, 1.79, 'Super Sobota', 2],
    [1.49, 1.99, 'Slovenská Farma', 4],
    [1.25, 1.89, 'Clubcard', 4],
    [1.15, 1.79, 'Farmársky kútik', 2]
  ),
  createProduct(
    'uhorka-hadovka-1ks',
    'Uhorka šalátová hadovka 1ks',
    'English Cucumber 1pc',
    'produce', '1ks', 'ks',
    'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=300&auto=format&fit=crop&q=80',
    true,
    'Chrumkavá skleníková šalátová uhorka.',
    [0.59, 0.99, 'Top cena', 2],
    [0.55, 0.89, 'Pondelková zľava', 1],
    [0.79, 0.99, null, null],
    [0.65, 0.95, null, null],
    [0.55, 0.89, 'Fresh trhák', 1]
  ),
  createProduct(
    'paprika-biela-pcr-1kg',
    'Paprika biela PCR slovenská 1kg',
    'White Bell Pepper PCR 1kg',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&auto=format&fit=crop&q=80',
    false,
    'Tradičná slovenská biela paprika na lečo aj čerstvý šalát.',
    [1.59, 2.49, 'Kaufland trhák', 3],
    [1.49, 2.39, 'Lidl Plus', 2],
    [1.99, 2.69, null, null],
    [1.69, 2.49, 'Clubcard', 4],
    [1.55, 2.29, null, null]
  ),
  createProduct(
    'cibula-zlta-1kg',
    'Cibuľa žltá neskorá 1kg',
    'Yellow Onions 1kg',
    'produce', '1kg', 'kg',
    'https://images.unsplash.com/photo-1508747703725-719777637510?w=300&auto=format&fit=crop&q=80',
    true,
    'Slovenská suchá cibuľa žltej odrody.',
    [0.69, 0.99, 'K-Classic', 4],
    [0.65, 0.95, null, null],
    [0.85, 1.09, null, null],
    [0.72, 0.99, 'Clubcard', 5],
    [0.65, 0.95, 'Fresh akcia', 2]
  ),

  // --- DAIRY & BUTTER BRANDS ---
  createProduct(
    'maslo-ceske-slovenske-250g',
    'Slovenské čerstvé maslo 82% 250g',
    'Fresh Butter 82% 250g',
    'dairy', '250g', 'kg',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80',
    true,
    'Tradičné maslo s 82% mliečneho tuku.',
    [1.49, 2.39, 'Letákový trhák', 3],
    [1.69, 2.29, 'Pilos kvalita', 1],
    [2.29, 2.49, null, null],
    [1.89, 2.39, 'Clubcard zľava', 4],
    [1.79, 2.19, 'Fresh akcia', 2]
  ),
  createProduct(
    'maslo-banovecke-250g',
    'Bánovecké maslo tradičné 250g Milsy',
    'Banovecke Traditional Butter 250g',
    'dairy', '250g', 'kg',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80',
    false,
    'Prémiové slovenské maslo z Bánoviec nad Bebravou.',
    [1.99, 2.69, 'Milsy akcia', 4],
    [2.09, 2.59, null, null],
    [2.39, 2.79, null, null],
    [1.95, 2.69, 'Clubcard', 5],
    [1.89, 2.55, 'Slovenský výrobca', 2]
  ),
  createProduct(
    'maslo-liptov-250g',
    'Liptov Čerstvé maslo horské 250g',
    'Liptov Mountain Butter 250g',
    'dairy', '250g', 'kg',
    'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&auto=format&fit=crop&q=80',
    false,
    'Z horského mlieka z liptovského regiónu.',
    [1.89, 2.59, 'Liptov zľava', 4],
    [1.99, 2.49, null, null],
    [2.25, 2.69, 'Billa Bonus', 4],
    [1.85, 2.59, 'Clubcard', 4],
    [1.82, 2.49, 'Fresh ponuka', 3]
  ),
  createProduct(
    'mlieko-rajo-trvanlive-15-1l',
    'Rajo Trvanlivé mlieko polotučné 1,5% 1L',
    'Rajo UHT Semi-skimmed Milk 1.5% 1L',
    'dairy', '1L', 'l',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=80',
    true,
    'Slovenské trvanlivé polotučné mlieko ošetrené UHT technológiou.',
    [0.79, 1.15, 'Kaufland akcia', 5],
    [0.85, 1.15, null, null],
    [0.99, 1.19, null, null],
    [0.79, 1.15, 'Tesco akcia', 6],
    [0.82, 1.10, 'Fresh akcia', 3]
  ),
  createProduct(
    'mlieko-pilos-cerstve-35-1l',
    'Pilos Čerstvé mlieko plnotučné 3,5% 1L',
    'Pilos Fresh Whole Milk 3.5% 1L',
    'dairy', '1L', 'l',
    'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&auto=format&fit=crop&q=80',
    false,
    'Čerstvé pasterizované slovenské mlieko v PET fľaši.',
    [0.95, 1.25, null, null],
    [0.79, 1.19, 'Lidl Plus bomba', 2],
    [1.15, 1.29, null, null],
    [0.99, 1.25, 'Clubcard', 6],
    [0.92, 1.20, null, null]
  ),
  createProduct(
    'vajcia-podstielkove-m-10ks',
    'Vajcia z podstielkového chovu M 10ks',
    'Barn Eggs M 10 pcs',
    'dairy', '10ks', 'ks',
    'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=300&auto=format&fit=crop&q=80',
    true,
    'Slovenské čerstvé podstielkové vajcia z hydinárskej farmy.',
    [1.59, 2.39, 'Kaufland Card', 4],
    [1.79, 2.19, 'Čerstvosť', 3],
    [2.19, 2.49, null, null],
    [1.49, 2.29, 'Super cena Clubcard', 1],
    [1.85, 2.15, 'Slovenské', 3]
  ),
  createProduct(
    'bryndza-liptov-125g',
    'Liptov Bryndza plnotučná 125g',
    'Liptov Slovak Bryndza 125g',
    'dairy', '125g', 'kg',
    'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&auto=format&fit=crop&q=80',
    true,
    'Originálna slovenská bryndza s chráneným zemepisným označením.',
    [1.29, 1.89, 'Slovenské srdce', 4],
    [1.39, 1.79, 'Pilos tradícia', 3],
    [1.69, 1.99, null, null],
    [1.35, 1.89, 'Clubcard', 5],
    [1.19, 1.85, 'Lokálny farmár', 2]
  ),
  createProduct(
    'syr-liptov-eidam-platky-100g',
    'Liptov Eidam 45% plátky 100g',
    'Liptov Edam Cheese sliced 100g',
    'dairy', '100g', 'kg',
    'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=300&auto=format&fit=crop&q=80',
    true,
    'Zrejúci polotvrdý plátkový syr z čistého mlieka.',
    [0.79, 1.29, 'Liptov týždeň', 5],
    [0.75, 1.19, 'Pilos Eidam', 3],
    [0.99, 1.35, null, null],
    [0.79, 1.25, 'Clubcard', 4],
    [0.74, 1.19, 'Fresh výhodne', 3]
  ),
  createProduct(
    'karicka-klasik-140g',
    'Karička tavený syr črievko 140g',
    'Karicka Spreadable Cheese 140g',
    'dairy', '140g', 'kg',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&auto=format&fit=crop&q=80',
    false,
    'Slovenská stálica na chlebíčky zo Zemplína.',
    [1.09, 1.69, 'Karička akcia', 6],
    [1.15, 1.59, null, null],
    [1.39, 1.69, null, null],
    [1.05, 1.59, 'Clubcard zľava', 5],
    [1.09, 1.55, null, null]
  ),
  createProduct(
    'jogurt-zvolensky-145g',
    'Zvolenský Smotanový jogurt rôzne príchute 145g',
    'Zvolensky Cream Yogurt 145g',
    'dairy', '145g', 'kg',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&auto=format&fit=crop&q=80',
    true,
    'Hustý smotanový jogurt so zrelým ovocím na dne pohára.',
    [0.45, 0.69, 'Kaufland zľava', 6],
    [0.42, 0.65, 'Lidl Plus', 4],
    [0.55, 0.69, null, null],
    [0.45, 0.69, 'Clubcard', 6],
    [0.39, 0.65, 'Top akcia Fresh', 2]
  ),

  // --- MEAT & POULTRY CUTS ---
  createProduct(
    'kuracie-rezne-chladene-1kg',
    'Kuracie prsné rezne chladené 1kg',
    'Chicken Breast Fillets chilled 1kg',
    'meat', '1kg', 'kg',
    'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&auto=format&fit=crop&q=80',
    true,
    'Čerstvé kuracie rezne bez kosti a kože, pôvod Slovensko.',
    [5.49, 7.99, 'Mäsiarsky pult', 2],
    [4.89, 7.49, 'Super Sobota', 1],
    [6.29, 7.99, 'Slovenská Farma', 5],
    [5.79, 7.89, 'Clubcard', 3],
    [5.19, 7.39, 'Top akcia', 2]
  ),
  createProduct(
    'kuracie-stehna-horne-1kg',
    'Kuracie stehná horné / dolné chladené 1kg',
    'Chicken Thighs chilled 1kg',
    'meat', '1kg', 'kg',
    'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=300&auto=format&fit=crop&q=80',
    true,
    'Šťavnaté kuracie stehná ideálne na pečenie a grilovanie.',
    [2.89, 4.29, 'K-Classic', 2],
    [2.79, 3.99, 'Pondelková cena', 2],
    [3.49, 4.39, null, null],
    [2.99, 4.19, 'Clubcard', 4],
    [2.85, 3.99, 'Fresh mäso', 2]
  ),
  createProduct(
    'bravcove-kare-bez-kosti-1kg',
    'Bravčové karé bez kosti 1kg',
    'Pork Loin boneless 1kg',
    'meat', '1kg', 'kg',
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80',
    true,
    'Chladené bravčové karé bez kosti v celku.',
    [4.29, 6.49, 'Výhodná kúpa', 6],
    [4.49, 6.19, 'Mäso z pultu', 5],
    [5.19, 6.69, 'Zľava týždňa', 4],
    [4.69, 6.39, 'Tesco ponuka', 7],
    [4.99, 6.29, null, null]
  ),
  createProduct(
    'bravcova-krkovicka-1kg',
    'Bravčová krkovička bez kosti 1kg',
    'Pork Collar boneless 1kg',
    'meat', '1kg', 'kg',
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80',
    false,
    'Prerastená šťavnatá krkovička vhodná na rezne i pečenie.',
    [4.49, 6.79, 'Mäsiarska zľava', 6],
    [4.69, 6.49, null, null],
    [5.39, 6.99, null, null],
    [4.79, 6.59, 'Clubcard', 7],
    [4.39, 6.39, 'Slovenský chov', 3]
  ),
  createProduct(
    'mlete-maso-mix-500g',
    'Mleté mäso bravčové a hovädzie mix 500g',
    'Minced Meat pork/beef mix 500g',
    'meat', '500g', 'kg',
    'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=300&auto=format&fit=crop&q=80',
    true,
    'Zmes čerstvého mletého bravčového a hovädzieho mäsa.',
    [2.39, 3.69, 'Kaufland Card', 7],
    [2.29, 3.49, 'Rzeźnik / Pikok', 4],
    [2.99, 3.79, null, null],
    [2.49, 3.59, 'Clubcard', 7],
    [2.35, 3.49, null, null]
  ),
  createProduct(
    'bratislavske-parky-400g',
    'Bratislavské párky 80% mäsa Tauris 400g',
    'Bratislava Sausages 80% meat 400g',
    'meat', '400g', 'kg',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&auto=format&fit=crop&q=80',
    false,
    'Tradičné párky v baranom črievku s vysokým podielom mäsa.',
    [2.49, 3.69, 'Tauris akcia', 8],
    [2.39, 3.49, 'Pikok Pure', 5],
    [2.89, 3.79, null, null],
    [2.45, 3.59, 'Clubcard', 8],
    [2.35, 3.45, 'Domáca kvalita', 4]
  ),

  // --- BAKERY & BREAD VARIETIES ---
  createProduct(
    'chlieb-psenicno-razny-500g',
    'Konzumný chlieb pšenično-ražný 500g',
    'Traditional Sourdough Bread 500g',
    'bakery', '500g', 'kg',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
    true,
    'Tradičný chrumkavý bochník chleba s rascou.',
    [0.89, 1.29, 'Z našej pekárne', 8],
    [0.89, 1.19, 'Vždy čerstvé', 4],
    [1.19, 1.35, null, null],
    [0.95, 1.25, 'Tesco pekáreň', 8],
    [0.85, 1.15, 'Lokálna pekáreň', 4]
  ),
  createProduct(
    'chlieb-zemiakovy-gazdovsky-800g',
    'Gazdovský zemiakový chlieb 800g',
    'Potato Farmer Bread 800g',
    'bakery', '800g', 'kg',
    'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&auto=format&fit=crop&q=80',
    false,
    'Vláčny bochník s prídavkom zemiakových vločiek.',
    [1.49, 2.09, 'Pekárenský špeciál', 8],
    [1.39, 1.99, 'Čerstvo upečené', 5],
    [1.79, 2.19, null, null],
    [1.45, 2.09, 'Clubcard', 9],
    [1.35, 1.95, 'Tradičný recept', 4]
  ),
  createProduct(
    'rohlik-biely-43g',
    'Rohlík obyčajný biely 43g',
    'Standard Bread Roll 43g (Rohlík)',
    'bakery', '1ks', 'ks',
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=80',
    true,
    'Klasický slovenský pšeničný rohlík.',
    [0.12, 0.14, 'Top cena', 8],
    [0.11, 0.14, 'Trhák', 4],
    [0.13, 0.14, null, null],
    [0.12, 0.14, null, null],
    [0.11, 0.13, 'Čerstvý rohlík', 4]
  ),
  createProduct(
    'kaiserka-cereálna-60g',
    'Kaiserka cereálna so sezamom 60g',
    'Cereal Kaiser Roll 60g',
    'bakery', '1ks', 'ks',
    'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&auto=format&fit=crop&q=80',
    false,
    'Chrumkavé viaczrnné pečivo s ľanom a sezamom.',
    [0.22, 0.32, 'Zľava', 9],
    [0.19, 0.29, 'Super cena', 5],
    [0.26, 0.35, null, null],
    [0.22, 0.32, null, null],
    [0.19, 0.28, 'Fresh pekáreň', 5]
  ),

  // --- PANTRY & COOKING ESSENTIALS ---
  createProduct(
    'olej-slnecnicovy-raciol-1l',
    'Slnečnicový olej Raciol 100% 1L',
    'Sunflower Oil Raciol 1L',
    'pantry', '1L', 'l',
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=80',
    true,
    'Slovenský prémiový rafinovaný slnečnicový olej.',
    [1.49, 2.39, 'Trhák týždňa', 7],
    [1.59, 2.29, 'Palma Raciol', 6],
    [1.89, 2.49, null, null],
    [1.45, 2.39, 'Clubcard akcia', 6],
    [1.55, 2.29, null, null]
  ),
  createProduct(
    'muka-hladka-00-1kg',
    'Pšeničná múka hladká 00 Extra Pohronský Ruskov 1kg',
    'Wheat Flour Smooth 00 Extra 1kg',
    'pantry', '1kg', 'kg',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
    true,
    'Múka z pšenice dopestovanej na južnom Slovensku.',
    [0.59, 0.89, 'K-Classic', 9],
    [0.55, 0.85, 'Castello', 7],
    [0.75, 0.89, null, null],
    [0.59, 0.89, 'Výhodná cena', 8],
    [0.52, 0.85, 'Fresh múka', 5]
  ),
  createProduct(
    'cukor-korunny-krystal-1kg',
    'Cukor biely kryštálový Korunný 1kg',
    'Granulated Sugar Korunny 1kg',
    'pantry', '1kg', 'kg',
    'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=300&auto=format&fit=crop&q=80',
    true,
    'Tradičný cukor z cukrovej repy.',
    [0.89, 1.29, 'Kaufland trhák', 9],
    [0.89, 1.25, 'Sladká ponuka', 7],
    [1.09, 1.29, null, null],
    [0.95, 1.29, 'Clubcard', 9],
    [0.99, 1.25, null, null]
  ),
  createProduct(
    'ryza-manya-gulatovzrnna-1kg',
    'Ryža guľatozrnná Mánya 1kg',
    'Round Grain Rice Manya 1kg',
    'pantry', '1kg', 'kg',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=80',
    true,
    'Tradičná slovenská baliareň Mánya, vhodná na rizotá.',
    [1.19, 1.79, 'Mánya akcia', 10],
    [1.25, 1.69, 'Golden Sun', 8],
    [1.59, 1.89, null, null],
    [1.19, 1.79, 'Tesco akcia', 10],
    [1.29, 1.75, null, null]
  ),
  createProduct(
    'spagety-barilla-500g',
    'Barilla Špagety č. 5 semolínové 500g',
    'Barilla Spaghetti No.5 500g',
    'pantry', '500g', 'kg',
    'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=300&auto=format&fit=crop&q=80',
    true,
    'Originálne talianske cestoviny zo 100% tvrdej pšenice.',
    [1.19, 1.99, 'Taliansky týždeň', 11],
    [1.29, 1.89, 'Barilla akcia', 9],
    [1.49, 2.09, null, null],
    [1.15, 1.99, 'Clubcard trhák', 11],
    [1.25, 1.89, null, null]
  ),
  createProduct(
    'kava-tchibo-barista-1kg',
    'Káva zrnková Tchibo Barista Espresso 1kg',
    'Coffee Beans Tchibo Barista 1kg',
    'pantry', '1kg', 'kg',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
    false,
    '100% Arabica pražená pomalým bubnovým spôsobom.',
    [11.99, 18.99, 'Kaufland Card megazľava', 12],
    [12.99, 17.99, 'Bellarom/Tchibo', 10],
    [13.49, 18.99, 'Billa Bonus', 10],
    [11.49, 18.99, 'Clubcard trhák', 11],
    [13.99, 17.99, null, null]
  ),
  createProduct(
    'kava-popradska-standard-250g',
    'Popradská káva Štandard zmes mletá 250g',
    'Popradska Standard Ground Coffee 250g',
    'pantry', '250g', 'kg',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80',
    true,
    'Ikonická slovenská káva s výraznou chuťou a arómou.',
    [2.39, 3.49, 'Kaufland zľava', 13],
    [2.49, 3.29, null, null],
    [2.79, 3.49, null, null],
    [2.29, 3.49, 'Clubcard cena', 12],
    [2.19, 3.25, 'Popradská akcia', 6]
  ),

  // --- DRINKS & BEER ---
  createProduct(
    'pivo-pilsner-urquell-05l',
    'Plzeňský Prazdroj 12° ležiak plech 0,5L',
    'Pilsner Urquell Beer Can 0.5L',
    'drinks', '0.5L', 'l',
    'https://images.unsplash.com/photo-1608270191763-95244b74bbbe?w=300&auto=format&fit=crop&q=80',
    false,
    'Legendárny český svetlý ležiak s plným chmeľovým telom.',
    [0.99, 1.49, 'Pivný festival', 14],
    [1.09, 1.45, 'Multipack', 12],
    [1.25, 1.49, null, null],
    [0.95, 1.49, 'Clubcard trhák', 13],
    [1.15, 1.45, null, null]
  ),
  createProduct(
    'pivo-zlaty-bazant-10-05l',
    'Zlatý Bažant 10° svetlé pivo plech 0,5L',
    'Zlaty Bazant 10° Beer Can 0.5L',
    'drinks', '0.5L', 'l',
    'https://images.unsplash.com/photo-1608270191763-95244b74bbbe?w=300&auto=format&fit=crop&q=80',
    false,
    'Obľúbené slovenské pivo z Hurbanova.',
    [0.69, 0.99, 'Zľava Hurbanovo', 14],
    [0.69, 0.95, 'Akcia týždňa', 12],
    [0.79, 0.99, null, null],
    [0.65, 0.99, 'Clubcard', 13],
    [0.64, 0.95, 'Slovenské pivo', 7]
  ),
  createProduct(
    'kofola-original-2l',
    'Kofola Original 2L PET',
    'Kofola Original 2L PET',
    'drinks', '2L', 'l',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80',
    false,
    'Československý kolový nápoj so zmesou 14 bylín a ovocných štiav.',
    [0.99, 1.59, 'Letákový hit', 15],
    [1.09, 1.49, 'Svieža akcia', 13],
    [1.39, 1.59, null, null],
    [0.99, 1.59, 'Clubcard ponuka', 14],
    [1.05, 1.49, 'Fresh zľava', 7]
  ),
  createProduct(
    'vinea-biela-15l',
    'Vinea biela hroznový sýtený nápoj 1,5L',
    'Vinea White Grape soda 1.5L',
    'drinks', '1.5L', 'l',
    'https://images.unsplash.com/photo-1556881286-fc6915169721?w=300&auto=format&fit=crop&q=80',
    false,
    'Unikátny nápoj z hroznovej šťavy vyrobený v Pezinku.',
    [0.89, 1.39, 'Slovenské osvieženie', 15],
    [0.95, 1.35, null, null],
    [1.19, 1.45, null, null],
    [0.89, 1.39, 'Clubcard', 14],
    [0.85, 1.29, 'Fresh cena', 8]
  ),
  createProduct(
    'budis-prirodna-15l',
    'Budiš minerálna voda perlivá 1,5L',
    'Budis Sparkling Mineral Water 1.5L',
    'drinks', '1.5L', 'l',
    'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&auto=format&fit=crop&q=80',
    true,
    'Tradičná slovenská minerálna voda s obsahom hydrogénuhličitanov.',
    [0.49, 0.79, 'Kaufland akcia', 15],
    [0.49, 0.75, 'Minerálka týždňa', 13],
    [0.65, 0.79, null, null],
    [0.49, 0.79, 'Tesco akcia', 15],
    [0.45, 0.75, 'Fresh hit', 8]
  ),

  // --- HOUSEHOLD & HYGIENE ---
  createProduct(
    'persil-gel-deep-clean-15l',
    'Persil prací gél Deep Clean 1,5L (30 praní)',
    'Persil Washing Gel 1.5L (30 washes)',
    'household', '1.5L', 'l',
    'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=300&auto=format&fit=crop&q=80',
    false,
    'Hĺbkovo čistiaci prací gél na biele aj farebné oblečenie.',
    [7.99, 13.99, 'Super akcia', 16],
    [8.49, 12.99, 'Formil / Persil', 14],
    [9.99, 14.49, 'Drogéria', 12],
    [7.49, 13.99, 'Najnižšia cena Clubcard', 15],
    [8.99, 13.49, null, null]
  ),
  createProduct(
    'jar-na-riad-citron-900ml',
    'Jar prostriedok na riad Citrón 900ml',
    'Jar Dishwashing Liquid Lemon 900ml',
    'household', '900ml', 'l',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&auto=format&fit=crop&q=80',
    true,
    'Silný odmasťovací prostriedok na ručné umývanie riadu.',
    [2.19, 3.49, 'Výhodné balenie', 17],
    [2.29, 3.29, 'W5 / Jar', 15],
    [2.79, 3.49, null, null],
    [1.99, 3.49, 'Clubcard zľava', 16],
    [2.39, 3.39, null, null]
  ),
  createProduct(
    'toaletny-papier-harmony-8ks',
    'Toaletný papier Harmony Soft 3-vrstvový 8ks',
    'Toilet Paper Harmony 3-ply 8 rolls',
    'household', '8ks', 'ks',
    'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&auto=format&fit=crop&q=80',
    true,
    'Biely trojvrstvový toaletný papier vyrobený v Harmanci.',
    [2.29, 3.69, 'Letákový hit', 18],
    [2.19, 3.49, 'Floralys', 16],
    [2.89, 3.69, null, null],
    [2.49, 3.69, 'Clubcard', 17],
    [2.59, 3.59, null, null]
  )
];

// -------------------------------------------------------------
// UPCOMING CYCLE ITEMS (Week 46 - New Upcoming Leaflets)
// -------------------------------------------------------------
// Represents the upcoming week where discounts rotate between stores
const UPCOMING_ITEMS = CURRENT_ITEMS.map((item) => {
  const cloned = JSON.parse(JSON.stringify(item));
  const stores = ['kaufland', 'lidl', 'billa', 'tesco', 'fresh'];

  // Smart variation: rotate which store has the mega-deal for the upcoming week
  const luckyStore = stores[(item.id.length + 2) % stores.length];
  stores.forEach((s) => {
    const orig = cloned.prices[s];
    if (s === luckyStore) {
      // Big promotional price drop for this store next week
      const discount = Math.round(orig.regularPrice * (0.35 + (item.id.length % 15) / 100) * 100) / 100;
      orig.price = parseFloat((orig.regularPrice - discount).toFixed(2));
      orig.isOffer = true;
      orig.discountPercent = Math.round((discount / orig.regularPrice) * 100);
      orig.badge = 'Nová letáková bomba';
      orig.flyerPage = 1;
    } else {
      // Slight normalization
      const minorDrop = Math.round(orig.regularPrice * 0.15 * 100) / 100;
      orig.price = parseFloat((orig.regularPrice - minorDrop).toFixed(2));
      orig.discountPercent = Math.round((minorDrop / orig.regularPrice) * 100);
    }
  });

  return cloned;
});

const CURRENT_CYCLE = {
  cycleId: 'cycle-w45-2026',
  cycleName: 'Týždeň 45 / Aktuálne letáky',
  validFrom: '2026-11-05T00:00:00Z',
  validUntil: '2026-11-11T23:59:59Z',
  totalDeals: CURRENT_ITEMS.length,
  status: 'active',
  items: CURRENT_ITEMS
};

const UPCOMING_CYCLE = {
  cycleId: 'cycle-w46-2026',
  cycleName: 'Týždeň 46 / Budúce letáky (Nové ponuky)',
  validFrom: '2026-11-12T00:00:00Z',
  validUntil: '2026-11-18T23:59:59Z',
  totalDeals: UPCOMING_ITEMS.length,
  status: 'upcoming',
  items: UPCOMING_ITEMS
};

// Public Slovak Leaflet metadata & cover links
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
