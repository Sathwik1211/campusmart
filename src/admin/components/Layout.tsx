import { Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Package, BookOpen, ShoppingBag, Users, MessageSquare,
    Tag, BookMarked, Settings, LogOut, GraduationCap,
    Globe, Star
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
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8fafc' }}>
            {/* Top Branding Header */}
            <header className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between sticky top-0 z-[100] shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="font-black text-white text-lg tracking-tight leading-cm">CampusMart <span className="text-blue-400">Admin</span></div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Control Center • Active Session</div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-3 pr-6 border-r border-slate-700">
                        <div className="text-right">
                            <div className="text-sm font-bold text-white">Administrator</div>
                            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Online Mode</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold">A</div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 border border-slate-700 rounded-xl text-sm font-bold transition-all group"
                    >
                        <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Sub-Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 px-8 py-3 sticky top-[72px] z-[90] shadow-sm">
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-2 border-r pr-4 border-gray-100 hidden lg:block">Navigation</div>
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border-2 ${isActive(to)
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200'
                                : 'text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-900'
                                }`}
                        >
                            <Icon className={`w-4 h-4 flex-shrink-0 ${isActive(to) ? 'text-white' : 'text-gray-400'}`} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Page Content */}
            <main className="flex-1 p-8">
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <Outlet />
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="px-8 py-6 text-center text-gray-400 text-[10px] font-medium uppercase tracking-widest">
                CampusMart Content Management System © 2026 • v2.1.0-Dynamic
            </footer>
        </div>
    );
}

