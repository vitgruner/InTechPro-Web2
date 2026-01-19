
import React, { useState } from 'react';
import { Home, Zap, DraftingCompass, Cpu, Lightbulb, Thermometer, Shield, Radio, Wind, Blinds, Waves, Car, Droplets, Sprout, Settings, CheckSquare, Sun, ArrowRight } from 'lucide-react';
import { ServiceCardProps, ServicesProps } from '../types';

const ServiceCard: React.FC<ServiceCardProps & { features?: string[], onClick?: () => void }> = ({ title, description, icon, category, features, onClick }) => (
  <div
    onClick={onClick}
    className="group p-3.5 md:p-6 rounded-2xl glass-panel border border-black/5 dark:border-white/5 hover:border-blue-600/30 dark:hover:border-blue-500/30 transition-all cursor-pointer flex flex-col h-full shadow-sm md:hover:shadow-xl min-w-0 active:scale-[0.98] active:opacity-90"
  >
    <div className="flex items-center md:items-start gap-3 mb-3 md:mb-0">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0 md:group-hover:bg-blue-600 transition-colors">
        <div className="text-blue-600 dark:text-blue-400 md:group-hover:text-white md:group-hover:scale-110 transition-all [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">{icon}</div>
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

const Services: React.FC<ServicesProps> = React.memo(({ setView, isStandalone = false }) => {
  const [liveStats] = useState<Record<string, string>>({
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

  return (
    <section id="services" className={`py-8 md:py-16 relative transition-colors duration-500 ${isStandalone ? 'pt-28 md:pt-36' : ''}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Loxone Section */}
          <div
            onClick={() => setView('loxone-smart-home')}
            className="lg:col-span-2 bg-[#f8fafc] dark:bg-[#0a0c10] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-blue-600/10 dark:border-blue-500/10 relative overflow-hidden group cursor-pointer md:hover:border-blue-600/40 transition-all md:hover:shadow-[0_0_80px_rgba(37,99,235,0.1)]"
          >
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 grid xl:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="min-w-0 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6 border border-blue-600/20">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Vlajková loď integrace
                </div>
                <h3 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 leading-[1.1] tracking-tight text-gray-900 dark:text-white max-w-[15ch] md:max-w-[20ch]">
                  Návrh a realizace <span className="text-blue-600">Smart Home Loxone</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 md:mb-8 leading-relaxed text-xs md:text-lg font-medium">
                  Loxone propojí všechny technologie v domě do jednoho inteligentního systému, který je řídí jako celek. Jedna přehledná aplikace a spolupráce technologií zajistí maximální komfort.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-blue-500/20">
                    Více o Loxone
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 md:gap-4 p-3 md:p-6 bg-black/5 dark:bg-white/5 rounded-2xl md:rounded-[2rem] border border-black/5 dark:border-white/10">
                {loxoneIntegrations.map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-2 md:p-3 bg-white dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/10 text-center shadow-sm">
                    <div className="text-blue-600 dark:text-blue-400 mb-1.5 md:mb-2 flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4 md:[&>svg]:w-5 md:[&>svg]:h-5">
                      {item.icon}
                    </div>
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tight text-gray-600 dark:text-gray-400 leading-tight truncate w-full px-0.5 mb-0.5">{item.label}</span>
                    <span className="text-[7px] md:text-[8px] font-bold text-blue-600/70 dark:text-blue-400/70 uppercase tracking-widest">{liveStats[item.label] || "OK"}</span>
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
            features={["Technická zpráva", "Výkaz výměr", "Schémata"]}
          />
          <ServiceCard
            onClick={() => setView('vyroba-rozvadecu')}
            title="Výroba a revize rozvaděčů"
            description="Kvalitní rozvaděč je základ. Zajišťujeme kompletní výrobu na dílně, čímž zkracujeme dobu montáže a minimalizujeme chyby."
            icon={<Settings />}
            category="VÝROBA"
            features={["Loxone moduly", "Silnoproud", "Revize"]}
          />
          <ServiceCard
            onClick={() => setView('moderni-technologie')}
            title="Moderní technologie budov"
            description="Navrhneme vhodné řešení a konkrétní značky technologií – od tepelných čerpadel po fotovoltaiku pod kontrolou Loxone."
            icon={<Cpu />}
            category="TECHNOLOGIE"
            features={["Tepelná čerpadla", "FVE", "Klima"]}
          />
          <ServiceCard
            onClick={() => setView('navrh-osvetleni')}
            title="Designový návrh osvětlení"
            description="Kompletní služba od návrhu přes výběr svítidel až po samotnou realizaci a automatizaci scénických režimů."
            icon={<Lightbulb />}
            category="DESIGN"
            features={["DALI & LED", "Scény", "Smart Dimming"]}
          />
        </div>
      </div>
    </section>
  );
});

export default Services;
