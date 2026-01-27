
import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  variant?: 'section' | 'page';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className = '',
  variant = 'section',
}) => {
  const titleClasses = variant === 'page' 
    ? "text-4xl md:text-5xl font-black mb-3 leading-[1.05]" 
    : "text-3xl md:text-4xl font-black mb-3 leading-tight";

  return (
    <div className={`mb-10 md:mb-12 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <span className="text-[#69C350] font-black uppercase tracking-[0.35em] text-[10px] mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className={`${titleClasses} text-gray-900 dark:text-white tracking-tight text-balance`}>
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p className={`text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed font-medium ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
