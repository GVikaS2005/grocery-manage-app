import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  Printer, 
  Check, 
  ArrowRight, 
  Percent, 
  Store, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SmartBasket({
  basket,
  optimization,
  manualOverrides,
  onOverrideStore,
  onRemoveItem,
  onClearBasket,
  onQuantityChange,
  t,
  lang
}) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleChecked = (itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const chainsList = [
    { id: 'kaufland', name: 'Kaufland' },
    { id: 'lidl', name: 'Lidl' },
    { id: 'billa', name: 'Billa' },
    { id: 'tesco', name: 'Tesco' },
    { id: 'fresh', name: 'FRESH' }
  ];

  if (!optimization || optimization.isEmpty || basket.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-4">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">{t.emptyBasket}</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Pridajte si tovar z tabuľky porovnania cien alebo kliknite na tlačidlo "Pridať základné potraviny", aby vám algoritmus vypočítal ideálne rozdelenie nákupu.
        </p>
      </div>
    );
  }

  const {
    totalOptimalCost,
    totalRegularCost,
    totalSaved,
    savingsPercent,
    optimalSplit,
    singleStoreComparison,
    recommendation
  } = optimization;

  return (
    <div className="space-y-6">
      {/* Top Banner: Total Savings & Summary */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.optimizedPlanBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.smartBasketTitle}
            </h2>
            <p className="text-sm text-emerald-100/80 mt-1 max-w-xl">
              {lang === 'en'
                ? (optimalSplit.length > 1
                    ? `By splitting your list across ${optimalSplit.length} stores you save ${totalSaved} € compared to regular retail prices.`
                    : `All selected items are cheapest at ${optimalSplit[0]?.chainName}.`)
                : recommendation}
            </p>
          </div>

          {/* Savings Metric Box */}
          <div className="flex flex-wrap items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
            <div>
              <span className="text-[11px] text-emerald-200 block font-medium">{t.totalSpend}</span>
              <span className="text-3xl font-black font-mono tracking-tight text-white">
                {totalOptimalCost.toFixed(2)} €
              </span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
            <div>
              <span className="text-[11px] text-emerald-200 block font-medium">{t.totalSavings}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black font-mono text-emerald-300">
                  +{totalSaved.toFixed(2)} €
                </span>
                <span className="bg-emerald-400 text-slate-900 text-xs font-black px-2 py-0.5 rounded-full">
                  -{savingsPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Print, Clear, Celebrate */}
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10 relative z-10 no-print">
          <button
            onClick={triggerCelebration}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs transition shadow-md cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.celebrateSavings}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-xl text-xs transition border border-white/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.printList}</span>
          </button>

          <button
            onClick={onClearBasket}
            className="flex items-center gap-1.5 text-rose-300 hover:text-white px-3 py-2 rounded-xl text-xs transition ml-auto cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.clearBasket}</span>
          </button>
        </div>
      </div>

      {/* Store-by-Store Split Plan Cards (Fix Where to Buy Where) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <span>{t.splitByStores}</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {lang === 'sk' ? 'Kúpte položky v týchto obchodoch pre maximálnu úsporu' : 'Buy items at these stores for maximum savings'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {optimalSplit.map((split) => {
            return (
              <div
                key={split.chainId}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
              >
                {/* Store Header */}
                <div 
                  className="px-5 py-3.5 text-white flex items-center justify-between shadow-2xs"
                  style={{ backgroundColor: split.brandColor }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base tracking-tight">
                      {split.chainName}
                    </span>
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {split.itemsCount} {t.itemsInStore}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-white/80 block font-medium">{t.storeSubtotal}</span>
                    <span className="text-lg font-black font-mono">
                      {split.subtotal.toFixed(2)} €
                    </span>
                  </div>
                </div>

                {/* Items in this store */}
                <div className="divide-y divide-slate-100 p-2 flex-1">
                  {split.items.map((item) => {
                    const isChecked = !!checkedItems[item.id];

                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl flex items-center justify-between gap-3 transition ${
                          isChecked ? 'bg-slate-50 opacity-60' : 'hover:bg-slate-50/70'
                        }`}
                      >
                        {/* Checkbox & Item info */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <button
                            onClick={() => toggleChecked(item.id)}
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center transition shrink-0 cursor-pointer ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 hover:border-emerald-500 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>

                          <img
                            src={item.image}
                            alt={item.nameSk}
                            className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                          />

                          <div className="min-w-0">
                            <span
                              className={`font-bold text-xs text-slate-800 block truncate ${
                                isChecked ? 'line-through text-slate-400' : ''
                              }`}
                            >
                              {lang === 'sk' ? item.nameSk : item.nameEn}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <span>{item.quantity} × {item.unitPrice.toFixed(2)} €</span>
                              {item.badge && (
                                <span className="bg-emerald-100 text-emerald-800 font-semibold px-1 rounded text-[9px]">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Price & Store Override Selector */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="font-extrabold text-sm font-mono text-slate-900 block">
                              {item.lineTotal.toFixed(2)} €
                            </span>
                            {item.savings > 0 && (
                              <span className="text-[10px] text-emerald-600 font-semibold">
                                -{item.savings.toFixed(2)} €
                              </span>
                            )}
                          </div>

                          {/* Override Store Dropdown */}
                          <div className="no-print">
                            <select
                              value={manualOverrides[item.id] || split.chainId}
                              onChange={(e) => onOverrideStore(item.id, e.target.value)}
                              className="text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-2 py-1 border border-slate-200 cursor-pointer"
                              title="Presunúť položku do iného obchodu"
                            >
                              {chainsList.map((ch) => (
                                <option key={ch.id} value={ch.id}>
                                  {ch.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Single-Store Comparison (Prove why splitting saves money) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {t.singleStoreComp}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.singleStoreExpl}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {/* Optimal split tile */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-center relative shadow-xs">
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              {t.cheaperOptimal}
            </span>
            <span className="text-[11px] font-bold text-emerald-900 block mt-1">
              {lang === 'sk' ? 'Smart Split (Kombinácia)' : 'Smart Split (Optimal)'}
            </span>
            <span className="text-xl font-black font-mono text-emerald-700 block mt-1">
              {totalOptimalCost.toFixed(2)} €
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 mt-0.5 block">
              {t.comparisonBase}
            </span>
          </div>

          {/* Individual Stores */}
          {singleStoreComparison.map((comp) => {
            return (
              <div
                key={comp.chainId}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center"
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: comp.brandColor }}
                  ></span>
                  <span className="text-xs font-bold text-slate-800">
                    {comp.chainName}
                  </span>
                </div>
                <span className="text-lg font-black font-mono text-slate-900 block">
                  {comp.totalCost.toFixed(2)} €
                </span>
                <span className="text-[10px] font-bold text-rose-600 mt-0.5 block">
                  +{comp.diffVsOptimal.toFixed(2)} € {t.moreExpensive}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
