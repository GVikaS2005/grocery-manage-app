import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Car, 
  Footprints, 
  ExternalLink, 
  ShoppingBag, 
  Sparkles,
  Building2,
  CheckCircle2,
  Search
} from 'lucide-react';

const facilityTranslations = {
  'Veľké parkovisko': { sk: 'Veľké parkovisko', en: 'Large Parking Lot' },
  'Čerstvá pekáreň': { sk: 'Čerstvá pekáreň', en: 'In-store Bakery' },
  'Zálohomat fliaš': { sk: 'Zálohomat fliaš', en: 'Bottle Deposit Return' },
  'Nabíjacia stanica EV': { sk: 'Nabíjacia stanica EV', en: 'EV Charging Station' },
  'Podzemné parkovisko': { sk: 'Podzemné parkovisko', en: 'Underground Parking' },
  'Mäsiarstvo': { sk: 'Mäsiarstvo', en: 'Butcher Counter' },
  'Zálohomat': { sk: 'Zálohomat', en: 'Bottle Return' },
  'Lekáreň': { sk: 'Lekáreň', en: 'Pharmacy' },
  'Vlastné parkovisko': { sk: 'Vlastné parkovisko', en: 'Dedicated Parking' },
  'Pekáreň Chrumkavé pečivo': { sk: 'Pekáreň Chrumkavé pečivo', en: 'Fresh Bakery' },
  'Lidl Plus kupóny': { sk: 'Lidl Plus kupóny', en: 'Lidl Plus Coupons' },
  'Parkovanie 90 min zadarmo': { sk: 'Parkovanie 90 min zadarmo', en: '90 Min Free Parking' },
  'Pekáreň': { sk: 'Pekáreň', en: 'Bakery' },
  'Samoobslužné pokladne': { sk: 'Samoobslužné pokladne', en: 'Self-checkout' },
  'Pult lahôdok': { sk: 'Pult lahôdok', en: 'Deli Counter' },
  'Teplý pult': { sk: 'Teplý pult', en: 'Hot Food Counter' },
  'Bio kútik': { sk: 'Bio kútik', en: 'Organic Corner' },
  'Parkovisko': { sk: 'Parkovisko', en: 'Parking Lot' },
  'Nákupné centrum Eurovea': { sk: 'Nákupné centrum Eurovea', en: 'Eurovea Mall' },
  'Veľký výber čerstvého sushi a šalátov': { sk: 'Veľký výber čerstvého sushi a šalátov', en: 'Fresh sushi & salad bar' },
  'Garážové parkovanie': { sk: 'Garážové parkovanie', en: 'Garage Parking' },
  'Otvorené od 06:00': { sk: 'Otvorené od 06:00', en: 'Open from 06:00' },
  'Čerpacia stanica Tesco': { sk: 'Čerpacia stanica Tesco', en: 'Tesco Petrol Station' },
  'Optika': { sk: 'Optika', en: 'Optics' },
  'Scan & Shop': { sk: 'Scan & Shop', en: 'Scan & Shop' },
  'Obrovské parkovisko': { sk: 'Obrovské parkovisko', en: 'Gigantic Parking Lot' },
  'Centrum mesta': { sk: 'Centrum mesta', en: 'City Center' },
  'Expresný nákup': { sk: 'Expresný nákup', en: 'Express shopping' },
  'Pešia dostupnosť': { sk: 'Pešia dostupnosť', en: 'Walkable distance' },
  'Bio & regionálne potraviny': { sk: 'Bio & regionálne potraviny', en: 'Organic & Regional Goods' },
  'Čerstvý chlieb': { sk: 'Čerstvý chlieb', en: 'Fresh Bread' },
  'Zálohovanie': { sk: 'Zálohovanie', en: 'Bottle Recycling' },
  'Garážové parkovanie zadarmo': { sk: 'Garážové parkovanie zadarmo', en: 'Free Garage Parking' },
  'Čerstvý pult': { sk: 'Čerstvý pult', en: 'Fresh Deli Counter' },
  'Nonstop čerpacia stanica': { sk: 'Nonstop čerpacia stanica', en: '24/7 Gas Station' },
  'Autoumyváreň': { sk: 'Autoumyváreň', en: 'Car Wash' }
};

