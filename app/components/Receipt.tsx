'use client';

import { useState } from 'react';

interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  type: string;
}

interface ReceiptProps {
  items: ReceiptItem[];
  total: number;
  onClose: () => void;
  onCancel: () => void;
}

export default function Receipt({ items, total, onClose, onCancel }: ReceiptProps) {
  const [isCancelling, setIsCancelling] = useState(false);
  const deliveryFee = 50; // ₱50 delivery fee

  const handleCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      onCancel();
      setIsCancelling(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Harley's Fresh Eggs</h2>
          <p className="text-gray-500">Order Receipt</p>
        </div>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start border-b pb-2">
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.size} • {item.type}
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ₱{(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  ₱{item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">₱{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Delivery Fee:</span>
            <span className="font-medium">₱{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>₱{(total + deliveryFee).toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirm Order
          </button>
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className={`w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors ${
              isCancelling ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isCancelling ? 'Cancelling...' : 'Cancel Order'}
          </button>
        </div>
      </div>
    </div>
  );
} 