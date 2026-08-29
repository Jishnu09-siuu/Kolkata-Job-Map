'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Bell, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Check, 
  Briefcase,
  Layers
} from 'lucide-react';
import { JobCategory } from '@/types';
import { KOLKATA_AREAS } from '@/data/kolkataData';

export const CreateAlertModal: React.FC = () => {
  const { 
    isCreateAlertModalOpen, 
    setIsCreateAlertModalOpen, 
    createJobAlert,
    setIsNotificationsDrawerOpen 
  } = useApp();

  const [alertTitle, setAlertTitle] = useState('React & Frontend Developer in Sector V');
  const [roleQuery, setRoleQuery] = useState('React Developer');
  const [category, setCategory] = useState<JobCategory | 'ALL'>('Frontend');
  const [experienceLevel, setExperienceLevel] = useState('Fresher (0-1 yrs)');
  const [fresherOnly, setFresherOnly] = useState(true);
  const [internshipOnly, setInternshipOnly] = useState(false);
  const [area, setArea] = useState('Salt Lake Sector V');
  const [maxCommuteMinutes, setMaxCommuteMinutes] = useState<string>('45');
  const [frequency, setFrequency] = useState<'instant' | 'daily' | 'weekly'>('instant');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);

  if (!isCreateAlertModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle || !roleQuery) {
      alert('Please fill out the alert title and search keywords.');
      return;
    }

    createJobAlert({
      alertTitle,
      roleQuery,
      category,
      experienceLevel,
      fresherOnly,
      internshipOnly,
      area,
      maxCommuteMinutes: maxCommuteMinutes === 'ALL' ? null : parseInt(maxCommuteMinutes, 10),
      frequency,
      emailAlerts,
      inAppAlerts,
      enabled: true,
    });

    setIsCreateAlertModalOpen(false);
    setIsNotificationsDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCreateAlertModalOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-zinc-200 p-5 sm:p-6 space-y-4 max-h-[92vh] flex flex-col">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-zinc-200 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
                <Bell className="w-5 h-5 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  Create Smart Job Alert
                </h3>
                <p className="text-xs text-zinc-500">
                  Receive instant notifications when matching verified Kolkata jobs are detected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCreateAlertModalOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm pr-1">
            
            <div>
              <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                Alert Name *
              </label>
              <input
                type="text"
                required
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
                placeholder="e.g. React Fresher in Sector V & New Town"
                className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none focus:border-zinc-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                  Target Keywords / Skills *
                </label>
                <input
                  type="text"
                  required
                  value={roleQuery}
                  onChange={(e) => setRoleQuery(e.target.value)}
                  placeholder="e.g. React, Python, Java"
                  className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Categories</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Full Stack">Full Stack</option>
                  <option value="AI / ML">AI / ML</option>
                  <option value="Data Science">Data Science</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                  Kolkata Area Hub
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none cursor-pointer"
                >
                  {KOLKATA_AREAS.map(a => (
                    <option key={a} value={a === 'All Kolkata Hubs' ? 'ALL' : a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                  Max Commute Time
                </label>
                <select
                  value={maxCommuteMinutes}
                  onChange={(e) => setMaxCommuteMinutes(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 rounded-xl border border-zinc-200 text-xs focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="ALL">Any Distance</option>
                  <option value="15">Under 15 minutes</option>
                  <option value="30">Under 30 minutes</option>
                  <option value="45">Under 45 minutes</option>
                  <option value="60">Under 1 hour</option>
                  <option value="90">Under 90 minutes</option>
                </select>
              </div>
            </div>

            {/* Fresher & Internship checks */}
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-800">
                <input
                  type="checkbox"
                  checked={fresherOnly}
                  onChange={(e) => setFresherOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-zinc-900 focus:ring-zinc-900"
                />
                <span>Fresher Friendly Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-800">
                <input
                  type="checkbox"
                  checked={internshipOnly}
                  onChange={(e) => setInternshipOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-zinc-900 focus:ring-zinc-900"
                />
                <span>Paid Internships Only</span>
              </label>
            </div>

            {/* Notification Frequency */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-100">
              <label className="text-[11px] font-semibold text-zinc-700 block">
                Notification Frequency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'instant' as const, label: 'Instant Match' },
                  { value: 'daily' as const, label: 'Daily Summary' },
                  { value: 'weekly' as const, label: 'Weekly Digest' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFrequency(item.value)}
                    className={`py-2 px-2 rounded-xl border text-center text-xs font-semibold transition-all ${
                      frequency === item.value
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-2xs'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700">
                <input
                  type="checkbox"
                  checked={inAppAlerts}
                  onChange={(e) => setInAppAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-zinc-900 focus:ring-zinc-800"
                />
                <span>In-app Notification Center</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-zinc-700">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-zinc-900 focus:ring-zinc-800"
                />
                <span>Email Notifications</span>
              </label>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsCreateAlertModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5 text-zinc-300" />
                <span>Activate Smart Alert</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
