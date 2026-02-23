import { useState } from "react";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import { useSiteContent, NewsArticle, defaultContent } from "../../context/SiteContentContext";
import { ImageInput } from "../../components/admin/ImageInput";
import { alertSukses, alertKonfirmasiSimpan, alertKonfirmasiReset, alertKonfirmasiHapus } from "../../utils/showAlert";

export function AdminBerita() {
    const { content, updateContent, resetSection } = useSiteContent();
    const [news, setNews] = useState<NewsArticle[]>([...content.news]);

    const categories = ["Liturgi", "Sosial", "Kegiatan", "Pengumuman", "Lainnya"];

    const addItem = () => {
        const newId = Math.max(0, ...news.map((n) => n.id)) + 1;
        setNews([
            ...news,
            {
                id: newId,
                title: "",
                date: new Date().toISOString().split("T")[0],
                category: "Kegiatan",
                image: "",
                excerpt: "",
                content: "",
            },
        ]);
    };

    const removeItem = async (id: number, title: string) => {
        const result = await alertKonfirmasiHapus(title ? `"${title}"` : "artikel ini");
        if (!result.isConfirmed) return;
        setNews(news.filter((n) => n.id !== id));
        alertSukses("Dihapus!", "Artikel berhasil dihapus.");
    };

    const updateItem = (id: number, field: keyof NewsArticle, value: string) => {
        setNews(news.map((n) => (n.id === id ? { ...n, [field]: value } : n)));
    };

    const handleSave = async () => {
        const result = await alertKonfirmasiSimpan("Berita & Kegiatan");
        if (!result.isConfirmed) return;
        updateContent("news", news);
        alertSukses("Tersimpan!", "Data berita & kegiatan berhasil diperbarui.");
    };

    const handleReset = async () => {
        const result = await alertKonfirmasiReset("Berita & Kegiatan");
        if (!result.isConfirmed) return;
        resetSection("news");
        setNews([...defaultContent.news]);
        alertSukses("Direset!", "Berita & Kegiatan dikembalikan ke default.");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Berita & Kegiatan</h1>
                    <p className="text-slate-400 text-sm mt-1">Kelola artikel berita dan kegiatan gereja</p>
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
                        Tambah Berita
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
                {news.map((article, idx) => (
                    <div key={article.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400 text-sm font-medium">Artikel #{idx + 1}</span>
                            <button
                                onClick={() => removeItem(article.id, article.title)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-slate-300 text-sm font-medium mb-2">Judul Berita</label>
                                <input
                                    type="text"
                                    value={article.title}
                                    onChange={(e) => updateItem(article.id, "title", e.target.value)}
                                    placeholder="Judul berita..."
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Tanggal</label>
                                <input
                                    type="date"
                                    value={article.date}
                                    onChange={(e) => updateItem(article.id, "date", e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Kategori</label>
                                <select
                                    value={article.category}
                                    onChange={(e) => updateItem(article.id, "category", e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <ImageInput
                                    label="Gambar Berita"
                                    value={article.image}
                                    onChange={(val) => updateItem(article.id, "image", val)}
                                    previewHeight="h-32"
                                    hint="Gambar thumbnail artikel berita."
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-slate-300 text-sm font-medium mb-2">Ringkasan (Kutipan)</label>
                                <textarea
                                    value={article.excerpt}
                                    onChange={(e) => updateItem(article.id, "excerpt", e.target.value)}
                                    placeholder="Ringkasan singkat berita yang ditampilkan di daftar berita..."
                                    rows={3}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-slate-300 text-sm font-medium mb-1">Isi Artikel Lengkap</label>
                                <p className="text-slate-500 text-xs mb-2">Tulis isi artikel lengkap di sini. Pisahkan setiap paragraf dengan satu baris kosong (tekan Enter 2x).</p>
                                <textarea
                                    value={article.content ?? ""}
                                    onChange={(e) => updateItem(article.id, "content", e.target.value)}
                                    placeholder={"Paragraf pertama artikel...\n\nParagraf kedua artikel...\n\nParagraf ketiga artikel..."}
                                    rows={10}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-y font-mono"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {news.length === 0 && (
                    <div className="text-center py-16 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
                        <p className="text-slate-400 mb-4">Belum ada berita</p>
                        <button
                            onClick={addItem}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors mx-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Berita
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
