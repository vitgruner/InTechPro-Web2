import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Zap, Activity, ShieldCheck, Wifi, Battery, Droplet, Lock, Cpu, Sun, Palette, Wind } from 'lucide-react';
import LoxoneUnit from './LoxoneUnit';
import SolarSystem from './SolarSystem';
import LightControl from './LightControl';
import ClimateControl from './ClimateControl';
import SectionHeader from './SectionHeader';
import Breadcrumbs from './Breadcrumbs';
import { DetailProps } from '../types';

interface VisualizationBoxProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
  statusLabel?: string;
}

// Static color map to ensure Tailwind purges correctly (dynamic class interpolation doesn't work)
const colorClasses: Record<string, { bg: string; bgHover: string; text: string; border: string; borderStatus: string }> = {
  'bg-green-600': { bg: 'bg-green-600/10', bgHover: 'group-hover:bg-green-600', text: 'text-green-600', border: 'border-green-500/20', borderStatus: 'border-green-600/20' },
  'bg-yellow-500': { bg: 'bg-yellow-500/10', bgHover: 'group-hover:bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500/20', borderStatus: 'border-yellow-500/20' },
  'bg-red-600': { bg: 'bg-red-600/10', bgHover: 'group-hover:bg-red-600', text: 'text-red-600', border: 'border-red-500/20', borderStatus: 'border-red-600/20' },
  'bg-blue-600': { bg: 'bg-blue-600/10', bgHover: 'group-hover:bg-blue-600', text: 'text-blue-600', border: 'border-blue-500/20', borderStatus: 'border-blue-600/20' },
};

const VisualizationBox: React.FC<VisualizationBoxProps> = React.memo(({ icon: Icon, title, subtitle, color, children, statusLabel = "Aktivní spojení" }) => {
  const colors = colorClasses[color] || colorClasses['bg-blue-600'];
  return (
    <div className="glass-panel rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/20 overflow-hidden shadow-2xl flex flex-col transition-all group">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-10 h-10 md:w-12 md:h-12 ${colors.bg} rounded-xl flex items-center justify-center border ${colors.border} shadow-lg ${colors.bgHover} group-hover:text-white transition-all duration-500 flex-shrink-0`}>
            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${colors.text} group-hover:text-white transition-colors`} />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 truncate leading-tight" title={title}>{title}</h3>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5 truncate" title={subtitle}>{subtitle}</p>
          </div>
        </div>
        <div className={`hidden sm:flex flex-shrink-0 items-center gap-2 ${colors.bg} px-3 py-1.5 rounded-full border ${colors.borderStatus}`}>
          <div className={`w-1.5 h-1.5 ${color} rounded-full animate-pulse shadow-[0_0_8px_currentColor]`} />
          <span className={`text-[9px] font-black ${colors.text} dark:text-white uppercase tracking-widest`}>{statusLabel}</span>
        </div>
      </div>
      <div className="flex-grow rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-black/60 shadow-inner">
        {children}
      </div>
    </div>
  );
});

const SensorCard = React.memo(({ sensor }: { sensor: any }) => (
  <div className="glass-panel p-3 rounded-2xl border border-black/5 dark:border-white/10 flex items-center gap-3 group hover:border-blue-600/40 dark:hover:border-blue-500/40 transition-all hover:bg-white/80 dark:hover:bg-white/[0.07] shadow-sm hover:shadow-md duration-500 min-w-0">
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
      <h4 className="text-sm font-black text-gray-900 dark:text-white tabular-nums leading-none truncate font-mono">
        {sensor.value}
        <span className="text-[9px] font-medium text-gray-500 ml-1 font-sans">{sensor.unit}</span>
      </h4>
    </div>
  </div>
));

const Dashboard: React.FC<DetailProps> = ({ setView }) => {
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
    <section id="dashboard" className="pt-28 md:pt-32 pb-16 md:pb-24 relative bg-transparent transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs
          items={[{ label: 'Online Showroom' }]}
          setView={setView}
        />

        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-8 md:mb-10">
          <div className="w-full lg:max-w-3xl text-left">
            <SectionHeader
              eyebrow="Řídicí centrum InTechPro v4.2"
              title="Online data"
              highlight="Showroom"
              description="Online monitoring telemetrie napříč 8 klíčovými metrikami v našem showroomu"
              align="left"
              className="mb-0"
            />
          </div>
          <div className="flex items-center gap-3 bg-blue-600/5 dark:bg-blue-600/10 px-6 py-4 rounded-3xl border border-blue-600/10 dark:border-blue-500/20 shadow-sm w-full md:w-auto justify-center md:justify-start mb-1">
            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-300 uppercase tracking-widest leading-none mb-1">Globální zabezpečení</span>
              <span className="text-sm font-bold text-gray-800 dark:text-white">Šifrované spojení SSL aktivní</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-20">
          {sensors.map((sensor) => (
            <SensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <VisualizationBox
            icon={Cpu}
            title="Centrální rozvaděč"
            subtitle="Logika, měření a distribuce"
            color="bg-green-600"
          >
            <LoxoneUnit />
          </VisualizationBox>

          <VisualizationBox
            icon={Sun}
            title="Solární matice FVE"
            subtitle="Energetické toky v reálném čase"
            color="bg-yellow-500"
            statusLabel="Vysoký výnos"
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