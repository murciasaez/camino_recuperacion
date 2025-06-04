export interface RecoveryPhase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  keyFocusAreas: string[];
  color: string;
  iconClass: string;
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  iconClass: string;
  count: number;
  color: string;
}

export interface ChecklistProgress {
  completed: number;
  total: number;
  timestamp: number;
  phase: string;
  week: number;
}

export interface SearchFilters {
  category?: string;
  phase?: string;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
}
