
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MarketStore {
  favorites: string[];
  currency: 'INR' | 'USD';
  activeTab: 'crypto' | 'stocks';
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  setCurrency: (currency: 'INR' | 'USD') => void;
  setActiveTab: (tab: 'crypto' | 'stocks') => void;
}

export const useMarketStore = create<MarketStore>()(
  persist(
    (set) => ({
      favorites: [],
      currency: 'INR',
      activeTab: 'crypto',
      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        })),
      setCurrency: (currency) => set({ currency }),
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'market-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
