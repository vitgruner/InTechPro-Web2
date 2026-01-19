
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

const PowerNode: React.FC<PowerNodeProps> = ({ icon: Icon, label, value, unit, color, position, subValue }) => (
  <div className={`absolute ${position} z-20 flex flex-col items-center group transition-all duration-500`}>
    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white dark:bg-[#1a1d21] border border-${color}-500/30 shadow-xl flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110`}>
      <div className={`absolute inset-0 bg-${color}-500/10 rounded-xl md:rounded-2xl`} />
      <Icon className={`w-4 h-4 md:w-6 md:h-6 text-${color}-600 dark:text-${color}-400 relative z-10`} />
    </div>

    <div className="mt-2 md:mt-3 bg-white/90 dark:bg-black/80 backdrop-blur-md border border-black/5 dark:border-white/10 px-2 py-1 md:px-3 md:py-2 rounded-lg md:rounded-xl text-center shadow-lg transform transition-all min-w-[60px] md:min-w-[80px]">
      <div className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</div>
      <div className="flex items-baseline justify-center gap-0.5">
        <span className="text-xs md:text-sm font-black text-gray-900 dark:text-white tabular-nums font-mono">{Math.abs(value).toFixed(1)}</span>
        <span className="text-[7px] md:text-[8px] font-bold text-gray-500">{unit}</span>
      </div>
      {subValue && <div className="text-[7px] md:text-[8px] font-bold text-blue-500 mt-0.5 border-t border-black/5 dark:border-white/5 pt-0.5">{subValue}</div>}
    </div>
  </div>
);

const SolarSystem = () => {
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

    // Pro mobil zrušíme interval pro re-rendery
    if (window.innerWidth < 768) return () => window.removeEventListener('resize', handleResize);

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

  const cy = isMobile ? 140 : 200;
  const pvy = isMobile ? 20 : 60;

  return (
    <div className="w-full h-full bg-white/5 dark:bg-black/20 transition-colors duration-500 p-2 md:p-12 select-none overflow-hidden relative min-h-[450px] md:min-h-[600px] flex flex-col items-center justify-center">

      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative w-full max-w-[280px] md:max-w-lg aspect-square">

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
          <path d={`M 200 ${pvy} L 200 340 M 60 ${cy} L 340 ${cy}`} stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-slate-300 dark:text-white/10" />

          {!isMobile && (
            <g>
              {/* Vertical: FVE (top) to Inverter */}
              <path d={`M 200 ${pvy} L 200 ${cy - 40}`} stroke="#fbbf24" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.3" />
              <circle r="3" fill="#fbbf24">
                <animateMotion path={`M 0 0 L 0 ${cy - 40 - pvy}`} dur="2.5s" repeatCount="indefinite" begin="0s" />
                <set attributeName="cx" to="200" />
                <set attributeName="cy" to={pvy.toString()} />
              </circle>

              {/* Vertical: Inverter to Battery (bottom) */}
              <path d={`M 200 ${cy + 40} L 200 340`} stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.3" />
              <circle r="3" fill="#10b981">
                <animateMotion path={`M 0 0 L 0 ${340 - cy - 40}`} dur="3s" repeatCount="indefinite" begin="0s" />
                <set attributeName="cx" to="200" />
                <set attributeName="cy" to={(cy + 40).toString()} />
              </circle>

              {/* Horizontal: Inverter to Home (right) */}
              <path d={`M 240 ${cy} L 340 ${cy}`} stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.3" />
              <circle r="3" fill="#3b82f6">
                <animateMotion path={`M 0 0 L 100 0`} dur="2s" repeatCount="indefinite" begin="0s" />
                <set attributeName="cx" to="240" />
                <set attributeName="cy" to={cy.toString()} />
              </circle>

              {/* Horizontal: Grid (left) to Inverter */}
              <path d={`M 60 ${cy} L 160 ${cy}`} stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.3" />
              <circle r="3" fill="#a855f7">
                <animateMotion path={`M 0 0 L 100 0`} dur="2.5s" repeatCount="indefinite" begin="0s" />
                <set attributeName="cx" to="60" />
                <set attributeName="cy" to={cy.toString()} />
              </circle>
            </g>
          )}
        </svg>

        <div className="absolute top-[35%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-[2.5rem] bg-white dark:bg-[#1a1d21] border-2 border-yellow-500/10 shadow-xl flex flex-col items-center justify-center relative group">
            <Zap className="w-6 h-6 md:w-10 md:h-10 text-yellow-500 mb-1 md:mb-2" />
            <div className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Inverter</div>
          </div>
        </div>

        <PowerNode icon={Sun} label="FVE" value={metrics.production} unit="kW" color="yellow" position="-top-10 md:top-0 left-1/2 -translate-x-1/2" />
        <PowerNode icon={Battery} label="Baterie" value={metrics.batteryPower} unit="kW" color="green" position="bottom-0 left-1/2 -translate-x-1/2" subValue={`${metrics.battery.toFixed(0)}%`} />
        <PowerNode icon={Home} label="Spotřeba" value={metrics.load} unit="kW" color="blue" position="right-0 top-[35%] md:top-1/2 -translate-y-1/2" />
        <PowerNode icon={Globe} label="Síť" value={metrics.gridPower} unit="kW" color="purple" position="left-0 top-[35%] md:top-1/2 -translate-y-1/2" />

      </div>
    </div>
  );
};

export default SolarSystem;
