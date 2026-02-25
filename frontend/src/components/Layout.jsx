import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    FilePlus,
    ClipboardCheck,
    History,
    LogOut,
    Menu,
    X
} from 'lucide-react';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/circular', icon: <FileText size={20} />, label: 'Circular' },
        { to: '/proposal', icon: <FilePlus size={20} />, label: 'Proposal' },
        { to: '/report', icon: <ClipboardCheck size={20} />, label: 'Report' },
        { to: '/history', icon: <History size={20} />, label: 'History' },
    ];

    return (
        <div className="min-height-screen bg-slate-950 flex text-slate-200">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } transition-all duration-300 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-20`}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && (
                        <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            CLG-DOCS
                        </span>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-slate-800 rounded-md"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                                }`
                            }
                        >
                            {item.icon}
                            {isSidebarOpen && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 p-3 w-full rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8 min-h-screen`}>
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
