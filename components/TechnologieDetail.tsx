
import React from 'react';
import { Thermometer, Wind, Sun, ArrowLeft, CheckCircle2, Zap, Snowflake, Briefcase, Settings, ShieldCheck, Activity, TrendingUp } from 'lucide-react';
import SolarSystem from './SolarSystem';
import { DetailProps } from '../types';
import SectionHeader from './SectionHeader';
import ServicePager from './ServicePager';
import Breadcrumbs from './Breadcrumbs';

// VisualizationBox copied from Dashboard.tsx for UI consistency
const colorClasses: Record<string, { bg: string; bgHover: string; text: string; border: string; borderStatus: string }> = {
  'bg-yellow-500': { bg: 'bg-yellow-500/10', bgHover: 'group-hover:bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500/20', borderStatus: 'border-yellow-500/20' },
};

const VisualizationBox: React.FC<{ icon: React.ElementType; title: string; subtitle: string; color: string; children: React.ReactNode; statusLabel?: string }> = ({ icon: Icon, title, subtitle, color, children, statusLabel = "Aktivní spojení" }) => {
  const colors = colorClasses[color] || colorClasses['bg-[#69C350]'];
  return (
    <div className="glass-panel rounded-3xl p-5 md:p-6 border border-black/10 dark:border-white/20 overflow-hidden shadow-2xl flex flex-col transition-all group w-full">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className={`w-10 h-10 md:w-12 md:h-12 ${colors.bg} rounded-xl flex items-center justify-center border ${colors.border} shadow-lg ${colors.bgHover} group-hover:text-white transition-all duration-500 flex-shrink-0`}>
            <Icon className={`w-5 h-5 md:w-6 md:h-6 ${colors.text} group-hover:text-white transition-colors`} />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 truncate leading-tight">{title}</h3>
            <p className="text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5 truncate">{subtitle}</p>
          </div>
        </div>
        <div className={`hidden sm:flex flex-shrink-0 items-center gap-2 ${colors.bg} px-3 py-1.5 rounded-full border ${colors.borderStatus}`}>
          <div className={`w-1.5 h-1.5 ${color} rounded-full animate-pulse shadow-[0_0_8px_currentColor]`} />
          <span className={`text-[9px] font-black ${colors.text} dark:text-white uppercase tracking-widest`}>{statusLabel}</span>
        </div>
      </div>
      <div className="flex-grow rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 bg-gray-100 dark:bg-black/60 shadow-inner min-h-[500px] md:min-h-[600px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const TechnologieDetail: React.FC<DetailProps> = ({ setView }) => {
  const techCards = [
    {
      title: 'Vytápění',
      desc: 'Efektivní teplovodní / elektrické vytápění s prediktivní logikou podle předpovědi.',
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      title: 'Rekuperace',
      desc: 'Automatická výměna vzduchu na základě hladiny CO2 v interiéru.',
      icon: <Wind className="w-5 h-5" />
    },
    {
      title: 'Klimatizace',
      desc: 'Chlazení reagující na přítomnost osob, intenzitu slunečního svitu a teplotu.',
      icon: <Snowflake className="w-5 h-5" />
    },
    {
      title: 'Fotovoltaika',
      desc: 'Maximální využití vlastní energie díky chytrému řízení přebytků.',
      icon: <Sun className="w-5 h-5" />
    }
  ];

  const scope = [
    'Technický návrh a projektová dokumentace',
    'Dodávka a odborná montáž technologií',
    'Uvedení do provozu a přesné nastavení',
    'Kompletní integrace do Loxone'
  ];

  return (
    <div className="pt-28 md:pt-32 pb-12 md:pb-16 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: 'SLUŽBY', view: 'sluzby' },
            { label: 'Moderní Technologie' }
          ]}
          setView={setView}
        />

        <SectionHeader
          variant="page"
          align="left"
          eyebrow="Pokročilé systémové inženýrství"
          title="Návrh a realizace"
          highlight="Technologií"
          description="Zajišťujeme kompletní dodávku moderních systémů pro domy i komerční objekty. Vše pod kontrolou inteligentního jádra Loxone."
        />

        <div className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">
            <div className="flex-1 min-w-0">
              <VisualizationBox
                icon={Sun}
                title="Stav systému FVE"
                subtitle="Energetické toky v reálném čase"
                color="bg-yellow-500"
                statusLabel="Vysoký výtěžek"
              >
                <SolarSystem />
              </VisualizationBox>
            </div>

            <div className="w-full lg:w-80 flex flex-col gap-4 md:gap-6">
              <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-[#69C350]/10 bg-[#69C350]/5 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#69C350] flex items-center justify-center text-white">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-[11px] text-[#69C350] truncate">Architektura energetiky</h3>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  Vizualizace toku energie mezi zdroji, úložištěm a spotřebiči. Algoritmus Loxone prioritně nasměruje přebytky do baterií a ohřevu vody.
                </p>
                <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Výroba FVE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Bateriové úložiště</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#69C350]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Vlastní spotřeba</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Přebytky do sítě</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">E-mobility (Wallbox)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Ohřev vody / Akumulace</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Tepelné čerpadlo</span>
                  </div>

                  <div className="pt-8 border-t border-black/5 dark:border-white/5 space-y-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-8 h-8 bg-[#69C350]/10 rounded-xl flex items-center justify-center text-[#69C350]">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest">Rozsah dodávky</h3>
                    </div>
                    {scope.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#69C350]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-12 items-center">
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-red-500/10 bg-red-500/5">
              <h3 className="font-black uppercase tracking-widest text-[11px] text-red-600 mb-3">Problém: Energetické ztráty</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed font-medium">
                Bez řízení odtékají přebytky z FVE do sítě za nevýhodné ceny, zatímco večer draze nakupujete. Technologie fungují nekontrolovaně.
              </p>
            </div>
            <div className="glass-panel p-6 md:p-8 rounded-[2rem] border-green-500/10 bg-green-500/5">
              <h3 className="font-black uppercase tracking-widest text-[11px] text-green-600 mb-3">Řešení: Inteligentní management</h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed font-medium">
                Loxone hlídá energetickou bilanci a v reálném čase spíná spotřebiče, nabíjí auto nebo ukládá energii do ohřevu vody a baterií. FVE navíc připojujeme na spotový trh pro maximální efektivitu.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Standard pro <span className="text-[#69C350]">Energetickou nezávislost</span></h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed text-sm">
              Navrhujeme systémy, které neřeší jen výrobu, ale především spotřebu. Správně navržená kombinace FVE, tepelného čerpadla a inteligentního řízení dokáže snížit náklady na energie na minimum.
            </p>
            <div className="flex gap-6 pt-2">
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-[#69C350]">Až 80%</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">Vlastní spotřeby</span>
              </div>
              <div className="w-[1px] h-10 bg-gray-200 dark:bg-white/10" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-[#69C350]">&lt; 7 let</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">Návratnost investice</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {techCards.map((card, i) => (
            <div key={i} className="glass-panel p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-200 dark:border-white/5 text-left bg-white/40 dark:bg-white/[0.02] hover:border-[#7BD462]/30 transition-all group shadow-sm flex flex-col">
              <div className="flex items-center gap-4 md:block">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#69C350]/10 rounded-xl flex items-center justify-center md:mb-6 text-[#69C350] group-hover:bg-[#69C350] group-hover:text-white transition-all flex-shrink-0">
                  <div className="[&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                    {card.icon}
                  </div>
                </div>
                <h4 className="text-sm md:text-lg font-black uppercase tracking-tight leading-tight">{card.title}</h4>
              </div>
              <p className="mt-4 md:mt-0 text-[11px] md:text-xs text-gray-500 font-medium leading-relaxed line-clamp-3">{card.desc}</p>
            </div>
          ))}
        </div>

        <ServicePager currentView="moderni-technologie" setView={setView} />
      </div>
    </div>
  );
};

export default TechnologieDetail;
