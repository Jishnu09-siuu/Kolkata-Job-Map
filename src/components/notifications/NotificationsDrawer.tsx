'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Bell, 
  Sparkles, 
  Check, 
  Trash2, 
  Plus, 
  Briefcase, 
  Building2, 
  Clock, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  Send,
  GraduationCap
} from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const { 
    isNotificationsDrawerOpen, 
    setIsNotificationsDrawerOpen, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    jobAlerts,
    toggleJobAlert,
    deleteJobAlert,
    setIsCreateAlertModalOpen,
    companies,
    selectCompany,
    selectJob,
    flyToLocation
  } = useApp();

  const [activeTab, setActiveTab] = useState<'notifications' | 'alerts'>('notifications');

  if (!isNotificationsDrawerOpen) return null;

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.companyId) {
      const comp = companies.find(c => c.id === notif.companyId);
      if (comp) {
        setIsNotificationsDrawerOpen(false);
        selectCompany(comp);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsNotificationsDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
                <Bell className="w-4 h-4 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-zinc-950">
                  Notification Center
                </h3>
                <p className="text-xs text-zinc-500">
                  Real-time job matching & employer intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsNotificationsDrawerOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 pt-2 bg-white">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('notifications')}
                className={`pb-2.5 px-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'notifications'
                    ? 'border-zinc-900 text-zinc-950'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <span>Live Feed</span>
              </button>

              <button
                onClick={() => setActiveTab('alerts')}
                className={`pb-2.5 px-2.5 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'alerts'
                    ? 'border-zinc-900 text-zinc-950'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <span>My Alerts ({jobAlerts.length})</span>
              </button>
            </div>

            {activeTab === 'notifications' && notifications.length > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] text-zinc-500 hover:text-zinc-900 font-medium pb-2"
              >
                Mark all as read
              </button>
            )}

            {activeTab === 'alerts' && (
              <button
                onClick={() => setIsCreateAlertModalOpen(true)}
                className="text-[11px] font-bold text-zinc-900 hover:text-zinc-700 flex items-center gap-1 pb-2"
              >
                <Plus className="w-3 h-3" />
                <span>New Alert</span>
              </button>
            )}
          </div>

          {/* List Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            
            {/* TAB 1: NOTIFICATIONS FEED */}
            {activeTab === 'notifications' && (
              notifications.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
                  <Bell className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                  <h4 className="text-xs font-semibold text-zinc-800">No notifications yet</h4>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    When matching opportunities or followed companies start hiring, alerts will appear here.
                  </p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      notif.read
                        ? 'border-zinc-200 bg-white hover:bg-zinc-50/70'
                        : 'border-zinc-300 bg-zinc-100/70 hover:bg-zinc-100 ring-1 ring-zinc-400/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug">
                          {notif.title}
                        </h4>
                      </div>
                      <span className="text-[10px] text-zinc-400 flex-shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                      {notif.message}
                    </p>

                    {notif.commuteInfo && (
                      <div className="mt-2 text-[11px] font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-md inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        <span>{notif.commuteInfo}</span>
                      </div>
                    )}

                    <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-semibold text-zinc-700">
                      <span>View Opportunity</span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                  </div>
                ))
              )
            )}

            {/* TAB 2: MY ALERTS */}
            {activeTab === 'alerts' && (
              jobAlerts.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                  <Sparkles className="w-8 h-8 text-zinc-300 mx-auto" />
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-800">No active job alerts</h4>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Set up custom alerts for your desired roles, skills, and maximum commute times in Kolkata.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCreateAlertModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Your First Alert</span>
                  </button>
                </div>
              ) : (
                jobAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3.5 rounded-xl border space-y-2.5 transition-all ${
                      alert.enabled
                        ? 'border-zinc-200 bg-white shadow-2xs'
                        : 'border-zinc-200 bg-zinc-50 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                            {alert.alertTitle}
                          </h4>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            alert.enabled 
                              ? 'bg-zinc-900 text-white border border-zinc-900' 
                              : 'bg-zinc-200 text-zinc-600'
                          }`}>
                            {alert.enabled ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          Keywords: <strong className="text-zinc-700">{alert.roleQuery}</strong> / {alert.frequency}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteJobAlert(alert.id)}
                        className="p-1 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete alert"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                      {alert.area !== 'ALL' && (
                        <span className="bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          {alert.area}
                        </span>
                      )}
                      {alert.maxCommuteMinutes && (
                        <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-700" />
                          Under {alert.maxCommuteMinutes} min commute
                        </span>
                      )}
                      {alert.fresherOnly && (
                        <span className="bg-zinc-100 text-zinc-800 border border-zinc-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-zinc-700" />
                          Fresher Friendly
                        </span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                      <button
                        onClick={() => toggleJobAlert(alert.id)}
                        className="text-xs font-semibold text-zinc-700 hover:text-zinc-950"
                      >
                        {alert.enabled ? 'Pause Alert' : 'Resume Alert'}
                      </button>

                      <span className="text-[10px] text-zinc-400">
                        {alert.matchCount || 2} matches detected
                      </span>
                    </div>
                  </div>
                ))
              )
            )}

          </div>

          {/* Footer */}
          <div className="p-3.5 border-t border-zinc-200 bg-zinc-50 text-xs text-zinc-500 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              <span>Smart Match Engine Active</span>
            </div>
            <button
              onClick={() => setIsCreateAlertModalOpen(true)}
              className="font-bold text-zinc-900 hover:text-zinc-700 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Add Alert</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
