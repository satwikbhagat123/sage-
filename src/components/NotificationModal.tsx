import React from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCheckIn: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToCheckIn
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-low rounded-3xl border border-[#424844]/30 p-5 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">notifications</span>
            <h3 className="font-headline-sm text-lg text-on-surface font-normal">
              Gentle Reminders
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <div
            onClick={() => {
              onClose();
              onNavigateToCheckIn();
            }}
            className="p-3.5 rounded-2xl bg-surface border border-[#424844]/20 hover:border-primary/40 transition-colors cursor-pointer flex items-start gap-3"
          >
            <span className="w-8 h-8 rounded-full bg-primary-fixed/30 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">spa</span>
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-on-surface">Midday Grounding Check-In</span>
              <span className="text-[11px] text-on-surface-variant">Take 60 seconds to release tension in your shoulders and breathe.</span>
              <span className="text-[10px] text-primary mt-1">10:30 AM • Today</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface border border-[#424844]/20 flex items-start gap-3">
            <span className="w-8 h-8 rounded-full bg-secondary-fixed/30 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]">shield</span>
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-on-surface">Safety Net Armed &amp; Secure</span>
              <span className="text-[11px] text-on-surface-variant">2 trusted contacts verified. End-to-end encryption active.</span>
              <span className="text-[10px] text-on-surface-variant mt-1">Yesterday</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-medium text-on-surface cursor-pointer"
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
};
