import React from 'react';
import { ArrowRight, ArrowLeft, Mail, LayoutGrid } from 'lucide-react';
import { ViewState } from '../types';

const SERVICE_ORDER: ViewState[] = [
  'loxone-smart-home',
  'projekce-elektro',
  'vyroba-rozvadecu',
  'moderni-technologie',
  'navrh-osvetleni'
];

const LABELS: Record<string, string> = {
  'loxone-smart-home': 'Smart Home',
  'projekce-elektro': 'Projekce',
  'vyroba-rozvadecu': 'Rozvaděče',
  'moderni-technologie': 'Technologie',
  'navrh-osvetleni': 'Osvětlení'
};

interface ServicePagerProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const ServicePager: React.FC<ServicePagerProps> = ({ currentView, setView }) => {
  const currentIndex = SERVICE_ORDER.indexOf(currentView);
  if (currentIndex === -1) return null;

  const isLast = currentIndex === SERVICE_ORDER.length - 1;
  const isFirst = currentIndex === 0;

  const nextView = isLast ? 'kontakt' : SERVICE_ORDER[currentIndex + 1];
  const nextLabel = isLast ? 'Nezávazná poptávka' : LABELS[nextView];

  const prevView = isFirst ? 'sluzby' : SERVICE_ORDER[currentIndex - 1];
  const prevLabel = isFirst ? 'Zpět na služby' : `Zpět na ${LABELS[prevView]}`;
  const PrevIcon = isFirst ? LayoutGrid : ArrowLeft;

  return (
    <div className="mt-12 w-full py-10 border-t border-black/5 dark:border-white/5">
      <div className="mx-auto flex w-full flex-row flex-wrap justify-center items-center gap-6 sm:gap-12">
        <button
          onClick={() => {
            setView(prevView as ViewState);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <PrevIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors" />
          {prevLabel}
        </button>

        <button
          onClick={() => {
              setView(nextView as ViewState);
              window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
        >
          {isLast ? (
             <>Kontaktovat <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
          ) : (
             <>
               <span className="opacity-70">Další:</span> 
               {nextLabel} 
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ServicePager;