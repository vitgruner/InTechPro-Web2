import React, { useState } from 'react';
import {
  Layers, Zap, Cpu, Eye, MousePointer2, Crosshair, Box, Network, Radio,
  Power, Thermometer, Footprints, Lightbulb, CloudSun, FileText, Bell, Phone, Flame, Music, User, Video, Blinds, Wifi, Wind, Tv, Square




} from 'lucide-react';

// Static color map for styling
const colorClasses: Record<string, { bg: string; bgHover: string; text: string; border: string; borderStatus: string }> = {
  'bg-[#69C350]': { bg: 'bg-[#69C350]/10', bgHover: 'group-hover:bg-[#69C350]', text: 'text-[#69C350]', border: 'border-[#7BD462]/20', borderStatus: 'border-[#69C350]/20' },
  'bg-blue-600': { bg: 'bg-blue-600/10', bgHover: 'group-hover:bg-blue-600', text: 'text-blue-600', border: 'border-blue-500/20', borderStatus: 'border-blue-600/20' },
};

interface VisualizationBoxProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
  statusLabel?: string;
}

const VisualizationBox: React.FC<VisualizationBoxProps> = ({ icon: Icon, title, subtitle, color, children, statusLabel = "Aktivní" }) => {
  const colors = colorClasses[color] || colorClasses['bg-[#69C350]'];
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
          <div className={`w-1.5 h-1.5 ${color.replace('bg-', 'bg-')} rounded-full animate-pulse shadow-[0_0_8px_currentColor]`} />
          <span className={`text-[9px] font-black ${colors.text} dark:text-white uppercase tracking-widest`}>{statusLabel}</span>
        </div>
      </div>
      <div className="flex-grow rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-black/60 shadow-inner p-1 relative">
        {children}
      </div>
    </div>
  );
};

