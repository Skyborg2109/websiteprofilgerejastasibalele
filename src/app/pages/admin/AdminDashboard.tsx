import { Link } from "react-router";
import {
    Home, Calendar, Newspaper, Users, Phone, Bell,
    Image, Eye, TrendingUp, Clock, CheckCircle, ArrowRight
} from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";

const menuCards = [
    {
        icon: Home,
        title: "Beranda",
        description: "Edit hero, sambutan, jadwal ringkas, dan pengumuman di halaman utama",
        path: "/admin/beranda",
        color: "blue",
        count: "5 section",
    },
    {
        icon: Eye,
        title: "Profil Gereja",
        description: "Kelola informasi sejarah, visi misi, struktur, pastor, dan wilayah",
        path: "/admin/profil",
        color: "indigo",
        count: "5 tab",
    },
    {
        icon: Calendar,
        title: "Jadwal & Liturgi",
        description: "Atur jadwal misa mingguan, hari raya, sakramen, dan devosi",
        path: "/admin/jadwal",
        color: "purple",
        count: "4 tab",
    },
    {
        icon: Newspaper,
        title: "Berita & Kegiatan",
        description: "Tambah, edit, dan hapus artikel berita dan galeri foto",
        path: "/admin/berita",
        color: "green",
        count: "2 tab",
    },
    {
        icon: Users,
        title: "Organisasi",
        description: "Kelola daftar organisasi dan komunitas gereja",
        path: "/admin/organisasi",
        color: "orange",
        count: "4 org",
    },
    {
        icon: Phone,
        title: "Kontak",
        description: "Update alamat, nomor telepon, email, dan media sosial gereja",
        path: "/admin/kontak",
        color: "teal",
        count: "6 field",
    },
    {
        icon: Bell,
        title: "Pengumuman",
        description: "Atur pengumuman terbaru yang tampil di halaman beranda",
        path: "/admin/pengumuman",
        color: "yellow",
        count: "3 item",
    },
    {
        icon: Image,
        title: "Navbar & Footer",
        description: "Kustomisasi nama gereja di navbar, deskripsi footer, dan copyright",
        path: "/admin/tampilan",
        color: "pink",
        count: "2 section",
    },
];

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
    blue: { bg: "bg-blue-500/10 hover:bg-blue-500/20", icon: "text-blue-400", badge: "bg-blue-500/20 text-blue-300" },
    indigo: { bg: "bg-indigo-500/10 hover:bg-indigo-500/20", icon: "text-indigo-400", badge: "bg-indigo-500/20 text-indigo-300" },
    purple: { bg: "bg-purple-500/10 hover:bg-purple-500/20", icon: "text-purple-400", badge: "bg-purple-500/20 text-purple-300" },
    green: { bg: "bg-green-500/10 hover:bg-green-500/20", icon: "text-green-400", badge: "bg-green-500/20 text-green-300" },
    orange: { bg: "bg-orange-500/10 hover:bg-orange-500/20", icon: "text-orange-400", badge: "bg-orange-500/20 text-orange-300" },
    teal: { bg: "bg-teal-500/10 hover:bg-teal-500/20", icon: "text-teal-400", badge: "bg-teal-500/20 text-teal-300" },
    yellow: { bg: "bg-yellow-500/10 hover:bg-yellow-500/20", icon: "text-yellow-400", badge: "bg-yellow-500/20 text-yellow-300" },
    pink: { bg: "bg-pink-500/10 hover:bg-pink-500/20", icon: "text-pink-400", badge: "bg-pink-500/20 text-pink-300" },
};

export function AdminDashboard() {
    const { content } = useSiteContent();
    const now = new Date();

    return (
        <div className="space-y-8 min-h-full">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Dashboard Admin</h1>
                    <p className="text-slate-400 text-sm">
                        Kelola tampilan dan konten website {content.navbar.churchName}
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">
                        {now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Halaman", value: "7", icon: Eye, color: "blue" },
                    { label: "Artikel Berita", value: content.news.length.toString(), icon: Newspaper, color: "green" },
                    { label: "Pengumuman", value: content.announcements.length.toString(), icon: Bell, color: "yellow" },
                    { label: "Organisasi", value: content.organizations.length.toString(), icon: Users, color: "purple" },
                ].map((stat) => {
                    const Icon = stat.icon;
                    const colors = colorMap[stat.color];
                    return (
                        <div key={stat.label} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg}`}>
                                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                                </div>
                                <TrendingUp className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-slate-400 text-sm">{stat.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Status */}
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h3 className="text-white font-semibold">Status Website</h3>
                    <span className="bg-green-500/20 text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">Online</span>
                </div>
                <p className="text-slate-300 text-sm">
                    Semua perubahan yang Anda lakukan di sini akan langsung tersimpan di browser dan diterapkan ke halaman website secara real-time.
                    Data disimpan di localStorage browser ini.
                </p>
            </div>

            {/* Content Management Cards */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4">Kelola Konten Halaman</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {menuCards.map((card) => {
                        const Icon = card.icon;
                        const colors = colorMap[card.color];
                        return (
                            <Link
                                key={card.path}
                                to={card.path}
                                className={`group block bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all duration-200 hover:border-slate-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.bg} transition-colors`}>
                                        <Icon className={`w-5 h-5 ${colors.icon}`} />
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${colors.badge}`}>
                                        {card.count}
                                    </span>
                                </div>
                                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                                    {card.description}
                                </p>
                                <div className="flex items-center gap-1 text-blue-400 text-xs font-medium">
                                    <span>Edit Konten</span>
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Preview Link */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5 flex items-center justify-between">
                <div>
                    <h3 className="text-white font-semibold mb-1">Lihat Hasil di Website</h3>
                    <p className="text-slate-400 text-sm">Buka halaman publik untuk melihat perubahan yang Anda buat</p>
                </div>
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-colors flex-shrink-0"
                >
                    <Eye className="w-4 h-4" />
                    Buka Website
                </a>
            </div>
        </div>
    );
}
