import React, { useState, useEffect } from 'react';
import { Zap, Activity, Crosshair, Terminal } from 'lucide-react';
import { HeroProps } from '../types';
import SmartHomeWireframe from './SmartHomeWireframe';

const HudMetadata = () => {
  const [vals, setVals] = useState({ x: 42.021, y: 19.882, freq: 50.02 });

  useEffect(() => {
    const interval = setInterval(() => {
      setVals({
        x: parseFloat((42 + Math.random()).toFixed(3)),
        y: parseFloat((19 + Math.random()).toFixed(3)),
        freq: parseFloat((50 + (Math.random() - 0.5) * 0.1).toFixed(2))
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20 select-none">
      {/* Top Left HUD */}
      <div className="absolute top-32 left-10 font-mono text-[8px] md:text-[10px] text-blue-600 space-y-1 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-600 animate-ping" /> SYSTEM_SCAN: ACTIVE</div>
        <div>VECTOR_X: {vals.x}</div>
        <div>VECTOR_Y: {vals.y}</div>
      </div>
      
      {/* Bottom Right HUD */}
      <div className="absolute bottom-20 right-10 font-mono text-[8px] md:text-[10px] text-blue-600 space-y-1 uppercase tracking-[0.2em] text-right">
        <div className="flex items-center justify-end gap-2">FREQ_MONITOR: {vals.freq} HZ <Activity className="w-3 h-3" /></div>
        <div>ENCRYPT_LAYER: AES_256_GCM</div>
        <div>NODE_STATUS: SYNCHRONIZED</div>
      </div>

      {/* Crosshair accents */}
      <div className="absolute top-1/4 left-1/3 text-blue-400/30"><Crosshair className="w-8 h-8" /></div>
      <div className="absolute bottom-1/3 right-1/4 text-blue-400/30"><Crosshair className="w-12 h-12" /></div>
    </div>
  );
};

const NeuralGrid = () => {
  const lines = [
    "M10,20 L30,40 L50,10 L70,30 L90,10", 
    "M0,50 L20,30 L40,60 L60,40 L80,70 L100,50",
    "M10,80 L40,70 L60,90 L90,60",
    "M20,10 L15,40 L35,50 L55,30 L75,60 L85,40",
    "M0,90 C20,70 40,100 60,80 S80,60 100,70"
  ];

  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-[0.6] dark:opacity-[0.15]" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="lightGlow">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.05" className="text-blue-500/20" />
        </pattern>
        <style>{`
          @keyframes data-flow {
            0% { offset-distance: 0%; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
          .data-packet {
            animation: data-flow 5s linear infinite;
            fill: #2563eb;
          }
          .neural-line {
            stroke: #3b82f6;
            stroke-width: 0.15;
            opacity: 0.2;
          }
        `}</style>
      </defs>
      
      {/* Background Engineering Grid */}
      <rect width="100" height="100" fill="url(#grid)" />
      
      <g fill="none" filter="url(#lightGlow)">
        {lines.map((d, i) => (
          <React.Fragment key={i}>
            <path d={d} className="neural-line" />
            <circle r="0.4" className="data-packet" style={{ 
              offsetPath: `path("${d}")`, 
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }} />
          </React.Fragment>
        ))}
      </g>

      {/* Static Junction Nodes */}
      <g fill="#2563eb" opacity="0.4">
        <circle cx="30" cy="40" r="0.4" />
        <circle cx="50" cy="10" r="0.4" />
        <circle cx="40" cy="60" r="0.4" />
        <circle cx="70" cy="30" r="0.4" />
        <circle cx="80" cy="70" r="0.4" />
      </g>
    </svg>
  );
};

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden bg-[#f8fafc] dark:bg-[#050505] transition-colors duration-500">
      
      {/* --- Hi-Tech Architectural Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. Base Gradients & Lighting */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-400/10 dark:bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-400/5 dark:bg-indigo-600/10 blur-[100px]" />

        {/* 2. Neural Mesh & Engineering Grid */}
        <NeuralGrid />

        {/* 3. HUD Overlay Elements */}
        <HudMetadata />

        {/* 4. Scanning Line Effect */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '100% 3px' }} />

        {/* 5. Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#f8fafc_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-500/20 border border-blue-600/20 dark:border-blue-400/30 text-blue-600 dark:text-blue-300 text-[10px] font-black tracking-[0.2em] uppercase mb-8 mx-auto lg:mx-0 animate-in slide-in-from-bottom-4 fade-in duration-700 shadow-sm backdrop-blur-md">
            < Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 fill-blue-600/20" />
            Core Technology v2.5
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[1.1] mb-6 text-gray-900 dark:text-white transition-colors duration-500 animate-in slide-in-from-bottom-6 fade-in duration-1000 tracking-tighter">
            Integrovaná <br className="hidden sm:block" />
            <span className="text-gradient">Inteligence</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-200 max-w-lg mb-10 leading-relaxed mx-auto lg:mx-0 font-medium transition-colors duration-500 animate-in slide-in-from-bottom-8 fade-in duration-1000">
            Projektujeme a oživujeme nervovou soustavu moderních budov. Od autonomních rezidencí po inteligentní průmyslové klastry.
          </p>
          <div className="flex flex-wrap gap-5 justify-center lg:justify-start animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <button 
              onClick={() => setView('sluzby')}
              className="btn-magnetic px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all glow shadow-xl shadow-blue-500/30 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-3">
                Inženýrské služby <Terminal className="w-4 h-4 opacity-70" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => setView('reference')}
              className="btn-magnetic px-10 py-5 glass-panel rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black/5 dark:hover:bg-white/10 transition-all text-[#1a1d21] dark:text-white border border-black/10 dark:border-white/20 backdrop-blur-3xl"
            >
              Realizace
            </button>
          </div>

          <div className="mt-14 flex items-center justify-center lg:justify-start gap-10 animate-in slide-in-from-bottom-12 fade-in duration-1000">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black font-mono text-gray-900 dark:text-white tracking-tighter">500<span className="text-blue-600">+</span></span>
              <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] font-black">Projektů</span>
            </div>
            <div className="h-12 w-[1px] bg-blue-600/20"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black font-mono text-gray-900 dark:text-white tracking-tighter">15<span className="text-blue-600">+</span></span>
              <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] font-black">Ocenění</span>
            </div>
            <div className="h-12 w-[1px] bg-blue-600/20"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black font-mono text-gray-900 dark:text-white tracking-tighter">100<span className="text-blue-600">%</span></span>
              <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] font-black">Shoda norem</span>
            </div>
          </div>
        </div>

        <div className="relative group w-full max-w-[84rem] mx-auto animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/25 rounded-3xl blur-3xl group-hover:blur-[100px] transition-all duration-1000"></div>
          <div className="relative rounded-[2.5rem] overflow-hidden glass-panel border border-white/40 dark:border-white/20 shadow-2xl
                          h-[320px] md:h-[450px] lg:h-[550px] bg-white/40 dark:bg-black/60 backdrop-blur-[50px] transform transition-transform duration-700 hover:scale-[1.02]">
            <SmartHomeWireframe />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;