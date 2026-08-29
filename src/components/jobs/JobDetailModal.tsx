'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  MapPin, 
  Briefcase, 
  Clock, 
  GraduationCap, 
  Bookmark, 
  Share2, 
  Send, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Check,
  Building2,
  DollarSign,
  Train,
  Car,
  Bike,
  Footprints,
  Flag,
  HelpCircle
} from 'lucide-react';

export const JobDetailModal: React.FC = () => {
  const { 
    selectedJob, 
    isJobModalOpen, 
    setIsJobModalOpen, 
    companies,
    openApplyModal,
    toggleSaveJob,
    isJobSaved,
    userLocation,
    commuteMode,
    getCommuteForLocation,
    openReportModal,
    setIsVerificationExplainerOpen
  } = useApp();

  if (!isJobModalOpen || !selectedJob) return null;

  const company = companies.find(c => c.id === selectedJob.companyId);
  const primaryLoc = company?.locations[0];
  const isSaved = isJobSaved(selectedJob.id);

  const commute = primaryLoc ? getCommuteForLocation(primaryLoc.latitude, primaryLoc.longitude) : null;
  const CommuteIcon = commuteMode === 'driving' ? Car : commuteMode === 'two_wheeler' ? Bike : commuteMode === 'walking' ? Footprints : Train;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsJobModalOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-zinc-200 flex flex-col max-h-[92dvh]">
          
          {/* Modal Header */}
          <div className="p-5 sm:p-6 border-b border-zinc-200 bg-zinc-50/50 flex-shrink-0">
            <div className="flex items-start justify-between gap-3">
              
              <div className="flex items-start gap-3.5">
                {company && (
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 overflow-hidden p-1 shadow-sm flex items-center justify-center flex-shrink-0">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-950 leading-snug">
                    {selectedJob.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-zinc-600 mt-0.5">
                    {company?.name} / <span className="text-zinc-500">{selectedJob.locationArea}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleSaveJob(selectedJob.id)}
                  className={`p-2 rounded-lg border transition-colors ${
                    isSaved 
                      ? 'bg-zinc-900 text-white border-zinc-900' 
                      : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                  }`}
                  title={isSaved ? 'Saved to bookmarks' : 'Save job'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <button
                  onClick={() => setIsJobModalOpen(false)}
                  className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Commute Info Pill */}
            {commute && (
              <div className="mt-3.5 p-2 bg-zinc-900 text-white rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CommuteIcon className="w-4 h-4 text-zinc-300" />
                  <span>Estimated Commute: <strong className="text-white">{commute.formattedTime}</strong> ({commute.distanceKm} km)</span>
                </div>
                <span className="text-[10px] text-zinc-400">From {userLocation.name.split('/')[0]}</span>
              </div>
            )}

            {/* Badges Row */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-md">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                {selectedJob.experienceLevel}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-md">
                <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                {selectedJob.workMode}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                {selectedJob.employmentType}
              </span>
              {selectedJob.isFresherEligible && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-700" />
                  Fresher Friendly
                </span>
              )}
              {selectedJob.salaryRange && (
                <span className="text-xs font-semibold text-zinc-900 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md">
                  {selectedJob.salaryRange}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 bg-zinc-100 px-2 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
                {selectedJob.verificationStatus}
              </span>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-left text-xs sm:text-sm text-zinc-700">
            
            {/* Overview */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2">
                Job Overview
              </h3>
              <p className="leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200/80">
                {selectedJob.descriptionSummary}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {selectedJob.keyResponsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-700 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2">
                Qualifications & Requirements
              </h3>
              <ul className="space-y-2">
                {selectedJob.qualifications.map((qual, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-zinc-700 flex-shrink-0 mt-0.5" />
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack / Skills */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-2">
                Required Tech Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Source & Verification Footer Box */}
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-500 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-zinc-700" />
                <span>Verified Source: <strong className="text-zinc-700">{selectedJob.source}</strong></span>
              </div>
              <span>Checked {selectedJob.lastVerifiedTime}</span>
            </div>

            {/* Report Button */}
            <div className="pt-1 flex justify-end">
              <button
                onClick={() => {
                  setIsJobModalOpen(false);
                  openReportModal('job', selectedJob.id, selectedJob.title, company?.name || 'Kolkata Employer');
                }}
                className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1"
              >
                <Flag className="w-3.5 h-3.5 text-zinc-400" />
                <span>Report incorrect details or expired job</span>
              </button>
            </div>

          </div>

          {/* Sticky Modal Action Footer */}
          <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              onClick={() => setIsJobModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-200/70 border border-zinc-200 transition-colors"
            >
              Close
            </button>

            {selectedJob.applicationType === 'DIRECT_PLATFORM' ? (
              <button
                onClick={() => {
                  setIsJobModalOpen(false);
                  openApplyModal(selectedJob);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5 text-zinc-300" />
                <span>Apply Directly on Kolkata Job Map →</span>
              </button>
            ) : (
              <a
                href={selectedJob.applicationUrl || company?.careersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all"
              >
                <span>Apply on Official Careers Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
