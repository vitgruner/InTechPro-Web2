
import React from 'react';

const Partners = ({ isStandalone = false }: { isStandalone?: boolean }) => {
  const partners = [
    { name: "Loxone", logo: "https://logo.clearbit.com/loxone.com" },
    { name: "Ampio", logo: "https://logo.clearbit.com/ampio.com.pl" },
    { name: "Schneider", logo: "https://logo.clearbit.com/se.com" },
    { name: "ABB", logo: "https://logo.clearbit.com/abb.com" },
    { name: "Hager", logo: "https://logo.clearbit.com/hager.com" },
    { name: "Jablotron", logo: "https://logo.clearbit.com/jablotron.com" },
    { name: "Siemens", logo: "https://logo.clearbit.com/siemens.com" },
    { name: "Satel", logo: "https://logo.clearbit.com/satel.pl" },
  ];

  // Duplicate for seamless loop
  const seamlessPartners = [...partners, ...partners];

  return (
    <section className={`py-12 md:py-20 bg-transparent transition-colors duration-500 border-t border-black/5 dark:border-white/5 overflow-hidden ${isStandalone ? 'pt-32 md:pt-40' : ''}`}>
       <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block animate-in fade-in slide-in-from-bottom-2">
           Certifikovaní partneři
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white transition-colors animate-in fade-in slide-in-from-bottom-3">
           Technologie, kterým <span className="text-gradient">věříme</span>
        </h2>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-r from-[#f4f7f9] dark:from-[#050505] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-l from-[#f4f7f9] dark:from-[#050505] to-transparent pointer-events-none"></div>
        
        <div className="flex w-max animate-scroll gap-8 md:gap-16 px-6">
          {seamlessPartners.map((p, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center justify-center gap-4 min-w-[120px] md:min-w-[160px] cursor-default"
            >
               <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center p-5 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:border-blue-600/30">
                  <img 
                    src={p.logo} 
                    alt={p.name} 
                    className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 dark:invert dark:group-hover:invert-0" 
                    onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       target.style.display = 'none';
                    }}
                  />
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {p.name}
               </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
