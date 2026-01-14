
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

// Oprava: Komponenta definována vně Dashboard pro zachování stavu dětí při re-renderu
const VisualizationBox: React.FC<VisualizationBoxProps> = ({ icon: Icon, title, subtitle, color, children, statusLabel = "Aktivní spojení" }) => (
  <div className="glass-panel rounded-[2.5rem] p-6 md:p-12 border border-black/10 dark:border-white/20 overflow-hidden shadow-2xl flex flex-col transition-all group">
    <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-6 md:gap-8 min-w-0">
        <div className={`w-14 h-14 md:w-16 md:h-16 ${color}/10 rounded-2xl flex items-center justify-center border border-${color.split('-')[1]}-500/20 shadow-xl group-hover:bg-${color.split('-')[1]}-600 group-hover:text-white transition-all duration-500 flex-shrink-0`}>
          <Icon className={`w-7 h-7 md:w-8 md:h-8 ${color.replace('bg-', 'text-')} group-hover:text-white transition-colors`} />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 truncate" title={title}>{title}</h3>
          <p className="text-[10px] md:text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mt-1 truncate" title={subtitle}>{subtitle}</p>
        </div>
      </div>
      <div className={`flex-shrink-0 flex items-center gap-4 ${color}/5 px-6 py-3 rounded-full border border-${color.split('-')[1]}-600/20 self-start md:self-auto`}>
        <div className={`w-2.5 h-2.5 ${color} rounded-full animate-pulse shadow-[0_0_12px_currentColor]`} />
        <span className={`text-[10px] font-black ${color.replace('bg-', 'text-')} dark:text-white uppercase tracking-widest`}>{statusLabel}</span>
      </div>
    </div>
    <div className="flex-grow rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-black/60 shadow-inner">
      {children}
    </div>
  </div>
);

const Dashboard = () => {
  const [sensors, setSensors] = useState([
    { id: 't1', label: 'Teplota obývací p.', value: 22.4, unit: '°C', trend: 'stable', icon: <Thermometer className="w-5 h-5" /> },
    { id: 'h1', label: 'Vlhkost vzduchu', value: 48, unit: '%', trend: 'down', icon: <Droplets className="w-5 h-5" /> },
    { id: 'p1', label: 'Aktuální příkon', value: 1.24, unit: 'kW', trend: 'up', icon: <Zap className="w-5 h-5" /> },
    { id: 'a1', label: 'Kvalita vzduchu', value: 'Vynikající', unit: '', trend: 'stable', icon: <Activity className="w-5 h-5" /> },
    { id: 'n1', label: 'Latence sítě', value: 12, unit: 'ms', trend: 'stable', icon: <Wifi className="w-5 h-5" /> },
    { id: 'b1', label: 'Kapacita úložiště', value: 88, unit: '%', trend: 'up', icon: <Battery className="w-5 h-5" /> },
    { id: 'w1', label: 'Průtok vody', value: 0.4, unit: 'L/h', trend: 'down', icon: <Droplet className="w-5 h-5" /> },
    { id: 's1', label: 'Stav zabezpečení', value: 'Aktivní', unit: '', trend: 'stable', icon: <Lock className="w-5 h-5" /> },
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
                <span className="px-3 py-1 bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-full uppercase border border-blue-600/20 dark:border-blue-400/20 tracking-[0.2em]">Řídicí centrum v4.2</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">Inteligence objektu</h2>
              <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">Globální monitoring telemetrie napříč 8 klíčovými metrikami.</p>
            </div>
            <div className="flex items-center gap-3 bg-blue-600/5 dark:bg-blue-600/10 px-6 py-4 rounded-3xl border border-blue-600/10 dark:border-blue-500/20 shadow-sm w-full md:w-auto justify-center md:justify-start">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-300 uppercase tracking-widest leading-none mb-1">Globální zabezpečení</span>
                <span className="text-sm font-bold text-gray-800 dark:text-white">Šifrované spojení Nexus aktivní</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="glass-panel p-4 md:p-6 rounded-2xl md:rounded-3xl border border-black/5 dark:border-white/10 flex flex-col justify-between group hover:border-blue-600/40 dark:hover:border-blue-500/40 transition-all hover:bg-white/80 dark:hover:bg-white/[0.07] shadow-sm hover:shadow-xl hover:-translate-y-1 duration-500 min-w-0">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/10 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all border border-blue-500/10">
                    {sensor.icon}
                  </div>
                  <div className={`text-[10px] md:text-[11px] font-black flex-shrink-0 ${sensor.trend === 'up' ? 'text-blue-600 dark:text-blue-400' : sensor.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                    {sensor.trend === 'up' ? '↑' : sensor.trend === 'down' ? '↓' : '•'}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mb-1 leading-none truncate" title={sensor.label}>{sensor.label}</p>
                  <h4 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white tabular-nums transition-colors duration-500 truncate">
                    {sensor.value}
                    <span className="text-[10px] md:text-xs font-normal text-gray-500 ml-1 md:ml-2">{sensor.unit}</span>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 md:gap-16 pt-4">
          <VisualizationBox 
            icon={Cpu} 
            title="Centrální rozvaděc Loxone" 
            subtitle="Logika, měření a distribuční uzel" 
            color="bg-green-600"
          >
            <LoxoneUnit />
          </VisualizationBox>

          <VisualizationBox 
            icon={Sun} 
            title="Solární matice FVE" 
            subtitle="Vizualizace energetických toků v reálném čase" 
            color="bg-yellow-500"
            statusLabel="Vysoký výtěžek"
          >
            <SolarSystem />
          </VisualizationBox>

          <VisualizationBox 
            icon={Wind} 
            title="Termodynamická matice" 
            subtitle="Inteligentní dohled nad vytápěním a chlazením" 
            color="bg-red-600"
            statusLabel="Optimalizovaný průtok"
          >
            <ClimateControl />
          </VisualizationBox>

          <VisualizationBox 
            icon={Palette} 
            title="Světelný klastr Chroma" 
            subtitle="Správa spektrálního osvětlení a RGB scén" 
            color="bg-blue-600"
            statusLabel="Spektrální přesnost"
          >
            <LightControl />
          </VisualizationBox>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
