import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import api from '../api/client';

interface Category { id: number; name: string; slug: string; }
interface Product { id: number; name: string; price: number; stock: number; active: boolean; featured: boolean; rating: number; reviewCount: number; imageUrl?: string; description?: string; categoryId: number; category?: Category; }

const EMPTY: Partial<Product> = { name: '', price: 0, stock: 100, active: true, featured: false, rating: 0, reviewCount: 0, description: '', imageUrl: '' };

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Partial<Product>>(EMPTY);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchProducts = async () => {
        const { data } = await api.get('/products?limit=100');
        setProducts(data.products);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
        api.get('/products/categories').then(({ data }) => setCategories(data));
    }, []);

    const openAdd = () => { setEditing({ ...EMPTY, categoryId: categories[0]?.id }); setShowModal(true); };
    const openEdit = (p: Product) => { setEditing(p); setShowModal(true); };

    const save = async () => {
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(editing).forEach(([k, v]) => { if (v !== undefined && k !== 'category') fd.append(k, String(v)); });
            if (editing.id) {
                await api.put(`/products/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await api.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            await fetchProducts();
            setShowModal(false);
        } finally {
            setSaving(false);
        }
    };

    const deleteProduct = async (id: number) => {
        if (!confirm('Deactivate this product?')) return;
        await api.delete(`/products/${id}`);
        await fetchProducts();
    };

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 text-sm mt-1">{products.length} total products</p>
                </div>
                <button onClick={openAdd} className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Product
                </button>
            </div>

            {/* Search */}
            <div className="card mb-6 py-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="input pl-9 max-w-xs" />
                </div>
            </div>

            {/* Table */}
            <div className="card p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {['Image', 'Product', 'Category', 'Price', 'Stock', 'Rating', 'Status', 'Actions'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
                            ) : filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <img src={p.imageUrl || 'https://via.placeholder.com/40'} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-gray-900">{p.name}</div>
                                        <div className="text-gray-400 text-xs truncate max-w-[200px]">{p.description}</div>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{p.category?.name || '—'}</td>
                                    <td className="px-4 py-3 font-semibold text-cm-blue">₹{p.price.toLocaleString('en-IN')}</td>
                                    <td className="px-4 py-3">{p.stock}</td>
                                    <td className="px-4 py-3">⭐ {p.rating} ({p.reviewCount})</td>
                                    <td className="px-4 py-3">
                                        <span className={p.active ? 'badge-green' : 'badge-red'}>{p.active ? 'Active' : 'Inactive'}</span>
                                        {p.featured && <span className="badge-blue ml-1">Featured</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => deleteProduct(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-lg font-bold">{editing.id ? 'Edit Product' : 'Add Product'}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="label">Product Name *</label>
                                <input className="input" value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                            </div>
                            <div className="col-span-2">
                                <label className="label">Description</label>
                                <textarea className="input" rows={3} value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="label">Price (₹) *</label>
                                <input type="number" className="input" value={editing.price || ''} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label">Category *</label>
                                <select className="input" value={editing.categoryId || ''} onChange={(e) => setEditing({ ...editing, categoryId: Number(e.target.value) })}>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="label">Stock</label>
                                <input type="number" className="input" value={editing.stock || ''} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label">Image URL</label>
                                <input className="input" value={editing.imageUrl || ''} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} />
                            </div>
                            <div>
                                <label className="label">Rating (0-5)</label>
                                <input type="number" step="0.1" className="input" value={editing.rating || ''} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} />
                            </div>
                            <div>
                                <label className="label">Review Count</label>
                                <input type="number" className="input" value={editing.reviewCount || ''} onChange={(e) => setEditing({ ...editing, reviewCount: Number(e.target.value) })} />
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={!!editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} />
                                    <span className="text-sm">Active</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                                    <span className="text-sm">Featured</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={save} disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Product'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
