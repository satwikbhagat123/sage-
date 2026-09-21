import React, { useState } from 'react';
import { EmergencyContact, EmergencyWorkflow } from '../types';

interface SafetyNetScreenProps {
  contacts: EmergencyContact[];
  onOpenAddContact: () => void;
  onEditContact: (contact: EmergencyContact) => void;
  onOpenPrivacyModal: () => void;
  onTriggerSOSModal: () => void;
}

export const SafetyNetScreen: React.FC<SafetyNetScreenProps> = ({
  contacts,
  onOpenAddContact,
  onEditContact,
  onOpenPrivacyModal,
  onTriggerSOSModal
}) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<EmergencyWorkflow>('message_first');

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-2 pb-28 gap-6">
      {/* Joyful, Reassuring Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-high p-6 text-on-surface flex flex-col gap-2 shadow-sm border border-[#424844]/20">
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/15 blur-2xl pointer-events-none"></div>
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-[28px]">shield</span>
          <h2 className="font-headline-md text-2xl text-primary">Your Safety Net</h2>
        </div>
        <p className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-md">
          Configure your trusted circle and crisis preferences. We keep your information strictly secure so you can feel completely grounded.
        </p>

        {/* Live Protocol Preview Button */}
        <div className="pt-2">
          <button
            onClick={onTriggerSOSModal}
            className="px-4 py-2 rounded-xl bg-error-container text-error hover:bg-error/20 transition-all font-label-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-error/30"
          >
            <span className="material-symbols-outlined text-[16px]">sos</span>
            <span>Launch Active Emergency Protocol Demo</span>
          </button>
        </div>
      </div>

      {/* 1. Clarity & Safety Notice */}
      <div className="rounded-2xl bg-error-container/30 border border-error/30 p-5 text-on-surface flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0 text-error">
            <span className="material-symbols-outlined text-[22px]">info</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-headline-sm text-base text-on-surface font-semibold">
              Emergency-Only Mechanism
            </h3>
            <p className="font-body-md text-on-surface-variant text-xs leading-relaxed">
              SOS is strictly reserved for immediate personal safety threats or critical crises. It is <strong>never</strong> triggered by panic attacks, normal emotional distress, or everyday sadness—those moments are for gentle breathing and our chat companion.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Trusted Emergency Contacts */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-headline-sm text-lg text-on-surface">Trusted Contacts</h3>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Up to 3 people notified during an SOS activation
            </p>
          </div>
          {contacts.length < 3 && (
            <button
              id="add-contact-btn"
              onClick={onOpenAddContact}
              className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-medium flex items-center gap-1 hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Contact</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3" id="contacts-container">
          {/* Render Active Contacts */}
          {contacts.map((contact, idx) => (
            <div
              key={contact.id}
              className="rounded-2xl bg-surface-container-low border border-[#424844]/25 p-4 flex flex-col gap-3 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                      idx === 0
                        ? 'bg-primary-fixed text-[#092015]'
                        : 'bg-secondary-fixed text-[#301400]'
                    }`}
                  >
                    {contact.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-sm text-on-surface font-semibold">
                      {contact.name}
                    </span>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      {contact.relationship} • {contact.phone}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onEditContact(contact)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors"
                  title="Edit contact"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#424844]/20">
                <span className="font-body-sm text-xs text-on-surface-variant">Preferred Method</span>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-[11px]">
                  {contact.preferredMethod}
                </span>
              </div>
            </div>
          ))}

          {/* Empty slot if under 3 contacts */}
          {contacts.length < 3 && (
            <div
              onClick={onOpenAddContact}
              className="rounded-2xl border-2 border-dashed border-[#424844]/40 p-4 flex items-center justify-between bg-surface-container-lowest/50 hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[22px]">person_add</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-sm text-on-surface font-medium">
                    Add Third Contact
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    Optional backup safety connection
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Configurable Workflow Options */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <h3 className="font-headline-sm text-lg text-on-surface">Emergency Workflow</h3>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Choose how your alerts are dispatched upon activation
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <label
            onClick={() => setSelectedWorkflow('message_first')}
            className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow-sm border transition-all ${
              selectedWorkflow === 'message_first'
                ? 'bg-surface-container-low border-primary ring-1 ring-primary/40'
                : 'bg-surface-container-low border-[#424844]/20 hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-sm text-on-surface font-medium">
                  Send SOS Message First
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Dispatches encrypted location &amp; alert text immediately
                </span>
              </div>
            </div>
            <input
              type="radio"
              name="workflow"
              checked={selectedWorkflow === 'message_first'}
              onChange={() => setSelectedWorkflow('message_first')}
              className="w-5 h-5 accent-primary"
            />
          </label>

          <label
            onClick={() => setSelectedWorkflow('call_direct')}
            className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow-sm border transition-all ${
              selectedWorkflow === 'call_direct'
                ? 'bg-surface-container-low border-primary ring-1 ring-primary/40'
                : 'bg-surface-container-low border-[#424844]/20 hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-sm text-on-surface font-medium">
                  Call Emergency Contact Directly
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Initiates a direct phone call to your primary contact
                </span>
              </div>
            </div>
            <input
              type="radio"
              name="workflow"
              checked={selectedWorkflow === 'call_direct'}
              onChange={() => setSelectedWorkflow('call_direct')}
              className="w-5 h-5 accent-primary"
            />
          </label>

          <label
            onClick={() => setSelectedWorkflow('message_then_call')}
            className={`rounded-2xl p-4 flex items-center justify-between cursor-pointer shadow-sm border transition-all ${
              selectedWorkflow === 'message_then_call'
                ? 'bg-surface-container-low border-primary ring-1 ring-primary/40'
                : 'bg-surface-container-low border-[#424844]/20 hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">rule</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-sm text-on-surface font-medium">
                  Message First, Then Call
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Sends text alert, followed by an automated call after 30s
                </span>
              </div>
            </div>
            <input
              type="radio"
              name="workflow"
              checked={selectedWorkflow === 'message_then_call'}
              onChange={() => setSelectedWorkflow('message_then_call')}
              className="w-5 h-5 accent-primary"
            />
          </label>
        </div>
      </div>

      {/* 4. Privacy & Data Transparency */}
      <div className="rounded-2xl bg-surface-container-low border border-[#424844]/20 p-5 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-[22px]">lock</span>
          <h3 className="font-headline-sm text-base text-on-surface font-medium">
            Privacy &amp; Data Transparency
          </h3>
        </div>
        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
          Your emergency telemetry, location data, and personal notes are end-to-end encrypted. They reside securely on your device and are <strong>never</strong> shared, logged, or analyzed unless you explicitly trigger an SOS event.
        </p>
        <button
          onClick={onOpenPrivacyModal}
          className="flex items-center gap-1 text-primary font-label-md text-xs cursor-pointer hover:underline pt-1 text-left w-fit"
        >
          <span>Read our complete privacy manifesto</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      {/* 5. Guidance on Human Emergency Services */}
      <div className="rounded-2xl bg-primary-fixed/20 border border-primary-fixed/30 p-5 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-[22px]">local_hospital</span>
          <h3 className="font-headline-sm text-base text-on-surface font-medium">
            When to Contact Local Authorities
          </h3>
        </div>
        <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
          If you or someone around you is experiencing an immediate physical danger, medical emergency, or severe crisis, please bypass this app and contact your local emergency services right away.
        </p>
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <a
            href="tel:911"
            className="py-3 px-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity text-center"
          >
            <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
            <span>Call 911</span>
          </a>
          <a
            href="tel:988"
            className="py-3 px-3 rounded-xl bg-surface-container border border-[#424844]/30 text-on-surface font-label-md text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-surface-container-high transition-colors text-center"
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>Call 988</span>
          </a>
        </div>
      </div>
    </div>
  );
};
