"use client";
import { useFetchProducts } from "@/hooks/use-fetch-product";
import { useProductStore } from "@/stores/product";
import Link from "next/link";
import React from "react";
import AppLoader from "@/components/loader";
import useAddToCart from "@/hooks/use-add-to-cart";
import ProductCard from "@/components/home/product-card";

const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const HomePage = () => {
    useFetchProducts();
    const { products, loading, error } = useProductStore();
    const { handleAddToCart } = useAddToCart();

    if (loading) {
        return <AppLoader />;
    }

    if (error) {
        return <p className="text-red-600 text-center">Error: {error}</p>;
    }

    if (!products || products.length === 0) {
        return <p className="text-center text-gray-600">No products available at the moment.</p>;
    }

    const randomProducts = getRandomProducts(products, 3);

    return (
        <div className="app_container pt-[123px] md:py-[165px]">
            <div className="my-auto bg-white md:px-12 px-1 py-10 rounded-lg self-center shadow-lg border">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {randomProducts.map((product: Product) => (
                        <ProductCard key={product.id} product={product} addToCart={handleAddToCart} />
                    ))}
                </div>

                <div className="mt-20 w-full text-center">
                    <Link href={'/products'} className="bg-yellow-400 px-2 py-1 rounded-lg">
                        View All Products
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
