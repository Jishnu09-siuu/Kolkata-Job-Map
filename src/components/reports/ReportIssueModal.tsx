'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Flag, 
  Check, 
  AlertCircle, 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { ReportCategory } from '@/types';

const COMPANY_ISSUE_CATEGORIES: ReportCategory[] = [
  'Incorrect company location',
  'Company office has moved',
  'Company office is closed',
  'Incorrect company information',
  'Duplicate company listing',
  'Company does not operate at this location',
  'Other issue',
];

const JOB_ISSUE_CATEGORIES: ReportCategory[] = [
  'Job is no longer available',
  'Incorrect job title',
  'Incorrect experience requirement',
  'Broken application link',
  'Duplicate job',
  'Misleading hiring information',
  'Other issue',
];

export const ReportIssueModal: React.FC = () => {
  const { 
    reportingTarget, 
    closeReportModal, 
    submitIssueReport 
  } = useApp();

  const [category, setCategory] = useState<ReportCategory>('Incorrect company location');
  const [description, setDescription] = useState('');
  const [correctInfo, setCorrectInfo] = useState('');
  const [supportingUrl, setSupportingUrl] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!reportingTarget) return null;

  const categories = reportingTarget.type === 'company' ? COMPANY_ISSUE_CATEGORIES : JOB_ISSUE_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) {
      alert('Please describe what is incorrect.');
      return;
    }

    submitIssueReport({
      targetType: reportingTarget.type,
      targetId: reportingTarget.id,
      targetTitle: reportingTarget.title,
      companyName: reportingTarget.companyName,
      category,
      description,
      correctInfo,
      supportingUrl,
      reporterEmail,
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setDescription('');
    setCorrectInfo('');
    setSupportingUrl('');
    closeReportModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-zinc-200 p-5 sm:p-6 space-y-4 max-h-[92vh] flex flex-col">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-zinc-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <Flag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  Report Incorrect Information
                </h3>
                <p className="text-xs text-zinc-500">
                  Help us maintain 100% verified Kolkata company & job accuracy
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Success screen */}
          {isSubmitted ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-bold text-zinc-900">
                Thank You for Your Report
              </h3>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                Your feedback regarding <strong className="text-zinc-900">{reportingTarget.title}</strong> has been logged into our admin moderation queue. Our team will verify this against official sources.
              </p>
              <button
                onClick={handleClose}
                className="mt-3 px-5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3.5 text-xs sm:text-sm pr-1">
              
              {/* Target info */}
              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Target Item</span>
                <div className="font-bold text-zinc-900 text-sm mt-0.5">{reportingTarget.title}</div>
                <div className="text-zinc-500 text-[11px]">{reportingTarget.companyName}</div>
              </div>

              {/* Issue Category */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                  What seems to be incorrect? *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. The company recently moved their development center from Salt Lake Sector V to Ecospace New Town..."
                  className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none focus:border-zinc-400"
                />
              </div>

              {/* Correct Info */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                  Correct Information (if known)
                </label>
                <input
                  type="text"
                  value={correctInfo}
                  onChange={(e) => setCorrectInfo(e.target.value)}
                  placeholder="e.g. Correct building name or new careers page link"
                  className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              {/* Supporting URL */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                  Supporting URL / Source (Optional)
                </label>
                <input
                  type="url"
                  value={supportingUrl}
                  onChange={(e) => setSupportingUrl(e.target.value)}
                  placeholder="https://company.com/contact-us"
                  className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all text-center"
                >
                  Submit Issue Report
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
