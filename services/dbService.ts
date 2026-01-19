
import { Reference } from '../types';

/**
 * dbService - Abstrakce pro komunikaci s databází.
 */
const MOCK_API_DELAY = 200; // Sníženo z 800ms pro okamžitý start
const DB_KEY = 'intechpro_db_refs_v3';

export const dbService = {
  async fetchReferences(): Promise<Reference[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const saved = localStorage.getItem(DB_KEY);
          if (!saved) return resolve([]);
          
          const data = JSON.parse(saved);
          
          if (!Array.isArray(data)) return resolve([]);
          
          if (data.length > 0 && typeof data[0].techIcon !== 'string') return resolve([]);

          resolve(data);
        } catch (e) {
          console.error("DB Error:", e);
          resolve([]);
        }
      }, MOCK_API_DELAY);
    });
  },

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
          resolve(false);
        }
      }, MOCK_API_DELAY);
    });
  },

  async resetDatabase(defaultRefs: Reference[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(DB_KEY, JSON.stringify(defaultRefs));
        resolve();
      }, 100);
    });
  }
};
