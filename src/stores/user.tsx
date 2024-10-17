import Cookies from 'js-cookie';
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
    isAuthenticated: Cookies.get('isAuthenticated') ? true : false,
    setIsAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated });
        Cookies.set('isAuthenticated', JSON.stringify(isAuthenticated));
    },
    setUser: (user) => {
        set({ user });
        Cookies.set('user', JSON.stringify(user));
    },
    logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
        Cookies.remove('user');
        Cookies.remove('isAuthenticated');
    },
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));