import React from 'react';
import { Target, Lightbulb, Users, Award, MoveRight, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Breadcrumbs from './Breadcrumbs';
import Partners from './Partners';

const AboutUs = ({ setView }: { setView?: (view: any) => void }) => {
  return (
    <>
      <section id="o-nas" className="pt-28 md:pt-32 pb-24 bg-white dark:bg-[#050505] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#69C350]/5 to-transparent pointer-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {setView && (
            <Breadcrumbs items={[{ label: 'O nás' }]} setView={setView} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <SectionHeader
                eyebrow="Náš příběh a mise"
                title="Inovujeme "
                highlight="Budoucnost"
                description="Jsme InTechPro – tým expertů, kteří propojují moderní technologie s každodenním životem. Od první konzultace až po finální servis stojíme na straně kvality."
                align="left"
              />

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#69C350]/10 flex items-center justify-center flex-shrink-0">
                    <Target className="text-[#69C350] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Naše vize</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                      V InTechPro věříme, že technologie by měly sloužit lidem, ne naopak. Naším cílem je vytvářet prostředí, která jsou nejen chytrá, ale především intuitivní, bezpečná a energeticky úsporná.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#69C350]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="text-[#69C350] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Kvalita bez kompromisů</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                      Jako certifikovaný Loxone Silver Partner garantujeme profesionální přístup a špičkovou kvalitu provedení u každého projektu.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setView?.('kontakt')}
                    className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#69C350] hover:text-[#4BA038] transition-all"
                  >
                    Zjistěte, jak můžeme pomoci i vám
                    <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-square rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl relative z-10 bg-gray-100 dark:bg-white/5">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  alt="Tým InTechPro při spolupráci"
                />
              </div>

              {/* Stats Badge */}
              <div className="absolute -top-6 -right-6 glass-panel p-8 rounded-[2rem] border-[#69C350]/20 shadow-xl hidden md:block animate-in slide-in-from-top-8 duration-700 z-20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#69C350] flex items-center justify-center text-white shadow-lg">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white leading-none">200+</div>
                      <div className="text-[10px] font-black text-[#69C350] uppercase tracking-widest">Projektů</div>
                    </div>
                  </div>
                  <div className="h-px bg-black/5 dark:bg-white/5 w-full" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-300 dark:bg-slate-500 flex items-center justify-center text-white shadow-lg">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white leading-none">Silver</div>
                      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Loxone Partner</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background blob */}
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#69C350]/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white dark:bg-[#050505] pb-12">
        <Partners />
      </div>
    </>
  );
};

export default AboutUs;