'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Bookmark, 
  Send, 
  ShieldCheck, 
  MapPin, 
  X, 
  GraduationCap, 
  Briefcase,
  Layers,
  Activity,
  Bell,
  Train,
  Car,
  Bike,
  Footprints,
  Plus
} from 'lucide-react';
import { KOLKATA_AREAS } from '@/data/kolkataData';
import { CommuteMode } from '@/types';

interface HeaderProps {
  onToggleFilterDrawer: () => void;
  isFilterDrawerOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleFilterDrawer, 
  isFilterDrawerOpen 
}) => {
  const { 
    filters, 
    updateFilter, 
    resetFilters,
    filteredCompanies, 
    syncStats,
    savedCompanies,
    savedJobs,
    userApplications,
    userLocation,
    commuteMode,
    setCommuteMode,
    unreadNotificationCount,
    setIsLocationModalOpen,
    setIsNotificationsDrawerOpen,
    setIsCreateAlertModalOpen,
    setIsSavedDrawerOpen,
    setIsApplicationsDrawerOpen,
    setIsAdminModalOpen,
    setIsLiveSyncModalOpen,
    isMobileListOpen,
    setIsMobileListOpen,
    flyToLocation,
  } = useApp();

  const totalSaved = savedCompanies.length + savedJobs.length;
  const activeFilterCount = (filters.fresherOnly ? 1 : 0) + 
    (filters.internshipOnly ? 1 : 0) + 
    (filters.hiringOnly ? 1 : 0) + 
    (filters.companyType !== 'ALL' ? 1 : 0) + 
    (filters.category !== 'ALL' ? 1 : 0) + 
    (filters.experience !== 'ALL' ? 1 : 0) + 
    (filters.workMode !== 'ALL' ? 1 : 0) + 
    (filters.area !== 'ALL' ? 1 : 0) +
    (filters.maxCommuteTime !== 'ALL' ? 1 : 0);

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const area = e.target.value;
    updateFilter('area', area === 'All Kolkata Hubs' ? 'ALL' : area);

    if (area.includes('Sector V')) {
      flyToLocation(22.5765, 88.4343, 15);
    } else if (area.includes('New Town Action Area II')) {
      flyToLocation(22.6072, 88.4682, 14);
    } else if (area.includes('New Town Action Area I')) {
      flyToLocation(22.5936, 88.4712, 15);
    } else if (area.includes('New Town Action Area III')) {
      flyToLocation(22.5841, 88.4830, 14);
    } else if (area.includes('Park Street')) {
      flyToLocation(22.5532, 88.3524, 15);
    } else if (area.includes('Kasba')) {
      flyToLocation(22.5147, 88.3932, 15);
    } else if (area.includes('Topsia')) {
      flyToLocation(22.5401, 88.3887, 15);
    } else if (area.includes('Bantala')) {
      flyToLocation(22.5186, 88.4410, 14);
    } else {
      flyToLocation(22.5800, 88.4450, 13);
    }
  };

  const nextCommuteMode = () => {
    const modes: CommuteMode[] = ['transit', 'driving', 'two_wheeler', 'walking'];
    const nextIdx = (modes.indexOf(commuteMode) + 1) % modes.length;
    setCommuteMode(modes[nextIdx]);
  };

  const CommuteIcon = commuteMode === 'driving' ? Car : commuteMode === 'two_wheeler' ? Bike : commuteMode === 'walking' ? Footprints : Train;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-subtle px-3 sm:px-5 py-2.5">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Brand Title (No logo icon, no live badge) */}
        <div className="flex flex-col flex-shrink-0 select-none cursor-pointer">
          <span className="font-bold text-zinc-950 tracking-tight text-base sm:text-lg font-sans">
            Kolkata Job Map
          </span>
          <span className="text-[11px] font-medium text-zinc-400 -mt-0.5 hidden sm:block">
            Geospatial Tech Job Discovery
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-lg mx-1 sm:mx-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              placeholder="Search companies, roles (e.g. React, Python, TCS, AI)..."
              className="w-full pl-9 pr-8 py-2 bg-zinc-50 hover:bg-zinc-100/80 focus:bg-white text-xs sm:text-sm text-zinc-900 rounded-xl border border-zinc-200/90 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5 focus:outline-none transition-all placeholder:text-zinc-400"
            />
            {filters.searchQuery && (
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="absolute right-2.5 p-0.5 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-200/60"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Starting Location Quick Button (Desktop) */}
        <div className="hidden xl:flex items-center">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-800 transition-colors"
            title="Set your home / starting Kolkata locality"
          >
            <MapPin className="w-3.5 h-3.5 text-zinc-700" />
            <span className="truncate max-w-[120px]">{userLocation.name.split('/')[0]}</span>
          </button>
        </div>

        {/* Commute Mode Toggle (Desktop) */}
        <div className="hidden xl:flex items-center">
          <button
            onClick={nextCommuteMode}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-800 transition-colors"
            title="Click to toggle transit mode (Metro / Driving / Bike / Walk)"
          >
            <CommuteIcon className="w-3.5 h-3.5 text-zinc-700" />
            <span className="capitalize">{commuteMode.replace('_', ' ')}</span>
          </button>
        </div>

        {/* Action Controls & Indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          
          {/* Quick Fresher Mode Toggle */}
          <button
            onClick={() => updateFilter('fresherOnly', !filters.fresherOnly)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filters.fresherOnly
                ? 'bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900'
                : 'bg-zinc-100 hover:bg-zinc-200/70 text-zinc-700 border border-zinc-200'
            }`}
            title="Show only companies with fresher/entry-level openings"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fresher Mode</span>
          </button>

          {/* Filter Drawer Toggle */}
          <button
            onClick={onToggleFilterDrawer}
            className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isFilterDrawerOpen || activeFilterCount > 0
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-zinc-100 hover:bg-zinc-200/70 text-zinc-700 border border-zinc-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Smart Alerts & Notification Bell */}
          <button
            onClick={() => setIsNotificationsDrawerOpen(true)}
            className="relative p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200"
            title="Smart Notifications & Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Saved Items Button */}
          <button
            onClick={() => setIsSavedDrawerOpen(true)}
            className="relative p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200"
            title="Saved Companies, Jobs & Follows"
          >
            <Bookmark className="w-4 h-4" />
            {totalSaved > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center font-bold">
                {totalSaved}
              </span>
            )}
          </button>

          {/* My Applications Button */}
          <button
            onClick={() => setIsApplicationsDrawerOpen(true)}
            className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-medium shadow-sm transition-all"
            title="View My Applied Jobs"
          >
            <Send className="w-3.5 h-3.5 text-zinc-300" />
            <span className="hidden sm:inline">Applications</span>
            {userApplications.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-zinc-700 text-white text-[10px] flex items-center justify-center font-bold">
                {userApplications.length}
              </span>
            )}
          </button>

          {/* Admin Console Trigger */}
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
            title="Data Verification & Admin Console"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Mobile Directory Toggle */}
          <button
            onClick={() => setIsMobileListOpen(!isMobileListOpen)}
            className="md:hidden p-2 rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-200"
            title="Toggle Directory"
          >
            <Layers className="w-4 h-4" />
          </button>

        </div>
      </div>
    </header>
  );
};
