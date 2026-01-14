import React, { useState, useEffect } from 'react';
import { 
  Zap, Thermometer, Wind, Blinds, Shield, Radio, Droplets, Waves, Car, 
  Search, PenTool, Settings, CheckSquare, FileText, ClipboardCheck, 
  Rocket, Sliders, ArrowLeft, Activity, Info
} from 'lucide-react';
import LoxoneSchema from './LoxoneSchema';
import { DetailProps } from '../types';

const LoxoneDetail: React.FC<DetailProps> = ({ setView }) => {
  const [liveMetrics, setLiveMetrics] = useState({
    lighting: { active: 12, total: 42, pwr: 0.24 },
    heating: { temp: 22.4, valve: 45 },
    cooling: { temp: 21.8, fan: 'Auto' },
    recovery: { co2: 450, eff: 82 },
    shading: { pos: 100, mode: 'Slunce' },
    access: { status: 'Zajištěno', log: 'Před 12m' },
    energy: { production: 4.3, consumption: 1.1 },
    audio: { vol: 20, zone: 'Obývák' },
    irrigation: { moisture: 62, status: 'Vypnuto' },
    wellness: { pool: 28.5, air: 32.2 },
    emobility: { charge: 88, pwr: 11 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        lighting: { ...prev.lighting, pwr: parseFloat((0.2 + Math.random() * 0.1).toFixed(2)) },
        heating: { ...prev.heating, temp: parseFloat((prev.heating.temp + (Math.random() - 0.5) * 0.1).toFixed(1)) },
        energy: { 
          production: parseFloat((prev.energy.production + (Math.random() - 0.5) * 0.2).toFixed(1)),
          consumption: parseFloat((prev.energy.consumption + (Math.random() - 0.5) * 0.1).toFixed(1))
        },
        recovery: { ...prev.recovery, co2: Math.floor(450 + (Math.random() - 0.5) * 20) },
        wellness: { ...prev.wellness, pool: parseFloat((prev.wellness.pool + (Math.random() - 0.5) * 0.05).toFixed(1)) }
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const integrations = [
    { icon: <Zap />, label: "Osvětlení", desc: "Klasické, DALI, LED pásky, Loxone světla", metric: `${liveMetrics.lighting.active}/${liveMetrics.lighting.total} ON • ${liveMetrics.lighting.pwr}kW` },
    { icon: <Thermometer />, label: "Vytápění", desc: "Teplovodní i elektrické", metric: `${liveMetrics.heating.temp}°C • Ventily ${liveMetrics.heating.valve}%` },
    { icon: <Wind />, label: "Chlazení", desc: "Klimatizace a fancoily", metric: `${liveMetrics.cooling.temp}°C • Režim ${liveMetrics.cooling.fan}` },
    { icon: <Wind />, label: "Rekuperace", desc: "Čerstvý vzduch pod kontrolou", metric: `${liveMetrics.recovery.co2}ppm • Účinnost ${liveMetrics.recovery.eff}%` },
    { icon: <Blinds />, label: "Stínění", desc: "Žaluzie, rolety, závěsy", metric: `Pozice ${liveMetrics.shading.pos}% • ${liveMetrics.shading.mode}` },
    { icon: <Shield />, label: "Přístup", desc: "Zámky, videovrátný, brány", metric: `${liveMetrics.access.status} • ${liveMetrics.access.log}` },
    { icon: <Zap />, label: "Energie", desc: "Management a fotovoltaika", metric: `FVE ${liveMetrics.energy.production}kW • Dům ${liveMetrics.energy.consumption}kW` },
    { icon: <Radio />, label: "Audio", desc: "Hudba, hlášení, upozornění", metric: `Vol ${liveMetrics.audio.vol}% • ${liveMetrics.audio.zone}` },
    { icon: <Droplets />, label: "Závlaha", desc: "Chytrá správa zahrady", metric: `Vlhkost ${liveMetrics.irrigation.moisture}% • ${liveMetrics.irrigation.status}` },
    { icon: <Waves />, label: "Wellness", desc: "Bazén a sauna", metric: `Bazén ${liveMetrics.wellness.pool}°C • Vzduch ${liveMetrics.wellness.air}°C` },
    { icon: <Car />, label: "E-Mobility", desc: "Wallbox pro elektromobil", metric: `SoC ${liveMetrics.emobility.charge}% • Nabíjení ${liveMetrics.emobility.pwr}kW` }
  ];

  const processSteps = [
    { icon: <Search />, title: "1. Úvodní konzultace", desc: "Osobně nebo online projdeme vaše představy, možnosti systému Loxone a půdorysy stavby. Společně definujeme rozsah řešení." },
    { icon: <PenTool />, title: "2. Návrh systému a cena", desc: "Na základě konzultace navrhneme systém Loxone přesně podle vašich potřeb a připravíme orientační cenový odhad." },
    { icon: <Settings />, title: "3. Doladění rozsahu", desc: "Návrh upravíme podle vašich priorit a finančních možností. Systém lze připravit i na budoucí rozšíření kabelovou přípravou." },
    { icon: <CheckSquare />, title: "4. Finální nabídka", desc: "Po odsouhlasení rozsahu vytvoříme přesnou cenovou nabídku. Žádná dodatečná navýšení vás nečekají." },
    { icon: <FileText />, title: "5. Příprava podkladů", desc: "Zpracujeme detailní Loxone studii – rozmístění prvků, typy kabeláže, značení a doporučené trasy." },
    { icon: <ClipboardCheck />, title: "6. Kontrola na stavbě", desc: "Společná kontrola s elektrikáři před zahájením kabeláže i po natažení kabelů před zaklopením." },
    { icon: <Zap />, title: "7. Rozvaděče", desc: "Projekce a kompletní výroba rozvaděčů na dílně. Dodání hotového a revidovaného kusu na stavbu." },
    { icon: <Rocket />, title: "8. Realizace a spuštění", desc: "Osazení koncových prvků, připojení rozvaděče a oživení systému v čistém a bezprašném prostředí." },
    { icon: <Sliders />, title: "9. Finální nastavení", desc: "Individuální doladění systému podle vašich skutečných návyků a přání po zabydlení." }
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

        <div className="mb-20">
          <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The Core Integration</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
            Návrh a realizace <br /><span className="text-gradient">Smart Home Loxone</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-3xl mb-12">
            Moderní domy jsou plné technologií, které se starají o komfort, klima i úspory. Často ale fungují každá zvlášť – každá se svou aplikací. Výsledkem je chaos. Loxone vše propojí do jednoho harmonického celku.
          </p>
        </div>

        <div className="mb-32">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full glass-panel rounded-[3rem] overflow-hidden border-black/5 dark:border-white/10 shadow-2xl relative min-w-0">
              <LoxoneSchema />
            </div>
            
            <div className="w-full lg:w-80 space-y-6">
              <div className="glass-panel p-8 rounded-[2rem] border-blue-600/10 bg-blue-600/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Info className="w-4 h-4" />
                  </div>
                  <h3 className="font-black uppercase tracking-widest text-xs text-blue-600 truncate">Architektura systému</h3>
                </div>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  Vizualizace toku dat mezi centrálním Miniserverem a periferními klastry v reálném čase. Každý pohyb kuličky reprezentuje synchronizační paket sběrnice Tree nebo Air.
                </p>
                <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Air Sběrnice</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Tree Sběrnice</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[2rem] border-black/5 dark:bg-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Systémový Log</span>
                  <Activity className="w-3 h-3 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-medium">Latence Jádra</span>
                    <span className="text-blue-600 font-black">2.4ms</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-medium">Zatížení CPU</span>
                    <span className="text-blue-600 font-black">12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
            <div className="space-y-8">
                <div className="glass-panel p-8 rounded-[2.5rem] border-red-500/10 bg-red-500/5">
                    <h3 className="font-black uppercase tracking-widest text-sm text-red-600 mb-4">Problém: Technologický chaos</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                        Typickým příkladem je situace, kdy topení i chlazení běží současně a „bojují“ proti sobě. Každý systém má svou aplikaci, logiku i ovládání.
                    </p>
                </div>
                <div className="glass-panel p-8 rounded-[2.5rem] border-green-500/10 bg-green-500/5">
                    <h3 className="font-black uppercase tracking-widest text-sm text-green-600 mb-4">Řešení: Loxone Harmonie</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                        Jedna přehledná aplikace, logika automatizací a spolupráce technologií zajistí maximální komfort a dům, který funguje sám.
                    </p>
                </div>
            </div>
            <div className="space-y-6">
               <h2 className="text-3xl font-black tracking-tight">Standard pro <span className="text-blue-600">Moderní domov</span></h2>
               <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  Loxone není jen ovládání přes mobil. Je to dům, který ví, že má zatáhnout žaluzie dříve, než se interiér přehřeje. Ví, že má vypnout topení v místnosti, kde je otevřené okno. A ví, že když odejdete, má zhasnout a zajistit dům.
               </p>
               <div className="flex gap-4 pt-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-blue-600">50,000+</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Rozhodnutí denně</span>
                  </div>
                  <div className="w-[1px] h-10 bg-gray-200 dark:bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-blue-600">100%</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Soukromí (Local)</span>
                  </div>
               </div>
            </div>
        </div>

        <div className="bg-gray-900 dark:bg-blue-900/20 rounded-[3rem] p-12 text-white border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <Zap className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6">Připraveni na dům, který přemýšlí za vás?</h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-2xl mb-10">
                Začněte úvodní konzultací a zjistěte, jak může Loxone změnit váš pohled na moderní bydlení.
            </p>
            <div className="flex flex-wrap gap-4">
                <button 
                    onClick={() => setView('contact')}
                    className="bg-blue-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20"
                >
                    Poptat realizaci Loxone
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoxoneDetail;