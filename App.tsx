import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Dashboard from './components/Dashboard';
import References from './components/References';
import ContactForm from './components/ContactForm';
import AboutUs from './components/AboutUs';
import ProjekceDetail from './components/ProjekceDetail';
import OsvetleniDetail from './components/OsvetleniDetail';
import RozvadeceDetail from './components/RozvadeceDetail';
import LoxoneDetail from './components/LoxoneDetail';
import TechnologieDetail from './components/TechnologieDetail';
import AdminLogin from './components/AdminLogin';
import ReferenceForm from './components/ReferenceForm';
import CookieConsent from './components/CookieConsent';
import { dbService } from './services/dbService';
import { 
  Zap, Building2, Sun, Loader2, 
  CloudUpload, Twitter, Linkedin, Instagram, Lock, Settings 
} from 'lucide-react';
import { Reference, ViewState } from './types';

const FooterLogo = () => (
  <div className="flex items-center gap-2.5 group cursor-pointer select-none">
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transition-all group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg shadow-blue-500/20">
      < Zap className="w-4 h-4 text-white fill-white" />
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

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const hour = new Date().getHours();
    return hour < 7 || hour >= 19;
  });

  // Helper to parse the hash into a valid ViewState
  const getViewStateFromHash = (): ViewState => {
    const hash = window.location.hash.replace('#', '') as ViewState;
    const validViews: ViewState[] = [
      'home', 'services', 'showcase', 'innovation', 'contact', 'about', 
      'projekce-elektro', 'osvetleni', 'rozvadece', 'loxone-detail', 
      'technologie', 'admin-login', 'admin-dashboard'
    ];
    return validViews.includes(hash) ? hash : 'home';
  };

  const [view, setView] = useState<ViewState>(getViewStateFromHash());
  const [isAdmin, setIsAdmin] = useState(false);
  const [referenceProjects, setReferenceProjects] = useState<Reference[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync state with URL hash on mount and on hash change
  useEffect(() => {
    const handleHashChange = () => {
      const newView = getViewStateFromHash();
      setView(newView);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Wrapper for setView that updates the hash
  const navigateTo = (newView: ViewState) => {
    window.location.hash = newView === 'home' ? '' : newView;
    // Note: State will be updated by the hashchange listener
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
        console.error("Critical start error:", error);
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
        navigateTo('showcase');
      }
    } catch (error) {
      alert("Error saving to server.");
    } finally {
      setIsSyncing(false);
    }
  };

  const renderView = () => {
    if (isLoadingData) {
      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <div className="text-center">
            <h2 className="text-xl font-black uppercase tracking-widest">Inicializace systému</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-tight mt-2">Synchronizace s cloudovou databází...</p>
          </div>
        </div>
      );
    }

    switch (view) {
      case 'home':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Hero setView={navigateTo} />
            <Services setView={navigateTo} />
            <References projects={referenceProjects} setView={navigateTo} />
            <Process />
            <ContactForm />
          </div>
        );
      case 'showcase':
        return <References projects={referenceProjects} isStandalone={true} setView={navigateTo} />;
      case 'contact':
        return <ContactForm isStandalone={true} />;
      case 'innovation':
        return <div className="animate-in fade-in duration-700"><Dashboard /></div>;
      case 'about':
        return <AboutUs />;
      case 'admin-dashboard':
        return (
          <div className="pt-32 pb-24 bg-slate-50 dark:bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-4">
                  <h1 className="text-4xl font-black uppercase tracking-tight">Databáze <span className="text-blue-600">Projektů</span></h1>
                  {isSyncing && <div className="flex items-center gap-2 text-blue-600 animate-pulse text-[10px] font-black uppercase tracking-widest bg-blue-600/10 px-3 py-1 rounded-full"><CloudUpload className="w-3 h-3" /> Syncing</div>}
                </div>
                <button onClick={() => { setIsAdmin(false); navigateTo('home'); }} className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-200 dark:bg-white/10">Odhlásit se</button>
              </div>
              <ReferenceForm onAdd={handleAddReference} onCancel={() => navigateTo('home')} />
            </div>
          </div>
        );
      case 'admin-login':
        return <AdminLogin onLogin={() => { setIsAdmin(true); navigateTo('admin-dashboard'); }} />;
      case 'loxone-detail': return <LoxoneDetail setView={navigateTo} />;
      case 'osvetleni': return <OsvetleniDetail setView={navigateTo} />;
      case 'rozvadece': return <RozvadeceDetail setView={setView} />; // Detail views keep handle as direct to avoid double trigger
      case 'technologie': return <TechnologieDetail setView={navigateTo} />;
      case 'projekce-elektro': return <ProjekceDetail setView={navigateTo} />;
      case 'services': return (
        <div className="animate-in fade-in duration-700">
          <Services setView={navigateTo} isStandalone={true} />
          <Process />
        </div>
      );
      default:
        return <Hero setView={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] dark:bg-[#050505] text-[#1a1d21] dark:text-white transition-colors duration-500 font-sans flex flex-col">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} setView={navigateTo} currentView={view} />
      <main className="flex-grow">{renderView()}</main>
      
      <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5 space-y-8">
              <div onClick={() => navigateTo('home')} className="cursor-pointer">
                <FooterLogo />
              </div>
              <p className="text-gray-400 text-lg font-medium leading-relaxed max-sm:text-sm">
                Průkopníci další generace inteligentní infrastruktury prostřednictvím precizního inženýrství, futuristického designu a bezchybné realizace.
              </p>
              <div className="flex gap-4">
                {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all text-gray-300 hover:text-white">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Mapa webu</h4>
              <ul className="space-y-4">
                <li><button onClick={() => navigateTo('about')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">O nás</button></li>
                <li><button onClick={() => navigateTo('services')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Služby</button></li>
                <li><button onClick={() => navigateTo('showcase')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Reference</button></li>
                <li><button onClick={() => navigateTo('innovation')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Centrum inteligence</button></li>
                <li><button onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Kontakt</button></li>
                <li>
                  <button onClick={() => navigateTo('admin-login')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm flex items-center gap-2 text-left">
                    Klientská zóna <Lock className="w-3.5 h-3.5" />
                  </button>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Expertíza</h4>
              <ul className="space-y-4">
                <li><button onClick={() => navigateTo('loxone-detail')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Smart Home Loxone</button></li>
                <li><button onClick={() => navigateTo('projekce-elektro')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Projekce Elektro</button></li>
                <li><button onClick={() => navigateTo('rozvadece')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Výroba rozvaděčů</button></li>
                <li><button onClick={() => navigateTo('technologie')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Moderní technologie</button></li>
                <li><button onClick={() => navigateTo('osvetleni')} className="text-gray-400 hover:text-white font-bold transition-colors text-sm">Návrh osvětlení</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 text-center md:text-left">
              © 2024 IN TECH PRO s.r.o. Synchronizováno a zabezpečeno.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <button type="button" onClick={() => document.dispatchEvent(new CustomEvent('intechpro-open-cookies'))} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Ochrana soukromí</button>
              <button type="button" onClick={() => document.dispatchEvent(new CustomEvent('intechpro-open-cookies'))} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Cookies</button>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Impresum</a>
            </div>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
};

export default App;