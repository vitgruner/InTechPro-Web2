import React from 'react';
import {
  Palette, Sun, Moon, Eye, Settings, ArrowLeft, CheckCircle2,
  Zap, Layout, Lightbulb, Thermometer, Activity, Info, Sparkles,
  Scaling, Layers
} from 'lucide-react';
import LightControl from './LightControl';
import { DetailProps } from '../types';
import SectionHeader from './SectionHeader';
import ServicePager from './ServicePager';
import Breadcrumbs from './Breadcrumbs';

const OsvetleniDetail: React.FC<DetailProps> = ({ setView }) => {
  const warnings = [
    {
      title: 'Dostatek světla v každé místnosti',
      desc: 'Každý prostor má jiné nároky na intenzitu. Podcenění je častá chyba.',
      icon: <Sun className="w-5 h-5" />
    },
    {
      title: 'Kombinace více typů osvětlení',
      desc: 'Základní, pracovní i náladové by měly fungovat v jednom celku.',
      icon: <Layers className="w-5 h-5" />
    },
    {
      title: 'Teplota a barva světla',
      desc: 'Správná volba má vliv na pohodu, zdraví i produktivitu práce.',
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      title: 'Ovládání a scénáře',
      desc: 'Automatizujeme scény podle denní doby, přítomnosti nebo nálady.',
      icon: <Activity className="w-5 h-5" />
    },
    {
      title: 'Budoucí flexibilita',
      desc: 'Dobře navržené osvětlení se dá v budoucnu snadno upravit.',
      icon: <Scaling className="w-5 h-5" />
    }
  ];

  return (
    <div className="pt-28 md:pt-32 pb-12 md:pb-16 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: 'SLUŽBY', view: 'sluzby' },
            { label: 'Návrh Osvětlení' }
          ]}
          setView={setView}
        />

        <div className="mb-6">
          <SectionHeader
            variant="page"
            align="left"
            eyebrow="Design a technické řešení"
            title="Návrh a realizace"
            highlight="Osvětlení"
            description="Nabízíme kompletní službu – od návrhu přes výběr svítidel až po samotnou realizaci a automatizaci scénických režimů."
            className="mb-0"
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-10 items-stretch">
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            <div className="glass-panel p-8 md:p-10 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-left shadow-xl">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-8 text-sm md:text-base">
                Pomůžeme vám zorientovat se v možnostech a navrhneme osvětlení tak, aby každý prostor fungoval přesně tak, jak má. Hlídáme intenzitu i atmosféru.
              </p>

              <div className="p-6 bg-[#69C350]/5 rounded-2xl border border-[#69C350]/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#69C350] rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-5 h-5 fill-white" />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-xs text-[#69C350]">Loxone integrace</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-[10px] leading-relaxed font-bold uppercase tracking-tight">
                  Díky propojení s chytrou domácností osvětlení automatizujeme a scénicky řídíme. Světlo se stane přirozenou součástí domova.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="w-full glass-panel rounded-[2.5rem] border border-slate-200 dark:border-white/10 relative overflow-hidden group select-none transition-all duration-500 shadow-xl bg-white/50 dark:bg-black/20 h-full flex flex-col">
              <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#69C350 1px, transparent 1px), linear-gradient(90deg, #69C350 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <div className="absolute top-0 left-0 right-0 p-4 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md z-30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7BD462] animate-pulse" />
                    <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em]">RGB OSVĚTLENÍ</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center pt-14 bg-slate-50/30 dark:bg-black/40 min-h-[400px]">
                <LightControl />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <div className="text-left mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#69C350]/10 dark:bg-[#7BD462]/10 border border-[#69C350]/20 dark:border-[#95E87D]/20 text-[#69C350] dark:text-[#95E87D] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Odborné poradenství
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-left">Na co si dát v návrhu <span className="text-[#69C350]">pozor?</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {warnings.map((warning, i) => (
              <div key={i} className="glass-panel p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02] hover:border-[#7BD462]/30 transition-all group shadow-sm">
                <div className="flex items-center gap-4 md:block">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#69C350]/10 rounded-xl md:rounded-xl flex items-center justify-center md:mb-6 text-[#69C350] group-hover:bg-[#69C350] group-hover:text-white transition-all shrink-0">
                    {warning.icon}
                  </div>
                  <h4 className="text-sm md:text-lg font-black uppercase tracking-tight leading-tight">{warning.title}</h4>
                </div>
                <p className="mt-4 md:mt-0 text-[11px] md:text-xs text-gray-500 font-medium leading-relaxed">{warning.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <ServicePager currentView="navrh-osvetleni" setView={setView} />
      </div>
    </div>
  );
};

export default OsvetleniDetail;