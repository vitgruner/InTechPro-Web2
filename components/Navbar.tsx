
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon, Zap, ChevronDown, Lock, Activity } from 'lucide-react';
import { NavProps, ViewState } from '../types';

const Logo = () => (
  <div className="flex items-center gap-2.5 group cursor-pointer select-none">
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-all group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg shadow-blue-500/20">
      < Zap className="w-4 h-4 text-white fill-white" />
    </div>
    <div className="flex items-center font-black text-[#1a1d21] dark:text-white transition-colors duration-500 tracking-tighter leading-none">
      <span className="text-[18px] text-blue-600">IN</span>
      <div className="w-1 h-1 bg-blue-600 rounded-full mx-1" />
      <span className="text-[18px]">TECH</span>
      <span className="text-[18px] ml-0.5 font-light opacity-50">PRO</span>
    </div>
  </div>
);

const Navbar: React.FC<NavProps> = ({ isDark, toggleTheme, setView, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (viewName: ViewState) => {
    setView(viewName);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { label: string; value: ViewState; dropdown?: { label: string; value: ViewState }[]; isLive?: boolean }[] = [
    { 
      label: 'Služby', 
      value: 'services',
      dropdown: [
        { label: 'Všechny služby', value: 'services' },
        { label: 'Smart Home Loxone', value: 'loxone-detail' },
        { label: 'Projekce elektro & Smart Home', value: 'projekce-elektro' },
        { label: 'Výroba rozvaděčů', value: 'rozvadece' },
        { label: 'Moderní technologie', value: 'technologie' },
        { label: 'Návrh osvětlení', value: 'osvetleni' }
      ]
    },
    { label: 'Reference', value: 'showcase' },
    { label: 'Online Showroom', value: 'innovation', isLive: true },
    { label: 'O nás', value: 'about' },
    { label: 'Partneři', value: 'partners' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-4 mx-6 mt-6 rounded-[2rem] shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#080808]' 
        : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <div onClick={() => handleNavClick('home')} className="hover:opacity-80 transition-opacity cursor-pointer">
          <Logo />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <div 
              key={item.label}
              className="relative group h-full py-4"
              onMouseEnter={() => item.dropdown && setIsServicesOpen(true)}
              onMouseLeave={() => item.dropdown && setIsServicesOpen(false)}
            >
              <button 
                onClick={() => !item.dropdown && handleNavClick(item.value)}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                  currentView === item.value || (item.dropdown?.some(d => d.value === currentView))
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white'
                }`}
              >
                {item.label}
                {item.isLive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                )}
                {item.dropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />}
              </button>

              {item.dropdown && isServicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-4 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0a0a0a]">
                    {item.dropdown.map((sub) => (
                      <button
                        key={sub.value}
                        onClick={() => handleNavClick(sub.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          currentView === sub.value 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-600'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <button 
            onClick={() => handleNavClick('contact')}
            className={`px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 group glow ${
              currentView === 'contact' 
              ? 'bg-white text-blue-600 border border-blue-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Kontakt
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="w-[1px] h-6 bg-black/5 dark:bg-white/10 mx-2" />

          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleNavClick('admin-login')}
              className={`p-2.5 rounded-2xl transition-all active:scale-95 ${
                currentView === 'admin-login' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400'
              }`}
              title="Klientská zóna"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95"
              aria-label="Přepnout režim"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Toggle Container */}
        <div className="lg:hidden flex items-center gap-1.5">
          <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-400 transition-all active:scale-90">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => handleNavClick('admin-login')} 
            className={`p-2 rounded-xl transition-all active:scale-90 ${
              currentView === 'admin-login' ? 'text-blue-600 bg-blue-600/10' : 'text-gray-600 dark:text-gray-400'
            }`}
            title="Klientská zóna"
          >
            <Lock className="w-5 h-5" />
          </button>
          <div className="w-[1px] h-5 bg-black/5 dark:bg-white/10 mx-0.5" />
          <button 
            className="p-2 text-gray-900 dark:text-white bg-black/5 dark:bg-white/5 rounded-xl transition-all active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - FIXED: 100% Opaque Background */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mx-6 mt-4 rounded-[2rem] overflow-hidden animate-in slide-in-from-top-4 duration-500 shadow-2xl border border-black/10 dark:border-white/10 max-h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-[#0a0a0a] z-[60]">
          <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col p-6 sm:p-8 gap-3 sm:gap-4">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <button 
                  onClick={() => !item.dropdown ? handleNavClick(item.value) : setIsServicesOpen(!isServicesOpen)}
                  className={`text-xl sm:text-2xl font-black text-left uppercase tracking-tight flex items-center justify-between py-1 transition-colors ${
                    (currentView === item.value || (item.dropdown?.some(d => d.value === currentView))) ? 'text-blue-600' : 'text-gray-900 dark:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.label}
                    {item.isLive && <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-black animate-pulse">LIVE</span>}
                  </span>
                  {item.dropdown ? (
                    <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                  ) : (
                    <ArrowRight className={`w-5 h-5 sm:w-6 sm:h-6 transition-all ${
                      currentView === item.value ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`} />
                  )}
                </button>
                
                {item.dropdown && isServicesOpen && (
                  <div className="flex flex-col gap-1 pl-4 mt-2 border-l-2 border-blue-600/20 bg-black/5 dark:bg-white/5 rounded-r-2xl py-2 animate-in fade-in slide-in-from-left-2 duration-300">
                    {item.dropdown.map(sub => (
                      <button
                        key={sub.value}
                        onClick={() => handleNavClick(sub.value)}
                        className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-left py-2.5 px-3 transition-colors rounded-xl ${
                          currentView === sub.value ? 'text-blue-600 bg-blue-600/5' : 'text-gray-500 dark:text-gray-400 hover:text-blue-600'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="h-[1px] bg-black/5 dark:bg-white/10 my-2" />
            
            <button 
              onClick={() => handleNavClick('admin-login')}
              className={`text-lg sm:text-xl font-black text-left uppercase tracking-tight flex items-center justify-between py-2 transition-colors ${
                currentView === 'admin-login' ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Klientská zóna <Lock className="w-5 h-5" />
            </button>

            <button 
                onClick={() => handleNavClick('contact')}
                className="w-full bg-blue-600 text-white py-4 sm:py-5 mt-2 rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all"
            >
              Zahájit poptávku
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
