import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Star, Filter, ChevronDown } from 'lucide-react';
import api from '@/api/client';

interface Category { id: number; name: string; slug: string; }
interface Product { id: number; name: string; slug: string; price: number; imageUrl?: string; rating: number; reviewCount: number; category: Category; }

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products/categories').then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { limit: '50' };
    if (selectedCategory !== 'all') params.category = selectedCategory;
    if (searchQuery) params.search = searchQuery;
    api.get('/products', { params })
      .then(({ data }) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <main className="min-h-screen bg-cm-gray">
      <div className="bg-white border-b">
        <div className="w-full mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-cm-blue"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <Link to="/my-account" className="relative p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-2 sm:px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-cm-blue" />
                <h3 className="font-bold text-cm-blue-dark">Categories</h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === 'all' ? 'bg-cm-blue text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === cat.slug ? 'bg-cm-blue text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-cm-blue-dark">
                {selectedCategory === 'all' ? 'All Products' : categories.find((c) => c.slug === selectedCategory)?.name}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <button className="flex items-center gap-1 px-3 py-1 bg-white rounded-lg border hover:bg-gray-50">
                  Popularity <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-6">
                <div className="w-8 h-8 border-4 border-cm-blue border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
                    <Link to={`/product/${product.slug}`} className="cursor-pointer">
                      <div className="h-48 overflow-hidden bg-slate-100">
                        <img
                          src={product.imageUrl || 'https://via.placeholder.com/400x300'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-4 flex-grow flex flex-col">
                      <Link to={`/product/${product.slug}`} className="cursor-pointer group">
                        <h3 className="font-bold text-cm-blue-dark mb-2 group-hover:text-cm-blue transition-colors leading-tight line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{product.rating}</span>
                        </div>
                        <span className="text-gray-500 text-sm">({product.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                        <span className="text-lg font-black text-cm-blue">{formatPrice(product.price)}</span>
                        <button className="px-4 py-2 bg-cm-blue text-white rounded-xl hover:bg-cm-blue-dark transition-colors font-bold text-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
