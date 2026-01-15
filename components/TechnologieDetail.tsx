
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
        <Breadcrumbs 
          items={[
            { label: 'SLUŽBY', view: 'services' },
            { label: 'Moderní Technologie' }
          ]}
          setView={setView}
        />

        <SectionHeader 
          variant="page"
          align="left"
          eyebrow="Pokročilé systémové inženýrství"
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
          
          <div className="lg:col-span-7 h-full">
            <SolarSystem />
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

        <ServicePager currentView="technologie" setView={setView} />
      </div>
    </div>
  );
};

export default TechnologieDetail;
