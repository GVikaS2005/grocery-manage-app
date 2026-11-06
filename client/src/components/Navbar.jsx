import React from 'react';
import { 
  ShoppingCart, 
  MapPin, 
  Clock, 
  RefreshCw, 
  Sparkles, 
  Store, 
  BarChart3, 
  BookOpen, 
  Calendar,
  Layers
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  cities,
  lang,
  setLang,
  t,
  lifecycle,
  basketCount,
  onSimulateRotation,
  isRotating,
  onOpenModelModal
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Location Selector */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.country}:</span>
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-slate-800 text-white text-xs rounded px-2 py-0.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name} {city.isCapital ? '⭐' : ''}
                </option>
              ))}
            </select>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              • Obchody: Kaufland, Lidl, Billa, Tesco, FRESH
            </span>
          </div>

          {/* Right side: Countdown & Simulation trigger */}
          <div className="flex items-center gap-3">
            {lifecycle?.timeRemaining && (
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700 text-amber-300 font-mono text-[11px]">
                <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>{t.expiresIn}</span>
                <span className="font-bold text-white">{lifecycle.timeRemaining.formatted}</span>
              </div>
            )}

            <button
              onClick={onOpenModelModal}
              title="Zobraziť AI model sťahovania a analýzy letákov"
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-2.5 py-0.5 rounded font-bold text-[11px] transition cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">AI Model letákov</span>
            </button>

            <button
              onClick={onSimulateRotation}
              disabled={isRotating}
              title="Otestovať automatické nahradenie vypršaných letákov novými ponukami"
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded font-medium text-[11px] transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{t.simulateRotationBtn}</span>
              <span className="md:hidden">Rotácia</span>
            </button>

            {/* Language Switch */}
            <div className="flex items-center border border-slate-700 rounded overflow-hidden">
              <button
                onClick={() => setLang('sk')}
                className={`px-1.5 py-0.5 text-[10px] font-bold ${
                  lang === 'sk' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                SK
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 text-[10px] font-bold ${
                  lang === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* App Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('matrix')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {t.appName}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                Slovakia 🇸🇰
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span>{t.tabMatrix}</span>
          </button>

          <button
            onClick={() => setActiveTab('basket')}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'basket'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t.tabBasket}</span>
            {basketCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'basket' ? 'bg-white text-emerald-700' : 'bg-emerald-600 text-white'
              }`}>
                {basketCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('stores')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'stores'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{t.tabStores}</span>
          </button>

          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'lifecycle'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{t.tabLifecycle}</span>
            <span className="hidden lg:inline bg-amber-100 text-amber-800 text-[10px] font-bold px-1 rounded">
              Auto
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leaflets')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'leaflets'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>{t.tabLeaflets}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
