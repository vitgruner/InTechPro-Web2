
import React, { useState, useMemo } from 'react';
import { 
  Home, Zap, Search, Filter, LayoutGrid, Building2, Factory, 
  Cpu, Thermometer, Radio, Shield, Sun, Building 
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
  'building2': Building2
};

const ReferenceCard: React.FC<ReferenceCardProps> = ({ image, title, location, tech, services = [], techIcon }) => {
  const TechIconComp = IconMap[techIcon as string] || Cpu;

  return (
    <div className="group relative glass-panel rounded-[2.5rem] overflow-hidden border border-black/10 dark:border-white/10 hover:border-blue-600/30 dark:hover:border-blue-500/30 transition-all duration-700 hover:-translate-y-2 shadow-sm hover:shadow-2xl">
      <div className="relative h-72 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 dark:from-[#050505] via-transparent to-transparent opacity-80"></div>
        
        <div className="absolute top-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-xl">
          <TechIconComp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.15em]">{tech}</span>
        </div>
      </div>

      <div className="p-8 md:p-10">
        <div className="mb-6 text-left">
          <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.3em] mb-2 block">{location}</span>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white transition-colors duration-500 tracking-tight">{title}</h3>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2.5">
            {services.map((service, idx) => {
              const ServiceIcon = IconMap[service.icon as string] || Zap;
              return (
                <div key={idx} className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-black/5 dark:border-white/5 transition-colors hover:bg-blue-600/5">
                  <span className="text-blue-600 dark:text-blue-400"><ServiceIcon className="w-3 h-3" /></span>
                  <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">{service.label}</span>
                </div>
              );
            })}
          </div>
          
          <div className="pt-6 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
            <div className="flex flex-col text-left">
              <span className="text-[9px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-1.5">Komplexita systému</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`w-4 h-1.5 rounded-full transition-colors duration-500 ${i <= 4 ? 'bg-blue-600 dark:bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.3)]' : 'bg-gray-200 dark:bg-gray-800'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const References: React.FC<ReferencesProps> = ({ projects = [], isStandalone = false }) => {
  const [filter, setFilter] = useState('Vše');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const safeProjects = projects || [];
    return safeProjects.filter((p: Reference) => {
      const matchesFilter = filter === 'Vše' || p.category === filter;
      if (!matchesFilter) return false;
      if (!query) return true;
      const servicesString = (p.services || []).map((s: ReferenceService) => s.label).join(' ');
      const searchableContent = [p.title, p.location, p.category, p.tech, servicesString].join(' ').toLowerCase();
      return searchableContent.includes(query);
    });
  }, [filter, searchQuery, projects]);

  const categories = [
    { label: 'Vše', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { label: 'Rezidenční', icon: <Home className="w-3.5 h-3.5" /> },
    { label: 'Komerční', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'Průmyslová', icon: <Factory className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="references" className={`transition-all duration-700 pb-16 md:pb-24 ${isStandalone ? 'pt-32 md:pt-40' : 'pt-16 md:pt-24'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-20 text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/20 dark:border-blue-400/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Výběr z portfolia
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight transition-colors duration-500 mb-6">
              Naše globální <span className="text-gradient">Realizace</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xl font-medium transition-colors max-w-2xl">
              Definitivní kolekce projektů s vysokou věrností v rezidenčním, komerčním i průmyslovém sektoru.
            </p>
          </div>
        </div>

        <div className="mb-12 md:mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
           <div className="flex flex-wrap items-center gap-3 p-2 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2rem] shadow-sm backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setFilter(cat.label)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === cat.label 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
                    : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                  <span className={`ml-1 text-[8px] opacity-60 ${filter === cat.label ? 'text-white' : 'text-blue-600'}`}>
                    ({cat.label === 'Vše' ? projects.length : projects.filter((p: Reference) => p.category === cat.label).length})
                  </span>
                </button>
              ))}
           </div>

           <div className="relative group w-full lg:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Hledat (název, technologie, město...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-[2rem] bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm font-medium"
              />
           </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredProjects.map((project: Reference, idx: number) => (
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
      </div>
    </section>
  );
};

export default References;
