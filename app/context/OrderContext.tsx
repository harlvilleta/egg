'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  type: string;
  description: string;
  quantityType: 'tray' | 'half-tray';
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  paymentMethod: 'gcash' | 'paymaya' | 'bank-transfer' | 'cod';
  deliveryTimeSlot: string;
  customerName: string;
  deliveryAddress: string;
  contactNumber: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => void;
  getOrderById: (id: string) => Order | undefined;
  reorder: (orderId: string) => OrderItem[];
  clearOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Handle initial client-side hydration
  useEffect(() => {
    setIsClient(true);
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        orderDate: new Date(order.orderDate)
      }));
      setOrders(parsedOrders);
    }
  }, []);

  // Save to localStorage whenever orders change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders, isClient]);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderDate: new Date()
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const reorder = (orderId: string) => {
    const order = getOrderById(orderId);
    return order ? order.items : [];
  };

  const clearOrders = () => {
    setOrders([]);
    if (isClient) {
      localStorage.removeItem('orders');
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder,
      getOrderById,
      reorder,
      clearOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
} 