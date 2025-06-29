'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  ShoppingBagIcon,
  PhotoIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { type Product } from '../components';

interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  inventory?: number;
  attributes: Record<string, string>;
}

interface ExtendedProduct extends Product {
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  longDescription?: string;
  specifications?: Record<string, string>;
  shippingInfo?: string;
  returnPolicy?: string;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'shipping' | 'reviews'>('description');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  // Get tenant ID from environment variable
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  // Fetch product data
  const fetchProduct = async () => {
    if (!tenantId || !productId) return;

    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${API_BASE_URL}/api/storefront/${tenantId}/products/${productId}`, {
        headers: { 'X-Tenant-ID': tenantId }
      });

      if (!response.ok) {
        throw new Error('Product not found');
      }

      const data = await response.json();
      setProduct(data.product);
      
      // Set first variant as selected if variants exist
      if (data.product.variants && data.product.variants.length > 0) {
        setSelectedVariant(data.product.variants[0]);
      }

    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [tenantId, productId]);

  if (!tenantId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Configuration Required</h2>
          <p className="text-gray-600">Please configure NEXT_PUBLIC_TENANT_ID in your environment variables.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The product you are looking for does not exist.'}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const currentInventory = selectedVariant?.inventory || product.inventory.quantity;
  const isOutOfStock = product.inventory.trackQuantity && currentInventory === 0;

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex(prev => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    } else {
      setSelectedImageIndex(prev => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Adding to cart:', {
      productId: product.id,
      variantId: selectedVariant?.id,
      quantity
    });
  };

  const handleBuyNow = async () => {
    if (!tenantId || !product) return;

    try {
      setIsCreatingCheckout(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      // Create checkout session
      const checkoutData = {
        items: [
          {
            productId: product.id,
            variantId: selectedVariant?.id,
            quantity: quantity
          }
        ],
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: window.location.href,
        customer: {
          email: undefined // No user email in template version
        }
      };

      console.log('Creating checkout session:', checkoutData);

      const response = await fetch(`${API_BASE_URL}/api/storefront/${tenantId}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-ID': tenantId
        },
        body: JSON.stringify(checkoutData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const result = await response.json();
      
      if (result.success && result.url) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        throw new Error(result.message || 'Failed to create checkout session');
      }

    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError(error instanceof Error ? error.message : 'Failed to start checkout');
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    // Wishlist logic here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIconSolid
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Shop</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-lg transition-colors ${
                  isInWishlist 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {isInWishlist ? (
                  <HeartIconSolid className="w-6 h-6" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4 max-w-lg">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden border border-gray-200">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={product.images[selectedImageIndex]?.url}
                    alt={product.images[selectedImageIndex]?.alt || product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageNavigation('prev')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => handleImageNavigation('next')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <PhotoIcon className="w-24 h-24" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index 
                        ? 'border-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${(currentPrice / 100).toFixed(2)}
                </span>
                
                {product.featured && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <StarIcon className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Options</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      {variant.price && (
                        <div className="text-sm text-gray-600">
                          ${(variant.price / 100).toFixed(2)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
                
                <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                  {quantity}
                </span>
                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
              
              {product.inventory.trackQuantity && (
                <p className="text-sm text-gray-600 mt-2">
                  {currentInventory > 0 
                    ? `${currentInventory} in stock`
                    : 'Out of stock'
                  }
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || isCreatingCheckout}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isCreatingCheckout ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon className="w-5 h-5" />
                    {isOutOfStock ? 'Out of Stock' : 'Buy Now'}
                  </>
                )}
              </button>
              
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                Add to Cart
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <InformationCircleIcon className="w-5 h-5 text-red-600" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <TruckIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Secure payment processing</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <ArrowPathIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'shipping', label: 'Shipping' },
                { id: 'reviews', label: 'Reviews' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {product.longDescription || product.description}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                {product.specifications ? (
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <dt className="font-medium text-gray-900">{key}</dt>
                        <dd className="text-gray-600">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-gray-600">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  {product.shippingInfo || 'Standard shipping information will be provided at checkout.'}
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Customer reviews will be displayed here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 