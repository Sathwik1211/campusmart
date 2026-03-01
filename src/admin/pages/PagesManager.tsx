import { useEffect, useState } from 'react';
import { Eye, EyeOff, Pencil, X, Save, Plus, Trash2, Link as LinkIcon } from 'lucide-react';
import api from '../api/client';

// ─── Types ───────────────────────────────────────────────────────────────────
interface CardItem { title: string; description: string; image?: string; }
interface PageData {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: string;
    section1Title?: string;
    section2Title?: string;
    ctaTitle?: string;
    ctaSubtitle?: string;
    cards?: CardItem[];
    features?: string[];
}
interface Page {
    id: number;
    title: string;
    slug: string;
    template: string | null;
    published: boolean;
    pageData: string | null;
    updatedAt: string;
}

function parsePageData(raw: string | null): PageData {
    if (!raw) return {};
    try { return JSON.parse(raw); } catch { return {}; }
}

// ─── Small helpers ────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false, placeholder = '', hint = '' }: {
    label: string; value: string; onChange: (v: string) => void;
    multiline?: boolean; placeholder?: string; hint?: string;
}) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">
                {label}
                {hint && <span className="text-gray-400 font-normal ml-1 text-xs">({hint})</span>}
            </label>
            {multiline ? (
                <textarea rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none bg-white"
                    value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            ) : (
                <input type="text"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
                    value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            )}
        </div>
    );
}

