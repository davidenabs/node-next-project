import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';

const useAddToCart = () => {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = (product: Product) => {
        if (!isAuthenticated) {
            alert('Please log in to add items to the cart.');
            return;
        }
        addToCart(product);
        alert(`${product.title} added to your cart!`);
    };

    return { handleAddToCart };
};

export default useAddToCart;
