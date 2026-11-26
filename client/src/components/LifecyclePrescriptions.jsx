import React from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2, 
  ShoppingCart, 
  Layers, 
  AlertTriangle,
  History,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LifecyclePrescriptions({
  lifecycle,
  prescription,
  onSimulateRotation,
  onLoadPrescriptionToBasket,
  isRotating,
  t,
  lang
}) {
  const triggerRotationWithFeedback = () => {
    onSimulateRotation();
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  const time = lifecycle?.timeRemaining || { days: 0, hours: 0, minutes: 0, formatted: '0d 0h 0m' };

  return (
    <div className="space-y-6">
      {/* Engine Status Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>
                {lang === 'sk'
                  ? 'Automatický monitor platnosti letákov (Active Cron Engine)'
                  : 'Automated Leaflet Expiry Monitor (Active Cron Engine)'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.lifecycleTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {t.lifecycleSubtitle}
            </p>
          </div>

          {/* Simulate Button */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <button
              onClick={triggerRotationWithFeedback}
              disabled={isRotating}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-5 py-3 rounded-2xl text-xs transition shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
              <span>{t.simulateRotationBtn}</span>
            </button>
            <span className="text-[10px] text-slate-400 font-medium">
              {lang === 'sk'
                ? 'Okamžite otestuje expiráciu a vygeneruje nový zoznam'
                : 'Instantly tests flyer expiry & generates fresh plan'}
            </span>
          </div>
        </div>

        {/* Current vs Upcoming Cycles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
          {/* Active Cycle */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {t.activeOffersBadge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {lifecycle?.currentCycleId}
              </span>
            </div>

            <h4 className="text-lg font-bold text-white mb-1">
              {lifecycle?.currentCycleName || (lang === 'sk' ? 'Týždenné letáky' : 'Weekly Flyers')}
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              {lang === 'sk' ? 'Platnosť:' : 'Validity:'} {new Date(lifecycle?.validFrom).toLocaleDateString()} — {new Date(lifecycle?.validUntil).toLocaleDateString()}
            </p>

            {/* Countdown Clock */}
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{t.timeToRotation}</span>
              </span>
              <span className="font-mono font-extrabold text-base text-amber-300">
                {time.formatted}
              </span>
            </div>
          </div>

          {/* Upcoming Cycle */}
          <div className="bg-slate-50 text-slate-900 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                  {t.nextWeekBadge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {lifecycle?.upcomingCycleId}
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 mb-1">
                {lifecycle?.upcomingCycleName || (lang === 'sk' ? 'Pripravované ponuky' : 'Upcoming Deals')}
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                {lang === 'sk' ? 'Platnosť:' : 'Validity:'} {new Date(lifecycle?.upcomingValidFrom).toLocaleDateString()} — {new Date(lifecycle?.upcomingValidUntil).toLocaleDateString()}
              </p>

              <div className="bg-white rounded-xl p-3 border border-slate-200 text-xs text-slate-600">
                {lang === 'sk'
                  ? '💡 Po uplynutí aktuálneho času systém automaticky prepne tieto ceny ako aktívne a prepíše nákupný zoznam.'
                  : '💡 When the current cycle ends, the system automatically activates these prices and refreshes your prescribed basket.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescribed Smart Grocery List (Step 4 Outcome) */}
      {prescription && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.smartAlgoBadge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.prescribedTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                {lang === 'sk'
                  ? prescription.summary
                  : `Save up to ${prescription.totalSavings?.toFixed(2)} € (${prescription.savingsPercent || prescription.totalSavingsPercent}%) by splitting your basket according to this week's verified leaflets.`}
              </p>
            </div>

            {/* Load to Basket Button */}
            <button
              onClick={() => onLoadPrescriptionToBasket(prescription)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl text-xs transition shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t.loadPrescriptionToBasket}</span>
            </button>
          </div>

          {/* Metric Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-500 font-medium block">{t.prescribedItemsCount}</span>
              <span className="text-xl font-black text-slate-900 font-mono">
                {prescription.totalItemsCount} {t.itemsInStore}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-medium block">{t.prescribedEstCost}</span>
              <span className="text-xl font-black text-emerald-700 font-mono">
                {prescription.totalPrescribedCost.toFixed(2)} €
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-medium block">{t.prescribedRetailCost}</span>
              <span className="text-xl font-black text-slate-400 line-through font-mono">
                {prescription.totalRegularCost.toFixed(2)} €
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-medium block">{t.prescribedGuaranteedSavings}</span>
              <span className="text-xl font-black text-emerald-600 font-mono">
                +{prescription.totalSavings.toFixed(2)} € (-{prescription.totalSavingsPercent || prescription.savingsPercent}%)
              </span>
            </div>
          </div>

          {/* Prescribed Stores Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prescription.storeSplits?.map((split) => (
              <div
                key={split.chainId}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-black text-white shadow-2xs"
                      style={{ backgroundColor: split.brandColor }}
                    >
                      {split.chainName}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {split.subtotal.toFixed(2)} €
                    </span>
                  </div>

                  <div className="space-y-2">
                    {split.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={item.image}
                            alt={item.nameSk}
                            className="w-7 h-7 object-cover rounded-md shrink-0"
                          />
                          <span className="font-bold text-slate-800 truncate">
                            {lang === 'sk' ? item.nameSk : item.nameEn}
                          </span>
                        </div>
                        <span className="font-extrabold text-emerald-700 font-mono shrink-0">
                          {item.price.toFixed(2)} €
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{t.savingsInStore}</span>
                  <span className="font-bold text-emerald-600">+{split.savings.toFixed(2)} €</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
