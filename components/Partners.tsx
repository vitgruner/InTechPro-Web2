import React, { useState } from 'react';

const PARTNERS_DATA = [
  { name: "Loxone", domain: "loxone.com" },
  { name: "Schneider", logo: "/assets/partners/schneider.svg", domain: "se.com" },
  { name: "ABB", logo: "/assets/partners/abb.svg", domain: "abb.com" },
  { name: "Siemens", logo: "/assets/partners/siemens.svg", domain: "siemens.com" },
  { name: "Hager", domain: "hager.com" },
  { name: "Jablotron", domain: "jablotron.com" },
  { name: "Somfy", logo: "/assets/partners/somfy.svg", domain: "somfy.com" },
];

const Partners = ({ isStandalone = false }: { isStandalone?: boolean }) => {
  return (
    <div className={`pt-12 md:pt-20 pb-16 md:pb-24 bg-transparent transition-colors duration-500 overflow-hidden ${isStandalone ? 'pt-32 md:pt-40' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#69C350]/10 border border-[#69C350]/20 mb-4 animate-in fade-in slide-in-from-bottom-2">
          <span className="text-[#69C350] font-black uppercase tracking-[0.2em] text-[8px]">
            Certifikovaní partneři
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white transition-colors animate-in fade-in slide-in-from-bottom-3">
          Technologie, kterým <span className="text-[#69C350]">věříme</span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PARTNERS_DATA.map((p, i) => (
            <PartnerCard key={i} partner={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnerCard = ({ partner }: { partner: { name: string; domain: string; logo?: string } }) => {
  const [imgSrc, setImgSrc] = useState(partner.logo || `https://logo.clearbit.com/${partner.domain}?size=200`);
  const [hasError, setHasError] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(!partner.logo);

  return (
    <div className="group relative">
      {/* Glow background effect on hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#69C350]/0 via-[#69C350]/5 to-[#69C350]/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

      <div className="relative h-32 md:h-40 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col items-center justify-center p-8 shadow-sm transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-[#69C350]/30 group-hover:bg-white/80 dark:group-hover:bg-white/[0.08] backdrop-blur-sm">
        <div className="w-full h-12 md:h-16 flex items-center justify-center">
          <img
            src={imgSrc}
            alt={partner.name}
            className={`max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110 ${!isUsingFallback ? 'brightness-100 dark:brightness-0 dark:invert' : ''
              }`}
            onError={() => {
              if (!hasError) {
                setHasError(true);
                setIsUsingFallback(true);
                setImgSrc(`https://logo.clearbit.com/${partner.domain}?size=200`);
              } else {
                setImgSrc(`https://ui-avatars.com/api/?name=${partner.name}&background=69C350&color=fff&bold=true`);
              }
            }}
          />
        </div>
        <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 w-full text-center">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#69C350] transition-colors">
            {partner.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Partners;
