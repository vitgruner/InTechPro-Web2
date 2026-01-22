
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import References from './components/References';
import ContactForm from './components/ContactForm';
import CookieConsent from './components/CookieConsent';
import { dbService } from './services/dbService';
import {
  Zap, Loader2, CloudUpload, Twitter, Linkedin, Instagram, Lock
} from 'lucide-react';
import { Reference, ViewState } from './types';
import ScrollToTop from './components/ScrollToTop';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

// Lazy loading komponent, které nejsou potřeba pro první zobrazení (LCP)
const Dashboard = lazy(() => import('./components/Dashboard'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const ProjekceDetail = lazy(() => import('./components/ProjekceDetail'));
const OsvetleniDetail = lazy(() => import('./components/OsvetleniDetail'));
const RozvadeceDetail = lazy(() => import('./components/RozvadeceDetail'));
const LoxoneDetail = lazy(() => import('./components/LoxoneDetail'));
const TechnologieDetail = lazy(() => import('./components/TechnologieDetail'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const ReferenceForm = lazy(() => import('./components/ReferenceForm'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const Impresum = lazy(() => import('./components/Impresum'));

const FooterLogo = () => (
  <div className="flex items-center gap-2.5 group cursor-pointer select-none">
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-all group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg shadow-blue-500/20">
      < Zap className="w-4 h-4 text-white fill-white" aria-hidden="true" />
    </div>
    <div className="flex items-center font-black text-white tracking-tighter leading-none">
      <span className="text-[18px] text-blue-600">IN</span>
      <div className="w-1 h-1 bg-blue-600 rounded-full mx-1" />
      <span className="text-[18px]">TECH</span>
      <span className="text-[18px] ml-0.5 font-light opacity-50">PRO</span>
    </div>
  </div>
);

const DEFAULT_REFERENCES: Reference[] = [
  {
    title: "Villa Avant-Garde",
    category: "Rezidenční",
    location: "Curych, Švýcarsko",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200",
    tech: "Loxone",
    techIcon: "cpu",
    topology: { sensors: 142, cablingKm: 3.2, modules: 48, racks: 2 },
    services: [
      { label: "Osvětlení", icon: "zap" },
      { label: "HVAC", icon: "thermometer" },
      { label: "Audio", icon: "radio" },
      { label: "Bezpečnost", icon: "shield" }
    ]
  },
  {
    title: "Riverside Office Hub",
    category: "Komerční",
    location: "Praha, CZ",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    tech: "DALI / KNX",
    techIcon: "building",
    topology: { sensors: 380, cablingKm: 12.5, modules: 124, racks: 6 },
    services: [
      { label: "Osvětlení", icon: "zap" },
      { label: "Přístup", icon: "shield" },
      { label: "Energie", icon: "sun" },
      { label: "Automatizace", icon: "cpu" }
    ]
  },
  {
    title: "Industrial Park D1",
    category: "Průmyslová",
    location: "Ostrava, CZ",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200",
    tech: "Loxone / Modbus",
    techIcon: "factory",
    topology: { sensors: 850, cablingKm: 45.0, modules: 210, racks: 12 },
    services: [
      { label: "Měření", icon: "activity" },
      { label: "Vytápění", icon: "thermometer" },
      { label: "Osvětlení", icon: "zap" },
      { label: "Energie", icon: "sun" }
    ]
  }
];

const LoadingScreen = ({ progress }: { progress?: number }) => (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-white/90 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
    <div className="relative w-48">
      <div className="flex justify-between items-end mb-2">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Systém</h2>
        <span className="text-[20px] font-black tabular-nums leading-none tracking-tighter">{Math.round(progress || 0)}%</span>
      </div>
      <div className="h-1 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
    <div className="text-center">
      <h2 className="text-xl font-black uppercase tracking-widest opacity-20">InTechPro</h2>
      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1 animate-pulse">Synchronizace databází...</p>
    </div>
  </div>
);

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const hour = new Date().getHours();
    return hour < 7 || hour >= 19;
  });

  const getViewStateFromHash = (): ViewState => {
    const hash = window.location.hash.replace('#', '') as ViewState;
    const validViews: ViewState[] = [
      'home', 'sluzby', 'reference', 'online-showroom', 'kontakt', 'o-nas',
      'projekce-elektro', 'navrh-osvetleni', 'vyroba-rozvadecu', 'loxone-smart-home',
      'moderni-technologie', 'admin-login', 'admin-dashboard', 'ochrana-soukromi', 'impresum'
    ];
    return validViews.includes(hash) ? hash : 'home';
  };

  const [view, setView] = useState<ViewState>(getViewStateFromHash());
  const [isAdmin, setIsAdmin] = useState(false);
  const [referenceProjects, setReferenceProjects] = useState<Reference[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoadingData) {
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev < 30) return prev + Math.random() * 15;
          if (prev < 60) return prev + Math.random() * 5;
          if (prev < 95) return prev + Math.random() * 2;
          return prev;
        });
      }, 150);
    } else {
      setLoadingProgress(100);
      const timer = setTimeout(() => setShowMainContent(true), 600);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [isLoadingData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const handleHashChange = () => {
      const newView = getViewStateFromHash();
      setView(newView);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newView: ViewState) => {
    window.location.hash = newView === 'home' ? '' : newView;
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const data = await dbService.fetchReferences();
        if (!data || data.length === 0) {
          await dbService.resetDatabase(DEFAULT_REFERENCES);
          setReferenceProjects(DEFAULT_REFERENCES);
        } else {
          setReferenceProjects(data);
        }
      } catch (error) {
        setReferenceProjects(DEFAULT_REFERENCES);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleAddReference = async (ref: Reference) => {
    setIsSyncing(true);
    try {
      const success = await dbService.saveReference(ref);
      if (success) {
        setReferenceProjects(prev => [...prev, ref]);
        navigateTo('reference');
      }
    } catch (error) {
      alert("Error saving to server.");
    } finally {
      setIsSyncing(false);
    }
  };

  const renderView = () => {
    if (!showMainContent) {
      return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center gap-8 animate-in fade-in duration-700">
          <div className="relative w-64 md:w-80">
            <div className="flex justify-between items-end mb-3">
              <div className="space-y-1">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Zavádění Jádra</h2>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Verze 2.4.0</span>
                </div>
              </div>
              <span className="text-5xl font-black tabular-nums tracking-tighter transition-all duration-300">
                {Math.round(loadingProgress)}<span className="text-sm font-light opacity-30">%</span>
              </span>
            </div>

            <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-blue-700 to-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-700 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="mt-8 flex justify-between items-center opacity-40">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1 h-3 rounded-full ${i < (loadingProgress / 20) ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`} />
                ))}
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Secure Protocol AES-256</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Suspense fallback={<LoadingScreen progress={loadingProgress} />}>
        {(() => {
          switch (view) {
            case 'home':
              return (
                <>
                  <Hero setView={navigateTo} />
                  <Services setView={navigateTo} />
                  <References projects={referenceProjects} setView={navigateTo} />
                  <Process />
                  <ContactForm />
                </>
              );
            case 'sluzby':
              return (
                <>
                  <Services setView={navigateTo} isStandalone={true} />
                  <Process />
                </>
              );
            case 'reference':
              return <References projects={referenceProjects} isStandalone={true} setView={navigateTo} />;
            case 'kontakt':
              return <ContactForm isStandalone={true} />;
            case 'online-showroom':
              return <Dashboard setView={navigateTo} />;
            case 'o-nas':
              return <AboutUs setView={navigateTo} />;
            case 'ochrana-soukromi':
              return <PrivacyPolicy setView={navigateTo} />;
            case 'impresum':
              return <Impresum setView={navigateTo} />;
            case 'admin-dashboard':
              return (
                <div className="pt-32 pb-24 bg-slate-50 dark:bg-[#050505]">
                  <div className="max-w-7xl mx-auto px-6 text-left">
                    <div className="flex justify-between items-center mb-12">
                      <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-black uppercase tracking-tight">Databáze <span className="text-blue-600">Projektů</span></h1>
                        {isSyncing && <div className="flex items-center gap-2 text-blue-600 animate-pulse text-[10px] font-black uppercase tracking-widest bg-blue-600/10 px-3 py-1 rounded-full"><CloudUpload className="w-3 h-3" /> Syncing</div>}
                      </div>
                      <button type="button" onClick={() => { setIsAdmin(false); navigateTo('home'); }} className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-200 dark:bg-white/10">Odhlásit se</button>
                    </div>
                    <ReferenceForm onAdd={handleAddReference} onCancel={() => navigateTo('home')} />
                  </div>
                </div>
              );
            case 'admin-login':
              return <AdminLogin onLogin={() => { setIsAdmin(true); navigateTo('admin-dashboard'); }} />;
            case 'loxone-smart-home': return <LoxoneDetail setView={navigateTo} />;
            case 'navrh-osvetleni': return <OsvetleniDetail setView={navigateTo} />;
            case 'vyroba-rozvadecu': return <RozvadeceDetail setView={navigateTo} />;
            case 'moderni-technologie': return <TechnologieDetail setView={navigateTo} />;
            case 'projekce-elektro': return <ProjekceDetail setView={navigateTo} />;
            default:
              return <Hero setView={navigateTo} />;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] dark:bg-[#050505] text-[#1a1d21] dark:text-white transition-colors duration-500 font-sans flex flex-col">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} setView={navigateTo} currentView={view} />
      <main className="flex-grow">{renderView()}</main>

      <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-16 mb-24">
            <div className="lg:col-span-5 space-y-8 text-left">
              <div onClick={() => navigateTo('home')} className="cursor-pointer">
                <FooterLogo />
              </div>
              <p className="text-gray-400 text-lg font-medium leading-relaxed max-sm:text-sm">
                Průkopníci další generace inteligentní infrastruktury prostřednictvím precizního inženýrství, futuristického designu a bezchybné realizace.
              </p>
              <div className="flex gap-4">
                {[[Twitter, "Twitter"], [Linkedin, "LinkedIn"], [Instagram, "Instagram"]].map(([Icon, label], i) => (
                  <a key={i} href="#" onClick={(e) => e.preventDefault()} className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-gray-300 hover:text-white" aria-label={label as string}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Mapa webu</h4>
              <ul className="space-y-4">
                <li><button type="button" onClick={() => navigateTo('o-nas')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">O nás</button></li>
                <li><button type="button" onClick={() => navigateTo('sluzby')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Služby</button></li>
                <li><button type="button" onClick={() => navigateTo('reference')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Reference</button></li>
                <li>
                  <button type="button" onClick={() => navigateTo('online-showroom')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm flex items-center gap-2">
                    Online Showroom <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  </button>
                </li>
                <li><button type="button" onClick={() => navigateTo('kontakt')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Kontakt</button></li>
                <li>
                  <button type="button" onClick={() => navigateTo('admin-login')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm flex items-center gap-2 text-left">
                    Klientská zóna <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-8 text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Expertíza</h4>
              <ul className="space-y-4">
                <li><button type="button" onClick={() => navigateTo('loxone-smart-home')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Smart Home Loxone</button></li>
                <li><button type="button" onClick={() => navigateTo('projekce-elektro')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Projekce Elektro</button></li>
                <li><button type="button" onClick={() => navigateTo('vyroba-rozvadecu')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Výroba rozvaděčů</button></li>
                <li><button type="button" onClick={() => navigateTo('moderni-technologie')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Moderní technologie</button></li>
                <li><button type="button" onClick={() => navigateTo('navrh-osvetleni')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Návrh osvětlení</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center md:text-left">
              © 2024 IN TECH PRO s.r.o. Synchronizováno a zabezpečeno.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <button type="button" onClick={() => navigateTo('ochrana-soukromi')} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Ochrana soukromí</button>
              <button type="button" onClick={() => document.dispatchEvent(new CustomEvent('intechpro-open-cookies'))} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Cookies</button>
              <button type="button" onClick={() => navigateTo('impresum')} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Impresum</button>
            </div>
          </div>
        </div>
      </footer>
      <CookieConsent />
      <ScrollToTop />
      <SpeedInsights />
      <Analytics />
    </div>
  );
};

export default App;
