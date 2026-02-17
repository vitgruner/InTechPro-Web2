
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
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  colorClass: string;
  colorHex: string;
}

const NodeConnector: React.FC<NodeConnectorProps> = ({ x, y, label, desc, icon: Icon, colorHex }) => (
  <g transform={`translate(${x}, ${y})`} className="cursor-pointer group">
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
    <text y="74" textAnchor="middle" className="fill-slate-400 dark:fill-gray-500 text-[9px] font-medium tracking-[0.2em] pointer-events-none">{desc}</text>
  </g>
);

interface DataPacketsProps {
  path: string;
  color: string;
  delay?: string;
  isMobile: boolean;
}

const DataPackets: React.FC<DataPacketsProps> = ({ path, color, delay = "0s", isMobile }) => {
  // Na mobilu animace zcela vypneme - je to nejnáročnější část SVG
  if (isMobile) return null;

  const packetCount = [0, 0.8, 1.6, 2.4];

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

  const nodes = [
    { label: 'Loxone Air', desc: 'Bezdrátová technologie', icon: LoxoneAirIcon, x: 130, y: 80, colorClass: 'blue', colorHex: '#69C350' },
    { label: 'Loxone Audio', desc: 'Multiroom audio systém', icon: LoxoneAudioIcon, x: 400, y: 45, colorClass: 'cyan', colorHex: '#06b6d4' },
    { label: 'Loxone Tree', desc: 'Sběrnicová technologie', icon: LoxoneTreeIcon, x: 670, y: 80, colorClass: 'lime', colorHex: '#84cc16' },
    { label: 'DALI', desc: 'Řízení osvětlení', icon: LoxoneLightingIcon, x: 90, y: 330, colorClass: 'orange', colorHex: '#ea580c' },
    { label: 'Vytápění / Chlazení', desc: 'Řízení vytápění a chlazení', icon: LoxoneTemperatureIcon, x: 710, y: 330, colorClass: 'purple', colorHex: '#9333ea' },
    { label: 'Větrání / Rekuperace', desc: 'Integrace přes Modbus', icon: LoxoneVentilationIcon, x: 200, y: 470, colorClass: 'teal', colorHex: '#14b8a6' },
    { label: 'Energetický management', desc: 'Energy Management', icon: LoxoneEnergyIcon, x: 600, y: 470, colorClass: 'amber', colorHex: '#f59e0b' },
  ];

  const CENTER_Y = 250;

  return (
    <div className="w-full bg-slate-50 dark:bg-[#080808] transition-colors duration-500 p-6 md:p-12 select-none overflow-hidden">
      <svg
        viewBox="0 0 800 640"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {!isMobile && (
            <>
              <filter id="packetGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="coreGlow">
                <feGaussianBlur stdDeviation="30" result="blur" />
                <feFlood floodColor="#84cc16" floodOpacity="0.1" result="color" />
                <feComposite in="color" in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </>
          )}

          <linearGradient id="miniserverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>
          <filter id="imgShadow" x="-10%" y="-10%" width="130%" height="140%">
            <feDropShadow dx="5" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        <g opacity="0.2">
          <path d={`M 0 ${CENTER_Y} L 800 ${CENTER_Y} M 400 0 L 400 500`} stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-white/10" />
          <circle cx="400" cy={CENTER_Y} r="260" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="15 15" className="text-slate-200 dark:text-white/5" />
          <circle cx="400" cy={CENTER_Y} r="180" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" className="text-slate-200 dark:text-white/5" />
        </g>

        {nodes.map((node, i) => {
          const path = `M 400 ${CENTER_Y} L ${node.x} ${node.y}`;
          return (
            <g key={`path-${i}`}>
              <path d={path} stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-white/10" />
              <DataPackets path={path} color={node.colorHex} delay={`${i * 0.5}s`} isMobile={isMobile} />
            </g>
          );
        })}

        {/* Bottom integration spoke */}
        <path d={`M 400 ${CENTER_Y} L 400 580`} stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-white/10" />
        <DataPackets path={`M 400 ${CENTER_Y} L 400 580`} color="#64748b" delay="3.5s" isMobile={isMobile} />
        <g transform="translate(400, 580)" className="cursor-pointer group">
          <circle r="55" fill="#64748b" opacity="0.01" className="group-hover:opacity-10 transition-all duration-500" />
          <circle r="38" fill="none" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.1" className="group-hover:opacity-40 transition-opacity" />
          <rect x="-28" y="-28" width="56" height="56" rx="16" className="fill-white/80 dark:fill-white/5 transition-all duration-500 group-hover:scale-110" stroke="#64748b" strokeWidth="1" strokeOpacity="0.2" />
          <foreignObject x="-14" y="-14" width="28" height="28" className="pointer-events-none overflow-visible">
            <div className="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
              </svg>
            </div>
          </foreignObject>
          <text y="58" textAnchor="middle" className="fill-slate-900 dark:fill-white text-[13px] font-black tracking-[0.15em] pointer-events-none">Systémové integrace</text>
          <text y="74" textAnchor="middle" className="fill-slate-400 dark:fill-gray-500 text-[9px] font-medium tracking-[0.15em] pointer-events-none">Modbus • KNX • MQTT • TCP/IP API</text>
        </g>

        <g transform={`translate(400, ${CENTER_Y + 20})`} filter="url(#imgShadow)">
          {!isMobile && (
            <ellipse cx="0" cy="0" rx="180" ry="120" fill="none" stroke="#84cc16" strokeWidth="0.5" strokeDasharray="10 40" opacity="0.03">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="45s" repeatCount="indefinite" />
            </ellipse>
          )}

          <image
            href="https://messtzramsuvjnrvwmfc.supabase.co/storage/v1/object/public/project-documents/assets/miniserver-gen2.webp"
            x="-300"
            y="-140"
            width="600"
            height="280"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {nodes.map((node) => (
          <NodeConnector key={node.label} {...node} />
        ))}


      </svg>
    </div>
  );
};

export default LoxoneSchema;
