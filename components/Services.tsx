
import React, { useState, useEffect } from 'react';
import { Home, Zap, DraftingCompass, Cpu, Lightbulb, Thermometer, Shield, Radio, Wind, Blinds, Waves, Car, Droplets, Sprout, Settings, CheckSquare, Sun, ArrowRight } from 'lucide-react';
import { ServiceCardProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps & { features?: string[], onClick?: () => void }> = ({ title, description, icon, category, features, onClick }) => (
  <div 
    onClick={onClick}
    className="group p-3.5 md:p-6 rounded-2xl glass-panel border border-black/5 dark:border-white/5 hover:border-blue-600/30 dark:hover:border-blue-500/30 transition-all hover:-translate-y-1 cursor-pointer flex flex-col h-full shadow-sm hover:shadow-xl min-w-0"
  >
    <div className="flex items-center md:items-start gap-3 mb-3 md:mb-0">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
        <div className="text-blue-600 dark:text-blue-400 group-hover:text-white group-hover:scale-110 transition-all [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">{icon}</div>
      </div>
      <div className="min-w-0 md:pt-1">
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 mb-0.5 block truncate">{category}</span>
        <h3 className="text-sm md:text-lg font-black text-gray-900 dark:text-white transition-colors duration-500 truncate leading-tight" title={title}>{title}</h3>
      </div>
    </div>
    
    <p className="text-gray-600 dark:text-gray-400 text-[11px] md:text-sm leading-relaxed mb-4 md:mt-4 transition-colors duration-500 line-clamp-2 md:line-clamp-3">
      {description}
    </p>
    
    {features && (
      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-black/5 dark:border-white/10">
        {features.map((f, i) => (
          <span key={i} className="text-[8px] md:text-[9px] font-bold bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md text-gray-500 dark:text-gray-400 uppercase tracking-tight truncate max-w-full" title={f}>{f}</span>
        ))}
      </div>
    )}
  </div>
);

const Services = ({ setView, isStandalone = false }: { setView: (v: any) => void, isStandalone?: boolean }) => {
  const [liveStats, setLiveStats] = useState<Record<string, string>>({
    "Osvětlení": "8 ON",
    "Vytápění": "22.4°C",
    "Chlazení": "OFF",
    "Rekuperace": "450ppm",
    "Stínění": "70%",
    "Přístup": "OK",
    "Energie": "1.2kW",
    "Audio": "Play",
    "Závlaha": "OFF",
    "Wellness": "28°C",
    "Wallbox": "85%",
    "FVE": "5.2kW"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        "Vytápění": (22 + Math.random()).toFixed(1) + "°C",
        "Energie": (1 + Math.random() * 2).toFixed(1) + "kW",
        "Rekuperace": (400 + Math.random() * 100).toFixed(0) + "ppm",
        "Wellness": (27 + Math.random() * 2).toFixed(1) + "°C",
        "FVE": (3 + Math.random() * 4).toFixed(1) + "kW"
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const loxoneIntegrations = [
    { icon: <Lightbulb className="w-5 h-5" />, label: "Osvětlení" },
    { icon: <Thermometer className="w-5 h-5" />, label: "Vytápění" },
    { icon: <Wind className="w-5 h-5" />, label: "Chlazení" },
    { icon: <Wind className="w-5 h-5" />, label: "Rekuperace" },
    { icon: <Blinds className="w-5 h-5" />, label: "Stínění" },
    { icon: <Shield className="w-5 h-5" />, label: "Přístup" },
    { icon: <Zap className="w-5 h-5" />, label: "Energie" },
    { icon: <Radio className="w-5 h-5" />, label: "Audio" },
    { icon: <Droplets className="w-5 h-5" />, label: "Závlaha" },
    { icon: <Waves className="w-5 h-5" />, label: "Wellness" },
    { icon: <Car className="w-5 h-5" />, label: "Wallbox" },
    { icon: <Sun className="w-5 h-5" />, label: "FVE" },
  ];

  return (
    <section id="services" className={`py-8 md:py-16 relative transition-colors duration-500 ${isStandalone ? 'pt-28 md:pt-36' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* UPGRADED Loxone Section */}
          <div 
            onClick={() => setView('loxone-detail')}
            className="lg:col-span-2 bg-[#f8fafc] dark:bg-[#0a0c10] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-blue-600/10 dark:border-blue-500/10 relative overflow-hidden group cursor-pointer hover:border-blue-600/40 transition-all hover:shadow-[0_0_80px_rgba(37,99,235,0.1)]"
          >
            {/* Engineering Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            
            <div className="absolute -top-24 -right-24 p-12 opacity-[0.02] dark:opacity-[0.04] -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
               <Cpu className="w-[500px] h-[500px] text-blue-600" />
            </div>

            <div className="relative z-10 grid xl:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="min-w-0 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6 border border-blue-600/20">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                  Vlajková loď integrace
                </div>
                <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
                  Návrh a realizace <br />
                  <span className="text-blue-600">Smart Home Loxone</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 leading-relaxed text-xs md:text-lg font-medium">
                  Loxone propojí všechny technologie v domě do jednoho inteligentního systému, který je řídí jako celek. Jedna přehledná aplikace, logika automatizací a spolupráce technologií zajistí maximální komfort.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
                  <div className="flex items-center md:items-start gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 group/feat transition-all hover:border-blue-600/20">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600/10 rounded-lg md:rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 group/feat:bg-blue-600 group/feat:text-white transition-all">
                      <CheckSquare className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-0.5">Adaptivní systém</h4>
                      <p className="text-[9px] md:text-[11px] text-gray-500 leading-tight">Dům se přizpůsobuje době i ročnímu období.</p>
                    </div>
                  </div>
                  <div className="flex items-center md:items-start gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 group/feat transition-all hover:border-blue-600/20">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600/10 rounded-lg md:rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 group/feat:bg-blue-600 group/feat:text-white transition-all">
                      <Settings className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-0.5">Hybridní řízení</h4>
                      <p className="text-[9px] md:text-[11px] text-gray-500 leading-tight">Manuální tlačítka i mobilní automatizace.</p>
                    </div>
                  </div>
                </div>
                <button className="group/btn relative px-8 md:px-10 py-3 md:py-4 bg-blue-600 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] overflow-hidden transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/20 w-full md:w-auto">
                  <span className="relative z-10 flex items-center justify-center md:justify-start gap-3">
                    Zjistit více o Loxone
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Kompaktnější mřížka pro mobilní zařízení */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 md:gap-4 p-3 md:p-6 bg-black/5 dark:bg-white/5 rounded-2xl md:rounded-[2rem] border border-black/5 dark:border-white/10 backdrop-blur-sm">
                {loxoneIntegrations.map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-2 md:p-3 bg-white dark:bg-white/5 rounded-xl md:rounded-xl border border-black/5 dark:border-white/10 hover:border-blue-600/30 transition-all text-center group/item shadow-sm hover:shadow-lg hover:-translate-y-1">
                    <div className="text-blue-600 dark:text-blue-400 group-hover/item:scale-125 group-hover/item:rotate-[10deg] transition-all mb-1.5 md:mb-2 flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5">
                      {item.icon}
                    </div>
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tight text-gray-600 dark:text-gray-400 leading-tight truncate w-full px-0.5 mb-0.5" title={item.label}>{item.label}</span>
                    <span className="text-[7px] md:text-[8px] font-bold text-blue-600/70 dark:text-blue-400/70 uppercase tracking-widest animate-pulse">{liveStats[item.label] || "OK"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ServiceCard 
            onClick={() => setView('projekce-elektro')}
            title="Projekce elektro a Smart Home"
            description="Zpracováváme přehledné a srozumitelné projekty, které slouží jako jasný podklad pro realizaci, nacenění i koordinaci profesí."
            icon={<DraftingCompass />}
            category="PROJEKCE"
            features={["Technická zpráva", "Výkaz výměr", "Schémata zapojení"]}
          />
          <ServiceCard 
            onClick={() => setView('rozvadece')}
            title="Projekce, návrh a realizace rozvaděčů"
            description="Kvalitní rozvaděč je základ. Zajišťujeme kompletní výrobu na dílně, čímž zkracujeme dobu montáže a minimalizujeme chyby."
            icon={<Settings />}
            category="VÝROBA"
            features={["Loxone části", "Silnoproud", "Revizní podklady"]}
          />
          <ServiceCard 
            onClick={() => setView('technologie')}
            title="Návrh a realizace technologií"
            description="Navrhneme vhodné řešení a konkrétní značky technologií – od tepelných čerpadel po fotovoltaiku. Vše pod kontrolou Loxone."
            icon={<Cpu />}
            category="TECHNOLOGIE"
            features={["Tepelná čerpadla", "Rekuperace", "Fotovoltaika"]}
          />
          <ServiceCard 
            onClick={() => setView('osvetleni')}
            title="Návrh a realizace osvětlení"
            description="Kompletní služba od návrhu přes výběr svítidel až po samotnou realizaci a automatizaci scénických režimů."
            icon={<Lightbulb />}
            category="DESIGN"
            features={["DALI & LED pásky", "Světelné scény", "Teplota světla"]}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