export default function StoreLocator({
  storesData,
  selectedCity,
  setSelectedCity,
  cities,
  onUseGps,
  isDetectingLocation,
  t,
  lang
}) {
  const [chainFilter, setChainFilter] = useState('all');
  const [searchStore, setSearchStore] = useState('');

  const stores = storesData?.stores || [];
  const malls = storesData?.malls || [];
  const chains = storesData?.availableChains || [];

  const filteredStores = stores.filter((st) => {
    const matchesChain = chainFilter === 'all' || st.chainId === chainFilter;
    const matchesSearch =
      !searchStore ||
      st.name.toLowerCase().includes(searchStore.toLowerCase()) ||
      st.address.toLowerCase().includes(searchStore.toLowerCase());
    return matchesChain && matchesSearch;
  });

  const formatHours = (hoursStr) => {
    if (!hoursStr || lang === 'sk') return hoursStr;
    return hoursStr
      .replace(/Po - So:/g, 'Mon - Sat:')
      .replace(/Ne:/g, 'Sun:')
      .replace(/Po - Pia:/g, 'Mon - Fri:')
      .replace(/So:/g, 'Sat:')
      .replace(/Po - Ne:/g, 'Mon - Sun:');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Location Discovery */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.locBadge}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.storesTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              {t.storesSubtitle}
            </p>
          </div>

          {/* Location Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} {city.isCapital ? (lang === 'sk' ? '• Hlavné mesto' : '• Capital') : ''}
                </option>
              ))}
            </select>

            <button
              onClick={onUseGps}
              disabled={isDetectingLocation}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Navigation className={`w-3.5 h-3.5 text-emerald-400 ${isDetectingLocation ? 'animate-spin' : ''}`} />
              <span>{isDetectingLocation ? (lang === 'sk' ? 'Hľadám GPS...' : 'Locating GPS...') : t.useGps}</span>
            </button>
          </div>
        </div>

        {/* Chain quick filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-100 mt-6 scrollbar-none">
          <button
            onClick={() => setChainFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              chainFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.allStores} ({stores.length})
          </button>
          {chains.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setChainFilter(ch.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                chainFilter === ch.id
                  ? 'text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              style={{
                backgroundColor: chainFilter === ch.id ? ch.brandColor : undefined,
                borderColor: chainFilter === ch.id ? ch.brandColor : undefined
              }}
            >
              <span>{ch.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nearby Stores Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>{t.foundStores} ({filteredStores.length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.map((store) => {
            return (
              <div
                key={store.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Store Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span
                        className="text-[10px] font-extrabold px-2 py-0.5 rounded text-white inline-block mb-1 shadow-2xs"
                        style={{ backgroundColor: store.brandColor }}
                      >
                        {store.chainName}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">
                        {store.name}
                      </h4>
                    </div>

                    {/* Distance Badge */}
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-2.5 py-1 text-center shrink-0">
                      <span className="text-xs font-black font-mono block">
                        {store.distanceText}
                      </span>
                      <div className="flex items-center justify-center gap-1 text-[9px] text-emerald-600 font-semibold mt-0.5">
                        <Car className="w-2.5 h-2.5" />
                        <span>~{store.driveMinutes} min</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{store.address}</span>
                  </p>

                  {/* Hours */}
                  <div className="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{formatHours(store.openingHours)}</span>
                    </div>
                  </div>

                  {/* Facilities */}
                  {store.facilities && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {store.facilities.map((fac, idx) => {
                        const tr = facilityTranslations[fac];
                        const label = tr ? (lang === 'sk' ? tr.sk : tr.en) : fac;
                        return (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md"
                          >
                            ✓ {label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${store.name} ${store.address}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold text-center transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3 h-3 text-emerald-400" />
                    <span>{t.navigate}</span>
                  </a>

                  {store.flyerUrl && (
                    <a
                      href={store.flyerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.viewLeaflet}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shopping Malls Section */}
      {malls.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>{t.mallsTitle}</span>
            </h3>
            <span className="text-xs text-slate-500">
              {t.mallsDesc}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {malls.map((mall) => (
              <div
                key={mall.id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">{mall.name}</h4>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {mall.distanceText}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{mall.address}</p>
                  <div className="bg-white rounded-lg p-2 text-[11px] text-slate-700 font-medium border border-slate-200 mb-2">
                    🛒 {t.supermarketLabel} <span className="font-bold text-slate-900">{mall.supermarket}</span>
                  </div>
                </div>

                <a
                  href={mall.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mt-2"
                >
                  <span>{t.visitMallWeb}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
