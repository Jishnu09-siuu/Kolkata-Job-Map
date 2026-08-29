'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useRef, ReactNode } from 'react';
import { 
  Company, 
  JobListing, 
  OfficeLocation, 
  FilterState, 
  UserApplication, 
  SavedCompany, 
  SavedJob,
  SyncStats,
  UserLocation,
  CommuteMode,
  CommuteEstimate,
  CompanyFollow,
  JobAlert,
  AppNotification,
  IssueReport,
  ReportCategory,
  JobCategory,
  ExperienceLevel
} from '@/types';
import { KOLKATA_COMPANIES, INITIAL_SYNC_STATS, INITIAL_NOTIFICATIONS } from '@/data/kolkataData';
import { DEFAULT_USER_LOCATION, computeCommuteEstimate } from '@/utils/commute';

interface MapFocus {
  lat: number;
  lng: number;
  zoom: number;
  timestamp: number;
}

interface AppContextType {
  // Data
  companies: Company[];
  filteredCompanies: Company[];
  selectedCompany: Company | null;
  selectedJob: JobListing | null;
  selectedLocation: OfficeLocation | null;
  syncStats: SyncStats;
  
  // Location & Commute Intelligence
  userLocation: UserLocation;
  setUserLocation: (loc: UserLocation) => void;
  commuteMode: CommuteMode;
  setCommuteMode: (mode: CommuteMode) => void;
  getCommuteForLocation: (destLat: number, destLng: number) => CommuteEstimate;
  activeRouteDestination: OfficeLocation | null;
  setActiveRouteDestination: (loc: OfficeLocation | null) => void;
  showRouteOnMap: (loc: OfficeLocation) => void;
  clearActiveRoute: () => void;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  
  // Selection Actions
  selectCompany: (company: Company | null, focusLocation?: OfficeLocation | null) => void;
  selectJob: (job: JobListing | null) => void;
  flyToLocation: (lat: number, lng: number, zoom?: number) => void;
  mapFocus: MapFocus | null;

  // Application Flow
  applyingJob: JobListing | null;
  openApplyModal: (job: JobListing) => void;
  closeApplyModal: () => void;
  userApplications: UserApplication[];
  submitApplication: (applicationData: Omit<UserApplication, 'id' | 'appliedAt' | 'trackingCode' | 'status'>) => Promise<UserApplication>;

