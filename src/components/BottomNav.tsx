import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#0d1512]/92 backdrop-blur-xl border-t border-[#424844]/25 shadow-[0_-1px_12px_rgba(0,0,0,0.4)]">
      <div className="flex justify-around items-center h-18 max-w-md mx-auto px-2">
        {/* Home */}
        <button
          id="nav-tab-home"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-all cursor-pointer rounded-xl ${
            currentTab === 'home'
              ? 'text-primary bg-primary-fixed/20'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="font-label-sm text-[11px] font-medium">Home</span>
        </button>

        {/* Chat */}
        <button
          id="nav-tab-chat"
          onClick={() => onSelectTab('chat')}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-all cursor-pointer rounded-xl ${
            currentTab === 'chat'
              ? 'text-primary bg-primary-fixed/20'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
          <span className="font-label-sm text-[11px] font-medium">Chat</span>
        </button>

        {/* Check-in */}
        <button
          id="nav-tab-checkin"
          onClick={() => onSelectTab('checkin')}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-all cursor-pointer rounded-xl ${
            currentTab === 'checkin'
              ? 'text-primary bg-primary-fixed/20'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">spa</span>
          <span className="font-label-sm text-[11px] font-medium">Check-in</span>
        </button>

        {/* Journal */}
        <button
          id="nav-tab-journal"
          onClick={() => onSelectTab('journal')}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-all cursor-pointer rounded-xl ${
            currentTab === 'journal'
              ? 'text-primary bg-primary-fixed/20'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">book</span>
          <span className="font-label-sm text-[11px] font-medium">Journal</span>
        </button>

        {/* SOS / Safety Net */}
        <button
          id="nav-tab-safety"
          onClick={() => onSelectTab('safety')}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 transition-all cursor-pointer rounded-xl ${
            currentTab === 'safety'
              ? 'text-[#ffb4ab] bg-error-container/40'
              : 'text-[#ffb4ab]/80 hover:text-[#ffb4ab]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px] text-error">sos</span>
          <span className="font-label-sm text-[11px] font-medium text-error">SOS</span>
        </button>
      </div>
    </nav>
  );
};
