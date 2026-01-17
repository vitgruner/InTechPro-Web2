import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbsProps } from '../types';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, setView }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 md:mb-12 animate-in slide-in-from-left-4 fade-in duration-500">
      <ol className="flex items-center flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest">
        <li className="flex items-center">
          <button 
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-700 mx-1" />
            {item.view ? (
              <button
                onClick={() => setView(item.view!)}
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-blue-600 dark:text-blue-400" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;