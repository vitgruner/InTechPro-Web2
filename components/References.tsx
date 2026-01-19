
import React, { useState, useMemo } from 'react';
import {
  Home, Zap, Search, Filter, LayoutGrid, Building2, Factory,
  Cpu, Thermometer, Radio, Shield, Sun, Building, Activity, ArrowRight,
  Share2, Ruler, Server
} from 'lucide-react';
import { Reference, ReferenceCardProps, ReferencesProps, ReferenceService } from '../types';
import SectionHeader from './SectionHeader';
import Partners from './Partners';
import Breadcrumbs from './Breadcrumbs';

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
  const iconKey = (techIcon as string)?.toLowerCase();
  const TechIconComp = IconMap[iconKey] || Cpu;

  // Optimalizace Unsplash URL pro web (přidání q a w parametrů)
  const optimizedImage = useMemo(() => {
    if (image?.includes('unsplash.com')) {
      return `${image.split('?')[0]}?auto=format&fit=crop&q=70&w=600`;
    }
    return image;
  }, [image]);

  return (
    <div className="group relative glass-panel rounded-2xl md:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-blue-600/30 dark:hover:border-blue-500/30 transition-all duration-700 shadow-sm hover:shadow-xl h-full flex flex-col active:scale-[0.99] active:opacity-95">
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={optimizedImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=70&w=600"}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-[#050505] via-transparent to-transparent opacity-90"></div>

        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
          <TechIconComp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[9px] font-black text-gray-900 dark:text-white uppercase tracking-[0.15em]">{tech}</span>
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
          </div>

          <div className="pt-4 border-t border-black/5 dark:border-white/10">
            {topology && (
              <div className="grid grid-cols-2 gap-2">
                {/* Senzory */}
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Senzory</span>
                    <span className="text-[10px] font-black font-mono text-gray-900 dark:text-white leading-none">{topology.sensors}</span>
                  </div>
                  <Share2 className="w-3 h-3 text-blue-600 dark:text-blue-500 opacity-80" />
                </div>
                {/* Kabeláž */}
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Kabeláž</span>
                    <span className="text-[10px] font-black font-mono text-gray-900 dark:text-white leading-none">{topology.cablingKm}km</span>
                  </div>
                  <Ruler className="w-3 h-3 text-lime-600 dark:text-lime-500 opacity-80" />
                </div>
                {/* Moduly */}
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Moduly</span>
                    <span className="text-[10px] font-black font-mono text-gray-900 dark:text-white leading-none">{topology.modules} ks</span>
                  </div>
                  <Cpu className="w-3 h-3 text-orange-500 dark:text-orange-400 opacity-80" />
                </div>
                {/* Rozvaděče */}
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Pole</span>
                    <span className="text-[10px] font-black font-mono text-gray-900 dark:text-white leading-none">{topology.racks}x</span>
                  </div>
                  <Server className="w-3 h-3 text-purple-600 dark:text-purple-400 opacity-80" />
                </div>
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
      const searchableContent = [p.title, p.location, p.category, p.tech].join(' ').toLowerCase();
      return searchableContent.includes(query);
    });
  }, [filter, searchQuery, projects]);

  const displayProjects = isStandalone ? filteredProjects : (Array.isArray(projects) ? projects.slice(0, 3) : []);

  return (
    <section id="references" className={`transition-all duration-700 ${isStandalone ? 'pt-28 md:pt-32 pb-16 md:pb-24' : 'pt-8 md:pt-16 pb-8 md:pb-16'}`}>
      <div className="max-w-7xl mx-auto px-6">
        {isStandalone && setView && (
          <Breadcrumbs items={[{ label: 'Reference' }]} setView={setView} />
        )}

        <SectionHeader
          eyebrow="Výběr z portfolia"
          title="Naše globální"
          highlight="Realizace"
          description="Definitivní kolekce projektů s vysokou věrností v rezidenčním, komerčním i průmyslovém sektoru."
          align={isStandalone ? 'left' : 'center'}
        />

        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayProjects.map((project: Reference, idx: number) => (
              <ReferenceCard key={idx} {...project} />
            ))}
          </div>
        ) : (
          <div className="py-16 md:py-24 text-center glass-panel rounded-[3rem] border-dashed border-2 border-black/10">
            <h3 className="text-xl font-bold text-gray-500 uppercase tracking-widest">Žádné shody nenalezeny</h3>
          </div>
        )}

        {!isStandalone && setView && (
          <div className="mt-8 md:mt-12 flex justify-center">
            <button
              onClick={() => setView('reference')}
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
