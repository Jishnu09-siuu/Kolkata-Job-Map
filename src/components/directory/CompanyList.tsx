'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  GraduationCap, 
  Bookmark, 
  Search, 
  Train, 
  Car, 
  Bike, 
  Footprints,
  Briefcase,
  Send,
  ExternalLink,
  Sparkles,
  Layers,
  Filter,
  Plus
} from 'lucide-react';
import { JobListing, Company } from '@/types';

export const CompanyList: React.FC = () => {
  const { 
    filteredCompanies, 
    selectedCompany, 
    selectCompany, 
    selectedJob,
    selectJob,
    openApplyModal,
    toggleSaveCompany, 
    isCompanySaved,
    toggleSaveJob,
    isJobSaved,
    userLocation,
    commuteMode,
    getCommuteForLocation,
    setIsAdminModalOpen
  } = useApp();

  const [viewMode, setViewMode] = useState<'companies' | 'all_jobs'>('companies');

  const totalOpenings = filteredCompanies.reduce((acc, curr) => acc + curr.jobs.length, 0);
  const totalFreshers = filteredCompanies.reduce((acc, curr) => acc + curr.jobs.filter(j => j.isFresherEligible).length, 0);

  // Extract all jobs flattened from filtered companies
  const allFilteredJobs: { job: JobListing; company: Company }[] = filteredCompanies.flatMap(company => 
    company.jobs.map(job => ({ job, company }))
  );

  const CommuteIcon = commuteMode === 'driving' ? Car : commuteMode === 'two_wheeler' ? Bike : commuteMode === 'walking' ? Footprints : Train;

  return (
    <div className="h-full flex flex-col bg-white border-r border-zinc-200/80 overflow-hidden select-none">
      
      {/* Directory Top Bar */}
      <div className="p-3.5 sm:p-4 border-b border-zinc-200/80 bg-zinc-50/50 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-zinc-700" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              Kolkata Discovery
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-zinc-900 text-white shadow-2xs">
              {totalOpenings} Active Roles
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-zinc-200/80 text-zinc-800">
              {filteredCompanies.length} Companies
            </span>
          </div>
        </div>

        {/* View Mode Toggle: [Companies] vs [All Individual Jobs] */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-200/70 rounded-xl">
          <button
            onClick={() => setViewMode('companies')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'companies'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>By Company ({filteredCompanies.length})</span>
          </button>

          <button
            onClick={() => setViewMode('all_jobs')}
            className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'all_jobs'
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-zinc-600" />
            <span>All Jobs ({totalOpenings})</span>
          </button>
        </div>

        {/* Starting point context */}
        <div className="text-[10px] text-zinc-500 flex items-center gap-1 truncate pt-0.5">
          <CommuteIcon className="w-3 h-3 text-zinc-400 flex-shrink-0" />
          <span className="truncate">Commute times from: <strong className="text-zinc-700">{userLocation.name.split('/')[0]}</strong></span>
        </div>
      </div>

      {/* Directory Scrollable List */}
      <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 p-2 sm:p-3 space-y-1.5">
        
        {/* VIEW 1: BY COMPANIES */}
        {viewMode === 'companies' && (
          filteredCompanies.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-800 mb-1">No matching companies</h3>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-4">
                We couldn't find verified companies matching your current filters or commute radius in Kolkata.
              </p>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-zinc-300" />
                <span>Register New Kolkata Company</span>
              </button>
            </div>
          ) : (
            filteredCompanies.map((company) => {
              const isSelected = selectedCompany?.id === company.id;
              const primaryLocation = company.locations[0];
              const isSaved = isCompanySaved(company.id);

              const commute = primaryLocation 
                ? getCommuteForLocation(primaryLocation.latitude, primaryLocation.longitude) 
                : null;

              return (
                <div
                  key={company.id}
                  onClick={() => selectCompany(company, primaryLocation)}
                  className={`group relative p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-50/90 shadow-sm ring-1 ring-zinc-900/10'
                      : 'border-zinc-200/70 hover:border-zinc-300 hover:bg-zinc-50/60 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2.5">
                    
                    {/* Company Logo */}
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200/80 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Company Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 truncate group-hover:text-zinc-950">
                          {company.name}
                        </h3>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveCompany(company.id);
                          }}
                          className={`p-1 rounded-md transition-colors ${
                            isSaved 
                              ? 'text-zinc-900 bg-zinc-200/80' 
                              : 'text-zinc-300 hover:text-zinc-600 hover:bg-zinc-100'
                          }`}
                          title={isSaved ? 'Remove from saved' : 'Save company'}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      {/* Area & Commute */}
                      <div className="flex items-center justify-between gap-1 text-[11px] text-zinc-500 mt-0.5 truncate">
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-zinc-400 flex-shrink-0" />
                          <span className="truncate">{primaryLocation?.area || 'Kolkata'}</span>
                        </div>

                        {commute && (
                          <span className="font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded text-[10px] flex-shrink-0 flex items-center gap-0.5">
                            <CommuteIcon className="w-2.5 h-2.5" />
                            <span>{commute.formattedTime} ({commute.distanceKm}km)</span>
                          </span>
                        )}
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {company.hiringStatus === 'hiring' ? (
                          <span className="inline-flex items-center text-[10px] font-bold bg-zinc-900 text-white border border-zinc-900 px-1.5 py-0.5 rounded">
                            {company.activeJobCount} Active Roles
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded">
                            No active openings
                          </span>
                        )}

                        {company.fresherJobCount > 0 && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold bg-zinc-100 text-zinc-800 border border-zinc-200 px-1.5 py-0.5 rounded">
                            <GraduationCap className="w-3 h-3" />
                            <span>Fresher ({company.fresherJobCount})</span>
                          </span>
                        )}

                        <span className="text-[10px] font-medium text-zinc-500 bg-zinc-100/80 px-1.5 py-0.5 rounded">
                          {company.companyType}
                        </span>
                      </div>

                      {/* Active Job Preview Snippet */}
                      {company.jobs.length > 0 && (
                        <div className="mt-2 text-[11px] text-zinc-600 border-t border-zinc-100 pt-1.5 flex items-center justify-between">
                          <span className="truncate text-zinc-700 font-medium">
                            {company.jobs[0].title}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              );
            })
          )
        )}

        {/* VIEW 2: ALL INDIVIDUAL JOBS DIRECT LIST */}
        {viewMode === 'all_jobs' && (
          allFilteredJobs.length === 0 ? (
            <div className="p-8 text-center">
              <Briefcase className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-zinc-800">No active job listings found</h3>
              <p className="text-xs text-zinc-500 mt-1">Try relaxing search keywords or location filters.</p>
            </div>
          ) : (
            allFilteredJobs.map(({ job, company }) => {
              const isSelected = selectedJob?.id === job.id;
              const isSaved = isJobSaved(job.id);
              const primaryLoc = company.locations[0];
              const commute = primaryLoc ? getCommuteForLocation(primaryLoc.latitude, primaryLoc.longitude) : null;

              return (
                <div
                  key={job.id}
                  onClick={() => selectJob(job)}
                  className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-50/90 shadow-sm ring-1 ring-zinc-900/10'
                      : 'border-zinc-200/70 hover:border-zinc-300 hover:bg-zinc-50/60 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-zinc-950 transition-colors leading-snug">
                        {job.title}
                      </h4>
                      <p className="text-xs text-zinc-600 font-medium mt-0.5 flex items-center gap-1.5">
                        <span>{company.name}</span>
                        <span className="text-zinc-300">/</span>
                        <span className="text-zinc-500 text-[11px] flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          {job.locationArea}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                      className={`p-1 rounded-md transition-colors ${
                        isSaved ? 'text-zinc-900 bg-zinc-200/80' : 'text-zinc-300 hover:text-zinc-600'
                      }`}
                      title={isSaved ? 'Job saved' : 'Save job'}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                    <span className="bg-zinc-100 text-zinc-800 font-semibold px-2 py-0.5 rounded">
                      {job.experienceLevel}
                    </span>
                    {job.isFresherEligible && (
                      <span className="bg-zinc-100 text-zinc-800 font-semibold px-2 py-0.5 rounded border border-zinc-200 flex items-center gap-0.5">
                        <GraduationCap className="w-3 h-3" />
                        <span>Fresher</span>
                      </span>
                    )}
                    {job.salaryRange && (
                      <span className="bg-zinc-100 text-zinc-800 font-semibold px-2 py-0.5 rounded border border-zinc-200">
                        {job.salaryRange}
                      </span>
                    )}
                    {commute && (
                      <span className="bg-zinc-100 text-zinc-700 font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <CommuteIcon className="w-2.5 h-2.5" />
                        <span>{commute.formattedTime}</span>
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectJob(job);
                      }}
                      className="text-[11px] font-semibold text-zinc-600 hover:text-zinc-950 flex items-center gap-0.5"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>

                    {job.applicationType === 'DIRECT_PLATFORM' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openApplyModal(job);
                        }}
                        className="py-1 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                      >
                        <Send className="w-3 h-3 text-zinc-300" />
                        <span>Apply</span>
                      </button>
                    ) : (
                      <a
                        href={job.applicationUrl || company.careersUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-1 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                      >
                        <span>Apply</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )
        )}

      </div>

      {/* Directory Footer */}
      <div className="p-3 border-t border-zinc-200/80 bg-zinc-50 text-[11px] text-zinc-500 flex items-center justify-between">
        <button
          onClick={() => setIsAdminModalOpen(true)}
          className="flex items-center gap-1 font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-zinc-500" />
          <span>+ Register New Kolkata Office</span>
        </button>
        <span className="text-zinc-400">Sector V, New Town & CBD</span>
      </div>

    </div>
  );
};
