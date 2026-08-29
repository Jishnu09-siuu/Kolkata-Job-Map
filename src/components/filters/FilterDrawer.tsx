'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  RotateCcw, 
  Check, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  MapPin, 
  Clock, 
  Laptop,
  CheckCircle2,
  Sparkles,
  Train,
  Car,
  Bike,
  Footprints,
  Navigation
} from 'lucide-react';
import { CompanyType, JobCategory, WorkMode, CommuteMode } from '@/types';
import { KOLKATA_AREAS } from '@/data/kolkataData';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMPANY_TYPES: CompanyType[] = [
  'Enterprise',
  'Product Company',
  'IT Services',
  'Startup',
  'SaaS',
  'Global MNC',
];

const JOB_CATEGORIES: JobCategory[] = [
  'Frontend',
  'Backend',
  'Full Stack',
  'AI / ML',
  'Data Science',
  'Cybersecurity',
  'DevOps',
  'Cloud',
  'Mobile',
  'UI/UX',
  'QA / Testing',
  'Internship',
];

const WORK_MODES: WorkMode[] = ['On-site', 'Hybrid', 'Remote'];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    filters, 
    updateFilter, 
    resetFilters, 
    filteredCompanies,
    userLocation,
    commuteMode,
    setCommuteMode,
    setIsLocationModalOpen
  } = useApp();

  if (!isOpen) return null;

  const CommuteIcon = commuteMode === 'driving' ? Car : commuteMode === 'two_wheeler' ? Bike : commuteMode === 'walking' ? Footprints : Train;

  return (
    <div className="fixed inset-0 z-40 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
                Discovery & Commute Filters
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Narrow companies & verified jobs across Kolkata
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            
            {/* Commute Time Intelligence Filter */}
            <div className="p-3.5 bg-zinc-900 text-white rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CommuteIcon className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                    Max Commute Radius
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="text-[11px] font-semibold text-zinc-300 hover:text-white hover:underline flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{userLocation.name.split('/')[0]} (Change)</span>
                </button>
              </div>

              {/* Commute Time Pills */}
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 'ALL', label: 'Any Distance' },
                  { value: '15', label: '≤ 15 min' },
                  { value: '30', label: '≤ 30 min' },
                  { value: '45', label: '≤ 45 min' },
                  { value: '60', label: '≤ 1 hour' },
                  { value: '90', label: '≤ 90 min' },
                ].map(item => (
                  <button
                    key={item.value}
                    onClick={() => updateFilter('maxCommuteTime', item.value as any)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                      filters.maxCommuteTime === item.value
                        ? 'border-white bg-white text-zinc-950 shadow-2xs font-bold'
                        : 'border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Priority Modes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
                Quick Discovery Modes
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateFilter('fresherOnly', !filters.fresherOnly)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    filters.fresherOnly
                      ? 'border-zinc-900 bg-zinc-100 text-zinc-950 ring-1 ring-zinc-900'
                      : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <GraduationCap className={`w-4 h-4 ${filters.fresherOnly ? 'text-zinc-900' : 'text-zinc-500'}`} />
                    {filters.fresherOnly && <Check className="w-3.5 h-3.5 text-zinc-900" />}
                  </div>
                  <span className="text-xs font-medium">Fresher Friendly</span>
                  <span className="text-[10px] text-zinc-500">0-1 yrs / Entry Level</span>
                </button>

                <button
                  onClick={() => updateFilter('hiringOnly', !filters.hiringOnly)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    filters.hiringOnly
                      ? 'border-zinc-900 bg-zinc-100 text-zinc-950 ring-1 ring-zinc-900'
                      : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <CheckCircle2 className={`w-4 h-4 ${filters.hiringOnly ? 'text-zinc-900' : 'text-zinc-500'}`} />
                    {filters.hiringOnly && <Check className="w-3.5 h-3.5 text-zinc-900" />}
                  </div>
                  <span className="text-xs font-medium">Currently Hiring</span>
                  <span className="text-[10px] text-zinc-500">Active positions now</span>
                </button>
              </div>

              <button
                onClick={() => updateFilter('internshipOnly', !filters.internshipOnly)}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  filters.internshipOnly
                    ? 'border-zinc-900 bg-zinc-100 text-zinc-950 ring-1 ring-zinc-900'
                    : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${filters.internshipOnly ? 'text-zinc-900' : 'text-zinc-500'}`} />
                  <span className="text-xs font-medium">Paid Internships Only</span>
                </div>
                {filters.internshipOnly && <Check className="w-3.5 h-3.5 text-zinc-900" />}
              </button>
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
                Experience Level
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'All Levels', value: 'ALL' },
                  { label: 'Fresher (0-1 yrs)', value: 'fresher' },
                  { label: '1 - 2 Years', value: '1-2' },
                  { label: '3 - 5 Years', value: '3-5' },
                  { label: '5+ Years (Senior)', value: '5+' },
                ].map(exp => (
                  <button
                    key={exp.value}
                    onClick={() => updateFilter('experience', exp.value as any)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                      filters.experience === exp.value
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
                Job Role / Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => updateFilter('category', 'ALL')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    filters.category === 'ALL'
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  All Categories
                </button>
                {JOB_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateFilter('category', cat)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      filters.category === cat
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Kolkata Region / IT Hub */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
                Kolkata Location / Hub
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {KOLKATA_AREAS.map(area => (
                  <button
                    key={area}
                    onClick={() => updateFilter('area', area === 'All Kolkata Hubs' ? 'ALL' : area)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left flex items-center justify-between border transition-all ${
                      (filters.area === 'ALL' && area === 'All Kolkata Hubs') || filters.area === area
                        ? 'border-zinc-900 bg-zinc-50 text-zinc-950 font-semibold'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{area}</span>
                    </div>
                    {((filters.area === 'ALL' && area === 'All Kolkata Hubs') || filters.area === area) && (
                      <Check className="w-3.5 h-3.5 text-zinc-950" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Company Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
                Company Structure
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => updateFilter('companyType', 'ALL')}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                    filters.companyType === 'ALL'
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  All Types
                </button>
                {COMPANY_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => updateFilter('companyType', type)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                      filters.companyType === type
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-900 uppercase tracking-wider block">
                Work Mode
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {WORK_MODES.map(mode => (
                  <button
                    key={mode}
                    onClick={() => updateFilter('workMode', filters.workMode === mode ? 'ALL' : mode)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-center border transition-all ${
                      filters.workMode === mode
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3">
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium shadow-sm transition-all text-center"
            >
              Show {filteredCompanies.length} Matching Companies
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
