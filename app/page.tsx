'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon, CubeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Next.js Template
          </h1>
          <p className="text-xl text-gray-600">
            Complete template with ecommerce integration
          </p>
        </div>

        {/* Shop Test Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🛍️ Complete Ecommerce Shop System
          </h2>
          <p className="text-gray-600 mb-6">
            Test the complete working ecommerce integration with real API calls, 
            product filtering, search, checkout, and order management.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3 bg-white rounded-lg p-4">
              <ShoppingBagIcon className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Shop Page</div>
                <div className="text-sm text-gray-600">Product grid & filtering</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white rounded-lg p-4">
              <CubeIcon className="w-8 h-8 text-green-600" />
              <div>
                <div className="font-medium text-gray-900">Product Details</div>
                <div className="text-sm text-gray-600">Gallery & checkout</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 bg-white rounded-lg p-4">
              <CheckCircleIcon className="w-8 h-8 text-purple-600" />
              <div>
                <div className="font-medium text-gray-900">Order Success</div>
                <div className="text-sm text-gray-600">Confirmation & tracking</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/test-shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              🧪 Test Shop System
            </Link>
            
            <Link 
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              🛍️ Go to Shop
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What's Included
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Shop Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real API integration with tenant system</li>
                <li>• Product grid with filtering & search</li>
                <li>• Collection browsing</li>
                <li>• Responsive design</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ecommerce Flow</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Product detail pages</li>
                <li>• Stripe checkout integration</li>
                <li>• Order creation & tracking</li>
                <li>• Complete purchase flow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
