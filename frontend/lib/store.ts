import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
  city?: string;
  isAdmin?: boolean;
  is_authenticated: boolean;
  rating_sum?: number;
  rating_count?: number;
  avatar?: string;
  badge?: string;
  is_blocked?: boolean;
  blocked_until?: string;
  blocked_reason?: string;

  telegram_id?: string | null;
  telegram_username?: string | null;
}

interface StoreState {
  user: User | null;
  language: 'ru' | 'kk' | 'en';
  viewMode: 'map' | 'list';
  shouldRefreshApplications: boolean;
  setUser: (user: User | null) => void;
  setLanguage: (language: 'ru' | 'kk' | 'en') => void;
  setViewMode: (mode: 'map' | 'list') => void;
  setShouldRefreshApplications: (value: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  language: 'ru',
  viewMode: 'map',
  shouldRefreshApplications: false,
  setUser: (user) => set({ user }),
  setLanguage: (language) => set({ language }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setShouldRefreshApplications: (value) => set({ shouldRefreshApplications: value }),
}));
