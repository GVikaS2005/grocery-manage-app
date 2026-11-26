import React from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  Sparkles, 
  Calendar,
  Globe,
  Layers
} from 'lucide-react';

export default function LeafletsView({
  leaflets,
  onSyncPublicFlyers,
  isSyncing,
  lastSyncResult,
  t,
  lang
}) {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.publicSourcesBadge}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {t.leafletsTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              {t.leafletsSubtitle}
            </p>
          </div>

          {/* Sync Button */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <button
              onClick={onSyncPublicFlyers}
              disabled={isSyncing}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer disabled:opacity-50 shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? t.syncing : t.syncFlyersBtn}</span>
            </button>
            {lastSyncResult?.timestamp && (
              <span className="text-[10px] text-slate-400">
                {t.lastSync} {new Date(lastSyncResult.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Sync Status Banner if completed */}
        {lastSyncResult?.status === 'completed' && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {lang === 'sk'
                  ? `Úspešne zosynchronizovaných ${lastSyncResult.chainsSynced} obchodných reťazcov. Všetky letáky sú aktuálne k dnešnému dňu.`
                  : `Successfully verified and synced ${lastSyncResult.chainsSynced} supermarket chains. All flyers are up to date.`}
              </span>
            </div>
            <span className="font-mono font-bold text-[11px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
              Live Verified
            </span>
          </div>
        )}
      </div>

      {/* Leaflets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaflets.map((leaflet) => {
          return (
            <div
              key={leaflet.chainId}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={leaflet.coverUrl}
                  alt={leaflet.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full border border-white/20">
                    {leaflet.chainName}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-mono mb-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>{leaflet.validPeriod}</span>
                  </div>
                  <h4 className="font-bold text-sm leading-tight text-white line-clamp-1">
                    {leaflet.title}
                  </h4>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{leaflet.pagesCount} {t.pagesOfDeals}</span>
                  </span>
                  <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                    {leaflet.source}
                  </span>
                </div>

                {/* External link button */}
                <a
                  href={leaflet.webLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{t.openOnlineFlyer}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
