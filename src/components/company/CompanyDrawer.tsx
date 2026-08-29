'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Building2, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Bookmark, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Navigation,
  Send,
  Sparkles,
  ChevronRight,
  Share2,
  Tag,
  UserCheck,
  UserPlus,
  Train,
  Car,
  Bike,
  Footprints,
  Flag,
  HelpCircle,
  Route
} from 'lucide-react';
import { JobListing, OfficeLocation } from '@/types';

export const CompanyDrawer: React.FC = () => {
  const { 
    selectedCompany, 
    selectedLocation,
    isCompanyDrawerOpen, 
    setIsCompanyDrawerOpen, 
    selectJob,
    openApplyModal,
    toggleSaveCompany, 
    isCompanySaved,
    toggleSaveJob,
    isJobSaved,
    flyToLocation,
    userLocation,
    commuteMode,
    getCommuteForLocation,
    showRouteOnMap,
    followedCompanies,
    toggleFollowCompany,
    isCompanyFollowed,
    openReportModal,
    setIsVerificationExplainerOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'jobs' | 'locations' | 'about'>('jobs');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isCompanyDrawerOpen || !selectedCompany) return null;

  const primaryLoc = selectedLocation || selectedCompany.locations[0];
  const isSaved = isCompanySaved(selectedCompany.id);
  const isFollowed = isCompanyFollowed(selectedCompany.id);

  // Commute calculations
  const commute = primaryLoc 
    ? getCommuteForLocation(primaryLoc.latitude, primaryLoc.longitude)
    : null;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const CommuteIcon = commuteMode === 'driving' ? Car : commuteMode === 'two_wheeler' ? Bike : commuteMode === 'walking' ? Footprints : Train;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[480px] lg:w-[520px] bg-white border-l border-zinc-200/90 shadow-2xl flex flex-col transition-all duration-300">
      
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/50 flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          
          {/* Logo & Company Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 overflow-hidden p-1 shadow-sm flex items-center justify-center flex-shrink-0">
              <img
                src={selectedCompany.logo}
                alt={selectedCompany.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-bold text-zinc-950 leading-snug">
                  {selectedCompany.name}
                </h2>
                <span className="text-[10px] font-semibold bg-zinc-200/80 text-zinc-800 px-1.5 py-0.5 rounded">
                  {selectedCompany.companyType}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                {selectedCompany.industry} / Est. {selectedCompany.foundedYear}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Follow Button */}
            <button
              onClick={() => toggleFollowCompany(selectedCompany.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                isFollowed
                  ? 'bg-zinc-900 text-white shadow-2xs'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100'
              }`}
              title={isFollowed ? 'Following company' : 'Follow for new job alerts'}
            >
              {isFollowed ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5 text-zinc-500" />
                  <span>+ Follow</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleSaveCompany(selectedCompany.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved 
                  ? 'bg-zinc-900 text-white border-zinc-900' 
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
              title={isSaved ? 'Saved to bookmarks' : 'Save company'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => setIsCompanyDrawerOpen(false)}
              className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {copiedLink && (
          <div className="mt-2 py-1 px-2.5 rounded-md bg-zinc-900 text-white text-[11px] text-center font-medium">
            Link copied to clipboard!
          </div>
        )}

        {/* Commute Distance & Travel Time Intelligence Bar */}
        {commute && primaryLoc && (
          <div className="mt-3 p-2.5 rounded-xl bg-zinc-900 text-white flex items-center justify-between gap-2 text-xs shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 text-zinc-300">
                <CommuteIcon className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[11px] sm:text-xs">
                  <span>{commute.formattedTime}</span>
                  <span className="text-zinc-300">/</span>
                  <span className="text-zinc-300 font-normal">{commute.distanceKm} km from {userLocation.name.split('/')[0]}</span>
                </div>
                <div className="text-[10px] text-zinc-400">
                  Estimated travel via {commuteMode.replace('_', ' ')}
                </div>
              </div>
            </div>

            <button
              onClick={() => showRouteOnMap(primaryLoc)}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold flex items-center gap-1 transition-all flex-shrink-0 shadow-2xs"
            >
              <Route className="w-3.5 h-3.5" />
              <span>Show Route</span>
            </button>
          </div>
        )}

        {/* Live Hiring Status Banner */}
        <div className="mt-2.5 p-3 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-zinc-950 uppercase tracking-tight">
              {selectedCompany.hiringStatus === 'hiring' ? 'Currently Hiring in Kolkata' : 'Hiring Detected'}
            </div>
            <div className="text-[11px] text-zinc-600">
              {selectedCompany.activeJobCount} verified active positions / Checked {selectedCompany.lastCheckedTime}
            </div>
          </div>
          <div className="text-[10px] font-medium text-zinc-500 bg-white/80 px-2 py-1 rounded border border-zinc-200">
            {selectedCompany.dataSource.length > 20 ? selectedCompany.dataSource.substring(0, 18) + '...' : selectedCompany.dataSource}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-200 mt-3 -mb-px">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'jobs'
                ? 'border-zinc-900 text-zinc-950'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Open Roles ({selectedCompany.jobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'locations'
                ? 'border-zinc-900 text-zinc-950'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Offices ({selectedCompany.locations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'border-zinc-900 text-zinc-950'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>
        </div>

      </div>

      {/* Drawer Body Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        
        {/* TAB 1: OPEN JOBS */}
        {activeTab === 'jobs' && (
          <div className="space-y-3">
            {selectedCompany.jobs.length === 0 ? (
              <div className="p-8 text-center bg-zinc-50 rounded-xl border border-zinc-200">
                <Briefcase className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-zinc-800">No active job listings found</h4>
                <p className="text-xs text-zinc-500 mt-1">
                  This company has an active Kolkata office, but no open requisitions were detected in this sync cycle.
                </p>
                <a
                  href={selectedCompany.careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold"
                >
                  <span>Visit Official Careers Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ) : (
              selectedCompany.jobs.map((job) => {
                const isJobSavedItem = isJobSaved(job.id);

                return (
                  <div
                    key={job.id}
                    className="p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition-all shadow-subtle"
                  >
                    {/* Job Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 leading-snug">
                          {job.title}
                        </h4>
                        <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1.5">
                          <span>{job.category}</span>
                          <span className="text-zinc-300">/</span>
                          <span>{job.locationArea}</span>
                          <span className="text-zinc-300">/</span>
                          <span className="font-medium text-zinc-700">{job.workMode}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-1.5 rounded-md transition-colors ${
                          isJobSavedItem
                            ? 'text-zinc-900 bg-zinc-100'
                            : 'text-zinc-300 hover:text-zinc-600 hover:bg-zinc-100'
                        }`}
                        title={isJobSavedItem ? 'Job bookmarked' : 'Save job'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded">
                        {job.experienceLevel}
                      </span>
                      
                      {job.isFresherEligible && (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-zinc-900 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded">
                          <GraduationCap className="w-3 h-3 text-zinc-700" />
                          Fresher Friendly
                        </span>
                      )}

                      {job.salaryRange && (
                        <span className="text-[11px] font-semibold text-zinc-900 bg-zinc-100/80 px-2 py-0.5 rounded">
                          {job.salaryRange}
                        </span>
                      )}

                      <span className="text-[10px] text-zinc-600 font-medium bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 rounded">
                        {job.verificationStatus}
                      </span>
                    </div>

                    {/* Skills Chips */}
                    <div className="flex items-center gap-1 mt-2.5 flex-wrap">
                      {job.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] text-zinc-600 bg-zinc-50 border border-zinc-200/80 px-2 py-0.5 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Job Card Footer & Direct Application Actions */}
                    <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => selectJob(job)}
                          className="text-xs font-medium text-zinc-600 hover:text-zinc-900 flex items-center gap-0.5"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openReportModal('job', job.id, job.title, selectedCompany.name)}
                          className="text-[10px] text-zinc-400 hover:text-zinc-600 flex items-center gap-0.5"
                          title="Report issue with this job"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>Report</span>
                        </button>
                      </div>

                      {job.applicationType === 'DIRECT_PLATFORM' ? (
                        <button
                          onClick={() => openApplyModal(job)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                          <Send className="w-3 h-3 text-zinc-300" />
                          <span>Apply Now →</span>
                        </button>
                      ) : (
                        <a
                          href={job.applicationUrl || selectedCompany.careersUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-all"
                        >
                          <span>Apply on Official Portal</span>
                          <ExternalLink className="w-3 h-3 text-zinc-500" />
                        </a>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: OFFICE LOCATIONS */}
        {activeTab === 'locations' && (
          <div className="space-y-3">
            <div className="text-xs text-zinc-500">
              Verified office addresses & real-world building locations in Kolkata.
            </div>

            {selectedCompany.locations.map((loc) => {
              const locCommute = getCommuteForLocation(loc.latitude, loc.longitude);

              return (
                <div
                  key={loc.id}
                  className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-zinc-700" />
                        <span>{loc.buildingName}</span>
                      </h4>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        {loc.complexOrPark} / {loc.area}
                      </p>
                    </div>

                    {loc.isHeadquarters && (
                      <span className="text-[10px] font-bold bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded">
                        Kolkata Main Campus
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-zinc-600 bg-white p-2.5 rounded-lg border border-zinc-200/80">
                    {loc.fullAddress}
                  </div>

                  <div className="p-2 bg-zinc-100 rounded-lg border border-zinc-200 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-zinc-900 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-700" />
                      {locCommute.formattedTime} ({locCommute.distanceKm} km)
                    </span>
                    <span className="text-zinc-600">From {userLocation.name.split('/')[0]}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[11px] text-zinc-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
                      <span>{loc.confidenceScore}% Geocoded Verified</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => showRouteOnMap(loc)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-800 hover:text-zinc-950 bg-white border border-zinc-200 px-2 py-1 rounded-lg hover:border-zinc-400"
                      >
                        <Route className="w-3 h-3 text-zinc-700" />
                        <span>Route</span>
                      </button>

                      <button
                        onClick={() => flyToLocation(loc.latitude, loc.longitude, 16)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg hover:border-zinc-400 shadow-2xs"
                      >
                        <Navigation className="w-3 h-3 text-zinc-700" />
                        <span>Focus</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: ABOUT COMPANY & TRUST */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            
            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-1.5">
                Overview
              </h4>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {selectedCompany.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-semibold text-zinc-900 uppercase tracking-wider mb-1.5">
                Core Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCompany.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust & Verification Section */}
            <div className="p-3.5 bg-zinc-100/70 rounded-xl border border-zinc-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-zinc-700" />
                  <span>Trust & Verification Audit</span>
                </h4>
                <button
                  onClick={() => setIsVerificationExplainerOpen(true)}
                  className="text-[11px] font-semibold text-zinc-800 hover:underline flex items-center gap-0.5"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>How we verify</span>
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-700">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Office Location Geocoded:</span>
                  </span>
                  <strong className="text-zinc-900 font-semibold">✓ Location Verified</strong>
                </div>

                <div className="flex items-center justify-between text-zinc-700">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Official Careers Source:</span>
                  </span>
                  <strong className="text-zinc-900 font-semibold">✓ Official Source</strong>
                </div>

                <div className="flex items-center justify-between text-zinc-700">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Hiring Data Freshness:</span>
                  </span>
                  <span className="text-zinc-600">Checked {selectedCompany.lastCheckedTime}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Table */}
            <div className="bg-zinc-50 rounded-xl p-3.5 border border-zinc-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-600">
                <span>Company Size:</span>
                <span className="font-semibold text-zinc-900">{selectedCompany.companySize}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Official Careers Portal:</span>
                <a
                  href={selectedCompany.careersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-800 hover:underline flex items-center gap-1"
                >
                  <span>careers.page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between text-zinc-600">
                <span>Website:</span>
                <a
                  href={selectedCompany.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-zinc-800 hover:underline flex items-center gap-1"
                >
                  <span>{selectedCompany.slug}.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Report Button */}
            <button
              onClick={() => openReportModal('company', selectedCompany.id, selectedCompany.name, selectedCompany.name)}
              className="w-full py-2 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Flag className="w-3.5 h-3.5 text-zinc-400" />
              <span>Report Incorrect Information / Moved Office</span>
            </button>

          </div>
        )}

      </div>

      {/* Drawer Sticky Footer */}
      <div className="p-3.5 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
          <span>Live Verified Kolkata Employer</span>
        </div>
        <a
          href={selectedCompany.careersUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-zinc-900 hover:text-zinc-700 flex items-center gap-1"
        >
          <span>Official Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
