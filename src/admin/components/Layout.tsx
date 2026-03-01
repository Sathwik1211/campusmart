import { Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Package, BookOpen, ShoppingBag, Users, MessageSquare,
    Tag, BookMarked, Settings, LogOut, GraduationCap, FileText, Image,
    Globe, Star, Bell, Activity
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/pages', icon: Globe, label: 'All Pages' },
    { to: '/admin/homepage-editor', icon: Star, label: 'Hero / Banner' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/blog', icon: BookOpen, label: 'Blog Posts' },
    { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
    { to: '/admin/classifieds', icon: Tag, label: 'Classifieds' },
    { to: '/admin/catalogues', icon: BookMarked, label: 'Catalogues' },
    { to: '/admin/site-content', icon: Settings, label: 'System' },
];

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('cm_admin_token');
        navigate('/admin/login');
    };

    const isActive = (to: string) => {
        if (to === '/admin/dashboard') return location.pathname === to;
        return location.pathname.startsWith(to);
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f0f4f8' }}>
            {/* Top Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 text-sm leading-tight">Admin Dashboard</div>
                        <div className="text-xs text-gray-500">Welcome, Admin</div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </header>

            {/* Horizontal Tab Navigation Grid */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-1">
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${isActive(to)
                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Page Content */}
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}
