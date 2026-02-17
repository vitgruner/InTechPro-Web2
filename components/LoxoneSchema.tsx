
import React, { useState, useEffect } from 'react';
import {
  LoxoneAirIcon, LoxoneAudioIcon, LoxoneTreeIcon,
  LoxoneLightingIcon, LoxoneTemperatureIcon,
  LoxoneVentilationIcon, LoxoneEnergyIcon
} from './LoxoneIcons';

interface NodeConnectorProps {
  x: number;
  y: number;
  label: string;
  desc: string;
  tooltip: string;
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  colorClass: string;
  colorHex: string;
  isMobile?: boolean;
}

const NodeConnector: React.FC<NodeConnectorProps> = ({ x, y, label, desc, tooltip, icon: Icon, colorHex }) => (
  <g transform={`translate(${x}, ${y})`} className="group">
    <title>{tooltip}</title>
    <circle r="55" fill={colorHex} opacity="0.01" className="group-hover:opacity-10 transition-all duration-500" />
    <circle r="38" fill="none" stroke={colorHex} strokeWidth="0.5" strokeDasharray="2 6" opacity="0.1" className="group-hover:opacity-40 transition-opacity" />

    <rect
      x="-28"
      y="-28"
      width="56"
      height="56"
      rx="16"
      className="fill-white/80 dark:fill-white/5 transition-all duration-500 group-hover:scale-110"
      stroke={colorHex}
      strokeWidth="1"
      strokeOpacity="0.2"
    />

    <foreignObject x="-16" y="-16" width="32" height="32" className="pointer-events-none overflow-visible">
      <div className="w-full h-full flex items-center justify-center">
        <Icon className="w-full h-full" style={{ color: colorHex }} />
      </div>
    </foreignObject>

    <text y="58" textAnchor="middle" className="fill-slate-900 dark:fill-white text-[13px] font-black tracking-[0.15em] pointer-events-none">{label}</text>
    <text y="74" textAnchor="middle" className="fill-slate-600 dark:fill-gray-400 text-[11px] font-medium tracking-[0.15em] pointer-events-none">{desc}</text>
  </g>
);

interface DataPacketsProps {
  path: string;
  color: string;
  delay?: string;
  isMobile: boolean;
}

