'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChevronDownIcon,
  XMarkIcon,
  StarIcon,
  TagIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  CubeIcon,
  Cog6ToothIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { 
  StorefrontProductCard, 
  StorefrontCollectionCard,
  type Product,
  type Collection,
  getActiveProducts,
  getFeaturedProducts,
  getActiveCollections,
  searchProducts,
  getProductsByCategory
} from './components';

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);

  // Get tenant ID from environment variable
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;

  // Fetch data
  const fetchData = async () => {
    if (!tenantId) {
      setError('Tenant ID not configured');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const [productsResponse, collectionsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/tenant/products?limit=100`, {
          headers: { 'X-Tenant-ID': tenantId }
        }),
        fetch(`${API_BASE_URL}/api/tenant/collections?limit=100`, {
          headers: { 'X-Tenant-ID': tenantId }
        })
      ]);

      if (!productsResponse.ok || !collectionsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [productsData, collectionsData] = await Promise.all([
        productsResponse.json(),
        collectionsResponse.json()
      ]);

      setProducts(productsData.products || []);
      setCollections(collectionsData.collections || []);

    } catch (error) {
      console.error('Error fetching shop data:', error);
      setError('Failed to load shop data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tenantId]);

  // Get filtered and sorted data
  const getFilteredProducts = () => {
    let filtered = getActiveProducts(products);

    // Collection filter (treat collections as filters)
    if (selectedCollection) {
      const collection = collections.find(c => c.id === selectedCollection);
      if (collection && collection.productIds) {
        filtered = filtered.filter(p => collection.productIds.includes(p.id));
      }
    }

    // Search filter
    if (searchTerm) {
      filtered = searchProducts(filtered, searchTerm);
    }

    // Category filter
    if (selectedCategory) {
      filtered = getProductsByCategory(filtered, selectedCategory);
    }

    // Price range filter
    if (priceRange) {
      filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter(p => p.featured);
    }

    // Sort
    filtered.sort((a, b) => {
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

    return filtered;
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

  // Get unique categories
  const categories = [...new Set(
    getActiveProducts(products)
      .map(p => p.category)
      .filter(Boolean)
  )].sort();

  const filteredProducts = getFilteredProducts();
  const filteredCollections = getFilteredCollections();
  const activeProducts = getActiveProducts(products);
  const activeCollections = getActiveCollections(collections);

  const handleProductClick = (product: Product) => {
    router.push(`/shop/${product.id}`);
  };

  const handleCollectionClick = (collection: Collection) => {
    router.push(`/collections/${collection.id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCollection('');
    setPriceRange(null);
    setShowFeaturedOnly(false);
    setSortBy('newest');
  };

  if (!tenantId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuration Required</h2>
            <p className="text-gray-600">Please configure NEXT_PUBLIC_TENANT_ID in your environment variables.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Shop</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchData}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Storefront Header */}
        <motion.div 
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Browse Products</h2>
              <p className="text-gray-600">
                Use the sidebar to browse by collections and filter products.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
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
            </div>
          </div>
        </motion.div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory || selectedCollection || priceRange || showFeaturedOnly) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
            {selectedCollection && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                <TagIcon className="w-4 h-4" />
                {collections.find(c => c.id === selectedCollection)?.name}
                <button onClick={() => setSelectedCollection('')}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                <TagIcon className="w-4 h-4" />
                {selectedCategory}
                <button onClick={() => setSelectedCategory('')}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
            {priceRange && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <span>$</span>
                ${priceRange.min} - ${priceRange.max}
                <button onClick={() => setPriceRange(null)}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
            {showFeaturedOnly && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                <StarIcon className="w-4 h-4" />
                Featured Only
                <button onClick={() => setShowFeaturedOnly(false)}>
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Main Content with Sidebar */}
        <div className="flex gap-8">
          {/* Ecommerce Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Search Products</label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Collections Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Shop by Collection</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCollection('')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      !selectedCollection 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">All Products</span>
                      <span className="text-sm text-gray-500">{activeProducts.length}</span>
                    </div>
                  </button>
                  {activeCollections.map((collection) => (
                    <button
                      key={collection.id}
                      onClick={() => setSelectedCollection(collection.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedCollection === collection.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{collection.name}</span>
                        <span className="text-sm text-gray-500">{collection.productIds?.length || 0}</span>
                      </div>
                      {collection.description && (
                        <p className="text-xs text-gray-500 mt-1 truncate">{collection.description}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Categories</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                        !selectedCategory 
                          ? 'bg-purple-50 text-purple-700' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                          selectedCategory === category
                            ? 'bg-purple-50 text-purple-700' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Sort by Price</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Featured Toggle */}
              <div className="mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">Featured products only</span>
                </label>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory || selectedCollection || priceRange || showFeaturedOnly) && (
                <motion.button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear All Filters
                </motion.button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <motion.div 
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                                     <StorefrontProductCard
                     product={product}
                     onClick={() => handleProductClick(product)}
                   />
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
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
                      : 'No products are currently available in your store.'
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
      </div>
    </div>
  );
} 