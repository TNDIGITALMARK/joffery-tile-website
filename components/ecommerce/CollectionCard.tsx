'use client';

import { motion } from 'framer-motion';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { Collection } from './types';

interface CollectionCardProps {
  collection: Collection;
  onClick?: () => void;
  showProductCount?: boolean;
  className?: string;
}

export const CollectionCard = ({ 
  collection, 
  onClick,
  showProductCount = true,
  className = ""
}: CollectionCardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer group hover:shadow-md transition-all duration-200 ${className}`}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      <div className="aspect-video bg-gray-100 overflow-hidden relative">
        {collection.image ? (
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Squares2X2Icon className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{collection.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{collection.description}</p>
        
        <div className="flex items-center justify-between">
          {showProductCount && (
            <span className="text-sm text-gray-500">
              {collection.productIds.length} product{collection.productIds.length !== 1 ? 's' : ''}
            </span>
          )}
          <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
            Explore →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CollectionCard; 