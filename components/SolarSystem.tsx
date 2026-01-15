
import React, { useState, useEffect } from 'react';
import { Sun, Zap, Battery, Home, Globe, LucideIcon } from 'lucide-react';

interface PowerNodeProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  color: string;
  position: string;
}

const SolarSystem = () => {
  const [metrics, setMetrics] = useState({
    production: 4.3,
    load: 1.8,
    battery: 85,
    batteryPower: 2.0,
    gridPower: 0.5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const productionChange = (Math.random() - 0.5) * 0.1;
        const loadChange = (Math.random() - 0.5) * 0.2;
        const newProduction = Math.max(0, parseFloat((prev.production + productionChange).toFixed(1)));
        const newLoad = Math.max(0.2, parseFloat((prev.load + loadChange).toFixed(1)));
        
        const net = newProduction - newLoad;
        let batteryPower = 0;
        let gridPower = 0;

        if (net > 0) {
            batteryPower = Math.min(net, 2.0);
            gridPower = parseFloat((net - batteryPower).toFixed(1));
        } else {
            batteryPower = Math.max(net, -3.0);
            gridPower = parseFloat((net - batteryPower).toFixed(1));
        }

        return {
          production: newProduction,
          load: newLoad,
          battery: Math.min(100, Math.max(0, prev.battery + (batteryPower * 0.01))),
          batteryPower,
          gridPower
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const PowerNode: React.FC<PowerNodeProps> = ({ icon: Icon, label, value, unit, color, position }) => (
    <div className={`absolute ${position} z-20`}>
      {/* ANCHOR: ikona je přesně v bodě ukotvení */}
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl glass-panel border border-${color}-400/30 flex items-center justify-center shadow-xl bg-white dark:bg-[#1a1d21]`}>
          <Icon className={`w-5 h-5 md:w-8 md:h-8 text-${color}-600 dark:text-${color}-400`} />
        </div>

        {/* Text už je mimo anchor – jde dolů a neovlivňuje vycentrování */}
        <div className="mt-2 flex flex-col items-center text-center px-2">
          <span className="text-[7px] md:text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] mb-0.5 whitespace-nowrap">
            {label}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-sm md:text-xl font-black text-gray-900 dark:text-white tabular-nums font-mono">
              {Math.abs(value).toFixed(1)}
            </span>
            <span className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase">
              {unit}
            </span>
          </div>
        </div>

        {label.includes('Battery') && (
          <div className="w-10 md:w-12 h-1 bg-gray-200 dark:bg-white/5 rounded-full mt-2 overflow-hidden border border-black/5 dark:border-white/5">
            <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${metrics.battery}%` }} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-4 md:p-12 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-[#0d0f12] overflow-hidden relative transition-colors duration-500 min-h-[500px] md:min-h-[600px]">
      <div className="relative w-full max-w-2xl aspect-[4/5] sm:aspect-square flex items-center justify-center">
        
        {/* Animated Flux Paths SVG - Precisely aligned to 400x400 grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <defs>
             <filter id="solarGlow">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
             </filter>
          </defs>
          
          {/* Central cross background lines */}
          <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-gray-300/70 dark:text-white/15" />
          <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-gray-300/70 dark:text-white/15" />

          {/* PV to Logic (Top) */}
          <path d="M 200 60 L 200 160" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeDasharray="8 12" filter="url(#solarGlow)">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.5s" repeatCount="indefinite" />
          </path>
          
          {/* Logic to Battery (Bottom) */}
          <path d="M 200 240 L 200 340" stroke="#10b981" strokeWidth="2.5" fill="none" strokeDasharray="8 12" filter="url(#solarGlow)">
            <animate attributeName="stroke-dashoffset" from={metrics.batteryPower >= 0 ? "100" : "0"} to={metrics.batteryPower >= 0 ? "0" : "100"} dur="2.5s" repeatCount="indefinite" />
          </path>

          {/* Grid to Logic (Left) */}
          <path d="M 60 200 L 160 200" stroke="#a855f7" strokeWidth="2.5" fill="none" strokeDasharray="8 12" filter="url(#solarGlow)">
            <animate attributeName="stroke-dashoffset" from={metrics.gridPower >= 0 ? "100" : "0"} to={metrics.gridPower >= 0 ? "0" : "100"} dur="2.5s" repeatCount="indefinite" />
          </path>

          {/* Logic to Home (Right) */}
          <path d="M 240 200 L 340 200" stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeDasharray="8 12" filter="url(#solarGlow)">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.5s" repeatCount="indefinite" />
          </path>
        </svg>

        {/* Central Core - Perfectly centered using absolute positioning */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-20 h-20 md:w-28 md:h-28 rounded-3xl glass-panel border-2 border-blue-600/30 dark:border-blue-400/40 flex flex-col items-center justify-center bg-white dark:bg-[#1a1d21] shadow-[0_0_50px_rgba(37,99,235,0.15)] group transition-all duration-500">
          <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-400/5 rounded-3xl animate-pulse" />
          <Zap className="w-8 h-8 md:w-12 md:h-12 text-blue-600 dark:text-blue-400 relative z-10 drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
          <span className="text-[7px] md:text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mt-1 relative z-10">Invertor</span>
        </div>

        {/* Distributed Nodes */}
        <PowerNode 
          icon={Sun} 
          label="PV Generation" 
          value={metrics.production} 
          unit="kW" 
          color="yellow" 
          position="top-[15%] left-1/2 -translate-x-1/2 -translate-y-6 md:-translate-y-8" 
        />
     <PowerNode
  icon={Battery}
  label="Battery Storage"
  value={metrics.batteryPower}
  unit="kW"
  color="green"
  position="top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2"
/>
        <PowerNode 
          icon={Home} 
          label="House Load" 
          value={metrics.load} 
          unit="kW" 
          color="blue" 
          position="right-[15%] top-1/2 translate-x-1/2 -translate-y-6 md:-translate-y-8" 
        />
        <PowerNode 
          icon={Globe} 
          label="Grid Status" 
          value={metrics.gridPower} 
          unit="kW" 
          color="purple" 
          position="left-[15%] top-1/2 -translate-x-1/2 -translate-y-6 md:-translate-y-8" 
        />

      </div>

      {/* Global Metrics Footer */}
      <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/5 w-full flex justify-center gap-12 md:gap-20">
         <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 tracking-[0.3em] uppercase mb-1.5">Měsíční úspora</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-2xl font-black text-gray-900 dark:text-white font-mono">2.4</span>
              <span className="text-[10px] font-bold text-blue-600">MWh</span>
            </div>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 tracking-[0.3em] uppercase mb-1.5">CO2 Offset</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-2xl font-black text-gray-900 dark:text-white font-mono">124</span>
              <span className="text-[10px] font-bold text-green-600">kg</span>
            </div>
         </div>
         <div className="hidden sm:flex flex-col items-center">
            <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 tracking-[0.3em] uppercase mb-1.5">Efektivita</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg md:text-2xl font-black text-gray-900 dark:text-white font-mono">98.2</span>
              <span className="text-[10px] font-bold text-yellow-600">%</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SolarSystem;
