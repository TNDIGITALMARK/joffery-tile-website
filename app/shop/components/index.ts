// Reusable Storefront Components
// These components are designed to be used both in the preview and on live websites

export { StorefrontProductCard, type Product } from './StorefrontProductCard';
export { StorefrontCollectionCard, type Collection } from './StorefrontCollectionCard';
export { StorefrontLayout } from './StorefrontLayout';
export { ProductDetailPage } from './ProductDetailPage';

// Types
export interface StorefrontConfig {
  storeName: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
  currency?: string;
  showSearch?: boolean;
  showUserIcon?: boolean;
  showWishlist?: boolean;
  enableReviews?: boolean;
  enableVariants?: boolean;
}

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