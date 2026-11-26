import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Check, 
  Calendar,
  Layers,
  Flame,
  Award,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WeeklySmartFlyer({
  matrixItems,
  basket,
  onAddToBasket,
  onRemoveFromBasket,
  lifecycle,
  t,
  lang
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const getBasketQty = (itemId) => {
    const found = basket.find((b) => b.itemId === itemId);
    return found ? found.quantity : 0;
  };

  // Filter items for each curated page of the flyer
  const getPageItems = () => {
    if (!matrixItems || matrixItems.length === 0) return [];

    switch (currentPage) {
      case 1:
        // Cover Megadeals: Top 6 highest discount staples across all stores
        return [...matrixItems]
          .sort((a, b) => b.maxSavingsPercent - a.maxSavingsPercent)
          .slice(0, 6);

      case 2:
        // Page 2: Fruits & Veg (Including all distinct Apple varieties & Potatoes)
        return matrixItems.filter((it) => it.category === 'produce');

      case 3:
        // Page 3: Fresh Meats, Poultry & Deli
        return matrixItems.filter((it) => it.category === 'meat');

      case 4:
        // Page 4: Dairy, Butter Brands & Fresh Bakery
        return matrixItems.filter((it) => it.category === 'dairy' || it.category === 'bakery');

      case 5:
        // Page 5: Pantry Staples, Beer & Drinks
        return matrixItems.filter((it) => it.category === 'pantry' || it.category === 'drinks');

      default:
        return matrixItems.slice(0, 6);
    }
  };

  const pageItems = getPageItems();

  const getPageTitle = () => {
    switch (currentPage) {
      case 1:
        return { title: t.page1Title, subtitle: t.page1Subtitle, badge: 'MEGA TRHÁKY / STEALS' };
      case 2:
        return { title: t.page2Title, subtitle: t.page2Subtitle, badge: 'ČERSTVÁ ÚRODA / FRESH HARVEST' };
      case 3:
        return { title: t.page3Title, subtitle: t.page3Subtitle, badge: 'MÄSIARSTVO / BUTCHER' };
      case 4:
        return { title: t.page4Title, subtitle: t.page4Subtitle, badge: 'MLIEČNE & PEČIVO / DAIRY & BREAD' };
      case 5:
        return { title: t.page5Title, subtitle: t.page5Subtitle, badge: 'ŠPAJZA & NÁPOJE / PANTRY & DRINKS' };
      default:
        return { title: 'LETÁKOVÁ PONUKA', subtitle: '', badge: '' };
    }
  };

  const handleAddAllOnPage = () => {
    pageItems.forEach((item) => {
      onAddToBasket(item);
    });
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const pageInfo = getPageTitle();

  return (
    <div className="space-y-6">
      {/* Flyer Header & Pagination Toolbar */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>{t.flyerBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>{t.flyerTitle}</span>
            <span className="text-sm font-bold text-amber-400 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-lg">
              {lifecycle?.currentCycleName || 'Týždeň 45'}
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            {t.flyerSubtitle}
          </p>
        </div>

        {/* Leaflet Page Flipper Toolbar */}
        <div className="flex flex-wrap items-center gap-3 no-print">
          <div className="flex items-center bg-slate-800 rounded-2xl p-1 border border-slate-700">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition disabled:opacity-30 cursor-pointer"
              title={t.prevPage}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Pill Buttons */}
            <div className="flex items-center gap-1 px-2">
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-black transition cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-700 transition disabled:opacity-30 cursor-pointer"
              title={t.nextPage}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <button
            onClick={handleAddAllOnPage}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-md shadow-emerald-600/30 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{t.addPageToBasket}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs border border-slate-700 transition cursor-pointer"
            title={t.printFlyer}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FLYER MAGAZINE SPREAD (Realistic Supermarket Leaflet Page) */}
      <div className="bg-white rounded-3xl border-4 border-slate-200 shadow-2xl p-6 sm:p-8 relative overflow-hidden print:border-none print:shadow-none print:p-0">
        {/* Top Leaflet Banner Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white rounded-2xl p-5 mb-8 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-black/30 backdrop-blur-xs text-amber-300 font-mono font-black text-xs px-3 py-1 rounded-full uppercase">
              {t.pageLabel} {currentPage} {t.ofPages} {totalPages} • {pageInfo.badge}
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow-sm">
                {pageInfo.title}
              </h3>
              <p className="text-xs text-white/90 font-medium">
                {pageInfo.subtitle}
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[10px] text-white/80 block font-bold uppercase tracking-wider">
              {t.validPeriod}
            </span>
            <span className="text-xs font-mono font-black text-amber-200">
              {new Date(lifecycle?.validUntil).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Flyer Product Grid (Magazine Style Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((item) => {
            const qty = getBasketQty(item.id);
            const bestStorePrice = item.lowestPrice;
            const regularPrice = item.highestRegularPrice;
            const discountPct = item.maxSavingsPercent;
            const storeName = item.lowestStoreName;
            const storeColor = item.lowestStoreBrandColor;

            return (
              <div
                key={item.id}
                className="group bg-gradient-to-b from-white to-slate-50/50 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
              >
                {/* Store Header Ribbon */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-xs tracking-wider"
                    style={{ backgroundColor: storeColor }}
                  >
                    {storeName}
                  </span>

                  {item.prices[item.lowestStore]?.badge && (
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[130px]">
                      {item.prices[item.lowestStore].badge}
                    </span>
                  )}
                </div>

                {/* Product Photo & Giant Discount Burst Bubble */}
                <div className="relative mb-3 h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={item.image}
                    alt={lang === 'sk' ? item.nameSk : item.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Red Leaflet Discount Burst Bubble */}
                  <div className="absolute top-2 right-2 bg-rose-600 text-white rounded-full w-14 h-14 flex flex-col items-center justify-center font-black shadow-lg transform rotate-6 border-2 border-white">
                    <span className="text-[10px] uppercase leading-none font-bold">ZĽAVA</span>
                    <span className="text-base leading-none font-black">-{discountPct}%</span>
                  </div>

                  {item.isStaple && (
                    <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span>⭐ Základná potravina</span>
                    </div>
                  )}
                </div>

                {/* Product Titles & Variety */}
                <div className="space-y-1 mb-4">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-emerald-700 transition">
                    {lang === 'sk' ? item.nameSk : item.nameEn}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Balenie: {item.unit}
                  </span>
                </div>

                {/* Pricing & Add to Basket Section */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                  {/* Prices */}
                  <div>
                    <span className="text-[11px] text-slate-400 line-through font-mono block">
                      {regularPrice.toFixed(2)} €
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900 tracking-tight">
                        {bestStorePrice.toFixed(2)}
                      </span>
                      <span className="text-base font-bold text-slate-900 font-mono">€</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block">
                      {t.saveUpTo} {item.maxSavingsAmount.toFixed(2)} €
                    </span>
                  </div>

                  {/* Quantity Controller / Add Button */}
                  <div className="shrink-0">
                    {qty > 0 ? (
                      <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-400 rounded-xl p-1">
                        <button
                          onClick={() => onRemoveFromBasket(item.id)}
                          className="w-7 h-7 rounded-lg bg-white text-emerald-800 flex items-center justify-center hover:bg-emerald-100 transition shadow-2xs cursor-pointer font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-black text-xs text-emerald-900 w-5 text-center font-mono">
                          {qty}
                        </span>
                        <button
                          onClick={() => onAddToBasket(item)}
                          className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition shadow-2xs cursor-pointer font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToBasket(item)}
                        className="flex items-center gap-1.5 bg-slate-900 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{t.addToBasket}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaflet Bottom Banner */}
        <div className="mt-8 pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">SupaGrocer Týždenný Výber</span>
            <span>• Automaticky vygenerované z letákov Kaufland, Lidl, Billa, Tesco a FRESH</span>
          </div>
          <div className="flex items-center gap-2 font-mono font-bold text-slate-700">
            <span>Strana {currentPage} z {totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
