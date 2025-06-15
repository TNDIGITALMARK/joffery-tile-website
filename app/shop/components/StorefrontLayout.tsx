'use client';

import { ReactNode } from 'react';
import { ShoppingBagIcon, MagnifyingGlassIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';

interface StorefrontLayoutProps {
  children: ReactNode;
  storeName?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  showSearch?: boolean;
  showUserIcon?: boolean;
  className?: string;
}

export const StorefrontLayout = ({
  children,
  storeName = "Your Store",
  cartItemCount = 0,
  onCartClick,
  onSearchClick,
  onMenuClick,
  showSearch = true,
  showUserIcon = true,
  className = ""
}: StorefrontLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            {/* Logo/Store Name */}
            <div className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{storeName}</h1>
            </div>

            {/* Desktop Navigation - can be extended */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Products
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Collections
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {showSearch && (
                <button
                  onClick={onSearchClick}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </button>
              )}

              {showUserIcon && (
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <UserIcon className="w-6 h-6" />
                </button>
              )}

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingBagIcon className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Store Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">{storeName}</h3>
              <p className="text-gray-400 mb-4">
                Your trusted online store for quality products at great prices.
              </p>
              <div className="flex space-x-4">
                {/* Social media links - can be extended */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Shipping
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {storeName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StorefrontLayout; 