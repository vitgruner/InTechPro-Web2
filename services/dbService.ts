
import { Reference } from '../types';

/**
 * dbService - Abstrakce pro komunikaci s databází.
 * Implementuje validaci dat pro zajištění stability v deploymentu.
 */
const MOCK_API_DELAY = 800;
const DB_KEY = 'intechpro_db_refs_v3'; // Změna verze klíče pro vynucení aktualizace dat na klientovi

export const dbService = {
  /**
   * Načte všechny reference ze serveru s validací struktury
   */
  async fetchReferences(): Promise<Reference[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const saved = localStorage.getItem(DB_KEY);
          if (!saved) return resolve([]);
          
          const data = JSON.parse(saved);
          
          // Validace: Musí to být pole a první prvek (pokud existuje) musí mít techIcon jako string
          if (!Array.isArray(data)) {
            console.warn("DB Warning: Načtená data nejsou pole, resetuji...");
            return resolve([]);
          }
          
          if (data.length > 0 && typeof data[0].techIcon !== 'string') {
            console.warn("DB Warning: Detekován starý formát dat (ikony jako objekty), resetuji...");
            return resolve([]);
          }

          resolve(data);
        } catch (e) {
          console.error("DB Error: Selhalo parsování dat:", e);
          resolve([]);
        }
      }, MOCK_API_DELAY);
    });
  },

  /**
   * Uloží novou referenci
   */
  async saveReference(reference: Reference): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const current = localStorage.getItem(DB_KEY);
          const refs = current ? JSON.parse(current) : [];
          const updated = [...(Array.isArray(refs) ? refs : []), reference];
          localStorage.setItem(DB_KEY, JSON.stringify(updated));
          resolve(true);
        } catch (e) {
          console.error("DB Error: Selhalo ukládání:", e);
          resolve(false);
        }
      }, MOCK_API_DELAY);
    });
  },

  /**
   * Resetuje databázi na výchozí hodnoty
   */
  async resetDatabase(defaultRefs: Reference[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(DB_KEY, JSON.stringify(defaultRefs));
        resolve();
      }, 300);
    });
  }
};
