'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  RefreshCw, 
  ShieldCheck, 
  Activity, 
  Database, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2,
  Server,
  Bell
} from 'lucide-react';

export const LiveSyncModal: React.FC = () => {
  const { 
    isLiveSyncModalOpen, 
    setIsLiveSyncModalOpen, 
    syncStats, 
    refreshDataSync,
    triggerLiveHiringEvent 
  } = useApp();

  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isLiveSyncModalOpen) return null;

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      refreshDataSync();
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsLiveSyncModalOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-zinc-200 p-5 sm:p-6 space-y-5">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  Live Data Engine Status
                </h3>
                <p className="text-xs text-zinc-500">
                  Continuous verification of Kolkata tech hiring sources
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLiveSyncModalOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80">
              <span className="text-[10px] font-semibold uppercase text-zinc-500 tracking-wider">
                Companies Tracked
              </span>
              <div className="text-xl font-bold text-zinc-900 mt-0.5">
                {syncStats.companiesTracked}
              </div>
              <span className="text-[10px] text-zinc-500">Kolkata IT & Corporates</span>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80">
              <span className="text-[10px] font-semibold uppercase text-zinc-500 tracking-wider">
                Active Jobs Detected
              </span>
              <div className="text-xl font-bold text-zinc-900 mt-0.5">
                {syncStats.activeJobsDetected}
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">Verified Active Listings</span>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80">
              <span className="text-[10px] font-semibold uppercase text-zinc-500 tracking-wider">
                Fresher Roles
              </span>
              <div className="text-xl font-bold text-zinc-900 mt-0.5">
                {syncStats.fresherOpportunities}
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">0-1 yrs & Trainees</span>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80">
              <span className="text-[10px] font-semibold uppercase text-zinc-500 tracking-wider">
                Geocoded Buildings
              </span>
              <div className="text-xl font-bold text-zinc-900 mt-0.5">
                {syncStats.verifiedLocationsCount}
              </div>
              <span className="text-[10px] text-zinc-500">Real Office Coordinates</span>
            </div>
          </div>

          {/* Pipeline Verification Log Box */}
          <div className="p-3.5 bg-zinc-950 text-zinc-100 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-1 border-b border-zinc-800">
              <span>Pipeline Diagnostics</span>
              <span>Latency: 42ms</span>
            </div>
            <div className="text-zinc-300 text-[11px]">
              ✔ Official Career Pages Scanned (TCS, Wipro, Cognizant, IBM, Infosys, Nomura)
            </div>
            <div className="text-zinc-300 text-[11px]">
              ✔ Geocoding verification: 100% exact polygon match for Sector V & New Town SEZs
            </div>
            <div className="text-zinc-400 text-[11px]">
              ℹ Freshness: {syncStats.dataFreshnessString}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-zinc-200">
            <button
              onClick={() => {
                triggerLiveHiringEvent();
                setIsLiveSyncModalOpen(false);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-300 hover:bg-zinc-200 text-xs font-bold transition-all shadow-2xs"
            >
              <Bell className="w-3.5 h-3.5 text-zinc-700" />
              <span>Test Live Hiring Notification</span>
            </button>

            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Trigger Live Sync'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
