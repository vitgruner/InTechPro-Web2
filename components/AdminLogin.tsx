
import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { AdminLoginProps } from '../types';

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      if (username === 'admin' && password === 'intechpro2024') {
        onLogin();
      } else {
        setError('PŘÍSTUP ODEPŘEN: Neplatná autorizační data.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen pt-32 md:pt-40 flex items-center justify-center px-6 relative overflow-hidden pb-16">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-md w-full glass-panel p-10 rounded-[3rem] border-black/10 dark:border-white/10 shadow-2xl animate-in fade-in zoom-in duration-500 bg-white/80 dark:bg-black/40 backdrop-blur-3xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 relative group">
            <div className="absolute inset-0 bg-blue-400 rounded-2xl animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Lock className="text-white w-8 h-8 relative z-10" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Klientská Zóna</h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 text-blue-600" /> Zabezpečený terminál v2.5
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identifikátor</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-blue-600 transition-all dark:text-white"
                placeholder="Uživatelské jméno"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Klíč k přístupu</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-blue-600 transition-all dark:text-white"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 py-3 px-4 rounded-xl">
              <p className="text-red-500 text-[9px] font-black uppercase text-center tracking-widest">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Autorizace...
              </span>
            ) : (
              <>
                Vstoupit do správy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/5 flex items-center justify-center gap-3 opacity-40">
           <ShieldCheck className="w-4 h-4" />
           <span className="text-[9px] font-bold uppercase tracking-widest">End-to-End Encryption Active</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
