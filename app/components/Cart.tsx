'use client';

import { useState, forwardRef, useImperativeHandle } from 'react';
import Receipt from './Receipt';
import Checkout from './Checkout';
import OrderHistory from './OrderHistory';
import { useOrders } from '../context/OrderContext';
import { OrderItem } from '../context/OrderContext';
import { QuantityType } from './QuantitySelector';

interface CartItem extends OrderItem {
  // CartItem now extends OrderItem which already has quantityType
}

export interface CartRef {
  addToCart: (item: Omit<CartItem, 'quantity' | 'quantityType'>, quantity: number, quantityType: QuantityType) => void;
}

const Cart = forwardRef<CartRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const { addOrder } = useOrders();

  const addToCart = (item: Omit<CartItem, 'quantity' | 'quantityType'>, quantity: number, quantityType: QuantityType) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id && i.quantityType === quantityType);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && i.quantityType === quantityType 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      }
      return [...prevItems, { ...item, quantity, quantityType }];
    });
    setIsOpen(true);
  };

  useImperativeHandle(ref, () => ({
    addToCart
  }));

  const removeFromCart = (id: string, quantityType: QuantityType) => {
    setItems(prevItems => prevItems.filter(item => !(item.id === id && item.quantityType === quantityType)));
  };

  const updateQuantity = (id: string, quantityType: QuantityType, quantity: number) => {
    if (quantity < 1) return;
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantityType === quantityType 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setIsOpen(false);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setIsOpen(false);
  };

  const handleCheckoutComplete = (orderData: any) => {
    addOrder(orderData);
    setShowCheckout(false);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    clearCart();
  };

  const handleReorder = (reorderItems: OrderItem[]) => {
    setItems(reorderItems);
    setIsOpen(true);
    setShowOrderHistory(false);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setShowOrderHistory(true)}
          className="text-gray-600 hover:text-gray-900"
          title="Order History"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear Cart
              </button>
            )}
          </div>
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.quantityType}-${index}`} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{item.size}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{item.type}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500 capitalize">{item.quantityType.replace('-', ' ')}</span>
                      </div>
                      <p className="text-sm text-gray-500">₱{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantityType, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span className="text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantityType, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.quantityType)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">Total:</span>
                  <span className="text-lg font-medium text-gray-900">₱{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {showCheckout && (
        <Checkout
          items={items}
          total={total}
          onComplete={handleCheckoutComplete}
          onCancel={() => setShowCheckout(false)}
        />
      )}

      {showReceipt && (
        <Receipt
          items={items}
          total={total}
          onClose={handleCloseReceipt}
          onCancel={clearCart}
        />
      )}

      {showOrderHistory && (
        <OrderHistory
          onReorder={handleReorder}
          onClose={() => setShowOrderHistory(false)}
        />
      )}
    </div>
  );
});

Cart.displayName = 'Cart';

export default Cart; 