
import React from 'react';
import { Thermometer, Wind, Sun, ArrowLeft, CheckCircle2, Zap, Snowflake, Briefcase, Settings, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
import SolarSystem from './SolarSystem';
import { DetailProps } from '../types';
import SectionHeader from './SectionHeader';
import ServicePager from './ServicePager';
import Breadcrumbs from './Breadcrumbs';

const TechnologieDetail: React.FC<DetailProps> = ({ setView }) => {
  const techCards = [
    { 
      title: 'Tepelná čerpadla', 
      desc: 'Efektivní vytápění a chlazení s prediktivní logikou podle předpovědi.',
      icon: <Thermometer className="w-5 h-5" />
    },
    { 
      title: 'Rekuperace', 
      desc: 'Automatická výměna vzduchu na základě hladiny CO2 v interiéru.',
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
    <div className="pt-28 md:pt-32 pb-12 md:pb-16 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs 
          items={[
            { label: 'SLUŽBY', view: 'sluzby' },
            { label: 'Moderní Technologie' }
          ]}
          setView={setView}
        />

        <div className="mb-6">
          <SectionHeader 
            variant="page"
            align="left"
            eyebrow="Pokročilé systémové inženýrství"
            title="Návrh a realizace"
            highlight="Technologií"
            description="Zajišťujeme kompletní dodávku moderních systémů pro domy i komerční objekty. Vše pod kontrolou inteligentního jádra Loxone."
            className="mb-0"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 mb-10 items-stretch">
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            <div className="glass-panel p-8 md:p-10 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-left shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#69C350]/10 rounded-2xl flex items-center justify-center text-[#69C350]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Rozsah dodávky</h3>
              </div>
              
              <div className="space-y-3">
                {scope.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white dark:bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-black/5 dark:border-white/10 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 md:w-5 h-5 text-[#69C350] flex-shrink-0" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 h-full">
            <div className="glass-panel rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/20 overflow-hidden shadow-2xl flex flex-col transition-all group h-full">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20 shadow-lg group-hover:bg-yellow-500 group-hover:text-white transition-all duration-500 flex-shrink-0">
                    <Sun className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 truncate leading-tight">Solární matice FVE</h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5 truncate">Energetické toky real-time</p>
                  </div>
                </div>
              </div>
              <div className="flex-grow rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-black/60 shadow-inner min-h-[400px]">
                <SolarSystem />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-5">
          {techCards.map((card, i) => (
            <div key={i} className="glass-panel p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02] hover:border-[#7BD462]/30 transition-all group shadow-sm flex flex-col">
              <div className="flex items-center gap-4 md:block">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#69C350]/10 rounded-xl flex items-center justify-center md:mb-6 text-[#69C350] group-hover:bg-[#69C350] group-hover:text-white transition-all flex-shrink-0">
                  <div className="[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                    {card.icon}
                  </div>
                </div>
                <h4 className="text-sm md:text-lg font-black uppercase tracking-tight leading-tight">{card.title}</h4>
              </div>
              <p className="mt-4 md:mt-0 text-[11px] md:text-xs text-gray-500 font-medium leading-relaxed line-clamp-3">{card.desc}</p>
            </div>
          ))}
        </div>

        <ServicePager currentView="moderni-technologie" setView={setView} />
      </div>
    </div>
  );
};

export default TechnologieDetail;
