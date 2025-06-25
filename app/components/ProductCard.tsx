'use client';

import { useState } from 'react';
import QuantitySelector, { QuantityType } from './QuantitySelector';

interface Product {
  id: string;
  name: string;
  price: number;
  size: string;
  type: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, quantityType: QuantityType) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<QuantityType>('individual');

  const handleQuantityChange = (quantity: number, type: QuantityType) => {
    setSelectedQuantity(quantity);
    setSelectedType(type);
  };

  const handleAddToCart = () => {
    if (showQuantitySelector) {
      onAddToCart(product, selectedQuantity, selectedType);
      setShowQuantitySelector(false);
    } else {
      setShowQuantitySelector(true);
    }
  };

  const getQuantityLabel = (type: QuantityType) => {
    switch (type) {
      case 'individual': return 'Individual';
      case 'half-dozen': return 'Half Dozen';
      case 'dozen': return 'Dozen';
      default: return 'Individual';
    }
  };

  const getMultiplier = (type: QuantityType) => {
    switch (type) {
      case 'individual': return 1;
      case 'half-dozen': return 6;
      case 'dozen': return 12;
      default: return 1;
    }
  };

  const totalEggs = selectedQuantity * getMultiplier(selectedType);

  return (
    <div className="bg-white bg-opacity-95 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.size} Size</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {product.type}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
        
        {showQuantitySelector && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <QuantitySelector
              onQuantityChange={handleQuantityChange}
              initialQuantity={selectedQuantity}
              initialType={selectedType}
            />
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-medium">Total Eggs:</span> {totalEggs} eggs
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₱{product.price.toFixed(2)}</span>
            {showQuantitySelector && (
              <div className="text-sm text-gray-500">
                per {getQuantityLabel(selectedType).toLowerCase()}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            {showQuantitySelector && (
              <button
                onClick={() => setShowQuantitySelector(false)}
                className="px-3 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                showQuantitySelector
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {showQuantitySelector ? 'Add to Cart' : 'Select Quantity'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 