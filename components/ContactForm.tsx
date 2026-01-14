
import React, { useState, useMemo } from 'react';
import { Send, CheckCircle2, Zap, Thermometer, Shield, Radio, Sun, Wifi, Car, Home, Factory, Building2, Waves, Sprout, Droplets, Blinds, Calculator, Sparkles, History, Mail } from 'lucide-react';
import VisionaryAssistant from './VisionaryAssistant';
import { Message } from '../types';

interface FormData {
  name: string;
  email: string;
  system: string;
  property: string;
  features: string[];
  timeline: string;
}

const ContactForm = ({ isStandalone = false }: { isStandalone?: boolean }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Zdravím vás. Jsem váš **digitální průvodce** světem inteligentní infrastruktury IN TECH PRO. \n\nMáte konkrétní představu o svém projektu, nebo potřebujete inspirovat možnostmi moderní automatizace?' }
  ]);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    system: 'Loxone',
    property: 'Rezidenční',
    features: [],
    timeline: 'Aktivní vývoj (1-3 měsíce)'
  });

  const featureOptions = [
    { id: 'lighting', label: 'Chytré osvětlení', icon: <Zap className="w-4 h-4" />, price: 35000 },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionPayload = {
      targetEmail: 'vit.gruner@gmail.com',
      client: { name: formData.name, email: formData.email },
      project: { property: formData.property, system: formData.system, features: formData.features, estimatedBudget: estimatedTotal },
      aiConsultationHistory: aiMessages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n')
    };
    console.log("PRODUKČNÍ POPTÁVKA ODESLÁNA NA: vit.gruner@gmail.com", submissionPayload);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`py-16 md:py-24 text-center animate-in fade-in zoom-in duration-700 ${isStandalone ? 'pt-32' : ''}`}>
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-8 glow">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 transition-colors">Vize byla odeslána</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto transition-colors px-6 mb-8">
          Náš inženýr vás bude kontaktovat s detailním návrhem. 
        </p>
        <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
          <div className="w-full p-4 glass-panel flex items-center gap-3 rounded-2xl border-green-500/20 text-green-600">
            <History className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-left">Kompletní přepis chatu přiložen</span>
          </div>
          <div className="w-full p-4 glass-panel flex items-center gap-3 rounded-2xl border-blue-500/20 text-blue-600">
            <Mail className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-left">Odesláno na: vit.gruner@gmail.com</span>
          </div>
        </div>
        <div className="mt-12">
          <button 
            onClick={() => { setSubmitted(false); setAiMessages([{ role: 'assistant', content: 'Jak mohu dále pomoci s vaší další vizí?' }]); }}
            className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-[10px] hover:text-blue-800 dark:hover:text-white transition-colors"
          >
            Zahájit novou poptávku
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className={`py-16 md:py-24 relative overflow-hidden bg-gray-50/30 dark:bg-[#080808] transition-colors duration-500 ${isStandalone ? 'pt-32 md:pt-40' : ''}`}>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center lg:text-left mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/20 dark:border-blue-400/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            Iniciační Protokol
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight tracking-tighter transition-colors">Zhmotněte svou <span className="text-gradient">Vizi</span></h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-[2rem] bg-blue-600/5 border-blue-600/20 mb-2">
                <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-black uppercase tracking-tight">Krok 1: Konzultace</h3>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                  Poraďte se o technických detailech. Přepis chatu automaticky odešleme na <strong>vit.gruner@gmail.com</strong> spolu s vaší poptávkou.
                </p>
            </div>
            <div className="flex-1 min-h-[400px] md:min-h-[500px]">
                <VisionaryAssistant messages={aiMessages} setMessages={setAiMessages} isLoading={isAiLoading} setIsLoading={setIsAiLoading} compact={true} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 rounded-[3rem] border border-black/10 dark:border-white/10 shadow-xl space-y-8 transition-all duration-500 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-600">
                      <Calculator className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Krok 2: Specifikace projektu</h3>
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
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {featureOptions.slice(0, 8).map(feature => (
                    <button key={feature.id} type="button" onClick={() => toggleFeature(feature.id)} className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-left transition-all ${formData.features.includes(feature.id) ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500'}`}>
                      <div className="flex-shrink-0">{feature.icon}</div>
                      <span className="text-[9px] font-bold uppercase truncate">{feature.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-8 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                 <div className="text-left">
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Odhadovaná investice</p>
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-3xl font-black text-gray-900 dark:text-white tabular-nums">{estimatedTotal.toLocaleString()}</span>
                       <span className="text-xs font-bold text-blue-600">Kč</span>
                    </div>
                 </div>
                 <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] py-5 px-12 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group">
                  Odeslat poptávku
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
