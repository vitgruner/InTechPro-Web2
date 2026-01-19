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
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const MAX_LINES = isMobile ? 25 : 40; // Reduced for mobile memory
  const INSTANT_LINES = isMobile ? 3 : 0; // Load first N lines instantly on mobile

  const [lines, setLines] = useState<LogLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
  };

  const [cursorTs, setCursorTs] = useState(getTimestamp());

  // Delayed timestamp interval - only start after initial content loads
  useEffect(() => {
    if (!isReady) return;
    const interval = isMobile ? 500 : 250; // Slower on mobile to reduce repaints
    const id = setInterval(() => setCursorTs(getTimestamp()), interval);
    return () => clearInterval(id);
  }, [isReady, isMobile]);

  // Load first lines instantly on mobile for immediate visual feedback
  useEffect(() => {
    if (INSTANT_LINES > 0 && lines.length === 0) {
      const initialLines: LogLine[] = SYSTEM_LOGS.slice(0, INSTANT_LINES).map((log, i) => ({
        id: Date.now() + i,
        text: log.text,
        type: log.type as any,
        timestamp: getTimestamp()
      }));
      setLines(initialLines);
      setCurrentIndex(INSTANT_LINES);
      setIsReady(true);
    } else if (INSTANT_LINES === 0) {
      setIsReady(true);
    }
  }, []);

  // track whether user is near bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
      shouldAutoScrollRef.current = nearBottom;
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (currentIndex < SYSTEM_LOGS.length) {
      // Faster delays on mobile for quicker total load time
      const delay = isMobile ? 400 : (Math.random() * 600 + 200);

      const timeout = setTimeout(() => {
        const newLine: LogLine = {
          id: Date.now(),
          text: SYSTEM_LOGS[currentIndex].text,
          type: SYSTEM_LOGS[currentIndex].type as any,
          timestamp: getTimestamp()
        };

        setLines(prev => {
          const next = [...prev, newLine];
          return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
        });

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
  }, [currentIndex, isReady, isMobile, MAX_LINES]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !shouldAutoScrollRef.current) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [lines]);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-500';
      case 'system': return 'text-blue-400 font-bold';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0a0c10] flex flex-col rounded-3xl border border-white/10 shadow-2xl group font-mono text-xs md:text-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="ml-3 flex items-center gap-2 text-gray-400">
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-bold tracking-widest text-[10px] uppercase">intech_core.exe</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500">
          <span className="hidden md:inline">RAM: 14%</span>
          <span className="hidden md:inline">CPU: 4%</span>
          <div className="flex items-center gap-1.5 text-green-500">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            ONLINE
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-4 md:p-6 overflow-y-auto scrollbar-hide space-y-2 font-mono relative"
      >
        {/* CRT overlay: vypnout na mobilu */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

        {lines.map((line) => (
          <div key={line.id} className="flex gap-3 md:animate-in md:fade-in md:slide-in-from-left-2 md:duration-300">
            <span className="text-gray-600 shrink-0 select-none">[{line.timestamp}]</span>
            <span className={`${getLineColor(line.type)} break-all`}>
              {line.type === 'success' && '✔ '}
              {line.type === 'warning' && '⚠ '}
              {line.text}
            </span>
          </div>
        ))}

        <div className="flex gap-3">
          <span className="text-gray-600 opacity-0 select-none">[{cursorTs}]</span>
          <span className="text-blue-500 font-bold animate-pulse">_</span>
        </div>
      </div>

      <div className="px-4 py-2 bg-[#161b22] border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono">
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
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-yellow-500" />
            PWR: STABLE
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none" />
    </div>
  );
};

export default React.memo(SmartHomeWireframe);
