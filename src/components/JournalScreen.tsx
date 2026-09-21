import React, { useState } from 'react';
import { CheckInRecord, MoodType } from '../types';
import { MOOD_OPTIONS } from '../data/initialData';

interface JournalScreenProps {
  checkIns: CheckInRecord[];
  onAddNewReflection: (record: CheckInRecord) => void;
  onNavigateToCheckIn: () => void;
}

export const JournalScreen: React.FC<JournalScreenProps> = ({
  checkIns,
  onAddNewReflection,
  onNavigateToCheckIn
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteMood, setNewNoteMood] = useState<MoodType>('calm');

  const filteredCheckIns = selectedFilter === 'all'
    ? checkIns
    : checkIns.filter(item => item.mood === selectedFilter);

  const handleCreateEntry = () => {
    if (!newNoteText.trim()) return;
    const entry: CheckInRecord = {
      id: `chk-${Date.now()}`,
      timestamp: new Date().toISOString(),
      dateStr: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: newNoteMood,
      intensity: 4,
      sensations: ['Mindful reflection'],
      notes: newNoteText.trim(),
      breathingCompleted: false
    };
    onAddNewReflection(entry);
    setNewNoteText('');
    setShowNewEntryModal(false);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-2 pb-28 gap-5">
      {/* Journal Header */}
      <section className="flex items-center justify-between mt-1">
        <div>
          <h1 className="font-headline-md text-3xl text-primary">Mindful Journal</h1>
          <p className="font-body-md text-on-surface-variant text-sm">
            Your saved reflections &amp; somatic emotional logs
          </p>
        </div>
        <button
          onClick={() => setShowNewEntryModal(true)}
          className="px-3.5 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-semibold flex items-center gap-1 shadow-sm hover:opacity-90 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">edit_note</span>
          <span>New Note</span>
        </button>
      </section>

      {/* Weekly Emotional Balance Summary Card */}
      <div className="rounded-2xl bg-surface-container-high border border-[#424844]/25 p-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-xs font-semibold text-primary uppercase tracking-wider">
            Emotional Balance Overview
          </span>
          <span className="text-xs text-on-surface-variant">{checkIns.length} Entries Recorded</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2.5 rounded-xl bg-surface-container-low border border-[#424844]/20 flex flex-col items-center">
            <span className="font-headline-md text-xl text-primary font-semibold">4.7</span>
            <span className="text-[11px] text-on-surface-variant">Avg Intensity</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-low border border-[#424844]/20 flex flex-col items-center">
            <span className="font-headline-md text-xl text-secondary font-semibold">2</span>
            <span className="text-[11px] text-on-surface-variant">Breathing Cycles</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface-container-low border border-[#424844]/20 flex flex-col items-center">
            <span className="font-headline-md text-xl text-on-surface font-semibold">Chest</span>
            <span className="text-[11px] text-on-surface-variant">Top Sensation</span>
          </div>
        </div>
      </div>

      {/* Mood Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border ${
            selectedFilter === 'all'
              ? 'bg-primary text-on-primary border-primary'
              : 'bg-surface-container text-on-surface-variant border-[#424844]/20 hover:text-on-surface'
          }`}
        >
          All Entries
        </button>
        {MOOD_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => setSelectedFilter(opt.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-all border ${
              selectedFilter === opt.id
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container text-on-surface-variant border-[#424844]/20 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">{opt.icon}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Entries List */}
      <div className="flex flex-col gap-3">
        {filteredCheckIns.length === 0 ? (
          <div className="p-8 rounded-2xl bg-surface-container-low border border-[#424844]/20 text-center flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/60">
              menu_book
            </span>
            <p className="text-sm text-on-surface-variant">No reflections found for this mood filter.</p>
            <button
              onClick={onNavigateToCheckIn}
              className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold cursor-pointer"
            >
              Start a New Check-In
            </button>
          </div>
        ) : (
          filteredCheckIns.map(item => {
            const moodMeta = MOOD_OPTIONS.find(m => m.id === item.mood) || MOOD_OPTIONS[0];
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-surface-container-low border border-[#424844]/25 p-4 sm:p-5 shadow-sm flex flex-col gap-3 transition-all hover:border-primary/40"
              >
                {/* Header: Date + Mood Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${moodMeta.colorClass}`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {moodMeta.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-sm text-on-surface font-semibold">
                        {moodMeta.label}
                      </h4>
                      <span className="text-[11px] text-on-surface-variant">
                        {item.dateStr}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container border border-[#424844]/20 text-xs text-primary font-medium">
                    <span>Intensity {item.intensity}/10</span>
                  </div>
                </div>

                {/* Notes Text */}
                {item.notes && (
                  <p className="font-body-md text-sm text-on-surface/90 italic leading-relaxed bg-surface/50 p-3 rounded-xl border border-[#424844]/15">
                    "{item.notes}"
                  </p>
                )}

                {/* Sensations and badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[#424844]/15">
                  {item.sensations.map((sens, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px]"
                    >
                      {sens}
                    </span>
                  ))}

                  {item.breathingCompleted && (
                    <span className="px-2.5 py-1 rounded-full bg-primary-fixed/30 text-primary text-[11px] flex items-center gap-1 font-medium ml-auto">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      Box Breathing completed
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New Reflection Quick Modal */}
      {showNewEntryModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface-container-low rounded-3xl border border-[#424844]/30 p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-lg text-on-surface font-normal">
                New Journal Reflection
              </h3>
              <button
                onClick={() => setShowNewEntryModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Mood selector */}
            <div className="flex items-center gap-2">
              {MOOD_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setNewNoteMood(opt.id)}
                  className={`flex-1 p-2 rounded-xl flex flex-col items-center gap-1 border text-xs cursor-pointer transition-all ${
                    newNoteMood === opt.id
                      ? 'bg-primary-fixed/20 border-primary text-primary font-semibold'
                      : 'bg-surface border-[#424844]/20 text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{opt.icon}</span>
                  <span>{opt.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              value={newNoteText}
              onChange={e => setNewNoteText(e.target.value)}
              placeholder="What thoughts or feelings are resting with you right now?"
              className="w-full p-3.5 rounded-xl bg-surface border border-[#424844]/20 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-on-surface-variant/60"
            />

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setShowNewEntryModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEntry}
                disabled={!newNoteText.trim()}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold disabled:opacity-40 cursor-pointer shadow-sm hover:opacity-90"
              >
                Save Reflection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
