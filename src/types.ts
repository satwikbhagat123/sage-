export type TabType = 'home' | 'chat' | 'checkin' | 'journal' | 'safety';

export type MoodType = 'calm' | 'overwhelmed' | 'fatigued' | 'anxious';

export interface MoodOption {
  id: MoodType;
  label: string;
  sublabel: string;
  icon: string;
  colorClass: string;
  tagColor: string;
}

export interface BodySensation {
  id: string;
  label: string;
}

export interface CheckInRecord {
  id: string;
  timestamp: string;
  dateStr: string;
  mood: MoodType;
  intensity: number;
  sensations: string[];
  notes?: string;
  breathingCompleted?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'sage' | 'user';
  text: string;
  time: string;
}

export type EmergencyWorkflow = 'message_first' | 'call_direct' | 'message_then_call';

export interface EmergencyContact {
  id: string;
  name: string;
  initials: string;
  relationship: string;
  phone: string;
  preferredMethod: string;
  isPrimary?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  streakDays: number;
  lastCheckIn?: string;
}
