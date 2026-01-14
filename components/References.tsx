
import React, { useState, useMemo } from 'react';
import { 
  Home, Zap, Search, Filter, LayoutGrid, Building2, Factory, 
  Cpu, Thermometer, Radio, Shield, Sun, Building, Activity, ArrowRight 
} from 'lucide-react';
import { Reference, ReferenceCardProps, ReferencesProps, ReferenceService } from '../types';

// Map for resolving string keys back to Lucide components
const IconMap: Record<string, React.ElementType> = {
  'home': Home,
  'zap': Zap,
  'cpu': Cpu,
  'thermometer': Thermometer,
  'radio': Radio,
  'shield': Shield,
  'sun': Sun,
  'building': Building,
  'factory': Factory,
  'building2': Building2,
  'activity': Activity
};

const ReferenceCard: React.FC<ReferenceCardProps> = ({ image, title, location, tech, services = [], techIcon }) => {
  // Defensive icon lookup with fallback to Cpu
  const iconKey = (techIcon as string)?.toLowerCase();
  const TechIconComp = IconMap[iconKey] || Cpu;

  return (
    <div className="group relative glass-panel rounded-2xl md:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-blue-600/30 dark:hover:border-blue-500/30 transition-all duration-700 hover:-translate-y-1 shadow-sm hover:shadow-xl">
      <div className="relative h-36 md:h-48 overflow-hidden">
        <img 
          src={image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 dark:from-[#050505] via-transparent to-transparent opacity-80"></div>
        
        <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/20 px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl flex items-center gap-1.5 shadow-xl">
          <TechIconComp className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[7px] md:text-[9px] font-black text-gray-900 dark:text-white uppercase tracking-[0.15em]">{tech}</span>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="mb-3 md:mb-4 text-left">
          <span className="text-[7px] md:text-[9px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] mb-1 block truncate">{location}</span>
          <h3 className="text-sm md:text-lg font-black text-gray-900 dark:text-white transition-colors duration-500 tracking-tight leading-tight line-clamp-2">{title}</h3>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {services && services.slice(0, 3).map((service, idx) => {
              const sIconKey = (service.icon as string)?.toLowerCase();
              const ServiceIcon = IconMap[sIconKey] || Zap;
              return (
                <div key={idx} className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg border border-black/5 dark:border-white/5 transition-colors hover:bg-blue-600/5">
                  <span className="text-blue-600 dark:text-blue-400"><ServiceIcon className="w-2.5 h-2.5 md:w-3 md:h-3" /></span>
                  <span className="text-[7px] md:text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight truncate max-w-[80px] md:max-w-none">{service.label}</span>
                </div>
              );
            })}
             {services.length > 3 && (
                <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg border border-black/5 dark:border-white/5">
                   <span className="text-[7px] md:text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">+{services.length - 3}</span>
                </div>
             )}
          </div>
          
          <div className="pt-3 md:pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
            <div className="flex flex-col text-left">
              <span className="text-[7px] md:text-[8px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1">Systém</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-2.5 md:w-3 h-1 rounded-full transition-colors duration-500 ${i <= 4 ? 'bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.3)]' : 'bg-gray-200 dark:bg-gray-800'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const References: React.FC<ReferencesProps> = ({ projects = [], isStandalone = false, setView }) => {
  const [filter, setFilter] = useState('Vše');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    // Safety check for projects being an array
    const safeProjects = Array.isArray(projects) ? projects : [];
    
    return safeProjects.filter((p: Reference) => {
      const matchesFilter = filter === 'Vše' || p.category === filter;
      if (!matchesFilter) return false;
      if (!query) return true;
      const servicesString = (p.services || []).map((s: ReferenceService) => s.label).join(' ');
      const searchableContent = [p.title, p.location, p.category, p.tech, servicesString].join(' ').toLowerCase();
      return searchableContent.includes(query);
    });
  }, [filter, searchQuery, projects]);

  // Pokud jsme na homepage (!isStandalone), zobrazíme maximálně 2 projekty (z celkového seznamu projects, ignorujeme filtr)
  // Pokud jsme v samostatném zobrazení, zobrazíme filtrované projekty
  const displayProjects = isStandalone ? filteredProjects : (Array.isArray(projects) ? projects.slice(0, 2) : []);

  const categories = [
    { label: 'Vše', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { label: 'Rezidenční', icon: <Home className="w-3.5 h-3.5" /> },
    { label: 'Komerční', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'Průmyslová', icon: <Factory className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="references" className={`transition-all duration-700 pb-10 md:pb-24 ${isStandalone ? 'pt-24 md:pt-40' : 'pt-10 md:pt-24'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 md:mb-16 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/20 dark:border-blue-400/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6">
              Výběr z portfolia
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 mb-4 md:mb-6">
              Naše globální <span className="text-gradient">Realizace</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-xl font-medium transition-colors max-w-2xl">
              Definitivní kolekce projektů s vysokou věrností v rezidenčním, komerčním i průmyslovém sektoru.
            </p>
          </div>
        </div>

        {isStandalone && (
          <div className="mb-8 md:mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl shadow-sm backdrop-blur-md w-full lg:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    onClick={() => setFilter(cat.label)}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap w-full ${
                      filter === cat.label 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {cat.icon}
                    {cat.label}
                    <span className={`ml-0.5 text-[8px] opacity-60 ${filter === cat.label ? 'text-white' : 'text-blue-600'}`}>
                      ({cat.label === 'Vše' ? (Array.isArray(projects) ? projects.length : 0) : (Array.isArray(projects) ? projects.filter((p: Reference) => p.category === cat.label).length : 0)})
                    </span>
                  </button>
                ))}
             </div>

             <div className="relative group w-full lg:w-80">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Hledat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-5 py-3 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs font-medium"
                />
             </div>
          </div>
        )}

        {displayProjects && displayProjects.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {displayProjects.map((project: Reference, idx: number) => (
              <ReferenceCard key={idx} {...project} />
            ))}
          </div>
        ) : (
          <div className="py-24 md:py-32 text-center glass-panel rounded-[3rem] border-dashed border-2 border-black/10 dark:border-white/10">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 uppercase tracking-widest">Žádné shody nenalezeny</h3>
            <p className="text-sm text-gray-400 mt-2">Zkuste upravit filtry nebo vyhledávací dotaz.</p>
          </div>
        )}

        {!isStandalone && setView && (
           <div className="mt-8 md:mt-12 flex justify-center">
             <button 
               onClick={() => setView('showcase')}
               className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
             >
               Zobrazit všechny reference
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
           </div>
        )}
      </div>
    </section>
  );
};

export default References;
