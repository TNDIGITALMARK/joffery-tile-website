'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { ProductCard } from './ProductCard';
import { CollectionCard } from './CollectionCard';
import { Product, Collection } from './types';
import {
  getActiveProducts,
  getActiveCollections,
  searchProducts,
  getProductsByCategory,
  sortProducts,
  filterProductsByPriceRange,
  getUniqueCategories
} from './utils';

interface ProductGridProps {
  className?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  productsPerPage?: number;
  onProductClick?: (product: Product) => void;
  onCollectionClick?: (collection: Collection) => void;
  showCollections?: boolean;
  viewMode?: 'grid' | 'list';
  enableViewModeToggle?: boolean;
}

export const ProductGrid = ({
  className = "",
  showFilters = true,
  showSearch = true,
  productsPerPage = 12,
  onProductClick,
  onCollectionClick,
  showCollections = true,
  viewMode: initialViewMode = 'grid',
  enableViewModeToggle = true
}: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_TENANT_API_URL || 'http://localhost:3001/api';
      const tenantId = 'demo';
      
      const [productsResponse, collectionsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/storefront/${tenantId}/products`, {
          headers: { 'X-Tenant-ID': tenantId }
        }).catch(() => null),
        fetch(`${API_BASE_URL}/storefront/${tenantId}/collections`, {
          headers: { 'X-Tenant-ID': tenantId }
        }).catch(() => null)
      ]);

      let productsData = { products: [] };
      let collectionsData = { collections: [] };

      if (productsResponse?.ok) {
        productsData = await productsResponse.json();
      }

      if (collectionsResponse?.ok) {
        collectionsData = await collectionsResponse.json();
      }

      setProducts(productsData.products || []);
      setCollections(collectionsData.collections || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get filtered and sorted data
  const getFilteredProducts = () => {
    let filtered = getActiveProducts(products);

    if (selectedCollection) {
      const collection = collections.find(c => c.id === selectedCollection);
      if (collection && collection.productIds) {
        filtered = filtered.filter(p => collection.productIds.includes(p.id));
      }
    }

    if (searchTerm) {
      filtered = searchProducts(filtered, searchTerm);
    }

    if (selectedCategory) {
      filtered = getProductsByCategory(filtered, selectedCategory);
    }

    if (priceRange) {
      filtered = filterProductsByPriceRange(filtered, priceRange);
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter(p => p.featured);
    }

    return sortProducts(filtered, sortBy);
  };

  const getFilteredCollections = () => {
    let filtered = getActiveCollections(collections);

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const categories = getUniqueCategories(products);
  const filteredProducts = getFilteredProducts();
  const filteredCollections = getFilteredCollections();

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      window.location.href = `/products/${product.id}`;
    }
  };

  const handleCollectionClick = (collection: Collection) => {
    if (onCollectionClick) {
      onCollectionClick(collection);
    } else {
      setSelectedCollection(collection.id);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCollection('');
    setPriceRange(null);
    setShowFeaturedOnly(false);
    setSortBy('newest');
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters Header */}
      {(showSearch || showFilters || enableViewModeToggle) && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            {showSearch && (
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products and collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                />
              </div>
            )}

            <div className="flex items-center gap-4">
              {/* Filter Toggle */}
              {showFilters && (
                <motion.button
                  onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                  className="flex items-center gap-3 px-6 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FunnelIcon className="w-5 h-5" />
                  Filters
                  <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showFiltersPanel ? 'rotate-180' : ''}`} />
                </motion.button>
              )}

              {/* View Mode Toggle */}
              {enableViewModeToggle && (
                <div className="flex border border-gray-300 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Squares2X2Icon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <ListBulletIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && showFiltersPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 pt-8 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Featured Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">Featured</label>
                  <label className="flex items-center p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showFeaturedOnly}
                      onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium">Featured products only</span>
                  </label>
                </div>

                {/* Sort */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="newest">Newest First</option>
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">Actions</label>
                  <button
                    onClick={clearFilters}
                    className="w-full p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Products and Collections Grid */}
      <div className="space-y-6">
        {/* Collections */}
        {showCollections && filteredCollections.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collections</h3>
            <motion.div 
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CollectionCard
                    collection={collection}
                    onClick={() => handleCollectionClick(collection)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Products ({filteredProducts.length})
            </h3>
            <motion.div 
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onClick={() => handleProductClick(product)}
                    className="hover:shadow-lg"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-lg mx-auto">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Squares2X2Icon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No products found
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {searchTerm || selectedCategory || selectedCollection || priceRange || showFeaturedOnly
                  ? 'No products match your current filters. Try adjusting your search criteria.'
                  : 'No products are currently available.'
                }
              </p>
              {(searchTerm || selectedCategory || selectedCollection || priceRange || showFeaturedOnly) && (
                <motion.button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid; 