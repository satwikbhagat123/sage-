import React, { useState, useEffect } from 'react';
import { EmergencyContact } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryContact?: EmergencyContact;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  primaryContact
}) => {
  const [timeLeft, setTimeLeft] = useState(48);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDispatched, setIsDispatched] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(48);
      setStatusMessage(null);
      setIsDispatched(false);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsDispatched(true);
          setStatusMessage("Dispatch timer completed. Simulated encrypted SOS dispatched to " + (primaryContact?.name || "your emergency contact") + ".");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, primaryContact]);

  if (!isOpen) return null;

  // Format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  // Circular progress math (circumference = 2 * PI * 44 ≈ 276.46)
  const totalDuration = 60;
  const strokeDashoffset = 276 - (timeLeft / totalDuration) * 276;

  const handleCancelSOS = () => {
    setStatusMessage("SOS cancelled. Glad you are safe! Returning to gentle companion mode.");
    setTimeout(() => {
      onClose();
    }, 1400);
  };

  const handleSendSOSNow = () => {
    setIsDispatched(true);
    setStatusMessage("SOS alert immediately transmitted to " + (primaryContact?.name || "Elena Morales") + " via secure SMS channel.");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex flex-col items-center justify-start p-4 pt-6">
      <div className="w-full max-w-md bg-[#0d1512] rounded-3xl border border-[#424844]/40 shadow-2xl p-4 sm:p-6 flex flex-col gap-5 text-on-surface my-auto">
        
        {/* Active Safety Alert Banner */}
        <div className="bg-error-container text-on-error-container p-5 rounded-2xl shadow-md flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-error/15 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="w-12 h-12 rounded-full bg-error text-on-error flex items-center justify-center mb-3 shadow-sm animate-pulse">
            <span className="font-bold text-sm tracking-wider">SOS</span>
          </div>
          
          <h2 className="font-headline-md text-xl mb-1 text-on-error-container font-semibold">
            Emergency Safety Protocol
          </h2>
          <p className="font-body-md text-xs opacity-90 max-w-xs leading-relaxed">
            We are here with you. Your safety and autonomy come first.
          </p>
        </div>

        {/* Status Notification if triggered or cancelled */}
        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-surface-container-high border border-primary/40 text-xs text-primary flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>{statusMessage}</span>
          </div>
        )}

        {/* 60-Second Safety Fallback Timer Card */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col items-center gap-4 border border-[#424844]/20 relative">
          <div className="flex items-center justify-between w-full">
            <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[16px] text-error">timer</span>
              Automatic Dispatch Timer
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-error-container text-error font-label-sm text-[11px] font-bold">
              Live
            </span>
          </div>

          {/* Circular Timer Representation */}
          <div className="relative w-36 h-36 flex items-center justify-center my-1">
            <div className="absolute inset-0 rounded-full border-4 border-surface-container flex items-center justify-center"></div>
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-error transition-all duration-1000 ease-linear"
                cx="50"
                cy="50"
                fill="none"
                r="44"
                stroke="currentColor"
                strokeDasharray="276"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="6"
              />
            </svg>
            <div className="flex flex-col items-center z-10">
              <span className="font-headline-lg text-3xl font-normal text-on-surface" id="countdown-timer">
                {timeString}
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">seconds left</span>
            </div>
          </div>

          {/* Prominent Cancel / I'm Safe Button */}
          <button
            onClick={handleCancelSOS}
            className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-label-md text-sm font-semibold shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
            <span>Cancel SOS / I'm Safe</span>
          </button>
          
          <p className="font-body-sm text-[11px] text-on-surface-variant text-center">
            Tap this anytime if you are safe and no help is needed.
          </p>
        </div>

        {/* Confirmation Dialogue Prompt Card */}
        <div className="bg-surface-container-low border border-[#424844]/25 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed text-[#092015] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-xs text-primary font-semibold">
                Chat Companion Assistant
              </span>
              <p className="font-body-lg text-sm text-on-surface leading-relaxed">
                "Satwik, mujhe lag raha hai ki abhi situation serious ho sakti hai. Kya tum chahte ho ki main tumhare saved emergency contact ko SOS bhejne ki koshish karun?"
              </p>
            </div>
          </div>

          {/* Choice Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={handleCancelSOS}
              className="py-3 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#424844]/20"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
              <span>Don't send</span>
            </button>
            <button
              onClick={handleSendSOSNow}
              disabled={isDispatched}
              className="py-3 px-3 rounded-xl bg-error text-on-error font-label-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Send SOS</span>
            </button>
          </div>
        </div>

        {/* Factual Message Preview Card */}
        <div className="bg-surface-container-lowest border border-[#424844]/20 p-4 rounded-2xl shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-on-surface-variant flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              Message Preview to Contact
            </span>
            <span className="font-body-sm text-[11px] text-outline">SMS / WhatsApp</span>
          </div>
          <div className="bg-surface-container-low p-3.5 rounded-xl border border-[#424844]/15">
            <p className="font-body-md text-xs text-on-surface italic leading-relaxed">
              "🚨 SOS — Satwik may be at immediate risk and is currently not responding. This is an automated safety alert generated via Chat Companion."
            </p>
          </div>
        </div>

        {/* Transparency & Permission Guidance */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-high text-on-surface-variant text-xs leading-relaxed border border-[#424844]/20">
          <span className="material-symbols-outlined text-primary text-[20px] flex-shrink-0 mt-0.5">
            info
          </span>
          <div className="flex flex-col gap-0.5">
            <h4 className="font-label-md text-xs text-on-surface font-semibold">
              Complete Transparency &amp; Control
            </h4>
            <p className="text-[11px] opacity-90">
              No automated calls are ever made without your explicit permission. You remain fully in control of your safety network at all times. If the timer expires without cancellation, only the designated emergency SMS preview above will be transmitted.
            </p>
          </div>
        </div>

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="py-2.5 text-xs text-on-surface-variant hover:text-on-surface font-medium underline text-center cursor-pointer"
        >
          Return to App
        </button>

      </div>
    </div>
  );
};
