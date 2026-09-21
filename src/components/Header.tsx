import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onOpenSOSModal: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenSOSModal,
  onOpenNotifications,
  onOpenProfile,
  notificationCount = 1
}) => {
  const getTitle = () => {
    switch (currentTab) {
      case 'chat':
        return 'Chat Companion';
      case 'checkin':
        return 'Check In';
      case 'safety':
        return 'Chat Companion';
      case 'journal':
        return 'Mindful Journal';
      case 'home':
      default:
        return 'Wellbeing Space';
    }
  };

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#0d1512]/85 backdrop-blur-xl border-b border-[#424844]/20 pt-safe">
      <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-headline-md text-2xl text-primary tracking-tight">
            {getTitle()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Emergency SOS Quick Trigger Pill */}
          <button
            id="header-sos-btn"
            onClick={onOpenSOSModal}
            className="h-8 px-2.5 rounded-full bg-error-container hover:bg-[#ffb4ab]/20 transition-all text-[#ffb4ab] flex items-center gap-1 text-xs font-bold tracking-wide animate-pulse cursor-pointer border border-[#ffb4ab]/30 shadow-sm"
            title="Emergency SOS Protocol"
          >
            <span className="material-symbols-outlined text-[16px]">sos</span>
            <span>SOS</span>
          </button>

          {/* Notifications Bell */}
          <button
            id="header-notifications-btn"
            onClick={onOpenNotifications}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface relative cursor-pointer"
            title="Reminders & Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-[#0d1512]"></span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            id="header-profile-btn"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
            title="Satwik's Profile"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
