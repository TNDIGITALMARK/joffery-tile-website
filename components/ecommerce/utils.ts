// Ecommerce Utility Functions
// Helper functions for storefront functionality

import { Product, Collection } from './types';

// Utility functions for storefront
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price / 100);
};

export const getActiveProducts = (products: Product[]): Product[] => {
  return products.filter(product => 
    product.status === 'active' && product.visibility === 'public'
  );
};

export const getFeaturedProducts = (products: Product[]): Product[] => {
  return getActiveProducts(products).filter(product => product.featured);
};

export const getActiveCollections = (collections: Collection[]): Collection[] => {
  return collections.filter(collection => collection.status === 'active');
};

export const getProductsByCategory = (products: Product[], category: string): Product[] => {
  return getActiveProducts(products).filter(product => 
    product.category?.toLowerCase() === category.toLowerCase()
  );
};

export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  const term = searchTerm.toLowerCase();
  return getActiveProducts(products).filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.category?.toLowerCase().includes(term)
  );
};

export const sortProducts = (
  products: Product[], 
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest'
): Product[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });
};

export const filterProductsByPriceRange = (
  products: Product[], 
  priceRange: { min: number; max: number }
): Product[] => {
  return products.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
};

export const getUniqueCategories = (products: Product[]): string[] => {
  return [...new Set(
    getActiveProducts(products)
      .map(p => p.category)
      .filter((category): category is string => Boolean(category))
  )].sort();
}; 