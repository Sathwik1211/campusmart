const api = {
    get: async (url: string) => {
        console.log(`Mock GET: ${url}`);
        if (url === '/content') return { data: {} };
        if (url.startsWith('/pages/')) return { data: { published: true, template: url.split('/').pop(), pageData: '{}' } };
        return { data: [] };
    },
    post: async (url: string, data: any) => {
        console.log(`Mock POST: ${url}`, data);
        if (url.includes('/auth/login')) {
            return { data: { accessToken: 'mock_token', user: { id: '1', role: 'user', email: data.email } } };
        }
        return { data: { success: true } };
    },
    put: async (url: string, data: any) => {
        console.log(`Mock PUT: ${url}`, data);
        return { data: { success: true } };
    },
    delete: async (url: string) => {
        console.log(`Mock DELETE: ${url}`);
        return { data: { success: true } };
    },
    interceptors: {
        request: { use: () => {} },
        response: { use: () => {} }
    }
};

export default api;