const DataPackets: React.FC<DataPacketsProps> = ({ path, color, delay = "0s", isMobile }) => {
  const packetCount = isMobile ? [0, 1.6] : [0, 0.8, 1.6, 2.4];

  return (
    <>
      {packetCount.map((d, i) => (
        <circle key={i} r="2.8" fill={color} filter="url(#packetGlow)">
          <animateMotion
            path={path}
            dur="4.5s"
            begin={`${parseFloat(delay) + d}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1"
          />
        </circle>
      ))}
    </>
  );
};

const LoxoneSchema = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile: miniserver top, 2-column grid below; Desktop: circular layout
  const mobilePositions = [
    { x: 130, y: 330 },   // Air - row 1 left
    { x: 370, y: 330 },   // Audio - row 1 right
    { x: 130, y: 480 },   // Tree - row 2 left
    { x: 370, y: 480 },   // DALI - row 2 right
    { x: 130, y: 630 },   // Temperature - row 3 left
    { x: 370, y: 630 },   // Ventilation - row 3 right
    { x: 130, y: 780 },   // Energy - row 4 left
  ];

  const desktopPositions = [
    { x: 130, y: 80 },
    { x: 400, y: 45 },
    { x: 670, y: 80 },
    { x: 90, y: 330 },
    { x: 710, y: 330 },
    { x: 200, y: 470 },
    { x: 600, y: 470 },
  ];

  const baseNodes = [
    { label: 'Loxone Air', desc: 'Bezdrátová technologie', tooltip: 'Bezdrátová technologie vyvinutá pro automatizaci budov, umožňující instalaci bez kabeláže a bezpečnou šifrovanou komunikaci.', icon: LoxoneAirIcon, colorClass: 'blue', colorHex: '#69C350' },
    { label: 'Loxone Audio', desc: 'Multiroom audio systém', tooltip: 'Integrovaný multiroom audio systém pro přehrávání a řízení hudby v celé budově.', icon: LoxoneAudioIcon, colorClass: 'cyan', colorHex: '#06b6d4' },
    { label: 'Loxone Tree', desc: 'Sběrnicová technologie', tooltip: 'Kabelová sběrnicová technologie s volnou topologií zapojení, která výrazně snižuje množství kabeláže.', icon: LoxoneTreeIcon, colorClass: 'lime', colorHex: '#84cc16' },
    { label: 'DALI', desc: 'Řízení osvětlení', tooltip: 'Standardní komunikační protokol pro digitální řízení osvětlení integrovaný do systému Loxone.', icon: LoxoneLightingIcon, colorClass: 'orange', colorHex: '#ea580c' },
    { label: 'Vytápění / Chlazení', desc: '1-Wire • Modbus • analog.', tooltip: 'Automatizované řízení klimatu pomocí senzorů a regulátorů s integrací přes Modbus, 1-Wire a analogové vstupy.', icon: LoxoneTemperatureIcon, colorClass: 'purple', colorHex: '#9333ea' },
    { label: 'Větrání / Rekuperace', desc: 'Integrace přes Modbus', tooltip: 'Integrace vzduchotechniky a HVAC zařízení pomocí průmyslového komunikačního protokolu Modbus.', icon: LoxoneVentilationIcon, colorClass: 'teal', colorHex: '#14b8a6' },
    { label: 'Energetický mgmt', desc: 'Modbus • S0 • SMI', tooltip: 'Monitoring a optimalizace spotřeby energie včetně integrace elektroměrů a fotovoltaiky.', icon: LoxoneEnergyIcon, colorClass: 'amber', colorHex: '#f59e0b' },
  ];

  const desktopNodes = [
    { label: 'Loxone Air', desc: 'Bezdrátová technologie', tooltip: 'Bezdrátová technologie vyvinutá pro automatizaci budov, umožňující instalaci bez kabeláže a bezpečnou šifrovanou komunikaci.', icon: LoxoneAirIcon, colorClass: 'blue', colorHex: '#69C350' },
    { label: 'Loxone Audio', desc: 'Multiroom audio systém', tooltip: 'Integrovaný multiroom audio systém pro přehrávání a řízení hudby v celé budově.', icon: LoxoneAudioIcon, colorClass: 'cyan', colorHex: '#06b6d4' },
    { label: 'Loxone Tree', desc: 'Sběrnicová technologie', tooltip: 'Kabelová sběrnicová technologie s volnou topologií zapojení, která výrazně snižuje množství kabeláže.', icon: LoxoneTreeIcon, colorClass: 'lime', colorHex: '#84cc16' },
    { label: 'DALI', desc: 'Řízení osvětlení', tooltip: 'Standardní komunikační protokol pro digitální řízení osvětlení integrovaný do systému Loxone.', icon: LoxoneLightingIcon, colorClass: 'orange', colorHex: '#ea580c' },
    { label: 'Vytápění / Chlazení', desc: '1-Wire • Modbus • analogové vstupy', tooltip: 'Automatizované řízení klimatu pomocí senzorů a regulátorů s integrací přes Modbus, 1-Wire a analogové vstupy.', icon: LoxoneTemperatureIcon, colorClass: 'purple', colorHex: '#9333ea' },
    { label: 'Větrání / Rekuperace', desc: 'Integrace přes Modbus', tooltip: 'Integrace vzduchotechniky a HVAC zařízení pomocí průmyslového komunikačního protokolu Modbus.', icon: LoxoneVentilationIcon, colorClass: 'teal', colorHex: '#14b8a6' },
    { label: 'Energetický management', desc: 'Modbus • S0 • Smart Meter Interface', tooltip: 'Monitoring a optimalizace spotřeby energie včetně integrace elektroměrů a fotovoltaiky.', icon: LoxoneEnergyIcon, colorClass: 'amber', colorHex: '#f59e0b' },
  ];

  const positions = isMobile ? mobilePositions : desktopPositions;
  const nodeData = isMobile ? baseNodes : desktopNodes;
  const nodes = nodeData.map((node, i) => ({ ...node, x: positions[i].x, y: positions[i].y }));

  const CENTER_X = isMobile ? 250 : 400;
  const CENTER_Y = isMobile ? 220 : 250;
  const INTEGRATION_Y = isMobile ? 780 : 580;
  const viewBox = isMobile ? '0 0 500 920' : '0 0 800 640';

  return (
    <div className="w-full bg-slate-50 dark:bg-[#080808] transition-colors duration-500 p-6 md:p-12 select-none overflow-hidden">
      <svg
        viewBox={viewBox}
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="packetGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {!isMobile && (
            <filter id="coreGlow">
              <feGaussianBlur stdDeviation="30" result="blur" />
              <feFlood floodColor="#84cc16" floodOpacity="0.1" result="color" />
              <feComposite in="color" in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          <linearGradient id="miniserverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>
          <filter id="imgShadow" x="-10%" y="-10%" width="130%" height="140%">
            <feDropShadow dx="5" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {!isMobile && (
          <g opacity="0.2">
            <path d={`M 0 ${CENTER_Y} L 800 ${CENTER_Y} M 400 0 L 400 500`} stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-white/10" />
            <circle cx="400" cy={CENTER_Y} r="260" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="15 15" className="text-slate-200 dark:text-white/5" />
            <circle cx="400" cy={CENTER_Y} r="180" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" className="text-slate-200 dark:text-white/5" />
          </g>
        )}

        {/* Connection lines — on mobile lines go from miniserver (y=100), on desktop from center */}
        {nodes.map((node, i) => {
          const originY = isMobile ? 100 : CENTER_Y;
          const path = `M ${CENTER_X} ${originY} L ${node.x} ${node.y}`;
          return (
            <g key={`path-${i}`}>
              <path d={path} stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-white/10" />
              <DataPackets path={path} color={node.colorHex} delay={`${i * 0.5}s`} isMobile={isMobile} />
            </g>
          );
        })}

        {/* Bottom integration spoke — rendered before miniserver so line goes behind it */}
        {!isMobile && (
          <>
            <path d={`M ${CENTER_X} ${CENTER_Y} L ${CENTER_X} ${INTEGRATION_Y}`} stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-white/10" />
            <DataPackets path={`M ${CENTER_X} ${CENTER_Y} L ${CENTER_X} ${INTEGRATION_Y}`} color="#64748b" delay="3.5s" isMobile={isMobile} />
          </>
        )}
        {isMobile && (
          <path d={`M ${CENTER_X} 100 L 370 ${INTEGRATION_Y}`} stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-white/10" />
        )}

        {/* Miniserver image — rendered after all lines so it sits on top */}
        <g transform={`translate(${CENTER_X}, ${isMobile ? 100 : CENTER_Y + 20})`} filter="url(#imgShadow)">
          {!isMobile && (
            <ellipse cx="0" cy="0" rx="180" ry="120" fill="none" stroke="#84cc16" strokeWidth="0.5" strokeDasharray="10 40" opacity="0.03">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="45s" repeatCount="indefinite" />
            </ellipse>
          )}

          <image
            href="https://messtzramsuvjnrvwmfc.supabase.co/storage/v1/object/public/project-documents/assets/miniserver-gen2.webp"
            x={isMobile ? "-250" : "-300"}
            y={isMobile ? "-130" : "-140"}
            width={isMobile ? "500" : "600"}
            height={isMobile ? "260" : "280"}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        <g transform={`translate(${isMobile ? 370 : CENTER_X}, ${INTEGRATION_Y})`} className="group">
          <title>Otevřená integrace zařízení třetích stran pomocí protokolů Modbus, KNX, MQTT a API.</title>
          <circle r="55" fill="#64748b" opacity="0.01" className="group-hover:opacity-10 transition-all duration-500" />
          <circle r="38" fill="none" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.1" className="group-hover:opacity-40 transition-opacity" />
          <rect x="-28" y="-28" width="56" height="56" rx="16" className="fill-white/80 dark:fill-white/5 transition-all duration-500 group-hover:scale-110" stroke="#64748b" strokeWidth="1" strokeOpacity="0.2" />
          <foreignObject x="-14" y="-14" width="28" height="28" className="pointer-events-none overflow-visible">
            <div className="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="6" height="6" rx="1" />
                <path d="M4 4h3v3H4zM17 4h3v3h-3zM4 17h3v3H4zM17 17h3v3h-3z" />
                <path d="M7 5.5H9M15 5.5h2M5.5 7V9M18.5 7V9M5.5 15v2M18.5 15v2M7 18.5H9M15 18.5h2" />
              </svg>
            </div>
          </foreignObject>
          <text y="58" textAnchor="middle" className="fill-slate-900 dark:fill-white text-[13px] font-black tracking-[0.15em] pointer-events-none">{isMobile ? 'Syst. integrace' : 'Systémové integrace'}</text>
          <text y="74" textAnchor="middle" className="fill-slate-600 dark:fill-gray-400 text-[11px] font-medium tracking-[0.15em] pointer-events-none">{isMobile ? 'Modbus • KNX • MQTT' : 'Modbus • KNX • MQTT • TCP/IP API'}</text>
        </g>

        {/* Node icons */}
        {nodes.map((node) => (
          <NodeConnector key={node.label} {...node} isMobile={isMobile} />
        ))}


      </svg>
    </div>
  );
};

export default LoxoneSchema;
