import React, { useState } from 'react';
import { 
  Search, 
  Tag, 
  ShoppingCart, 
  Check, 
  Sparkles, 
  ArrowUpDown, 
  Percent, 
  Plus, 
  Minus,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';

export default function ComparisonMatrix({
  matrixData,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onlyOffers,
  setOnlyOffers,
  sortBy,
  setSortBy,
  basket,
  onAddToBasket,
  onRemoveFromBasket,
  onAddAllStaples,
  t,
  lang
}) {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const getBasketQty = (itemId) => {
    const found = basket.find((b) => b.itemId === itemId);
    return found ? found.quantity : 0;
  };

  const chainsList = [
    { id: 'kaufland', name: 'Kaufland', color: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'lidl', name: 'Lidl', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'billa', name: 'Billa', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { id: 'tesco', name: 'Tesco', color: 'bg-sky-50 text-sky-700 border-sky-200' },
    { id: 'fresh', name: 'FRESH', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ];

  return (
    <div className="space-y-6">
      {/* Search, Filter Bar & Quick Actions */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Only Offers Toggle */}
            <button
              onClick={() => setOnlyOffers(!onlyOffers)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                onlyOffers
                  ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.onlyOffers}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-700 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="discount">{t.sortByDiscount}</option>
                <option value="price-asc">{t.sortByPriceAsc}</option>
                <option value="price-desc">{t.sortByPriceDesc}</option>
                <option value="name">{t.sortByName}</option>
              </select>
            </div>

            {/* Add All Staples Button */}
            <button
              onClick={onAddAllStaples}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs shadow-emerald-600/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>{t.addAllStaples}</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lang === 'sk' ? cat.nameSk : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4 w-64">{t.tableProduct}</th>
                <th className="py-3 px-2 w-20 text-center">{t.tableUnit}</th>
                <th className="py-3 px-3 text-center border-l border-slate-100 text-red-700 bg-red-50/40">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                    <span>Kaufland</span>
                  </div>
                </th>
                <th className="py-3 px-3 text-center border-l border-slate-100 text-blue-700 bg-blue-50/40">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
                    <span>Lidl</span>
                  </div>
                </th>
                <th className="py-3 px-3 text-center border-l border-slate-100 text-amber-800 bg-amber-50/40">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                    <span>Billa</span>
                  </div>
                </th>
                <th className="py-3 px-3 text-center border-l border-slate-100 text-sky-700 bg-sky-50/40">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-600 inline-block"></span>
                    <span>Tesco</span>
                  </div>
                </th>
                <th className="py-3 px-3 text-center border-l border-slate-100 text-emerald-700 bg-emerald-50/40">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                    <span>FRESH</span>
                  </div>
                </th>
                <th className="py-3 px-4 border-l border-slate-200 bg-emerald-50/60 text-emerald-900 font-extrabold w-48 text-center">
                  {t.tableBestDeal}
                </th>
                <th className="py-3 px-4 text-center w-28">{t.tableAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {matrixData.map((item) => {
                const qtyInBasket = getBasketQty(item.id);
                const isStaple = item.isStaple;

                return (
                  <tr 
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                    onMouseEnter={() => setHoveredProduct(item.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Product Name & Image */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.nameSk}
                          className="w-11 h-11 object-cover rounded-xl border border-slate-200 shadow-2xs group-hover:scale-105 transition shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-slate-900 text-xs truncate">
                              {lang === 'sk' ? item.nameSk : item.nameEn}
                            </span>
                            {isStaple && (
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-amber-200 shrink-0">
                                ⭐ {t.stapleBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 capitalize block truncate">
                            {item.description || item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Unit */}
                    <td className="py-3 px-2 text-center text-slate-500 font-mono text-[11px]">
                      {item.unit}
                    </td>

                    {/* 5 Supermarket Columns: Kaufland, Lidl, Billa, Tesco, FRESH */}
                    {['kaufland', 'lidl', 'billa', 'tesco', 'fresh'].map((cId) => {
                      const p = item.prices[cId];
                      const isCheapestHere = item.lowestStore === cId;

                      if (!p) {
                        return (
                          <td key={cId} className="py-3 px-2 text-center text-slate-300 font-mono border-l border-slate-100">
                            —
                          </td>
                        );
                      }

                      return (
                        <td
                          key={cId}
                          className={`py-3 px-2 text-center border-l border-slate-100 transition-colors ${
                            isCheapestHere ? 'bg-emerald-50/50' : ''
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1">
                              <span
                                className={`font-extrabold font-mono text-sm ${
                                  isCheapestHere
                                    ? 'text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300 shadow-2xs'
                                    : p.isOffer
                                    ? 'text-slate-900'
                                    : 'text-slate-500'
                                }`}
                              >
                                {p.price.toFixed(2)} €
                              </span>
                            </div>

                            {p.isOffer && (
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="line-through text-[10px] text-slate-400 font-mono">
                                  {p.regularPrice.toFixed(2)}€
                                </span>
                                <span className="bg-rose-100 text-rose-700 font-bold text-[9px] px-1 rounded">
                                  -{p.discountPercent}%
                                </span>
                              </div>
                            )}

                            {p.badge && (
                              <span className="text-[9px] text-slate-500 font-medium truncate max-w-[90px] mt-0.5" title={p.badge}>
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}

                    {/* Best Deal Column */}
                    <td className="py-3 px-4 border-l border-slate-200 bg-emerald-50/40 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span 
                          className="px-2.5 py-0.5 rounded-full text-xs font-extrabold text-white shadow-2xs"
                          style={{ backgroundColor: item.lowestStoreBrandColor }}
                        >
                          {item.lowestStoreName}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="font-extrabold text-emerald-800 text-sm font-mono">
                            {item.lowestPrice.toFixed(2)} €
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 rounded">
                          {t.savings} {item.maxSavingsAmount.toFixed(2)} € (-{item.maxSavingsPercent}%)
                        </span>
                      </div>
                    </td>

                    {/* Basket Action Button */}
                    <td className="py-3 px-4 text-center">
                      {qtyInBasket > 0 ? (
                        <div className="flex items-center justify-center gap-1 bg-emerald-50 border border-emerald-300 rounded-xl p-1">
                          <button
                            onClick={() => onRemoveFromBasket(item.id)}
                            className="w-6 h-6 rounded-lg bg-white text-emerald-800 flex items-center justify-center hover:bg-emerald-100 transition shadow-2xs cursor-pointer font-bold"
                            title="Odobrať"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-xs text-emerald-900 w-5 text-center font-mono">
                            {qtyInBasket}
                          </span>
                          <button
                            onClick={() => onAddToBasket(item)}
                            className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition shadow-2xs cursor-pointer font-bold"
                            title="Pridať ďalší"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToBasket(item)}
                          className="flex items-center justify-center gap-1 w-full py-1.5 px-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.addToBasket}</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
