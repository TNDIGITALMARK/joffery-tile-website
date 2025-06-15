'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { OrderDetails } from './types';

interface CheckoutSuccessProps {
  className?: string;
  onContinueShopping?: () => void;
  onViewOrders?: () => void;
}

export const CheckoutSuccess = ({ 
  className = "",
  onContinueShopping,
  onViewOrders
}: CheckoutSuccessProps) => {
  const searchParams = useSearchParams();
  const [orderStatus, setOrderStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({});

  useEffect(() => {
    const createOrder = async () => {
      // Get parameters from URL
      const sessionId = searchParams.get('session_id');
      const tenantId = searchParams.get('tenant_id');
      const customerId = searchParams.get('customer_id');

      if (!sessionId || !tenantId) {
        setOrderStatus('error');
        setOrderDetails({ message: 'Missing required parameters' });
        return;
      }

      try {
        // Create order from checkout session
        const API_BASE_URL = process.env.NEXT_PUBLIC_TENANT_API_URL || 'http://localhost:3001/api';
        
        const response = await fetch(`${API_BASE_URL}/storefront/${tenantId}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Tenant-ID': tenantId
          },
          body: JSON.stringify({
            sessionId,
            customerId: customerId || undefined
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create order');
        }

        const result = await response.json();

        if (result.success) {
          setOrderStatus('success');
          setOrderDetails({
            orderId: result.orderId,
            orderNumber: result.orderNumber,
            message: result.message
          });
        } else {
          setOrderStatus('error');
          setOrderDetails({ message: result.error || 'Failed to create order' });
        }

      } catch (error) {
        console.error('Error creating order:', error);
        setOrderStatus('error');
        setOrderDetails({ message: 'An unexpected error occurred' });
      }
    };

    createOrder();
  }, [searchParams]);

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      window.location.href = '/';
    }
  };

  const handleViewOrders = () => {
    if (onViewOrders) {
      onViewOrders();
    } else {
      window.location.href = '/orders';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {orderStatus === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">
                Processing your order...
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please wait while we confirm your payment and create your order.
              </p>
            </div>
          )}

          {orderStatus === 'success' && (
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="mt-4 text-lg font-medium text-gray-900">
                Order Confirmed!
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Thank you for your purchase. Your order has been successfully created.
              </p>
              
              {orderDetails.orderNumber && (
                <div className="mt-4 p-4 bg-green-50 rounded-md">
                  <p className="text-sm font-medium text-green-800">
                    Order Number: {orderDetails.orderNumber}
                  </p>
                  {orderDetails.orderId && (
                    <p className="text-xs text-green-600 mt-1">
                      Order ID: {orderDetails.orderId}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  You will receive an email confirmation shortly with your order details.
                </p>
              </div>

              <div className="mt-6 flex flex-col space-y-3">
                <button
                  onClick={handleContinueShopping}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleViewOrders}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Order Details
                </button>
              </div>
            </div>
          )}

          {orderStatus === 'error' && (
            <div className="text-center">
              <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
              <h2 className="mt-4 text-lg font-medium text-gray-900">
                Order Processing Failed
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {orderDetails.message || 'There was an issue processing your order.'}
              </p>
              
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Please contact support if you were charged but don't see your order.
                </p>
              </div>

              <div className="mt-6 flex flex-col space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Try Again
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess; 