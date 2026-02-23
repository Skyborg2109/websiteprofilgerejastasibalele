import { useState, ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import {
    Church, LayoutDashboard, Home, Users, Calendar, Newspaper,
    Bell, Phone, Settings, LogOut, Menu, X, ChevronRight,
    Image, Globe, Shield
} from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import Swal from "sweetalert2";

interface AdminLayoutProps {
    children: ReactNode;
}

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Home, label: "Beranda", path: "/admin/beranda" },
    { icon: Globe, label: "Profil Gereja", path: "/admin/profil" },
    { icon: Calendar, label: "Jadwal & Liturgi", path: "/admin/jadwal" },
    { icon: Newspaper, label: "Berita & Kegiatan", path: "/admin/berita" },
    { icon: Users, label: "Organisasi", path: "/admin/organisasi" },
    { icon: Phone, label: "Kontak", path: "/admin/kontak" },
    { icon: Bell, label: "Pengumuman", path: "/admin/pengumuman" },
    { icon: Image, label: "Navbar & Footer", path: "/admin/tampilan" },
    { icon: Shield, label: "Keamanan", path: "/admin/keamanan" },
];

export function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const { logout } = useSiteContent();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        const result = await Swal.fire({
            background: "#1e293b",
            color: "#f1f5f9",
            icon: "question",
            iconColor: "#f87171",
            title: "Keluar dari Admin?",
            text: "Anda akan keluar dari panel admin.",
            showCancelButton: true,
            confirmButtonText: "Ya, Keluar",
            confirmButtonColor: "#dc2626",
            cancelButtonText: "Batal",
            cancelButtonColor: "#475569",
            reverseButtons: true,
            customClass: {
                popup: "!rounded-2xl !shadow-2xl !border !border-slate-700/50",
                confirmButton: "!rounded-xl !font-semibold !px-5",
                cancelButton: "!rounded-xl !font-semibold !px-5",
            },
        });
        if (!result.isConfirmed) return;
        logout();
        navigate("/admin/login");
    };

    const isActive = (path: string) => {
        if (path === "/admin") return location.pathname === "/admin";
        return location.pathname.startsWith(path);
    };

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700/50">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 flex-shrink-0">
                    <Church className="w-5 h-5 text-white" />
                </div>
                {sidebarOpen && (
                    <div className="min-w-0">
                        <div className="text-white font-bold text-sm leading-tight truncate">Admin Panel</div>
                        <div className="text-slate-400 text-xs leading-tight truncate"> Stasi Santa Bernadeth</div>
                    </div>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 overflow-y-auto">
                <div className="px-3 space-y-1">
                    {navItems.map((item) => {
                        const active = isActive(item.path);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${active
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                    : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                                {sidebarOpen && (
                                    <>
                                        <span className="text-sm font-medium">{item.label}</span>
                                        {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                                    </>
                                )}
                                {/* Tooltip for collapsed sidebar */}
                                {!sidebarOpen && (
                                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 border border-slate-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Bottom actions */}
            <div className="px-3 py-4 border-t border-slate-700/50 space-y-1">
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all group"
                >
                    <Globe className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">Lihat Website</span>}
                    {!sidebarOpen && (
                        <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 border border-slate-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
                            Lihat Website
                        </div>
                    )}
                </a>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all group relative"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">Keluar</span>}
                    {!sidebarOpen && (
                        <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 border border-slate-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
                            Keluar
                        </div>
                    )}
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden">
            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex flex-col bg-slate-900 border-r border-slate-700/50 transition-all duration-300 flex-shrink-0 ${sidebarOpen ? "w-64" : "w-[72px]"
                    }`}
            >
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900 border-r border-slate-700/50 md:hidden transition-transform duration-300 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Bar */}
                <header className="flex items-center gap-4 px-6 h-16 bg-slate-900 border-b border-slate-700/50 flex-shrink-0">
                    {/* Sidebar toggle */}
                    <button
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                setMobileSidebarOpen(!mobileSidebarOpen);
                            } else {
                                setSidebarOpen(!sidebarOpen);
                            }
                        }}
                        className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700/50"
                    >
                        {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>

                    <div className="flex-1">
                        <span className="text-white font-semibold hidden sm:block">
                            {navItems.find((n) => isActive(n.path))?.label || "Dashboard"}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-8 w-px bg-slate-700" />
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                A
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-white text-sm font-medium leading-tight">Administrator</div>
                                <div className="text-slate-400 text-xs leading-tight">Admin</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
