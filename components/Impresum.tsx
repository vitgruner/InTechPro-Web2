import React from 'react';
import { Building2, MapPin, Hash, Scale, ShieldCheck, Mail, Phone, ArrowLeft, Landmark, Briefcase } from 'lucide-react';
import { DetailProps } from '../types';
import Breadcrumbs from './Breadcrumbs';
import SectionHeader from './SectionHeader';

const Impresum: React.FC<DetailProps> = ({ setView }) => {
  const legalDetails = [
    {
      label: "Název společnosti",
      value: "INTECHPRO system s.r.o.",
      icon: <Building2 className="w-5 h-5" />
    },
    {
      label: "Sídlo",
      value: "Střížkovská 630/112, 180 00 Praha 8",
      icon: <MapPin className="w-5 h-5" />
    },
    {
      label: "Identifikační číslo (IČO)",
      value: "23321130",
      icon: <Hash className="w-5 h-5" />
    },
    {
      label: "Právní forma",
      value: "Společnost s ručením omezeným",
      icon: <Landmark className="w-5 h-5" />
    },
    {
      label: "Statutární orgán",
      value: "Daniel Hron, Petr Staňura (jednatelé)",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      label: "Působnost",
      value: "Centrála Praha, realizace po celé České republice",
      icon: <Scale className="w-5 h-5" />
    }
  ];

  const businessActivities = [
    "Výroba, instalace, opravy elektrických strojů a přístrojů, elektronických a telekomunikačních zařízení.",
    "Velkoobchod a maloobchod, zprostředkování obchodu a služeb.",
    "Přípravné a dokončovací práce, specializované stavební činnosti."
  ];

  return (
    <div className="pt-32 md:pt-40 pb-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs 
          items={[{ label: 'Impresum' }]}
          setView={setView}
        />

        <SectionHeader 
          variant="page"
          align="left"
          eyebrow="Právní identifikace"
          title="Impresum &"
          highlight="Provozovatel"
          description="Oficiální identifikační údaje společnosti v souladu s právními předpisy ČR."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {legalDetails.map((detail, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-black/5 dark:border-white/10 flex items-start gap-5 hover:border-blue-600/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {detail.icon}
              </div>
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">{detail.label}</span>
                <p className="text-sm font-black text-gray-900 dark:text-white leading-relaxed">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-panel p-8 rounded-[2rem] border border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
             <Briefcase className="w-5 h-5 text-blue-600" />
             <h3 className="text-xl font-black uppercase tracking-tight">Předmět podnikání</h3>
          </div>
          <ul className="space-y-4">
            {businessActivities.map((activity, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{activity}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 glass-panel p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/10">
          <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" /> Kontaktní údaje
          </h3>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="text-left">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Elektronická pošta</span>
              <a href="mailto:info@intechpro.cz" className="text-lg font-black text-blue-600 hover:underline">info@intechpro.cz</a>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Telefon</span>
              <a href="tel:+420777000000" className="text-lg font-black text-gray-900 dark:text-white hover:text-blue-600 transition-colors">+420 777 000 000</a>
            </div>
          </div>
        </div>

        <div className="pt-12 flex justify-center">
          <button 
            onClick={() => setView('home')}
            className="group flex items-center gap-3 px-8 py-4 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Zpět na hlavní stránku
          </button>
        </div>
      </div>
    </div>
  );
};

export default Impresum;