import React, { useState, useMemo } from 'react';
import { Send, CheckCircle2, Zap, Thermometer, Shield, Radio, Sun, Wifi, Car, Home, Factory, Building2, Waves, Sprout, Droplets, Blinds, Calculator, Sparkles, History, Mail, Phone, MessageSquare, Loader2, AlertCircle, Check } from 'lucide-react';
import VisionaryAssistant from './VisionaryAssistant';
import { Message } from '../types';
import SectionHeader from './SectionHeader';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  system: string;
  property: string;
  features: string[];
  timeline: string;
  gdprConsent: boolean;
}

const ContactForm = ({ isStandalone = false }: { isStandalone?: boolean }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const initialAiMessages: Message[] = [
    { role: 'assistant', content: 'Zdravím vás. Jsem váš **digitální průvodce** světem inteligentní infrastruktury IN TECH PRO. \n\nMáte konkrétní představu o svém projektu, nebo potřebujete inspirovat možnostmi moderní automatizace?' }
  ];

  const [aiMessages, setAiMessages] = useState<Message[]>(initialAiMessages);

  const initialFormData: FormData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    system: 'Loxone',
    property: 'Rezidenční',
    features: [],
    timeline: 'Aktivní vývoj (1-3 měsíce)',
    gdprConsent: false
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const featureOptions = [
    { id: 'lighting', label: 'Chytré osvětlení', icon: <Zap className="w-4 h-4" />, price: 35000 },
    // Fix: Corrected typo 'Therometer' to 'Thermometer'
    { id: 'hvac', label: 'Řízení HVAC', icon: <Thermometer className="w-4 h-4" />, price: 45000 },
    { id: 'security', label: 'Zabezpečení', icon: <Shield className="w-4 h-4" />, price: 50000 },
    { id: 'audio', label: 'Multi-room audio', icon: <Radio className="w-4 h-4" />, price: 40000 },
    { id: 'energy', label: 'FVE a energie', icon: <Sun className="w-4 h-4" />, price: 80000 },
    { id: 'network', label: 'Síťová infra', icon: <Wifi className="w-4 h-4" />, price: 25000 },
    { id: 'ev', label: 'Nabíjení EV', icon: <Car className="w-4 h-4" />, price: 30000 },
    { id: 'blinds', label: 'Stínění', icon: <Blinds className="w-4 h-4" />, price: 25000 },
    { id: 'pool', label: 'Bazénová techn.', icon: <Waves className="w-4 h-4" />, price: 60000 },
    { id: 'greenhouse', label: 'Skleník', icon: <Sprout className="w-4 h-4" />, price: 45000 },
    { id: 'irrigation', label: 'Závlaha zahrady', icon: <Droplets className="w-4 h-4" />, price: 35000 }
  ];

  const propertyMultipliers: Record<string, number> = {
    'Rezidenční': 1.0,
    'Komerční': 2.5,
    'Průmyslová': 5.0
  };

  const estimatedTotal = useMemo(() => {
    const featuresTotal = formData.features.reduce((sum, fId) => {
      const feature = featureOptions.find(opt => opt.id === fId);
      return sum + (feature?.price || 0);
    }, 0);
    const multiplier = propertyMultipliers[formData.property] || 1;
    const basePrice = 150000;

    return (basePrice + featuresTotal) * multiplier;
  }, [formData]);

  const toggleFeature = (id: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f: string) => f !== id)
        : [...prev.features, id]
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setAiMessages(initialAiMessages);
    setSubmitted(false);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gdprConsent) {
      setErrorMessage('Pro odeslání poptávky musíte souhlasit se zpracováním osobních údajů.');
      return;
    }

    setIsSending(true);
    setErrorMessage(null);

    const templateParams = {
      customer_name: formData.name,
      customer_email: formData.email,
      phone: formData.phone,
      property_type: formData.property,
      selected_features: formData.features.length > 0
        ? formData.features.map(f => featureOptions.find(o => o.id === f)?.label).join(', ')
        : 'Žádné specifické systémy nevybrány',
      estimated_budget: estimatedTotal.toLocaleString('cs-CZ') + ' Kč',
      message: formData.message || 'Bez doplňující zprávy.',
      ai_history: aiMessages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n')
    };

    try {
      const SERVICE_ID = 'service_qrgvofr';
      const TEMPLATE_ADMIN_ID = 'template_76vc4mm';
      const TEMPLATE_CUSTOMER_ID = 'template_customer_confirm';
      const PUBLIC_KEY = 'JowaJUIrtXne2eHJM';

      // Inicializace EmailJS
      emailjs.init(PUBLIC_KEY);

      // 1) Odeslání poptávky adminovi (Klíčové)
      const resAdmin = await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN_ID, templateParams);
      console.log('Admin email response:', resAdmin.status, resAdmin.text);

      // 2) Odeslání potvrzení zákazníkovi (Sekundární)
      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_CUSTOMER_ID, templateParams);
      } catch (custErr: any) {
        console.warn('Upozornění: Potvrzení zákazníkovi nebylo odesláno. Zkontrolujte, zda existuje šablona "template_customer_confirm" v EmailJS dashboardu.', custErr?.text || custErr);
      }

      setSubmitted(true);
      // Po úspěšném odeslání odrolujeme nahoru, aby potvrzení bylo vidět
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      const errorDetail = error?.text || error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      console.error('EmailJS Error Detail:', errorDetail);
      setErrorMessage(`Chyba při odesílání: ${error?.status === 404 ? 'Šablona nebo služba nebyla nalezena' : errorDetail}`);
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 flex flex-col items-center justify-center text-center px-6 min-h-[60vh] animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 border border-green-500/20 shadow-xl shadow-green-500/5">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tight text-gray-900 dark:text-white">Poptávka odeslána</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 font-medium leading-relaxed">
          Děkujeme za váš zájem. Vaši poptávku jsme přijali ke zpracování. Brzy vás budeme kontaktovat s návrhem dalšího postupu.
        </p>
        <button
          onClick={handleReset}
          className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          Nová poptávka
        </button>
      </section>
    );
  }

  return (
    <section id="contact" className={`py-10 md:py-20 relative overflow-hidden bg-gray-50/30 dark:bg-[#080808] transition-colors duration-500 ${isStandalone ? 'pt-28 md:pt-36' : ''}`}>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Kontaktujte nás"
          title="Zhmotněte svou"
          highlight="Vizi"
          description="Nezávazně vyplňte formulář níže. Naši inženýři zanalyzují vaše požadavky and připraví koncept inteligentního řešení přesně na míru vašemu projektu."
          align={isStandalone ? 'left' : 'center'}
        />

        <div className={`grid gap-10 items-stretch ${isStandalone ? 'lg:grid-cols-12' : 'grid-cols-1 max-w-4xl mx-auto'}`}>

          {isStandalone && (
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="glass-panel p-6 rounded-[2rem] bg-blue-600/5 border-blue-600/20 mb-2">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-sm font-black uppercase tracking-tight">Krok 1: Konzultace</h3>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                  Poraďte se o technických detailech. Přepis chatu automaticky odešleme spolu s vaší poptávkou.
                </p>
              </div>
              <div className="flex-1 min-h-[400px] md:min-h-[500px]">
                <VisionaryAssistant messages={aiMessages} setMessages={setAiMessages} isLoading={isAiLoading} setIsLoading={setIsAiLoading} compact={true} />
              </div>
            </div>
          )}

          <div className={`${isStandalone ? 'lg:col-span-7' : 'w-full'}`}>
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-black/10 dark:border-white/10 shadow-xl space-y-8 transition-all duration-500 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-600">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight">{isStandalone ? 'Krok 2: Specifikace projektu' : 'Specifikace projektu'}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Jméno a Příjmení</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder="např. Jan Novák" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all text-xs" />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Váš E-mail</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder="vysledek@projekt.cz" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all text-xs" />
                </div>
                <div className="space-y-2 text-left md:col-span-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    Telefonní číslo
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+420 777 000 000"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all text-xs"
                  />
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Typ objektu</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ id: 'Rezidenční', icon: <Home className="w-3.5 h-3.5" /> }, { id: 'Komerční', icon: <Building2 className="w-3.5 h-3.5" /> }, { id: 'Průmyslová', icon: <Factory className="w-3.5 h-3.5" /> }].map(type => (
                    <button key={type.id} type="button" onClick={() => setFormData((prev) => ({ ...prev, property: type.id }))} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${formData.property === type.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500'}`}>
                      {type.icon}
                      <span className="text-[9px] font-bold uppercase">{type.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Klíčové systémy</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2">
                  {featureOptions.slice(0, 8).map(feature => (
                    <button key={feature.id} type="button" onClick={() => toggleFeature(feature.id)} className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-left transition-all ${formData.features.includes(feature.id) ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500'}`}>
                      <div className="flex-shrink-0">{feature.icon}</div>
                      <span className="text-[9px] font-bold uppercase truncate">{feature.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" />
                  Vaše vize / Detaily
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Popište nám své specifické požadavky, dotazy nebo detaily projektu..."
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all text-xs resize-none"
                />
              </div>

              {/* GDPR Consent Checkbox */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-blue-600/5 border border-blue-600/10 cursor-pointer group" onClick={() => setFormData(p => ({ ...p, gdprConsent: !p.gdprConsent }))}>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${formData.gdprConsent ? 'bg-blue-600 border-blue-600 shadow-lg' : 'border-black/10 dark:border-white/20'}`}>
                  {formData.gdprConsent && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    Souhlasím se <button type="button" onClick={(e) => { e.stopPropagation(); document.dispatchEvent(new CustomEvent('intechpro-open-cookies')); }} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">zpracováním osobních údajů</button> pro účely vyřízení této poptávky a technické konzultace.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-xs font-bold">{errorMessage}</p>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="text-left">
                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Odhadovaná investice</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-gray-900 dark:text-white tabular-nums">{estimatedTotal.toLocaleString()}</span>
                    <span className="text-xs font-bold text-blue-600">Kč</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSending || !formData.gdprConsent}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] py-5 px-12 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Odesílání...
                    </>
                  ) : (
                    <>
                      Odeslat poptávku
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;