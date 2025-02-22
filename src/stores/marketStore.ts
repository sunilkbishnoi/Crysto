
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MarketStore {
  favorites: string[];
  currency: 'INR' | 'USD';
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  setCurrency: (currency: 'INR' | 'USD') => void;
}

export const useMarketStore = create<MarketStore>()(
  persist(
    (set) => ({
      favorites: [],
      currency: 'INR',
      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        })),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'market-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
