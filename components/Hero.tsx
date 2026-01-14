
import React from 'react';
import { Zap, Globe } from 'lucide-react';
import { HeroProps } from '../types';

const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-5 dark:opacity-15 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/20 border border-blue-600/20 dark:border-blue-400/30 text-blue-600 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-6 mx-auto lg:mx-0">
            < Zap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            22. století již dnes
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white transition-colors duration-500">
            Integrovaná <br className="hidden sm:block" />
            <span className="text-gradient">Inteligence</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-200 max-w-lg mb-8 leading-relaxed mx-auto lg:mx-0 font-medium transition-colors duration-500">
            Plánujeme, projektujeme a realizujeme špičkovou inteligentní infrastrukturu. Od automatizovaných domovů po inteligentní průmyslové areály.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => setView('services')}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all glow text-sm md:text-base shadow-lg shadow-blue-500/30"
            >
              Naše služby
            </button>
            <button 
              onClick={() => setView('showcase')}
              className="px-8 py-4 glass-panel rounded-full font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all text-[#1a1d21] dark:text-white text-sm md:text-base border border-black/10 dark:border-white/20"
            >
              Reference
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 md:gap-8">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">500+</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Projektů</span>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">15+</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Ocenění</span>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">100%</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Shoda norem</span>
            </div>
          </div>
        </div>

        <div className="relative group max-w-2xl mx-auto lg:max-w-none">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/25 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-black/10 dark:border-white/20 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800" 
              alt="Inteligentní infrastruktura" 
              className="w-full aspect-[4/3] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-black/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 md:p-6 glass-panel rounded-2xl border-white/30 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                  <Globe className="text-blue-600 dark:text-blue-300 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm md:text-base">Globální konektivita</h4>
                  <p className="text-xs text-gray-200 font-medium">Vzdálená správa objektů v reálném čase.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
