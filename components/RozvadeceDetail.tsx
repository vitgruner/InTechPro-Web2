
import React from 'react';
import { Settings, Box, ShieldCheck, PenTool, Truck, Calculator, FileText, BadgeCheck, TrendingUp, ArrowLeft, Zap, Cpu } from 'lucide-react';
import LoxoneUnit from './LoxoneUnit';
import { DetailProps } from '../types';
import SectionHeader from './SectionHeader';
import ServicePager from './ServicePager';
import Breadcrumbs from './Breadcrumbs';

interface VisualizationBoxProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
  statusLabel?: string;
}

const VisualizationBox: React.FC<VisualizationBoxProps> = ({ icon: Icon, title, subtitle, color, children, statusLabel = "Aktivní spojení" }) => (
  <div className="glass-panel rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/20 overflow-hidden shadow-2xl flex flex-col transition-all group">
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${color}/10 rounded-xl flex items-center justify-center border border-${color.split('-')[1]}-500/20 shadow-lg group-hover:bg-${color.split('-')[1]}-600 group-hover:text-white transition-all duration-500 flex-shrink-0`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color.replace('bg-', 'text-')} group-hover:text-white transition-colors`} />
        </div>
        <div className="min-w-0 flex flex-col justify-center">
          <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 truncate leading-tight" title={title}>{title}</h3>
          <p className="text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5 truncate" title={subtitle}>{subtitle}</p>
        </div>
      </div>
      <div className={`hidden sm:flex flex-shrink-0 items-center gap-2 ${color}/5 px-3 py-1.5 rounded-full border border-${color.split('-')[1]}-600/20`}>
        <div className={`w-1.5 h-1.5 ${color} rounded-full animate-pulse shadow-[0_0_8px_currentColor]`} />
        <span className={`text-[9px] font-black ${color.replace('bg-', 'text-')} dark:text-white uppercase tracking-widest`}>{statusLabel}</span>
      </div>
    </div>
    <div className="flex-grow rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-black/60 shadow-inner">
      {children}
    </div>
  </div>
);

const RozvadeceDetail: React.FC<DetailProps> = ({ setView }) => {
  const whyUs = [
    { label: 'Přehledná a profesionální dokumentace', icon: <FileText className="w-4 h-4" /> },
    { label: 'Připraveno pro revizi a kolaudaci', icon: <BadgeCheck className="w-4 h-4" /> },
    { label: 'Rychlejší montáž na stavbě', icon: <Zap className="w-4 h-4" /> },
    { label: 'Vysoká kvalita zpracování', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Snadná údržba a budoucí rozšíření', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs 
          items={[
            { label: 'SLUŽBY', view: 'services' },
            { label: 'Výroba Rozvaděčů' }
          ]}
          setView={setView}
        />

        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="max-w-3xl text-left w-full">
            <SectionHeader 
              variant="page"
              align="left"
              eyebrow="Engineered for Reliability"
              title="Realizace"
              highlight="rozvaděčů"
              description="Kvalitně navržený rozvaděč je základ spolehlivé elektroinstalace i chytré domácnosti. Proto klademe důraz na detailní přípravu už ve fázi projekce."
              className="mb-0"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-20 items-stretch">
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-left h-full flex flex-col justify-center shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
                  <PenTool className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Dokumentace a revize</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-8 text-sm">
                Vytváříme přehledná schémata – ať už jde o Loxone technologie nebo domovní rozvaděč. Díky promyšlenému návrhu je rozvaděč funkční, přehledný a servisovatelný.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-green-500/5 p-4 rounded-2xl border border-green-500/10">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400">Podklad pro revizi a kolaudaci</span>
                </div>
                {whyUs.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-blue-600/5 p-3 rounded-xl border border-blue-600/10 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="text-blue-600 dark:text-blue-400">{item.icon}</div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8 min-w-0 overflow-hidden">
            <VisualizationBox 
              icon={Cpu} 
              title="Centrální rozvaděc" 
              subtitle="Logika, měření a distribuce" 
              color="bg-green-600"
            >
              <LoxoneUnit />
            </VisualizationBox>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="glass-panel p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02]">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 text-blue-600">
              <Calculator className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Přesné nacenění bez překvapení</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Na základě návrhu rozvaděče připravíme detailní a přesné nacenění, díky kterému máte jasnou představu o finální ceně ještě před zahájením výroby.
            </p>
          </div>
          
          <div className="glass-panel p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02]">
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 text-blue-600">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Výroba a rychlá montáž</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Zajistíme kompletní výrobu rozvaděče na dílně. Hotový rozvaděč je poté dopraven přímo na stavbu, kde se pouze připojuje k připravené kabeláži.
            </p>
          </div>
        </div>

        <ServicePager currentView="rozvadece" setView={setView} />
      </div>
    </div>
  );
};

export default RozvadeceDetail;
