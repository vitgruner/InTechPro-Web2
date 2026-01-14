
import React from 'react';
import { 
  Palette, Sun, Moon, Eye, Settings, ArrowLeft, CheckCircle2, 
  Zap, Layout, Lightbulb, Thermometer, Activity, Info, Sparkles, 
  Scaling, Layers 
} from 'lucide-react';
import LightControl from './LightControl';
import { DetailProps } from '../types';

const OsvetleniDetail: React.FC<DetailProps> = ({ setView }) => {
  const warnings = [
    {
      title: 'Dostatek světla v každé místnosti',
      desc: 'Každý prostor má jiné nároky – jinak se svítí kuchyň, jinak koupelna nebo obývák. Podcenění intenzity světla je častá chyba.',
      icon: <Sun className="w-5 h-5" />
    },
    {
      title: 'Kombinace více typů osvětlení',
      desc: 'Základní, pracovní, náladové i orientační světlo by měly fungovat společně. Jedno centrální světlo u stropu většinou nestačí.',
      icon: <Layers className="w-5 h-5" />
    },
    {
      title: 'Teplota a barva světla',
      desc: 'Studené světlo se hodí na práci, teplé na relax. Správná volba má velký vliv na vaši celkovou pohodu i zdraví.',
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      title: 'Ovládání a scénáře',
      desc: 'Světlo by se mělo přizpůsobit vám. Díky chytré domácnosti lze měnit scény podle denní doby, přítomnosti nebo nálady.',
      icon: <Activity className="w-5 h-5" />
    },
    {
      title: 'Budoucí flexibilita',
      desc: 'Myslíme na to, že se vaše potřeby mohou časem změnit. Dobře navržené osvětlení se dá snadno upravit nebo rozšířit.',
      icon: <Scaling className="w-5 h-5" />
    }
  ];

  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => setView('services')}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-[10px] mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na služby
        </button>

        <div className="mb-20 text-left">
          <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Design & Engineering</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
            Návrh a realizace <br /><span className="text-gradient">Osvětlení</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-4xl">
            Ne každý má k dispozici architekta nebo designéra, který by se postaral o promyšlený návrh osvětlení. Právě proto nabízíme kompletní službu – od návrhu přes výběr svítidel až po samotnou realizaci.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-24 items-stretch">
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-center">
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-left shadow-xl">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-8">
                Pomůžeme vám zorientovat se v možnostech, doporučíme vhodná svítidla a navrhneme osvětlení tak, aby každý prostor fungoval přesně tak, jak má. Hlídáme intenzitu pro práci i běžné činnosti, ale myslíme i na atmosféru a relaxaci.
              </p>
              
              <div className="p-6 bg-blue-600/5 rounded-2xl border border-blue-600/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-5 h-5 fill-white" />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-sm text-blue-600">Loxone integrace</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed font-bold uppercase tracking-tight">
                  Díky propojení s chytrou domácností osvětlení automatizujeme a scénicky řídíme. Světlo se stane přirozenou součástí domova, ne jen vypínačem na zdi.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="w-full glass-panel rounded-[2.5rem] border border-slate-200 dark:border-white/10 relative overflow-hidden group select-none transition-all duration-500 shadow-xl bg-white/50 dark:bg-black/20 h-full flex flex-col">
              <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05] pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              <div className="absolute top-0 left-0 right-0 p-4 px-6 flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-md z-30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-slate-500 dark:text-gray-400 uppercase tracking-[0.2em]">CHROMA.ENGINE.ACTIVE</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                   <span>CCT Adaptive</span>
                   <span>DALI / KNX Support</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center pt-14 bg-slate-50/30 dark:bg-black/40 min-h-[450px]">
                <LightControl />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-left mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/20 dark:border-blue-400/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Odborné poradenství
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-left">Na co si dát v návrhu <br />osvětlení <span className="text-blue-600">pozor?</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warnings.map((warning, i) => (
              <div key={i} className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02] hover:border-blue-500/30 transition-all group shadow-sm">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {warning.icon}
                </div>
                <h4 className="text-lg font-black mb-3 uppercase tracking-tight leading-tight">{warning.title}</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{warning.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-[3rem] p-12 text-white border border-white/5 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <Lightbulb className="w-64 h-64" />
          </div>
          <div className="relative z-10 text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight leading-tight">Máte vizi? My máme světlo.</h2>
            <p className="text-blue-50 text-lg font-medium leading-relaxed max-w-2xl mb-10">
              Dobře navržené osvětlení změní vnímání vašeho prostoru. Začněte s námi plánovat hned teď.
            </p>
            <button 
                onClick={() => setView('contact')}
                className="bg-white text-blue-600 px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-2xl flex items-center justify-center gap-3 w-full sm:w-auto"
            >
                Poptat návrh osvětlení
                <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OsvetleniDetail;
