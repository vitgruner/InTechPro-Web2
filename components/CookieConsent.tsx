
import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, ChevronDown, ChevronUp, Check, X, Info, Bot } from 'lucide-react';

type ConsentType = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_NAME = 'intechpro_cookie_consent_v1';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showAIDisclosure, setShowAIDisclosure] = useState(false);
  const [showAISystems, setShowAISystems] = useState(false);
  const [consent, setConsent] = useState<ConsentType>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Helper pro čtení cookies
  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  // Helper pro zápis reálné cookies
  const setRealCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  };

  useEffect(() => {
    // 1. Zkusíme načíst z localStorage nebo Cookies
    const localData = localStorage.getItem(COOKIE_NAME);
    const cookieData = getCookie(COOKIE_NAME);

    const savedConsent = localData || cookieData;

    if (savedConsent) {
      try {
        setConsent(JSON.parse(savedConsent));
      } catch (e) {
        console.error("Failed to parse cookie consent", e);
      }
    } else {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      // Při otevření nastavení se ujistíme, že máme aktuální data
      const localData = localStorage.getItem(COOKIE_NAME);
      const cookieData = getCookie(COOKIE_NAME);
      const savedConsent = localData || cookieData;

      if (savedConsent) {
        try {
          setConsent(JSON.parse(savedConsent));
        } catch (e) { }
      }
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
    // Aktualizace stavu UI okamžitě
    setConsent(finalConsent);

    const jsonString = JSON.stringify(finalConsent);

    // 1. Uložení do LocalStorage (moderní přístup)
    localStorage.setItem(COOKIE_NAME, jsonString);

    // 2. Uložení do reálné Cookie (aby to bylo vidět v DevTools > Application > Cookies)
    setRealCookie(COOKIE_NAME, jsonString, 365);

    setIsVisible(false);

    // Logování pro kontrolu (zde by se spouštěly reálné skripty)
    console.log('Consent saved & active:', finalConsent);

    if (finalConsent.analytics) {
      console.log('Initializing Analytics (mock)...');
    }
    if (finalConsent.marketing) {
      console.log('Initializing Marketing (mock)...');
    }
  };

  const toggleCategory = (category: keyof ConsentType) => {
    if (category === 'necessary') return;
    setConsent(prev => ({ ...prev, [category]: !prev[category] }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] flex justify-center pointer-events-none" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl rounded-[2rem] p-6 max-w-2xl w-full pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-700">

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-[#69C350]/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#69C350] dark:text-[#95E87D]">
            <Cookie className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">Respektujeme vaše soukromí</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Používáme cookies k optimalizaci funkčnosti webu a pro analytické účely. Vaše data jsou u nás v bezpečí.
            </p>
          </div>
        </div>

        {/* AI Act Disclosure */}
        <div className="mb-6 rounded-2xl bg-purple-500/5 border border-purple-500/10 dark:border-purple-500/20 overflow-hidden transition-all duration-300">
          <button
            onClick={() => setShowAIDisclosure(!showAIDisclosure)}
            className="w-full flex items-center justify-between p-4 hover:bg-purple-500/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-500" />
              <h4 className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest text-left">
                Oznámení dle AI Act (čl. 50)
              </h4>
            </div>
            {showAIDisclosure ? <ChevronUp className="w-3 h-3 text-purple-500" /> : <ChevronDown className="w-3 h-3 text-purple-500" />}
          </button>

          {showAIDisclosure && (
            <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Tento web <span className="font-bold">používá umělou inteligenci ke komunikaci s vámi.</span>
                Využíváme AI pro zodpovídání vašich dotazů a poskytování informací. Veškerá komunikace prochází lidskou kontrolou.
              </p>
              <button
                onClick={() => setShowAISystems(!showAISystems)}
                className="mt-2 text-[10px] font-bold text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-1"
              >
                {showAISystems ? 'Méně technických detailů' : 'Více technických detailů'}
              </button>
              {showAISystems && (
                <div className="mt-2 pt-2 border-t border-purple-500/10 text-[10px] text-gray-500 dark:text-gray-500 font-medium animate-in fade-in slide-in-from-top-1 duration-300">
                  AI systémy na tomto webu: Gemini 3 Flash
                </div>
              )}
            </div>
          )}
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
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${consent.analytics ? 'bg-[#69C350]/5 border-[#69C350]/30' : 'bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <Info className={`w-4 h-4 ${consent.analytics ? 'text-[#69C350]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Analytické</div>
                  <div className="text-[10px] text-gray-500 font-medium">Měření návštěvnosti, vylepšování UX</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${consent.analytics ? 'bg-[#69C350]' : 'bg-gray-300 dark:bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${consent.analytics ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>

            <button
              onClick={() => toggleCategory('marketing')}
              className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${consent.marketing ? 'bg-[#69C350]/5 border-[#69C350]/30' : 'bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <Info className={`w-4 h-4 ${consent.marketing ? 'text-[#69C350]' : 'text-gray-400'}`} />
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Marketingové</div>
                  <div className="text-[10px] text-gray-500 font-medium">Personalizace obsahu</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${consent.marketing ? 'bg-[#69C350]' : 'bg-gray-300 dark:bg-gray-700'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${consent.marketing ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAcceptAll}
            className="flex-1 bg-[#69C350] hover:bg-[#4BA038] text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-[#7BD462]/20 active:scale-95"
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
            className="sm:w-auto w-full bg-transparent text-gray-500 hover:text-[#69C350] px-4 py-3.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            {showDetails ? (
              <>Méně <ChevronUp className="w-3 h-3" /></>
            ) : (
              <>Nastavení <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-4 text-[9px] text-gray-400 font-medium">
          <button onClick={() => document.dispatchEvent(new CustomEvent('intechpro-open-cookies'))} className="hover:text-[#69C350] transition-colors">Zásady ochrany osobních údajů</button>
          <span>•</span>
          <button onClick={() => document.dispatchEvent(new CustomEvent('intechpro-open-cookies'))} className="hover:text-[#69C350] transition-colors">Seznam cookies</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
