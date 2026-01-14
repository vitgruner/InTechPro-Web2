
import React from 'react';
import { Search, PenTool, Settings, CheckSquare, FileText, ClipboardCheck, Zap, Rocket, Sliders } from 'lucide-react';

const Process = () => {
  const steps = [
    { icon: <Search />, title: "Úvodní konzultace", desc: "Osobně nebo online projdeme vaše představy, možnosti systému Loxone a půdorysy stavby. Definujeme rozsah řešení." },
    { icon: <PenTool />, title: "Návrh systému a cena", desc: "Navrhneme systém Loxone přesně podle vašich potřeb a připravíme orientační cenový odhad." },
    { icon: <Settings />, title: "Doladění a rozpočet", desc: "Úprava priorit a finančních možností. Příprava systému i na budoucí rozšíření (např. kabelová příprava)." },
    { icon: <CheckSquare />, title: "Finální nabídka", desc: "Po odsouhlasení rozsahu vytvoříme přesnou cenovou nabídku. Žádná dodatečná navýšení vás nečekají." },
    { icon: <FileText />, title: "Příprava podkladů", desc: "Detailní Loxone studie – rozmístění prvků, typy kabeláže, značení a doporučené trasy." },
    { icon: <ClipboardCheck />, title: "Kontrola na stavbě", desc: "Společná kontrola s elektrikáři před zaklopením kabelů. Jistota správného provedení." },
    { icon: <Zap />, title: "Rozvaděče (volitelné)", desc: "Projekce a kompletní výroba rozvaděčů na dílně. Dodání hotového a revidovaného kusu na stavbu." },
    { icon: <Rocket />, title: "Realizace a spuštění", desc: "Osazení koncových prvků, připojení rozvaděče a oživení systému v čistém a bezprašném prostředí." },
    { icon: <Sliders />, title: "Finální nastavení", desc: "Individuální doladění systému podle vašich skutečných návyků a přání po zabydlení." },
  ];

  return (
    <section
      id="process"
      className="py-10 md:py-14 bg-gray-50 dark:bg-[#0a0a0a] border-y border-black/5 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-blue-600 font-black uppercase tracking-[0.35em] text-[10px] mb-3 block">
            Průběh realizace
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900 dark:text-white">
            Jak probíhá <span className="text-gradient">spolupráce</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
            Celým procesem vás provedeme krok za krokem a dohlédneme na bezproblémovou realizaci.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 md:p-5 rounded-2xl border-black/5 dark:border-white/5 hover:border-blue-600/30 transition-all group flex flex-col justify-center h-full"
            >
              {/* HEADER: ICON + TITLE */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <span className="[&>svg]:w-4 [&>svg]:h-4">
                    {step.icon}
                  </span>
                </div>

                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-tight">
                  {step.title}
                </h3>
              </div>

              {/* DESCRIPTION */}
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
