import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon, Zap, ChevronDown, Lock, Activity, Unlock } from 'lucide-react';
import { NavProps, ViewState } from '../types';

const Logo = () => (
  <div className="flex items-center gap-2.5 group cursor-pointer select-none">
    <div className="w-8 h-8 bg-[#69C350] rounded-lg flex items-center justify-center transition-all group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg shadow-[#7BD462]/20">
      < Zap className="w-4 h-4 text-white fill-white" aria-hidden="true" />
    </div>
    <div className="flex items-center font-black text-[#1a1d21] dark:text-white transition-colors duration-500 tracking-tighter leading-none">
      <span className="text-[18px] text-[#69C350]">IN</span>
      <div className="w-1 h-1 bg-[#69C350] rounded-full mx-1" />
      <span className="text-[18px]">TECH</span>
      <span className="text-[18px] ml-0.5 font-light opacity-50">PRO</span>
    </div>
  </div>
);

const Navbar: React.FC<NavProps> = ({ isDark, toggleTheme, setView, currentView, isAdmin, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (viewName: ViewState) => {
    setView(viewName);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const navItems: { label: string; value: ViewState; dropdown?: { label: string; value: ViewState }[]; isLive?: boolean }[] = [
    {
      label: 'Služby',
      value: 'sluzby',
      dropdown: [
        { label: 'Smart Home Loxone', value: 'loxone-smart-home' },
        { label: 'Projekce elektro & Smart Home', value: 'projekce-elektro' },
        { label: 'Výroba rozvaděčů', value: 'vyroba-rozvadecu' },
        { label: 'Moderní technologie', value: 'moderni-technologie' },
        { label: 'Návrh osvětlení', value: 'navrh-osvetleni' }
      ]
    },
    { label: 'Reference', value: 'reference' },
    { label: 'Online Showroom', value: 'online-showroom', isLive: true },
    { label: 'O nás', value: 'o-nas' }
  ];

  const getNavClasses = () => {
    const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300";
    const padding = isScrolled ? 'py-4' : 'py-6';

    if (isMobileMenuOpen) {
      return `${baseClasses} ${padding} bg-white dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/5`;
    }

    if (isScrolled) {
      return `${baseClasses} ${padding} bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm`;
    }

    return `${baseClasses} ${padding} bg-transparent border-b border-transparent`;
  };

  return (
    <nav className={getNavClasses()}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div onClick={() => handleNavClick('home')} className="hover:opacity-80 transition-opacity cursor-pointer">
          <Logo />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group h-full py-2"
              onMouseEnter={() => item.dropdown && setIsServicesOpen(true)}
              onMouseLeave={() => item.dropdown && setIsServicesOpen(false)}
            >
              <button
                onClick={() => !item.dropdown && handleNavClick(item.value)}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${currentView === item.value || (item.dropdown?.some(d => d.value === currentView))
                  ? 'text-[#69C350] dark:text-[#95E87D]'
                  : 'text-gray-500 dark:text-gray-400 hover:text-[#69C350] dark:hover:text-white'
                  }`}
              >
                {item.label}
                {item.isLive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#95E87D] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#69C350]"></span>
                  </span>
                )}
                {item.dropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />}
              </button>

              {item.dropdown && isServicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-4 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-[#0a0a0a]">
                    {item.dropdown.map((sub) => (
                      <button
                        key={sub.value}
                        onClick={() => handleNavClick(sub.value)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === sub.value
                          ? 'bg-[#69C350] text-white'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#69C350]'
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
            onClick={() => handleNavClick('kontakt')}
            className={`px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 group glow ${currentView === 'kontakt'
              ? 'bg-white text-[#69C350] border border-[#69C350] shadow-lg'
              : 'bg-[#69C350] text-white hover:bg-[#4BA038] border border-transparent'
              }`}
          >
            Kontakt
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>

          <div className="w-[1px] h-6 bg-black/5 dark:bg-white/10 mx-2" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => isAdmin ? (currentView === 'admin-dashboard' ? onLogout() : handleNavClick('admin-dashboard')) : handleNavClick('admin-login')}
              className={`p-2.5 rounded-2xl transition-all active:scale-95 ${currentView === 'admin-login' || (isAdmin && currentView === 'admin-dashboard') ? 'bg-[#69C350] text-white shadow-lg' : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400'
                }`}
              title={isAdmin ? (currentView === 'admin-dashboard' ? "Odhlásit se" : "Admin Dashboard") : "Klientská zóna"}
              aria-label={isAdmin ? (currentView === 'admin-dashboard' ? "Odhlásit se" : "Admin Dashboard") : "Klientská zóna"}
            >
              {isAdmin ? <Unlock className="w-5 h-5" aria-hidden="true" /> : <Lock className="w-5 h-5" aria-hidden="true" />}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95"
              aria-label="Přepnout režim"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-[#69C350]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-1.5">
          {isAdmin && (
            <button
              onClick={onLogout}
              className="p-2 text-[#69C350] dark:text-[#95E87D] transition-all active:scale-90"
              title="Odhlásit se"
              aria-label="Odhlásit se"
            >
              <Unlock className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
          <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-400 transition-all active:scale-90" aria-label={isDark ? "Přepnout na světlý režim" : "Přepnout na tmavý režim"}>
            {isDark ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
          </button>
          <div className="w-[1px] h-5 bg-black/5 dark:bg-white/10 mx-0.5" />
          <button
            className="p-2 text-gray-900 dark:text-white bg-black/5 dark:bg-white/5 rounded-xl transition-all active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 h-screen bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-black/5 dark:border-white/5 overflow-y-auto pb-32 animate-in slide-in-from-top-2 duration-200">
          <div className="p-6 flex flex-col gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    if (item.dropdown) {
                      setMobileServicesExpanded(!mobileServicesExpanded);
                    } else {
                      handleNavClick(item.value);
                    }
                  }}
                  className={`flex items-center justify-between p-4 rounded-xl text-[12px] font-black uppercase tracking-[0.2em] transition-all ${currentView === item.value
                    ? 'bg-[#69C350]/10 text-[#69C350]'
                    : 'bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-black/10 dark:hover:bg-white/10'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.isLive && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#95E87D] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#69C350]"></span>
                      </span>
                    )}
                  </span>
                  {item.dropdown && <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesExpanded ? 'rotate-180' : ''}`} aria-hidden="true" />}
                </button>

                {item.dropdown && mobileServicesExpanded && (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.dropdown.map((sub) => (
                      <button
                        key={sub.value}
                        onClick={() => handleNavClick(sub.value)}
                        className={`w-full text-left p-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === sub.value
                          ? 'text-[#69C350] bg-[#69C350]/5'
                          : 'text-gray-400 hover:text-[#69C350]'
                          }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className={`flex items-center justify-between p-4 rounded-xl text-[12px] font-black uppercase tracking-[0.2em] transition-all ${currentView === 'admin-dashboard'
                  ? 'bg-[#69C350]/10 text-[#69C350]'
                  : 'bg-[#69C350]/5 text-[#69C350] hover:bg-[#69C350]/10'
                  }`}
              >
                <span className="flex items-center gap-2">
                  Admin Dashboard
                  <Unlock className="w-3.5 h-3.5" />
                </span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('kontakt')}
              className="w-full bg-[#69C350] text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#4BA038] transition-all shadow-xl shadow-[#7BD462]/20 flex items-center justify-center gap-3 mt-4"
            >
              Nezávazná poptávka
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;