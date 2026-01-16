
import React, { useState, useEffect } from 'react';
import { 
  Zap, Thermometer, Wind, Blinds, Shield, Radio, Droplets, Waves, Car, 
  Search, PenTool, Settings, CheckSquare, FileText, ClipboardCheck, 
  Rocket, Sliders, ArrowLeft, Activity, Info
} from 'lucide-react';
import LoxoneSchema from './LoxoneSchema';
import { DetailProps } from '../types';
import SectionHeader from './SectionHeader';
import ServicePager from './ServicePager';
import Breadcrumbs from './Breadcrumbs';

const LoxoneDetail: React.FC<DetailProps> = ({ setView }) => {
  const [liveMetrics, setLiveMetrics] = useState({
    lighting: { active: 12, total: 42, pwr: 0.24 },
    heating: { temp: 22.4, valve: 45 },
    cooling: { temp: 21.8, fan: 'Auto' },
    recovery: { co2: 450, eff: 82 },
    shading: { pos: 100, mode: 'Slunce' },
    access: { status: 'Zajištěno', log: 'Před 12m' },
    energy: { production: 4.3, consumption: 1.1 },
    audio: { vol: 20, zone: 'Obývák' },
    irrigation: { moisture: 62, status: 'Vypnuto' },
    wellness: { pool: 28.5, air: 32.2 },
    emobility: { charge: 88, pwr: 11 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        lighting: { ...prev.lighting, pwr: parseFloat((0.2 + Math.random() * 0.1).toFixed(2)) },
        heating: { ...prev.heating, temp: parseFloat((prev.heating.temp + (Math.random() - 0.5) * 0.1).toFixed(1)) },
        energy: { 
          production: parseFloat((prev.energy.production + (Math.random() - 0.5) * 0.2).toFixed(1)),
          consumption: parseFloat((prev.energy.consumption + (Math.random() - 0.5) * 0.1).toFixed(1))
        },
        recovery: { ...prev.recovery, co2: Math.floor(450 + (Math.random() - 0.5) * 20) },
        wellness: { ...prev.wellness, pool: parseFloat((prev.wellness.pool + (Math.random() - 0.5) * 0.05).toFixed(1)) }
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-32 md:pt-40 pb-12 md:pb-16 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs 
          items={[
            { label: 'SLUŽBY', view: 'services' },
            { label: 'Loxone Smart Home' }
          ]}
          setView={setView}
        />

        <SectionHeader 
          variant="page"
          align="left"
          eyebrow="The Core Integration"
          title="Návrh a realizace"
          highlight="Smart Home Loxone"
          description="Moderní domy jsou plné technologií, které se starají o komfort, klima i úspory. Často ale fungují každá zvlášť – každá se svou aplikací. Výsledkem je chaos. Loxone vše propojí do jednoho harmonického celku."
        />

        <div className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">
            <div className="flex-1 w-full glass-panel rounded-[2rem] md:rounded-[3rem] overflow-hidden border-black/5 dark:border-white/10 shadow-2xl relative min-w-0">
              <LoxoneSchema />
            </div>
            
            <div className="w-full lg:w-80 flex flex-col gap-4 md:gap-6">
              <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-blue-600/10 bg-blue-600/5 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-[11px] text-blue-600 truncate">Architektura systému</h3>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  Vizualizace toku dat mezi centrálním Miniserverem a periferními klastry v reálném čase. Každý pohyb kuličky reprezentuje synchronizační paket sběrnice Tree nebo Air.
                </p>
                <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Air Sběrnice</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Tree Sběrnice</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-black/5 dark:bg-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Systémový Log</span>
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-medium">Latence Jádra</span>
                    <span className="text-blue-600 font-black">2.4ms</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-medium">Zatížení CPU</span>
                    <span className="text-blue-600 font-black">12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-12 items-center">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-red-500/10 bg-red-500/5">
                    <h3 className="font-black uppercase tracking-widest text-[11px] text-red-600 mb-3">Problém: Technologický chaos</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed font-medium">
                        Typickým příkladem je situace, kdy topení i chlazení běží současně a „bojují“ proti sobě. Každý systém má svou aplikaci, logiku i ovládání.
                    </p>
                </div>
                <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-green-500/10 bg-green-500/5">
                    <h3 className="font-black uppercase tracking-widest text-[11px] text-green-600 mb-3">Řešení: Loxone Harmonie</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed font-medium">
                        Jedna přehledná aplikace, logika automatizací a spolupráce technologií zajistí maximální komfort a dům, který funguje sám.
                    </p>
                </div>
            </div>
            <div className="space-y-6">
               <h2 className="text-2xl md:text-3xl font-black tracking-tight">Standard pro <span className="text-blue-600">Moderní domov</span></h2>
               <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
                  Loxone není jen ovládání přes mobil. Je to dům, který ví, že má zatáhnout žaluzie dříve, než se interiér přehřeje. Ví, že má vypnout topení v místnosti, kde je otevřené okno. A ví, že když odejdete, má zhasnout a zajistit dům.
               </p>
               <div className="flex gap-6 pt-2">
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-black text-blue-600">50,000+</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Rozhodnutí denně</span>
                  </div>
                  <div className="w-[1px] h-10 bg-gray-200 dark:bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-black text-blue-600">100%</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Soukromí (Local)</span>
                  </div>
               </div>
            </div>
        </div>
        
        <ServicePager currentView="loxone-detail" setView={setView} />
      </div>
    </div>
  );
};

export default LoxoneDetail;
