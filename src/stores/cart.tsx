import { create } from "zustand";

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
    removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    clearCart: () => set({ cart: [] }),
    getTotalItems: () => get().cart.length,
}));