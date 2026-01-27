
import { Reference } from '../types';
import { supabase } from './supabase';

/**
 * dbService - Abstrakce pro komunikaci s databází (nyní přes Supabase).
 */
const MOCK_API_DELAY = 150;
let cachedRefs: Reference[] | null = null;

export const dbService = {
  async fetchReferences(): Promise<Reference[]> {
    if (cachedRefs) return cachedRefs;

    if (!supabase) {
      console.warn('Supabase not initialized, falling back to empty list.');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('references')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedData: Reference[] = (data || []).map((row: any) => ({
        id: row.id,
        title: row.title,
        category: row.category,
        location: row.location,
        image: row.image,
        tech: row.tech,
        techIcon: row.tech_icon, // Mapping snake_case to camelCase
        services: row.services,
        topology: row.topology
      }));

      cachedRefs = mappedData;
      return mappedData;
    } catch (e) {
      console.error("Supabase Fetch Error:", e);
      return [];
    }
  },

  async saveReference(reference: Reference): Promise<boolean> {
    if (!supabase) {
      console.warn('Supabase not initialized, cannot save reference.');
      return false;
    }

    try {
      const { error } = await supabase
        .from('references')
        .insert({
          title: reference.title,
          category: reference.category,
          location: reference.location,
          image: reference.image,
          tech: reference.tech,
          tech_icon: reference.techIcon, // Mapping camelCase to snake_case
          services: reference.services,
          topology: reference.topology
        });

      if (error) throw error;

      cachedRefs = null; // Invalidate cache
      return true;
    } catch (e) {
      console.error("Supabase Save Error:", e);
      return false;
    }
  },

  async updateReference(id: string, reference: Partial<Reference>): Promise<boolean> {
    if (!supabase) return false;

    try {
      const updateData: any = {
        title: reference.title,
        category: reference.category,
        location: reference.location,
        image: reference.image,
        tech: reference.tech,
        tech_icon: reference.techIcon,
        services: reference.services,
        topology: reference.topology
      };

      // Remove undefined fields
      Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

      const { error } = await supabase
        .from('references')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      cachedRefs = null;
      return true;
    } catch (e) {
      console.error("Supabase Update Error:", e);
      return false;
    }
  },

  async deleteReference(id: string): Promise<boolean> {
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('references')
        .delete()
        .eq('id', id);

      if (error) throw error;
      cachedRefs = null;
      return true;
    } catch (e) {
      console.error("Supabase Delete Error:", e);
      return false;
    }
  },

  async resetDatabase(_defaultRefs: Reference[]): Promise<void> {
    // Reset database isn't typically supported for live DB without extra precautions
    console.warn("resetDatabase called: This is a manual operation in Supabase.");
    return Promise.resolve();
  }
};
