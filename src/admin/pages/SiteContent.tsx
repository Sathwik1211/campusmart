import { useEffect, useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import api from '../api/client';

interface ContentMap { [key: string]: string; }

const CONTENT_LABELS: Record<string, string> = {
    hero_title: 'Hero Title',
    hero_subtitle: 'Hero Subtitle',
    about_text: 'About Text',
    contact_phone: 'Contact Phone',
    contact_email: 'Contact Email',
    contact_address: 'Contact Address',
};

export default function SiteContent() {
    const [content, setContent] = useState<ContentMap>({});
    const [original, setOriginal] = useState<ContentMap>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const fetch = async () => {
        const { data } = await api.get('/content');
        setContent(data);
        setOriginal(data);
        setLoading(false);
    };

    useEffect(() => { fetch(); }, []);

    const save = async () => {
        setSaving(true);
        try {
            await api.put('/content', content);
            setOriginal(content);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } finally { setSaving(false); }
    };

    const hasChanges = JSON.stringify(content) !== JSON.stringify(original);

    if (loading) return <div className="p-8 text-gray-400">Loading...</div>;

    return (
        <div className="p-8 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Site Content</h1>
                    <p className="text-gray-500 text-sm mt-1">Edit website text, headings, and contact details</p>
                </div>
                <div className="flex items-center gap-3">
                    {hasChanges && (
                        <button onClick={fetch} className="btn-secondary flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" /> Reset
                        </button>
                    )}
                    <button onClick={save} disabled={saving || !hasChanges} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                        <Save className="w-4 h-4" /> {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Known content keys */}
                <div className="card">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Website Content</h2>
                    <div className="space-y-4">
                        {Object.entries(CONTENT_LABELS).map(([key, label]) => (
                            <div key={key}>
                                <label className="label">{label}</label>
                                {key.includes('subtitle') || key.includes('text') || key.includes('address') ? (
                                    <textarea
                                        className="input"
                                        rows={3}
                                        value={content[key] || ''}
                                        onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                                    />
                                ) : (
                                    <input
                                        className="input"
                                        value={content[key] || ''}
                                        onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom/extra content keys */}
                <div className="card">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Add Custom Content Key</h2>
                    <p className="text-sm text-gray-500 mb-4">Add any custom key-value pairs for site configuration.</p>
                    <div className="space-y-3">
                        {Object.entries(content)
                            .filter(([key]) => !CONTENT_LABELS[key])
                            .map(([key, value]) => (
                                <div key={key} className="flex gap-3 items-start">
                                    <div className="flex-shrink-0 text-xs font-mono bg-gray-100 text-gray-600 px-3 py-2 rounded-lg mt-0.5">{key}</div>
                                    <input
                                        className="input flex-1"
                                        value={value}
                                        onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                                    />
                                </div>
                            ))}
                        <div className="flex gap-3">
                            <input id="new-key" className="input w-40" placeholder="new_key" />
                            <input id="new-value" className="input flex-1" placeholder="value" />
                            <button
                                onClick={() => {
                                    const k = (document.getElementById('new-key') as HTMLInputElement).value.trim();
                                    const v = (document.getElementById('new-value') as HTMLInputElement).value.trim();
                                    if (k) setContent({ ...content, [k]: v });
                                }}
                                className="btn-secondary"
                            >
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
