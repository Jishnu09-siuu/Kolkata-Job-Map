'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/header/Header';
import { CompanyList } from '@/components/directory/CompanyList';
import { FilterDrawer } from '@/components/filters/FilterDrawer';
import { CompanyDrawer } from '@/components/company/CompanyDrawer';
import { JobDetailModal } from '@/components/jobs/JobDetailModal';
import { ApplyModal } from '@/components/applications/ApplyModal';
import { MyApplicationsDrawer } from '@/components/dashboard/MyApplicationsDrawer';
import { SavedDrawer } from '@/components/dashboard/SavedDrawer';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { LiveSyncModal } from '@/components/sync/LiveSyncModal';
import { UserLocationModal } from '@/components/commute/UserLocationModal';
import { NotificationsDrawer } from '@/components/notifications/NotificationsDrawer';
import { CreateAlertModal } from '@/components/alerts/CreateAlertModal';
import { VerificationExplainerModal } from '@/components/verification/VerificationExplainerModal';
import { ReportIssueModal } from '@/components/reports/ReportIssueModal';
import { LiveHiringToast } from '@/components/notifications/LiveHiringToast';
import { useApp } from '@/context/AppContext';
import { Map, Layers, Building2, Search, SlidersHorizontal, GraduationCap, X, MapPin, Bell } from 'lucide-react';

// Dynamically import KolkataMap with SSR disabled to prevent Leaflet window errors
const DynamicKolkataMap = dynamic(
  () => import('@/components/map/KolkataMap').then((mod) => mod.KolkataMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50 text-zinc-500 font-sans">
        <div className="w-10 h-10 border-3 border-zinc-200 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
        <p className="text-xs font-semibold text-zinc-700">Loading Kolkata Map Engine...</p>
        <p className="text-[11px] text-zinc-400 mt-0.5">Plotting Sector V, New Town & CBD Corridors</p>
      </div>
    ),
  }
);

export default function Home() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const { 
    isMobileListOpen, 
    setIsMobileListOpen,
    filteredCompanies,
    setIsLocationModalOpen,
    isCompanyDrawerOpen,
    setIsCompanyDrawerOpen
  } = useApp();

  return (
    <main className="flex flex-col h-[100dvh] w-screen overflow-hidden bg-[#FAFAFA]">
      
      {/* Top Sticky Header */}
      <Header
        isFilterDrawerOpen={isFilterDrawerOpen}
        onToggleFilterDrawer={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
      />

      {/* Main Split Layout: [Sidebar Directory] + [Interactive Map] */}
      <div className="flex-1 flex relative overflow-hidden">
        
        {/* Left Sidebar Directory (Desktop: 380px/420px, Mobile: Sliding Drawer) */}
        <aside 
          className={`
            ${isMobileListOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            fixed md:relative inset-y-0 left-0 z-30 md:z-20
            w-full sm:w-[380px] lg:w-[420px] h-full
            transition-transform duration-300 ease-in-out
            bg-white shadow-2xl md:shadow-none
          `}
        >
          {/* Mobile close button inside sidebar */}
          <div className="md:hidden p-3 bg-zinc-900 text-white flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-zinc-300" />
              <span>Kolkata Directory ({filteredCompanies.length})</span>
            </span>
            <button
              onClick={() => setIsMobileListOpen(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 h-[calc(100%-48px)] md:h-full overflow-hidden">
            <CompanyList />
          </div>
        </aside>

        {/* Backdrop for mobile directory drawer */}
        {isMobileListOpen && (
          <div 
            onClick={() => setIsMobileListOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-20 md:hidden transition-opacity"
          />
        )}

        {/* Backdrop for mobile company detail drawer */}
        {isCompanyDrawerOpen && (
          <div 
            onClick={() => setIsCompanyDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-35 md:hidden transition-opacity"
          />
        )}

        {/* Hero Interactive Map Canvas */}
        <section className="flex-1 h-full w-full relative">
          <DynamicKolkataMap />

          {/* Mobile View Floating Bottom Action Bar */}
          <div className="md:hidden absolute bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-zinc-950/95 backdrop-blur-md text-white p-1.5 rounded-full shadow-2xl border border-zinc-800 max-w-[94vw]">
            <button
              onClick={() => setIsMobileListOpen(!isMobileListOpen)}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all whitespace-nowrap"
            >
              <Building2 className="w-3.5 h-3.5 text-zinc-300" />
              <span>{filteredCompanies.length} Roles</span>
            </button>
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-zinc-300" />
              <span>Locality</span>
            </button>
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 transition-all whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-300" />
              <span>Filters</span>
            </button>
          </div>
        </section>

      </div>

      {/* Drawers and Modals */}
      <FilterDrawer 
        isOpen={isFilterDrawerOpen} 
        onClose={() => setIsFilterDrawerOpen(false)} 
      />

      <CompanyDrawer />
      <JobDetailModal />
      <ApplyModal />
      <MyApplicationsDrawer />
      <SavedDrawer />
      <AdminPanel />
      <LiveSyncModal />
      <UserLocationModal />
      <NotificationsDrawer />
      <CreateAlertModal />
      <VerificationExplainerModal />
      <ReportIssueModal />
      <LiveHiringToast />

    </main>
  );
}
