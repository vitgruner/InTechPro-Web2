
import React, { useState } from 'react';
import { Layers, Zap, Cpu, Eye, MousePointer2, Crosshair, Box, Network, Radio } from 'lucide-react';

const ProjectionVisualizer = () => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);

  const rooms = [
    { id: 'hall', name: 'Vstupní hala', x: 40, y: 40, w: 120, h: 180, specs: 'Touch Pure Air pro příchodové scény' },
    { id: 'tech', name: 'Technická místnost', x: 40, y: 230, w: 120, h: 180, specs: 'Miniserver Gen.2 a systémové Extensiony' },
    { id: 'living', name: 'Obývací prostor', x: 170, y: 40, w: 340, h: 220, specs: 'Automatizace stínění Tree a Air senzory přítomnosti' },
    { id: 'kitchen', name: 'Kuchyně', x: 170, y: 270, w: 165, h: 140, specs: 'Inteligentní osvětlení a Air senzory' },
    { id: 'dining', name: 'Jídelna', x: 345, y: 270, w: 165, h: 140, specs: 'Scénické osvětlení a komfortní volby' },
    { id: 'bathroom', name: 'Koupelna', x: 520, y: 40, w: 110, h: 140, specs: 'Senzory vlhkosti a detekce kouře' },
    { id: 'hallway', name: 'Chodba', x: 520, y: 190, w: 110, h: 220, specs: 'Noční orientační osvětlení a komunikace' },
    { id: 'bedroom', name: 'Ložnice', x: 640, y: 40, w: 220, h: 180, specs: 'Chytrá regulace teploty a presence Air' },
    { id: 'kids', name: 'Dětský pokoj', x: 640, y: 230, w: 220, h: 180, specs: 'Zabezpečení a automatické noční světlo' },
  ];

  const devices = [
    // Tech Stack (now at the entrance for realistic wiring)
    { id: 'ms', name: 'Loxone Miniserver', x: 100, y: 260, tech: 'bus', tooltip: 'Centrální mozek budovy pro lokální zpracování a řízení automatizace bez cloudu.' },
    { id: 'tree_ext', name: 'Tree Extension', x: 100, y: 290, tech: 'bus', tooltip: 'Sběrnicové rozhraní Loxone Tree pro kabelové propojení periférií se sníženou pracností.' },
    { id: 'air_base', name: 'Air Base Extension', x: 100, y: 320, tech: 'bus', tooltip: 'Základnová stanice pro bezdrátovou komunikaci se zařízeními Loxone Air v celém domě.' },
    // Field Devices (Unified under Tree topology)
    { id: 'touch_hall', name: 'Touch Pure Air', x: 100, y: 130, tech: 'bus', tooltip: 'Bezdrátový ovládací prvek pro elegantní řízení světel, žaluzií a hudby.' },
    { id: 'presence_living', name: 'Presence Sensor Air', x: 340, y: 150, tech: 'bus', tooltip: 'Senzor pro spolehlivou detekci přítomnosti, jasu a teploty pomocí Air technologie.' },
    { id: 'presence_bedroom', name: 'Presence Sensor Air', x: 750, y: 130, tech: 'bus', tooltip: 'Automatizace klimatu a nočního osvětlení na základě reálné přítomnosti.' },
    { id: 'presence_kids', name: 'Presence Sensor Air', x: 750, y: 320, tech: 'bus', tooltip: 'Chytré monitorování pro bezpečné a úsporné osvětlení dětského pokoje.' },
    { id: 'presence_kitchen', name: 'Presence Sensor Air', x: 252, y: 340, tech: 'bus', tooltip: 'Tři senzory v jednom pro optimální řízení světel a rekuperace bez kabeláže.' },
    { id: 'smoke_bath', name: 'Smoke Detector Air', x: 575, y: 110, tech: 'bus', tooltip: 'Certifikovaný bezdrátový kouřový hlásič v koupelně integrovaný do bezpečnosti.' },
    { id: 'shading_tree', name: 'Shading Actuator (Tree)', x: 250, y: 75, tech: 'bus', tooltip: 'Pohon pro automatické stínění s přesnou kontrolou polohy lamel po sběrnici Tree.' },
  ];

  const layers = [
    { id: 'bus', label: 'Loxone Tree', icon: Cpu, color: '#84cc16', bg: 'bg-lime-500' }
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#080808] transition-colors duration-500 p-2 md:p-12 select-none overflow-hidden rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-2xl relative">
      {/* HUD style status bar */}
      <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-4 bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 dark:border-white/10 shadow-sm pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em]">PROJEKCE</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-300 dark:bg-white/10" />
          <div className="flex items-center gap-2">
            <Network className="w-3 h-3 text-[#84cc16]" />
            <span className="text-[10px] font-black text-[#84cc16] uppercase tracking-[0.2em]">UNIFIKOVANÁ TREE SBĚRNICE</span>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="w-full relative overflow-visible pt-16 pb-6">
          <svg viewBox="0 0 900 450" className="w-full h-auto max-h-[65vh] overflow-visible">
            {/* Rooms Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-white/5" />
              </pattern>
            </defs>
            <rect width="900" height="450" fill="url(#grid)" opacity="0.5" />

            {/* Room Outlines */}
            {rooms.map((room) => (
              <g key={room.id} onMouseEnter={() => setHoveredRoom(room.name)} onMouseLeave={() => setHoveredRoom(null)}>
                <rect
                  x={room.x} y={room.y} width={room.w} height={room.h}
                  className={`transition-all duration-500 fill-white dark:fill-[#131518] stroke-slate-300 dark:stroke-white/10 ${hoveredRoom === room.name ? 'stroke-[#84cc16]/50 stroke-2' : 'stroke-1'}`}
                  rx="6"
                />
                <text x={room.x + 12} y={room.y + 24} className="text-[8px] font-black uppercase tracking-widest fill-slate-400 dark:fill-gray-600 pointer-events-none">
                  {room.name}
                </text>
              </g>
            ))}

            {/* Structural Elements: Windows and Doors */}
            <g className="structural-elements">
              <defs>
                <filter id="windowGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Main Entrance Door (Vstupní hala) */}
              <line x1="40" y1="100" x2="40" y2="160" stroke="#22d3ee" strokeWidth="4" filter="url(#windowGlow)" strokeLinecap="round" />
              <text x="50" y="133" className="text-[7px] font-black fill-cyan-400 dark:fill-cyan-500 uppercase tracking-widest pointer-events-none">VSTUP</text>

              {/* Windows: Cyan highlights with glow */}
              <g stroke="#0ea5e9" strokeWidth="3" filter="url(#windowGlow)" strokeLinecap="round" opacity="0.8">
                {/* Hall Window */}
                <line x1="40" y1="55" x2="40" y2="85" />
                {/* Living Room Windows - split into two */}
                <line x1="200" y1="40" x2="320" y2="40" />
                <line x1="360" y1="40" x2="480" y2="40" />
                {/* Kitchen/Dining Windows */}
                <line x1="210" y1="410" x2="295" y2="410" />
                <line x1="380" y1="410" x2="475" y2="410" />
                {/* Bedroom Windows */}
                <line x1="680" y1="40" x2="820" y2="40" />
                <line x1="860" y1="80" x2="860" y2="140" />
                {/* Kids Room Windows */}
                <line x1="680" y1="410" x2="820" y2="410" />
                <line x1="860" y1="270" x2="860" y2="330" />
              </g>
            </g>

            {/* Unified Loxone Tree Connections: Green Solid */}
            <g className="connections tree-layer">
              {/* Complex topology derived from previous Air layer */}
              <g fill="none" stroke="#84cc16" strokeWidth="2" opacity="0.6">
                <path d="M 100 320 L 100 130" />
                <path d="M 100 320 L 340 320 L 340 150" />
                <path d="M 100 320 L 575 320 L 575 110" />
                <path d="M 100 320 L 750 320 L 750 130" />
                <path d="M 100 320 L 750 320" />
                <path d="M 100 320 L 252 320 L 252 340" />
                <path d="M 100 290 L 250 290 L 250 75" />
              </g>

              {/* Multi-branch animations */}
              <circle r="2.5" fill="white">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 100 320 L 100 130" />
              </circle>
              <circle r="2.5" fill="white">
                <animateMotion dur="4.5s" repeatCount="indefinite" path="M 100 320 L 340 320 L 340 150" />
              </circle>
              <circle r="2.5" fill="white">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M 100 320 L 575 320 L 575 110" />
              </circle>
              <circle r="2.5" fill="white">
                <animateMotion dur="6.5s" repeatCount="indefinite" path="M 100 320 L 750 320 L 750 130" />
              </circle>
              <circle r="2.5" fill="white">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 100 290 L 250 290 L 250 75" />
              </circle>
            </g>

            {/* Devices Nodes */}
            {devices.map((dev) => (
              <g
                key={dev.id}
                onMouseEnter={() => setHoveredDevice(dev.name)}
                onMouseLeave={() => setHoveredDevice(null)}
                className="cursor-help"
              >
                <title>{dev.tooltip}</title>
                <circle
                  cx={dev.x} cy={dev.y} r={hoveredDevice === dev.name ? "7" : "5"}
                  fill="#84cc16"
                  className="transition-all duration-300"
                />
                {hoveredDevice === dev.name && (
                  <circle cx={dev.x} cy={dev.y} r="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#84cc16] animate-ping opacity-30" />
                )}
              </g>
            ))}

            {/* Minirozvadeč (Distribution Board in Tech room) - Final layer on top to cover connections and nodes */}
            <g transform="translate(60, 268)" className="pointer-events-none">
              <rect width="80" height="105" fill="white" className="dark:fill-[#131518] stroke-slate-300 dark:stroke-white/10" strokeWidth="1" rx="4" />
              {/* DIN Rails and Internal Hardware Simulation (#vyroba-rozvadecu) */}
              <g className="hardware-simulation">
                {/* DIN Rail 1: Power, Core & Audio (Power + MS Compact + Tree + Relay + Air + Stereo + Audio Server) */}
                <line x1="5" y1="25" x2="75" y2="25" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-white/20" />
                <rect x="7" y="12" width="8" height="18" fill="#52525b" rx="1" /> {/* Power Supply */}
                <rect x="16" y="10" width="14" height="22" fill="#84cc16" rx="2" /> {/* Miniserver Compact */}
                <rect x="31" y="14" width="4" height="15" fill="#1a1a1a" rx="1" /> {/* Tree Extension */}
                <rect x="36" y="14" width="4" height="15" fill="#1a1a1a" rx="1" /> {/* Relay Extension */}
                <rect x="41" y="14" width="4" height="15" fill="#1a1a1a" rx="1" /> {/* Air Base Extension */}
                <rect x="46" y="14" width="4" height="15" fill="#1a1a1a" rx="1" /> {/* Stereo Extension - Synchronized (#vyroba-rozvadecu) */}
                <rect x="51" y="12" width="23" height="18" fill="#964c91" rx="1.5" /> {/* Audio Server (9 TE) */}

                {/* DIN Rail 2: Actuators (Dimmer 9 TE + Dimmer 9 TE + Relay 9 TE) */}
                <line x1="5" y1="55" x2="75" y2="55" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-white/20" />
                <rect x="8" y="42" width="22" height="18" fill="#1a1a1a" rx="1.5" /> {/* Dimmer Extension */}
                <rect x="31" y="42" width="22" height="18" fill="#1a1a1a" rx="1.5" /> {/* Dimmer Extension */}
                <rect x="54" y="42" width="22" height="18" fill="#1a1a1a" rx="1.5" /> {/* Relay Extension */}

                {/* DIN Rail 3: Peripherals (RGBW Tree + Nano + DALI + DI Extension + Meter) */}
                <line x1="5" y1="85" x2="75" y2="85" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-white/20" />
                <rect x="8" y="75" width="7" height="15" fill="#1a1a1a" rx="1" /> {/* RGBW Dimmer Tree */}
                <rect x="16" y="75" width="7" height="15" fill="#1a1a1a" rx="1" /> {/* RGBW Dimmer Tree */}
                <rect x="24" y="75" width="7" height="15" fill="#1a1a1a" rx="1" /> {/* DALI Extension */}
                <rect x="32" y="75" width="7" height="15" fill="#1a1a1a" rx="1" /> {/* DALI Extension */}
                <rect x="40" y="75" width="7" height="15" fill="#1a1a1a" rx="1" /> {/* DI Extension */}
                <rect x="48" y="75" width="14" height="15" fill="#1a1a1a" rx="1.5" /> {/* Energy Meter Tree */}
              </g>
            </g>
          </svg>

          {/* Device / Room Info Panel */}
          <div className={`absolute bottom-0 left-0 right-0 md:left-auto md:right-0 md:w-80 glass-panel md:p-6 p-4 rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl transition-all duration-500 z-40 transform ${hoveredRoom || hoveredDevice ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#69C350]/10 flex items-center justify-center text-[#69C350]">
                {hoveredDevice ? <Cpu className="w-5 h-5" /> : <Box className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <h5 className="text-[10px] font-black text-[#84cc16] uppercase tracking-widest mb-1">
                  {hoveredDevice ? 'SYSTÉMOVÝ PRVEK' : 'MÍSTNOST'}
                </h5>
                <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                  {hoveredDevice || hoveredRoom}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 font-bold leading-relaxed mt-1 uppercase tracking-tight">
                  {hoveredDevice
                    ? devices.find(d => d.name === hoveredDevice)?.tooltip
                    : rooms.find(r => r.name === hoveredRoom)?.specs
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-200 dark:border-white/5 mt-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center gap-3 px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/40 dark:bg-white/[0.02]">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${layer.bg} shadow-lg text-white`}>
                  <layer.icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-gray-400">{layer.label}</span>
                  <span className="text-[8px] font-bold text-slate-400">AKTIVNÍ VRSTVA</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-[#84cc16]/5 px-4 py-2 rounded-2xl border border-[#84cc16]/20">
            <Zap className="w-3.5 h-3.5 text-[#84cc16]" />
            <span className="text-[10px] font-black text-[#84cc16] uppercase tracking-widest">System Online</span>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProjectionVisualizer;
