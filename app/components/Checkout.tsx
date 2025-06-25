'use client';

import { useState } from 'react';
import { OrderItem } from '../context/OrderContext';

interface CheckoutProps {
  items: OrderItem[];
  total: number;
  onComplete: (orderData: any) => void;
  onCancel: () => void;
}

const paymentMethods = [
  { id: 'gcash', name: 'GCash', icon: '📱' },
  { id: 'paymaya', name: 'PayMaya', icon: '💳' },
  { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦' }
];

const deliveryTimeSlots = [
  { id: 'morning', time: '8:00 AM - 12:00 PM', label: 'Morning' },
  { id: 'afternoon', time: '1:00 PM - 5:00 PM', label: 'Afternoon' },
  { id: 'evening', time: '6:00 PM - 9:00 PM', label: 'Evening' }
];

export default function Checkout({ items, total, onComplete, onCancel }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    deliveryAddress: '',
    contactNumber: '',
    paymentMethod: 'gcash' as 'gcash' | 'paymaya' | 'bank-transfer',
    deliveryTimeSlot: 'morning',
    specialInstructions: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const orderData = {
      items,
      total,
      status: 'pending' as const,
      paymentMethod: formData.paymentMethod,
      deliveryTimeSlot: deliveryTimeSlots.find(slot => slot.id === formData.deliveryTimeSlot)?.time || '',
      customerName: formData.customerName,
      deliveryAddress: formData.deliveryAddress,
      contactNumber: formData.contactNumber,
      specialInstructions: formData.specialInstructions
    };
    onComplete(orderData);
  };

  const isFormValid = formData.customerName && formData.deliveryAddress && formData.contactNumber;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mb-6">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Customer Info</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment & Delivery</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  value={formData.deliveryAddress}
                  onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter your complete delivery address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions
                </label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Any special delivery instructions (optional)"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!isFormValid}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Payment & Delivery</h3>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method *
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-lg mr-2">{method.icon}</span>
                      <span className="text-sm font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Delivery Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Delivery Time Slot *
                </label>
                <div className="space-y-2">
                  {deliveryTimeSlots.map((slot) => (
                    <label key={slot.id} className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="deliveryTimeSlot"
                        value={slot.id}
                        checked={formData.deliveryTimeSlot === slot.id}
                        onChange={(e) => handleInputChange('deliveryTimeSlot', e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium">{slot.label}</div>
                        <div className="text-xs text-gray-500">{slot.time}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} ({item.quantity} {item.quantityType})</span>
                      <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>₱{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 