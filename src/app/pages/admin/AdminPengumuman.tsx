import { useState } from "react";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import { useSiteContent, Announcement, defaultContent } from "../../context/SiteContentContext";
import { alertSukses, alertKonfirmasiSimpan, alertKonfirmasiReset, alertKonfirmasiHapus } from "../../utils/showAlert";

export function AdminPengumuman() {
    const { content, updateContent, resetSection } = useSiteContent();
    const [items, setItems] = useState<Announcement[]>([...content.announcements]);

    const categories = ["Liturgi", "Sosial", "Sakramen", "Kegiatan", "Umum"];

    const addItem = () => {
        const newId = Math.max(0, ...items.map((a) => a.id)) + 1;
        setItems([
            ...items,
            {
                id: newId,
                title: "",
                date: new Date().toISOString().split("T")[0],
                description: "",
                category: "Umum",
            },
        ]);
    };

    const removeItem = async (id: number, title: string) => {
        const result = await alertKonfirmasiHapus(title ? `"${title}"` : "pengumuman ini");
        if (!result.isConfirmed) return;
        setItems(items.filter((a) => a.id !== id));
        alertSukses("Dihapus!", "Pengumuman berhasil dihapus.");
    };

    const updateItem = (id: number, field: keyof Announcement, value: string) => {
        setItems(items.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
    };

    const handleSave = async () => {
        const result = await alertKonfirmasiSimpan("Pengumuman");
        if (!result.isConfirmed) return;
        updateContent("announcements", items);
        alertSukses("Tersimpan!", "Data pengumuman berhasil diperbarui.");
    };

    const handleReset = async () => {
        const result = await alertKonfirmasiReset("Pengumuman");
        if (!result.isConfirmed) return;
        resetSection("announcements");
        setItems([...defaultContent.announcements]);
        alertSukses("Direset!", "Pengumuman dikembalikan ke default.");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Pengumuman</h1>
                    <p className="text-slate-400 text-sm mt-1">Kelola pengumuman yang tampil di halaman beranda</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                    <button
                        onClick={addItem}
                        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Pengumuman
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Simpan Semua
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {items.map((item, idx) => (
                    <div key={item.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400 text-sm font-medium">Pengumuman #{idx + 1}</span>
                            <button
                                onClick={() => removeItem(item.id, item.title)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-slate-300 text-sm font-medium mb-2">Judul Pengumuman</label>
                                <input
                                    type="text"
                                    value={item.title}
                                    onChange={(e) => updateItem(item.id, "title", e.target.value)}
                                    placeholder="Judul pengumuman..."
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Tanggal</label>
                                <input
                                    type="date"
                                    value={item.date}
                                    onChange={(e) => updateItem(item.id, "date", e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Kategori</label>
                                <select
                                    value={item.category}
                                    onChange={(e) => updateItem(item.id, "category", e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-slate-300 text-sm font-medium mb-2">Deskripsi</label>
                                <textarea
                                    value={item.description}
                                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                    placeholder="Deskripsi pengumuman..."
                                    rows={3}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="text-center py-16 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
                        <p className="text-slate-400 mb-4">Belum ada pengumuman</p>
                        <button
                            onClick={addItem}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors mx-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Pengumuman
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
