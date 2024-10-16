import React from 'react';

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
    return (
        <div key={product.id} className="bg-gray-100 p-5 rounded-lg shadow-md">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-lg"
            />
            <div className="mt-4">
                <h5 className="text-lg font-bold">{product.title}</h5>
                <p className="text-sm text-gray-600">
                    {product.description.length > 20
                        ? `${product.description.substring(0, 20)}...`
                        : product.description}
                </p>
                <div className="mt-2 text-green-700 font-semibold">N{product.price}</div>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
