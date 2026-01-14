
import { Reference } from '../types';

/**
 * dbService - Abstrakce pro komunikaci s databází.
 * V reálné produkci nahraďte URL vaší API (např. Supabase, Firebase nebo vlastní Node.js endpoint).
 */
const MOCK_API_DELAY = 1000;

export const dbService = {
  /**
   * Načte všechny reference ze serveru
   */
  async fetchReferences(): Promise<Reference[]> {
    // Simulace síťového požadavku
    return new Promise((resolve) => {
      setTimeout(() => {
        const saved = localStorage.getItem('intechpro_db_refs');
        if (saved) {
          resolve(JSON.parse(saved));
        } else {
          // Pokud v DB nic není, vrátíme prázdné pole (nebo defaulty z App.tsx)
          resolve([]);
        }
      }, MOCK_API_DELAY);
    });
  },

  /**
   * Uloží novou referenci do databáze
   */
  async saveReference(reference: Reference): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const current = localStorage.getItem('intechpro_db_refs');
        const refs = current ? JSON.parse(current) : [];
        const updated = [...refs, reference];
        localStorage.setItem('intechpro_db_refs', JSON.stringify(updated));
        resolve(true);
      }, MOCK_API_DELAY);
    });
  },

  /**
   * Resetuje databázi (pouze pro admin účely)
   */
  async resetDatabase(defaultRefs: Reference[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('intechpro_db_refs', JSON.stringify(defaultRefs));
        resolve();
      }, 500);
    });
  }
};
