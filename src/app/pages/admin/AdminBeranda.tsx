import { useState } from "react";
import { Save, RotateCcw, Image, FileText, Bell, Clock } from "lucide-react";
import { useSiteContent, HeroContent, WelcomeContent, Schedule } from "../../context/SiteContentContext";
import { ImageInput } from "../../components/admin/ImageInput";
import { alertSukses, alertKonfirmasiSimpan, alertKonfirmasiReset } from "../../utils/showAlert";

type Tab = "hero" | "welcome" | "jadwal" | "pengumuman";

export function AdminBeranda() {
    const { content, updateContent, resetSection } = useSiteContent();
    const [activeTab, setActiveTab] = useState<Tab>("hero");

    const [hero, setHero] = useState<HeroContent>({ ...content.hero });
    const [welcome, setWelcome] = useState<WelcomeContent>({ ...content.welcome });
    const [homeSchedules, setHomeSchedules] = useState<Schedule[]>([...content.homeSchedules]);

    const saveHero = async () => {
        const result = await alertKonfirmasiSimpan("Hero Section");
        if (!result.isConfirmed) return;
        updateContent("hero", hero);
        alertSukses("Tersimpan!", "Hero Section berhasil diperbarui.");
    };

    const saveWelcome = async () => {
        const result = await alertKonfirmasiSimpan("Sambutan / Welcome");
        if (!result.isConfirmed) return;
        updateContent("welcome", welcome);
        alertSukses("Tersimpan!", "Sambutan berhasil diperbarui.");
    };

    const saveSchedules = async () => {
        const result = await alertKonfirmasiSimpan("Jadwal Ringkas");
        if (!result.isConfirmed) return;
        updateContent("homeSchedules", homeSchedules);
        alertSukses("Tersimpan!", "Jadwal ringkas berhasil diperbarui.");
    };

    const resetHero = async () => {
        const result = await alertKonfirmasiReset("Hero Section");
        if (!result.isConfirmed) return;
        resetSection("hero");
        setHero({ ...content.hero });
        alertSukses("Direset!", "Hero Section dikembalikan ke default.");
    };

    const resetWelcome = async () => {
        const result = await alertKonfirmasiReset("Sambutan / Welcome");
        if (!result.isConfirmed) return;
        resetSection("welcome");
        setWelcome({ ...content.welcome });
        alertSukses("Direset!", "Sambutan dikembalikan ke default.");
    };

    const resetSchedules = async () => {
        const result = await alertKonfirmasiReset("Jadwal Ringkas");
        if (!result.isConfirmed) return;
        resetSection("homeSchedules");
        setHomeSchedules([...content.homeSchedules]);
        alertSukses("Direset!", "Jadwal ringkas dikembalikan ke default.");
    };

    const tabs: { id: Tab; label: string; icon: typeof Image }[] = [
        { id: "hero", label: "Hero Section", icon: Image },
        { id: "welcome", label: "Sambutan", icon: FileText },
        { id: "jadwal", label: "Jadwal Ringkas", icon: Clock },
        { id: "pengumuman", label: "Pengumuman", icon: Bell },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Kelola Beranda</h1>
                    <p className="text-slate-400 text-sm mt-1">Edit konten yang tampil di halaman utama website</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-xl p-1 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Hero Section Tab */}
            {activeTab === "hero" && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-white font-semibold">Hero Section (Banner Utama)</h2>
                        <button
                            onClick={resetHero}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Nama Gereja (judul besar)</label>
                            <input
                                type="text"
                                value={hero.churchName}
                                onChange={(e) => setHero({ ...hero, churchName: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Sub Nama (lokasi/stasi)</label>
                            <input
                                type="text"
                                value={hero.subName}
                                onChange={(e) => setHero({ ...hero, subName: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Keuskupan</label>
                            <input
                                type="text"
                                value={hero.diocese}
                                onChange={(e) => setHero({ ...hero, diocese: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Referensi Ayat</label>
                            <input
                                type="text"
                                value={hero.verseRef}
                                onChange={(e) => setHero({ ...hero, verseRef: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-slate-300 text-sm font-medium mb-2">Ayat Kitab Suci</label>
                            <textarea
                                value={hero.verse}
                                onChange={(e) => setHero({ ...hero, verse: e.target.value })}
                                rows={3}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <ImageInput
                                label="Gambar Hero"
                                value={hero.imageUrl}
                                onChange={(val) => setHero({ ...hero, imageUrl: val })}
                                previewHeight="h-40"
                                hint="Gambar background utama di halaman beranda. Disarankan ukuran lebar minimal 1920px."
                            />
                        </div>
                    </div>

                    <button
                        onClick={saveHero}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Simpan Hero Section
                    </button>
                </div>
            )}

            {/* Welcome/Sambutan Tab */}
            {activeTab === "welcome" && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-white font-semibold">Sambutan Pastor / Selamat Datang</h2>
                        <button
                            onClick={resetWelcome}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Judul Section</label>
                            <input
                                type="text"
                                value={welcome.title}
                                onChange={(e) => setWelcome({ ...welcome, title: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Nama Pastor</label>
                            <input
                                type="text"
                                value={welcome.pastorName}
                                onChange={(e) => setWelcome({ ...welcome, pastorName: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Jabatan Pastor</label>
                            <input
                                type="text"
                                value={welcome.pastorTitle}
                                onChange={(e) => setWelcome({ ...welcome, pastorTitle: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Salam Penutup</label>
                            <input
                                type="text"
                                value={welcome.pastorGreeting}
                                onChange={(e) => setWelcome({ ...welcome, pastorGreeting: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-slate-300 text-sm font-medium mb-2">Paragraf 1</label>
                            <textarea
                                value={welcome.paragraph1}
                                onChange={(e) => setWelcome({ ...welcome, paragraph1: e.target.value })}
                                rows={3}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-slate-300 text-sm font-medium mb-2">Paragraf 2</label>
                            <textarea
                                value={welcome.paragraph2}
                                onChange={(e) => setWelcome({ ...welcome, paragraph2: e.target.value })}
                                rows={3}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Kutipan Alkitab</label>
                            <textarea
                                value={welcome.quote}
                                onChange={(e) => setWelcome({ ...welcome, quote: e.target.value })}
                                rows={2}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Referensi Kutipan</label>
                            <input
                                type="text"
                                value={welcome.quoteRef}
                                onChange={(e) => setWelcome({ ...welcome, quoteRef: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <ImageInput
                                label="Foto Interior Gereja"
                                value={welcome.imageUrl}
                                onChange={(val) => setWelcome({ ...welcome, imageUrl: val })}
                                previewHeight="h-40"
                                hint="Foto interior gereja yang tampil di section sambutan."
                            />
                        </div>
                    </div>

                    <button
                        onClick={saveWelcome}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Simpan Sambutan
                    </button>
                </div>
            )}

            {/* Jadwal Ringkas Tab */}
            {activeTab === "jadwal" && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-white font-semibold">Jadwal Ringkas (di Beranda)</h2>
                        <button
                            onClick={resetSchedules}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                    </div>

                    <div className="space-y-4">
                        {homeSchedules.map((sch, idx) => (
                            <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Hari</label>
                                        <input
                                            type="text"
                                            value={sch.day}
                                            onChange={(e) => {
                                                const updated = [...homeSchedules];
                                                updated[idx] = { ...updated[idx], day: e.target.value };
                                                setHomeSchedules(updated);
                                            }}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Waktu</label>
                                        <input
                                            type="text"
                                            value={sch.time}
                                            onChange={(e) => {
                                                const updated = [...homeSchedules];
                                                updated[idx] = { ...updated[idx], time: e.target.value };
                                                setHomeSchedules(updated);
                                            }}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Jenis</label>
                                        <input
                                            type="text"
                                            value={sch.type}
                                            onChange={(e) => {
                                                const updated = [...homeSchedules];
                                                updated[idx] = { ...updated[idx], type: e.target.value };
                                                setHomeSchedules(updated);
                                            }}
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={saveSchedules}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Simpan Jadwal
                    </button>
                </div>
            )}

            {/* Pengumuman Tab */}
            {activeTab === "pengumuman" && (
                <div className="text-slate-400 text-center py-10 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
                    <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Kelola pengumuman di menu <span className="text-blue-400 font-medium">Pengumuman</span></p>
                </div>
            )}
        </div>
    );
}
