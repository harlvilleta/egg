'use client';

import { useState } from 'react';
import { useOrders, Order } from '../context/OrderContext';

interface OrderHistoryProps {
  onReorder: (items: any[]) => void;
  onClose: () => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-orange-100 text-orange-800',
  delivering: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  delivering: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

export default function OrderHistory({ onReorder, onClose }: OrderHistoryProps) {
  const { orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleReorder = (order: Order) => {
    onReorder(order.items);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-sm text-gray-500">Start shopping to see your order history here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order.id.slice(-6)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                      <button
                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {selectedOrder?.id === order.id ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{order.items.length}</span> item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-lg font-medium text-gray-900">
                      ₱{order.total.toFixed(2)}
                    </div>
                  </div>

                  {selectedOrder?.id === order.id && (
                    <div className="border-t pt-4 space-y-4">
                      {/* Order Items */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Items:</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.name} ({item.quantity} {item.quantityType})
                              </span>
                              <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Delivery Details:</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium">Name:</span> {order.customerName}</p>
                            <p><span className="font-medium">Address:</span> {order.deliveryAddress}</p>
                            <p><span className="font-medium">Contact:</span> {order.contactNumber}</p>
                            <p><span className="font-medium">Time Slot:</span> {order.deliveryTimeSlot}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Payment:</h4>
                          <div className="text-sm text-gray-600">
                            <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                          onClick={() => handleReorder(order)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          Reorder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 