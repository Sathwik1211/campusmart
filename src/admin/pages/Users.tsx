import { useEffect, useState } from 'react';
import api from '../api/client';

interface User { id: number; name: string; email: string; role: string; phone?: string; institution?: string; createdAt: string; }

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/users').then(({ data }) => setUsers(data)).finally(() => setLoading(false));
    }, []);

    const updateRole = async (id: number, role: string) => {
        await api.put(`/admin/users/${id}/role`, { role });
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    };

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                <p className="text-gray-500 text-sm mt-1">{users.length} registered users</p>
            </div>

            <div className="card p-0 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>{['Name', 'Email', 'Phone', 'Institution', 'Role', 'Joined', 'Manage Role'].map((h) => <th key={h} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
                            : users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                                    <td className="px-4 py-3 text-gray-500">{u.phone || '—'}</td>
                                    <td className="px-4 py-3 text-gray-500">{u.institution || '—'}</td>
                                    <td className="px-4 py-3"><span className={u.role === 'admin' ? 'badge-blue' : 'badge-green'}>{u.role}</span></td>
                                    <td className="px-4 py-3 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                                    <td className="px-4 py-3">
                                        <select value={u.role} onChange={(e) => updateRole(u.id, e.target.value)} className="input w-auto py-1 text-xs">
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
