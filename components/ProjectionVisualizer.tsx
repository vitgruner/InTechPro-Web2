
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
    { id: 'bus', label: 'Smart BUS', icon: Cpu, color: '#84cc16', bg: 'bg-lime-500' },
    { id: 'sensors', label: 'Senzorika', icon: Eye, color: '#2563eb', bg: 'bg-blue-600' },
    { id: 'data', label: 'Ethernet', icon: Network, color: '#0ea5e9', bg: 'bg-sky-500' }
  ];

  return (
    <div className="w-full glass-panel rounded-[2rem] border border-slate-200 dark:border-white/10 relative overflow-hidden group select-none transition-all duration-500 shadow-xl bg-white/50 dark:bg-black/20">
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em]">VŠECHNY VRSTVY</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-300 dark:bg-white/10" />
          <div className="flex items-center gap-2">
            <Layers className="w-3 h-3 text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">IN.TECH.PRO</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
           <span>Scale 1:50</span>
           <span>Rev: 2.0.4</span>
        </div>
      </div>

      {/* Main Container - Changed from flex-row to flex-col for mobile optimization */}
      <div className="relative flex flex-col h-auto">
        
        {/* Blueprint Area - Forced height on mobile to stretch */}
        <div className="flex-1 relative overflow-hidden pt-14 h-[500px] md:h-auto md:min-h-[400px]">
          <svg 
            viewBox="0 0 700 450" 
            preserveAspectRatio="none"
            className="w-full h-full p-1 md:p-8 transition-transform duration-700 hover:scale-[1.02]"
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
                  className={`transition-all duration-500 fill-transparent stroke-slate-300 dark:stroke-white/10 ${
                    hoveredRoom === room.name ? 'stroke-blue-500/50' : ''
                  }`}
                  strokeWidth="1.5"
                />
                <rect 
                  x={room.x} y={room.y} width={room.w} height={room.h} 
                  className={`transition-all duration-500 pointer-events-none ${
                    hoveredRoom === room.name ? 'fill-blue-600/5' : 'fill-transparent'
                  }`}
                />
                <text 
                  x={room.x + 12} y={room.y + 24} 
                  className={`text-[9px] font-black uppercase tracking-widest transition-colors pointer-events-none ${
                    hoveredRoom === room.name ? 'fill-blue-600 dark:fill-blue-400' : 'fill-slate-400 dark:fill-gray-600'
                  }`}
                >
                  {room.name}
                </text>
              </g>
            ))}

            {/* Power Layer (Amber) - Opacity set to 1 (Always Visible) */}
            <g opacity={1} className="transition-opacity duration-700 pointer-events-none">
              <path d="M 470 110 L 470 340 L 150 340 L 150 180" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="6 6" />
              <circle cx="150" cy="180" r="4" fill="#f59e0b" filter="drop-shadow(0 0 4px #f59e0b)" />
              <circle cx="470" cy="110" r="4" fill="#f59e0b" />
            </g>

            {/* Smart BUS Layer (Lime) - Opacity set to 1 (Always Visible) */}
            <g opacity={1} className="transition-opacity duration-700 pointer-events-none">
              <path d="M 440 90 L 250 90 L 250 220 L 450 220 L 450 280" stroke="#84cc16" strokeWidth="2.5" fill="none" />
              <circle cx="440" cy="90" r="5" fill="#84cc16" />
              <circle cx="450" cy="280" r="5" fill="#84cc16" />
              <circle r="3" fill="white">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 440 90 L 250 90 L 250 220 L 450 220 L 450 280" />
              </circle>
            </g>

            {/* Sensor Layer (Blue) - Opacity set to 1 (Always Visible) */}
            <g opacity={1} className="transition-opacity duration-700 pointer-events-none">
              <circle cx="240" cy="180" r="50" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="10s" repeatCount="indefinite" />
              </circle>
              <circle cx="480" cy="320" r="40" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              <circle cx="240" cy="345" r="45" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
              
              <g transform="translate(240, 180)">
                <circle r="4" fill="#2563eb">
                   <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
              <g transform="translate(480, 320)">
                <circle r="4" fill="#2563eb">
                   <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
              </g>
              <g transform="translate(240, 345)">
                <circle r="4" fill="#2563eb">
                   <animate attributeName="r" values="3;6;3" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>

            {/* Ethernet Layer (Sky Blue) - Opacity set to 1 (Always Visible) */}
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
          <div className={`absolute bottom-6 left-6 right-6 md:right-auto md:w-64 glass-panel p-5 rounded-2xl border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/60 shadow-2xl transition-all duration-500 z-40 ${
            hoveredRoom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Box className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="text-[9px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest mb-1">Objekt: {hoveredRoom}</h5>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 font-bold leading-tight uppercase tracking-tight">
                  {rooms.find(r => r.name === hoveredRoom)?.specs}
                </p>
              </div>
            </div>
          </div>

          {!hoveredRoom && (
            <div className="absolute bottom-6 left-6 text-slate-400 dark:text-gray-600 animate-pulse pointer-events-none flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Interakce: Aktivujte kurzorem</span>
            </div>
          )}
        </div>

        {/* Legend / Controls - Moved below model, simplified for legend usage */}
        <div className="w-full p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-gray-500 mb-2">Legenda Vrstev</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="relative flex items-center gap-3 px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/5 text-slate-500 dark:text-gray-400 bg-white/50 dark:bg-white/[0.02]"
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${layer.bg} text-white shadow-md`}>
                    <layer.icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black uppercase tracking-widest block">{layer.label}</span>
                    <span className="text-[8px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-tight">
                      Viditelné
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-white/5 mt-6">
             <div className="flex items-center gap-3 mb-4">
                <Crosshair className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diagnostika Jádra</span>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-slate-400">Signál Tree</span>
                      <span className="text-lime-600">98%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-lime-500 w-[98%]" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-400">Power Load</span>
                        <span className="text-amber-500">1.2 kW</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[30%]" />
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionVisualizer;
