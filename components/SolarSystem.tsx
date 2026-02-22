
import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import {
  LoxoneEnergyIcon, LoxoneLightingIcon, LoxoneTemperatureIcon,
  LoxoneGridIcon, LoxoneBatteryIcon, LoxoneHouseIcon,
  LoxoneSaunaIcon, LoxoneHotWaterIcon, LoxoneEVIcon
} from './LoxoneIcons';
import solaxInverter from '../src/_vyr_1503_x3-ultra-1024x1024.webp';

interface PowerNodeProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit: string;
  color: string;
  specs?: string;
  subValue?: string;
  className?: string;
}

const PowerNode: React.FC<PowerNodeProps> = ({ icon: Icon, label, value, unit, color, specs, subValue, className = '' }) => {
  return (
    <div className={`group transition-all duration-700 flex ${className}`}>
      <div className="relative">
        <div className={`absolute inset-[-10px] rounded-full bg-${color}-500/5 blur-xl opacity-0 transition-opacity duration-700`} />
        <div className="w-24 h-[64px] md:w-34 md:h-[77px] bg-white/95 dark:bg-zinc-900/90 md:backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl rounded-xl p-2 flex items-center justify-between transition-all duration-500">
          <div className="flex flex-col justify-center gap-0.5 text-left min-w-0 flex-1">
            <span className="text-[5px] md:text-[8.5px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate">
              {label}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs md:text-[20px] font-black text-slate-900 dark:text-white tabular-nums tracking-tighter leading-none">
                {Math.abs(value).toFixed(1)}
              </span>
              <span className="text-[6px] md:text-[9.5px] font-bold text-slate-500 dark:text-gray-400 uppercase">
                {unit}
              </span>
            </div>
            <div className="text-[5px] md:text-[7.5px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider leading-tight truncate mt-0.5">
              {subValue || specs || "Status"}
            </div>
          </div>

          <div className={`w-7 h-7 md:w-11 md:h-11 rounded-lg bg-${color}-500/10 flex items-center justify-center flex-shrink-0 ml-2`}>
            <Icon className={`w-4 h-4 md:w-6.5 h-6.5 text-${color}-500`} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface SolarSystemProps {
  onStatusChange?: (status: string) => void;
}

const SolarSystem = React.memo(({ onStatusChange }: SolarSystemProps) => {
  const [metrics, setMetrics] = useState(() => {
    const now = new Date();
    const hour = now.getHours();
    const isDay = hour >= 7 && hour < 20;
    return {
      production: isDay ? 6.2 : 0,
      load: 1.8,
      heatPump: 2.1,
      hotWater: 1.5,
      wallbox: 0.0,
      sauna: 0.0,
      battery: 88,
      batteryPower: 1.5,
      gridImport: 0.0,
      gridExport: 0.8,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const now = new Date();
        const hour = now.getHours();
        const isDay = hour >= 7 && hour < 20;

        // Target production based on time (Day: ~6.2kW, Night: 0kW)
        const targetProduction = isDay ? 6.2 : 0;
        const step = (targetProduction - prev.production) * 0.1;

        // Only add noise if it's daytime to simulate clouds/intensity changes
        const noise = isDay ? (Math.random() - 0.5) * 0.2 : 0;

        // Calculate new production
        let production = Math.max(0, parseFloat((prev.production + step + noise).toFixed(1)));

        // Force 0 if it's night and value is very small to prevent floating point jitter
        if (!isDay && production < 0.1) {
          production = 0;
        }

        const load = Math.max(0.4, parseFloat((prev.load + (Math.random() - 0.5) * 0.15).toFixed(1)));
        const heatPump = Math.max(0.8, parseFloat((prev.heatPump + (Math.random() - 0.5) * 0.2).toFixed(1)));
        const hotWater = Math.max(0.5, parseFloat((prev.hotWater + (Math.random() - 0.5) * 0.1).toFixed(1)));
        const wallbox = Math.random() > 0.8 ? 11.0 : 0.0;
        const sauna = Math.random() > 0.9 ? 6.0 : 0.0;

        const totalLoad = load + heatPump + hotWater + wallbox + sauna;
        const surplus = production - totalLoad;

        let batteryPower: number;
        let gridExport = 0;
        let gridImport = 0;
        let newBattery = prev.battery;

        if (surplus > 0) {
          batteryPower = surplus * 0.6;
          gridExport = surplus - batteryPower;
          newBattery = Math.min(100, prev.battery + 0.02);
        } else {
          const deficit = Math.abs(surplus);
          const maxDischarge = Math.min(deficit, prev.battery > 10 ? 3.0 : 0);
          batteryPower = -maxDischarge;
          gridImport = deficit - maxDischarge;
          newBattery = Math.max(0, prev.battery - 0.02);
        }

        return {
          ...prev,
          production, load, heatPump, hotWater, wallbox, sauna,
          battery: newBattery,
          batteryPower: parseFloat(batteryPower.toFixed(1)),
          gridImport: parseFloat(gridImport.toFixed(1)),
          gridExport: parseFloat(gridExport.toFixed(1))
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (onStatusChange) {
      const status = metrics.production > 0
        ? "Vysoký výtěžek"
        : metrics.batteryPower < 0
          ? "Provoz na baterii"
          : metrics.gridImport > 0
            ? "Provoz ze sítě"
            : "Aktivní";
      onStatusChange(status);
    }
  }, [metrics.production, metrics.batteryPower, metrics.gridImport, onStatusChange]);

  return (
    <div className="w-full h-full bg-transparent transition-colors duration-500 p-2 md:p-6 select-none overflow-visible flex flex-col items-center justify-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#69C350 1px, transparent 1px), linear-gradient(90deg, #69C350 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Main Container with Scale Up */}
      <div className="relative w-full max-w-[800px] mx-auto scale-[0.9] sm:scale-100 md:scale-[1.1] transition-transform duration-700">
        <div className="flex flex-col items-center gap-4 md:gap-6 relative group">

          {/* ROW 0: Loxone Miniserver — brain (Floating at top) */}
          <div className="relative z-20 md:-mb-2">
            <div className="absolute inset-[-10px] bg-[#69C350]/10 blur-[40px] rounded-full scale-110 animate-pulse" />
            <div className="flex items-center gap-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-[#69C350]/20 shadow-xl rounded-xl px-3 py-1.5 relative">
              <img
                src="https://messtzramsuvjnrvwmfc.supabase.co/storage/v1/object/public/project-documents/assets/miniserver-gen2.webp"
                alt="Loxone Miniserver Compact"
                className="w-16 h-16 md:w-18 md:h-18 object-contain drop-shadow-lg"
              />
              <div className="flex flex-col text-left">
                <span className="text-[7px] md:text-[9px] font-black text-[#69C350] uppercase tracking-widest">Loxone Miniserver</span>
                <span className="text-[5px] md:text-[7px] font-bold text-gray-400 uppercase tracking-wider">Řídící jednotka systému</span>
              </div>
            </div>
          </div>

          {/* 3x3 Grid Matrix Wrapper */}
          <div className="relative w-full max-w-[553px] mx-auto">
            {/* SVG Background Layer - 45-degree radial flow system */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="packetGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Radial Lines from SolaX (50, 50) to 8 Nodes */}
              <line x1="11" y1="11" x2="50" y2="50" stroke="#f87171" strokeWidth="0.3" strokeOpacity="0.15" />
              <line x1="50" y1="11" x2="50" y2="50" stroke="#facc15" strokeWidth="0.3" strokeOpacity="0.15" />
              <line x1="89" y1="11" x2="50" y2="50" stroke="#3b82f6" strokeWidth="0.3" strokeOpacity="0.15" />
              <line x1="11" y1="50" x2="50" y2="50" stroke="#69C350" strokeWidth="0.3" strokeOpacity="0.15" />
              <line x1="89" y1="50" x2="50" y2="50" stroke="#f97316" strokeWidth="0.3" strokeOpacity="0.15" />
              <line x1="11" y1="89" x2="50" y2="50" stroke="#14b8a6" strokeWidth="0.3" strokeOpacity="0.15" />
              <line x1="50" y1="89" x2="50" y2="50" stroke="#f97316" strokeWidth="0.3" strokeOpacity="0.15" />
              <line x1="89" y1="89" x2="50" y2="50" stroke="#a855f7" strokeWidth="0.3" strokeOpacity="0.15" />

              {/* Animated Particles */}
              {metrics.production > 0 && [0, 2.2].map((d, i) => (
                <circle key={`pv-${i}`} r="1.0" fill="#facc15" filter="url(#packetGlow)">
                  <animateMotion path="M 50 11 L 50 50" dur="4.4s" begin={`${d}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              ))}
              {metrics.gridExport > 0 && [0, 2.2].map((d, i) => (
                <circle key={`gexp-${i}`} r="1.0" fill="#f87171" filter="url(#packetGlow)">
                  <animateMotion path="M 50 50 L 11 11" dur="4.4s" begin={`${d}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              ))}
              {metrics.gridImport > 0 && [0, 2.2].map((d, i) => (
                <circle key={`gimp-${i}`} r="1.0" fill="#f87171" filter="url(#packetGlow)">
                  <animateMotion path="M 11 11 L 50 50" dur="4.4s" begin={`${d}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              ))}
              {metrics.batteryPower > 0 && [0, 2.2].map((d, i) => (
                <circle key={`batch-${i}`} r="1.0" fill="#3b82f6" filter="url(#packetGlow)">
                  <animateMotion path="M 50 50 L 89 11" dur="4.4s" begin={`${d}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              ))}
              {metrics.batteryPower < 0 && [0, 2.2].map((d, i) => (
                <circle key={`batdis-${i}`} r="1.0" fill="#3b82f6" filter="url(#packetGlow)">
                  <animateMotion path="M 89 11 L 50 50" dur="4.4s" begin={`${d}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              ))}
              {metrics.load > 0 && [0, 2.0].map((d, i) => (
                <circle key={`hs-${i}`} r="1.0" fill="#69C350" filter="url(#packetGlow)">
                  <animateMotion path="M 50 50 L 11 50" dur="4s" begin={`${d}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              ))}
              {metrics.sauna > 0 && [0, 2.0].map((d, i) => (
                <circle key={`sn-${i}`} r="1.0" fill="#f97316" filter="url(#packetGlow)">
                  <animateMotion path="M 50 50 L 89 50" dur="4s" begin={`${d}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              ))}
              {metrics.heatPump > 0 && (
                <circle r="1.0" fill="#14b8a6" filter="url(#packetGlow)">
                  <animateMotion path="M 50 50 L 11 89" dur="4.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              )}
              {metrics.hotWater > 0 && (
                <circle r="1.0" fill="#f97316" filter="url(#packetGlow)">
                  <animateMotion path="M 50 50 L 50 89" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              )}
              {metrics.wallbox > 0 && (
                <circle r="1.0" fill="#a855f7" filter="url(#packetGlow)">
                  <animateMotion path="M 50 50 L 89 89" dur="4.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                </circle>
              )}
            </svg>

            {/* Content Layer */}
            <div className="flex flex-col gap-6 md:gap-10 relative z-10 w-full">
              {/* Grid Rows */}
              <div className="flex items-center justify-center gap-3 md:gap-7 w-full h-[95px]">
                <PowerNode icon={LoxoneGridIcon as any} label="Veřejná síť" value={Math.abs(metrics.gridExport - metrics.gridImport)} unit="kW" color="red" subValue={metrics.gridExport > 0 ? "Přetok" : "Odběr"} className="flex-1 justify-end" />
                <PowerNode
                  icon={LoxoneEnergyIcon as any}
                  label="Fotovoltaika"
                  value={metrics.production}
                  unit="kWp"
                  color="yellow"
                  subValue="Výkon"
                  className="flex-1 justify-center"
                />
                <PowerNode icon={LoxoneBatteryIcon as any} label="Baterie" value={metrics.batteryPower} unit="kW" color="blue" subValue={`${metrics.battery.toFixed(0)}%`} className="flex-1 justify-start" />
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-7 w-full h-[95px]">
                <PowerNode icon={LoxoneHouseIcon as any} label="Dům" value={metrics.load} unit="kW" color="[#69C350]" subValue="Spotřeba" className="flex-1 justify-end" />
                <div className="flex-1 flex justify-center items-center relative min-h-[76px] md:min-h-[95px]">
                  <div className="absolute inset-0 bg-[#E62E2D]/5 blur-[60px] rounded-full scale-110 animate-pulse" />
                  <img src={solaxInverter} alt="SolaX" className="w-22 h-22 md:w-30 md:h-30 object-contain drop-shadow-2xl z-20 transition-transform duration-500" />
                </div>
                <PowerNode icon={LoxoneSaunaIcon as any} label="Sauna" value={metrics.sauna} unit="kW" color="orange" subValue={metrics.sauna > 0 ? "Aktivní" : "Vypnuto"} className="flex-1 justify-start" />
              </div>

              <div className="flex items-center justify-center gap-3 md:gap-7 w-full h-[95px]">
                <PowerNode icon={LoxoneTemperatureIcon as any} label="Čerpadlo" value={metrics.heatPump} unit="kW" color="teal" subValue="Vytápění" className="flex-1 justify-end" />
                <PowerNode icon={LoxoneHotWaterIcon as any} label="Ohřev TUV" value={metrics.hotWater} unit="kW" color="orange" subValue="Bojler" className="flex-1 justify-center" />
                <PowerNode icon={LoxoneEVIcon as any} label="EV Nabíječka" value={metrics.wallbox} unit="kW" color="purple" subValue={metrics.wallbox > 0 ? "Nabíjení" : "Odpojeno"} className="flex-1 justify-start" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SolarSystem;
