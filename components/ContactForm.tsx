import React, { useState, useMemo } from 'react';
import { Send, CheckCircle2, Zap, Thermometer, Shield, Radio, Sun, Wifi, Car, Home, Factory, Building2, Waves, Sprout, Droplets, Blinds, Calculator, Sparkles, History, Mail, Phone, MessageSquare, Loader2, AlertCircle, Check, Snowflake, DoorOpen, Camera, Flame, Upload, X, Maximize } from 'lucide-react';
import VisionaryAssistant from './VisionaryAssistant';
import { Message, ContactFormProps } from '../types';
import SectionHeader from './SectionHeader';
import Breadcrumbs from './Breadcrumbs';
import { supabase } from '../services/supabase';
import { sanitizeString, limitString } from '../src/security/validation';

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
  techSupplyInterest: boolean;
  distributionBoardInterest: boolean;
  electricalInstallInterest: boolean;
  projectFiles: File[];
  area: number;
  techSupplyFields: string[];
}

const ContactForm: React.FC<ContactFormProps> = ({ isStandalone = false, setView }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const initialAiMessages: Message[] = [
    { role: 'assistant', content: 'Zdravím vás. Jsem váš **digitální průvodce** světem inteligentní infrastruktury InTechPro. \n\nMáte konkrétní představu o svém projektu, nebo potřebujete inspirovat možnostmi moderní automatizace?' }
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
    gdprConsent: false,
    techSupplyInterest: false,
    distributionBoardInterest: false,
    electricalInstallInterest: false,
    projectFiles: [],
    area: 0,
    techSupplyFields: []
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const featureOptions = [
    { id: 'lighting', label: 'Chytré osvětlení', icon: <Zap className="w-4 h-4" />, price: 35000 },
    { id: 'hvac', label: 'Řízení HVAC', icon: <Thermometer className="w-4 h-4" />, price: 45000 },
    { id: 'heating', label: 'Topení', icon: <Thermometer className="w-4 h-4" />, price: 40000 },
    { id: 'cooling', label: 'Chlazení', icon: <Snowflake className="w-4 h-4" />, price: 40000 },
    { id: 'security', label: 'Zabezpečení', icon: <Shield className="w-4 h-4" />, price: 50000 },
    { id: 'camera', label: 'Kamerový systém', icon: <Camera className="w-4 h-4" />, price: 45000 },
    { id: 'access', label: 'Přístup', icon: <DoorOpen className="w-4 h-4" />, price: 35000 },
    { id: 'audio', label: 'Multi-room audio', icon: <Radio className="w-4 h-4" />, price: 40000 },
    { id: 'energy', label: 'FVE a energie', icon: <Sun className="w-4 h-4" />, price: 80000 },
    { id: 'network', label: 'Datová síť', icon: <Wifi className="w-4 h-4" />, price: 25000 },
    { id: 'ev', label: 'Nabíjení EV / Wallbox', icon: <Car className="w-4 h-4" />, price: 30000 },
    { id: 'blinds', label: 'Stínění', icon: <Blinds className="w-4 h-4" />, price: 25000 },
    { id: 'pool', label: 'Bazénová techn.', icon: <Waves className="w-4 h-4" />, price: 60000 },
    { id: 'sauna', label: 'Sauna', icon: <Flame className="w-4 h-4" />, price: 35000 },
    { id: 'irrigation', label: 'Závlaha zahrady', icon: <Droplets className="w-4 h-4" />, price: 35000 }
  ];

  const techSupplyOptions = [
    { id: 'lighting_fixtures', label: 'Svítidla', icon: <Zap className="w-3 h-3" /> },
    { id: 'heat_pump', label: 'Tepelné čerpadlo', icon: <Thermometer className="w-3 h-3" /> },
    { id: 'ac_unit', label: 'Klimatizace', icon: <Snowflake className="w-3 h-3" /> },
    { id: 'recuperation', label: 'Rekuperace', icon: <Waves className="w-3 h-3" /> },
    { id: 'el_heating', label: 'El. vytápění', icon: <Thermometer className="w-3 h-3" /> },
    { id: 'pv_system', label: 'Fotovoltaika', icon: <Sun className="w-3 h-3" /> },
    { id: 'audio_hw', label: 'Audio technika', icon: <Radio className="w-3 h-3" /> },
    { id: 'security_hw', label: 'EZS / CCTV', icon: <Shield className="w-3 h-3" /> },
    { id: 'network_hw', label: 'Datová síť', icon: <Wifi className="w-3 h-3" /> }
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
    const areaPrice = (formData.area || 0) * 500; // 500 CZK per m2

    return (basePrice + areaPrice + featuresTotal) * multiplier;
  }, [formData]);

  const toggleFeature = (id: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f: string) => f !== id)
        : [...prev.features, id]
    }));
  };

  const toggleTechSupplyField = (id: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      techSupplyFields: prev.techSupplyFields.includes(id)
        ? prev.techSupplyFields.filter((f: string) => f !== id)
        : [...prev.techSupplyFields, id]
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setAiMessages(initialAiMessages);
    setSubmitted(false);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        projectFiles: [...prev.projectFiles, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projectFiles: prev.projectFiles.filter((_, i) => i !== index)
    }));
  };

  const validateFiles = (files: File[]): string | null => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB total
    const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

    let totalSize = 0;
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return `Nepodporovaný typ souboru: ${file.name}. Povoleny jsou pouze PDF, JPG a PNG.`;
      }
      totalSize += file.size;
    }

    if (totalSize > MAX_SIZE) {
      return 'Celková velikost příloh přesahuje povolený limit 5MB.';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gdprConsent) {
      setErrorMessage('Pro odeslání poptávky musíte souhlasit se zpracováním osobních údajů.');
      return;
    }

    // Input sanitization
    const sanitizedData = {
      name: limitString(sanitizeString(formData.name), 100),
      email: limitString(formData.email.trim(), 100),
      phone: limitString(formData.phone.trim(), 30),
      message: limitString(sanitizeString(formData.message), 2000),
    };

    setIsSending(true);
    setErrorMessage(null);

    try {
      // 0) Validate files
      const fileValidationError = validateFiles(formData.projectFiles);
      if (fileValidationError) {
        setErrorMessage(fileValidationError);
        setIsSending(false);
        return;
      }

      const bodyData = {
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        property: formData.property,
        features: formData.features.length > 0
          ? formData.features.map(f => featureOptions.find(o => o.id === f)?.label).join(', ')
          : 'Žádné specifické systémy nevybrány',
        area: (formData.area || 0) + ' m2',
        estimatedBudget: estimatedTotal.toLocaleString('cs-CZ') + ' Kč',
        techSupply: formData.techSupplyInterest,
        techSupplyDetails: formData.techSupplyFields.length > 0
          ? formData.techSupplyFields.map(f => techSupplyOptions.find(o => o.id === f)?.label).join(', ')
          : 'Nespecifikováno',
        distributionBoard: formData.distributionBoardInterest,
        electricalInstall: formData.electricalInstallInterest,
        message: sanitizedData.message || 'Bez doplňující zprávy.',
        aiHistory: aiMessages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n'),
        botCheck: (e.target as any).botCheck?.value // Honeypot
      };

      const payload = new FormData();
      payload.append('data', JSON.stringify(bodyData));
      formData.projectFiles.forEach((file) => {
        payload.append('files', file);
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: payload, // Browser automatically sets'multipart/form-data'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Odesílání selhalo.');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      const errorDetail = error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      console.error('Submission Error:', errorDetail);
      setErrorMessage(`Chyba při odesílání: ${errorDetail}`);
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
          className="px-10 py-4 bg-[#69C350] text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#4BA038] transition-all shadow-xl shadow-[#7BD462]/20 active:scale-95"
        >
          Nová poptávka
        </button>
      </section>
    );
  }

  return (
    <section id="contact" className={`py-10 md:py-20 relative overflow-hidden bg-gray-50/30 dark:bg-[#080808] transition-colors duration-500 ${isStandalone ? 'pt-28 md:pt-36' : ''}`}>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#69C350]/5 dark:bg-[#69C350]/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {isStandalone && setView && (
          <Breadcrumbs
            items={[{ label: 'KONTAKT' }]}
            setView={setView}
          />
        )}
        <SectionHeader
          eyebrow="Kontaktujte nás"
          title="Kontaktujte"
          highlight="nás"
          description="Nezávazně vyplňte formulář níže. Naši specialisté zanalyzují vaše požadavky a připraví koncept inteligentního řešení přesně na míru vašemu projektu."
          align={isStandalone ? 'left' : 'center'}
        />

        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          {isStandalone && (
            <div className="w-full space-y-6">
              <div className="glass-panel p-6 rounded-[2rem] bg-[#69C350]/5 border-[#69C350]/20">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-[#69C350]" />
                  <h3 className="text-sm font-black uppercase tracking-tight">Krok 1: Konzultace</h3>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                  Poraďte se o technických detailech. Přepis chatu automaticky odešleme spolu s vaší poptávkou.
                </p>
              </div>
              <div className="min-h-[350px] md:min-h-[400px]">
                <VisionaryAssistant messages={aiMessages} setMessages={setAiMessages} isLoading={isAiLoading} setIsLoading={setIsAiLoading} compact={true} />
              </div>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-6 transition-all duration-500 h-full flex flex-col">
              {/* Honeypot field - visually hidden */}
              <input type="text" name="botCheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* STEP 1: OSOBNÍ ÚDAJE */}
              <div className="glass-panel p-6 md:p-8 rounded-[2rem] border border-black/10 dark:border-white/10 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#69C350]/10 rounded-lg flex items-center justify-center text-[#69C350]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Krok 1: Osobní údaje</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Jméno a Příjmení</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder="např. Jan Novák" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-[#69C350] transition-all text-xs" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Váš E-mail</label>
                    <input required type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder="vysledek@projekt.cz" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-[#69C350] transition-all text-xs" />
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
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-[#69C350] transition-all text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: O PROJEKTU */}
              <div className="glass-panel p-6 md:p-8 rounded-[2rem] border border-black/10 dark:border-white/10 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#69C350]/10 rounded-lg flex items-center justify-center text-[#69C350]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Krok 2: O projektu</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Typ objektu</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[{ id: 'Rezidenční', icon: <Home className="w-3.5 h-3.5" /> }, { id: 'Komerční', icon: <Building2 className="w-3.5 h-3.5" /> }, { id: 'Průmyslová', icon: <Factory className="w-3.5 h-3.5" /> }].map(type => (
                        <button key={type.id} type="button" onClick={() => setFormData((prev) => ({ ...prev, property: type.id }))} className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border transition-all ${formData.property === type.id ? 'bg-[#69C350] border-[#69C350] text-white shadow-lg shadow-[#7BD462]/20' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500 hover:border-black/20'}`}>
                          {type.icon}
                          <span className="text-[8px] font-bold uppercase">{type.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 items-start">
                    <div className="space-y-2 text-left">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Plocha projektu</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#69C350]">
                          <Maximize className="w-4 h-4" />
                        </div>
                        <input
                          type="number"
                          value={formData.area || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, area: parseInt(e.target.value) || 0 }))}
                          placeholder="např. 150"
                          className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 pl-12 pr-5 text-gray-900 dark:text-white focus:outline-none focus:border-[#69C350] transition-all text-sm font-bold"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <span className="text-[10px] font-bold text-gray-400">m²</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Podklady k projektu</label>
                      <div className="relative group">
                        <input type="file" multiple onChange={handleFileChange} className="hidden" id="project-docs" />
                        <label htmlFor="project-docs" className="flex items-center gap-4 p-4 border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-all group-hover:border-[#69C350]/50 h-[56px]">
                          <div className="w-8 h-8 rounded-lg bg-[#69C350]/10 flex items-center justify-center text-[#69C350] transition-transform flex-shrink-0">
                            <Upload className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black uppercase text-gray-900 dark:text-white mb-0 leading-tight">Nahrát podklady</p>
                            <p className="text-[7px] text-gray-500 font-medium truncate uppercase">PDF, JPG, PNG (max 5MB)</p>
                          </div>
                        </label>
                      </div>
                      {formData.projectFiles.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {formData.projectFiles.map((file, idx) => (
                            <div key={idx} className="relative group/file bg-[#69C350]/10 border border-[#69C350]/30 rounded px-2 py-1 flex items-center gap-1.5">
                              <span className="text-[7px] font-black text-[#69C350] truncate max-w-[60px] uppercase">{file.name}</span>
                              <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-600 transition-colors">
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: ROZSAH ŘEŠENÍ */}
              <div className="glass-panel p-6 md:p-8 rounded-[2rem] border border-black/10 dark:border-white/10 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#69C350]/10 rounded-lg flex items-center justify-center text-[#69C350]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Krok 3: Rozsah řešení</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3 text-left">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Systémy Loxone (výběr funkcí)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {featureOptions.map(feature => (
                        <button
                          key={feature.id}
                          type="button"
                          onClick={() => toggleFeature(feature.id)}
                          className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-left transition-all ${formData.features.includes(feature.id) ? 'bg-[#69C350] text-white border-[#69C350] shadow-md ring-2 ring-[#69C350]/20' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500 hover:border-black/20'}`}
                        >
                          <div className="flex-shrink-0">{feature.icon}</div>
                          <span className="text-[8px] font-bold uppercase truncate">{feature.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Doplňkové služby a montáž</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { id: 'techSupplyInterest', label: 'Dodávka technologií (Hardware)', icon: <Zap className="w-4 h-4" /> },
                        { id: 'distributionBoardInterest', label: 'Výroba a dodávka rozvaděče', icon: <Building2 className="w-4 h-4" /> },
                        { id: 'electricalInstallInterest', label: 'Kompletní elektro realizace', icon: <Factory className="w-4 h-4" /> }
                      ].map((interest) => (
                        <div
                          key={interest.id}
                          onClick={() => setFormData(p => ({ ...p, [interest.id]: !p[interest.id as keyof FormData] }))}
                          className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${formData[interest.id as keyof FormData] ? 'bg-[#69C350]/10 border-[#69C350] text-[#69C350]' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500 hover:border-black/20'}`}
                        >
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${formData[interest.id as keyof FormData] ? 'bg-[#69C350] border-[#69C350]' : 'border-black/10 dark:border-white/20'}`}>
                            {formData[interest.id as keyof FormData] && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex items-center gap-2">
                            {interest.icon}
                            <span className="text-[9px] font-black uppercase">{interest.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Conditional Tech Supply Choice */}
                    {formData.techSupplyInterest && (
                      <div className="mt-2 p-5 bg-[#69C350]/5 border border-[#69C350]/10 rounded-2xl animate-in slide-in-from-top-2 fade-in duration-300">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-3.5 h-3.5 text-[#69C350]" />
                          <span className="text-[9px] font-black text-[#69C350] uppercase tracking-widest">Upřesnění hardware</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {techSupplyOptions.map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleTechSupplyField(opt.id)}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all ${formData.techSupplyFields.includes(opt.id) ? 'bg-[#69C350] text-white border-[#69C350] shadow-sm' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-400 hover:border-[#69C350]/30'}`}
                            >
                              <div className="flex-shrink-0">{opt.icon}</div>
                              <span className="text-[8px] font-bold uppercase leading-tight">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* STEP 4: SHRNUTÍ & ODESLÁNÍ */}
              <div className="glass-panel p-6 md:p-8 rounded-[2rem] border border-black/10 dark:border-white/10 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#69C350]/10 rounded-lg flex items-center justify-center text-[#69C350]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight">Krok 4: Shrnutí & Odeslání</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2 text-left">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" />
                      Vaše vize / Detaily projektu (volitelné)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Popište nám své specifické požadavky nebo vize..."
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-[#69C350] transition-all text-xs resize-none"
                    />
                  </div>

                  {/* GDPR Consent Checkbox */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/5 border border-black/5 cursor-pointer group" onClick={() => setFormData(p => ({ ...p, gdprConsent: !p.gdprConsent }))}>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${formData.gdprConsent ? 'bg-[#69C350] border-[#69C350]' : 'border-black/10 dark:border-white/20'}`}>
                      {formData.gdprConsent && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-tight">
                        Souhlasím se <button type="button" onClick={(e) => { e.stopPropagation(); document.dispatchEvent(new CustomEvent('intechpro-open-cookies')); }} className="text-[#69C350] font-bold hover:underline">zpracováním osobních údajů</button> pro vyřízení poptávky.
                      </p>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-600">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <p className="text-[10px] font-black uppercase">{errorMessage}</p>
                    </div>
                  )}

                  <div className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-left relative">
                      <div className="absolute -inset-4 bg-[#69C350]/5 blur-2xl rounded-full -z-10 animate-pulse"></div>
                      <p className="text-[9px] font-black text-[#69C350] uppercase tracking-widest mb-1">Odhadovaná investice</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl font-black text-gray-900 dark:text-white tabular-nums tracking-tighter">
                          {estimatedTotal.toLocaleString()}
                        </span>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-black text-[#69C350]">Kč <span className="text-[9px] font-medium opacity-70">BEZ DPH</span></span>
                          <span className="text-[6px] font-bold text-gray-400 uppercase tracking-widest leading-none">All-inclusive odhad</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending || !formData.gdprConsent}
                      className="w-full md:w-auto bg-[#69C350] hover:bg-[#4BA038] text-white font-black uppercase tracking-[0.2em] py-5 px-10 rounded-2xl transition-all shadow-xl shadow-[#69C350]/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
