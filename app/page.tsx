'use client';

import { useState, useRef } from 'react';
import Cart, { CartRef } from './components/Cart';
import ProductCard from './components/ProductCard';
import Logo from './components/Logo';
import QRCode from './components/QRCode';
import NameInput from './components/NameInput';
import { UserProvider } from './context/UserContext';
import { OrderProvider } from './context/OrderContext';
import EggIcon from './components/EggIcon';
import { QuantityType } from './components/QuantitySelector';

interface Product {
  id: string;
  name: string;
  price: number;
  size: string;
  type: string;
  description: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Small Eggs',
    price: 199.99,
    size: 'Small',
    type: 'Regular',
    description: 'Fresh small eggs from our free-range chickens'
  },
  {
    id: '2',
    name: 'Medium Eggs',
    price: 249.99,
    size: 'Medium',
    type: 'Regular',
    description: 'Fresh medium eggs from our free-range chickens'
  },
  {
    id: '3',
    name: 'Large Eggs',
    price: 299.99,
    size: 'Large',
    type: 'Regular',
    description: 'Fresh large eggs from our free-range chickens'
  },
  {
    id: '4',
    name: 'Organic Eggs',
    price: 349.99,
    size: 'Large',
    type: 'Organic',
    description: 'Organic eggs from our free-range chickens'
  }
];

function HomeContent() {
  const cartRef = useRef<CartRef>(null);

  const handleAddToCart = (product: Product, quantity: number, quantityType: QuantityType) => {
    cartRef.current?.addToCart(product, quantity, quantityType);
  };

  return (
    <main className="min-h-screen bg-[url('/images/farm-bg.jpg')] bg-cover bg-center relative">
      {/* Decorative chicken silhouettes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 transform rotate-12">
          <svg className="w-16 h-16 text-yellow-500 opacity-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10 transform -rotate-12">
          <svg className="w-16 h-16 text-yellow-500 opacity-20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <header className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <Logo />
            <NameInput />
          </div>
          <Cart ref={cartRef} />
        </header>

        {/* Hero Section */}
        <div className="bg-white bg-opacity-95 rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900">Welcome to Harley's Egg Shop!</h2>
            <EggIcon className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-gray-600 mb-4">
            We are a family-owned farm dedicated to providing the freshest, highest-quality eggs in the Philippines. 
            Our free-range chickens are raised with care and love, resulting in eggs that are not only delicious but also 
            packed with nutrients.
          </p>
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Barangay Vito, Minglanilla Cebu, 6046</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-95 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <EggIcon className="w-12 h-12 text-yellow-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Fresh Daily</h3>
            <p className="text-gray-600">Eggs collected fresh every morning from our happy chickens</p>
          </div>
          <div className="bg-white bg-opacity-95 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Free Delivery</h3>
            <p className="text-gray-600">Free delivery for orders over ₱100 within Minglanilla</p>
          </div>
          <div className="bg-white bg-opacity-95 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600">97% satisfaction guarantee on all our products</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex justify-center">
          <QRCode />
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <UserProvider>
      <OrderProvider>
        <HomeContent />
      </OrderProvider>
    </UserProvider>
  );
}
