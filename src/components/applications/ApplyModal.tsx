'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Send, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  ShieldCheck, 
  Sparkles,
  Link as LinkIcon,
  Check,
  MapPin
} from 'lucide-react';

export const ApplyModal: React.FC = () => {
  const { 
    applyingJob, 
    closeApplyModal, 
    companies, 
    submitApplication,
    setIsApplicationsDrawerOpen 
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Kolkata, West Bengal');
  const [experienceYears, setExperienceYears] = useState('0-1 years');
  const [workModePreference, setWorkModePreference] = useState('Hybrid');
  const [currentRole, setCurrentRole] = useState('');
  const [skills, setSkills] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  if (!applyingJob) return null;

  const company = companies.find(c => c.id === applyingJob.companyId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['.pdf', '.docx', '.doc'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

      if (!validExtensions.includes(fileExt)) {
        setResumeError('Please upload a valid PDF or DOCX resume document.');
        setResumeFile(null);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setResumeError('File size must be under 5MB.');
        setResumeFile(null);
        return;
      }

      setResumeError('');
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Please fill out all required personal contact details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const application = await submitApplication({
        jobId: applyingJob.id,
        jobTitle: applyingJob.title,
        companyId: applyingJob.companyId,
        companyName: company?.name || 'Kolkata Tech Employer',
        companyLogo: company?.logo || '',
        applicantName: fullName,
        email,
        phone,
        currentLocation,
        experienceYears,
        workModePreference,
        currentRole: currentRole || 'Candidate',
        skills: skills || applyingJob.skills.slice(0, 3).join(', '),
        portfolioUrl,
        linkedinUrl,
        githubUrl,
        resumeFileName: resumeFile ? resumeFile.name : 'Resume_Applicant.pdf',
        applicationMethod: 'Direct on Kolkata Job Map',
      });

      setSubmittedCode(application.trackingCode);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={closeApplyModal}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-zinc-200 flex flex-col max-h-[92dvh]">
          
          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-950">
                Direct Job Application
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Kolkata Direct Talent Submission Protocol
              </p>
            </div>

            <button
              onClick={closeApplyModal}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Success Screen */}
          {submittedCode ? (
            <div className="p-6 sm:p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-7 h-7 stroke-[2.5]" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-zinc-950">
                  Application Successfully Submitted!
                </h3>
                <p className="text-xs text-zinc-600 mt-1 max-w-sm mx-auto">
                  Your application for <strong className="text-zinc-900">{applyingJob.title}</strong> has been transmitted to <strong className="text-zinc-900">{company?.name}</strong>.
                </p>
              </div>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 inline-block text-xs">
                <span className="text-zinc-500">Application Tracking Code:</span>
                <div className="font-mono font-bold text-zinc-900 text-sm tracking-wider mt-0.5">
                  {submittedCode}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    closeApplyModal();
                    setIsApplicationsDrawerOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-all shadow-sm"
                >
                  View in My Applications →
                </button>
                <button
                  onClick={closeApplyModal}
                  className="px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              
              {/* Job Target Confirmation Card */}
              <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">
                    Applying Position
                  </span>
                  <span className="font-bold text-zinc-950 text-sm">
                    {applyingJob.title}
                  </span>
                  <div className="text-zinc-600 text-[11px] mt-0.5 flex items-center gap-1">
                    <span>{company?.name}</span>
                    <span className="text-zinc-300">/</span>
                    <span className="flex items-center gap-0.5 text-zinc-500">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {applyingJob.locationArea}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] font-semibold text-zinc-900 bg-zinc-200 px-2 py-1 rounded">
                  {applyingJob.workMode}
                </div>
              </div>

              {/* Section 1: Contact Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  1. Applicant Information
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sourav Mukherjee"
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:border-zinc-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sourav.m@example.com"
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98300 12345"
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:border-zinc-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      Current City / Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      placeholder="e.g. Kolkata / Salt Lake / Howrah"
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Experience & Work Preference */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  2. Professional Background
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      Total Experience
                    </label>
                    <select
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="Fresher (0 years)">Fresher (0 years / 2024-2025 passout)</option>
                      <option value="0-1 years">0 - 1 years</option>
                      <option value="1-3 years">1 - 3 years</option>
                      <option value="3-5 years">3 - 5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      Work Mode Preference
                    </label>
                    <select
                      value={workModePreference}
                      onChange={(e) => setWorkModePreference(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="Hybrid">Hybrid (Kolkata Office + WFH)</option>
                      <option value="On-site">On-site (Kolkata Office)</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                    Key Technical Skills
                  </label>
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. React, TypeScript, Node.js, Python, SQL"
                    className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:border-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 3: Links */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  3. Portfolios & Profiles (Optional)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:border-zinc-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                      GitHub / Portfolio
                    </label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:border-zinc-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Resume Upload */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  4. Resume / CV Attachment *
                </h4>

                <div className="relative border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-xl p-4 text-center bg-zinc-50/60 hover:bg-zinc-50 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center">
                    <UploadCloud className="w-7 h-7 text-zinc-400 mb-1" />
                    {resumeFile ? (
                      <div className="text-xs font-semibold text-zinc-900 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>{resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-xs font-semibold text-zinc-800">
                          Click to upload or drag & drop resume
                        </span>
                        <span className="text-[10px] text-zinc-400 mt-0.5">
                          PDF or DOCX format (Max 5MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {resumeError && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{resumeError}</span>
                  </p>
                )}
              </div>

              {/* Screening Questions (if available) */}
              {applyingJob.screeningQuestions && applyingJob.screeningQuestions.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-zinc-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                    5. Employer Screening Question
                  </h4>
                  {applyingJob.screeningQuestions.map((q, idx) => (
                    <div key={idx}>
                      <label className="text-[11px] font-medium text-zinc-800 block mb-1">
                        {q}
                      </label>
                      <input
                        type="text"
                        placeholder="Your answer..."
                        className="w-full px-3 py-2 bg-zinc-50 rounded-lg border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Data Security & Consent Disclaimer */}
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-[11px] text-zinc-500 space-y-1">
                <div className="flex items-center gap-1 font-semibold text-zinc-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Applicant Privacy & Consent</span>
                </div>
                <p>
                  By submitting, you authorize Kolkata Job Map to securely transmit your resume and profile details directly to the hiring team at {company?.name}.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-100 border border-zinc-200 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-zinc-300" />
                      <span>Submit Application Now</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
