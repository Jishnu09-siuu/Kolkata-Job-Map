'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  BellRing, 
  MapPin, 
  ChevronRight, 
  X, 
  Sparkles, 
  Briefcase,
  Building2
} from 'lucide-react';

export const LiveHiringToast: React.FC = () => {
  const { 
    liveHiringToast, 
    dismissLiveToast, 
    selectCompany, 
    selectJob,
    flyToLocation 
  } = useApp();

  if (!liveHiringToast) return null;

  const handleView = () => {
    const loc = liveHiringToast.company.locations[0];
    if (loc) {
      flyToLocation(loc.latitude, loc.longitude, 16);
    }
    selectCompany(liveHiringToast.company, loc);
    selectJob(liveHiringToast.job);
    dismissLiveToast();
  };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-full animate-bounce-subtle">
      <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-950/95 text-white border border-zinc-700 shadow-2xl backdrop-blur-md flex items-start gap-3">
        
        {/* Animated Beacon Pin */}
        <div className="w-9 h-9 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5 relative">
          <BellRing className="w-5 h-5" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
              Live Hiring Detected
            </span>
            <span className="text-[10px] text-zinc-400">Just now</span>
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-white mt-1 truncate">
            {liveHiringToast.jobTitle}
          </h4>

          <p className="text-xs text-zinc-300 flex items-center gap-1 mt-0.5 truncate">
            <Building2 className="w-3 h-3 text-zinc-400 flex-shrink-0" />
            <strong className="text-white truncate">{liveHiringToast.companyName}</strong>
            <span className="text-zinc-400 text-[11px] truncate flex items-center gap-0.5">
              <MapPin className="w-3 h-3 text-zinc-400 flex-shrink-0" />
              {liveHiringToast.area}
            </span>
          </p>

          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={handleView}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
            >
              <span>View on Map & Apply</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={dismissLiveToast}
              className="px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-white text-xs font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={dismissLiveToast}
          className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
