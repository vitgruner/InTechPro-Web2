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

export interface TopologyStats {
  sensors: number;
  cablingKm: number;
  modules: number;
  racks: number;
}

export interface Reference {
  title: string;
  category: string;
  location: string;
  image: string;
  tech: string;
  techIcon: string;
  services: ReferenceService[];
  topology?: TopologyStats;
}

export interface ReferenceCardProps extends Reference {}

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
  isStandalone?: boolean;
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
  setView?: (view: ViewState) => void;
}

export interface BreadcrumbsProps {
  items: { label: string; view?: ViewState }[];
  setView: (view: ViewState) => void;
}