
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Shield, Zap } from 'lucide-react';

interface LogLine {
  id: number;
  text: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  timestamp: string;
}

const SYSTEM_LOGS = [
  { text: "IN.TECH.PRO KERNEL v2.5.0 INITIALIZING...", type: 'system' },
  { text: "MOUNTING VOLUME: /mnt/loxone_config", type: 'info' },
  { text: "LOADING MODULES: [LIGHTING, HVAC, SECURITY, AUDIO]", type: 'info' },
  { text: ">> VERIFYING DALI EXTENSION BUS...", type: 'warning' },
  { text: ">> DALI BUS: ONLINE (64 DEVICES FOUND)", type: 'success' },
  { text: ">> VERIFYING TREE EXTENSION...", type: 'warning' },
  { text: ">> TREE BUS: ONLINE (STABLE)", type: 'success' },
  { text: "CALIBRATING PID CONTROLLERS FOR HVAC ZONES...", type: 'info' },
  { text: "OPTIMIZING ENERGY FLOW ALGORITHMS...", type: 'info' },
  { text: "PV INVERTER DETECTED: SYNCING PRODUCTION DATA", type: 'success' },
  { text: "ESTABLISHING SECURE TUNNEL TO MINISERVER...", type: 'warning' },
  { text: "CONNECTION ESTABLISHED: LATENCY 12ms", type: 'success' },
  { text: "SMART SOCKETS: MONITORING ACTIVE", type: 'info' },
  { text: "WEATHER STATION: DATA STREAMING (WIND, RAIN, LUX)", type: 'info' },
  { text: "SYSTEM READY. WELCOME TO INTECHPRO SMART FUTURE...", type: 'system' }
];

const SmartHomeWireframe = () => {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const isMobile = window.innerWidth < 768;
    
    if (currentIndex < SYSTEM_LOGS.length) {
      const delay = isMobile ? 2000 : (Math.random() * 600 + 200);
      
      const timeout = setTimeout(() => {
        setLines(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            text: SYSTEM_LOGS[currentIndex].text, 
            type: SYSTEM_LOGS[currentIndex].type as any,
            timestamp: getTimestamp()
          }
        ].slice(-20)); // Omezení počtu řádků v DOMu
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setLines([]);
        setCurrentIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex, isVisible]);

  useEffect(() => {
    if (scrollRef.current && isVisible) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isVisible]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'system': return 'text-blue-400 font-bold';
      default: return 'text-gray-300';
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-[#0a0c10] flex flex-col rounded-3xl border border-white/10 group font-mono text-[10px] md:text-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-3 flex items-center gap-2 text-gray-400">
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-bold tracking-widest text-[9px] uppercase">intech_core.exe</span>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-hide space-y-1 md:space-y-2 font-mono relative"
      >
        {lines.map((line) => (
          <div key={line.id} className="flex gap-3">
            <span className="text-gray-600 shrink-0 select-none">[{line.timestamp.split('.')[0]}]</span>
            <span className={`${getLineColor(line.type)} break-all`}>
              {line.text}
            </span>
          </div>
        ))}
        <div className="text-blue-500 font-bold animate-pulse">_</div>
      </div>

      <div className="px-4 py-2 bg-[#161b22] border-t border-white/5 flex justify-between items-center text-[9px] text-gray-500 font-mono">
         <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
               <Shield className="w-3 h-3" />
               SECURE
            </div>
            <div className="flex items-center gap-1.5">
               <Cpu className="w-3 h-3" />
               LOXONE
            </div>
         </div>
         <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-yellow-500" />
            PWR: STABLE
         </div>
      </div>
    </div>
  );
};

export default SmartHomeWireframe;