// ─── Inline Page Editor ───────────────────────────────────────────────────────
function InlinePageEditor({ page, onClose, onSaved }: {
    page: Page; onClose: () => void; onSaved: (updated: Page) => void;
}) {
    const [title, setTitle] = useState(page.title);
    const [published, setPublished] = useState(page.published);
    const [data, setData] = useState<PageData>(parsePageData(page.pageData));
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const set = (key: keyof PageData, value: any) => setData(p => ({ ...p, [key]: value }));

    const setCard = (i: number, field: keyof CardItem, val: string) => {
        const cards = [...(data.cards ?? [])];
        cards[i] = { ...cards[i], [field]: val };
        set('cards', cards);
    };
    const addCard = () => set('cards', [...(data.cards ?? []), { title: 'New Card', description: '' }]);
    const removeCard = (i: number) => set('cards', (data.cards ?? []).filter((_, idx) => idx !== i));

    const setFeature = (i: number, v: string) => {
        const f = [...(data.features ?? [])]; f[i] = v; set('features', f);
    };
    const addFeature = () => set('features', [...(data.features ?? []), 'New feature']);
    const removeFeature = (i: number) => set('features', (data.features ?? []).filter((_, idx) => idx !== i));

    const save = async () => {
        setSaving(true);
        try {
            const { data: updated } = await api.put(`/pages/${page.id}`, {
                title, published, pageData: JSON.stringify(data)
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
            onSaved(updated);
        } catch { /* noop */ }
        setSaving(false);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mt-4">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">Edit Page</h3>
                    <p className="text-sm text-gray-500 font-mono">/{page.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                    <a href={`/${page.slug}`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                        <LinkIcon className="w-3 h-3" /> View Live
                    </a>
                    <button onClick={save} disabled={saving}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60">
                        <Save className="w-3.5 h-3.5" />
                        {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
                    </button>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Basic Info */}
                <section>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Page Title *" value={title} onChange={setTitle} />
                        <div className="space-y-1">
                            <label className="block text-sm font-semibold text-gray-700">Status</label>
                            <button onClick={() => setPublished(p => !p)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${published ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                {published ? '● Published' : '○ Draft'}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Hero */}
                <section>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Hero Section</h4>
                    <div className="space-y-4">
                        <Field label="Hero Title *" value={data.heroTitle ?? ''} onChange={v => set('heroTitle', v)} placeholder="e.g. AI & Machine Learning" />
                        <Field label="Hero Subtitle" value={data.heroSubtitle ?? ''} onChange={v => set('heroSubtitle', v)} multiline placeholder="Supporting subtitle text…" />
                        <Field label="Hero Background Image URL" value={data.heroImage ?? ''} onChange={v => set('heroImage', v)} placeholder="https://images.unsplash.com/..." hint="paste any image URL" />
                        {data.heroImage && (
                            <div className="h-32 rounded-lg overflow-hidden border border-gray-200">
                                <img src={data.heroImage} alt="hero preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </section>

                {/* Section Headings */}
                <section>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Section Headings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Section 1 Heading" value={data.section1Title ?? ''} onChange={v => set('section1Title', v)} placeholder="e.g. Our Services" />
                        <Field label="Section 2 Heading" value={data.section2Title ?? ''} onChange={v => set('section2Title', v)} placeholder="e.g. Why Choose Us?" />
                    </div>
                </section>

                {/* Cards */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Cards / Items <span className="text-blue-500">({(data.cards ?? []).length})</span>
                        </h4>
                        <button onClick={addCard}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="w-3.5 h-3.5" /> Add Card
                        </button>
                    </div>

                    {(data.cards ?? []).length === 0 && (
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
                            No cards yet. Click "Add Card" to start adding content cards.
                        </div>
                    )}

                    <div className="space-y-3">
                        {(data.cards ?? []).map((card, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Card {i + 1}</span>
                                    <button onClick={() => removeCard(i)}
                                        className="flex items-center gap-1 px-2 py-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs">
                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Field label="Title" value={card.title ?? ''} onChange={v => setCard(i, 'title', v)} />
                                    <Field label="Description" value={card.description ?? ''} onChange={v => setCard(i, 'description', v)} />
                                </div>
                                <div className="mt-3">
                                    <Field label="Image URL" value={card.image ?? ''} onChange={v => setCard(i, 'image', v)} placeholder="https://images.unsplash.com/..." />
                                    {card.image && (
                                        <div className="mt-2 h-20 rounded-lg overflow-hidden border border-gray-200">
                                            <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Feature List <span className="text-emerald-500">({(data.features ?? []).length})</span>
                        </h4>
                        <button onClick={addFeature}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                            <Plus className="w-3.5 h-3.5" /> Add Feature
                        </button>
                    </div>

                    {(data.features ?? []).length === 0 && (
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">
                            No bullet features defined.
                        </div>
                    )}

                    <div className="space-y-2">
                        {(data.features ?? []).map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-emerald-500 font-bold text-sm">✓</span>
                                <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                                    value={f} onChange={e => setFeature(i, e.target.value)} />
                                <button onClick={() => removeFeature(i)}
                                    className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Call-to-Action Section</h4>
                    <div className="space-y-4">
                        <Field label="CTA Heading" value={data.ctaTitle ?? ''} onChange={v => set('ctaTitle', v)} placeholder="e.g. Ready to get started?" />
                        <Field label="CTA Subtitle" value={data.ctaSubtitle ?? ''} onChange={v => set('ctaSubtitle', v)} multiline placeholder="Supporting CTA text…" />
                    </div>
                </section>

                {/* Bottom Save */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        ← Back to Pages List
                    </button>
                    <button onClick={save} disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-md">
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving…' : saved ? '✓ All Changes Saved!' : 'Save All Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Pages Manager ───────────────────────────────────────────────────────
export default function PagesManager() {
    const [pages, setPages] = useState<Page[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPage, setEditingPage] = useState<Page | null>(null);
    const [search, setSearch] = useState('');

    const fetchPages = async () => {
        try {
            const { data } = await api.get('/pages');
            setPages(data);
        } catch { /* noop */ }
        setLoading(false);
    };

    useEffect(() => { fetchPages(); }, []);

    const togglePublish = async (id: number, current: boolean) => {
        try {
            await api.put(`/pages/${id}`, { published: !current });
            setPages(pp => pp.map(p => p.id === id ? { ...p, published: !current } : p));
        } catch { /* noop */ }
    };

    const handleSaved = (updated: Page) => {
        setPages(pp => pp.map(p => p.id === updated.id ? { ...p, ...updated } : p));
        setEditingPage(prev => prev ? { ...prev, ...updated } : prev);
    };

    const filtered = pages.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-gray-400 text-sm">Loading pages…</div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Pages Management</h1>
                <p className="text-gray-500 text-sm mt-1">Manage all {pages.length} CampusMart pages — edit content, toggle publish status.</p>
            </div>

            {/* Listing */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="font-bold text-gray-900">All Pages</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Click Edit to update a page's content</p>
                    </div>
                    <input
                        type="text"
                        placeholder="Search pages…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-56"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                <th className="py-3 px-4">Page Title</th>
                                <th className="py-3 px-4">URL Slug</th>
                                <th className="py-3 px-4 text-center">Type</th>
                                <th className="py-3 px-4 text-center">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((page) => (
                                <>
                                    <tr key={page.id} className={`hover:bg-blue-50/30 transition-colors ${editingPage?.id === page.id ? 'bg-blue-50/50' : ''}`}>
                                        <td className="py-3 px-4">
                                            <span className="font-semibold text-gray-900 text-sm">{page.title}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-xs text-gray-400 font-mono">/{page.slug}</span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-indigo-50 text-indigo-600">
                                                {page.template ? 'React' : 'HTML'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => togglePublish(page.id, page.published)}
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${page.published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                            >
                                                {page.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                                {page.published ? 'Published' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a href={`/${page.slug}`} target="_blank" rel="noreferrer"
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Live">
                                                    <LinkIcon className="w-4 h-4" />
                                                </a>
                                                <button
                                                    onClick={() => setEditingPage(editingPage?.id === page.id ? null : page)}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${editingPage?.id === page.id ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                                >
                                                    {editingPage?.id === page.id ? (
                                                        <><X className="w-3.5 h-3.5" /> Close</>
                                                    ) : (
                                                        <><Pencil className="w-3.5 h-3.5" /> Edit</>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Inline Editor Row */}
                                    {editingPage?.id === page.id && (
                                        <tr key={`edit-${page.id}`}>
                                            <td colSpan={5} className="px-4 pb-4">
                                                <InlinePageEditor
                                                    page={editingPage}
                                                    onClose={() => setEditingPage(null)}
                                                    onSaved={handleSaved}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
                    Showing {filtered.length} of {pages.length} pages
                </div>
            </div>
        </div>
    );
}
