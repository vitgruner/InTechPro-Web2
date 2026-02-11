import React, { useState, useMemo } from 'react';
import { Send, CheckCircle2, Zap, Thermometer, Shield, Radio, Sun, Wifi, Car, Home, Factory, Building2, Waves, Sprout, Droplets, Blinds, Calculator, Sparkles, History, Mail, Phone, MessageSquare, Loader2, AlertCircle, Check, Snowflake, DoorOpen, Camera, Flame, Upload, X } from 'lucide-react';
import VisionaryAssistant from './VisionaryAssistant';
import { Message, ContactFormProps } from '../types';
import SectionHeader from './SectionHeader';
import Breadcrumbs from './Breadcrumbs';
import emailjs from '@emailjs/browser';
import { supabase } from '../services/supabase';

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
}

const ContactForm: React.FC<ContactFormProps> = ({ isStandalone = false, setView }) => {
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
    gdprConsent: false,
    techSupplyInterest: false,
    distributionBoardInterest: false,
    electricalInstallInterest: false,
    projectFiles: []
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
    { id: 'network', label: 'Síťová infra', icon: <Wifi className="w-4 h-4" />, price: 25000 },
    { id: 'ev', label: 'Nabíjení EV / Wallbox', icon: <Car className="w-4 h-4" />, price: 30000 },
    { id: 'blinds', label: 'Stínění', icon: <Blinds className="w-4 h-4" />, price: 25000 },
    { id: 'pool', label: 'Bazénová techn.', icon: <Waves className="w-4 h-4" />, price: 60000 },
    { id: 'sauna', label: 'Sauna', icon: <Flame className="w-4 h-4" />, price: 35000 },
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

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    if (!supabase || files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `inquiries/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('File upload error:', uploadError);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('project-documents')
        .getPublicUrl(filePath);

      return publicUrl;
    });

    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gdprConsent) {
      setErrorMessage('Pro odeslání poptávky musíte souhlasit se zpracováním osobních údajů.');
      return;
    }

    setIsSending(true);
    setErrorMessage(null);

    try {
      // 0) Upload files to Supabase if any
      let fileLinks: string[] = [];
      if (formData.projectFiles.length > 0) {
        fileLinks = await uploadFiles(formData.projectFiles);
        console.log('Files uploaded successfully. Links:', fileLinks);
      }

      const templateParams = {
        customer_name: formData.name,
        customer_email: formData.email,
        phone: formData.phone,
        property_type: formData.property,
        selected_features: formData.features.length > 0
          ? formData.features.map(f => featureOptions.find(o => o.id === f)?.label).join(', ')
          : 'Žádné specifické systémy nevybrány',
        estimated_budget: estimatedTotal.toLocaleString('cs-CZ') + ' Kč',
        tech_supply: formData.techSupplyInterest ? 'ANO' : 'NE',
        distribution_board: formData.distributionBoardInterest ? 'ANO' : 'NE',
        electrical_install: formData.electricalInstallInterest ? 'ANO' : 'NE',
        has_attachments: formData.projectFiles.length > 0 ? `${formData.projectFiles.length} souborů` : 'NE',
        attachment_links: fileLinks.length > 0
          ? fileLinks.map(url => `<a href="${url}" target="_blank" style="color: #69C350; text-decoration: underline;">Stáhnout přílohu</a>`).join('<br>')
          : 'Žádné soubory nebyly nahrány',
        message: formData.message || 'Bez doplňující zprávy.',
        ai_history: aiMessages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n')
      };

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      const errorDetail = error?.text || error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      console.error('Submission Error:', errorDetail);
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
          title="Zhmotněte svou"
          highlight="Vizi"
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
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-black/10 dark:border-white/10 shadow-xl space-y-8 transition-all duration-500 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#69C350]/10 rounded-lg flex items-center justify-center text-[#69C350]">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight">{isStandalone ? 'Krok 2: Specifikace projektu' : 'Specifikace projektu'}</h3>
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

              <div className="space-y-3 text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Typ objektu</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ id: 'Rezidenční', icon: <Home className="w-3.5 h-3.5" /> }, { id: 'Komerční', icon: <Building2 className="w-3.5 h-3.5" /> }, { id: 'Průmyslová', icon: <Factory className="w-3.5 h-3.5" /> }].map(type => (
                    <button key={type.id} type="button" onClick={() => setFormData((prev) => ({ ...prev, property: type.id }))} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${formData.property === type.id ? 'bg-[#69C350] border-[#69C350] text-white shadow-lg shadow-[#7BD462]/20' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500'}`}>
                      {type.icon}
                      <span className="text-[9px] font-bold uppercase">{type.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Rozsah Loxone</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2">
                  {featureOptions.map(feature => (
                    <button key={feature.id} type="button" onClick={() => toggleFeature(feature.id)} className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-left transition-all ${formData.features.includes(feature.id) ? 'bg-[#69C350] text-white border-[#69C350] shadow-md' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500'}`}>
                      <div className="flex-shrink-0">{feature.icon}</div>
                      <span className="text-[9px] font-bold uppercase truncate">{feature.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1 text-left block">Další zájmy</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'techSupplyInterest', label: 'Mám zájem o dodávku technologií', icon: <Zap className="w-4 h-4" /> },
                    { id: 'distributionBoardInterest', label: 'Mám zájem o dodávku rozvaděče', icon: <Building2 className="w-4 h-4" /> },
                    { id: 'electricalInstallInterest', label: 'Mám zájem o kompletní elektro přípravu', icon: <Factory className="w-4 h-4" /> }
                  ].map((interest) => (
                    <div
                      key={interest.id}
                      onClick={() => setFormData(p => ({ ...p, [interest.id]: !p[interest.id as keyof FormData] }))}
                      className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${formData[interest.id as keyof FormData] ? 'bg-[#69C350]/10 border-[#69C350] text-[#69C350]' : 'bg-black/5 dark:bg-white/5 border-black/10 text-gray-500 hover:border-black/20 dark:hover:border-white/20'}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${formData[interest.id as keyof FormData] ? 'bg-[#69C350] border-[#69C350]' : 'border-black/10 dark:border-white/20'}`}>
                        {formData[interest.id as keyof FormData] && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex items-center gap-2">
                        {interest.icon}
                        <span className="text-[10px] font-bold uppercase">{interest.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Podklady k projektu</label>
                <div className="relative group">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="project-docs"
                  />
                  <label
                    htmlFor="project-docs"
                    className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-black/10 dark:border-white/10 rounded-[2rem] bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-all group-hover:border-[#69C350]/50"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#69C350]/10 flex items-center justify-center text-[#69C350] group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black uppercase text-gray-900 dark:text-white mb-1">Vložit podklady k projektu</p>
                      <p className="text-[10px] text-gray-500 font-medium tracking-wide leading-relaxed">PDF, JPG nebo PNG podklady náhledů vašeho půdorysu</p>
                    </div>
                  </label>
                </div>

                {formData.projectFiles.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {formData.projectFiles.map((file, idx) => (
                      <div key={idx} className="relative group/file bg-[#69C350]/5 border border-[#69C350]/20 rounded-xl p-3 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#69C350]/10 flex items-center justify-center text-[#69C350]">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-gray-900 dark:text-white truncate uppercase">{file.name}</p>
                          <p className="text-[8px] text-gray-500 font-medium uppercase tracking-wider">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/file:opacity-100 transition-opacity shadow-lg"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-4 px-5 text-gray-900 dark:text-white focus:outline-none focus:border-[#69C350] transition-all text-xs resize-none"
                />
              </div>

              {/* GDPR Consent Checkbox */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#69C350]/5 border border-[#69C350]/10 cursor-pointer group" onClick={() => setFormData(p => ({ ...p, gdprConsent: !p.gdprConsent }))}>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${formData.gdprConsent ? 'bg-[#69C350] border-[#69C350] shadow-lg' : 'border-black/10 dark:border-white/20'}`}>
                  {formData.gdprConsent && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    Souhlasím se <button type="button" onClick={(e) => { e.stopPropagation(); document.dispatchEvent(new CustomEvent('intechpro-open-cookies')); }} className="text-[#69C350] dark:text-[#95E87D] font-bold hover:underline">zpracováním osobních údajů</button> pro účely vyřízení této poptávky a technické konzultace.
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
                  <p className="text-[9px] font-black text-[#69C350] uppercase tracking-widest mb-1">Odhadovaná investice</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-gray-900 dark:text-white tabular-nums">{estimatedTotal.toLocaleString()}</span>
                    <span className="text-xs font-bold text-[#69C350]">Kč <span className="text-[10px] font-normal opacity-70">(bez DPH)</span></span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSending || !formData.gdprConsent}
                  className="w-full sm:w-auto bg-[#69C350] hover:bg-[#4BA038] text-white font-black uppercase tracking-[0.2em] py-5 px-12 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
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
