import cookies from 'js-cookie';
import { create } from "zustand";

interface UserState {
    user: any | null;
    loading: boolean;
    error: any | null;
    isAuthenticated: boolean;
    setIsAuthenticated: (val: boolean) => void;
    setUser: (user: any) => void;
    setLoading: (val: any) => void;
    setError: (val: any) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: cookies.get('isAuthenticated') || false,
    setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated });
        cookies.set('isAuthenticated', JSON.stringify(isAuthenticated));
    },
    setUser: (user) => {
        set({ user });
        cookies.set('user', JSON.stringify(user));
    },
    logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
        cookies.remove('user');
        cookies.remove('isAuthenticated');
    },
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));