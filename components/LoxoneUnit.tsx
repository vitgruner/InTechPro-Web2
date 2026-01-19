
import React, { useState } from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';

const StatusLED = ({ color = "bg-green-500", animate = true }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <div className={`w-1.5 h-1.5 rounded-full ${color} ${animate && !isMobile ? 'animate-pulse' : 'opacity-60'}`} />
  );
};

interface ModuleProps {
  comp: any;
  activeLabel: string | null;
  setActiveLabel: (id: string | null) => void;
}

const Module: React.FC<ModuleProps> = ({ comp, activeLabel, setActiveLabel }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <div 
      onMouseEnter={!isMobile ? () => setActiveLabel(comp.id) : undefined}
      onMouseLeave={!isMobile ? () => setActiveLabel(null) : undefined}
      className={`relative h-24 md:h-28 ${comp.width} flex-shrink-0 ${comp.color} rounded-md border-x border-white/10 flex flex-col p-3 transition-transform ${!isMobile ? 'hover:scale-105 hover:z-30 cursor-help' : ''} overflow-hidden`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-1">
          <StatusLED color="bg-green-500" />
          <StatusLED color="bg-orange-500" animate={false} />
        </div>
        <Cpu className={`w-3.5 h-3.5 opacity-20 ${comp.color.includes('lime') ? 'text-black' : 'text-white'}`} />
      </div>
      
      <div className={`mt-auto text-[8px] md:text-[9px] font-black uppercase tracking-tight ${comp.color.includes('lime') ? 'text-black/70' : 'text-zinc-400'}`}>
        {comp.label}
      </div>

      {!isMobile && activeLabel === comp.id && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
           <div className="bg-white/95 dark:bg-black/95 text-[9px] font-black text-blue-600 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest whitespace-nowrap">
              Online
           </div>
        </div>
      )}
    </div>
  );
};

const LoxoneUnit = () => {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const rail0 = [
    { id: 'miniserver', label: 'Miniserver', color: 'bg-lime-500', width: 'w-40 md:w-60' }, 
    { id: 'ext1', label: 'Extension', color: 'bg-zinc-800', width: 'w-24 md:w-40' }, 
    { id: 'air', label: 'Air Base', color: 'bg-zinc-800', width: 'w-32 md:w-48' }, 
  ];

  const rail1 = [
    { id: 'relay1', label: 'Relay Ext.', color: 'bg-zinc-900', width: 'w-32 md:w-56' }, 
    { id: 'audioserver', label: 'Audio', color: 'bg-[#964c91]', width: 'w-32 md:w-48' }, 
  ];

  const fuseCount = isMobile ? 8 : 20;

  return (
    <div className="w-full h-full p-2 md:p-10 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-[#0d0f12] overflow-hidden">
      <div className="relative w-full max-w-7xl bg-white dark:bg-[#1a1d21] rounded-xl border-[4px] md:border-[10px] border-gray-200 dark:border-[#2a2e35] flex flex-col transition-colors">
        
        <div className="relative z-20 flex flex-col gap-3 md:gap-6 p-3 md:p-6 overflow-hidden">
          {[rail0, rail1].map((rail, idx) => (
            <div key={idx} className="relative h-28 md:h-32 w-full bg-gray-100/50 dark:bg-[#24292e]/40 rounded-lg border-y border-gray-200 dark:border-white/5 flex items-center overflow-x-auto scrollbar-hide gap-2 md:gap-4 px-3 shadow-inner">
              <div className="flex gap-2 md:gap-4 min-w-max items-center">
                {rail.map((comp) => (
                  <Module 
                    key={comp.id} 
                    comp={comp} 
                    activeLabel={activeLabel} 
                    setActiveLabel={setActiveLabel} 
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="relative h-14 md:h-20 w-full bg-gray-100/50 dark:bg-[#24292e]/40 rounded-lg border-y border-gray-200 dark:border-white/5 flex items-center overflow-x-auto scrollbar-hide px-3 gap-1 shadow-inner">
            <div className="flex gap-1 md:gap-1.5 flex-shrink-0">
              {Array.from({length: fuseCount}).map((_, i) => (
                <div key={i} className="w-3.5 md:w-5 h-10 md:h-16 bg-zinc-50 dark:bg-zinc-100 rounded border border-gray-300 flex flex-col items-center justify-between py-1">
                  <div className="w-full h-1 bg-blue-500 rounded-full" />
                  <div className="w-2 md:w-3 h-3 md:h-6 bg-gray-200 dark:bg-zinc-300 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#1a1d21] border-t border-gray-200 dark:border-white/5 px-4 md:px-10 py-2 md:py-4 flex justify-between items-center opacity-80">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[8px] md:text-[11px] font-black text-gray-500 uppercase tracking-widest">System Ready</span>
           </div>
           <div className="flex items-center gap-4">
                <Activity className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                <Zap className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoxoneUnit;
