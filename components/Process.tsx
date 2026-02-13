
import React from 'react';
import { Search, PenTool, Settings, CheckSquare, FileText, ClipboardCheck, Zap, Rocket, Sliders } from 'lucide-react';
import SectionHeader from './SectionHeader';

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
        <SectionHeader
          eyebrow="Průběh realizace"
          title="Jak probíhá"
          highlight="spolupráce"
          description="Celým procesem vás provedeme krok za krokem a dohlédneme na bezproblémovou realizaci."
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 md:p-8 rounded-2xl border border-black/5 dark:border-white/5 hover:border-[#69C350]/30 transition-all group flex flex-col justify-start h-full"
            >
              {/* HEADER: ICON + NUMBER + TITLE */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#69C350]/10 text-[#69C350] dark:text-[#95E87D] group-hover:bg-[#69C350] group-hover:text-white transition-all shadow-inner">
                  <span className="[&>svg]:w-5 [&>svg]:h-5">
                    {step.icon}
                  </span>
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-white dark:bg-[#1a1d21] border border-black/5 dark:border-white/10 rounded-md flex items-center justify-center shadow-sm">
                    <span className="text-[10px] font-black text-gray-400 dark:text-gray-500">{idx + 1}</span>
                  </div>
                </div>

                <h3 className="text-sm md:text-base font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
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
