
import React from 'react';
import { Thermometer, Wind, Sun, ArrowLeft, CheckCircle2, Zap, Snowflake, Briefcase, Settings, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
import SolarSystem from './SolarSystem';
import { DetailProps } from '../types';
import SectionHeader from './SectionHeader';

const TechnologieDetail: React.FC<DetailProps> = ({ setView }) => {
  const techCards = [
    { 
      title: 'Tepelná čerpadla', 
      desc: 'Efektivní vytápění a chlazení s prediktivní logikou podle předpovědi počasí.',
      icon: <Thermometer className="w-5 h-5" />
    },
    { 
      title: 'Rekuperace', 
      desc: 'Automatická výměna vzduchu na základě hladiny CO2 a vlhkosti v interiéru.',
      icon: <Wind className="w-5 h-5" />
    },
    { 
      title: 'Klimatizace', 
      desc: 'Chlazení reagující na přítomnost osob a intenzitu slunečního svitu.',
      icon: <Snowflake className="w-5 h-5" />
    },
    { 
      title: 'Fotovoltaika', 
      desc: 'Maximální využití vlastní energie díky chytrému řízení přebytků.',
      icon: <Sun className="w-5 h-5" />
    }
  ];

  const scope = [
    'Technický návrh a projektová dokumentace',
    'Dodávka a odborná montáž technologií',
    'Uvedení do provozu a přesné nastavení',
    'Kompletní integrace do Loxone'
  ];

  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => setView('services')}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-[10px] mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na služby
        </button>

        <SectionHeader 
          variant="page"
          align="left"
          eyebrow="Advanced Systems Engineering"
          title="Návrh a realizace"
          highlight="Technologií"
          description="Každý dům je jiný – a stejné to platí i pro technologie, které ho pohánějí. Zajišťujeme kompletní dodávku moderních systémů pro domy i komerční objekty."
        />

        <div className="grid lg:grid-cols-12 gap-10 mb-24 items-stretch">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-left h-full flex flex-col justify-center shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Řešení na míru</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-8">
                Nepracujeme s univerzálními balíčky. Navrhneme řešení a konkrétní značky technologií na základě vašich požadavků.
              </p>
              
              <div className="space-y-4">
                {scope.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="w-full glass-panel rounded-[2.5rem] border border-slate-200 dark:border-white/10 relative overflow-hidden group select-none transition-all duration-500 shadow-xl bg-white/50 dark:bg-black/20 h-full flex flex-col">
              <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              <div className="absolute top-0 left-0 right-0 p-4 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md z-30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em]">ENERGY.MATRIX.ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center pt-14 bg-slate-50/30 dark:bg-black/40 min-h-[500px]">
                <SolarSystem />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {techCards.map((card, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02] hover:border-blue-500/30 transition-all group shadow-sm">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {card.icon}
              </div>
              <h4 className="text-lg font-black mb-3 uppercase tracking-tight">{card.title}</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <Zap className="w-48 h-48" />
          </div>
          <div className="relative z-10 text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">Potřebujete technologii, která dává smysl?</h2>
            <button 
              onClick={() => setView('contact')}
              className="bg-white text-blue-600 px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-2xl flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Zahájit návrh
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologieDetail;
