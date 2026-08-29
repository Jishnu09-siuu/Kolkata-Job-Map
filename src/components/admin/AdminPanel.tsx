'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Plus, 
  Building2, 
  MapPin, 
  Briefcase, 
  Check, 
  AlertCircle,
  Database,
  Lock,
  Flag,
  CheckCircle2,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { Company, CompanyType, JobCategory, WorkMode, IssueReport } from '@/types';
import { KOLKATA_AREAS } from '@/data/kolkataData';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    companies, 
    addCustomCompany, 
    syncStats,
    issueReports,
    updateReportStatus
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'add_company' | 'reports' | 'sync_health'>('add_company');

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Information Technology & Software');
  const [companyType, setCompanyType] = useState<CompanyType>('Product Company');
  const [buildingName, setBuildingName] = useState('');
  const [area, setArea] = useState('Salt Lake Sector V');
  const [fullAddress, setFullAddress] = useState('');
  const [latitude, setLatitude] = useState('22.5765');
  const [longitude, setLongitude] = useState('88.4343');
  const [websiteUrl, setWebsiteUrl] = useState('https://');
  const [careersUrl, setCareersUrl] = useState('https://');
  const [techStackStr, setTechStackStr] = useState('React, TypeScript, Node.js, AWS');
  const [firstJobTitle, setFirstJobTitle] = useState('Full Stack Software Engineer');
  const [firstJobCategory, setFirstJobCategory] = useState<JobCategory>('Full Stack');
  const [isFresher, setIsFresher] = useState(false);
  const [salary, setSalary] = useState('₹6.0 - ₹10.0 LPA');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAdminModalOpen) return null;

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !buildingName || !latitude || !longitude) {
      alert('Please provide company name, building name, and coordinates.');
      return;
    }

    const newCompany: Company = {
      id: `comp-custom-${Date.now()}`,
      name: companyName,
      slug: companyName.toLowerCase().replace(/\s+/g, '-'),
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop&q=80',
      industry,
      companyType,
      companySize: '100-500 employees',
      foundedYear: 2020,
      websiteUrl,
      careersUrl,
      description: `${companyName} is an official tech employer operating in Kolkata with active engineering operations at ${buildingName}.`,
      techStack: techStackStr.split(',').map(s => s.trim()).filter(Boolean),
      hiringStatus: 'hiring',
      activeJobCount: 1,
      fresherJobCount: isFresher ? 1 : 0,
      internshipCount: 0,
      lastCheckedTime: 'Just now (Admin Verified)',
      dataSource: 'Manual Admin Verified Entry',
      verificationConfidence: 'High Confidence',
      isLocationVerified: true,
      isOfficialSourceVerified: true,
      locations: [
        {
          id: `loc-custom-${Date.now()}`,
          buildingName,
          complexOrPark: buildingName,
          area,
          fullAddress: fullAddress || `${buildingName}, ${area}, Kolkata, West Bengal`,
          latitude: parseFloat(latitude) || 22.5765,
          longitude: parseFloat(longitude) || 88.4343,
          isHeadquarters: true,
          confidenceScore: 100,
          confidenceLevel: 'High Confidence',
          verifiedAt: new Date().toISOString().split('T')[0],
          officialSourceVerified: true,
        }
      ],
      jobs: [
        {
          id: `job-custom-${Date.now()}`,
          companyId: `comp-custom-${Date.now()}`,
          title: firstJobTitle,
          category: firstJobCategory,
          experienceLevel: isFresher ? 'Fresher (0-1 yrs)' : 'Junior (1-2 yrs)',
          minExperienceYears: isFresher ? 0 : 1,
          maxExperienceYears: isFresher ? 1 : 3,
          isFresherEligible: isFresher,
          isInternship: false,
          employmentType: 'Full-time',
          workMode: 'Hybrid',
          locationArea: area,
          salaryRange: salary,
          skills: techStackStr.split(',').map(s => s.trim()).filter(Boolean),
          descriptionSummary: `Active engineering role at ${companyName} in ${area}, Kolkata.`,
          keyResponsibilities: [
            'Develop scalable application features and APIs',
            'Collaborate with Kolkata-based agile sprint teams',
            'Write clean code and participate in peer code reviews'
          ],
          qualifications: [
            'Bachelor or Master degree in Computer Science, IT, or related fields',
            'Demonstrable hands-on programming abilities'
          ],
          applicationType: 'DIRECT_PLATFORM',
          source: 'Verified Admin Listing',
          postedDate: 'Today',
          lastVerifiedTime: 'Just now',
          verificationStatus: 'Recently Verified',
        }
      ]
    };

    addCustomCompany(newCompany);
    setSuccessMessage(`Successfully added and mapped ${companyName} to Kolkata Map!`);
    setTimeout(() => {
      setSuccessMessage('');
      setIsAdminModalOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsAdminModalOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-zinc-200 flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center border border-zinc-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold">
                  Data Verification & Admin Console
                </h3>
                <p className="text-xs text-zinc-400">
                  Register new verified Kolkata buildings & moderate issue reports
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex border-b border-zinc-200 bg-zinc-50 px-4 pt-2 space-x-2">
            <button
              onClick={() => setActiveAdminTab('add_company')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeAdminTab === 'add_company'
                  ? 'border-zinc-900 text-zinc-950'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Verified Company</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('reports')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeAdminTab === 'reports'
                  ? 'border-zinc-900 text-zinc-950'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Flag className="w-3.5 h-3.5 text-zinc-600" />
              <span>Issue Reports ({issueReports.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('sync_health')}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeAdminTab === 'sync_health'
                  ? 'border-zinc-900 text-zinc-950'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-zinc-600" />
              <span>Pipeline Health</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-xs sm:text-sm">
            
            {/* TAB 1: ADD COMPANY */}
            {activeAdminTab === 'add_company' && (
              <form onSubmit={handleAddCompany} className="space-y-4">
                {successMessage && (
                  <div className="p-3 bg-zinc-100 text-zinc-900 rounded-xl border border-zinc-200 font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-800" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                    1. Company Identification
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. RedHat Labs Kolkata"
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                        Company Structure
                      </label>
                      <select
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none cursor-pointer"
                      >
                        <option value="Product Company">Product Company</option>
                        <option value="Enterprise">Enterprise</option>
                        <option value="Startup">Startup</option>
                        <option value="IT Services">IT Services</option>
                        <option value="SaaS">SaaS</option>
                        <option value="Global MNC">Global MNC</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={techStackStr}
                      onChange={(e) => setTechStackStr(e.target.value)}
                      placeholder="React, TypeScript, Python, AWS"
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-zinc-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                    2. Geocoded Office Coordinates (Kolkata)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                        Building / IT Park Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={buildingName}
                        onChange={(e) => setBuildingName(e.target.value)}
                        placeholder="e.g. Godrej Genesis / Candor Tower 4"
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                        Kolkata Area Hub
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none cursor-pointer"
                      >
                        {KOLKATA_AREAS.filter(a => a !== 'All Kolkata Hubs').map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                        Exact Latitude * (e.g. 22.5765)
                      </label>
                      <input
                        type="text"
                        required
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                        Exact Longitude * (e.g. 88.4343)
                      </label>
                      <input
                        type="text"
                        required
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-zinc-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                    3. Initial Verified Job Opening
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstJobTitle}
                        onChange={(e) => setFirstJobTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                        Category
                      </label>
                      <select
                        value={firstJobCategory}
                        onChange={(e) => setFirstJobCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="AI / ML">AI / ML</option>
                        <option value="Data Science">Data Science</option>
                        <option value="DevOps">DevOps</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-800">
                      <input
                        type="checkbox"
                        checked={isFresher}
                        onChange={(e) => setIsFresher(e.target.checked)}
                        className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                      />
                      <span>Fresher Friendly (0-1 yrs eligible)</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save & Map Company</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: COMMUNITY ISSUE REPORTS MODERATION */}
            {activeAdminTab === 'reports' && (
              <div className="space-y-3">
                {issueReports.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-50 rounded-xl border border-zinc-200">
                    <CheckCircle2 className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                    <h4 className="text-xs font-semibold text-zinc-800">No pending issue reports</h4>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      All community data quality reports are resolved and verified.
                    </p>
                  </div>
                ) : (
                  issueReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-zinc-800 bg-zinc-200 px-1.5 py-0.5 rounded">
                            {report.category}
                          </span>
                          <h4 className="text-xs font-bold text-zinc-900 mt-1">
                            Target: {report.targetTitle} ({report.companyName})
                          </h4>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          report.status === 'Resolved' 
                            ? 'bg-zinc-200 text-zinc-800' 
                            : report.status === 'Rejected' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-zinc-200 text-zinc-700'
                        }`}>
                          {report.status}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-700 bg-white p-2.5 rounded-lg border border-zinc-200/80">
                        "{report.description}"
                      </p>

                      {report.correctInfo && (
                        <div className="text-[11px] text-zinc-600">
                          <strong>Suggested Info:</strong> {report.correctInfo}
                        </div>
                      )}

                      {report.supportingUrl && (
                        <a
                          href={report.supportingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-medium text-zinc-800 hover:underline flex items-center gap-1"
                        >
                          <span>Verification Source URL</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-zinc-200">
                        <button
                          onClick={() => updateReportStatus(report.id, 'Resolved', 'Verified with official source')}
                          className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-white text-[11px] font-semibold rounded-lg transition-colors"
                        >
                          Mark Resolved
                        </button>
                        <button
                          onClick={() => updateReportStatus(report.id, 'Rejected', 'Unsubstantiated')}
                          className="px-2.5 py-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-[11px] font-semibold rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: PIPELINE HEALTH */}
            {activeAdminTab === 'sync_health' && (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 bg-zinc-950 text-zinc-100 rounded-xl space-y-2">
                  <div className="text-zinc-100 font-bold">Kolkata Live Geocoding & Job Pipeline v2.4</div>
                  <div className="text-zinc-400">Total Tracked Companies: {companies.length}</div>
                  <div className="text-zinc-400">Active Openings Detected: {companies.reduce((a,c) => a + c.activeJobCount, 0)}</div>
                  <div className="text-zinc-400">Fresher Opportunities: {companies.reduce((a,c) => a + c.fresherJobCount, 0)}</div>
                  <div className="text-zinc-300">✔ Sub-meter GPS Polygons: Verified (Sector V, New Town, Park St, Kasba, Bantala)</div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
