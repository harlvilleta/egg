'use client';

import { useState } from 'react';

export type QuantityType = 'individual' | 'half-dozen' | 'dozen';

interface QuantitySelectorProps {
  onQuantityChange: (quantity: number, type: QuantityType) => void;
  initialQuantity?: number;
  initialType?: QuantityType;
}

const quantityOptions = [
  { type: 'individual' as QuantityType, label: 'Individual', multiplier: 1 },
  { type: 'half-dozen' as QuantityType, label: 'Half Dozen', multiplier: 6 },
  { type: 'dozen' as QuantityType, label: 'Dozen', multiplier: 12 }
];

export default function QuantitySelector({ 
  onQuantityChange, 
  initialQuantity = 1, 
  initialType = 'individual' 
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedType, setSelectedType] = useState<QuantityType>(initialType);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    const multiplier = quantityOptions.find(opt => opt.type === selectedType)?.multiplier || 1;
    onQuantityChange(newQuantity, selectedType);
  };

  const handleTypeChange = (type: QuantityType) => {
    setSelectedType(type);
    const multiplier = quantityOptions.find(opt => opt.type === type)?.multiplier || 1;
    onQuantityChange(quantity, type);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {quantityOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => handleTypeChange(option.type)}
            className={`px-3 py-1 text-sm rounded-md border transition-colors ${
              selectedType === option.type
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">Quantity:</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
          >
            -
          </button>
          <span className="w-12 text-center text-gray-900 font-medium">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-500">
          ({quantity * (quantityOptions.find(opt => opt.type === selectedType)?.multiplier || 1)} eggs total)
        </span>
      </div>
    </div>
  );
} 