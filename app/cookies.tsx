import React, { useState } from 'react';
import Image from 'next/image';

// Define the cookie product interface
export interface CookieProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  ingredients?: string[];
  allergens?: string[];
}

interface CookieCardProps {
  product: CookieProduct;
  onAddToCart: (product: CookieProduct, quantity: number) => void;
}

export default function CookieCard({ product, onAddToCart }: CookieCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:bg-[#fbdb8a] transition-shadow duration-300">
      <div className="relative h-48 w-full">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold text-[#fc3296] mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-3">{product.description}</p>
        <p className="text-lg font-semibold text-[#fc3296] mb-3">${product.price.toFixed(2)}</p>
        
        {product.allergens && product.allergens.length > 0 && (
          <p className="text-sm text-red-500 mb-3">
            <span className="font-bold">Allergens:</span> {product.allergens.join(', ')}
          </p>
        )}
        
        <div className="flex items-center mt-4">
          <input
            type="number"
            min="1"
            max="20"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
          />
          <button 
            onClick={handleAddToCart}
            className="ml-auto bg-[#fc3296] text-white py-2 px-4 rounded hover:bg-[#e88b22] transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}