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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Shop</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Shop</h1>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <span>{activeProducts.length} products</span>
                <span>•</span>
                <span>{activeCollections.length} collections</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  showFilters 
                    ? 'bg-blue-50 border-blue-200 text-blue-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FunnelIcon className="h-4 w-4" />
                <span>Filters</span>
              </button>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Squares2X2Icon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ListBulletIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border-b"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Collection Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Collection</label>
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Collections</option>
                  {activeCollections.map(collection => (
                    <option key={collection.id} value={collection.id}>
                      {collection.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Only</span>
                </label>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory || selectedCollection || showFeaturedOnly || priceRange) && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Search: {searchTerm}
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Category: {selectedCategory}
                    </span>
                  )}
                  {selectedCollection && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Collection: {collections.find(c => c.id === selectedCollection)?.name}
                    </span>
                  )}
                  {showFeaturedOnly && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Featured Only
                    </span>
                  )}
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collections Section */}
        {filteredCollections.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map(collection => (
                <StorefrontCollectionCard
                  key={collection.id}
                  collection={collection}
                  onClick={() => handleCollectionClick(collection)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Products ({filteredProducts.length})
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {products.length === 0 
                ? "No products have been added to your store yet."
                : "Try adjusting your search or filter criteria."
              }
            </p>
            {(searchTerm || selectedCategory || selectedCollection || showFeaturedOnly) && (
              <button
                onClick={clearFilters}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map(product => (
              <StorefrontProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 