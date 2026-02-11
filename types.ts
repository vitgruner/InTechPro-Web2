import React from 'react';

export type ViewState = 'home' | 'sluzby' | 'reference' | 'online-showroom' | 'kontakt' | 'o-nas' | 'projekce-elektro' | 'navrh-osvetleni' | 'vyroba-rozvadecu' | 'loxone-smart-home' | 'moderni-technologie' | 'admin-login' | 'admin-dashboard' | 'ochrana-soukromi' | 'impresum';

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
  icon: string;
}

export interface Technology {
  label: string;
  icon: string;
}

export interface TopologyStats {
  sensors: number;
  cablingKm: number;
  modules: number;
  racks: number;
}

export interface Reference {
  id?: string;
  title: string;
  category: string;
  location: string;
  description?: string;
  image: string; // Kept for backward compatibility
  images: string[]; // New: Multiple images support
  tech: string;
  techIcon: string;
  services: ReferenceService[]; // Kept for backward compatibility
  technologies?: Technology[]; // New: Integrated technologies
  topology?: TopologyStats;
}

export interface ReferenceCardProps extends Reference { }

export interface NavProps {
  isDark: boolean;
  toggleTheme: () => void;
  setView: (view: ViewState) => void;
  currentView: ViewState;
  isAdmin: boolean;
  onLogout: () => void;
}

export interface HeroProps {
  setView: (view: ViewState) => void;
}

export interface ServicesProps {
  setView: (view: ViewState) => void;
  isStandalone?: boolean;
}

export interface DetailProps {
  setView: (view: ViewState) => void;
}

export interface AdminLoginProps {
  onLogin: () => void;
}

export interface ReferenceFormProps {
  initialData?: Partial<Reference>;
  onAdd: (ref: Reference) => Promise<boolean>;
  onCancel: () => void;
}

export interface ContactFormProps {
  isStandalone?: boolean;
  setView?: (view: ViewState) => void;
}

export interface ReferencesProps {
  projects: Reference[];
  isStandalone?: boolean;
  setView?: (view: ViewState) => void;
}

export interface BreadcrumbsProps {
  items: { label: string; view?: ViewState }[];
  setView: (view: ViewState) => void;
}