
import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';

const StatusLED = React.memo(({ color = "bg-green-500", animate = true, isMobile = false }: { color?: string; animate?: boolean; isMobile?: boolean }) => {
  return (
    <div className={`w-1.5 h-1.5 rounded-full ${color} ${animate && !isMobile ? 'animate-pulse' : 'opacity-60'} shadow-[0_0_4px_currentColor]`} />
  );
});

interface ModuleProps {
  comp: any;
  activeLabel: string | null;
  setActiveLabel: (id: string | null) => void;
  isMobile: boolean;
}

const Module: React.FC<ModuleProps> = React.memo(({ comp, activeLabel, setActiveLabel, isMobile }) => (
  <div
    onMouseEnter={() => !isMobile && setActiveLabel(comp.id)}
    onMouseLeave={() => !isMobile && setActiveLabel(null)}
    className={`relative h-24 md:h-28 ${comp.width} flex-shrink-0 ${comp.color} rounded-md shadow-lg border-x border-white/10 flex flex-col p-3 transition-all hover:scale-[1.02] hover:z-30 cursor-help overflow-hidden`}
  >
    <div className="flex justify-between items-start">
      <div className="flex gap-1.5">
        <StatusLED color="bg-green-500" isMobile={isMobile} />
        <StatusLED color="bg-orange-500" animate={true} isMobile={isMobile} />
      </div>
      <div className="opacity-20">
        <Cpu className={`w-3.5 h-3.5 ${comp.color.includes('lime') ? 'text-black' : 'text-white'}`} />
      </div>
    </div>

    <div className={`mt-auto text-[8px] md:text-[10px] font-black uppercase tracking-tight ${comp.color.includes('lime') ? 'text-black/70' : 'text-zinc-400'}`}>
      {comp.label}
    </div>

    {activeLabel === comp.id && (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
        <div className="bg-white/95 dark:bg-black/95 text-[10px] font-black text-blue-600 px-4 py-1.5 rounded-full border border-blue-500/20 shadow-2xl uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          Online
        </div>
      </div>
    )}
  </div>
));

const rail0 = [
  { id: 'miniserver', label: 'Loxone Miniserver', type: 'core', color: 'bg-lime-500 dark:bg-lime-600', width: 'w-48 md:w-60' },
  { id: 'ext1', label: 'Multi-Extension Air', type: 'ext', color: 'bg-zinc-800 dark:bg-zinc-900', width: 'w-32 md:w-40' },
  { id: 'air', label: 'Air Base Extension', type: 'ext', color: 'bg-zinc-800 dark:bg-zinc-900', width: 'w-40 md:w-48' },
  { id: 'tree', label: 'Tree Extension', type: 'ext', color: 'bg-zinc-800 dark:bg-zinc-900', width: 'w-32 md:w-40' },
];

const rail1 = [
  { id: 'relay1', label: 'Relay Extension', type: 'ext', color: 'bg-zinc-900', width: 'w-44 md:w-56' },
  { id: 'audioserver', label: 'Audio Server', type: 'ext', color: 'bg-[#964c91]', width: 'w-40 md:w-48' },
  { id: 'dali', label: 'DALI Extenstion', type: 'ext', color: 'bg-lime-600', width: 'w-40 md:w-48' },
  { id: 'link', label: 'Link Node', type: 'ext', color: 'bg-zinc-900', width: 'w-28 md:w-36' },
];

const rail2 = [
  { id: 'relay2', label: 'Relay Extension', type: 'ext', color: 'bg-zinc-900', width: 'w-40 md:w-48' },
  { id: 'dimmer', label: 'Dimmer', type: 'ext', color: 'bg-zinc-800', width: 'w-44 md:w-56' },
  { id: 'onewire', label: '1-Wire', type: 'ext', color: 'bg-zinc-900', width: 'w-32 md:w-40' },
  { id: 'meter', label: '3-phase Meter', type: 'meter', color: 'bg-zinc-800', width: 'w-32 md:w-40' },
];

const rails = [rail0, rail1, rail2];

const LoxoneUnit = React.memo(() => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full p-3 md:p-10 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-[#0d0f12] transition-colors duration-500 overflow-hidden">
      <div className="relative w-full max-w-7xl bg-white dark:bg-[#1a1d21] rounded-xl md:rounded-2xl border-[6px] md:border-[10px] border-gray-200 dark:border-[#2a2e35] shadow-2xl flex flex-col transition-colors duration-500">

        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(var(--text-color) 1px, transparent 1px)', backgroundSize: '100% 120px' }} />

        <div className="md:hidden absolute top-2 right-4 z-50 animate-pulse text-[8px] font-black text-blue-500 uppercase tracking-widest pointer-events-none">
          Swipe Rail ⟷
        </div>

        <div className="relative z-20 flex flex-col gap-4 md:gap-6 p-4 md:p-6 overflow-hidden">
          {rails.map((rail, idx) => (
            <div key={idx} className="relative h-28 md:h-32 w-full bg-gray-100/50 dark:bg-[#24292e]/40 rounded-lg border-y border-gray-200 dark:border-white/5 flex items-center overflow-x-auto overflow-y-hidden scrollbar-hide gap-3 md:gap-4 px-3 md:px-4 shadow-inner transition-colors">
              <div className="flex gap-3 md:gap-4 min-w-max items-center">
                {rail.map((comp) => (
                  <Module
                    key={comp.id}
                    comp={comp}
                    activeLabel={activeLabel}
                    setActiveLabel={setActiveLabel}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="relative h-16 md:h-20 w-full bg-gray-100/50 dark:bg-[#24292e]/40 rounded-lg border-y border-gray-200 dark:border-white/5 flex items-center overflow-x-auto scrollbar-hide px-3 md:px-4 gap-1.5 shadow-inner">
            <div className="flex gap-1 md:gap-1.5 flex-shrink-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-4 md:w-5 h-12 md:h-16 bg-zinc-50 dark:bg-zinc-100 rounded border border-gray-300 dark:border-zinc-400 flex flex-col items-center justify-between py-1 shadow-sm">
                  <div className="w-full h-1 bg-blue-500 rounded-full" />
                  <div className="w-2.5 md:w-3 h-4 md:h-6 bg-gray-200 dark:bg-zinc-300 rounded-sm border border-gray-300" />
                  <span className="text-[4px] md:text-[5px] font-black text-gray-500 uppercase">B16</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#1a1d21] border-t border-gray-200 dark:border-white/5 px-6 md:px-10 py-3 md:py-4 flex flex-col sm:flex-row justify-between items-center opacity-80 gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500 opacity-80 shadow-[0_0_8px_#22c55e]" />
            <span className="text-[9px] md:text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center sm:text-left">Intelligence Synchronized</span>
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 md:gap-2.5">
              <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500" />
              <span className="text-[9px] md:text-[11px] font-black text-gray-600 dark:text-white/60 uppercase tracking-widest">Active</span>
            </div>
            <div className="flex items-center gap-2 md:gap-2.5">
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-500" />
              <span className="text-[9px] md:text-[11px] font-black text-gray-600 dark:text-white/60 uppercase tracking-widest">1.3kW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoxoneUnit;
