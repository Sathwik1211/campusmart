import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import api from '../api/client';

interface Category { id: number; name: string; slug: string; }
interface Product { id: number; name: string; price: number; stock: number; active: boolean; featured: boolean; rating: number; reviewCount: number; imageUrl?: string; description?: string; categoryId: number; category?: Category; sku?: string; images?: string; specifications?: string; }

const EMPTY: Partial<Product> = { name: '', price: 0, stock: 100, active: true, featured: false, rating: 0, reviewCount: 0, description: '', imageUrl: '', sku: '', images: '', specifications: '' };

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
    
    const openEdit = (p: Product) => { 
        // Convert JSON back to user-friendly text for editing
        let imagesText = p.images || '';
        if (imagesText.startsWith('[')) {
           try { imagesText = JSON.parse(imagesText).join(', '); } catch {}
        }
        let specsText = p.specifications || '';
        if (specsText.startsWith('{')) {
           try {
              const obj = JSON.parse(specsText);
              specsText = Object.entries(obj).map(([k,v]) => `${k}: ${v}`).join('\n');
           } catch {}
        }
        setEditing({ ...p, images: imagesText, specifications: specsText }); 
        setShowModal(true); 
    };

    const save = async () => {
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(editing).forEach(([k, v]) => { 
                if (v !== undefined && k !== 'category') {
                    let val = v;
                    // Intercept and convert back to JSON for backend
                    if (k === 'images' && typeof v === 'string' && !v.trim().startsWith('[')) {
                        val = JSON.stringify(v.split(',').map(s => s.trim()).filter(Boolean));
                    }
                    if (k === 'specifications' && typeof v === 'string' && !v.trim().startsWith('{')) {
                        const obj: Record<string, string> = {};
                        v.split('\n').forEach(line => {
                            const parts = line.split(':');
                            if (parts.length >= 2) {
                                const key = parts[0].trim();
                                const value = parts.slice(1).join(':').trim();
                                if (key) obj[key] = value;
                            }
                        });
                        val = JSON.stringify(obj);
                    }
                    fd.append(k, String(val)); 
                } 
            });
            
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

    // Bulk Upload State
    const [showBulkModal, setShowBulkModal] = useState(false);
    const [bulkCategory, setBulkCategory] = useState<number | ''>('');
    const [csvData, setCsvData] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleBulkUpload = async () => {
        if (!csvData.trim()) return alert('Please paste CSV data');
        setUploading(true);
        try {
            const trimmedData = csvData.trim();
            if (trimmedData.startsWith('<!DOCTYPE html>') || trimmedData.startsWith('<html')) {
                setUploading(false);
                return alert('ERROR: The loaded data is an HTML webpage, not raw CSV text. Please ensure you share using the correct /export?format=csv Link or choose "CSV" when publishing.');
            }

            // Filter out empty rows (like leading commas ',,,,,') that crash column builders
            const lines = trimmedData.split('\n').filter(row => row.replace(/,/g, '').trim() !== '');
            if (lines.length === 0) return alert('No valid rows found inside data.');

            const headers = lines[0].split(',').map(h => {
                const clean = h.trim().replace(/^"|"$/g, '').replace(/\s+/g, '').toLowerCase();
                // Normalized mapping back to strict camelcase for backend
                if (clean === 'categoryslug' || clean === 'category_slug') return 'categorySlug';
                if (clean === 'imageurl' || clean === 'image_url') return 'imageUrl';
                if (clean === 'specications' || clean === 'specification') return 'specifications';
                return clean;
            });

            const productsData = lines.slice(1).map(line => {
                // Regex to split by comma ONLY if it is not inside double quotes
                const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
                const p: any = {};
                headers.forEach((h, idx) => { if (values[idx] !== undefined) p[h] = values[idx]; });
                return p;
            });
            
            await api.post('/products/bulk', { 
                products: productsData, 
                categoryId: bulkCategory || undefined 
            });
            
            alert('Bulk upload successful!');
            fetchProducts();
            setShowBulkModal(false);
            setCsvData('');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Bulk upload failed. Check CSV format.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Product Inventory</h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{products.length} Items cataloged</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowBulkModal(true)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                        Bulk Upload
                    </button>
                    <button onClick={openAdd} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                        <Plus className="w-5 h-5" /> Add New Product
                    </button>
                </div>
            </div>

            {/* ... existing search and table code ... */}
            {/* Search */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <div className="relative max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search catalog..." className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-gray-100">
                            <tr>
                                {['Image', 'Product details', 'Category', 'Pricing', 'Stock', 'Rating', 'Visibility', 'Actions'].map((h) => (
                                    <th key={h} className="px-6 py-4 text-left font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 bg-white">
                            {loading ? (
                                <tr><td colSpan={8} className="px-6 py-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing Inventory...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={8} className="px-6 py-12 text-center text-slate-400">No products match your search.</td></tr>
                            ) : filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                            <img src={p.imageUrl || 'https://via.placeholder.com/40'} alt={p.name} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</div>
                                        <div className="text-slate-400 text-[10px] font-medium truncate max-w-[200px] uppercase tracking-wide mt-0.5">{p.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg uppercase tracking-widest">{p.category?.name || 'Unset'}</span>
                                    </td>
                                    <td className="px-6 py-4 font-black text-blue-600">₹{p.price.toLocaleString('en-IN')}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{p.stock}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 font-bold text-orange-400">
                                            <span>⭐</span>
                                            <span className="text-slate-700">{p.rating}</span>
                                            <span className="text-slate-300 text-[10px]">({p.reviewCount})</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={`text-[10px] font-black uppercase text-center px-2 py-0.5 rounded-full border ${p.active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                                {p.active ? 'Active' : 'Inactive'}
                                            </span>
                                            {p.featured && <span className="text-[10px] font-black uppercase text-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">Featured</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEdit(p)} className="p-2 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-600 scale-90 hover:scale-100"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => deleteProduct(p.id)} className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm border border-transparent hover:border-red-600 scale-90 hover:scale-100"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bulk Upload Modal */}
            {showBulkModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-8 border-b">
                            <div>
                                <h2 className="text-xl font-black text-slate-900">Bulk Load Products</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">CSV Data Importer</p>
                            </div>
                            <button onClick={() => setShowBulkModal(false)} className="p-2 text-gray-400 hover:text-red-500 rounded-xl transition-all"><X className="w-6 h-6" /></button>
                        </div>
                        
                        <div className="p-8 space-y-6 overflow-y-auto">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-[#2c3e50] font-bold">1. Target Category (Optional Override)</label>
                                <select 
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white font-bold"
                                    value={bulkCategory}
                                    onChange={(e) => setBulkCategory(Number(e.target.value) || '')}
                                >
                                    <option value="">Use categorySlug from CSV</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <p className="text-[10px] text-slate-400">If you select a category here, all products in the CSV will be assigned to it.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-[#2c3e50] font-bold">2. Load Data from Source</label>
                                <div className="flex gap-2">
                                    <input 
                                       type="url" 
                                       placeholder="Paste Google Sheet 'Publish to Web' CSV Link..." 
                                       className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium" 
                                       id="sheetUrlInput"
                                    />
                                    <button 
                                       onClick={async () => {
                                          const url = (document.getElementById('sheetUrlInput') as HTMLInputElement).value;
                                          if (!url) return alert('Enter a URL first');
                                          try {
                                             setUploading(true);
                                             const { data } = await api.get(`/pages/proxy?url=${encodeURIComponent(url)}`); 
                                             setCsvData(data);
                                          } catch {
                                             // Fallback to direct axios call if proxy fails or not set up
                                             try {
                                                const axios = (await import('axios')).default;
                                                const { data } = await axios.get(url);
                                                setCsvData(data);
                                             } catch {
                                                alert('Failed to fetch data. Ensure it is Published to Web as CSV.');
                                             }
                                          } finally { setUploading(false); }
                                       }}
                                       disabled={uploading}
                                       className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs"
                                    >
                                       Fetch
                                    </button>
                                </div>
                                <div className="relative">
                                    <p className="text-[9px] text-slate-400 mt-1 mb-2">To get the link: Open Sheet &gt; File &gt; Share &gt; Publish to the web &gt; Choose 'CSV' &gt; Copy Link.</p>
                                    <textarea 
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-56 font-mono"
                                        value={csvData}
                                        onChange={(e) => setCsvData(e.target.value)}
                                        placeholder="Or paste raw CSV here manually..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t flex justify-end gap-3 bg-slate-50/50">
                            <button onClick={() => setShowBulkModal(false)} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-900">Cancel</button>
                            <button onClick={handleBulkUpload} disabled={uploading} className="px-8 py-2.5 bg-blue-600 text-white text-sm font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50">
                                {uploading ? 'Uploading...' : 'Start Import'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center justify-between p-8 border-b bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-black text-slate-900 tracking-tight">{editing.id ? 'Edit Product Details' : 'Onboard New Product'}</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Catalog Management System</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"><X className="w-6 h-6" /></button>
                        </div>

                        <div className="p-8 grid grid-cols-2 gap-6 overflow-y-auto">
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Product Name *</label>
                                <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                            </div>
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Product Narrative</label>
                                <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none h-24 font-medium" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Listing Price (₹) *</label>
                                <input type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-black text-blue-600" value={editing.price || ''} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Category Classification *</label>
                                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white font-bold text-slate-600" value={editing.categoryId || ''} onChange={(e) => setEditing({ ...editing, categoryId: Number(e.target.value) })}>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Cover Image URL</label>
                                <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={editing.imageUrl || ''} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} />
                            </div>

                            <div className="col-span-2 space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Gallery Images (Comma-separated list of URLs)</label>
                                <textarea className="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-20 font-mono" value={editing.images || ''} onChange={(e) => setEditing({ ...editing, images: e.target.value })} placeholder='https://site.com/1.jpg, https://site.com/2.jpg' />
                            </div>

                            <div className="col-span-2 space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest text-[10px]">Technical Specifications (Line-separated Key: Value pairs)</label>
                                <textarea className="w-full border border-gray-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-24 font-mono" value={editing.specifications || ''} onChange={(e) => setEditing({ ...editing, specifications: e.target.value })} placeholder={"Frame: Steel\nHeight: 30 in\nColor: Blue"} />
                            </div>

                            <div className="col-span-2 flex items-center gap-8 pt-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={!!editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} />
                                    <span className="text-xs font-black uppercase text-slate-400 group-hover:text-slate-900 transition-colors">Visible on storefront</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                                    <span className="text-xs font-black uppercase text-slate-400 group-hover:text-slate-900 transition-colors">Show in Featured Sections</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-8 border-t bg-slate-50/50">
                            <button onClick={() => setShowModal(false)} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Abort Changes</button>
                            <button onClick={save} disabled={saving} className="px-8 py-2.5 bg-blue-600 text-white text-sm font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                                {saving ? 'Processing...' : 'Sync with Database'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

