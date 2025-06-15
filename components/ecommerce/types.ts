// Ecommerce TypeScript Types
// All interfaces and types used across ecommerce components

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

export interface Collection {
  id: string;
  name: string;
  description: string;
  image?: string;
  productIds: string[];
  status: 'active' | 'draft';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  inventory?: number;
  attributes: Record<string, string>; // e.g., { color: 'red', size: 'M' }
}

export interface ExtendedProduct extends Product {
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  longDescription?: string;
  specifications?: Record<string, string>;
  shippingInfo?: string;
  returnPolicy?: string;
}

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

export interface CheckoutItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface CheckoutSession {
  items: CheckoutItem[];
  successUrl: string;
  cancelUrl: string;
  customer?: {
    email?: string;
  };
}

export interface OrderDetails {
  orderId?: string;
  orderNumber?: string;
  message?: string;
} 