
import React, { useState, useEffect } from 'react';
import { Sun, Zap, Battery, Home, Globe, LucideIcon } from 'lucide-react';

interface PowerNodeProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  color: string;
  position: string;
  subValue?: string;
}

const PowerNode: React.FC<PowerNodeProps> = ({ icon: Icon, label, value, unit, color, position, subValue }) => {
  const isLabelTop = position.includes('bottom') || position.includes('translate-y-1/2');

  return (
    <div className={`absolute ${position} z-20 flex flex-col items-center group transition-all duration-700`}>
      {/* Label above node for bottom/side positions */}
      {!isLabelTop && (
        <div className="mb-2 md:mb-3 flex flex-col items-center transform group-hover:-translate-y-1 transition-transform duration-500">
          <div className="text-[7px] md:text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] leading-none mb-1">{label}</div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm md:text-lg font-black text-gray-800 dark:text-gray-100 tabular-nums leading-none">{Math.abs(value).toFixed(1)}</span>
            <span className="text-[7px] md:text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase leading-none">{unit}</span>
          </div>
        </div>
      )}

      {/* Squircle Node matching Inverter Design */}
      <div className="relative">
        <div className={`absolute inset-[-8px] md:inset-[-12px] rounded-full bg-${color}-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

        <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] bg-white/90 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl flex items-center justify-center relative z-10 transition-all duration-500 group-hover:scale-110">
          {/* Inner Accent Box */}
          <div className={`w-9 h-9 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-${color}-500/10 flex items-center justify-center relative overflow-hidden group-hover:bg-${color}-500/20 transition-colors duration-500`}>
            <Icon className={`w-5 h-5 md:w-8 md:h-8 text-${color}-500 md:text-${color}-500/80 group-hover:text-${color}-500 transition-colors duration-500`} />

            {/* Battery percentage badge */}
            {subValue && subValue.includes('%') && (
              <div className="absolute top-0 right-0 bg-[#69C350] text-white text-[5px] md:text-[7px] font-black px-1 py-0.5 rounded-bl shadow-sm z-20">
                {subValue.split(' ')[0]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Label below node for top positions */}
      {isLabelTop && (
        <div className="mt-2 md:mt-3 flex flex-col items-center transform group-hover:translate-y-1 transition-transform duration-500">
          <div className="text-[7px] md:text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] leading-none mb-1">{label}</div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm md:text-lg font-black text-gray-800 dark:text-gray-100 tabular-nums leading-none">{Math.abs(value).toFixed(1)}</span>
            <span className="text-[7px] md:text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase leading-none">{unit}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const SolarSystem = React.memo(() => {
  const [metrics, setMetrics] = useState({
    production: 4.3,
    load: 1.8,
    battery: 85,
    batteryPower: 2.0,
    gridPower: 0.5,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      setMetrics(prev => ({
        production: Math.max(0, parseFloat((prev.production + (Math.random() - 0.5) * 0.1).toFixed(1))),
        load: Math.max(0.2, parseFloat((prev.load + (Math.random() - 0.5) * 0.2).toFixed(1))),
        battery: Math.min(100, Math.max(0, prev.battery)),
        batteryPower: prev.batteryPower,
        gridPower: prev.gridPower
      }));
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cy = 200;
  const hubRadius = isMobile ? 40 : 60;
  const nodeDistance = isMobile ? 120 : 160;

  return (
    <div className="w-full h-full bg-transparent transition-colors duration-500 p-4 md:p-12 select-none overflow-hidden relative min-h-[500px] md:min-h-[650px] flex flex-col items-center justify-center">

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#69C350 1px, transparent 1px), linear-gradient(90deg, #69C350 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative w-full max-w-[320px] md:max-w-xl aspect-square">

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 400 400">
          {/* Spoke lines from center hub */}
          <g className="text-gray-200 dark:text-white/5" stroke="currentColor" strokeWidth="1">
            <line x1="200" y1={cy - hubRadius} x2="200" y2={cy - nodeDistance + 20} strokeDasharray="4 4" />
            <line x1="200" y1={cy + hubRadius} x2="200" y2={cy + nodeDistance - 20} strokeDasharray="4 4" />
            <line x1={200 + hubRadius} y1={cy} x2={200 + nodeDistance - 20} y2={cy} strokeDasharray="4 4" />
            <line x1={200 - hubRadius} y1={cy} x2={200 - nodeDistance + 20} y2={cy} strokeDasharray="4 4" />
          </g>

          <g>
            {/* Energy flow dots on spokes */}
            <circle r="2.5" fill="#69C350" className="filter blur-[1px]">
              <animateMotion path={`M 200 ${cy - nodeDistance + 20} L 200 ${cy - hubRadius}`} dur="2s" repeatCount="indefinite" />
            </circle>

            <circle r="2.5" fill="#3b82f6" className="filter blur-[1px]">
              <animateMotion path={`M 200 ${cy} L ${200 + nodeDistance - 20} ${cy}`} dur="2.5s" repeatCount="indefinite" />
            </circle>

            <circle r="2.5" fill="#a855f7" className="filter blur-[1px]">
              <animateMotion path={`M 200 ${cy} L ${200 - nodeDistance + 20} ${cy}`} dur="3s" repeatCount="indefinite" />
            </circle>

            <circle r="2.5" fill="#fbbf24" className="filter blur-[1px]">
              <animateMotion path={`M 200 ${cy} L 200 ${cy + nodeDistance - 20}`} dur="3.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Central Inverter Box Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="relative group">
            <div className="absolute inset-[-20px] bg-yellow-500/5 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] bg-white/90 dark:bg-white/[0.03] backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center relative transition-transform duration-500 hover:scale-105">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-1 md:mb-2 text-yellow-500">
                <Zap className="w-6 h-6 md:w-10 md:h-10 fill-current" />
              </div>
              <div className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 leading-none">Inverter</div>
            </div>
          </div>
        </div>

        {/* Nodes arranged in Hub-and-Spoke */}
        <PowerNode
          icon={Sun}
          label="FVE (PV)"
          value={metrics.production}
          unit="kW"
          color="green"
          position="top-0 left-1/2 -translate-x-1/2"
        />

        <PowerNode
          icon={Battery}
          label="Baterie"
          value={metrics.batteryPower}
          unit="kW"
          color="yellow"
          position="bottom-0 left-1/2 -translate-x-1/2"
          subValue={`${metrics.battery.toFixed(0)}% nabito`}
        />

        <PowerNode
          icon={Home}
          label="Spotřeba"
          value={metrics.load}
          unit="kW"
          color="blue"
          position="right-0 top-1/2 -translate-y-1/2"
        />

        <PowerNode
          icon={Globe}
          label="Síť"
          value={metrics.gridPower}
          unit="kW"
          color="purple"
          position="left-0 top-1/2 -translate-y-1/2"
        />

      </div>
    </div>
  );
});

export default SolarSystem;