const ProjectionVisualizer = () => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const rooms = [
    {
      id: 'hall', name: 'Vstupní hala', x: 40, y: 40, w: 120, h: 180, specs: 'Touch Pure Air pro příchodové scény',
      icons: [
        { Icon: Footprints, color: '#38bdf8', label: 'Pohyb' },
        { Icon: Bell, color: '#fb923c', label: 'Zvonek' },
        { Icon: Phone, color: '#4ade80', label: 'Intercom' },
        { Icon: Video, color: '#2dd4bf', label: 'Kamera' }
      ]
    },
    {
      id: 'tech', name: 'Tech. místnost', x: 40, y: 230, w: 120, h: 180, specs: 'Miniserver Gen.2 a systémové Extensiony',
      icons: [
        { Icon: Power, color: '#eab308', label: 'Energie' },
        { Icon: CloudSun, color: '#60a5fa', label: 'Meteo' },
        { Icon: FileText, color: '#94a3b8', label: 'Logy' },
        { Icon: Flame, color: '#ef4444', label: 'Kotel' }
      ]
    },
    {
      id: 'living', name: 'Obývací prostor', x: 170, y: 40, w: 340, h: 220, specs: 'Automatizace stínění Tree a Air senzory přítomnosti',
      icons: [
        { Icon: Thermometer, color: '#f43f5e', label: 'Teplota' },
        { Icon: Footprints, color: '#38bdf8', label: 'Pohyb' },
        { Icon: Lightbulb, color: '#facc15', label: 'Světla' },
        { Icon: Music, color: '#a78bfa', label: 'Audio' },
        { Icon: User, color: '#818cf8', label: 'Scény' },
        { Icon: Blinds, color: '#fbbf24', label: 'Žaluzie' },
        { Icon: Square, color: '#38bdf8', label: 'Okno' },
        { Icon: Wifi, color: '#8b5cf6', label: 'WiFi' },
        { Icon: Wind, color: '#22c55e', label: 'CO2' },
        { Icon: Tv, color: '#c084fc', label: 'TV' }
      ]
    },
    {
      id: 'kitchen', name: 'Kuchyně', x: 170, y: 270, w: 165, h: 140, specs: 'Inteligentní osvětlení a Air senzory',
      icons: [
        { Icon: Thermometer, color: '#f43f5e', label: 'Teplota' },
        { Icon: Lightbulb, color: '#facc15', label: 'Světla' },
        { Icon: Flame, color: '#ef4444', label: 'Senzor' }
      ]
    },
    {
      id: 'dining', name: 'Jídelna', x: 345, y: 270, w: 165, h: 140, specs: 'Scénické osvětlení a komfortní volby',
      icons: [
        { Icon: Lightbulb, color: '#facc15', label: 'Světla' },
        { Icon: Music, color: '#a78bfa', label: 'Audio' }
      ]
    },
    {
      id: 'bathroom', name: 'Koupelna', x: 520, y: 40, w: 110, h: 140, specs: 'Senzory vlhkosti a detekce kouře',
      icons: [
        { Icon: Thermometer, color: '#f43f5e', label: 'Teplota' },
        { Icon: Lightbulb, color: '#facc15', label: 'Světla' }
      ]
    },
    {
      id: 'hallway', name: 'Chodba', x: 520, y: 190, w: 110, h: 220, specs: 'Noční orientační osvětlení a komunikace',
      icons: [
        { Icon: Footprints, color: '#38bdf8', label: 'Pohyb' },
        { Icon: Lightbulb, color: '#facc15', label: 'Světla' },
        { Icon: Wifi, color: '#8b5cf6', label: 'WiFi' }
      ]
    },
    {
      id: 'bedroom', name: 'Ložnice', x: 640, y: 40, w: 220, h: 180, specs: 'Chytrá regulace teploty a presence Air',
      icons: [
        { Icon: Thermometer, color: '#f43f5e', label: 'Teplota' },
        { Icon: Lightbulb, color: '#facc15', label: 'Světla' },
        { Icon: User, color: '#818cf8', label: 'Scény' },
        { Icon: Blinds, color: '#fbbf24', label: 'Žaluzie' }
      ]
    },
    {
      id: 'kids', name: 'Dětský pokoj', x: 640, y: 230, w: 220, h: 180, specs: 'Zabezpečení a automatické noční světlo',
      icons: [
        { Icon: Thermometer, color: '#f43f5e', label: 'Teplota' },
        { Icon: Lightbulb, color: '#facc15', label: 'Světla' },
        { Icon: User, color: '#818cf8', label: 'Scény' },
        { Icon: Blinds, color: '#fbbf24', label: 'Žaluzie' }
      ]
    },
  ];

  const [liveValues, setLiveValues] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    const updateValues = () => {
      const nextValues: Record<string, string> = {};
      rooms.forEach(room => {
        room.icons.forEach(icon => {
          const key = `${room.id}-${icon.label}`;
          let val = '';
          switch (icon.label) {
            case 'Teplota':
              val = (21 + (Math.random() - 0.5) * 1.5).toFixed(1) + '°';
              break;
            case 'Světla':
              val = Math.random() > 0.4 ? Math.floor(20 + Math.random() * 80) + '%' : 'Off';
              break;
            case 'Žaluzie':
              val = Math.random() > 0.3 ? Math.floor(Math.random() * 100) + '%' : '0%';
              break;
            case 'Energie':
              val = Math.floor(100 + Math.random() * 800) + 'W';
              break;
            case 'Meteo':
              val = '12.4°';
              break;
            case 'Pohyb':
              val = Math.random() > 0.9 ? '!' : '';
              break;
            case 'Kotel':
              val = '55°';
              break;
            case 'Audio':
              val = Math.random() > 0.7 ? '♫' : '';
              break;
            case 'Scény':
              val = ['Večer', 'Párty', 'Kino', 'Spánek'][Math.floor(Math.random() * 4)];
              break;
            case 'WiFi':
              val = '-' + Math.floor(40 + Math.random() * 30) + 'dB';
              break;
            case 'CO2':
              val = Math.floor(400 + Math.random() * 500) + ' ppm';
              break;
            case 'TV':
              val = Math.random() > 0.7 ? 'Zap' : 'Vyp';
              break;
            case 'Okno':
              val = Math.random() > 0.9 ? 'Otevřeno' : 'Zavřeno';
              break;
            default:
              val = '';
          }
          nextValues[key] = val;
        });
      });
      setLiveValues(nextValues);
    };

    updateValues();
    const interval = setInterval(updateValues, 2500);
    return () => clearInterval(interval);
  }, []);

  const computedRooms = rooms.map(room => {
    if (!isMobile) return room;
    if (room.id === 'tech') return { ...room, x: 10, y: 230, w: 220, h: 180 };
    if (room.id === 'hall') return { ...room, x: 10, y: 40, w: 220, h: 180 };
    return { ...room, x: room.x + 70 };
  });

  return (
    <VisualizationBox
      icon={Network}
      title="Inteligentní Půdorys"
      subtitle="Vizualizace rozmístění prvků"
      color="bg-blue-600"
      statusLabel="SIMULACE"
    >
      <div className="w-full flex items-center justify-center relative">
        <svg
          viewBox={isMobile ? "30 0 390 940" : "20 20 860 410"}
          className={`w-full h-auto ${isMobile ? '' : 'max-h-[85vh]'} overflow-visible transition-all duration-500`}
        >
          <g transform={isMobile ? "translate(450, 0) rotate(90)" : ""} className="transition-all duration-500">
            {/* Rooms Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-white/5" />
              </pattern>
              <filter id="windowGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              {/* Subtle drop shadow for icons */}
              <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodOpacity="0.15" />
              </filter>
            </defs>
            <rect width="900" height="450" fill="url(#grid)" opacity="0.3" />

            {/* Room Outlines */}
            {computedRooms.map((room) => (
              <g
                key={room.id}
              /* onMouseEnter={() => setHoveredRoom(room.name)} 
              onMouseLeave={() => setHoveredRoom(null)} */
              >
                <rect
                  x={room.x} y={room.y} width={room.w} height={room.h}
                  className={`transition-all duration-500 fill-white dark:fill-[#131518] stroke-slate-300 dark:stroke-white/10 ${hoveredRoom === room.name ? 'stroke-blue-500 stroke-2' : 'stroke-1'}`}
                  rx="16"
                />

                {/* Room Icons Grid */}
                <g transform={`translate(${room.x + room.w / 2}, ${room.y + room.h / 2})`}>
                  {room.icons.map(({ Icon, color, label }, i) => {
                    const iconSize = isMobile ? 22 : 28;
                    const containerSize = iconSize + 16;
                    const textHeight = 14;

                    // Spacing choices
                    const gap = isMobile ? 18 : 8;
                    const verticalPadding = isMobile ? 18 : 14;
                    const rowHeight = containerSize + textHeight + verticalPadding;

                    // Determine Grid Columns
                    // On mobile, 'cols' are items across the horizontal axis (Room Y)
                    let cols = 1;
                    if (isMobile) {
                      if (room.id === 'living') cols = 3;
                      else if (['hallway', 'bathroom', 'hall', 'tech'].includes(room.id)) {
                        // Fit as many as possible in one horizontal line (along Room Y)
                        cols = room.icons.length;
                        // Safety check: if they exceed room.h, wrap to 2
                        if (cols * (containerSize + gap) - gap > room.h - 20) cols = 2;
                      } else {
                        cols = 2;
                      }
                    } else {
                      cols = room.w > 200 ? 5 : (room.w > 120 ? 3 : 2);
                    }

                    const row = Math.floor(i / cols);
                    const col = i % cols;
                    const totalRows = Math.ceil(room.icons.length / cols);
                    const itemsInThisRow = (row === totalRows - 1 && room.icons.length % cols !== 0)
                      ? room.icons.length % cols
                      : cols;

                    // Calculate relative positions in screen space
                    const h_pos = (col * (containerSize + gap)) - (itemsInThisRow * (containerSize + gap) - gap) / 2;
                    const v_pos = (row * rowHeight) - (totalRows * rowHeight - verticalPadding) / 2;

                    // Map screen relative positions back to Room Coordinates
                    // Room X is Vertical axis on mobile (due to 90deg rot)
                    // Room Y is Horizontal axis on mobile
                    const finalX = isMobile ? v_pos : h_pos;
                    const finalY = isMobile ? h_pos : v_pos;

                    return (
                      <g key={i} transform={`translate(${finalX}, ${finalY})`}>
                        <g transform={isMobile ? `rotate(-90, ${containerSize / 2}, ${containerSize / 2})` : ""}>
                          {/* Glassy Background Container */}
                          <rect
                            width={containerSize}
                            height={containerSize}
                            rx="12"
                            className="fill-slate-100/80 dark:fill-slate-800/80 stroke-white/50 dark:stroke-white/10"
                            strokeWidth="1"
                          />
                          {/* Icon */}
                          <Icon
                            x={(containerSize - iconSize) / 2}
                            y={(containerSize - iconSize) / 2}
                            width={iconSize}
                            height={iconSize}
                            strokeWidth={1.5}
                            color={color}
                            filter="url(#iconShadow)"
                          />
                          {/* Label - Below */}
                          <text
                            x={containerSize / 2}
                            y={containerSize + 10}
                            textAnchor="middle"
                            className="text-[7px] font-bold fill-slate-500 dark:fill-gray-400 uppercase tracking-tight pointer-events-none"
                          >
                            {label}
                          </text>

                          {/* Live Value Overlay - Above */}
                          {liveValues[`${room.id}-${label}`] && (
                            <text
                              x={containerSize / 2}
                              y={-5}
                              textAnchor="middle"
                              className="text-[8px] font-black fill-slate-900 dark:fill-white pointer-events-none"
                            >
                              {liveValues[`${room.id}-${label}`]}
                            </text>
                          )}
                        </g>
                      </g>
                    );
                  })}
                </g>

                <text
                  x={room.x + room.w / 2}
                  y={room.y + room.h - 12}
                  textAnchor="middle"
                  className="text-[8px] font-black uppercase tracking-widest fill-slate-400 dark:fill-gray-600 pointer-events-none"
                  transform={isMobile ? `rotate(180, ${room.x + room.w / 2}, ${room.y + room.h - 12})` : ""}
                >
                  {room.name}
                </text>
              </g>
            ))}

            {/* Structural Elements: Windows and Doors */}
            <g className="structural-elements">
              {/* Main Entrance Door (Vstupní hala) */}
              <line
                x1={isMobile ? "10" : "40"}
                y1="100"
                x2={isMobile ? "10" : "40"}
                y2="160"
                stroke="#22d3ee" strokeWidth="4" filter="url(#windowGlow)" strokeLinecap="round"
              />

              {/* Windows: Cyan highlights with glow */}
              <g stroke="#0ea5e9" strokeWidth="3" filter="url(#windowGlow)" strokeLinecap="round" opacity="0.8">
                {/* Hall/Tech Window */}
                <line
                  x1={isMobile ? "10" : "40"}
                  y1="55"
                  x2={isMobile ? "10" : "40"}
                  y2="85"
                />
                {/* Living Room Windows - split into two */}
                <line x1={isMobile ? "270" : "200"} y1="40" x2={isMobile ? "390" : "320"} y2="40" />
                <line x1={isMobile ? "430" : "360"} y1="40" x2={isMobile ? "550" : "480"} y2="40" />
                {/* Kitchen/Dining Windows */}
                <line x1={isMobile ? "280" : "210"} y1="410" x2={isMobile ? "365" : "295"} y2="410" />
                <line x1={isMobile ? "450" : "380"} y1="410" x2={isMobile ? "545" : "475"} y2="410" />
                {/* Bedroom Windows */}
                <line x1={isMobile ? "750" : "680"} y1="40" x2={isMobile ? "890" : "820"} y2="40" />
                <line x1={isMobile ? "930" : "860"} y1="80" x2={isMobile ? "930" : "860"} y2="140" />
                {/* Kids Room Windows */}
                <line x1={isMobile ? "750" : "680"} y1="410" x2={isMobile ? "890" : "820"} y2="410" />
                <line x1={isMobile ? "930" : "860"} y1="270" x2={isMobile ? "930" : "860"} y2="330" />
              </g>
            </g>
          </g>
        </svg>

        {/* Room Info Panel - Disabled as requested
        <div className={`absolute bottom-6 left-6 md:right-6 md:w-80 glass-panel p-4 rounded-2xl border border-black/5 dark:border-white/10 shadow-xl transition-all duration-300 z-40 transform ${hoveredRoom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Box className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h5 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">
                MÍSTNOST
              </h5>
              <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                {hoveredRoom}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-gray-400 font-bold leading-relaxed mt-1 uppercase tracking-tight">
                {computedRooms.find(r => r.name === hoveredRoom)?.specs}
              </p>
            </div>
          </div>
        </div>
        */}
      </div>
    </VisualizationBox >
  );
};

export default ProjectionVisualizer;
