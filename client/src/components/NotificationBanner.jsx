import React from 'react';
import { Sparkles, ArrowRight, X, AlertCircle } from 'lucide-react';

export default function NotificationBanner({ notification, onClose, onViewPrescription }) {
  if (!notification) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-4 py-3 shadow-md animate-fade-in relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-100" />
          </div>
          <div>
            <span className="font-extrabold mr-2">
              {notification.title || 'Nové letáky aktivované!'}
            </span>
            <span className="text-emerald-100 hidden sm:inline">
              {notification.message}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onViewPrescription}
            className="flex items-center gap-1 bg-white text-slate-900 font-bold px-3 py-1 rounded-lg text-xs hover:bg-emerald-50 transition cursor-pointer shadow-xs"
          >
            <span>Pozrieť predpísaný nákup</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-md transition text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
