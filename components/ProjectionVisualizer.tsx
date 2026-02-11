
import React, { useState } from 'react';
import { Layers, Zap, Cpu, Eye, MousePointer2, Crosshair, Box, Network } from 'lucide-react';

const ProjectionVisualizer = () => {
  const [activeLayer, setActiveLayer] = useState<'power' | 'bus' | 'sensors' | 'all'>('all'); // Default to all visually in logic, though unused for opacity now
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const rooms = [
    { id: 'living', name: 'Obývací prostor', x: 80, y: 40, w: 320, h: 220, specs: '12x stmívaný okruh, 4x Tree senzor' },
    { id: 'tech', name: 'Technická místnost', x: 420, y: 40, w: 200, h: 140, specs: 'Centrální rozvaděč, Miniserver Gen.2' },
    { id: 'bedroom', name: 'Ložnice', x: 420, y: 200, w: 200, h: 210, specs: '6x LED okruh, 2x Tree Touch' },
    { id: 'kitchen', name: 'Kuchyně', x: 80, y: 280, w: 320, h: 130, specs: 'DALI sběrnice, 8x relé okruh' },
  ];

  const layers = [
    { id: 'power', label: 'Silnoproud', icon: Zap, color: '#f59e0b', bg: 'bg-amber-500' },
    { id: 'bus', label: 'Loxone Tree', icon: Cpu, color: '#84cc16', bg: 'bg-lime-500' },
    { id: 'sensors', label: 'Senzor přítomosti Air', icon: Eye, color: '#69C350', bg: 'bg-[#69C350]' },
    { id: 'data', label: 'Ethernet', icon: Network, color: '#0ea5e9', bg: 'bg-sky-500' }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#080808] transition-colors duration-500 p-2 md:p-12 select-none overflow-hidden rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl relative">

      {/* Engineering Grid Overlay covering the whole pad */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#69C350 1px, transparent 1px), linear-gradient(90deg, #69C350 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Top Status Bar - HUD Style */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-4 bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 dark:border-white/10 shadow-sm pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em]">VRSTVY</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-300 dark:bg-white/10" />
          <div className="flex items-center gap-2">
            <Layers className="w-3 h-3 text-[#69C350]" />
            <span className="text-[10px] font-black text-[#69C350] uppercase tracking-[0.2em]">IN.TECH.PRO</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 dark:border-white/10 shadow-sm">
          <span>Scale 1:50</span>
          <span>Rev: 2.0.4</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">

        {/* Blueprint Area */}
        <div className="w-full relative overflow-visible pt-16 pb-6">
          <svg
            viewBox="0 0 700 450"
            className="w-full h-auto max-h-[60vh] overflow-visible drop-shadow-2xl"
          >
            {/* Background Architecture */}
            {rooms.map((room) => (
              <g
                key={room.id}
                onMouseEnter={() => setHoveredRoom(room.name)}
                onMouseLeave={() => setHoveredRoom(null)}
                className="cursor-crosshair transition-all duration-300"
              >
                <rect
                  x={room.x} y={room.y} width={room.w} height={room.h}
                  className={`transition-all duration-500 fill-white dark:fill-[#1a1d21] stroke-slate-300 dark:stroke-white/10 ${hoveredRoom === room.name ? 'stroke-[#7BD462]/50 stroke-2' : 'stroke-1'
                    }`}
                  rx="4"
                />
                <rect
                  x={room.x} y={room.y} width={room.w} height={room.h}
                  className={`transition-all duration-500 pointer-events-none ${hoveredRoom === room.name ? 'fill-[#69C350]/5' : 'fill-transparent'
                    }`}
                  rx="4"
                />
                <text
                  x={room.x + 12} y={room.y + 24}
                  className={`text-[9px] font-black uppercase tracking-widest transition-colors pointer-events-none ${hoveredRoom === room.name ? 'fill-[#69C350] dark:fill-[#95E87D]' : 'fill-slate-400 dark:fill-gray-600'
                    }`}
                >
                  {room.name}
                </text>
              </g>
            ))}

            {/* Power Layer (Amber) */}
            <g opacity={1} className="transition-opacity duration-700 pointer-events-none">
              <path d="M 470 110 L 470 340 L 150 340 L 150 180" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="6 6" />
              <circle cx="150" cy="180" r="4" fill="#f59e0b" filter="drop-shadow(0 0 4px #f59e0b)" />
              <circle cx="470" cy="110" r="4" fill="#f59e0b" />
            </g>

            {/* Smart BUS Layer (Lime) */}
            <g opacity={1} className="transition-opacity duration-700 pointer-events-none">
              <path d="M 440 90 L 250 90 L 250 220 L 450 220 L 450 280" stroke="#84cc16" strokeWidth="2.5" fill="none" />
              <circle cx="440" cy="90" r="5" fill="#84cc16" />
              <circle cx="450" cy="280" r="5" fill="#84cc16" />
              <circle r="3" fill="white">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 440 90 L 250 90 L 250 220 L 450 220 L 450 280" />
              </circle>
            </g>

            {/* Sensor Layer (Blue) */}
            <g opacity={1} className="transition-opacity duration-700 pointer-events-none">
              <circle cx="240" cy="180" r="50" fill="none" stroke="#69C350" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="10s" repeatCount="indefinite" />
              </circle>
              <circle cx="480" cy="320" r="40" fill="none" stroke="#69C350" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <circle cx="240" cy="345" r="45" fill="none" stroke="#69C350" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

              <g transform="translate(240, 180)">
                <circle r="4" fill="#69C350">
                  <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
              <g transform="translate(480, 320)">
                <circle r="4" fill="#69C350">
                  <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </g>
              <g transform="translate(240, 345)">
                <circle r="4" fill="#69C350">
                  <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>

            {/* Ethernet Layer (Sky Blue) */}
            <g opacity={1} className="transition-opacity duration-700 pointer-events-none">
              {/* Hub in Tech Room */}
              <circle cx="520" cy="110" r="6" fill="#0ea5e9" />

              {/* To Living Room */}
              <path d="M 520 110 L 410 110 L 240 110 L 240 150" stroke="#0ea5e9" strokeWidth="2" fill="none" />
              <rect x="236" y="146" width="8" height="8" fill="#0ea5e9" />

              {/* To Bedroom */}
              <path d="M 520 110 L 520 305" stroke="#0ea5e9" strokeWidth="2" fill="none" />
              <rect x="516" y="301" width="8" height="8" fill="#0ea5e9" />

              {/* To Kitchen */}
              <path d="M 520 110 L 410 110 L 410 270 L 240 270 L 240 330" stroke="#0ea5e9" strokeWidth="2" fill="none" />
              <rect x="236" y="326" width="8" height="8" fill="#0ea5e9" />

              {/* Data Flow Animation */}
              <circle r="2" fill="white">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 520 110 L 410 110 L 240 110 L 240 150" />
              </circle>
              <circle r="2" fill="white">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 520 110 L 520 305" />
              </circle>
              <circle r="2" fill="white">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 520 110 L 410 110 L 410 270 L 240 270 L 240 330" />
              </circle>
            </g>
          </svg>

          {/* Floating Detail Panel */}
          <div className={`absolute bottom-0 right-0 md:w-64 bg-white/90 dark:bg-[#1a1d21]/90 backdrop-blur-xl p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-500 z-40 transform ${hoveredRoom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#69C350]/10 flex items-center justify-center text-[#69C350] flex-shrink-0">
                <Box className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="text-[9px] font-black text-[#69C350] dark:text-[#7BD462] uppercase tracking-widest mb-1">Objekt: {hoveredRoom}</h5>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 font-bold leading-tight uppercase tracking-tight">
                  {rooms.find(r => r.name === hoveredRoom)?.specs}
                </p>
              </div>
            </div>
          </div>

          {!hoveredRoom && (
            <div className="absolute bottom-4 left-4 text-slate-400 dark:text-gray-600 animate-pulse pointer-events-none flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Interakce: Aktivujte kurzorem</span>
            </div>
          )}
        </div>

        {/* Legend / Controls */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6 pt-6 border-t border-slate-200 dark:border-white/5 mt-2">
          <div className="flex-1 w-full">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-gray-500 mb-3">Legenda Vrstev</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="relative flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/5 transition-colors"
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${layer.bg} text-white shadow-sm`}>
                    <layer.icon className="w-3 h-3" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-400">{layer.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-2 min-w-[140px]">
            <div className="flex items-center gap-2">
              <Crosshair className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Diagnostika</span>
            </div>
            <div className="w-full flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
              <span className="text-slate-500">Tree Signal</span>
              <span className="text-lime-600">98%</span>
            </div>
            <div className="w-full h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-lime-500 w-[98%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionVisualizer;
