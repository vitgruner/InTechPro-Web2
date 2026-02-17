
import React, { useState, useEffect } from 'react';
import { Cpu, Radio, Lightbulb, Thermometer, Share2 } from 'lucide-react';

interface NodeConnectorProps {
  x: number;
  y: number;
  label: string;
  id: string;
  icon: React.ElementType;
  colorClass: string;
  colorHex: string;
}

const NodeConnector: React.FC<NodeConnectorProps> = ({ x, y, label, id, icon: Icon, colorClass, colorHex }) => (
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

    <foreignObject x="-14" y="-14" width="28" height="28" className="pointer-events-none group-hover:scale-110 transition-transform duration-500 overflow-visible">
      <div className="w-full h-full flex items-center justify-center">
        <Icon className={`w-full h-full text-${colorClass}-600 dark:text-${colorClass}-400`} />
      </div>
    </foreignObject>

    <text y="62" textAnchor="middle" className="fill-slate-400 dark:fill-gray-500 text-[10px] font-black uppercase tracking-[0.35em] pointer-events-none">{id}</text>
    <text y="82" textAnchor="middle" className="fill-slate-900 dark:fill-white text-[14px] font-black uppercase tracking-[0.2em] pointer-events-none">{label}</text>
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
    { id: 'LOXONE.AIR', label: 'Bezdrátové prvky', icon: Radio, x: 130, y: 100, colorClass: 'blue', colorHex: '#69C350' },
    { id: 'LOXONE.TREE', label: 'Tree sběrnice', icon: Share2, x: 670, y: 100, colorClass: 'lime', colorHex: '#84cc16' },
    { id: 'LOXONE.DALI.EXTENSION', label: 'Osvětlení', icon: Lightbulb, x: 130, y: 360, colorClass: 'orange', colorHex: '#ea580c' },
    { id: 'LOXONE.DIGITÁLNÍ.VÝSTUP', label: 'Topení/Chlazení', icon: Thermometer, x: 670, y: 360, colorClass: 'purple', colorHex: '#9333ea' },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-[#080808] transition-colors duration-500 p-6 md:p-12 select-none overflow-hidden">
      <svg
        viewBox="0 0 800 500"
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
        </defs>

        <g opacity="0.2">
          <path d="M 0 230 L 800 230 M 400 0 L 400 500" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-white/10" />
          <circle cx="400" cy="230" r="260" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="15 15" className="text-slate-200 dark:text-white/5" />
          <circle cx="400" cy="230" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" className="text-slate-200 dark:text-white/5" />
        </g>

        {nodes.map((node, i) => {
          const path = `M 400 230 L ${node.x} ${node.y}`;
          return (
            <g key={`path-${i}`}>
              <path d={path} stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-white/10" />
              <DataPackets path={path} color={node.colorHex} delay={`${i * 0.5}s`} isMobile={isMobile} />
            </g>
          );
        })}

        <g transform="translate(400, 230)" filter={!isMobile ? "url(#coreGlow)" : undefined}>
          {!isMobile && (
            <ellipse cx="0" cy="0" rx="180" ry="120" fill="none" stroke="#84cc16" strokeWidth="0.5" strokeDasharray="10 40" opacity="0.05">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="45s" repeatCount="indefinite" />
            </ellipse>
          )}

          <rect x="-150" y="-70" width="300" height="140" rx="24" fill="url(#miniserverGrad)" opacity="0.15" />

          <image
            href="https://messtzramsuvjnrvwmfc.supabase.co/storage/v1/object/public/project-documents/assets/miniserver-gen2.webp"
            x="-120"
            y="-60"
            width="240"
            height="100"
            preserveAspectRatio="xMidYMid meet"
          />

          <foreignObject x="-150" y="45" width="300" height="40">
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-[18px] font-black text-[#69C350] dark:text-[#84cc16] tracking-[0.15em] uppercase">Miniserver Gen.2</span>
            </div>
          </foreignObject>
        </g>

        {nodes.map((node) => (
          <NodeConnector key={node.id} {...node} />
        ))}


      </svg>
    </div>
  );
};

export default LoxoneSchema;
