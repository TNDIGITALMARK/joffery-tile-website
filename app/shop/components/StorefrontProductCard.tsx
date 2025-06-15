'use client';

import { motion } from 'framer-motion';
import { PhotoIcon, StarIcon } from '@heroicons/react/24/outline';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  status: 'active' | 'draft' | 'archived';
  visibility: 'public' | 'private';
  featured: boolean;
  category?: string;
  images: Array<{
    url: string;
    alt: string;
    isMain: boolean;
  }>;
  inventory: {
    quantity: number;
    trackQuantity: boolean;
  };
  collections: string[];
  createdAt: string;
  updatedAt: string;
}

interface StorefrontProductCardProps {
  product: Product;
  onClick?: () => void;
  showFeaturedBadge?: boolean;
  showInventoryWarning?: boolean;
  className?: string;
}

export const StorefrontProductCard = ({ 
  product, 
  onClick,
  showFeaturedBadge = true,
  showInventoryWarning = true,
  className = ""
}: StorefrontProductCardProps) => {
  const mainImage = product.images.find(img => img.isMain) || product.images[0];
  
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-200 ${className}`}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      <div className="aspect-square bg-gray-100 overflow-hidden relative">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PhotoIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {showFeaturedBadge && product.featured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <StarIcon className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Sale badge - can be extended later */}
        {/* {product.salePrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </div>
        )} */}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${(product.price / 100).toFixed(2)}
            </span>
            {/* Sale price display - can be extended later */}
            {/* {product.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                ${(product.originalPrice / 100).toFixed(2)}
              </span>
            )} */}
          </div>
          
          {showInventoryWarning && product.inventory.trackQuantity && product.inventory.quantity < 10 && product.inventory.quantity > 0 && (
            <span className="text-xs text-orange-600 font-medium">
              Only {product.inventory.quantity} left
            </span>
          )}
          
          {product.inventory.trackQuantity && product.inventory.quantity === 0 && (
            <span className="text-xs text-red-600 font-medium">
              Out of stock
            </span>
          )}
        </div>

        {product.category && (
          <div className="mt-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StorefrontProductCard; 