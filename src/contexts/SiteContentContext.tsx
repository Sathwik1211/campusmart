import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

export interface SiteContentContextType {
    content: Record<string, any>;
    loading: boolean;
    refresh: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType>({
    content: {},
    loading: true,
    refresh: async () => { },
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/content');

            // Parse JSON values if possible
            const parsedContent: Record<string, any> = {};
            for (const key in data) {
                try {
                    parsedContent[key] = JSON.parse(data[key]);
                } catch {
                    parsedContent[key] = data[key];
                }
            }
            setContent(parsedContent);
        } catch (error) {
            console.error('Failed to load site content:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <SiteContentContext.Provider value={{ content, loading, refresh }}>
            {children}
        </SiteContentContext.Provider>
    );
};

export const useSiteContent = () => useContext(SiteContentContext);
