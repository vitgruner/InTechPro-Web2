
import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, ChevronDown, ChevronUp, Check, X, Info } from 'lucide-react';

type ConsentType = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentType>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // 1. Kontrola, zda uživatel již vyjádřil souhlas (pouze pro autostart)
    const savedConsent = localStorage.getItem('intechpro_cookie_consent_v1');
    if (!savedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // 2. Event listener pro otevření nastavení z patičky (funguje vždy, i když je už odsouhlaseno)
    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowDetails(true);
    };

    document.addEventListener('intechpro-open-cookies', handleOpenSettings);
    return () => document.removeEventListener('intechpro-open-cookies', handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = { necessary: true, analytics: true, marketing: true };
    saveConsent(fullConsent);
  };

  const handleAcceptSelection = () => {
    saveConsent(consent);
  };

  const handleDecline = () => {
    const necessaryOnly = { necessary: true, analytics: false, marketing: false };
    saveConsent(necessaryOnly);
  };

  const saveConsent = (finalConsent: ConsentType) => {
    localStorage.setItem('intechpro_cookie_consent_v1', JSON.stringify(finalConsent));
    setIsVisible(false);
    
    // Zde by se inicializovaly externí skripty (GA, GTM, Pixel) podle hodnoty finalConsent
    if (finalConsent.analytics) {
      console.log('Initializing Analytics...');
    }
    if (finalConsent.marketing) {
      console.log('Initializing Marketing scripts...');
    }
  };

  const toggleCategory = (category: keyof ConsentType) => {
    if (category === 'necessary') return; // Nezbytné nelze vypnout
    setConsent(prev => ({ ...prev, [category]: !prev[category] }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] flex justify-center pointer-events-none">
      <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl rounded-[2rem] p-6 max-w-2xl w-full pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-700">
        
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
            <Cookie className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">Respektujeme vaše soukromí</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Používáme cookies k optimalizaci funkčnosti webu a pro analytické účely. Vaše data jsou u nás v bezpečí a nikdy je neprodáváme třetím stranám.
            </p>
          </div>
        </div>

        {/* Detailed Settings (Expandable) */}
        {showDetails && (
          <div className="mb-6 space-y-3 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Nezbytné</div>
                  <div className="text-[10px] text-gray-500 font-medium">Funkčnost webu, zabezpečení</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-widest">
                <Check className="w-3 h-3" /> Vždy aktivní
              </div>
            </div>

            <button 
              onClick={() => toggleCategory('analytics')}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${consent.analytics ? 'bg-blue-600/5 border-blue-600/30' : 'bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <Info className={`w-4 h-4 ${consent.analytics ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Analytické</div>
                  <div className="text-[10px] text-gray-500 font-medium">Měření návštěvnosti, vylepšování UX</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${consent.analytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${consent.analytics ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>

            <button 
              onClick={() => toggleCategory('marketing')}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${consent.marketing ? 'bg-blue-600/5 border-blue-600/30' : 'bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <Info className={`w-4 h-4 ${consent.marketing ? 'text-blue-600' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Marketingové</div>
                  <div className="text-[10px] text-gray-500 font-medium">Personalizace obsahu</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${consent.marketing ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${consent.marketing ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleAcceptAll}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Povolit vše
          </button>
          
          {showDetails ? (
            <button 
              onClick={handleAcceptSelection}
              className="flex-1 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95"
            >
              Uložit vybrané
            </button>
          ) : (
             <button 
              onClick={handleDecline}
              className="flex-1 bg-transparent border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95"
            >
              Jen nezbytné
            </button>
          )}

          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="sm:w-auto w-full bg-transparent text-gray-500 hover:text-blue-600 px-4 py-3.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            {showDetails ? (
              <>Méně <ChevronUp className="w-3 h-3" /></>
            ) : (
              <>Nastavení <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        </div>
        
        <div className="mt-4 flex justify-center gap-4 text-[9px] text-gray-400 font-medium">
            <button onClick={() => document.dispatchEvent(new CustomEvent('intechpro-open-cookies'))} className="hover:text-blue-600 transition-colors">Zásady ochrany osobních údajů</button>
            <span>•</span>
            <button onClick={() => document.dispatchEvent(new CustomEvent('intechpro-open-cookies'))} className="hover:text-blue-600 transition-colors">Seznam cookies</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
