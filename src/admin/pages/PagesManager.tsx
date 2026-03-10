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
        <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 flex items-center justify-between">
                {label}
                {hint && <span className="text-gray-400 font-normal text-[10px] uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded">{hint}</span>}
            </label>
            {multiline ? (
                <textarea rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm bg-white"
                    value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            ) : (
                <input type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm bg-white"
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
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl mt-6 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Editor Header */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex flex-wrap gap-4 items-center justify-between px-8 py-5 border-b border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                    <div>
                        <h3 className="font-black text-gray-900 text-xl tracking-tight">Edit Page Content</h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{page.slug}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <a href={`/${page.slug}`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                        <LinkIcon className="w-3.5 h-3.5" /> View Live
                    </a>
                    <button onClick={save} disabled={saving}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black shadow-lg transition-all active:scale-95 ${saving ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving…' : saved ? '✓ Changes Saved!' : 'Save Page Changes'}
                    </button>
                    <button onClick={onClose} className="p-2 text-gray-400 border border-gray-100 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all ml-2">
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="p-8 space-y-12">
                {/* Basic Info */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">General Configuration</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <Field label="Browser Title *" value={title} onChange={setTitle} hint="shown in navigation and tabs" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-gray-700">Publishing Status</label>
                            <button onClick={() => setPublished(p => !p)}
                                className={`w-full px-4 py-2.5 rounded-xl text-xs font-black border-2 transition-all shadow-sm ${published
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                {published ? '● PUBLISHED & VISIBLE' : '○ SAVED AS DRAFT'}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Hero */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">Hero Banner Content</h4>
                    </div>
                    <div className="space-y-6">
                        <Field label="Hero Heading *" value={data.heroTitle ?? ''} onChange={v => set('heroTitle', v)} placeholder="Headline for the page..." />
                        <Field label="Hero Sub-heading" value={data.heroSubtitle ?? ''} onChange={v => set('heroSubtitle', v)} multiline placeholder="Supporting text displayed below the headline…" />
                        <Field label="Hero Image Backdrop" value={data.heroImage ?? ''} onChange={v => set('heroImage', v)} placeholder="https://images.unsplash.com/..." hint="supports Unsplash, CDN images" />
                        {data.heroImage && (
                            <div className="h-48 rounded-2xl overflow-hidden border border-gray-200 shadow-inner group relative">
                                <img src={data.heroImage} alt="hero preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <span className="text-white text-xs font-bold px-3 py-1 bg-black/40 rounded-full backdrop-blur-md">Preview Mode</span>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Section Headings */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">Custom Section Labels</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Content Section Title" value={data.section1Title ?? ''} onChange={v => set('section1Title', v)} placeholder="e.g. Solutions" />
                        <Field label="Features Section Title" value={data.section2Title ?? ''} onChange={v => set('section2Title', v)} placeholder="e.g. Benefits" />
                    </div>
                </section>

                {/* Cards */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">
                            Interactive Cards <span className="text-blue-500 ml-2">({(data.cards ?? []).length})</span>
                        </h4>
                        <button onClick={addCard}
                            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-blue-700 transition-all shadow-md">
                            <Plus className="w-4 h-4" /> New Card
                        </button>
                    </div>

                    {(data.cards ?? []).length === 0 && (
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400 text-sm font-medium bg-gray-50/50">
                            No cards defined for this template yet.
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6">
                        {(data.cards ?? []).map((card, i) => (
                            <div key={i} className="border border-gray-200 rounded-2xl p-6 bg-gray-50/30 hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all group">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{card.title || 'Untitled Card'}</span>
                                    </div>
                                    <button onClick={() => removeCard(i)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-red-400 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-xl transition-all text-[10px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Field label="Card Title" value={card.title ?? ''} onChange={v => setCard(i, 'title', v)} />
                                    <Field label="Card Description" value={card.description ?? ''} onChange={v => setCard(i, 'description', v)} />
                                </div>
                                <div className="mt-6 flex gap-6 items-start">
                                    <div className="flex-1">
                                        <Field label="Image URL link" value={card.image ?? ''} onChange={v => setCard(i, 'image', v)} placeholder="https://..." />
                                    </div>
                                    {card.image && (
                                        <div className="w-32 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                                            <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">
                            Key Feature Bullets <span className="text-emerald-500 ml-2">({(data.features ?? []).length})</span>
                        </h4>
                        <button onClick={addFeature}
                            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider rounded-xl hover:bg-emerald-700 transition-all shadow-md">
                            <Plus className="w-4 h-4" /> Add Bullet
                        </button>
                    </div>

                    {(data.features ?? []).length === 0 && (
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-400 text-sm font-medium bg-gray-50/50">
                            List specialized features or highlights.
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(data.features ?? []).map((f, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-all">
                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs flex-shrink-0">✓</div>
                                <input className="flex-1 border-none focus:ring-0 text-sm font-medium text-slate-700 placeholder:text-slate-300"
                                    value={f} onChange={e => setFeature(i, e.target.value)} placeholder="Feature description..." />
                                <button onClick={() => removeFeature(i)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em]">Conversion / CTA Footer</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Field label="Call-to-Action Text" value={data.ctaTitle ?? ''} onChange={v => set('ctaTitle', v)} placeholder="Heading for footer..." />
                        <Field label="Sub-text Description" value={data.ctaSubtitle ?? ''} onChange={v => set('ctaSubtitle', v)} multiline placeholder="Actionable subtitle text…" />
                    </div>
                </section>

                {/* Bottom Back Button */}
                <div className="flex justify-between items-center pt-8 mt-4 border-t border-gray-100">
                    <button onClick={onClose} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex items-center gap-2">
                        ← Close Editor

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
