
import React, { useState, useMemo } from 'react';
import { 
  Home, Zap, Search, Filter, LayoutGrid, Building2, Factory, 
  Cpu, Thermometer, Radio, Shield, Sun, Building, Activity, ArrowRight,
  Network, Share2, Ruler, Server, X
} from 'lucide-react';
import { Reference, ReferenceCardProps, ReferencesProps, ReferenceService } from '../types';
import SectionHeader from './SectionHeader';
import Partners from './Partners';

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

const ReferenceCard: React.FC<ReferenceCardProps> = ({ image, title, location, tech, services = [], techIcon, topology }) => {
  const [showTopology, setShowTopology] = useState(false);
  const iconKey = (techIcon as string)?.toLowerCase();
  const TechIconComp = IconMap[iconKey] || Cpu;

  return (
    <div className="group relative glass-panel rounded-2xl md:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-blue-600/30 dark:hover:border-blue-500/30 transition-all duration-700 hover:-translate-y-1 shadow-sm hover:shadow-xl h-full flex flex-col">
      
      {/* Image / Topology Container */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100 dark:bg-gray-900">
        
        {/* Normal Image View */}
        <div className={`absolute inset-0 transition-all duration-500 ${showTopology ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
           <img 
            src={image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-[#050505] via-transparent to-transparent opacity-90"></div>
          
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
            <TechIconComp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-[9px] font-black text-gray-900 dark:text-white uppercase tracking-[0.15em]">{tech}</span>
          </div>
        </div>

        {/* Topology View (Overlay) - Updated Background & Mobile Fit */}
        <div className={`absolute inset-0 bg-[#f4f7f9]/95 dark:bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center p-2 md:p-4 transition-all duration-300 ${showTopology ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
           {/* Grid Background */}
           <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
           
           {/* Header */}
           <div className="relative z-10 flex items-center gap-2 mb-2 md:mb-3 w-full justify-center border-b border-gray-200 dark:border-white/10 pb-1.5 md:pb-2 mx-4">
             <Network className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" /> 
             <span className="text-gray-900 dark:text-white text-[10px] font-black uppercase tracking-widest">Topologie</span>
           </div>

           {/* Close Button */}
           <button 
             onClick={(e) => { e.stopPropagation(); setShowTopology(false); }}
             className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-white transition-colors z-20 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
           >
             <X className="w-4 h-4" />
           </button>

           {topology ? (
             <div className="grid grid-cols-2 gap-1.5 md:gap-2 w-full max-w-[220px] relative z-10">
                <div className="bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 p-1.5 md:p-2 rounded-xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-colors">
                   <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-0.5 md:mb-1" />
                   <span className="text-base md:text-lg font-black text-gray-900 dark:text-white tabular-nums leading-none">{topology.sensors}</span>
                   <span className="text-[7px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-0.5">Senzorů</span>
                </div>
                <div className="bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 p-1.5 md:p-2 rounded-xl flex flex-col items-center justify-center hover:border-lime-500/30 transition-colors">
                   <Ruler className="w-5 h-5 text-lime-600 dark:text-lime-400 mb-0.5 md:mb-1" />
                   <span className="text-base md:text-lg font-black text-gray-900 dark:text-white tabular-nums leading-none">{topology.cablingKm}</span>
                   <span className="text-[7px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-0.5">km Kabelů</span>
                </div>
                <div className="bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 p-1.5 md:p-2 rounded-xl flex flex-col items-center justify-center hover:border-purple-500/30 transition-colors">
                   <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-0.5 md:mb-1" />
                   <span className="text-base md:text-lg font-black text-gray-900 dark:text-white tabular-nums leading-none">{topology.modules}</span>
                   <span className="text-[7px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-0.5">Modulů</span>
                </div>
                <div className="bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 p-1.5 md:p-2 rounded-xl flex flex-col items-center justify-center hover:border-orange-500/30 transition-colors">
                   <Server className="w-5 h-5 text-orange-600 dark:text-orange-400 mb-0.5 md:mb-1" />
                   <span className="text-base md:text-lg font-black text-gray-900 dark:text-white tabular-nums leading-none">{topology.racks}</span>
                   <span className="text-[7px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-0.5">Rozvaděče</span>
                </div>
             </div>
           ) : (
              <div className="text-gray-500 text-[10px] font-mono relative z-10">Data nedostupná</div>
           )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4 text-left">
          <span className="text-[9px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] mb-1.5 block truncate">{location}</span>
          <h3 className="text-lg font-black text-gray-900 dark:text-white transition-colors duration-500 tracking-tight leading-tight line-clamp-2">{title}</h3>
        </div>

        <div className="space-y-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {services && services.slice(0, 3).map((service, idx) => {
              const sIconKey = (service.icon as string)?.toLowerCase();
              const ServiceIcon = IconMap[sIconKey] || Zap;
              return (
                <div key={idx} className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-black/5 dark:border-white/5 transition-colors hover:bg-blue-600/5">
                  <span className="text-blue-600 dark:text-blue-400"><ServiceIcon className="w-3 h-3" /></span>
                  <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight truncate max-w-[100px]">{service.label}</span>
                </div>
              );
            })}
             {services.length > 3 && (
                <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                   <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">+{services.length - 3}</span>
                </div>
             )}
          </div>
          
          <div className="pt-4 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
             {topology ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowTopology(!showTopology); }}
                  className="text-[9px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Network className="w-3 h-3" />
                  {showTopology ? 'Zavřít data' : 'Zobrazit topologii'}
                </button>
             ) : (
                <div className="w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 w-3/4 rounded-full opacity-50" />
                </div>
             )}
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

  const displayProjects = isStandalone ? filteredProjects : (Array.isArray(projects) ? projects.slice(0, 3) : []);

  const categories = [
    { label: 'Vše', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { label: 'Rezidenční', icon: <Home className="w-3.5 h-3.5" /> },
    { label: 'Komerční', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'Průmyslová', icon: <Factory className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="references" className={`transition-all duration-700 ${isStandalone ? 'pt-24 md:pt-36 pb-0' : 'pt-8 md:pt-16 pb-8 md:pb-16'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          eyebrow="Výběr z portfolia"
          title="Naše globální"
          highlight="Realizace"
          description="Definitivní kolekce projektů s vysokou věrností v rezidenčním, komerčním i průmyslovém sektoru."
          align={isStandalone ? 'left' : 'center'}
        />

        {isStandalone && (
          <div className="mb-8 md:mb-10 flex flex-col lg:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayProjects.map((project: Reference, idx: number) => (
              <ReferenceCard key={idx} {...project} />
            ))}
          </div>
        ) : (
          <div className="py-16 md:py-24 text-center glass-panel rounded-[3rem] border-dashed border-2 border-black/10 dark:border-white/10">
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

        {isStandalone && <Partners />}
      </div>
    </section>
  );
};

export default References;
