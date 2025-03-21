"use client";
import React, { useState } from 'react';
import CookieCard, { CookieProduct } from '../../cookies';
import Image from 'next/image';

interface CartItem {
  product: CookieProduct;
  quantity: number;
}

export default function MenuPage() {
  // Mocked cookie products
  const mockedCookieProducts: CookieProduct[] = [
    {
      id: '1',
      name: 'Chocolate Chip Cookie',
      price: 2.5,
      description: 'A classic cookie with gooey chocolate chips. Why mess with a classic',
      imageUrl: '/chocolate-chip.png',
      ingredients: ['Flour', 'Sugar', 'Chocolate Chips', 'Butter'],
      allergens: ['Gluten', 'Dairy'],
    },
    {
      id: '2',
      name: 'Sugar Cookie',
      price: 2.0,
      description: 'Let’s add a little whimsy! Have you ever had a frosted Animal Cracker? This is simple & classic— vanilla cookie, vanilla frosting, with a little colourful fun!',
      imageUrl: '/sugar-cookie.png',
      ingredients: ['Oats', 'Raisins', 'Brown Sugar', 'Butter'],
      allergens: ['Gluten', 'Dairy'],
    },
    {
      id: '3',
      name: 'Nutella loaded coissant',
      price: 2.8,
      description: 'Loaded Nutella cookie wrapped in a croissant, and finished off with a chocolate-hazelnut ganache, Bueno pieces, and toffee bits. Get ready to be chocolate wasted!',
      imageUrl: '/nutella-croissant.png', 
      ingredients: ['Peanut Butter', 'Sugar', 'Eggs'],
      allergens: ['Peanuts'],
    },
  ];

  // State for cookie products
  const [cookieProducts] = useState<CookieProduct[]>(mockedCookieProducts);

  // State for cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add to cart function
  const handleAddToCart = (product: CookieProduct, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }

    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  return (
    <>
 
      <main className="min-h-screen py-8 ">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Cookies</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cookieProducts.map(product => (
              <CookieCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <span>{item.quantity} x {item.product.name}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between border-t pt-4">
                <span className="font-bold">Total:</span>
                <span className="font-bold">
                  ${cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}
                </span>
              </div>
              <button 
                className="mt-4 w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-300"
                onClick={() => alert('Proceed to checkout!')}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </main>
 
    </>
  );
}
