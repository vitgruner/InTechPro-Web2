
import React from 'react';
import { Settings, Box, ShieldCheck, PenTool, Truck, Calculator, FileText, BadgeCheck, TrendingUp, ArrowLeft, Zap } from 'lucide-react';
import LoxoneUnit from './LoxoneUnit';
import { DetailProps } from '../types';

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
        <button 
          onClick={() => setView('services')}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-[10px] mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na služby
        </button>

        <div className="mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
          <div className="max-w-3xl text-left">
            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Engineered for Reliability</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              Realizace <br /><span className="text-gradient">rozvaděčů</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-2xl">
              Kvalitně navržený rozvaděč je základ spolehlivé elektroinstalace i chytré domácnosti. Proto klademe důraz na detailní přípravu už ve fázi projekce.
            </p>
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
          
          <div className="lg:col-span-8">
            <div className="w-full glass-panel rounded-[2rem] border border-slate-200 dark:border-white/10 relative overflow-hidden group select-none transition-all duration-500 shadow-xl bg-white/50 dark:bg-black/20 h-full flex flex-col">
              <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              <div className="absolute top-0 left-0 right-0 p-4 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md z-30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em]">INTECHPRO.ROZVADĚČ.AKTIVNÍ</span>
                  </div>
                  <div className="h-3 w-[1px] bg-slate-300 dark:bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">TELEMETRIE.v4.0</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                   <span>Technologie: Loxone</span>
                   <span>Status: Online</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center pt-14 bg-slate-50/30 dark:bg-black/40 min-h-[450px]">
                <LoxoneUnit />
              </div>
            </div>
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

        <div className="bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden group mb-20 shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <Settings className="w-48 h-48" />
          </div>
          <div className="relative z-10 text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight">Máte vizi rozvaděče?</h2>
            <button 
              onClick={() => setView('contact')}
              className="bg-white text-blue-600 px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-2xl flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Poptat návrh a výrobu
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RozvadeceDetail;
