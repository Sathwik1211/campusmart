import { useEffect, useState } from 'react';
import api from '@/api/client';

/**
 * Hook that fetches `pageData` JSON for a given slug.
 * Returns an empty object while loading or on error.
 * Components use this with a default fallback pattern:
 *   data.heroTitle ?? 'Hardcoded default'
 */
export function usePageData<T = Record<string, any>>(slug: string): {
    data: T;
    loading: boolean;
} {
    const [data, setData] = useState<T>({} as T);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        api.get(`/pages/${slug}`)
            .then(res => {
                if (!alive) return;
                try {
                    const parsed = res.data.pageData ? JSON.parse(res.data.pageData) : {};
                    setData(parsed);
                } catch {
                    setData({} as T);
                }
            })
            .catch(() => setData({} as T))
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, [slug]);

    return { data, loading };
}
