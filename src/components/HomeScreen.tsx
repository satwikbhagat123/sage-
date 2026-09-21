import React from 'react';
import { TabType, CheckInRecord, EmergencyContact } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenSOSModal: () => void;
  recentCheckIns: CheckInRecord[];
  contacts: EmergencyContact[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onOpenSOSModal,
  recentCheckIns,
  contacts
}) => {
  const latestCheckIn = recentCheckIns[0];

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-2 pb-28 gap-5">
      {/* Warm Personal Greeting */}
      <section className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-xs text-primary font-semibold tracking-wider uppercase">
            TODAY • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed/25 text-primary text-xs font-semibold">
            <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
            <span>4 Days Mindful</span>
          </div>
        </div>
        <h1 className="font-headline-md text-3xl text-on-surface font-normal">
          Good morning, Satwik
        </h1>
        <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
          How is your energy feeling today? Let's take a peaceful moment to ground yourself.
        </p>
      </section>

      {/* Mindful Daily Quote Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-high p-5 text-on-surface flex flex-col gap-3 shadow-sm border border-[#424844]/20">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-[20px]">format_quote</span>
          <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">Daily Anchor</span>
        </div>
        <p className="font-headline-sm text-lg text-on-surface font-normal italic leading-snug">
          "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor."
        </p>
        <span className="font-body-sm text-xs text-on-surface-variant self-end">
          — Thích Nhất Hạnh
        </span>
      </div>

      {/* Quick Check-in Call to Action Card */}
      <div className="rounded-2xl bg-surface-container-low border border-[#424844]/25 p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">spa</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base text-on-surface font-medium">
                Pause &amp; Daily Check-In
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant">
                {latestCheckIn ? `Last check-in: ${latestCheckIn.dateStr}` : 'Map your emotions & physical tension'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('checkin')}
            className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-xs font-semibold shadow-sm hover:opacity-90 cursor-pointer"
          >
            Check In
          </button>
        </div>

        {/* Quick mood preview buttons */}
        <div className="grid grid-cols-4 gap-2 pt-1 border-t border-[#424844]/20">
          <button
            onClick={() => onNavigateTab('checkin')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface hover:bg-surface-container transition-colors text-center border border-[#424844]/15 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">wb_sunny</span>
            <span className="text-[11px] text-on-surface font-medium">Calm</span>
          </button>
          <button
            onClick={() => onNavigateTab('checkin')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface hover:bg-surface-container transition-colors text-center border border-[#424844]/15 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">storm</span>
            <span className="text-[11px] text-on-surface font-medium">Busy</span>
          </button>
          <button
            onClick={() => onNavigateTab('checkin')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface hover:bg-surface-container transition-colors text-center border border-[#424844]/15 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">bed</span>
            <span className="text-[11px] text-on-surface font-medium">Fatigued</span>
          </button>
          <button
            onClick={() => onNavigateTab('checkin')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-surface hover:bg-surface-container transition-colors text-center border border-[#424844]/15 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">eco</span>
            <span className="text-[11px] text-on-surface font-medium">Anxious</span>
          </button>
        </div>
      </div>

      {/* Feature Grid / Jump Points */}
      <div className="grid grid-cols-2 gap-3">
        {/* Chat Companion Card */}
        <div
          onClick={() => onNavigateTab('chat')}
          className="rounded-2xl bg-surface-container-low border border-[#424844]/25 p-4 flex flex-col justify-between gap-3 shadow-sm hover:border-primary/40 hover:bg-surface-container transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-primary-fixed/30 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          </div>
          <div>
            <h4 className="font-headline-sm text-base text-on-surface font-medium">Chat with Sage</h4>
            <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 line-clamp-2">
              "Kya hua abhi? Anxiety kisi specific cheez ki wajah se start hui hai?"
            </p>
          </div>
          <span className="text-primary font-label-md text-xs flex items-center gap-1 font-semibold">
            Open Conversation <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </div>

        {/* 1-Minute Box Breathing Card */}
        <div
          onClick={() => onNavigateTab('checkin')}
          className="rounded-2xl bg-primary-container text-on-primary-container p-4 flex flex-col justify-between gap-3 shadow-sm hover:opacity-95 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[20px]">play_arrow</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-base font-semibold">Box Breathing</h4>
            <p className="font-body-sm text-xs opacity-85 mt-0.5">
              4s Inhale • 4s Hold • 4s Exhale
            </p>
          </div>
          <span className="font-label-md text-xs font-bold flex items-center gap-1">
            Start 1-Min Cycle <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </span>
        </div>
      </div>

      {/* Safety Net Quick Status */}
      <div className="rounded-2xl bg-surface-container-low border border-[#424844]/25 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-error-container/40 text-error flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">shield</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-headline-sm text-sm text-on-surface font-semibold">Your Safety Net</h4>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary text-[10px] font-bold">
                Encrypted
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              {contacts.length} trusted contacts active • SMS workflow armed
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('safety')}
          className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
          title="Safety Settings"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </button>
      </div>

      {/* Direct SOS Trigger Shortcut */}
      <div className="pt-1">
        <button
          onClick={onOpenSOSModal}
          className="w-full py-3.5 rounded-2xl bg-error-container/60 hover:bg-error-container text-error border border-error/40 flex items-center justify-center gap-2 font-label-md text-xs font-bold transition-all cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">sos</span>
          <span>Open Emergency Safety Protocol Screen</span>
        </button>
      </div>
    </div>
  );
};
