import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  FileText, 
  Eye, 
  RefreshCw, 
  X,
  Scan,
  Database
} from 'lucide-react';

export default function FlyerAnalyzerModal({
  isOpen,
  onClose,
  onRunAnalysis,
  isAnalyzing,
  analysisResult,
  t,
  lang
}) {
  if (!isOpen) return null;

  const steps = lang === 'sk' ? [
    { title: 'Sťahovanie letákov (Download)', desc: 'Stiahnutie oficiálnych digitálnych letákov Kaufland.sk, Lidl.sk, Billa.sk, Tesco.sk a Fresh.sk (aktuálny aj budúci týždeň).' },
    { title: 'Segmentácia stránok & Cenovky', desc: 'Skenovanie 240+ strán letákov, optické vyčítanie akciových cenoviek, preškrtnutých cien a zliav.' },
    { title: 'Diferenciácia špecifických odrôd', desc: 'Klasifikácia odrôd jabĺk (Golden, Gala, Granny Smith, Red Delicious, Jonagold), druhov mäsa, lokálnych mliekarní a pekárenských špeciálov.' },
    { title: 'Krížové párovanie reťazcov', desc: 'Prepojenie identických a porovnateľných položiek naprieč všetkými 5 supermarketmi do jednotnej porovnávacej matice.' },
    { title: 'Validácia dátumov & Rotácia', desc: 'Kontrola dátumov platnosti prebiehajúcej a nadchádzajúcej akcie.' }
  ] : [
    { title: 'Flyer Downloads (Current & Next Week)', desc: 'Downloads official digital leaflets for Kaufland.sk, Lidl.sk, Billa.sk, Tesco.sk, and Fresh.sk for both active and upcoming cycles.' },
    { title: 'Page Segmentation & Price OCR', desc: 'Scans 240+ flyer pages, optically parsing promotional prices, regular prices, and loyalty club discounts.' },
    { title: 'Granular Variety Classification', desc: 'Classifies specific apple varieties (Golden, Gala, Granny Smith, Red Delicious, Jonagold), meat cuts, local dairy brands, and bakery goods.' },
    { title: 'Cross-Chain SKU Matching', desc: 'Matches identical and comparable products across all 5 supermarket chains into a unified comparison table.' },
    { title: 'Date Validation & Lifecycle Scheduling', desc: 'Validates promotional validity dates and triggers automated weekly offer replacement upon expiration.' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Cpu className="w-3 h-3 text-emerald-400" />
              <span>SupaGrocer FlyerVision Model v2.4</span>
            </span>
            <span className="text-slate-400 text-xs">Slovakia (SK) Leaflet Extraction</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {t.aiModalTitle}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-lg">
            {t.aiModalSubtitle}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Analysis Trigger Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-800 block">
                {t.aiActionCardTitle}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {t.aiActionCardSubtitle}
              </span>
            </div>

            <button
              onClick={onRunAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-md shadow-emerald-600/20 shrink-0 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? t.aiRunningBtn : t.aiDownloadBtn}</span>
            </button>
          </div>

          {/* Model Metrics Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">{t.aiPagesScanned}</span>
              <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">242</span>
              <span className="text-[9px] text-emerald-600 font-medium">10 flyers (SK)</span>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">{t.aiGranularVarieties}</span>
              <span className="text-xl font-black text-emerald-700 font-mono mt-0.5 block">85+</span>
              <span className="text-[9px] text-slate-500 font-medium">Granular varieties</span>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">{t.aiStoresCount}</span>
              <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">5</span>
              <span className="text-[9px] text-slate-500 font-medium">Kaufland • Lidl • Billa...</span>
            </div>
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">{t.aiAccuracy}</span>
              <span className="text-xl font-black text-emerald-600 font-mono mt-0.5 block">98.8%</span>
              <span className="text-[9px] text-emerald-700 font-medium">Verified deals</span>
            </div>
          </div>

          {/* Pipeline Steps Visualizer */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              {t.aiStepsTitle}
            </h4>
            <div className="space-y-2.5">
              {steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block leading-tight">
                      {st.title}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {st.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {t.aiFooterNote}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            {t.aiCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
