
import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Save, X, Cpu, Zap, Thermometer, Radio, Shield, Home, Building2, Factory, Loader2 } from 'lucide-react';
import { Reference, ReferenceService, ReferenceFormProps } from '../types';

const ReferenceForm: React.FC<ReferenceFormProps> = ({ onAdd, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Reference>>({
    title: '',
    category: 'Rezidenční',
    location: '',
    image: '',
    tech: 'Loxone',
    techIcon: 'cpu',
    services: []
  });

  const availableServices = [
    { label: 'Osvětlení', icon: 'zap', Lucide: <Zap className="w-3 h-3" /> },
    { label: 'HVAC', icon: 'thermometer', Lucide: <Thermometer className="w-3 h-3" /> },
    { label: 'Audio', icon: 'radio', Lucide: <Radio className="w-3 h-3" /> },
    { label: 'Bezpečnost', icon: 'shield', Lucide: <Shield className="w-3 h-3" /> },
    { label: 'Automatizace', icon: 'cpu', Lucide: <Cpu className="w-3 h-3" /> }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onAdd({
        ...formData,
        techIcon: formData.techIcon || 'cpu',
      } as Reference);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hlavní vizuál projektu</label>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden glass-panel border-dashed border-2 border-black/10 dark:border-white/10 group">
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
                    <ImageIcon className="w-12 h-12 text-gray-300 mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nahrát soubor (JPG, PNG)</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
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
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-blue-600 transition-all dark:text-white"
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
                  className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-blue-600 transition-all dark:text-white"
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
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                        formData.category === cat.id 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' 
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                      formData.services?.find(s => s.label === service.label)
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
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

          <div className="pt-10 flex flex-col sm:flex-row gap-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              {isSubmitting ? 'Synchronizace se serverem...' : 'Uložit do cloudové databáze'}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="px-10 py-6 glass-panel rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all dark:text-white"
            >
              Zrušit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferenceForm;
