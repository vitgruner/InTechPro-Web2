import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Načte environment proměnné z .env souboru (pokud existuje)
  // Třetí parametr '' říká, že má načíst VŠECHNY proměnné, nejen ty začínající na VITE_
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Předá API_KEY do aplikace jako process.env.API_KEY
      // Použije buď hodnotu z .env (lokálně) nebo ze systému (Vercel)
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    server: {
      port: 3000,
    },
  };
});
