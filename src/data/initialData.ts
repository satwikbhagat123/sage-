import { ChatMessage, EmergencyContact, CheckInRecord, MoodOption } from '../types';

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: 'calm',
    label: 'Calm & Clear',
    sublabel: 'At ease',
    icon: 'wb_sunny',
    colorClass: 'bg-primary-fixed text-[#1e3529]',
    tagColor: 'text-primary'
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed',
    sublabel: 'Busy mind',
    icon: 'storm',
    colorClass: 'bg-secondary-fixed text-[#49280d]',
    tagColor: 'text-secondary'
  },
  {
    id: 'fatigued',
    label: 'Fatigued',
    sublabel: 'Low energy',
    icon: 'bed',
    colorClass: 'bg-primary-fixed text-[#1e3529]',
    tagColor: 'text-primary'
  },
  {
    id: 'anxious',
    label: 'Anxious',
    sublabel: 'Tense',
    icon: 'eco',
    colorClass: 'bg-secondary-fixed text-[#49280d]',
    tagColor: 'text-secondary'
  }
];

export const BODY_SENSATIONS = [
  'Racing thoughts',
  'Chest tightness',
  'Shallow breath',
  'Tight shoulders',
  'Heavy limbs',
  'Restless'
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'sage',
    text: 'Hey Satwik. Waise kal wali appointment kaisi gayi?',
    time: '10:42 AM'
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'It went really well, thanks for asking! The therapist gave me some great grounding exercises to try out.',
    time: '10:44 AM'
  },
  {
    id: 'm3',
    sender: 'sage',
    text: 'That makes me so glad to hear. Grounding practices can feel like anchors when things get stormy.',
    time: '10:45 AM'
  },
  {
    id: 'm4',
    sender: 'sage',
    text: 'Kya hua abhi? Anxiety kisi specific cheez ki wajah se start hui hai ya bas suddenly aa gayi?',
    time: '10:46 AM'
  }
];

export const QUICK_CHIPS = [
  'Suddenly aa gayi, no clear reason',
  'Work & deadline stress',
  'Chest tightness / heavy feeling',
  'Just need a moment to breathe',
  'Let us do Box Breathing together'
];

export const INITIAL_CONTACTS: EmergencyContact[] = [
  {
    id: 'c1',
    name: 'Elena Morales',
    initials: 'EM',
    relationship: 'Primary Partner',
    phone: '+1 (555) 234-5678',
    preferredMethod: 'Message First, Then Call',
    isPrimary: true
  },
  {
    id: 'c2',
    name: 'Dr. James Davenport',
    initials: 'JD',
    relationship: 'Therapist',
    phone: '+1 (555) 987-6543',
    preferredMethod: 'Send SOS Message',
    isPrimary: false
  }
];

export const INITIAL_CHECKINS: CheckInRecord[] = [
  {
    id: 'chk-1',
    timestamp: '2026-09-19T18:30:00Z',
    dateStr: 'Yesterday at 6:30 PM',
    mood: 'anxious',
    intensity: 6,
    sensations: ['Chest tightness', 'Racing thoughts'],
    notes: 'Feeling a sudden wave after a long meeting. Stepped away to do 2 minutes of grounding.',
    breathingCompleted: true
  },
  {
    id: 'chk-2',
    timestamp: '2026-09-18T10:15:00Z',
    dateStr: 'Sep 18 at 10:15 AM',
    mood: 'calm',
    intensity: 3,
    sensations: ['Tight shoulders'],
    notes: 'Morning tea in the balcony. Felt anchored and rested.',
    breathingCompleted: false
  },
  {
    id: 'chk-3',
    timestamp: '2026-09-17T21:40:00Z',
    dateStr: 'Sep 17 at 9:40 PM',
    mood: 'fatigued',
    intensity: 5,
    sensations: ['Heavy limbs', 'Restless'],
    notes: 'Screen time was high today. Preparing for an early night.',
    breathingCompleted: true
  }
];
