
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
    <div className="w-full h-full p-5 md:p-12 flex flex-col lg:flex-row items-center justify-between bg-white/5 dark:bg-black/20 gap-8 md:gap-12 transition-colors duration-500">
      <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-1/3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">Climate Interface</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">Hydronic floor thermal management with PID loop stabilization.</p>
        </div>

        <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-black/5 dark:border-white/10 shadow-inner">
          <button 
            onClick={decrement}
            className="p-3 md:p-4 bg-white dark:bg-white/10 rounded-xl md:rounded-2xl shadow-md hover:scale-110 active:scale-95 transition-all text-blue-600 dark:text-blue-400"
          >
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-[8px] md:text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 leading-none">Target</span>
            <div className="flex items-baseline">
              <span className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tabular-nums transition-colors">
                {targetTemp.toFixed(1)}
              </span>
              <span className="text-sm md:text-lg font-bold text-blue-600 dark:text-blue-400 ml-1">°C</span>
            </div>
          </div>

          <button 
            onClick={increment}
            className="p-3 md:p-4 bg-white dark:bg-white/10 rounded-xl md:rounded-2xl shadow-md hover:scale-110 active:scale-95 transition-all text-red-500"
          >
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
           <div className="glass-panel p-3 md:p-4 rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5 flex items-center gap-3">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <div className="flex flex-col">
                <span className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase leading-none mb-1">Return</span>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">20.8°C</span>
              </div>
           </div>
           <div className="glass-panel p-3 md:p-4 rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5 flex items-center gap-3">
              {targetTemp > 21 ? <Flame className="w-4 h-4 text-red-500 animate-pulse" /> : <Snowflake className="w-4 h-4 text-blue-400" />}
              <div className="flex flex-col">
                <span className="text-[7px] md:text-[8px] font-black text-gray-400 uppercase leading-none mb-1">State</span>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{targetTemp > 21 ? 'Heating' : 'Stable'}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center relative min-h-[250px] md:min-h-[300px]">
        {/* Glow Effect */}
        <div 
          className="absolute blur-[80px] md:blur-[100px] opacity-20 transition-all duration-1000 w-full h-full rounded-full"
          style={{ backgroundColor: snakeColor }}
        />

        <div className="relative w-full max-w-md bg-white/10 dark:bg-black/40 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-white/10 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Thermal Grid</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse" style={{ backgroundColor: snakeColor }} />
              <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Flow Active</span>
            </div>
          </div>

          <svg viewBox="0 0 400 240" className="w-full h-auto drop-shadow-2xl">
            <path 
              d="M 20 20 L 380 20 L 380 60 L 20 60 L 20 100 L 380 100 L 380 140 L 20 140 L 20 180 L 380 180 L 380 220 L 20 220" 
              fill="none" 
              stroke={snakeColor} 
              strokeWidth="12" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-colors duration-1000"
              style={{ filter: `drop-shadow(0 0 8px ${snakeColor}44)` }}
            />
            <circle r="4" fill="white" opacity="0.6">
               <animateMotion 
                 path="M 20 20 L 380 20 L 380 60 L 20 60 L 20 100 L 380 100 L 380 140 L 20 140 L 20 180 L 380 180 L 380 220 L 20 220" 
                 dur="4s" 
                 repeatCount="indefinite" 
               />
            </circle>
          </svg>

          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 flex justify-between items-center text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span>Area: 24m²</span>
            <span>Pump: 12%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateControl;
