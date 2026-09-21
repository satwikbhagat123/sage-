import React from 'react';
import { EmergencyContact } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
  onOpenSafetyNet: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  contacts,
  onOpenSafetyNet
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-low rounded-3xl border border-[#424844]/30 p-6 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-xl text-on-surface font-normal">
            Account &amp; Companion
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Profile Details */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface border border-[#424844]/20">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xl shadow-md">
            SB
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-lg text-on-surface font-semibold">Satwik Bhagat</span>
            <span className="text-xs text-on-surface-variant">satwikbhagat@gmail.com</span>
            <span className="text-[11px] text-primary mt-1 font-medium">Mindful Journey • Day 14</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 rounded-xl bg-surface border border-[#424844]/20">
            <span className="text-lg font-bold text-primary">4 Days</span>
            <div className="text-[11px] text-on-surface-variant">Active Streak</div>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-[#424844]/20">
            <span className="text-lg font-bold text-secondary">{contacts.length} Contacts</span>
            <div className="text-[11px] text-on-surface-variant">Safety Net Circle</div>
          </div>
        </div>

        {/* Safety Net Shortcut */}
        <div className="p-3.5 rounded-xl bg-surface-container border border-[#424844]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
            <div className="text-xs">
              <div className="font-medium text-on-surface">Safety Preferences</div>
              <div className="text-on-surface-variant text-[11px]">Manage trusted contacts &amp; protocol</div>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenSafetyNet();
            }}
            className="text-xs text-primary font-semibold underline cursor-pointer"
          >
            Manage
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-semibold shadow-sm hover:opacity-95 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
