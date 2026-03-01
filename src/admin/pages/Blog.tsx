import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import api from '../api/client';

interface Post { id: number; title: string; slug: string; excerpt: string; body: string; imageUrl?: string; published: boolean; publishedAt?: string; createdAt: string; }

const EMPTY: Partial<Post> = { title: '', excerpt: '', body: '', imageUrl: '', published: false };

export default function Blog() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Partial<Post>>(EMPTY);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetch = async () => {
        const { data } = await api.get('/blog?all=true&limit=100');
        setPosts(data.posts);
        setLoading(false);
    };

    useEffect(() => { fetch(); }, []);

    const openAdd = () => { setEditing(EMPTY); setShowModal(true); };
    const openEdit = (p: Post) => { setEditing(p); setShowModal(true); };

    const save = async () => {
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(editing).forEach(([k, v]) => { if (v !== undefined) fd.append(k, String(v)); });
            if (editing.id) { await api.put(`/blog/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } }); }
            else { await api.post('/blog', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); }
            await fetch();
            setShowModal(false);
        } finally { setSaving(false); }
    };

    const deletePost = async (id: number) => {
        if (!confirm('Delete this post?')) return;
        await api.delete(`/blog/${id}`);
        await fetch();
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div><h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1><p className="text-gray-500 text-sm mt-1">{posts.length} posts</p></div>
                <button onClick={openAdd} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> New Post</button>
            </div>

            <div className="card p-0 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>{['Image', 'Title', 'Excerpt', 'Status', 'Date', 'Actions'].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
                            : posts.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3"><img src={p.imageUrl || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-lg object-cover" /></td>
                                    <td className="px-4 py-3"><div className="font-medium text-gray-900 max-w-[200px] truncate">{p.title}</div></td>
                                    <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">{p.excerpt}</td>
                                    <td className="px-4 py-3"><span className={p.published ? 'badge-green' : 'badge-yellow'}>{p.published ? 'Published' : 'Draft'}</span></td>
                                    <td className="px-4 py-3 text-gray-500 text-xs">{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-IN') : '—'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => deletePost(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-lg font-bold">{editing.id ? 'Edit Post' : 'New Blog Post'}</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div><label className="label">Title *</label><input className="input" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
                            <div><label className="label">Excerpt *</label><textarea className="input" rows={2} value={editing.excerpt || ''} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></div>
                            <div><label className="label">Body (HTML supported) *</label><textarea className="input" rows={10} value={editing.body || ''} onChange={(e) => setEditing({ ...editing, body: e.target.value })} style={{ fontFamily: 'monospace' }} /></div>
                            <div><label className="label">Image URL</label><input className="input" value={editing.imageUrl || ''} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} /></div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={!!editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
                                <span className="text-sm font-medium">Published</span>
                            </label>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={save} disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Post'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
