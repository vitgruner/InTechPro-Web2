
import React, { useState, useMemo } from 'react';
import { Thermometer, Wind, Flame, Snowflake, ChevronUp, ChevronDown } from 'lucide-react';

const ClimateControl = () => {
  const [targetTemp, setTargetTemp] = useState(22.5);
  const minTemp = 15;
  const maxTemp = 30;

  const snakeColor = useMemo(() => {
    const percentage = (targetTemp - minTemp) / (maxTemp - minTemp);
    const r = Math.floor(59 + (239 - 59) * percentage);
    const g = Math.floor(130 + (68 - 130) * percentage);
    const b = Math.floor(246 + (68 - 246) * percentage);
    return `rgb(${r}, ${g}, ${b})`;
  }, [targetTemp]);

  const increment = () => setTargetTemp(prev => Math.min(maxTemp, prev + 0.5));
  const decrement = () => setTargetTemp(prev => Math.max(minTemp, prev - 0.5));

  return (
    <div className="w-full h-full p-6 md:p-8 flex flex-col bg-white/5 dark:bg-black/20 gap-6 transition-colors duration-500">
      
      {/* Header Section */}
     

      {/* Controls Grid - Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Main Target Controller (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 flex items-center justify-between bg-black/5 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/10 shadow-inner">
          <button 
            onClick={decrement}
            className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-all text-blue-600 dark:text-blue-400 border border-black/5 dark:border-white/5"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 leading-none">Target</span>
            <div className="flex items-baseline">
              <span className="text-3xl font-black text-gray-900 dark:text-white tabular-nums transition-colors">
                {targetTemp.toFixed(1)}
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 ml-0.5">°C</span>
            </div>
          </div>

          <button 
            onClick={increment}
            className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-all text-red-500 border border-black/5 dark:border-white/5"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>

        {/* Return Temp Card */}
        <div className="glass-panel p-3 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-center gap-3 bg-white/40 dark:bg-white/5">
           <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
             <Thermometer className="w-5 h-5 text-orange-500" />
           </div>
           <div className="flex flex-col">
             <span className="text-[7px] font-black text-gray-400 uppercase leading-none mb-1">Return</span>
             <span className="text-lg font-black text-gray-700 dark:text-gray-200 tabular-nums">20.8°</span>
           </div>
        </div>

        {/* State Card */}
        <div className="glass-panel p-3 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-center gap-3 bg-white/40 dark:bg-white/5">
           <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${targetTemp > 21 ? 'bg-red-500/10' : 'bg-blue-400/10'}`}>
             {targetTemp > 21 ? <Flame className="w-5 h-5 text-red-500 animate-pulse" /> : <Snowflake className="w-5 h-5 text-blue-400" />}
           </div>
           <div className="flex flex-col">
             <span className="text-[7px] font-black text-gray-400 uppercase leading-none mb-1">State</span>
             <span className="text-sm font-black text-gray-700 dark:text-gray-200">{targetTemp > 21 ? 'Heating' : 'Stable'}</span>
           </div>
        </div>
      </div>

      {/* Visualizer - Bottom Section (Fills remaining space) */}
      <div className="flex-1 w-full relative min-h-[200px] bg-white/10 dark:bg-black/40 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden flex items-center justify-center p-6 group">
        {/* Ambient Glow */}
        <div 
          className="absolute blur-[80px] opacity-20 transition-all duration-1000 w-full h-full rounded-full group-hover:opacity-30"
          style={{ backgroundColor: snakeColor }}
        />

        <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-10">
            <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Thermal Grid</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: snakeColor }} />
              <span className="text-[8px] font-bold text-gray-400 uppercase">Flow Active</span>
            </div>
        </div>

        <svg viewBox="0 0 400 240" className="w-full h-full max-h-[180px] drop-shadow-2xl relative z-10">
            <path 
              d="M 20 40 L 380 40 L 380 80 L 20 80 L 20 120 L 380 120 L 380 160 L 20 160 L 20 200 L 380 200" 
              fill="none" 
              stroke={snakeColor} 
              strokeWidth="16" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-colors duration-1000"
              style={{ filter: `drop-shadow(0 0 10px ${snakeColor}44)` }}
            />
            {/* Flow Particles */}
            <circle r="3" fill="white" opacity="0.8">
               <animateMotion 
                 path="M 20 40 L 380 40 L 380 80 L 20 80 L 20 120 L 380 120 L 380 160 L 20 160 L 20 200 L 380 200" 
                 dur="6s" 
                 repeatCount="indefinite" 
               />
            </circle>
            <circle r="3" fill="white" opacity="0.6">
               <animateMotion 
                 path="M 20 40 L 380 40 L 380 80 L 20 80 L 20 120 L 380 120 L 380 160 L 20 160 L 20 200 L 380 200" 
                 dur="6s" 
                 begin="1s"
                 repeatCount="indefinite" 
               />
            </circle>
            <circle r="3" fill="white" opacity="0.4">
               <animateMotion 
                 path="M 20 40 L 380 40 L 380 80 L 20 80 L 20 120 L 380 120 L 380 160 L 20 160 L 20 200 L 380 200" 
                 dur="6s" 
                 begin="2s"
                 repeatCount="indefinite" 
               />
            </circle>
        </svg>

        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-gray-500 z-10">
            <span>Area: 24m²</span>
            <span>Pump: 12%</span>
        </div>
      </div>
    </div>
  );
};

export default ClimateControl;
