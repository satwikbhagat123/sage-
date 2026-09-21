import React, { useState, useEffect } from 'react';
import { MoodType, CheckInRecord } from '../types';
import { MOOD_OPTIONS, BODY_SENSATIONS } from '../data/initialData';

interface CheckInScreenProps {
  onSaveCheckIn: (record: CheckInRecord) => void;
  onViewJournal: () => void;
}

export const CheckInScreen: React.FC<CheckInScreenProps> = ({
  onSaveCheckIn,
  onViewJournal
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>('calm');
  const [intensity, setIntensity] = useState<number>(5);
  const [selectedSensations, setSelectedSensations] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Box Breathing state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Ready' | 'Inhale' | 'Hold 1' | 'Exhale' | 'Hold 2'>('Ready');
  const [breathSeconds, setBreathSeconds] = useState(0);

  const toggleSensation = (sensation: string) => {
    setSelectedSensations(prev =>
      prev.includes(sensation)
        ? prev.filter(s => s !== sensation)
        : [...prev, sensation]
    );
  };

  // 1-Minute Box Breathing cycle logic (4s inhale, 4s hold, 4s exhale, 4s hold = 16s cycle x 4 = ~64s)
  useEffect(() => {
    let interval: any = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathSeconds(prev => {
          const nextSec = prev + 1;
          const cycleSec = nextSec % 16;
          if (cycleSec >= 0 && cycleSec < 4) {
            setBreathPhase('Inhale');
          } else if (cycleSec >= 4 && cycleSec < 8) {
            setBreathPhase('Hold 1');
          } else if (cycleSec >= 8 && cycleSec < 12) {
            setBreathPhase('Exhale');
          } else {
            setBreathPhase('Hold 2');
          }

          if (nextSec >= 60) {
            setBreathingActive(false);
            setBreathPhase('Ready');
            return 0;
          }
          return nextSec;
        });
      }, 1000);
    } else {
      setBreathPhase('Ready');
      setBreathSeconds(0);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  const handleToggleBreathing = () => {
    if (breathingActive) {
      setBreathingActive(false);
      setBreathPhase('Ready');
    } else {
      setBreathingActive(true);
      setBreathPhase('Inhale');
      setBreathSeconds(0);
    }
  };

  const handleSave = () => {
    const newRecord: CheckInRecord = {
      id: `chk-${Date.now()}`,
      timestamp: new Date().toISOString(),
      dateStr: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood: selectedMood,
      intensity,
      sensations: selectedSensations,
      notes: notes.trim() || undefined,
      breathingCompleted: breathSeconds > 15
    };

    onSaveCheckIn(newRecord);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-2 pb-28 gap-6">
      {/* Warm Greeting & Introduction */}
      <section className="flex flex-col gap-1 mt-1">
        <h1 className="font-headline-md text-3xl text-primary">Pause &amp; Breathe</h1>
        <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
          Take a quiet moment to anchor yourself right now. There's no right or wrong way to feel.
        </p>
      </section>

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="p-4 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-between shadow-lg transition-all animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
            <span className="text-sm font-medium">Check-in saved to your Journal.</span>
          </div>
          <button
            onClick={onViewJournal}
            className="text-xs font-bold underline cursor-pointer hover:opacity-80"
          >
            View Journal
          </button>
        </div>
      )}

      {/* Emotional State Selection Card */}
      <section className="flex flex-col bg-surface-container-low rounded-2xl p-5 shadow-sm gap-4 border border-[#424844]/20">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-lg text-on-surface font-normal">
            How are you feeling right now?
          </h2>
          <span className="material-symbols-outlined text-primary text-[24px]">favorite</span>
        </div>

        {/* Mood Chips Grid */}
        <div className="grid grid-cols-2 gap-2.5" id="mood-selector">
          {MOOD_OPTIONS.map(mood => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl transition-all text-left shadow-sm border cursor-pointer ${
                  isSelected
                    ? 'bg-primary-fixed/25 border-primary text-on-surface ring-1 ring-primary/60'
                    : 'bg-surface hover:bg-surface-container border-[#424844]/20 text-on-surface'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-110' : ''
                  } ${mood.colorClass}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {mood.icon}
                  </span>
                </span>
                <div className="flex flex-col">
                  <span className="font-label-md text-sm text-on-surface font-medium">
                    {mood.label}
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    {mood.sublabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Intensity Slider */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#424844]/20">
          <div className="flex justify-between items-center">
            <label className="font-label-md text-sm text-on-surface">Intensity level</label>
            <span className="font-label-md text-primary bg-primary-fixed/30 px-3 py-0.5 rounded-full text-xs font-semibold">
              {intensity} / 10
            </span>
          </div>
          <input
            id="intensity-slider"
            type="range"
            min="0"
            max="10"
            value={intensity}
            onChange={e => setIntensity(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-surface-container-highest rounded-lg cursor-pointer"
          />
          <div className="flex justify-between font-body-sm text-xs text-on-surface-variant px-1">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Intense</span>
          </div>
        </div>
      </section>

      {/* Physical Sensations Notes */}
      <section className="flex flex-col bg-surface-container-low rounded-2xl p-5 shadow-sm gap-4 border border-[#424844]/20">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-lg text-on-surface font-normal">
            Where do you feel it in your body?
          </h2>
          <span className="material-symbols-outlined text-primary text-[24px]">
            accessibility_new
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {BODY_SENSATIONS.map(tag => {
            const isTagSelected = selectedSensations.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleSensation(tag)}
                className={`px-3.5 py-2 rounded-full font-label-md text-xs transition-all shadow-sm cursor-pointer border ${
                  isTagSelected
                    ? 'bg-primary text-on-primary border-primary font-semibold'
                    : 'bg-surface text-on-surface-variant hover:bg-surface-container-highest border-[#424844]/20'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <textarea
          id="checkin-notes-input"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          className="w-full p-3.5 rounded-xl bg-surface border border-[#424844]/25 focus:ring-2 focus:ring-primary focus:outline-none text-sm text-on-surface placeholder:text-on-surface-variant/60 resize-none shadow-inner"
          placeholder="Add a gentle note about what's on your mind... (optional)"
        />
      </section>

      {/* Interactive 1-Minute Grounding / Box Breathing Widget */}
      <section className="flex flex-col bg-primary-container text-on-primary-container rounded-2xl p-5 shadow-md gap-4 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between z-10">
          <div className="flex flex-col">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-primary-container/80 font-semibold">
              GUIDED EXERCISE
            </span>
            <h2 className="font-headline-sm text-xl font-normal text-on-primary-container">
              1-Minute Box Breathing
            </h2>
          </div>
          <button
            id="breath-play-btn"
            onClick={handleToggleBreathing}
            className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={breathingActive ? "Pause" : "Start"}
          >
            <span className="material-symbols-outlined text-[24px]">
              {breathingActive ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-6 z-10">
          {/* Animated Circle */}
          <div
            className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-1000 border-4 border-primary-fixed/50 shadow-inner ${
              breathPhase === 'Inhale'
                ? 'scale-125 bg-primary-fixed/50'
                : breathPhase === 'Hold 1'
                ? 'scale-125 bg-primary-fixed/40'
                : breathPhase === 'Exhale'
                ? 'scale-100 bg-primary-fixed/25'
                : breathPhase === 'Hold 2'
                ? 'scale-100 bg-primary-fixed/20'
                : 'scale-100 bg-primary-fixed/30'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="font-headline-md text-2xl text-on-primary-container text-center font-medium">
                {breathPhase === 'Hold 1' || breathPhase === 'Hold 2' ? 'Hold' : breathPhase}
              </span>
              {breathingActive && (
                <span className="text-xs font-mono opacity-80 mt-1">
                  {60 - breathSeconds}s
                </span>
              )}
            </div>
          </div>

          <p className="font-body-sm text-xs text-on-primary-container/85 mt-4 text-center">
            {breathingActive
              ? breathPhase === 'Inhale'
                ? 'Inhale slowly through your nose...'
                : breathPhase === 'Hold 1' || breathPhase === 'Hold 2'
                ? 'Gently suspend your breath, feeling stillness...'
                : 'Exhale smoothly and soften your muscles...'
              : 'Tap play to begin your grounding cycle'}
          </p>
        </div>

        <div className="flex justify-between items-center text-xs text-on-primary-container/80 z-10 pt-1 border-t border-on-primary-container/15">
          <span>Inhale (4s)</span>
          <span>Hold (4s)</span>
          <span>Exhale (4s)</span>
        </div>
      </section>

      {/* Save / Complete Button */}
      <button
        id="save-checkin-btn"
        onClick={handleSave}
        className="w-full py-4 rounded-xl bg-primary text-on-primary font-label-md font-semibold text-sm shadow-md hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">check_circle</span>
        <span>Save Check-in &amp; Reflect</span>
      </button>
    </div>
  );
};
