"use client"
import { useUserStore } from '@/stores/user';
import React from 'react';
import { useCartStore } from '@/stores/cart';
import NotAuthenticatedPage from '@/components/not-auth';

const CartPage = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <NotAuthenticatedPage />;;
    }

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
        clearCart();
    };

    return (
        <div className="app_container pt-20">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 gap-6">
                        {cart.map((product) => (
                            <div key={product.id} className="bg-gray-100 p-5 rounded-lg shadow-md">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <div className="mt-4">
                                    <h5 className="text-lg font-bold">{product.title}</h5>
                                    <div className="mt-2 text-green-700 font-semibold">N{product.price}</div>
                                    <button
                                        onClick={() => removeFromCart(product.id)}
                                        className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg"
                                    >
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleCheckout}
                        className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
