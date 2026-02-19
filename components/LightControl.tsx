
import React, { useState, useMemo } from 'react';
import { Lightbulb, Palette, Sparkles, Sliders, Zap, Thermometer } from 'lucide-react';

const PRESETS = [
  '#ef4444', // Red
  '#22c55e', // Green
  '#3b82f6', // Blue
  '#69C350', // Loxone Green
  '#f59e0b', // Amber
  '#ffffff', // White
];

const ROOM_NAMES = ['Kuchyně', 'Obývací pokoj', 'Ložnice'];

const LightControl = React.memo(() => {
  const [color, setColor] = useState('#69C350');
  const [intensity, setIntensity] = useState(85);
  const [whiteTemp, setWhiteTemp] = useState(4000);

  // Memoize visual color calculation
  const visualColor = useMemo(() => {
    if (color.toLowerCase() === '#ffffff') {
      const t = (whiteTemp - 2000) / (6500 - 2000);
      const r = 255;
      const g = Math.floor(160 + (255 - 160) * t);
      const b = Math.floor(60 + (255 - 60) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return color;
  }, [color, whiteTemp]);

  // Memoize derived styles to prevent recalculation on every minor slider move
  const { glowOpacity, bulbOpacity, dropShadow } = useMemo(() => ({
    glowOpacity: (intensity / 100) * 0.5,
    bulbOpacity: 0.3 + (intensity / 100) * 0.7,
    dropShadow: `drop-shadow(0 0 ${20 * (intensity / 100)}px ${visualColor})`
  }), [intensity, visualColor]);

  return (
    <div className="w-full h-full p-3 md:p-6 flex flex-col bg-white/5 dark:bg-black/20 gap-6 transition-colors duration-500">

      {/* Compact Control Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* Box 1: Colors & Selection (Compact) */}
        <div className="glass-panel p-3.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-[#69C350]" />
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Barvy</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setColor(p)}
                className={`w-5 h-5 md:w-6 md:h-6 rounded-md transition-all duration-300 hover:scale-105 relative ${p.toLowerCase() === '#ffffff' ? 'border border-black' : ''
                  } ${color === p
                    ? `scale-110 shadow-lg ring-[2px] ring-offset-1 dark:ring-offset-zinc-900`
                    : 'opacity-80 hover:opacity-100'
                  }`}
                style={{
                  backgroundColor: p,
                  boxShadow: color === p ? `0 0 8px ${p}33` : 'none',
                  borderColor: p.toLowerCase() === '#ffffff' ? '#000000' : (color === p ? p : 'transparent')
                }}
              >
                {color === p && (
                  <div className="absolute inset-0 rounded-md ring-1 ring-white/20 ring-inset" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Box 2: Telemetry (Compact) */}
        <div className="glass-panel p-3.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#69C350]" />
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">RGBW Ovládání</span>
          </div>
          <div className="flex-grow flex items-center justify-between bg-slate-100/50 dark:bg-white/5 px-4 py-2.5 rounded-xl border border-black/5 dark:border-white/5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-tight">HEX</span>
            <span className="text-[12px] font-black text-[#69C350] dark:text-[#95E87D] tabular-nums tracking-widest">{color.toUpperCase()}</span>
          </div>
        </div>

        {/* Box 3: Intensity (Compact) */}
        <div className="glass-panel p-3.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner flex flex-col justify-center gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#69C350]" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Jas</span>
            </div>
            <span className="text-[11px] font-black text-[#69C350] tabular-nums">{intensity}%</span>
          </div>
          <div className="relative flex items-center h-4">
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

        {/* Box 4: White Temperature (Compact) */}
        <div className="glass-panel p-3.5 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner flex flex-col justify-center gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-3.5 h-3.5 text-[#69C350]" />
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Teplota bílé</span>
            </div>
            <span className="text-[11px] font-black text-[#69C350] tabular-nums">{whiteTemp}K</span>
          </div>
          <div className="relative flex items-center h-4">
            <input
              type="range"
              min="2000"
              max="6500"
              step="100"
              value={whiteTemp}
              onChange={(e) => {
                setWhiteTemp(parseInt(e.target.value));
                setColor('#ffffff');
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer border border-black/5 dark:border-white/10"
              style={{
                background: 'linear-gradient(to right, #ff8c00, #fff4e6, #f0f8ff)',
                WebkitAppearance: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Row 2: Visual Representation */}
      <div className="flex justify-center items-center relative min-h-[200px]">
        {/* Dynamic Multi-Glow Background - NO TRANSITION for performance */}
        <div
          className="absolute blur-[120px] w-64 h-64 rounded-full"
          style={{
            backgroundColor: visualColor,
            opacity: glowOpacity,
            transform: `scale(${0.8 + (intensity / 100) * 0.5})`,
            willChange: 'opacity, transform'
          }}
        />

        <div className="flex gap-2 md:gap-8 relative z-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`flex flex-col items-center gap-3 md:gap-4`}>
              <div className="relative group">
                {/* Glow - NO TRANSITION for performance */}
                <div
                  className="absolute inset-0 blur-2xl opacity-40 group-hover:opacity-60"
                  style={{
                    backgroundColor: visualColor,
                    transform: `scale(${intensity / 100})`,
                    willChange: 'transform'
                  }}
                />
                <div className="relative w-20 h-20 md:w-36 md:h-36 glass-panel rounded-3xl md:rounded-[3rem] border-2 border-white/20 flex items-center justify-center bg-white/5 md:backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                  <Lightbulb
                    className="w-10 h-10 md:w-20 md:h-20"
                    style={{
                      color: visualColor,
                      opacity: bulbOpacity,
                      filter: dropShadow,
                      willChange: 'opacity, filter'
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] md:text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">{ROOM_NAMES[i]}</span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#69C350]" />
                  <span className="text-[12px] font-bold text-gray-900 dark:text-white tabular-nums tracking-widest">{intensity}% PWR</span>
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