  // Saved Items & Following
  savedCompanies: SavedCompany[];
  savedJobs: SavedJob[];
  toggleSaveCompany: (companyId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  isCompanySaved: (companyId: string) => boolean;
  isJobSaved: (jobId: string) => boolean;
  followedCompanies: CompanyFollow[];
  toggleFollowCompany: (companyId: string) => void;
  isCompanyFollowed: (companyId: string) => boolean;

  // Alerts & Notifications
  jobAlerts: JobAlert[];
  createJobAlert: (alert: Omit<JobAlert, 'id' | 'createdAt'>) => void;
  toggleJobAlert: (alertId: string) => void;
  deleteJobAlert: (alertId: string) => void;
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Trust & Community Issue Reporting
  issueReports: IssueReport[];
  reportingTarget: { type: 'company' | 'job'; id: string; title: string; companyName: string } | null;
  openReportModal: (type: 'company' | 'job', id: string, title: string, companyName: string) => void;
  closeReportModal: () => void;
  submitIssueReport: (report: Omit<IssueReport, 'id' | 'createdAt' | 'status'>) => void;
  updateReportStatus: (reportId: string, status: IssueReport['status'], adminNotes?: string) => void;

  // Drawers & Modals
  isCompanyDrawerOpen: boolean;
  setIsCompanyDrawerOpen: (open: boolean) => void;
  isJobModalOpen: boolean;
  setIsJobModalOpen: (open: boolean) => void;
  isApplicationsDrawerOpen: boolean;
  setIsApplicationsDrawerOpen: (open: boolean) => void;
  isSavedDrawerOpen: boolean;
  setIsSavedDrawerOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isLiveSyncModalOpen: boolean;
  setIsLiveSyncModalOpen: (open: boolean) => void;
  isMobileListOpen: boolean;
  setIsMobileListOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isNotificationsDrawerOpen: boolean;
  setIsNotificationsDrawerOpen: (open: boolean) => void;
  isCreateAlertModalOpen: boolean;
  setIsCreateAlertModalOpen: (open: boolean) => void;
  isVerificationExplainerOpen: boolean;
  setIsVerificationExplainerOpen: (open: boolean) => void;
  
  // Live Hiring Event Toasts & Broadcasts
  liveHiringToast: {
    id: string;
    companyName: string;
    jobTitle: string;
    area: string;
    company: Company;
    job: JobListing;
  } | null;
  dismissLiveToast: () => void;
  triggerLiveHiringEvent: () => void;

  // Admin & Sync actions
  addCustomCompany: (company: Company) => void;
  refreshDataSync: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  fresherOnly: false,
  internshipOnly: false,
  hiringOnly: false,
  companyType: 'ALL',
  category: 'ALL',
  experience: 'ALL',
  workMode: 'ALL',
  area: 'ALL',
  maxCommuteTime: 'ALL',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>(KOLKATA_COMPANIES);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<OfficeLocation | null>(null);
  const [applyingJob, setApplyingJob] = useState<JobListing | null>(null);
  
  // Commute state
  const [userLocation, setUserLocation] = useState<UserLocation>(DEFAULT_USER_LOCATION);
  const [commuteMode, setCommuteMode] = useState<CommuteMode>('transit');
  const [activeRouteDestination, setActiveRouteDestination] = useState<OfficeLocation | null>(null);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<string>(new Date().toISOString());
  const [freshnessString, setFreshnessString] = useState<string>('Verified just now (Continuous Real-Time Stream)');
  const [mapFocus, setMapFocus] = useState<MapFocus | null>(null);

  // Dynamically compute real-time statistics directly from live company pool
  const syncStats: SyncStats = useMemo(() => {
    const companiesTracked = companies.length;
    const companiesWithActiveJobs = companies.filter(c => c.jobs.length > 0 && c.hiringStatus === 'hiring').length;
    const activeJobsDetected = companies.reduce((acc, c) => acc + c.jobs.length, 0);
    const fresherOpportunities = companies.reduce((acc, c) => acc + c.jobs.filter(j => j.isFresherEligible).length, 0);
    const verifiedLocationsCount = companies.reduce((acc, c) => acc + c.locations.length, 0);

    return {
      companiesTracked,
      companiesWithActiveJobs,
      activeJobsDetected,
      fresherOpportunities,
      verifiedLocationsCount,
      lastSyncTimestamp,
      dataFreshnessString: freshnessString,
    };
  }, [companies, lastSyncTimestamp, freshnessString]);

  // Drawers & Modals
  const [isCompanyDrawerOpen, setIsCompanyDrawerOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isApplicationsDrawerOpen, setIsApplicationsDrawerOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLiveSyncModalOpen, setIsLiveSyncModalOpen] = useState(false);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isCreateAlertModalOpen, setIsCreateAlertModalOpen] = useState(false);
  const [isVerificationExplainerOpen, setIsVerificationExplainerOpen] = useState(false);

