import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Save, X, Cpu, Zap, Thermometer, Radio, Shield, Home, Building2, Factory, Loader2, CheckCircle } from 'lucide-react';
import { Reference, ReferenceService, ReferenceFormProps } from '../types';

const ReferenceForm: React.FC<ReferenceFormProps> = ({ onAdd, onCancel, initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  const defaultData: Partial<Reference> = {
    title: '',
    category: 'Rezidenční',
    location: '',
    image: '',
    tech: 'Loxone',
    techIcon: 'cpu',
    services: []
  };

  const [formData, setFormData] = useState<Partial<Reference>>(initialData || defaultData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setSubmitStatus('idle');
    }
  }, [initialData]);

  const availableServices = [
    { label: 'Osvětlení', icon: 'zap', Lucide: <Zap className="w-3 h-3" /> },
    { label: 'HVAC', icon: 'thermometer', Lucide: <Thermometer className="w-3 h-3" /> },
    { label: 'Audio', icon: 'radio', Lucide: <Radio className="w-3 h-3" /> },
    { label: 'Bezpečnost', icon: 'shield', Lucide: <Shield className="w-3 h-3" /> },
    { label: 'Automatizace', icon: 'cpu', Lucide: <Cpu className="w-3 h-3" /> }
  ];

  const compressImage = (base64Str: string, maxWidth = 1200, maxHeight = 1200): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // Compress to JPEG with 0.7 quality
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const originalBase64 = reader.result as string;
        const compressed = await compressImage(originalBase64);
        setFormData(prev => ({ ...prev, image: compressed }));
        setValidationError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleService = (label: string, icon: string) => {
    setFormData(prev => {
      const services = prev.services || [];
      const exists = services.find(s => s.label === label);
      if (exists) {
        return { ...prev, services: services.filter(s => s.label !== label) };
      }
      return { ...prev, services: [...services, { label, icon }] };
    });
  };

  const resetForm = () => {
    setFormData(defaultData);
    setSubmitStatus('idle');
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.title) {
      setValidationError('Prosím zadejte název projektu.');
      return;
    }
    if (!formData.image) {
      setValidationError('Prosím nahrajte obrázek projektu.');
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);
    try {
      const success = await onAdd({
        ...formData,
        techIcon: formData.techIcon || 'cpu',
      } as Reference);

      if (success) {
        setSubmitStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="max-w-xl mx-auto py-20 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-[#69C350] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#69C350]/30">
          <Save className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-gray-900 dark:text-white">
          {initialData ? 'Projekt aktualizován!' : 'Projekt úspěšně uložen!'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 font-bold">Váš projekt byl synchronizován s cloudovou databází Supabase.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!initialData && (
            <button
              type="button"
              onClick={resetForm}
              className="px-10 py-5 bg-[#69C350] text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-[#4BA038] transition-all shadow-xl shadow-[#7BD462]/20"
            >
              Přidat další referenci
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="px-10 py-5 glass-panel rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-all dark:text-white"
          >
            Zpět na úvod
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hlavní vizuál projektu</label>
              <div className={`relative aspect-video rounded-[2rem] overflow-hidden glass-panel border-dashed border-2 ${validationError && !formData.image ? 'border-red-500/50' : 'border-black/10 dark:border-white/10'} group transition-colors`}>
                {formData.image ? (
                  <>
                    <img src={formData.image} className="w-full h-full object-cover" alt="Náhled" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-full hover:bg-red-500 transition-all shadow-xl"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    <ImageIcon className={`w-12 h-12 mb-4 group-hover:scale-110 transition-transform ${validationError && !formData.image ? 'text-red-400' : 'text-gray-300'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${validationError && !formData.image ? 'text-red-400' : 'text-gray-400'}`}>Nahrát soubor (JPG, PNG)</span>
                    <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Název projektu</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, title: e.target.value }));
                    if (validationError) setValidationError(null);
                  }}
                  className={`w-full bg-black/5 dark:bg-white/5 border rounded-2xl py-4 px-6 text-sm focus:outline-none transition-all dark:text-white ${validationError && !formData.title ? 'border-red-500/50' : 'border-black/10 dark:border-white/10 focus:border-[#69C350]'}`}
                  placeholder="např. Villa Futurista"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lokalita</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-[#69C350] transition-all dark:text-white"
                  placeholder="např. Praha, Česká republika"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kategorie objektu</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Rezidenční', icon: <Home className="w-4 h-4" /> },
                    { id: 'Komerční', icon: <Building2 className="w-4 h-4" /> },
                    { id: 'Průmyslová', icon: <Factory className="w-4 h-4" /> }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${formData.category === cat.id
                        ? 'bg-[#69C350] text-white border-[#69C350] shadow-lg shadow-[#7BD462]/20'
                        : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-500'
                        }`}
                    >
                      {cat.icon}
                      <span className="text-[8px] font-bold uppercase">{cat.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Použitá technologie</label>
                <select
                  value={formData.tech}
                  onChange={(e) => {
                    const tech = e.target.value;
                    let icon = 'cpu';
                    if (tech === 'KNX' || tech === 'DALI') icon = 'building';
                    setFormData(prev => ({ ...prev, tech, techIcon: icon }));
                  }}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none cursor-pointer dark:text-white"
                >
                  {['Loxone', 'KNX', 'Ampio', 'DALI', 'Modbus'].map(t => (
                    <option key={t} value={t} className="bg-white dark:bg-[#1a1d21]">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Integrované služby</label>
              <div className="grid grid-cols-2 gap-3">
                {availableServices.map((service) => (
                  <button
                    key={service.label}
                    type="button"
                    onClick={() => toggleService(service.label, service.icon)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${formData.services?.find(s => s.label === service.label)
                      ? 'bg-[#69C350] text-white border-[#69C350] shadow-md'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-gray-500'
                      }`}
                  >
                    {service.Lucide}
                    <span className="text-[9px] font-bold uppercase">{service.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Topologie Systému (Statistiky)</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Senzory (ks)</label>
                <input
                  type="number"
                  value={formData.topology?.sensors || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    topology: { ...(prev.topology || { sensors: 0, cablingKm: 0, modules: 0, racks: 0 }), sensors: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#69C350] transition-all dark:text-white"
                  placeholder="např. 142"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Kabeláž (km)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.topology?.cablingKm || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    topology: { ...(prev.topology || { sensors: 0, cablingKm: 0, modules: 0, racks: 0 }), cablingKm: parseFloat(e.target.value) || 0 }
                  }))}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#69C350] transition-all dark:text-white"
                  placeholder="např. 3.2"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Moduly (ks)</label>
                <input
                  type="number"
                  value={formData.topology?.modules || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    topology: { ...(prev.topology || { sensors: 0, cablingKm: 0, modules: 0, racks: 0 }), modules: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#69C350] transition-all dark:text-white"
                  placeholder="např. 48"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Pole / Rozvaděče</label>
                <input
                  type="number"
                  value={formData.topology?.racks || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    topology: { ...(prev.topology || { sensors: 0, cablingKm: 0, modules: 0, racks: 0 }), racks: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#69C350] transition-all dark:text-white"
                  placeholder="např. 2"
                />
              </div>
            </div>
          </div>

          <div className="pt-10 space-y-4">
            {validationError && (
              <div className="text-red-500 text-xs font-bold uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-2">
                ⚠️ {validationError}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-500 text-xs font-bold uppercase tracking-widest text-center animate-in fade-in slide-in-from-top-2">
                ❌ Došlo k chybě při ukládání. Zkuste to prosím znovu.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#69C350] text-white py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-[#4BA038] transition-all shadow-xl shadow-[#7BD462]/20 flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                {isSubmitting ? 'Synchronizace se serverem...' : (initialData ? 'Aktualizovat v cloudu' : 'Uložit do cloudové databáze')}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-10 py-6 glass-panel rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all dark:text-white"
              >
                Zrušit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferenceForm;
