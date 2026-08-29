'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Bookmark, 
  Building2, 
  Briefcase, 
  MapPin, 
  Navigation, 
  Trash2, 
  Send, 
  ExternalLink,
  ChevronRight,
  Heart,
  BellRing,
  UserCheck
} from 'lucide-react';

export const SavedDrawer: React.FC = () => {
  const { 
    isSavedDrawerOpen, 
    setIsSavedDrawerOpen, 
    savedCompanies, 
    savedJobs, 
    followedCompanies,
    companies, 
    toggleSaveCompany, 
    toggleSaveJob,
    toggleFollowCompany,
    selectCompany,
    selectJob,
    openApplyModal,
    flyToLocation
  } = useApp();

  const [activeTab, setActiveTab] = useState<'companies' | 'jobs' | 'following'>('companies');

  if (!isSavedDrawerOpen) return null;

  const savedCompanyObjects = companies.filter(c => 
    savedCompanies.some(sc => sc.companyId === c.id)
  );

  const followedCompanyObjects = companies.filter(c => 
    followedCompanies.some(fc => fc.companyId === c.id)
  );

  const allJobs = companies.flatMap(c => c.jobs);
  const savedJobObjects = allJobs.filter(j => 
    savedJobs.some(sj => sj.jobId === j.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsSavedDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                <Bookmark className="w-4 h-4 fill-zinc-300 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950">
                  Saved & Followed
                </h3>
                <p className="text-xs text-zinc-500">
                  Track your favorite Kolkata offices, jobs & employers
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSavedDrawerOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-zinc-200 px-4 pt-2 bg-white space-x-1">
            <button
              onClick={() => setActiveTab('companies')}
              className={`pb-2.5 px-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'companies'
                  ? 'border-zinc-900 text-zinc-950'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Companies ({savedCompanies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('following')}
              className={`pb-2.5 px-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'following'
                  ? 'border-zinc-900 text-zinc-950'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Following ({followedCompanies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`pb-2.5 px-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'jobs'
                  ? 'border-zinc-900 text-zinc-950'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs ({savedJobs.length})</span>
            </button>
          </div>

          {/* List Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            
            {/* SAVED COMPANIES */}
            {activeTab === 'companies' && (
              savedCompanyObjects.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
                  <Bookmark className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                  <h4 className="text-xs font-semibold text-zinc-800">No saved companies</h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Click the bookmark icon on any company card to save it here.
                  </p>
                </div>
              ) : (
                savedCompanyObjects.map((company) => {
                  const loc = company.locations[0];

                  return (
                    <div
                      key={company.id}
                      className="p-3.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 shadow-2xs space-y-2.5 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-9 h-9 rounded-lg object-cover border border-zinc-200"
                          />
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                              {company.name}
                            </h4>
                            <p className="text-[11px] text-zinc-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-zinc-400" />
                              <span>{loc?.area || 'Kolkata'}</span>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSaveCompany(company.id)}
                          className="p-1 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            setIsSavedDrawerOpen(false);
                            selectCompany(company, loc);
                          }}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <Navigation className="w-3 h-3 text-zinc-300" />
                          <span>Fly to Office on Map</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )
            )}

            {/* FOLLOWING COMPANIES */}
            {activeTab === 'following' && (
              followedCompanyObjects.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                  <UserCheck className="w-8 h-8 text-zinc-300 mx-auto" />
                  <h4 className="text-xs font-semibold text-zinc-800">You are not following any companies</h4>
                  <p className="text-[11px] text-zinc-500">
                    Click "+ Follow Company" on any company drawer to get automated smart notifications when they post new roles.
                  </p>
                </div>
              ) : (
                followedCompanyObjects.map((company) => (
                  <div
                    key={company.id}
                    className="p-3.5 rounded-xl border border-zinc-200 bg-white shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-9 h-9 rounded-lg object-cover border border-zinc-200"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                            {company.name}
                          </h4>
                          <p className="text-[11px] text-zinc-500 flex items-center gap-1">
                            <span>{company.companyType}</span>
                            <span className="text-zinc-300">/</span>
                            <span>{company.activeJobCount} active roles</span>
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFollowCompany(company.id)}
                        className="p-1 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Unfollow company"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setIsSavedDrawerOpen(false);
                          selectCompany(company, company.locations[0]);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-800 text-xs font-semibold transition-all text-center"
                      >
                        View Open Positions
                      </button>
                    </div>
                  </div>
                ))
              )
            )}

            {/* SAVED JOBS */}
            {activeTab === 'jobs' && (
              savedJobObjects.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                  <Bookmark className="w-8 h-8 text-zinc-300 mx-auto" />
                  <h4 className="text-xs font-semibold text-zinc-800">No saved jobs yet</h4>
                  <p className="text-[11px] text-zinc-500">
                    Bookmark interesting job listings to compare commute times, requirements, and apply later.
                  </p>
                </div>
              ) : (
                savedJobObjects.map((job) => {
                  const company = companies.find(c => c.id === job.companyId);

                  return (
                    <div
                      key={job.id}
                      className="p-3.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 shadow-2xs space-y-2.5 transition-all"
                    >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 
                          onClick={() => selectJob(job)}
                          className="text-xs sm:text-sm font-bold text-zinc-900 hover:text-zinc-950 cursor-pointer"
                        >
                          {job.title}
                        </h4>
                        <p className="text-xs text-zinc-600 font-medium mt-0.5 flex items-center gap-1">
                          <span>{company?.name}</span>
                          <span className="text-zinc-300">/</span>
                          <span className="flex items-center gap-0.5 text-zinc-500">
                            <MapPin className="w-3 h-3 text-zinc-400" />
                            {job.locationArea}
                          </span>
                        </p>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className="p-1 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                      <span className="bg-zinc-100 text-zinc-800 font-semibold px-2 py-0.5 rounded">
                        {job.experienceLevel}
                      </span>
                      {job.salaryRange && (
                        <span className="bg-zinc-100 text-zinc-800 font-semibold px-2 py-0.5 rounded border border-zinc-200">
                          {job.salaryRange}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setIsSavedDrawerOpen(false);
                          selectJob(job);
                        }}
                        className="flex-1 py-1.5 px-3 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-800 text-xs font-semibold transition-all text-center"
                      >
                        View Details
                      </button>

                      {job.applicationType === 'DIRECT_PLATFORM' ? (
                        <button
                          onClick={() => {
                            setIsSavedDrawerOpen(false);
                            openApplyModal(job);
                          }}
                          className="py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <Send className="w-3 h-3 text-zinc-300" />
                          <span>Apply</span>
                        </button>
                      ) : (
                        <a
                          href={job.applicationUrl || company?.careersUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-2xs"
                        >
                          <span>Apply ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                  );
                })
              )
            )}

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 text-xs text-zinc-500 flex items-center justify-between">
            <span>Saved locally in your browser</span>
          </div>

        </div>
      </div>
    </div>
  );
};
