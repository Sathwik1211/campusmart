import { useEffect, useState } from 'react';
import { Plus, Trash2, ExternalLink, X } from 'lucide-react';
import api from '../api/client';

interface Catalogue { id: number; title: string; description?: string; fileUrl: string; thumbnailUrl?: string; active: boolean; createdAt: string; }

const EMPTY = { title: '', description: '', fileUrl: '', thumbnailUrl: '' };

export default function Catalogues() {
    const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(EMPTY);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetch = async () => {
        const { data } = await api.get('/catalogues');
        setCatalogues(data);
        setLoading(false);
    };

    useEffect(() => { fetch(); }, []);

    const save = async () => {
        setSaving(true);
        try {
            await api.post('/catalogues', form);
            await fetch();
            setShowModal(false);
            setForm(EMPTY);
        } finally { setSaving(false); }
    };

    const deleteCatalogue = async (id: number) => {
        if (!confirm('Hide this catalogue?')) return;
        await api.delete(`/catalogues/${id}`);
        setCatalogues((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div><h1 className="text-2xl font-bold text-gray-900">Catalogues</h1></div>
                <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Upload Catalogue</button>
            </div>

            {loading ? <div className="text-gray-400">Loading...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catalogues.map((c) => (
                        <div key={c.id} className="card flex flex-col">
                            {c.thumbnailUrl && <img src={c.thumbnailUrl} alt={c.title} className="w-full h-40 object-cover rounded-lg mb-4" />}
                            <div className="flex-1">
                                <div className="font-semibold text-gray-900">{c.title}</div>
                                <div className="text-sm text-gray-500 mt-1">{c.description}</div>
                                <div className="text-xs text-gray-400 mt-2">{new Date(c.createdAt).toLocaleDateString('en-IN')}</div>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}${c.fileUrl}`} target="_blank" rel="noreferrer" className="btn-secondary flex items-center gap-1 text-xs flex-1 justify-center">
                                    <ExternalLink className="w-3.5 h-3.5" /> View PDF
                                </a>
                                <button onClick={() => deleteCatalogue(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                    {catalogues.length === 0 && <div className="col-span-3 card text-center text-gray-400 py-8">No catalogues yet.</div>}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-lg font-bold">Add Catalogue</h2>
                            <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div><label className="form-label">Title *</label><input className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                            <div><label className="form-label">Description</label><textarea className="form-input" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                            <div><label className="form-label">File URL (PDF)</label><input className="form-input" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} placeholder="/uploads/catalogues/file.pdf" /></div>
                            <div><label className="form-label">Thumbnail URL</label><input className="form-input" value={form.thumbnailUrl} onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })} /></div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t">
                            <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                            <button onClick={save} disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Add Catalogue'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
