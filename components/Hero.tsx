
import React from 'react';
import { Zap } from 'lucide-react';
import { HeroProps } from '../types';
import SmartHomeWireframe from './SmartHomeWireframe';

const PCBBackground = () => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-[0.25] dark:opacity-[0.15]" 
    viewBox="0 0 1000 1000" 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="signal-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      
      {/* Definice tras pro animaci pulsů */}
      <path id="path1" d="M 0 200 L 200 200 L 250 250 L 500 250 L 550 300 L 550 500" fill="none" />
      <path id="path2" d="M 1000 800 L 800 800 L 750 750 L 500 750 L 450 700 L 450 500" fill="none" />
      <path id="path3" d="M 100 1000 L 100 800 L 150 750 L 300 750" fill="none" />
      <path id="path4" d="M 900 0 L 900 200 L 850 250 L 700 250" fill="none" />
    </defs>

    {/* Statické trasy (Měděné cesty) */}
    <g stroke="currentColor" strokeWidth="1" fill="none" className="text-blue-500/20 dark:text-blue-400/10">
      <path d="M 0 200 L 200 200 L 250 250 L 500 250 L 550 300 L 550 500" />
      <path d="M 1000 800 L 800 800 L 750 750 L 500 750 L 450 700 L 450 500" />
      <path d="M 100 1000 L 100 800 L 150 750 L 300 750" />
      <path d="M 900 0 L 900 200 L 850 250 L 700 250" />
      <path d="M 300 400 L 350 450 L 650 450 L 700 500" strokeDasharray="4 4" />
      <path d="M 200 100 L 250 150 L 400 150" />
      <path d="M 800 900 L 750 850 L 600 850" />
    </g>

    {/* Pájecí plošky (Pads) a Vias */}
    <g fill="currentColor" className="text-blue-600/30 dark:text-blue-400/20">
      {/* Uzly a zakončení */}
      <rect x="195" y="195" width="10" height="10" rx="2" />
      <circle cx="250" cy="250" r="4" />
      <circle cx="500" cy="250" r="4" />
      <rect x="795" y="795" width="10" height="10" rx="2" />
      <circle cx="750" cy="750" r="4" />
      <circle cx="500" cy="750" r="4" />
      
      {/* Dekorační "komponenty" */}
      <rect x="525" y="475" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="530" y="515" className="text-[10px] font-black fill-current opacity-40">CPU-X</text>
      
      <rect x="425" y="475" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="430" y="515" className="text-[10px] font-black fill-current opacity-40">SYNC</text>
    </g>

    {/* Animované signály (Datové pulsy) */}
    <g filter="url(#signal-glow)">
      {/* Puls 1 */}
      <circle r="3" fill="#2563eb" className="text-blue-600">
        <animateMotion dur="6s" repeatCount="indefinite">
          <mpath href="#path1" />
        </animateMotion>
      </circle>
      
      {/* Puls 2 (Zpětná vazba) */}
      <circle r="3" fill="#3b82f6" className="text-blue-500">
        <animateMotion dur="8s" repeatCount="indefinite" begin="2s">
          <mpath href="#path2" />
        </animateMotion>
      </circle>

      {/* Puls 3 */}
      <circle r="2" fill="#60a5fa" className="text-blue-400">
        <animateMotion dur="5s" repeatCount="indefinite" begin="1s">
          <mpath href="#path3" />
        </animateMotion>
      </circle>

      {/* Puls 4 */}
      <circle r="2" fill="#2563eb" className="text-blue-600">
        <animateMotion dur="7s" repeatCount="indefinite" begin="4s">
          <mpath href="#path4" />
        </animateMotion>
      </circle>
    </g>
  </svg>
);

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden bg-[#f8fafc] dark:bg-[#050505] transition-colors duration-500">
      
      {/* --- High-End Technical Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* 1. Base Mesh Gradient */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 dark:bg-blue-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/5 dark:bg-blue-600/5 blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />

        {/* 2. PCB Inspired Background */}
        <PCBBackground />

        {/* 3. Radial Fade (Focusing center) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f4f7f9] dark:to-[#050505]" />
        
        {/* 4. Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/20 border border-blue-600/20 dark:border-blue-400/30 text-blue-600 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-6 mx-auto lg:mx-0 animate-in slide-in-from-bottom-4 fade-in duration-700">
            < Zap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            22. století již dnes
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white transition-colors duration-500 animate-in slide-in-from-bottom-6 fade-in duration-1000">
            Integrovaná <br className="hidden sm:block" />
            <span className="text-gradient">Inteligence</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-200 max-w-lg mb-8 leading-relaxed mx-auto lg:mx-0 font-medium transition-colors duration-500 animate-in slide-in-from-bottom-8 fade-in duration-1000">
            Plánujeme, projektujeme a realizujeme špičkovou inteligentní infrastrukturu. Od automatizovaných domovů po inteligentní průmyslové areály.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <button 
              onClick={() => setView('services')}
              className="btn-magnetic px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all glow text-sm md:text-base shadow-lg shadow-blue-500/30 relative overflow-hidden group"
            >
              <span className="relative z-10">Naše služby</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => setView('showcase')}
              className="btn-magnetic px-8 py-4 glass-panel rounded-full font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all text-[#1a1d21] dark:text-white text-sm md:text-base border border-black/10 dark:border-white/20"
            >
              Reference
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 md:gap-8 animate-in slide-in-from-bottom-12 fade-in duration-1000">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black font-mono text-gray-900 dark:text-white">500+</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Projektů</span>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black font-mono text-gray-900 dark:text-white">15+</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Ocenění</span>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black font-mono text-gray-900 dark:text-white">100%</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Shoda norem</span>
            </div>
          </div>
        </div>

        <div className="relative group w-full max-w-[84rem] mx-auto animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/25 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-black/10 dark:border-white/20 shadow-xl
                          h-[300px] md:h-[416px] lg:h-[512px] bg-black/40 backdrop-blur-md transform transition-transform duration-500 hover:scale-[1.01]">
            <SmartHomeWireframe />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
