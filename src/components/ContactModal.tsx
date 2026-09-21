import React, { useState, useEffect } from 'react';
import { EmergencyContact } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: EmergencyContact) => void;
  contactToEdit?: EmergencyContact | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onSave,
  contactToEdit
}) => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredMethod, setPreferredMethod] = useState('Message First, Then Call');

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setRelationship(contactToEdit.relationship);
      setPhone(contactToEdit.phone);
      setPreferredMethod(contactToEdit.preferredMethod);
    } else {
      setName('');
      setRelationship('');
      setPhone('');
      setPreferredMethod('Send SOS Message');
    }
  }, [contactToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    // Derive initials
    const words = name.trim().split(' ');
    const initials = words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.trim().slice(0, 2).toUpperCase();

    const contact: EmergencyContact = {
      id: contactToEdit ? contactToEdit.id : `c-${Date.now()}`,
      name: name.trim(),
      initials,
      relationship: relationship.trim() || 'Trusted Connection',
      phone: phone.trim(),
      preferredMethod,
      isPrimary: contactToEdit ? contactToEdit.isPrimary : false
    };

    onSave(contact);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-low rounded-3xl border border-[#424844]/30 p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">person_add</span>
            <h3 className="font-headline-sm text-lg text-on-surface font-normal">
              {contactToEdit ? 'Edit Trusted Contact' : 'Add Trusted Contact'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          This contact will be strictly reserved for emergency notifications if the automatic safety timer completes or if you confirm SOS dispatch.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-medium text-on-surface block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Elena Morales"
              className="w-full p-3 rounded-xl bg-surface border border-[#424844]/25 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-on-surface block mb-1">Relationship</label>
            <input
              type="text"
              value={relationship}
              onChange={e => setRelationship(e.target.value)}
              placeholder="e.g. Primary Partner, Therapist, Sibling"
              className="w-full p-3 rounded-xl bg-surface border border-[#424844]/25 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-on-surface block mb-1">Phone Number (with country code)</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full p-3 rounded-xl bg-surface border border-[#424844]/25 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-on-surface block mb-1">Preferred Alert Channel</label>
            <select
              value={preferredMethod}
              onChange={e => setPreferredMethod(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface border border-[#424844]/25 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="Send SOS Message">Send SOS Message (SMS / WhatsApp)</option>
              <option value="Message First, Then Call">Message First, Then Call</option>
              <option value="Direct Call Only">Direct Call Only</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#424844]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold shadow-sm hover:opacity-90 cursor-pointer"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
