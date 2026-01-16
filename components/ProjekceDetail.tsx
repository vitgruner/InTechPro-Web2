
import React from 'react';
import { FileText, ClipboardList, PenTool, Layout, Layers, CheckCircle2, ArrowLeft, Info, Send } from 'lucide-react';
import ProjectionVisualizer from './ProjectionVisualizer';
import { DetailProps } from '../types';
import SectionHeader from './SectionHeader';
import ServicePager from './ServicePager';
import Breadcrumbs from './Breadcrumbs';

const ProjekceDetail: React.FC<DetailProps> = ({ setView }) => {
  return (
    <div className="pt-32 md:pt-40 pb-12 md:pb-16 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs 
          items={[
            { label: 'SLUŽBY', view: 'services' },
            { label: 'Projekce Elektro' }
          ]}
          setView={setView}
        />

        <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="max-w-3xl text-left w-full">
            <SectionHeader 
              variant="page"
              align="left"
              eyebrow="Specializovaná činnost"
              title="Projekce elektro a"
              highlight="Smart Home"
              description="Zpracováváme přehledné a srozumitelné projekty elektroinstalace a chytré domácnosti Loxone. Od prvotního nákresu po detailní realizační dokumentaci."
              className="mb-0"
            />
          </div>
          <div className="hidden lg:flex items-center gap-3 bg-blue-600/5 px-6 py-4 rounded-3xl border border-blue-600/20 mb-1 lg:mb-3">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Přesnost projektu = 100% spolehlivost</span>
          </div>
        </div>

        <div className="mb-10">
          <ProjectionVisualizer />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-10">
          <div className="glass-panel p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02]">
            <div className="flex items-center gap-4 md:block">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-600/10 rounded-xl md:rounded-2xl flex items-center justify-center md:mb-6 text-blue-600 shrink-0">
                <PenTool className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <h3 className="text-sm md:text-2xl font-black uppercase tracking-tight">Podklad pro realizaci</h3>
            </div>
            <p className="mt-4 md:mt-0 text-[11px] md:text-base text-gray-500 font-medium leading-relaxed">
              Vždy vycházíme z požadavků klienta, typu stavby a plánovaného způsobu užívání. Projekt slouží jako jasný podklad pro realizaci, nacenění i koordinaci jednotlivých profesí.
            </p>
          </div>

          <div className="glass-panel p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02]">
            <div className="flex items-center gap-4 md:block">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-600/10 rounded-xl md:rounded-2xl flex items-center justify-center md:mb-6 text-blue-600 shrink-0">
                <Layers className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <h3 className="text-sm md:text-2xl font-black uppercase tracking-tight">Komplexní dokumentace</h3>
            </div>
            <p className="mt-4 md:mt-0 text-[11px] md:text-base text-gray-500 font-medium leading-relaxed">
              Součástí projekce může být kompletní dokumentace včetně technické zprávy, výkazu výměr, schémat zapojení, návrhu rozvaděčů a popisu funkcí chytré domácnosti.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <FileText />, label: 'Technická zpráva' },
            { icon: <ClipboardList />, label: 'Výkaz výměr' },
            { icon: <CheckCircle2 />, label: 'Schémata zapojení' },
            { icon: <Layout />, label: 'Návrh rozvaděčů' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 text-center">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-gray-100 dark:bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                <div className="[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                  {item.icon}
                </div>
              </div>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
        
        <ServicePager currentView="projekce-elektro" setView={setView} />
      </div>
    </div>
  );
};

export default ProjekceDetail;
