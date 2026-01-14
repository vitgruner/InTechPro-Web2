
import React from 'react';
import { ArrowRight, ArrowLeft, Mail, LayoutGrid } from 'lucide-react';
import { ViewState } from '../types';

const SERVICE_ORDER: ViewState[] = [
  'loxone-detail',
  'projekce-elektro',
  'rozvadece',
  'technologie',
  'osvetleni'
];

const LABELS: Record<string, string> = {
  'loxone-detail': 'Smart Home Loxone',
  'projekce-elektro': 'Projekce Elektro',
  'rozvadece': 'Výroba Rozvaděčů',
  'technologie': 'Technologie',
  'osvetleni': 'Osvětlení'
};

interface ServicePagerProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const ServicePager: React.FC<ServicePagerProps> = ({ currentView, setView }) => {
  const currentIndex = SERVICE_ORDER.indexOf(currentView);
  if (currentIndex === -1) return null;

  const isLast = currentIndex === SERVICE_ORDER.length - 1;
  const nextView = isLast ? 'contact' : SERVICE_ORDER[currentIndex + 1];
  const nextLabel = isLast ? 'Nezávazná poptávka' : LABELS[nextView];

  return (
    <div className="mt-24 pt-12 border-t border-black/5 dark:border-white/5">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <button
          onClick={() => setView('services')}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          <LayoutGrid className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors" />
          Zpět na služby
        </button>

        <button
          onClick={() => {
              setView(nextView);
              window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
        >
          {isLast ? (
             <>Kontaktovat <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
          ) : (
             <>
               <span className="opacity-70">Další služba:</span> 
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
