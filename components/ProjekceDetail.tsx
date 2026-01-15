
import React from 'react';
import { FileText, ClipboardList, PenTool, Layout, Layers, CheckCircle2, ArrowLeft, Info, Send } from 'lucide-react';
import ProjectionVisualizer from './ProjectionVisualizer';
import { DetailProps } from '../types';
import SectionHeader from './SectionHeader';
import ServicePager from './ServicePager';
import Breadcrumbs from './Breadcrumbs';

const ProjekceDetail: React.FC<DetailProps> = ({ setView }) => {
  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs 
          items={[
            { label: 'SLUŽBY', view: 'services' },
            { label: 'Projekce Elektro' }
          ]}
          setView={setView}
        />

        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
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

        <div className="mb-12 md:mb-20">
          <ProjectionVisualizer />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-20">
          <div className="glass-panel p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-black/5 dark:border-white/5 text-left">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-blue-600 dark:text-blue-400">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">Podklad pro realizaci</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Vždy vycházíme z požadavků klienta, typu stavby a plánovaného způsobu užívání. Projekt slouží jako jasný podklad pro realizaci, nacenění i koordinaci jednotlivých profesí. Důraz klademe na logiku zapojení a přehlednost.
            </p>
          </div>

          <div className="glass-panel p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-black/5 dark:border-white/5 text-left">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-blue-600 dark:text-blue-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">Komplexní dokumentace</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Součástí projekce může být kompletní dokumentace včetně technické zprávy, výkazu výměr, schémat zapojení, návrhu rozvaděčů a popisu funkcí chytré domácnosti.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <FileText />, label: 'Technická zpráva' },
            { icon: <ClipboardList />, label: 'Výkaz výměr' },
            { icon: <CheckCircle2 />, label: 'Schémata zapojení' },
            { icon: <Layout />, label: 'Návrh rozvaděčů' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
        
        <ServicePager currentView="projekce-elektro" setView={setView} />
      </div>
    </div>
  );
};

export default ProjekceDetail;
