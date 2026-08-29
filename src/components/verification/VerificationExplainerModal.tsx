'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Globe, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const VerificationExplainerModal: React.FC = () => {
  const { 
    isVerificationExplainerOpen, 
    setIsVerificationExplainerOpen 
  } = useApp();

  if (!isVerificationExplainerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsVerificationExplainerOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-zinc-200 p-5 sm:p-6 space-y-5">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-zinc-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-zinc-800" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  How We Verify Kolkata Companies & Jobs
                </h3>
                <p className="text-xs text-zinc-500">
                  Our 4-Tier Data Trust & Geospatial Verification Protocol
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsVerificationExplainerOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Verification Tiers */}
          <div className="space-y-3.5 text-xs sm:text-sm">
            
            {/* Tier 1: Geospatial Coordinates */}
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <MapPin className="w-4 h-4 text-zinc-800" />
                <span>1. Verified Office Location Coordinates</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Every office building marker is tied to authentic cadastral and municipal coordinates across Salt Lake Sector V, New Town IT SEZs, Park Street CBD, Kasba, Topsia, and Bantala. No approximate or randomly placed markers are permitted.
              </p>
            </div>

            {/* Tier 2: Official Career Sources */}
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <Globe className="w-4 h-4 text-zinc-800" />
                <span>2. Official Employer Careers Sources</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Job postings are synchronized directly from authorized company portals (e.g. TCS NextStep, Wipro Careers, Cognizant Hub, IBM Software Labs) and authorized institutional pipelines.
              </p>
            </div>

            {/* Tier 3: Real-Time Synchronization Windows */}
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <Clock className="w-4 h-4 text-zinc-800" />
                <span>3. Continuous Freshness Audits</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Positions are periodically re-checked against primary feeds. When a role is filled or removed from the source, the platform marks it as expired to prevent ghost applications.
              </p>
            </div>

            {/* Tier 4: Community Assisted Error Correction */}
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <Users className="w-4 h-4 text-zinc-800" />
                <span>4. Community Reporting & Moderation</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Job seekers can flag moved offices, closed branches, or expired listings via the "Report an Issue" button, which triggers an administrative audit against official sources.
              </p>
            </div>

          </div>

          {/* Legal / Transparency Disclaimer */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] text-zinc-700 space-y-1">
            <div className="flex items-center gap-1 font-bold text-zinc-900">
              <AlertCircle className="w-3.5 h-3.5 text-zinc-700" />
              <span>Transparency Notice</span>
            </div>
            <p>
              Verification reflects data accuracy at the time of synchronization. It does not guarantee employment offers, recruitment timelines, or that a company will keep a role open indefinitely.
            </p>
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-zinc-200 flex justify-end">
            <button
              onClick={() => setIsVerificationExplainerOpen(false)}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
            >
              Got It
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