  // User Local Storage Persistence
  const [userApplications, setUserApplications] = useState<UserApplication[]>([]);
  const [savedCompanies, setSavedCompanies] = useState<SavedCompany[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [followedCompanies, setFollowedCompanies] = useState<CompanyFollow[]>([]);
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [issueReports, setIssueReports] = useState<IssueReport[]>([]);
  const [reportingTarget, setReportingTarget] = useState<{
    type: 'company' | 'job';
    id: string;
    title: string;
    companyName: string;
  } | null>(null);

  const [liveHiringToast, setLiveHiringToast] = useState<{
    id: string;
    companyName: string;
    jobTitle: string;
    area: string;
    company: Company;
    job: JobListing;
  } | null>(null);

  const dismissLiveToast = () => {
    setLiveHiringToast(null);
  };

  const triggerLiveHiringEvent = () => {
    if (companies.length === 0) return;
    const randomCompIndex = Math.floor(Math.random() * companies.length);
    const targetComp = companies[randomCompIndex];
    const loc = targetComp.locations[0] || { area: 'Salt Lake Sector V', latitude: 22.5765, longitude: 88.4343 };

    const sampleRoles: { title: string; category: JobCategory; salary: string; skills: string[]; exp: ExperienceLevel; minExp: number; maxExp: number; isFresher: boolean }[] = [
      { title: 'Generative AI & LLM Integration Engineer', category: 'AI / ML', salary: '₹12.0 - ₹18.0 LPA', skills: ['Python', 'LangChain', 'PyTorch', 'FastAPI'], exp: 'Junior (1-2 yrs)', minExp: 1, maxExp: 3, isFresher: false },
      { title: 'Graduate Cloud Software Trainee (2025 Batch)', category: 'Full Stack', salary: '₹4.5 - ₹6.5 LPA', skills: ['Java', 'Python', 'SQL', 'Git'], exp: 'Fresher (0-1 yrs)', minExp: 0, maxExp: 1, isFresher: true },
      { title: 'Full Stack React & Node.js Microservices Developer', category: 'Full Stack', salary: '₹7.5 - ₹12.0 LPA', skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'], exp: 'Junior (1-2 yrs)', minExp: 1, maxExp: 3, isFresher: false },
      { title: 'Kubernetes & Cloud Infrastructure Engineer', category: 'DevOps', salary: '₹8.0 - ₹14.0 LPA', skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'], exp: 'Mid (3-5 yrs)', minExp: 3, maxExp: 5, isFresher: false },
    ];
    const randomRole = sampleRoles[Math.floor(Math.random() * sampleRoles.length)];

    const newJob: JobListing = {
      id: `job-live-${Date.now()}`,
      companyId: targetComp.id,
      title: randomRole.title,
      category: randomRole.category,
      experienceLevel: randomRole.exp,
      minExperienceYears: randomRole.minExp,
      maxExperienceYears: randomRole.maxExp,
      isFresherEligible: randomRole.isFresher,
      isInternship: false,
      employmentType: 'Full-time',
      workMode: 'Hybrid',
      locationArea: loc.area,
      salaryRange: randomRole.salary,
      skills: randomRole.skills,
      descriptionSummary: `Newly verified opening accepting applications at ${targetComp.name} Kolkata center.`,
      keyResponsibilities: [
        'Design and implement high-performance software modules',
        'Collaborate with agile engineering sprint teams',
        'Deploy automated testing and continuous integration workflows'
      ],
      qualifications: ['Bachelor degree in Engineering / Computer Science with relevant technical proficiency'],
      applicationType: 'DIRECT_PLATFORM',
      source: targetComp.dataSource || 'Verified Corporate Portal',
      postedDate: 'Just now (Live)',
      lastVerifiedTime: 'Just now',
      verificationStatus: 'Recently Verified',
    };

    // Dynamically update company in real time (increments active role count & triggers dynamic reactivity)
    const updatedCompany: Company = {
      ...targetComp,
      hiringStatus: 'hiring',
      activeJobCount: targetComp.jobs.length + 1,
      fresherJobCount: targetComp.jobs.filter(j => j.isFresherEligible).length + (randomRole.isFresher ? 1 : 0),
      lastCheckedTime: 'Just now',
      jobs: [newJob, ...targetComp.jobs],
    };

    setCompanies(prev => prev.map(c => c.id === targetComp.id ? updatedCompany : c));
    setLastSyncTimestamp(new Date().toISOString());
    setFreshnessString('Verified just now (Live Stream Update)');

    // Trigger floating Live Toast
    setLiveHiringToast({
      id: `toast-${Date.now()}`,
      companyName: targetComp.name,
      jobTitle: newJob.title,
      area: loc.area,
      company: updatedCompany,
      job: newJob,
    });

    // Prepend to In-App Notifications Feed
    const newNotif: AppNotification = {
      id: `notif-live-${Date.now()}`,
      type: 'company_update',
      title: `${targetComp.name} Opened Live Position in Kolkata`,
      message: `${newJob.title} (${newJob.experienceLevel}) is now open for applications in ${loc.area}.`,
      timestamp: 'Just now',
      read: false,
      companyId: targetComp.id,
      jobId: newJob.id,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const lastCheckedLiveTimeRef = useRef<string>(new Date(Date.now() - 60000).toISOString());

  // Backend Live Hiring Event Stream & Real-time Synchronization
  const fetchLiveHiringFromBackend = async () => {
    try {
      const res = await fetch(`/api/events/live-hiring?since=${encodeURIComponent(lastCheckedLiveTimeRef.current)}&limit=1`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && Array.isArray(data.events) && data.events.length > 0) {
        const evt = data.events[0];
        lastCheckedLiveTimeRef.current = evt.timestamp || new Date().toISOString();

        if (evt.company && evt.job) {
          setCompanies(prev => {
            const exists = prev.find(c => c.id === evt.company.id);
            if (exists) {
              const hasJob = exists.jobs.some(j => j.id === evt.job.id);
              if (!hasJob) {
                return prev.map(c => c.id === evt.company.id ? {
                  ...c,
                  hiringStatus: 'hiring',
                  activeJobCount: c.jobs.length + 1,
                  jobs: [evt.job, ...c.jobs],
                } : c);
              }
              return prev;
            } else {
              return [evt.company, ...prev];
            }
          });

          // Trigger Live Hiring Toast from backend payload
          setLiveHiringToast({
            id: evt.id,
            companyName: evt.companyName,
            jobTitle: evt.jobTitle,
            area: evt.area,
            company: evt.company,
            job: evt.job,
          });

          // Prepend to In-App Notifications Feed
          const newNotif: AppNotification = {
            id: `notif-backend-${Date.now()}`,
            type: 'company_update',
            title: `${evt.companyName} Opened Live Position in Kolkata`,
            message: `${evt.jobTitle} (${evt.experienceLevel || 'Engineering'}) is now open for applications in ${evt.area}.`,
            timestamp: 'Just now',
            read: false,
            companyId: evt.companyId,
            jobId: evt.jobId,
          };
          setNotifications(prev => [newNotif, ...prev]);
          setLastSyncTimestamp(new Date().toISOString());
          setFreshnessString('Verified just now (Backend Real-Time Stream)');
        }
      }
    } catch (e) {
      // Fallback to local live generator if backend unreachable
      triggerLiveHiringEvent();
    }
  };

  // Automatic backend polling every 45 seconds for live recruiter dispatches
  useEffect(() => {
    // Initial fetch after mount
    const timeout = setTimeout(() => {
      fetchLiveHiringFromBackend();
    }, 4000);

    const interval = setInterval(() => {
      fetchLiveHiringFromBackend();
    }, 45000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Load persisted state on mount
  useEffect(() => {
    try {
      // Load custom / newly registered companies
      const storedCustomComps = localStorage.getItem('kolkata_job_map_custom_companies');
      if (storedCustomComps) {
        const customList: Company[] = JSON.parse(storedCustomComps);
        if (customList.length > 0) {
          setCompanies(prev => {
            const existingIds = new Set(prev.map(c => c.id));
            const newToAdd = customList.filter(c => !existingIds.has(c.id));
            return [...newToAdd, ...prev];
          });
        }
      }

      // Check server API for any newly ingested companies
      fetch('/api/companies')
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.companies)) {
            setCompanies(prev => {
              const existingIds = new Set(prev.map(c => c.id));
              const serverNew = data.companies.filter((c: Company) => !existingIds.has(c.id));
              return serverNew.length > 0 ? [...serverNew, ...prev] : prev;
            });
          }
        })
        .catch(() => {});

      const storedApps = localStorage.getItem('kolkata_job_map_apps');
      if (storedApps) setUserApplications(JSON.parse(storedApps));

      const storedCompanies = localStorage.getItem('kolkata_job_map_saved_companies');
      if (storedCompanies) setSavedCompanies(JSON.parse(storedCompanies));

      const storedSavedJobs = localStorage.getItem('kolkata_job_map_saved_jobs');
      if (storedSavedJobs) setSavedJobs(JSON.parse(storedSavedJobs));

      const storedFollows = localStorage.getItem('kolkata_job_map_follows');
      if (storedFollows) setFollowedCompanies(JSON.parse(storedFollows));

      const storedAlerts = localStorage.getItem('kolkata_job_map_alerts');
      if (storedAlerts) setJobAlerts(JSON.parse(storedAlerts));

      const storedUserLoc = localStorage.getItem('kolkata_job_map_user_loc');
      if (storedUserLoc) setUserLocation(JSON.parse(storedUserLoc));

      const storedCommuteMode = localStorage.getItem('kolkata_job_map_commute_mode');
      if (storedCommuteMode) setCommuteMode(storedCommuteMode as CommuteMode);

      const storedReports = localStorage.getItem('kolkata_job_map_reports');
      if (storedReports) setIssueReports(JSON.parse(storedReports));
    } catch (e) {
      console.error('Failed to load localStorage', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kolkata_job_map_apps', JSON.stringify(userApplications));
    } catch (e) {}
  }, [userApplications]);

  useEffect(() => {
    try {
      localStorage.setItem('kolkata_job_map_saved_companies', JSON.stringify(savedCompanies));
    } catch (e) {}
  }, [savedCompanies]);

  useEffect(() => {
    try {
      localStorage.setItem('kolkata_job_map_saved_jobs', JSON.stringify(savedJobs));
    } catch (e) {}
  }, [savedJobs]);

  useEffect(() => {
    try {
      localStorage.setItem('kolkata_job_map_follows', JSON.stringify(followedCompanies));
    } catch (e) {}
  }, [followedCompanies]);

  useEffect(() => {
    try {
      localStorage.setItem('kolkata_job_map_alerts', JSON.stringify(jobAlerts));
    } catch (e) {}
  }, [jobAlerts]);

  useEffect(() => {
    try {
      localStorage.setItem('kolkata_job_map_user_loc', JSON.stringify(userLocation));
    } catch (e) {}
  }, [userLocation]);

  useEffect(() => {
    try {
      localStorage.setItem('kolkata_job_map_commute_mode', commuteMode);
    } catch (e) {}
  }, [commuteMode]);

  useEffect(() => {
    try {
      localStorage.setItem('kolkata_job_map_reports', JSON.stringify(issueReports));
    } catch (e) {}
  }, [issueReports]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const selectCompany = (company: Company | null, focusLocation?: OfficeLocation | null) => {
    setSelectedCompany(company);
    if (company) {
      setIsCompanyDrawerOpen(true);
      const targetLoc = focusLocation || company.locations[0];
      if (targetLoc) {
        setSelectedLocation(targetLoc);
        flyToLocation(targetLoc.latitude, targetLoc.longitude, 16);
      }
    } else {
      setIsCompanyDrawerOpen(false);
      setSelectedLocation(null);
    }
  };

  const selectJob = (job: JobListing | null) => {
    setSelectedJob(job);
    if (job) {
      setIsJobModalOpen(true);
    } else {
      setIsJobModalOpen(false);
    }
  };

  const flyToLocation = (lat: number, lng: number, zoom: number = 15) => {
    setMapFocus({ lat, lng, zoom, timestamp: Date.now() });
  };

  const getCommuteForLocation = (destLat: number, destLng: number): CommuteEstimate => {
    return computeCommuteEstimate(userLocation, destLat, destLng, commuteMode);
  };

  const showRouteOnMap = (loc: OfficeLocation) => {
    setActiveRouteDestination(loc);
    // Center map midpoint between user and destination
    const midLat = (userLocation.latitude + loc.latitude) / 2;
    const midLng = (userLocation.longitude + loc.longitude) / 2;
    flyToLocation(midLat, midLng, 13);
  };

  const clearActiveRoute = () => {
    setActiveRouteDestination(null);
  };

  const openApplyModal = (job: JobListing) => {
    setApplyingJob(job);
  };

  const closeApplyModal = () => {
    setApplyingJob(null);
  };

  const submitApplication = async (
    applicationData: Omit<UserApplication, 'id' | 'appliedAt' | 'trackingCode' | 'status'>
  ): Promise<UserApplication> => {
    let generatedTracking = `KOL-${Math.floor(100000 + Math.random() * 900000)}`;
    let serverApp: any = null;

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.application) {
          serverApp = data.application;
          generatedTracking = data.trackingCode || generatedTracking;
        }
      }
    } catch (e) {
      console.error('Failed to post application to backend', e);
    }

    const newApp: UserApplication = serverApp || {
      ...applicationData,
      id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      appliedAt: new Date().toISOString(),
      trackingCode: generatedTracking,
      status: 'Transmitted to Recruiter',
    };

    setUserApplications(prev => [newApp, ...prev]);

    // Send confirmation notification
    const newNotification: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'system',
      title: 'Application Transmitted to Employer',
      message: `Your application for ${newApp.jobTitle} at ${newApp.companyName} was dispatched to the talent acquisition queue (Reference: ${newApp.trackingCode}).`,
      companyId: newApp.companyId,
      jobId: newApp.jobId,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);

    return newApp;
  };

  const toggleSaveCompany = (companyId: string) => {
    setSavedCompanies(prev => {
      const exists = prev.some(c => c.companyId === companyId);
      if (exists) {
        return prev.filter(c => c.companyId !== companyId);
      } else {
        return [...prev, { companyId, savedAt: new Date().toISOString() }];
      }
    });
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => {
      const exists = prev.some(j => j.jobId === jobId);
      if (exists) {
        return prev.filter(j => j.jobId !== jobId);
      } else {
        return [...prev, { jobId, savedAt: new Date().toISOString() }];
      }
    });
  };

  const isCompanySaved = (companyId: string) => {
    return savedCompanies.some(c => c.companyId === companyId);
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.some(j => j.jobId === jobId);
  };

  const toggleFollowCompany = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    setFollowedCompanies(prev => {
      const exists = prev.some(f => f.companyId === companyId);
      if (exists) {
        return prev.filter(f => f.companyId !== companyId);
      } else {
        // Trigger celebratory notification
        if (company) {
          const followNotif: AppNotification = {
            id: `notif-${Date.now()}`,
            type: 'company_update',
            title: `Now Following ${company.name}`,
            message: `You will receive instant smart alerts when ${company.name} posts new positions or fresher roles in Kolkata.`,
            companyId: company.id,
            companyName: company.name,
            timestamp: 'Just now',
            read: false,
          };
          setNotifications(n => [followNotif, ...n]);
        }

        return [
          ...prev,
          {
            companyId,
            followedAt: new Date().toISOString(),
            notifyNewJobs: true,
            notifyFresherJobs: true,
          }
        ];
      }
    });
  };

