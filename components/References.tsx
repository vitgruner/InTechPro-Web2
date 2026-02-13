import React, { useState, useMemo } from 'react';
import {
  Home, Zap, Search, Filter, LayoutGrid, Building2, Factory,
  Cpu, Thermometer, Radio, Shield, Sun, Building, Activity, ArrowRight,
  Share2, Ruler, Server, Snowflake, Wind, Blinds, DoorOpen, Lightbulb, Camera, Flame, Car, Droplets, Image as ImageIcon,
  Calendar, Maximize, Layers, CheckCircle2
} from 'lucide-react';
import { Reference, ReferenceCardProps, ReferencesProps } from '../types';
import SectionHeader from './SectionHeader';
import Breadcrumbs from './Breadcrumbs';
import ReferenceDetailModal from './ReferenceDetailModal';

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
  'activity': Activity,
  'snowflake': Snowflake,
  'wind': Wind,
  'blinds': Blinds,
  'dooropen': DoorOpen,
  'lightbulb': Lightbulb,
  'camera': Camera,
  'flame': Flame,
  'car': Car,
  'droplets': Droplets
};


const ReferenceCard: React.FC<ReferenceCardProps & { onClick?: () => void }> = ({ image, images, title, location, tech, services = [], technologies, techIcon, topology, description, onClick }) => {
  const iconKey = (techIcon as string)?.toLowerCase();
  const TechIconComp = IconMap[iconKey] || Cpu;

  // Use images array if available, fallback to image field for backward compatibility
  const imageArray = (images && images.length > 0) ? images : (image ? [image] : []);
  const displayImage = imageArray[0];
  const hasMultipleImages = imageArray.length > 1;

  // Use technologies if available, otherwise fall back to services
  const displayTechs = technologies && technologies.length > 0 ? technologies : services;

  // Optimalizace Unsplash URL pro web (přidání q a w parametrů)
  const optimizedImage = useMemo(() => {
    if (displayImage?.includes('unsplash.com')) {
      return `${displayImage.split('?')[0]}?auto=format&fit=crop&q=70&w=600`;
    }
    return displayImage;
  }, [displayImage]);

  return (
    <div
      onClick={onClick}
      className="group relative glass-panel rounded-2xl md:rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-[#69C350]/30 dark:hover:border-[#7BD462]/30 transition-all duration-700 shadow-sm hover:shadow-xl h-full flex flex-col active:scale-[0.99] active:opacity-95 cursor-pointer"
    >
      <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={optimizedImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=70&w=600"}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-[#050505] via-transparent to-transparent opacity-90"></div>

        {/* Multi-image indicator */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
            <ImageIcon className="w-3 h-3 text-white" />
            <span className="text-[10px] font-bold text-white">{imageArray.length}</span>
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
          <TechIconComp className="w-3.5 h-3.5 text-[#69C350] dark:text-[#95E87D]" aria-hidden="true" />
          <span className="text-[9px] font-black text-gray-900 dark:text-white uppercase tracking-[0.15em]">{tech}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3 text-left">
          <span className="text-[9px] font-black text-[#69C350] dark:text-[#7BD462] uppercase tracking-[0.2em] mb-1.5 block truncate">{location}</span>
          <h3 className="text-lg font-black text-gray-900 dark:text-white transition-colors duration-500 tracking-tight leading-tight line-clamp-2">{title}</h3>
          <div className="h-[34px] mt-2">
            {description && (
              <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4 mt-auto">
          <div className="flex flex-wrap gap-2">
            {displayTechs && displayTechs.slice(0, 8).map((tech, idx) => {
              const tIconKey = (tech.icon as string)?.toLowerCase();
              const TechIcon = IconMap[tIconKey] || Zap;
              return (
                <div key={idx} className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-black/5 dark:border-white/5 transition-colors hover:bg-[#69C350]/5">
                  <span className="text-[#69C350] dark:text-[#95E87D]"><TechIcon className="w-3 h-3" aria-hidden="true" /></span>
                  <span className="text-[9px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight truncate max-w-[100px]">{tech.label}</span>
                </div>
              );
            })}
            {displayTechs && displayTechs.length > 8 && (
              <div className="flex items-center justify-center bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                <span className="text-[11px] font-black text-gray-500 dark:text-gray-400">...</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-black/5 dark:border-white/10">
            {topology && (
              <div className="grid grid-cols-2 gap-2">
                {/* Year */}
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Rok realizace</span>
                    <span className="text-[10px] font-black font-mono text-gray-900 dark:text-white leading-none">{topology.year}</span>
                  </div>
                  <Calendar className="w-3 h-3 text-[#69C350] dark:text-[#7BD462] opacity-80" />
                </div>
                {/* Area */}
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Plocha domu</span>
                    <span className="text-[10px] font-black font-mono text-gray-900 dark:text-white leading-none">{topology.area} m2</span>
                  </div>
                  <Maximize className="w-3 h-3 text-lime-600 dark:text-lime-500 opacity-80" />
                </div>
                {/* Zones */}
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Řízené zóny</span>
                    <span className="text-[10px] font-black font-mono text-gray-900 dark:text-white leading-none">{topology.zones}</span>
                  </div>
                  <Layers className="w-3 h-3 text-orange-500 dark:text-orange-400 opacity-80" />
                </div>
                {/* Scope */}
                <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Rozsah dodávky</span>
                    <span className="text-[10px] font-black font-mono text-gray-900 dark:text-white leading-none">{topology.scope}</span>
                  </div>
                  <CheckCircle2 className="w-3 h-3 text-purple-600 dark:text-purple-400 opacity-80" aria-hidden="true" />
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
  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);

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
          title="Naše "
          highlight="Realizace"
          description="Přehled realizovaných projektů."
          align={isStandalone ? 'left' : 'center'}
        />

        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayProjects.map((project: Reference, idx: number) => (
              <ReferenceCard
                key={idx}
                {...project}
                onClick={() => setSelectedReference(project)}
              />
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
              className="group flex items-center gap-3 px-8 py-4 bg-[#69C350] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#4BA038] transition-all shadow-xl shadow-[#7BD462]/20"
            >
              Zobrazit všechny reference
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Reference Detail Modal */}
      <ReferenceDetailModal
        reference={selectedReference}
        isOpen={!!selectedReference}
        onClose={() => setSelectedReference(null)}
      />
    </section>
  );
};

export default References;
