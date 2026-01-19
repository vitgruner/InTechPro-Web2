
import React from 'react';
import { Zap } from 'lucide-react';
import { HeroProps } from '../types';
import SmartHomeWireframe from './SmartHomeWireframe';

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden">
      {/* Statické pozadí s jemnými gradienty */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Primární modrá záře vpravo nahoře */}
        <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 dark:bg-blue-500/15 blur-[120px]" />

        {/* Sekundární jemná modrá záře vlevo dole pro hloubku */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-400/5 dark:bg-blue-400/10 blur-[100px]" />

        {/* Finální gradientní přechod do barvy pozadí stránky */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f4f7f9] dark:to-[#050505]" />
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
              onClick={() => setView('sluzby')}
              className="btn-magnetic px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all glow text-sm md:text-base shadow-lg shadow-blue-500/30"
            >
              Naše služby
            </button>
            <button
              onClick={() => setView('reference')}
              className="btn-magnetic px-8 py-4 glass-panel rounded-full font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all text-[#1a1d21] dark:text-white text-sm md:text-base border border-black/10 dark:border-white/20"
            >
              Reference
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 md:gap-8 animate-in slide-in-from-bottom-12 fade-in duration-1000">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">500+</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Projektů</span>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">100%</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Spolehlivost</span>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">100%</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Shoda norem</span>
            </div>
          </div>
        </div>

        <div className="relative group w-full max-w-[84rem] mx-auto animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/25 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-black/10 dark:border-white/20 shadow-xl
                          h-[280px] md:h-[400px] lg:h-[512px] min-h-[50vw] md:min-h-0 bg-black/40 backdrop-blur-md">
            <React.Suspense fallback={<div className="w-full h-full bg-black/20 animate-pulse" />}>
              <SmartHomeWireframe />
            </React.Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
