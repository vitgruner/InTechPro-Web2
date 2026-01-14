
import React from 'react';
import { Target, ShieldCheck, Zap } from 'lucide-react';

const AboutUs = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden bg-transparent transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Naše Mise</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-left">Inženýři s vášní pro <span className="text-gradient">Inteligenci</span></h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed font-medium text-left">
              V InTechPro věříme, že technologie by měly sloužit lidem, ne naopak. Naším cílem je eliminovat chaos v moderních instalacích a nahradit jej jedním harmonickým systémem, který dává smysl.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <Target className="text-blue-600 w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase text-xs tracking-widest mb-1">Jeden partner, jedno řešení</h4>
                  <p className="text-gray-500 text-sm font-medium">Díky koordinaci všech profesí odpadá zbytečné ladění mezi dodavateli.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-blue-600 w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase text-xs tracking-widest mb-1">Jasná odpovědnost</h4>
                  <p className="text-gray-500 text-sm font-medium">Stojíme si za kvalitou každého zapojeného vodiče i řádku kódu.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] -z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                alt="Tým IN TECH PRO při spolupráci"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-panel p-8 rounded-[2rem] border-blue-600/20 shadow-xl hidden md:block animate-in slide-in-from-right-8 duration-700">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <Zap className="w-5 h-5 fill-white" />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Založeno</p>
                        <p className="text-xl font-black text-gray-900 dark:text-white">v roce 2024</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
