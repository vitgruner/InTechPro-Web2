
import React from 'react';

const Partners = ({ isStandalone = false }: { isStandalone?: boolean }) => {
  const partners = [
    { name: "Loxone", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Loxone_Logo.svg" },
    { name: "Schneider", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Schneider_Electric_2007.svg" },
    { name: "ABB", logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/ABB_logo.svg" },
    { name: "Siemens", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg" },
    { name: "Hager", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Hager_Group_logo.svg" },
    { name: "Jablotron", logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/Jablotron_Logo.svg" },
    { name: "Somfy", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Somfy_Logo.svg" },
    { name: "Gira", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Gira_Logo.svg" },
  ];

  // Duplicate for seamless loop
  const seamlessPartners = [...partners, ...partners];

  return (
    <section className={`pt-12 md:pt-20 pb-4 md:pb-8 bg-transparent transition-colors duration-500 border-t border-black/5 dark:border-white/5 overflow-hidden ${isStandalone ? 'pt-32 md:pt-40' : ''}`}>
       <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
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
        
        <div className="flex w-max animate-scroll gap-8 md:gap-16 px-6 items-center">
          {seamlessPartners.map((p, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center justify-center gap-4 min-w-[120px] md:min-w-[160px] cursor-default"
            >
               <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center p-6 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:border-blue-600/30">
                  <img 
                    src={p.logo} 
                    alt={p.name} 
                    className="w-full h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 dark:brightness-200 dark:group-hover:brightness-100" 
                    onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       target.style.opacity = '0.1';
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
