export type CompanyType = 
  | 'Enterprise' 
  | 'Product Company' 
  | 'IT Services' 
  | 'Startup' 
  | 'SaaS' 
  | 'Global MNC';

export type JobCategory = 
  | 'Frontend' 
  | 'Backend' 
  | 'Full Stack' 
  | 'AI / ML' 
  | 'Data Science' 
  | 'Cybersecurity' 
  | 'DevOps' 
  | 'Cloud' 
  | 'Mobile' 
  | 'UI/UX' 
  | 'QA / Testing' 
  | 'Internship';

export type ExperienceLevel = 
  | 'Fresher (0-1 yrs)' 
  | 'Junior (1-2 yrs)' 
  | 'Mid (3-5 yrs)' 
  | 'Senior (5+ yrs)';

export type WorkMode = 'On-site' | 'Hybrid' | 'Remote';

export type HiringStatus = 'hiring' | 'fresher_friendly' | 'not_hiring' | 'unverified';

export type ApplicationType = 
  | 'EXTERNAL_PORTAL'   // Official direct careers portal link
  | 'DIRECT_PLATFORM'   // Applied natively on Kolkata Job Map
  | 'INTEGRATED_ENDPOINT'; // Integrated partner endpoint

export type CommuteMode = 'transit' | 'driving' | 'two_wheeler' | 'walking';

export type VerificationConfidence = 'High Confidence' | 'Medium Confidence' | 'Low Confidence' | 'Needs Review';

export type JobVerificationStatus = 'Active' | 'Recently Verified' | 'Verification Pending' | 'Possibly Expired' | 'Expired';

export interface UserLocation {
  name: string;
  latitude: number;
  longitude: number;
  isCustomGps?: boolean;
}

export interface CommuteEstimate {
  distanceKm: number;
  transitMinutes: number;
  drivingMinutes: number;
  twoWheelerMinutes: number;
  walkingMinutes: number;
  activeMode: CommuteMode;
  formattedTime: string;
}

export interface OfficeLocation {
  id: string;
  buildingName: string;
  complexOrPark: string;
  area: string; // e.g. "Salt Lake Sector V", "New Town Action Area II", "Park Street", "Kasba", "Bantala SEZ"
  fullAddress: string;
  latitude: number;
  longitude: number;
  isHeadquarters: boolean;
  confidenceScore: number; // 0-100% verification confidence
  confidenceLevel: VerificationConfidence;
  verifiedAt: string;
  officialSourceVerified: boolean;
}

export interface JobListing {
  id: string;
  companyId: string;
  title: string;
  category: JobCategory;
  experienceLevel: ExperienceLevel;
  minExperienceYears: number;
  maxExperienceYears: number;
  isFresherEligible: boolean;
  isInternship: boolean;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  workMode: WorkMode;
  locationArea: string;
  salaryRange?: string;
  skills: string[];
  descriptionSummary: string;
  keyResponsibilities: string[];
  qualifications: string[];
  applicationType: ApplicationType;
  applicationUrl?: string; // Official portal link
  source: string; // e.g. "Official Careers Page", "TCS iON", "Greenhouse", "Workday"
  postedDate: string;
  lastVerifiedTime: string;
  verificationStatus: JobVerificationStatus;
  screeningQuestions?: string[];
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  industry: string;
  companyType: CompanyType;
  companySize: string; // e.g. "10,000+ employees", "500-1,000 employees"
  foundedYear: number;
  websiteUrl: string;
  careersUrl: string;
  description: string;
  techStack: string[];
  locations: OfficeLocation[];
  hiringStatus: HiringStatus;
  activeJobCount: number;
  fresherJobCount: number;
  internshipCount: number;
  lastCheckedTime: string;
  dataSource: string;
  verificationConfidence: VerificationConfidence;
  isLocationVerified: boolean;
  isOfficialSourceVerified: boolean;
  jobs: JobListing[];
}

export interface UserApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  applicantName: string;
  email: string;
  phone: string;
  currentLocation: string;
  experienceYears: string;
  workModePreference: string;
  currentRole?: string;
  skills: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeFileName: string;
  appliedAt: string;
  applicationMethod: 'Direct on Kolkata Job Map' | 'External Official Portal';
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Shortlisted' | 'Offer';
  trackingCode: string;
}

export interface SavedCompany {
  companyId: string;
  savedAt: string;
}

export interface SavedJob {
  jobId: string;
  savedAt: string;
}

export interface CompanyFollow {
  companyId: string;
  followedAt: string;
  notifyNewJobs: boolean;
  notifyFresherJobs: boolean;
}

export interface JobAlert {
  id: string;
  alertTitle: string;
  roleQuery: string;
  category: JobCategory | 'ALL';
  experienceLevel: string | 'ALL';
  fresherOnly: boolean;
  internshipOnly: boolean;
  area: string | 'ALL';
  maxCommuteMinutes: number | null; // e.g. 45
  frequency: 'instant' | 'daily' | 'weekly';
  emailAlerts: boolean;
  inAppAlerts: boolean;
  enabled: boolean;
  createdAt: string;
  lastTriggeredAt?: string;
  matchCount?: number;
}

export interface AppNotification {
  id: string;
  type: 'job_match' | 'company_update' | 'system';
  title: string;
  message: string;
  companyId?: string;
  companyName?: string;
  companyLogo?: string;
  jobId?: string;
  commuteInfo?: string;
  timestamp: string;
  read: boolean;
  linkText?: string;
}

export type ReportCategory = 
  | 'Incorrect company location'
  | 'Company office has moved'
  | 'Company office is closed'
  | 'Incorrect company information'
  | 'Duplicate company listing'
  | 'Company does not operate at this location'
  | 'Job is no longer available'
  | 'Incorrect job title'
  | 'Incorrect experience requirement'
  | 'Broken application link'
  | 'Duplicate job'
  | 'Misleading hiring information'
  | 'Other issue';

export interface IssueReport {
  id: string;
  targetType: 'company' | 'job';
  targetId: string;
  targetTitle: string;
  companyName: string;
  category: ReportCategory;
  description: string;
  correctInfo?: string;
  supportingUrl?: string;
  reporterEmail?: string;
  createdAt: string;
  status: 'Pending Review' | 'Under Review' | 'Verified' | 'Resolved' | 'Rejected';
  adminNotes?: string;
}

export interface FilterState {
  searchQuery: string;
  fresherOnly: boolean;
  internshipOnly: boolean;
  hiringOnly: boolean;
  companyType: CompanyType | 'ALL';
  category: JobCategory | 'ALL';
  experience: 'ALL' | 'fresher' | '1-2' | '3-5' | '5+';
  workMode: WorkMode | 'ALL';
  area: string | 'ALL';
  maxCommuteTime: 'ALL' | '15' | '30' | '45' | '60' | '90';
}

export interface SyncStats {
  companiesTracked: number;
  companiesWithActiveJobs: number;
  activeJobsDetected: number;
  fresherOpportunities: number;
  verifiedLocationsCount: number;
  lastSyncTimestamp: string;
  dataFreshnessString: string;
}
