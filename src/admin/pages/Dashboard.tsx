import { useEffect, useState } from 'react';
import { Users, Package, ShoppingBag, MessageSquare, TrendingUp, AlertCircle, Tag, FileText, Globe, CheckCircle, Database, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/client';

interface Stats {
    users: number;
    products: number;
    orders: number;
    unreadEnquiries: number;
    unreadQuotes: number;
    pendingClassifieds: number;
    totalRevenue: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/admin/stats').then(({ data }) => setStats(data)).finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="text-gray-400 text-sm">Loading dashboard…</div>
        </div>
    );

    const statCards = [
        { label: 'Total Users', value: stats?.users ?? 0, icon: Users, color: 'bg-blue-500', sub: 'All registered users' },
        { label: 'Active Products', value: stats?.products ?? 0, icon: Package, color: 'bg-emerald-500', sub: 'In product catalog' },
        { label: 'Total Orders', value: stats?.orders ?? 0, icon: ShoppingBag, color: 'bg-violet-500', sub: 'All time orders' },
        { label: 'Revenue', value: `₹${(((stats?.totalRevenue || 0)) / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'bg-orange-500', sub: 'Total order value' },
        { label: 'Unread Enquiries', value: (stats?.unreadEnquiries || 0) + (stats?.unreadQuotes || 0), icon: MessageSquare, color: 'bg-red-500', sub: 'Needs attention' },
        { label: 'Pending Classifieds', value: stats?.pendingClassifieds ?? 0, icon: AlertCircle, color: 'bg-yellow-500', sub: 'Awaiting approval' },
    ];

    const quickActions = [
        { to: '/admin/pages', icon: Globe, label: 'Manage Pages', color: 'text-blue-700 bg-blue-50 hover:bg-blue-100' },
        { to: '/admin/products', icon: Package, label: 'Add Product', color: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' },
        { to: '/admin/blog', icon: FileText, label: 'New Blog Post', color: 'text-violet-700 bg-violet-50 hover:bg-violet-100' },
        { to: '/admin/enquiries', icon: MessageSquare, label: 'View Enquiries', color: 'text-orange-700 bg-orange-50 hover:bg-orange-100' },
        { to: '/admin/classifieds', icon: Tag, label: 'Review Listings', color: 'text-red-700 bg-red-50 hover:bg-red-100' },
        { to: '/admin/users', icon: Users, label: 'Manage Users', color: 'text-gray-700 bg-gray-50 hover:bg-gray-100' },
    ];

    const systemStatus = [
        { label: 'Database', status: 'Operational', icon: Database, ok: true },
        { label: 'Authentication', status: 'Operational', icon: CheckCircle, ok: true },
        { label: 'API Server', status: 'Operational', icon: Zap, ok: true },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
                <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with CampusMart.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((s) => (
                    <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                        <div className={`w-9 h-9 ${s.color} rounded-lg flex items-center justify-center mb-3`}>
                            <s.icon className="w-4.5 h-4.5 text-white w-5 h-5" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                        <div className="text-xs font-semibold text-gray-700 mt-0.5">{s.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* System Status + Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* System Status */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <h2 className="font-bold text-gray-900 mb-4">System Status</h2>
                    <div className="space-y-3">
                        {systemStatus.map(s => (
                            <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <s.icon className="w-4 h-4 text-gray-400" />
                                    {s.label}
                                </div>
                                <span className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    {s.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {quickActions.map(a => (
                            <Link key={a.to} to={a.to}
                                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${a.color}`}>
                                <a.icon className="w-4 h-4" />
                                {a.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
