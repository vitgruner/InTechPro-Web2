
import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Process from './Process';
import Dashboard from './Dashboard';
import References from './References';
import VisionaryAssistant from './VisionaryAssistant';
import ContactForm from './ContactForm';
import AboutUs from './AboutUs';
import Partners from './Partners';
import { Message } from '../types';

// Tento soubor slouží jako záložní nebo pro izolované testování komponent.
// Hlavní vstupní bod aplikace je v kořenovém /App.tsx.
const AppFallback = () => {
  const [isDark, setIsDark] = React.useState(true);
  const [view, setView] = React.useState('home');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">In-Tech Pro - Komponentové zobrazení</h1>
      <p className="mb-8">Tento soubor byl opraven pro úspěšný build. Hlavní aplikaci naleznete v kořenu projektu.</p>
      <div className="flex justify-center gap-4">
        <button onClick={() => window.location.href='/'} className="bg-blue-600 text-white px-6 py-2 rounded-full">
          Zpět na hlavní stránku
        </button>
      </div>
    </div>
  );
};

export default AppFallback;
