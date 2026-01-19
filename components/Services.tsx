
import React, { useState } from 'react';
import { Home, Zap, DraftingCompass, Cpu, Lightbulb, Thermometer, Shield, Radio, Wind, Blinds, Waves, Car, Droplets, Settings, Sun, ArrowRight } from 'lucide-react';
import { ServiceCardProps, ServicesProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps & { features?: string[], onClick?: () => void }> = ({ title, description, icon, category, features, onClick }) => (
  <div 
    onClick={onClick}
    className="group p-4 md:p-6 rounded-2xl glass-panel border border-black/5 dark:border-white/5 md:hover:border-blue-600/30 transition-all cursor-pointer flex flex-col h-full shadow-sm min-w-0"
  >
    <div className="flex items-center md:items-start gap-3 mb-3 md:mb-0">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0 md:group-hover:bg-blue-600 transition-colors">
        <div className="text-blue-600 dark:text-blue-400 md:group-hover:text-white transition-all [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">{icon}</div>
      </div>
      <div className="min-w-0 md:pt-1">
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 mb-0.5 block truncate">{category}</span>
        <h3 className="text-sm md:text-lg font-black text-gray-900 dark:text-white transition-colors duration-500 truncate leading-tight">{title}</h3>
      </div>
    </div>
    
    <p className="text-gray-600 dark:text-gray-400 text-[11px] md:text-sm leading-relaxed mb-4 md:mt-4 line-clamp-2 md:line-clamp-3">
      {description}
    </p>
    
    {features && (
      <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-black/5 dark:border-white/10">
        {features.map((f, i) => (
          <span key={i} className="text-[8px] md:text-[9px] font-bold bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md text-gray-500 dark:text-gray-400 uppercase tracking-tight">{f}</span>
        ))}
      </div>
    )}
  </div>
);

const Services: React.FC<ServicesProps> = ({ setView, isStandalone = false }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const loxoneIntegrations = [
    { icon: <Lightbulb className="w-5 h-5" />, label: "Světla" },
    { icon: <Thermometer className="w-5 h-5" />, label: "Topení" },
    { icon: <Wind className="w-5 h-5" />, label: "Klima" },
    { icon: <Blinds className="w-5 h-5" />, label: "Stínění" },
    { icon: <Shield className="w-5 h-5" />, label: "Alarm" },
    { icon: <Zap className="w-5 h-5" />, label: "Energie" },
    { icon: <Radio className="w-5 h-5" />, label: "Audio" },
    { icon: <Car className="w-5 h-5" />, label: "Auto" },
    { icon: <Sun className="w-5 h-5" />, label: "FVE" },
  ];

  // Na mobilu zobrazíme jen 6 klíčových ikon místo 12, abychom ušetřili DOM uzly
  const visibleIntegrations = isMobile ? loxoneIntegrations.slice(0, 6) : loxoneIntegrations;

  return (
    <section id="services" className={`py-6 md:py-16 relative transition-colors duration-500 ${isStandalone ? 'pt-28 md:pt-36' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Loxone Section */}
          <div 
            onClick={() => setView('loxone-smart-home')}
            className="lg:col-span-2 bg-[#f8fafc] dark:bg-[#0a0c10] p-6 md:p-12 rounded-[2rem] border border-blue-600/10 dark:border-blue-500/10 relative overflow-hidden group cursor-pointer md:hover:border-blue-600/40 transition-all"
          >
            <div className="relative z-10 grid xl:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="min-w-0 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 border border-blue-600/20">
                  Vlajková loď integrace
                </div>
                <h3 className="text-2xl md:text-5xl font-black mb-4 leading-tight tracking-tight text-gray-900 dark:text-white">
                  Smart Home <span className="text-blue-600">Loxone</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-xs md:text-lg font-medium">
                  Loxone propojí všechny technologie v domě do jednoho systému. Jedna aplikace a harmonická spolupráce technologií.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] shadow-lg shadow-blue-500/20 w-full md:w-auto">
                   Více o Loxone
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 md:gap-4 p-3 md:p-6 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10">
                {visibleIntegrations.map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-2 md:p-3 bg-white dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 text-center">
                    <div className="text-blue-600 dark:text-blue-400 mb-1.5 flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5">
                      {item.icon}
                    </div>
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tight text-gray-600 dark:text-gray-400 leading-tight truncate w-full px-0.5">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ServiceCard 
            onClick={() => setView('projekce-elektro')}
            title="Projekce elektro"
            description="Zpracováváme přehledné a srozumitelné projekty, které slouží jako jasný podklad pro realizaci."
            icon={<DraftingCompass />}
            category="PROJEKCE"
            features={["Výkaz výměr", "Schémata"]}
          />
          <ServiceCard 
            onClick={() => setView('vyroba-rozvadecu')}
            title="Výroba a revize rozvaděčů"
            description="Zajišťujeme kompletní výrobu na dílně, čímž zkracujeme dobu montáže na stavbě."
            icon={<Settings />}
            category="VÝROBA"
            features={["Loxone", "Revize"]}
          />
          <ServiceCard 
            onClick={() => setView('moderni-technologie')}
            title="Moderní technologie"
            description="Navrhneme tepelná čerpadla i fotovoltaiku pod kontrolou Loxone."
            icon={<Cpu />}
            category="TECHNOLOGIE"
            features={["FVE", "Klima"]}
          />
          <ServiceCard 
            onClick={() => setView('navrh-osvetleni')}
            title="Návrh osvětlení"
            description="Kompletní služba od návrhu přes výběr svítidel až po automatizaci scénických režimů."
            icon={<Lightbulb />}
            category="DESIGN"
            features={["DALI", "Smart Scény"]}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
