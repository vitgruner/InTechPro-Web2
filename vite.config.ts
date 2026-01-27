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
      // Předá proměnné do aplikace
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.SUPABASE_URL': JSON.stringify(env.SUPABASE_URL),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(env.SUPABASE_ANON_KEY),
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
