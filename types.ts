
import React from 'react';

export type ViewState = 'home' | 'services' | 'showcase' | 'innovation' | 'contact' | 'about' | 'partners' | 'projekce-elektro' | 'osvetleni' | 'rozvadece' | 'loxone-detail' | 'technologie' | 'admin-login' | 'admin-dashboard';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  active?: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export enum ProjectStage {
  PLANNING = 'PLANNING',
  DESIGN = 'DESIGN',
  REALIZATION = 'REALIZATION'
}

export interface SensorData {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

export interface SmartDevice {
  id: string;
  name: string;
  type: 'light' | 'valve';
  status: boolean;
  x: number;
  y: number;
}

export interface ReferenceService {
  label: string;
  icon: string; // Changed to string for serialization
}

export interface Reference {
  title: string;
  category: string;
  location: string;
  image: string;
  tech: string;
  techIcon: string; // Changed to string for serialization
  services: ReferenceService[];
}

export interface ReferenceCardProps extends Reference {}

// Prop Interfaces for Components
export interface NavProps {
  isDark: boolean;
  toggleTheme: () => void;
  setView: (view: ViewState) => void;
  currentView: ViewState;
}

export interface HeroProps {
  setView: (view: ViewState) => void;
}

export interface ServicesProps {
  setView: (view: ViewState) => void;
}

export interface DetailProps {
  setView: (view: ViewState) => void;
}

export interface AdminLoginProps {
  onLogin: () => void;
}

export interface ReferenceFormProps {
  onAdd: (ref: Reference) => void;
  onCancel: () => void;
}

export interface ReferencesProps {
  projects: Reference[];
  isStandalone?: boolean;
}
