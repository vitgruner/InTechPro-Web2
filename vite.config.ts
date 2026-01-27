import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  // Načte environment proměnné z .env souboru (pokud existuje)
  // Třetí parametr '' říká, že má načíst VŠECHNY proměnné, nejen ty začínající na VITE_
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
      })
    ],
    define: {
      // Předá proměnné do aplikace (jako fallback pro process.env)
      'process.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'lucide': ['lucide-react'],
            'vendor': ['react', 'react-dom'],
            'supabase': ['@supabase/supabase-js']
          }
        }
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      port: 3000,
    },
  };
});
