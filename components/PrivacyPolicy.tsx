import React from 'react';
import { Shield, Lock, Eye, FileText, UserCheck, Mail, ArrowLeft } from 'lucide-react';
import { DetailProps } from '../types';
import Breadcrumbs from './Breadcrumbs';
import SectionHeader from './SectionHeader';

const PrivacyPolicy: React.FC<DetailProps> = ({ setView }) => {
  const sections = [
    {
      title: "1. Správce údajů",
      icon: <UserCheck className="w-5 h-5" />,
      content: "Správcem vašich osobních údajů je společnost INTECHPRO system s.r.o., se sídlem Střížkovská 630/112, 180 00 Praha 8. Zodpovídáme za bezpečné zpracování dat získaných prostřednictvím našich webových stránek a poptávkových formulářů."
    },
    {
      title: "2. Rozsah zpracování",
      icon: <FileText className="w-5 h-5" />,
      content: "Zpracováváme pouze údaje nezbytné pro technickou konzultaci a vyřízení poptávky: jméno, příjmení, e-mail, telefonní číslo a specifikaci vašeho projektu (typ objektu, požadované technologie)."
    },
    {
      title: "3. Účel zpracování",
      icon: <Eye className="w-5 h-5" />,
      content: "Vaše údaje využíváme výhradně k vypracování cenových nabídek, projektové dokumentace a komunikaci ohledně realizace inteligentní infrastruktury. Nepředáváme data třetím stranám pro marketingové účely."
    },
    {
      title: "4. Zabezpečení dat",
      icon: <Lock className="w-5 h-5" />,
      content: "Využíváme end-to-end šifrování pro přenos formulářů a bezpečné cloudové úložiště pro správu projektů. Přístup k datům mají pouze autorizovaní inženýři společnosti."
    },
    {
      title: "5. Vaše práva",
      icon: <Shield className="w-5 h-5" />,
      content: "Máte právo na přístup k údajům, jejich opravu, výmaz (právo být zapomenut) nebo omezení zpracování. Kdykoliv můžete odvolat svůj souhlas se zpracováním."
    }
  ];

  return (
    <div className="pt-32 md:pt-40 pb-24 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumbs 
          items={[{ label: 'Ochrana soukromí' }]}
          setView={setView}
        />

        <SectionHeader 
          variant="page"
          align="left"
          eyebrow="Zabezpečení a etika"
          title="Ochrana osobních"
          highlight="údajů"
          description="Transparentnost a bezpečnost jsou pilíři naší inženýrské práce. Přečtěte si, jak chráníme vaše soukromí v souladu s nařízením GDPR."
        />

        <div className="space-y-8 mt-12">
          {sections.map((section, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-[2rem] border border-black/5 dark:border-white/10 flex flex-col md:flex-row gap-6 hover:border-blue-600/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {section.icon}
              </div>
              <div>
                <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white uppercase tracking-tight">{section.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </div>
          ))}

          <div className="glass-panel p-10 rounded-[2.5rem] bg-blue-600/5 border-blue-600/10 text-center space-y-6">
             <Mail className="w-10 h-10 text-blue-600 mx-auto" />
             <h3 className="text-2xl font-black uppercase tracking-tight">Dotazy k ochraně dat?</h3>
             <p className="text-gray-600 dark:text-gray-400 font-medium max-w-lg mx-auto">
               Pokud máte jakékoliv otázky ohledně nakládání s vašimi daty, kontaktujte našeho pověřence na níže uvedené adrese.
             </p>
             <a href="mailto:info@intechpro.cz" className="inline-block text-blue-600 font-black text-xl hover:underline">info@intechpro.cz</a>
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
    </div>
  );
};

export default PrivacyPolicy;