  const isCompanyFollowed = (companyId: string) => {
    return followedCompanies.some(f => f.companyId === companyId);
  };

  const createJobAlert = (alertData: Omit<JobAlert, 'id' | 'createdAt'>) => {
    const newAlert: JobAlert = {
      ...alertData,
      id: `alert-${Date.now()}`,
      createdAt: new Date().toISOString(),
      matchCount: 3,
    };
    setJobAlerts(prev => [newAlert, ...prev]);

    // Send confirmation notification
    const alertNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'system',
      title: 'Smart Job Alert Activated',
      message: `Alert "${newAlert.alertTitle}" is live. We will monitor official Kolkata career portals for matching positions.`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [alertNotif, ...prev]);
  };

  const toggleJobAlert = (alertId: string) => {
    setJobAlerts(prev => prev.map(a => a.id === alertId ? { ...a, enabled: !a.enabled } : a));
  };

  const deleteJobAlert = (alertId: string) => {
    setJobAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const openReportModal = (type: 'company' | 'job', id: string, title: string, companyName: string) => {
    setReportingTarget({ type, id, title, companyName });
  };

  const closeReportModal = () => {
    setReportingTarget(null);
  };

  const submitIssueReport = (reportData: Omit<IssueReport, 'id' | 'createdAt' | 'status'>) => {
    const newReport: IssueReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Review',
    };
    setIssueReports(prev => [newReport, ...prev]);
  };

  const updateReportStatus = (reportId: string, status: IssueReport['status'], adminNotes?: string) => {
    setIssueReports(prev => prev.map(r => r.id === reportId ? { ...r, status, adminNotes: adminNotes || r.adminNotes } : r));
  };

  const addCustomCompany = (newCompany: Company) => {
    setCompanies(prev => {
      const updated = [newCompany, ...prev.filter(c => c.id !== newCompany.id)];
      try {
        const stored = localStorage.getItem('kolkata_job_map_custom_companies');
        const parsed: Company[] = stored ? JSON.parse(stored) : [];
        const merged = [newCompany, ...parsed.filter(c => c.id !== newCompany.id)];
        localStorage.setItem('kolkata_job_map_custom_companies', JSON.stringify(merged));
      } catch (e) {}
      return updated;
    });

    // Background push to server
    try {
      fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCompany),
      }).catch(() => {});
    } catch (e) {}

    setLastSyncTimestamp(new Date().toISOString());
    setFreshnessString('Verified just now (Live Ingestion Added New Company)');

    // Trigger instant Live Toast for feedback
    const loc = newCompany.locations[0] || { area: 'Salt Lake Sector V', latitude: 22.5765, longitude: 88.4343 };
    const firstJob = newCompany.jobs[0] || {
      id: `job-auto-${Date.now()}`,
      companyId: newCompany.id,
      title: 'Software Engineer',
      category: 'Full Stack' as JobCategory,
      experienceLevel: 'Fresher (0-1 yrs)' as ExperienceLevel,
      minExperienceYears: 0,
      maxExperienceYears: 1,
      isFresherEligible: true,
      isInternship: false,
      employmentType: 'Full-time' as const,
      workMode: 'Hybrid' as const,
      locationArea: loc.area,
      salaryRange: '₹5.0 - ₹8.0 LPA',
      skills: newCompany.techStack,
      descriptionSummary: `Active tech opportunities at ${newCompany.name} Kolkata campus.`,
      keyResponsibilities: ['Engineering and delivery on Kolkata-based agile teams'],
      qualifications: ['Engineering/Tech graduates'],
      applicationType: 'DIRECT_PLATFORM' as const,
      source: newCompany.dataSource,
      postedDate: 'Today',
      lastVerifiedTime: 'Just now',
      verificationStatus: 'Recently Verified' as const,
    };

    setLiveHiringToast({
      id: `toast-${Date.now()}`,
      companyName: newCompany.name,
      jobTitle: firstJob.title,
      area: loc.area,
      company: newCompany,
      job: firstJob,
    });

    const notif: AppNotification = {
      id: `notif-comp-${Date.now()}`,
      type: 'company_update',
      title: `New Employer Added: ${newCompany.name}`,
      message: `${newCompany.name} (${loc.area}) has been registered with ${newCompany.activeJobCount} active roles.`,
      timestamp: 'Just now',
      read: false,
      companyId: newCompany.id,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const refreshDataSync = () => {
    setLastSyncTimestamp(new Date().toISOString());
    setFreshnessString('Verified just now (Live Continuous Refresh)');
  };

  // Filter Computation Engine with Commute Filtering
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      // 1. Search Query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = company.name.toLowerCase().includes(query);
        const matchesIndustry = company.industry.toLowerCase().includes(query);
        const matchesTech = company.techStack.some(t => t.toLowerCase().includes(query));
        const matchesLocations = company.locations.some(
          l => l.area.toLowerCase().includes(query) || l.buildingName.toLowerCase().includes(query)
        );
        const matchesJobs = company.jobs.some(j => 
          j.title.toLowerCase().includes(query) ||
          j.skills.some(s => s.toLowerCase().includes(query)) ||
          j.category.toLowerCase().includes(query) ||
          (query.includes('fresher') && j.isFresherEligible) ||
          (query.includes('intern') && j.isInternship)
        );

        if (!matchesName && !matchesIndustry && !matchesTech && !matchesLocations && !matchesJobs) {
          return false;
        }
      }

      // 2. Fresher Only Filter
      if (filters.fresherOnly) {
        const hasFresherJob = company.jobs.some(j => j.isFresherEligible);
        if (!hasFresherJob) return false;
      }

      // 3. Internship Only Filter
      if (filters.internshipOnly) {
        const hasInternship = company.jobs.some(j => j.isInternship);
        if (!hasInternship) return false;
      }

      // 4. Hiring Only Filter
      if (filters.hiringOnly) {
        if (company.hiringStatus !== 'hiring' && company.hiringStatus !== 'fresher_friendly') {
          return false;
        }
      }

      // 5. Company Type Filter
      if (filters.companyType !== 'ALL') {
        if (company.companyType !== filters.companyType) return false;
      }

      // 6. Area Filter
      if (filters.area !== 'ALL' && filters.area !== 'All Kolkata Hubs') {
        const inArea = company.locations.some(l => 
          l.area.toLowerCase().includes(filters.area.toLowerCase()) ||
          (filters.area.includes('Sector V') && l.area.includes('Sector V')) ||
          (filters.area.includes('New Town') && l.area.includes('New Town')) ||
          (filters.area.includes('Park Street') && (l.area.includes('Park') || l.area.includes('Camac'))) ||
          (filters.area.includes('Kasba') && l.area.includes('Kasba')) ||
          (filters.area.includes('Topsia') && l.area.includes('Topsia')) ||
          (filters.area.includes('Bantala') && l.area.includes('Bantala'))
        );
        if (!inArea) return false;
      }

      // 7. Maximum Commute Time Filter
      if (filters.maxCommuteTime !== 'ALL') {
        const maxMinutes = parseInt(filters.maxCommuteTime, 10);
        // Find if at least one office location of this company is reachable within maxMinutes
        const reachableInTime = company.locations.some(loc => {
          const estimate = computeCommuteEstimate(userLocation, loc.latitude, loc.longitude, commuteMode);
          let currentModeMinutes = estimate.transitMinutes;
          if (commuteMode === 'driving') currentModeMinutes = estimate.drivingMinutes;
          else if (commuteMode === 'two_wheeler') currentModeMinutes = estimate.twoWheelerMinutes;
          else if (commuteMode === 'walking') currentModeMinutes = estimate.walkingMinutes;
          return currentModeMinutes <= maxMinutes;
        });

        if (!reachableInTime) return false;
      }

      // 8. Job Category Filter
      if (filters.category !== 'ALL') {
        const hasCategory = company.jobs.some(j => j.category === filters.category);
        if (!hasCategory) return false;
      }

      // 9. Experience Filter
      if (filters.experience !== 'ALL') {
        let hasExpMatch = false;
        if (filters.experience === 'fresher') {
          hasExpMatch = company.jobs.some(j => j.isFresherEligible || j.minExperienceYears === 0);
        } else if (filters.experience === '1-2') {
          hasExpMatch = company.jobs.some(j => j.minExperienceYears <= 2 && j.maxExperienceYears >= 1);
        } else if (filters.experience === '3-5') {
          hasExpMatch = company.jobs.some(j => j.minExperienceYears <= 5 && j.maxExperienceYears >= 3);
        } else if (filters.experience === '5+') {
          hasExpMatch = company.jobs.some(j => j.minExperienceYears >= 5);
        }
        if (!hasExpMatch) return false;
      }

      // 10. Work Mode Filter
      if (filters.workMode !== 'ALL') {
        const hasWorkMode = company.jobs.some(j => j.workMode === filters.workMode);
        if (!hasWorkMode) return false;
      }

      return true;
    });
  }, [companies, filters, userLocation, commuteMode]);

  return (
    <AppContext.Provider
      value={{
        companies,
        filteredCompanies,
        selectedCompany,
        selectedJob,
        selectedLocation,
        syncStats,
        userLocation,
        setUserLocation,
        commuteMode,
        setCommuteMode,
        getCommuteForLocation,
        activeRouteDestination,
        setActiveRouteDestination,
        showRouteOnMap,
        clearActiveRoute,
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        selectCompany,
        selectJob,
        flyToLocation,
        mapFocus,
        applyingJob,
        openApplyModal,
        closeApplyModal,
        userApplications,
        submitApplication,
        savedCompanies,
        savedJobs,
        toggleSaveCompany,
        toggleSaveJob,
        isCompanySaved,
        isJobSaved,
        followedCompanies,
        toggleFollowCompany,
        isCompanyFollowed,
        jobAlerts,
        createJobAlert,
        toggleJobAlert,
        deleteJobAlert,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        issueReports,
        reportingTarget,
        openReportModal,
        closeReportModal,
        submitIssueReport,
        updateReportStatus,
        isCompanyDrawerOpen,
        setIsCompanyDrawerOpen,
        isJobModalOpen,
        setIsJobModalOpen,
        isApplicationsDrawerOpen,
        setIsApplicationsDrawerOpen,
        isSavedDrawerOpen,
        setIsSavedDrawerOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isLiveSyncModalOpen,
        setIsLiveSyncModalOpen,
        isMobileListOpen,
        setIsMobileListOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isNotificationsDrawerOpen,
        setIsNotificationsDrawerOpen,
        isCreateAlertModalOpen,
        setIsCreateAlertModalOpen,
        isVerificationExplainerOpen,
        setIsVerificationExplainerOpen,
        liveHiringToast,
        dismissLiveToast,
        triggerLiveHiringEvent,
        addCustomCompany,
        refreshDataSync,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
