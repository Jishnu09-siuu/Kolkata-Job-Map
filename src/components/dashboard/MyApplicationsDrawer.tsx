'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Send, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';

export const MyApplicationsDrawer: React.FC = () => {
  const { 
    isApplicationsDrawerOpen, 
    setIsApplicationsDrawerOpen, 
    userApplications,
    selectCompany,
    companies
  } = useApp();

  if (!isApplicationsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsApplicationsDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                <Send className="w-4 h-4 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950">
                  My Applications
                </h3>
                <p className="text-xs text-zinc-500">
                  {userApplications.length} Jobs Applied via Kolkata Job Map
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsApplicationsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {userApplications.length === 0 ? (
              <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
                <Send className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-zinc-800">No applications yet</h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">
                  When you apply for verified jobs on the map, your application status and tracking numbers will appear here.
                </p>
              </div>
            ) : (
              userApplications.map((app) => {
                const company = companies.find(c => c.id === app.companyId);

                return (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 shadow-2xs space-y-2.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-semibold text-zinc-900 bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded">
                          {app.trackingCode}
                        </span>
                        <h4 className="text-sm font-bold text-zinc-900 mt-1">
                          {app.jobTitle}
                        </h4>
                        <p className="text-xs text-zinc-600 font-medium">
                          {app.companyName}
                        </p>
                      </div>

                      <span className="text-[10px] font-bold text-zinc-900 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full">
                        {app.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-500 space-y-1 bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                      <div className="flex items-center justify-between">
                        <span>Applied on:</span>
                        <span className="font-medium text-zinc-800">
                          {new Date(app.appliedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Resume attached:</span>
                        <span className="font-medium text-zinc-800 truncate max-w-[150px]">
                          {app.resumeFileName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Channel:</span>
                        <span className="font-medium text-zinc-800">{app.applicationMethod}</span>
                      </div>
                    </div>

                    {company && (
                      <button
                        onClick={() => {
                          setIsApplicationsDrawerOpen(false);
                          selectCompany(company);
                        }}
                        className="w-full text-center text-xs font-semibold text-zinc-700 hover:text-zinc-950 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View Company on Map</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 text-xs text-zinc-500 flex items-center justify-between">
            <span>🔒 Secure Application Ledger</span>
            <span>Real-time Employer Sync</span>
          </div>

        </div>
      </div>
    </div>
  );
};
