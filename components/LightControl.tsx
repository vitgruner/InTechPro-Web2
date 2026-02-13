
import React, { useState } from 'react';
import { Lightbulb, Palette, Sparkles, Sliders, Zap } from 'lucide-react';

const LightControl = React.memo(() => {
  const [color, setColor] = useState('#69C350');
  const [intensity, setIntensity] = useState(85);

  const presets = [
    '#69C350', // Nexus Blue
    '#84cc16', // Loxone Lime
    '#f59e0b', // Solar Amber
    '#ef4444', // Alert Red
    '#ffffff', // Daylight
  ];

  const roomNames = ['Kuchyně', 'Obývací pokoj', 'Ložnice'];

  // Calculate dynamic glow opacity based on intensity
  const glowOpacity = (intensity / 100) * 0.5;
  const bulbOpacity = 0.3 + (intensity / 100) * 0.7;

  return (
    <div className="w-full h-full p-6 md:p-10 flex flex-col bg-white/5 dark:bg-black/20 gap-10 transition-colors duration-500">

      {/* Row 1: Unified Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center glass-panel p-6 rounded-[2rem] border-black/5 dark:border-white/5 shadow-inner">

        {/* Color Interface & Presets */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <Palette className="w-4 h-4 text-[#69C350]" />
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Barvy</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setColor(p)}
                  className={`w-5 h-5 rounded-md transition-all hover:scale-110 ${color === p ? 'ring-2 ring-[#69C350] ring-offset-1 dark:ring-offset-black scale-110 shadow-lg' : ''
                    }`}
                  style={{ backgroundColor: p }}
                />
              ))}
            </div>
            <div className="w-[1px] h-5 bg-black/10 dark:bg-white/10" />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-7 h-7 rounded-md bg-transparent border-none cursor-pointer p-0 overflow-hidden"
            />
          </div>
        </div>

        {/* Intensity PWM Slider */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#69C350]" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Jas</span>
            </div>
            <span className="text-[10px] font-black text-[#69C350] tabular-nums">{intensity}%</span>
          </div>
          <div className="relative flex items-center h-6">
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-[#69C350]"
            />
          </div>
        </div>

        {/* Telemetry & Active Hex */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-[#69C350]" />
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Živé ovládání</span>
          </div>
          <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">HEX</span>
            <span className="text-[11px] font-black text-[#69C350] dark:text-[#95E87D] tabular-nums tracking-widest">{color.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Row 2: Visual Representation */}
      <div className="flex justify-center items-center relative min-h-[200px]">
        {/* Dynamic Multi-Glow Background */}
        <div
          className="absolute blur-[120px] transition-all duration-700 w-64 h-64 rounded-full"
          style={{
            backgroundColor: color,
            opacity: glowOpacity,
            transform: `scale(${0.8 + (intensity / 100) * 0.5})`,
            willChange: 'opacity, transform'
          }}
        />

        <div className="flex gap-4 md:gap-8 relative z-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`flex flex-col items-center gap-4 transition-all duration-700`}>
              <div className="relative group">
                <div
                  className="absolute inset-0 blur-2xl transition-all duration-700 opacity-40 group-hover:opacity-60"
                  style={{ backgroundColor: color, transform: `scale(${intensity / 100})` }}
                />
                <div className="relative w-20 h-20 md:w-32 md:h-32 glass-panel rounded-[2.5rem] border-2 border-white/20 flex items-center justify-center bg-white/5 md:backdrop-blur-3xl shadow-2xl transition-all">
                  <Lightbulb
                    className="w-10 h-10 md:w-16 md:h-16 transition-all duration-700"
                    style={{
                      color: color,
                      opacity: bulbOpacity,
                      filter: `drop-shadow(0 0 ${20 * (intensity / 100)}px ${color})`
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[7px] md:text-[8px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{roomNames[i]}</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-2.5 h-2.5 text-[#69C350]" />
                  <span className="text-[10px] font-bold text-gray-900 dark:text-white tabular-nums tracking-widest">{intensity}% PWR</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default LightControl;
