
import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Zap, Activity, ShieldCheck, Wifi, Battery, Droplet, Lock, Cpu, Sun, Palette, Wind } from 'lucide-react';
import LoxoneUnit from './LoxoneUnit';
import SolarSystem from './SolarSystem';
import LightControl from './LightControl';
import ClimateControl from './ClimateControl';

interface VisualizationBoxProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
  statusLabel?: string;
}

// Oprava: Kompaktnější design VisualizationBoxu
const VisualizationBox: React.FC<VisualizationBoxProps> = ({ icon: Icon, title, subtitle, color, children, statusLabel = "Aktivní spojení" }) => (
  <div className="glass-panel rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/20 overflow-hidden shadow-2xl flex flex-col transition-all group">
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${color}/10 rounded-xl flex items-center justify-center border border-${color.split('-')[1]}-500/20 shadow-lg group-hover:bg-${color.split('-')[1]}-600 group-hover:text-white transition-all duration-500 flex-shrink-0`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color.replace('bg-', 'text-')} group-hover:text-white transition-colors`} />
        </div>
        <div className="min-w-0 flex flex-col justify-center">
          <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 truncate leading-tight" title={title}>{title}</h3>
          <p className="text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5 truncate" title={subtitle}>{subtitle}</p>
        </div>
      </div>
      <div className={`hidden sm:flex flex-shrink-0 items-center gap-2 ${color}/5 px-3 py-1.5 rounded-full border border-${color.split('-')[1]}-600/20`}>
        <div className={`w-1.5 h-1.5 ${color} rounded-full animate-pulse shadow-[0_0_8px_currentColor]`} />
        <span className={`text-[9px] font-black ${color.replace('bg-', 'text-')} dark:text-white uppercase tracking-widest`}>{statusLabel}</span>
      </div>
    </div>
    <div className="flex-grow rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-black/60 shadow-inner">
      {children}
    </div>
  </div>
);

const Dashboard = () => {
  const [sensors, setSensors] = useState([
    { id: 't1', label: 'Teplota obývací p.', value: 22.4, unit: '°C', trend: 'stable', icon: <Thermometer className="w-4 h-4" /> },
    { id: 'h1', label: 'Vlhkost vzduchu', value: 48, unit: '%', trend: 'down', icon: <Droplets className="w-4 h-4" /> },
    { id: 'p1', label: 'Aktuální příkon', value: 1.24, unit: 'kW', trend: 'up', icon: <Zap className="w-4 h-4" /> },
    { id: 'a1', label: 'Kvalita vzduchu', value: 'Vynikající', unit: '', trend: 'stable', icon: <Activity className="w-4 h-4" /> },
    { id: 'n1', label: 'Latence sítě', value: 12, unit: 'ms', trend: 'stable', icon: <Wifi className="w-4 h-4" /> },
    { id: 'b1', label: 'Kapacita úložiště', value: 88, unit: '%', trend: 'up', icon: <Battery className="w-4 h-4" /> },
    { id: 'w1', label: 'Průtok vody', value: 0.4, unit: 'L/h', trend: 'down', icon: <Droplet className="w-4 h-4" /> },
    { id: 's1', label: 'Stav zabezpečení', value: 'Aktivní', unit: '', trend: 'stable', icon: <Lock className="w-4 h-4" /> },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(s => {
        if (typeof s.value === 'number') {
          const change = (Math.random() - 0.5) * 0.2;
          return { ...s, value: parseFloat((s.value + change).toFixed(2)) };
        }
        return s;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="pt-32 md:pt-40 pb-16 md:pb-24 relative bg-gray-50/50 dark:bg-[#0f1115] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5 md:px-6 space-y-12 md:space-y-20">
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-full uppercase border border-blue-600/20 dark:border-blue-400/20 tracking-[0.2em]">Řídicí centrum InTechPro v4.2</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Online data showroom Praha</h2>
              <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">Online monitoring telemetrie napříč 8 klíčovými metrikami v našem showroomu</p>
            </div>
            <div className="flex items-center gap-3 bg-blue-600/5 dark:bg-blue-600/10 px-6 py-4 rounded-3xl border border-blue-600/10 dark:border-blue-500/20 shadow-sm w-full md:w-auto justify-center md:justify-start">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-300 uppercase tracking-widest leading-none mb-1">Globální zabezpečení</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white">Šifrované spojení SSL aktivní</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="glass-panel p-3 rounded-2xl border border-black/5 dark:border-white/10 flex items-center gap-3 group hover:border-blue-600/40 dark:hover:border-blue-500/40 transition-all hover:bg-white/80 dark:hover:bg-white/[0.07] shadow-sm hover:shadow-md duration-500 min-w-0">
                <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all border border-blue-500/10 flex-shrink-0">
                    {sensor.icon}
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                   <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[9px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest truncate" title={sensor.label}>{sensor.label}</p>
                      {sensor.trend !== 'stable' && (
                        <span className={`text-[9px] font-bold ${sensor.trend === 'up' ? 'text-blue-600' : 'text-red-500'}`}>
                           {sensor.trend === 'up' ? '↑' : '↓'}
                        </span>
                      )}
                   </div>
                   <h4 className="text-sm font-black text-gray-900 dark:text-white tabular-nums leading-none truncate">
                      {sensor.value}
                      <span className="text-[9px] font-medium text-gray-500 ml-1">{sensor.unit}</span>
                   </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 pt-4">
          <VisualizationBox 
            icon={Cpu} 
            title="Centrální rozvaděc" 
            subtitle="Logika, měření a distribuce" 
            color="bg-green-600"
          >
            <LoxoneUnit />
          </VisualizationBox>

          <VisualizationBox 
            icon={Sun} 
            title="Solární matice FVE" 
            subtitle="Energetické toky real-time" 
            color="bg-yellow-500"
            statusLabel="Vysoký výtěžek"
          >
            <SolarSystem />
          </VisualizationBox>

          <VisualizationBox 
            icon={Wind} 
            title="Vytápění" 
            subtitle="Dohled nad vytápěním/chlazením" 
            color="bg-red-600"
            statusLabel="Optimalizováno"
          >
            <ClimateControl />
          </VisualizationBox>

          <VisualizationBox 
            icon={Palette} 
            title="RGB osvětlení" 
            subtitle="Správa spektrálního osvětlení" 
            color="bg-blue-600"
            statusLabel="Manuální ovládání"
          >
            <LightControl />
          </VisualizationBox>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
