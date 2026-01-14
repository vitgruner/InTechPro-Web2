
import React from 'react';

const Partners = ({ isStandalone = false }: { isStandalone?: boolean }) => {
  const partners = [
    { name: "Loxone", logo: "https://logo.clearbit.com/loxone.com" },
    { name: "Ampio", logo: "https://logo.clearbit.com/ampio.com.pl" },
    { name: "Schneider Electric", logo: "https://logo.clearbit.com/se.com" },
    { name: "ABB", logo: "https://logo.clearbit.com/abb.com" }
  ];

  return (
    <section className={`py-16 md:py-24 bg-transparent transition-colors duration-500 border-t border-black/5 dark:border-white/5 ${isStandalone ? 'pt-32 md:pt-40' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Certifikovaní partneři</span>
        <h2 className="text-3xl md:text-4xl font-black mb-12 md:mb-16 text-gray-900 dark:text-white transition-colors">Spolupracujeme s <span className="text-gradient">Nejlepšími</span></h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
          {partners.map((p, i) => (
            <div key={i} className="flex items-center justify-center p-8 md:p-10 glass-panel rounded-3xl group hover:border-blue-600/30 transition-all cursor-pointer border-black/5 dark:border-white/5 bg-white/30 dark:bg-white/5 shadow-sm">
               <img 
                 src={p.logo} 
                 alt={p.name} 
                 className="h-10 md:h-14 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500 dark:invert opacity-70 group-hover:opacity-100" 
                 onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.style.display = 'none';
                   const parent = target.parentElement;
                   if (parent) {
                     const span = document.createElement('span');
                     span.className = 'font-black text-gray-400 uppercase tracking-widest text-sm';
                     span.innerText = p.name;
                     parent.appendChild(span);
                   }
                 }}
               />
            </div>
          ))}
        </div>
        
        <p className="mt-12 md:mt-16 text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto italic font-medium">
          Nepracujeme s univerzálními balíčky – vybíráme ty nejvhodnější technologie pro konkrétní typ stavby a způsob užívání.
        </p>
      </div>
    </section>
  );
};

export default Partners;
