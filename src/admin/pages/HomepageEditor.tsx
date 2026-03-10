import { useEffect, useState } from 'react';
import { Save, RotateCcw, Plus, Trash2 } from 'lucide-react';
import api from '../api/client';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    {title}
                </h2>
            </div>
            <div className="p-6 space-y-6">{children}</div>
        </div>
    );
}

function Field({ label, value, onChange, multiline = false, hint = '', placeholder = '' }: {
    label: string; value: string; onChange: (v: string) => void;
    multiline?: boolean; hint?: string; placeholder?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 flex items-center justify-between">
                {label}
                {hint && <span className="text-gray-400 font-normal text-[10px] uppercase tracking-wider bg-gray-100 px-1.5 py-0.5 rounded">{hint}</span>}
            </label>
            {multiline
                ? <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none shadow-sm" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
                : <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
            }
        </div>
    );
}

export default function HomepageEditor() {
    const [heroData, setHeroData] = useState<any>({ title: '', subtitle: '', image: '' });
    const [features, setFeatures] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [sidebar, setSidebar] = useState<any>({ classifieds: [], resources: [], completedProjects: [], contacts: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/content');
            try { setHeroData(JSON.parse(data.home_hero || '{}')); } catch { /**/ }
            try { setFeatures(data.home_features ? JSON.parse(data.home_features) : []); } catch { /**/ }
            try { setServices(data.home_services ? JSON.parse(data.home_services) : []); } catch { /**/ }
            try { setSidebar(data.home_sidebar ? JSON.parse(data.home_sidebar) : { classifieds: [], resources: [], completedProjects: [], contacts: [] }); } catch { /**/ }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => { fetchContent(); }, []);

    const saveContent = async () => {
        setSaving(true);
        try {
            await api.put('/content', {
                home_hero: JSON.stringify(heroData),
                home_features: JSON.stringify(features),
                home_services: JSON.stringify(services),
                home_sidebar: JSON.stringify(sidebar),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    // Feature helpers
    const addFeature = () => setFeatures([...features, { title: 'New Feature', description: 'Description', tag: 'New', color: '#3B82F6', h: 250, href: '/', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=90' }]);
    const upFeature = (i: number, k: string, v: any) => { const a = [...features]; a[i] = { ...a[i], [k]: v }; setFeatures(a); };
    const delFeature = (i: number) => setFeatures(features.filter((_, idx) => idx !== i));

    // Service helpers
    const addService = () => setServices([...services, { title: 'New Service', bgColor: '#3B82F6', textColor: '#ffffff', href: '/' }]);
    const upService = (i: number, k: string, v: any) => { const a = [...services]; a[i] = { ...a[i], [k]: v }; setServices(a); };
    const delService = (i: number) => setServices(services.filter((_, idx) => idx !== i));

    // Sidebar helpers
    const setSidebarList = (key: string, list: any[]) => setSidebar((p: any) => ({ ...p, [key]: list }));
    const upListItem = (key: string, i: number, field: string, val: string) => {
        const list = [...(sidebar[key] || [])]; list[i] = { ...list[i], [field]: val }; setSidebarList(key, list);
    };
    const addListItem = (key: string, extra: any = {}) => setSidebarList(key, [...(sidebar[key] || []), { label: 'New Item', href: '/', ...extra }]);
    const delListItem = (key: string, i: number) => setSidebarList(key, (sidebar[key] || []).filter((_: any, idx: number) => idx !== i));

    if (loading) return <div className="flex items-center justify-center h-64"><p className="text-gray-400 text-sm">Loading editor…</p></div>;

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20">
            {/* Sticky Header Editor Actions */}
            <div className="sticky top-0 z-[60] -mx-6 px-6 py-4 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between mb-8 shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Hero / Banner Editor</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Homepage hero, service cards, features, and sidebar</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchContent} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                    <button onClick={saveContent} disabled={saving}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 ${saving ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving…' : saved ? '✓ Changes Saved!' : 'Save All Changes'}
                    </button>
                </div>
            </div>


            {/* ── Hero Banner ── */}
            <Section title="🖼 Hero Banner">
                <div className="space-y-4">
                    <Field label="Hero Title" value={heroData.title || ''} onChange={v => setHeroData((p: any) => ({ ...p, title: v }))} placeholder="Your Complete Guide to Campus Infrastructure" />
                    <Field label="Hero Subtitle" value={heroData.subtitle || ''} onChange={v => setHeroData((p: any) => ({ ...p, subtitle: v }))} placeholder="Physical + Digital" />
                    <Field label="Background Image URL" hint="paste any full image URL" value={heroData.image || ''} onChange={v => setHeroData((p: any) => ({ ...p, image: v }))} placeholder="https://images.unsplash.com/..." />
                    {heroData.image && (
                        <div className="h-36 rounded-xl overflow-hidden border border-gray-200">
                            <img src={heroData.image} alt="Hero preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </Section>

            {/* ── Service Cards ── */}
            <Section title="🎨 Service Cards (4 big colored links)">
                <div className="space-y-3 mb-4">
                    <p className="text-xs text-gray-400">These are the 4 colored section cards below the hero: Furniture, Campus Design, Sports, AI/Digital.</p>
                    {services.map((s, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50/40">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Card {i + 1}</span>
                                <button onClick={() => delService(i)} className="flex items-center gap-1 px-2 py-1 text-red-500 hover:bg-red-50 rounded-lg text-xs"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Title" value={s.title} onChange={v => upService(i, 'title', v)} />
                                <Field label="Link (href)" value={s.href} onChange={v => upService(i, 'href', v)} placeholder="/furniture-design-supply" />
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold text-gray-600">Background Colour</label>
                                    <div className="flex gap-2 items-center">
                                        <input type="color" className="h-9 w-12 border border-gray-200 rounded-lg p-1 cursor-pointer" value={s.bgColor} onChange={e => upService(i, 'bgColor', e.target.value)} />
                                        <span className="text-sm text-gray-500">{s.bgColor}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold text-gray-600">Text Colour</label>
                                    <div className="flex gap-2 items-center">
                                        <input type="color" className="h-9 w-12 border border-gray-200 rounded-lg p-1 cursor-pointer" value={s.textColor} onChange={e => upService(i, 'textColor', e.target.value)} />
                                        <span className="text-sm text-gray-500">{s.textColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={addService} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Service Card
                    </button>
                </div>
            </Section>

            {/* ── Feature Cards ── */}
            <Section title={`🪟 Masonry Feature Cards (${features.length})`}>
                <p className="text-xs text-gray-400 mb-4">The masonry grid of category cards shown on the homepage. Edit title, description, tag, image, link and card height.</p>
                <div className="space-y-4">
                    {features.length === 0 && (
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center text-gray-400 text-sm">No feature cards. Click Add Card.</div>
                    )}
                    {features.map((f, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50/40">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Card {i + 1} — {f.title}</span>
                                <button onClick={() => delFeature(i)} className="flex items-center gap-1 px-2 py-1 text-red-500 hover:bg-red-50 rounded-lg text-xs"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Title" value={f.title} onChange={v => upFeature(i, 'title', v)} />
                                <div className="space-y-1">
                                    <label className="block text-xs font-semibold text-gray-600">Tag & Colour</label>
                                    <div className="flex gap-2">
                                        <input type="color" className="h-9 w-12 border border-gray-200 rounded-lg p-1 cursor-pointer" value={f.color} onChange={e => upFeature(i, 'color', e.target.value)} />
                                        <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" value={f.tag} onChange={e => upFeature(i, 'tag', e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <Field label="Description" value={f.description} onChange={v => upFeature(i, 'description', v)} multiline />
                                </div>
                                <div className="space-y-1">
                                    <Field label="Image URL" value={f.image} onChange={v => upFeature(i, 'image', v)} placeholder="https://images.unsplash.com/..." />
                                    {f.image && <div className="h-20 rounded-lg overflow-hidden border border-gray-200 mt-1"><img src={f.image} className="w-full h-full object-cover" /></div>}
                                </div>
                                <div className="space-y-3">
                                    <Field label="Link (href)" value={f.href} onChange={v => upFeature(i, 'href', v)} placeholder="/page-slug" />
                                    <div className="space-y-1">
                                        <label className="block text-xs font-semibold text-gray-600">Height (px)</label>
                                        <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" value={f.h} onChange={e => upFeature(i, 'h', parseInt(e.target.value) || 250)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={addFeature} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Feature Card
                    </button>
                </div>
            </Section>

            {/* ── Sidebar ── */}
            <Section title="📋 Sidebar Panels">
                <div className="space-y-6">
                    {/* Classifieds */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-gray-700">Classifieds Links</h3>
                            <button onClick={() => addListItem('classifieds')} className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700"><Plus className="w-3 h-3" /> Add</button>
                        </div>
                        <div className="space-y-2">
                            {(sidebar.classifieds || []).map((item: any, i: number) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input placeholder="Label" className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none" value={item.label} onChange={e => upListItem('classifieds', i, 'label', e.target.value)} />
                                    <input placeholder="href" className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none" value={item.href} onChange={e => upListItem('classifieds', i, 'href', e.target.value)} />
                                    <button onClick={() => delListItem('classifieds', i)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Resources */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-gray-700">Resource Links</h3>
                            <button onClick={() => addListItem('resources')} className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700"><Plus className="w-3 h-3" /> Add</button>
                        </div>
                        <div className="space-y-2">
                            {(sidebar.resources || []).map((item: any, i: number) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input placeholder="Label" className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none" value={item.label} onChange={e => upListItem('resources', i, 'label', e.target.value)} />
                                    <input placeholder="href" className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none" value={item.href} onChange={e => upListItem('resources', i, 'href', e.target.value)} />
                                    <button onClick={() => delListItem('resources', i)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Completed Projects */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-gray-700">Completed Projects Links</h3>
                            <button onClick={() => addListItem('completedProjects')} className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700"><Plus className="w-3 h-3" /> Add</button>
                        </div>
                        <div className="space-y-2">
                            {(sidebar.completedProjects || []).map((item: any, i: number) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input placeholder="Label" className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none" value={item.label} onChange={e => upListItem('completedProjects', i, 'label', e.target.value)} />
                                    <input placeholder="href" className="w-40 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none" value={item.href} onChange={e => upListItem('completedProjects', i, 'href', e.target.value)} />
                                    <button onClick={() => delListItem('completedProjects', i)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Contact blocks */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-gray-700">Contact Blocks</h3>
                            <button onClick={() => addListItem('contacts', { bg: '#3B82F6', contact: '', isEmail: false })} className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700"><Plus className="w-3 h-3" /> Add</button>
                        </div>
                        <div className="space-y-3">
                            {(sidebar.contacts || []).map((c: any, i: number) => (
                                <div key={i} className="border border-gray-200 rounded-xl p-3 bg-gray-50/40">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-gray-400">Block {i + 1}</span>
                                        <button onClick={() => delListItem('contacts', i)} className="p-1 text-red-400 hover:bg-red-50 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Field label="Title" value={c.title || ''} onChange={v => upListItem('contacts', i, 'title', v)} />
                                        <Field label="Contact (phone/email)" value={c.contact || ''} onChange={v => upListItem('contacts', i, 'contact', v)} />
                                        <Field label="href (tel: or mailto:)" value={c.href || ''} onChange={v => upListItem('contacts', i, 'href', v)} />
                                        <div className="space-y-1">
                                            <label className="block text-xs font-semibold text-gray-600">Background Colour</label>
                                            <div className="flex gap-2 items-center">
                                                <input type="color" className="h-8 w-10 border border-gray-200 rounded p-0.5 cursor-pointer" value={c.bg || '#3B82F6'} onChange={e => upListItem('contacts', i, 'bg', e.target.value)} />
                                                <span className="text-xs text-gray-400">{c.bg}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Bottom Save */}
            <div className="flex justify-end pb-8">
                <button onClick={saveContent} disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-md">
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving…' : saved ? '✓ All Changes Saved!' : 'Save All Changes'}
                </button>
            </div>
        </div>
    );
}
