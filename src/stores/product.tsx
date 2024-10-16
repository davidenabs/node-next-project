import { create } from "zustand";

interface ProductState {
    products: any | null;
    loading: boolean;
    error: any | null;
    setProducts: (val: Product[]) => void
    setLoading: (val: any) => void
    setError: (val: any) => void
}

export const useProductStore = create<ProductState>((set) => ({
    products: [] as Product[],
    loading: true,
    error: null,
    setProducts: (products: Product[]) => set({ products }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
