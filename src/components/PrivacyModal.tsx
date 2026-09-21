import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-low rounded-3xl border border-[#424844]/30 p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
            <h3 className="font-headline-sm text-xl text-on-surface font-normal">
              Privacy Manifesto
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 text-xs text-on-surface-variant leading-relaxed">
          <div className="p-3 rounded-xl bg-surface border border-[#424844]/20">
            <h4 className="font-semibold text-on-surface mb-1 flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-primary text-[16px]">lock</span>
              1. End-to-End Local Confidentiality
            </h4>
            <p>
              Your conversational logs with Sage, daily mood check-ins, journal reflections, and sensation logs remain securely sandboxed on your local device. We never sell, harvest, or monetize your emotional telemetry.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-[#424844]/20">
            <h4 className="font-semibold text-on-surface mb-1 flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-primary text-[16px]">shield_person</span>
              2. Strict Crisis Autonomy
            </h4>
            <p>
              Emergency protocols are strictly opt-in and under your autonomous command. Everyday panic attacks, tears, or moments of sadness never trigger emergency contacts. SOS mechanisms only dispatch if you explicitly confirm or allow the 60-second safety fallback timer to elapse.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-surface border border-[#424844]/20">
            <h4 className="font-semibold text-on-surface mb-1 flex items-center gap-1.5 text-xs">
              <span className="material-symbols-outlined text-primary text-[16px]">key</span>
              3. Zero-Knowledge Cryptography
            </h4>
            <p>
              Emergency contacts and dispatch preferences are stored in encrypted format. When alert payloads are transmitted during critical life safety events, only verified contact numbers receive the factual location and status dispatch.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-semibold shadow-sm hover:opacity-95 cursor-pointer mt-1"
        >
          I Understand &amp; Agree
        </button>
      </div>
    </div>
  );
};
