import { useState } from "react";
import { Save, RotateCcw, Plus, Trash2, Church, BookOpen, Target, Users2, User, MapPin } from "lucide-react";
import {
    useSiteContent,
    defaultContent,
    TimelineItem,
    StructureMember,
    WilayahItem,
} from "../../context/SiteContentContext";
import { ImageInput } from "../../components/admin/ImageInput";
import { alertSukses, alertKonfirmasiSimpan, alertKonfirmasiReset, alertKonfirmasiHapus } from "../../utils/showAlert";

type Tab = "dasar" | "sejarah" | "visi" | "struktur" | "pastor" | "wilayah";

export function AdminProfil() {
    const { content, updateContent, resetSection } = useSiteContent();
    const [activeTab, setActiveTab] = useState<Tab>("dasar");

    // ─── State ───
    const [profile, setProfile] = useState({ ...content.profile });
    const [history, setHistory] = useState({ ...content.history, timeline: [...content.history.timeline] });
    const [visiMisi, setVisiMisi] = useState({ visi: content.visiMisi.visi, misi: [...content.visiMisi.misi] });
    const [structure, setStructure] = useState<StructureMember[]>([...content.structure]);
    const [pastor, setPastor] = useState({ ...content.pastor });
    const [wilayah, setWilayah] = useState({
        ...content.wilayah,
        items: [...content.wilayah.items],
    });

    const inputCls = "w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors";
    const smallInputCls = "w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500";

    // ─── Info Dasar handlers ───
    const saveProfile = async () => {
        const result = await alertKonfirmasiSimpan("Info Dasar Profil");
        if (!result.isConfirmed) return;
        updateContent("profile", profile);
        alertSukses("Tersimpan!", "Profil gereja berhasil diperbarui.");
    };
    const resetProfile = async () => {
        const result = await alertKonfirmasiReset("Info Dasar Profil");
        if (!result.isConfirmed) return;
        resetSection("profile");
        setProfile({ ...defaultContent.profile });
        alertSukses("Direset!", "Profil dikembalikan ke default.");
    };

    // ─── Sejarah handlers ───
    const saveHistory = async () => {
        const result = await alertKonfirmasiSimpan("Sejarah");
        if (!result.isConfirmed) return;
        updateContent("history", history);
        alertSukses("Tersimpan!", "Sejarah gereja berhasil diperbarui.");
    };
    const resetHistory = async () => {
        const result = await alertKonfirmasiReset("Sejarah");
        if (!result.isConfirmed) return;
        resetSection("history");
        setHistory({ ...defaultContent.history, timeline: [...defaultContent.history.timeline] });
        alertSukses("Direset!", "Sejarah dikembalikan ke default.");
    };
    const addTimeline = () => setHistory({ ...history, timeline: [...history.timeline, { year: "", event: "" }] });
    const removeTimeline = async (idx: number, item: TimelineItem) => {
        const result = await alertKonfirmasiHapus(item.year ? `Timeline ${item.year}` : "item ini");
        if (!result.isConfirmed) return;
        setHistory({ ...history, timeline: history.timeline.filter((_, i) => i !== idx) });
        alertSukses("Dihapus!", "Item timeline dihapus.");
    };
    const updateTimeline = (idx: number, field: keyof TimelineItem, value: string) => {
        const updated = [...history.timeline];
        updated[idx] = { ...updated[idx], [field]: value };
        setHistory({ ...history, timeline: updated });
    };

    // ─── Visi & Misi handlers ───
    const saveVisiMisi = async () => {
        const result = await alertKonfirmasiSimpan("Visi & Misi");
        if (!result.isConfirmed) return;
        updateContent("visiMisi", visiMisi);
        alertSukses("Tersimpan!", "Visi & Misi berhasil diperbarui.");
    };
    const resetVisiMisi = async () => {
        const result = await alertKonfirmasiReset("Visi & Misi");
        if (!result.isConfirmed) return;
        resetSection("visiMisi");
        setVisiMisi({ visi: defaultContent.visiMisi.visi, misi: [...defaultContent.visiMisi.misi] });
        alertSukses("Direset!", "Visi & Misi dikembalikan ke default.");
    };
    const addMisi = () => setVisiMisi({ ...visiMisi, misi: [...visiMisi.misi, ""] });
    const removeMisi = async (idx: number) => {
        const result = await alertKonfirmasiHapus(`Poin Misi ke-${idx + 1}`);
        if (!result.isConfirmed) return;
        setVisiMisi({ ...visiMisi, misi: visiMisi.misi.filter((_, i) => i !== idx) });
        alertSukses("Dihapus!", "Poin misi dihapus.");
    };
    const updateMisi = (idx: number, value: string) => {
        const updated = [...visiMisi.misi];
        updated[idx] = value;
        setVisiMisi({ ...visiMisi, misi: updated });
    };

    // ─── Struktur handlers ───
    const saveStructure = async () => {
        const result = await alertKonfirmasiSimpan("Struktur Kepengurusan");
        if (!result.isConfirmed) return;
        updateContent("structure", structure);
        alertSukses("Tersimpan!", "Struktur kepengurusan berhasil diperbarui.");
    };
    const resetStructure = async () => {
        const result = await alertKonfirmasiReset("Struktur Kepengurusan");
        if (!result.isConfirmed) return;
        resetSection("structure");
        setStructure([...defaultContent.structure]);
        alertSukses("Direset!", "Struktur dikembalikan ke default.");
    };
    const addStructure = () => setStructure([...structure, { position: "", name: "" }]);
    const removeStructure = async (idx: number, item: StructureMember) => {
        const result = await alertKonfirmasiHapus(item.position || "anggota ini");
        if (!result.isConfirmed) return;
        setStructure(structure.filter((_, i) => i !== idx));
        alertSukses("Dihapus!", "Anggota dihapus.");
    };
    const updateStructure = (idx: number, field: keyof StructureMember, value: string) => {
        const updated = [...structure];
        updated[idx] = { ...updated[idx], [field]: value };
        setStructure(updated);
    };

    // ─── Pastor handlers ───
    const savePastor = async () => {
        const result = await alertKonfirmasiSimpan("Info Pastor");
        if (!result.isConfirmed) return;
        updateContent("pastor", pastor);
        alertSukses("Tersimpan!", "Info pastor berhasil diperbarui.");
    };
    const resetPastor = async () => {
        const result = await alertKonfirmasiReset("Info Pastor");
        if (!result.isConfirmed) return;
        resetSection("pastor");
        setPastor({ ...defaultContent.pastor });
        alertSukses("Direset!", "Info pastor dikembalikan ke default.");
    };

    // ─── Wilayah handlers ───
    const saveWilayah = async () => {
        const result = await alertKonfirmasiSimpan("Data Wilayah");
        if (!result.isConfirmed) return;
        updateContent("wilayah", wilayah);
        alertSukses("Tersimpan!", "Data wilayah berhasil diperbarui.");
    };
    const resetWilayah = async () => {
        const result = await alertKonfirmasiReset("Data Wilayah");
        if (!result.isConfirmed) return;
        resetSection("wilayah");
        setWilayah({ ...defaultContent.wilayah, items: [...defaultContent.wilayah.items] });
        alertSukses("Direset!", "Data wilayah dikembalikan ke default.");
    };
    const addWilayah = () => setWilayah({ ...wilayah, items: [...wilayah.items, { name: "", ketua: "", families: 0 }] });
    const removeWilayah = async (idx: number, item: WilayahItem) => {
        const result = await alertKonfirmasiHapus(item.name || "wilayah ini");
        if (!result.isConfirmed) return;
        setWilayah({ ...wilayah, items: wilayah.items.filter((_, i) => i !== idx) });
        alertSukses("Dihapus!", "Wilayah dihapus.");
    };
    const updateWilayahItem = (idx: number, field: keyof WilayahItem, value: string | number) => {
        const updated = [...wilayah.items];
        updated[idx] = { ...updated[idx], [field]: field === "families" ? Number(value) : value };
        setWilayah({ ...wilayah, items: updated });
    };

    const tabs: { id: Tab; label: string; icon: typeof Church }[] = [
        { id: "dasar", label: "Info Dasar", icon: Church },
        { id: "sejarah", label: "Sejarah", icon: BookOpen },
        { id: "visi", label: "Visi & Misi", icon: Target },
        { id: "struktur", label: "Struktur", icon: Users2 },
        { id: "pastor", label: "Pastor", icon: User },
        { id: "wilayah", label: "Wilayah", icon: MapPin },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Profil Gereja</h1>
                <p className="text-slate-400 text-sm mt-1">Kelola seluruh konten halaman profil gereja</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 bg-slate-800 border border-slate-700 rounded-xl p-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
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

            {/* ── Tab: Info Dasar ── */}
            {activeTab === "dasar" && (
                <div className="space-y-4">
                    <div className="flex justify-end gap-2">
                        <button onClick={resetProfile} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <button onClick={saveProfile} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                            <Save className="w-4 h-4" /> Simpan
                        </button>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Nama Lengkap Gereja / Stasi</label>
                            <input type="text" value={profile.churchFullName} onChange={(e) => setProfile({ ...profile, churchFullName: e.target.value })} className={inputCls} />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Tahun Berdiri</label>
                            <input type="text" value={profile.stasisSince} onChange={(e) => setProfile({ ...profile, stasisSince: e.target.value })} placeholder="mis: 1950" className={inputCls} />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Nama Paroki Induk</label>
                            <input type="text" value={profile.parishName} onChange={(e) => setProfile({ ...profile, parishName: e.target.value })} className={inputCls} />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Tab: Sejarah ── */}
            {activeTab === "sejarah" && (
                <div className="space-y-4">
                    <div className="flex justify-end gap-2">
                        <button onClick={resetHistory} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <button onClick={saveHistory} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                            <Save className="w-4 h-4" /> Simpan
                        </button>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                        <h3 className="text-white font-semibold">Teks Sejarah</h3>
                        {(["paragraph1", "paragraph2", "paragraph3"] as const).map((f, i) => (
                            <div key={f}>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Paragraf {i + 1}</label>
                                <textarea
                                    value={history[f]}
                                    onChange={(e) => setHistory({ ...history, [f]: e.target.value })}
                                    rows={4}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>
                        ))}
                        <div>
                            <ImageInput
                                value={history.imageUrl}
                                onChange={(url) => setHistory({ ...history, imageUrl: url })}
                                label="Foto Sejarah Gereja"
                            />
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-semibold">Timeline Sejarah</h3>
                            <button onClick={addTimeline} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" /> Tambah
                            </button>
                        </div>
                        <div className="space-y-3">
                            {history.timeline.map((item, idx) => (
                                <div key={idx} className="bg-slate-900/60 border border-slate-700 rounded-xl p-3">
                                    <div className="flex gap-3 items-start">
                                        <div className="w-24 flex-shrink-0">
                                            <label className="block text-slate-400 text-xs mb-1">Tahun</label>
                                            <input type="text" value={item.year} onChange={(e) => updateTimeline(idx, "year", e.target.value)} placeholder="1950" className={smallInputCls} />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-slate-400 text-xs mb-1">Peristiwa</label>
                                            <input type="text" value={item.event} onChange={(e) => updateTimeline(idx, "event", e.target.value)} placeholder="Deskripsi peristiwa..." className={smallInputCls} />
                                        </div>
                                        <button onClick={() => removeTimeline(idx, item)} className="mt-5 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {history.timeline.length === 0 && (
                                <p className="text-center text-slate-500 text-sm py-6">Belum ada timeline. Klik "Tambah" untuk menambahkan.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Tab: Visi & Misi ── */}
            {activeTab === "visi" && (
                <div className="space-y-4">
                    <div className="flex justify-end gap-2">
                        <button onClick={resetVisiMisi} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <button onClick={saveVisiMisi} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                            <Save className="w-4 h-4" /> Simpan
                        </button>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Visi</label>
                            <textarea
                                value={visiMisi.visi}
                                onChange={(e) => setVisiMisi({ ...visiMisi, visi: e.target.value })}
                                rows={4}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-semibold">Poin-Poin Misi</h3>
                            <button onClick={addMisi} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" /> Tambah
                            </button>
                        </div>
                        <div className="space-y-2">
                            {visiMisi.misi.map((m, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                    <span className="text-slate-500 text-sm mt-3 flex-shrink-0 w-5">{idx + 1}.</span>
                                    <input
                                        type="text"
                                        value={m}
                                        onChange={(e) => updateMisi(idx, e.target.value)}
                                        placeholder={`Poin misi ${idx + 1}...`}
                                        className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                    <button onClick={() => removeMisi(idx)} className="mt-1 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Tab: Struktur ── */}
            {activeTab === "struktur" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <p className="text-slate-400 text-sm">Kelola struktur kepengurusan stasi</p>
                        <div className="flex gap-2">
                            <button onClick={resetStructure} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                            <button onClick={addStructure} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" /> Tambah
                            </button>
                            <button onClick={saveStructure} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save className="w-4 h-4" /> Simpan
                            </button>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 space-y-3">
                        {structure.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/60 border border-slate-700 rounded-xl p-3">
                                <div className="grid sm:grid-cols-2 gap-3 items-end">
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Jabatan</label>
                                        <input type="text" value={item.position} onChange={(e) => updateStructure(idx, "position", e.target.value)} placeholder="mis. Ketua Stasi" className={smallInputCls} />
                                    </div>
                                    <div className="flex gap-2 items-end">
                                        <div className="flex-1">
                                            <label className="block text-slate-400 text-xs mb-1.5">Nama</label>
                                            <input type="text" value={item.name} onChange={(e) => updateStructure(idx, "name", e.target.value)} placeholder="mis. Bapak Thomas" className={smallInputCls} />
                                        </div>
                                        <button onClick={() => removeStructure(idx, item)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {structure.length === 0 && (
                            <p className="text-center text-slate-500 text-sm py-8">Belum ada anggota. Klik "Tambah" untuk menambahkan.</p>
                        )}
                    </div>
                </div>
            )}

            {/* ── Tab: Pastor ── */}
            {activeTab === "pastor" && (
                <div className="space-y-4">
                    <div className="flex justify-end gap-2">
                        <button onClick={resetPastor} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                            <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                        <button onClick={savePastor} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                            <Save className="w-4 h-4" /> Simpan
                        </button>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Nama Pastor</label>
                                <input type="text" value={pastor.name} onChange={(e) => setPastor({ ...pastor, name: e.target.value })} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Jabatan / Gelar</label>
                                <input type="text" value={pastor.title} onChange={(e) => setPastor({ ...pastor, title: e.target.value })} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Tanggal Tahbisan</label>
                                <input type="text" value={pastor.ordination} onChange={(e) => setPastor({ ...pastor, ordination: e.target.value })} placeholder="mis. 15 Agustus 2005" className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Pendidikan</label>
                                <input type="text" value={pastor.education} onChange={(e) => setPastor({ ...pastor, education: e.target.value })} className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Pelayanan di Paroki</label>
                                <input type="text" value={pastor.since} onChange={(e) => setPastor({ ...pastor, since: e.target.value })} placeholder="mis. Sejak 2018" className={inputCls} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Kata-Kata / Kutipan Pastor</label>
                            <textarea
                                value={pastor.quote}
                                onChange={(e) => setPastor({ ...pastor, quote: e.target.value })}
                                rows={3}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-2">Bio Singkat</label>
                            <textarea
                                value={pastor.bio}
                                onChange={(e) => setPastor({ ...pastor, bio: e.target.value })}
                                rows={3}
                                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                        <div>
                            <ImageInput
                                value={pastor.imageUrl}
                                onChange={(url) => setPastor({ ...pastor, imageUrl: url })}
                                label="Foto Pastor"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ── Tab: Wilayah ── */}
            {activeTab === "wilayah" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <p className="text-slate-400 text-sm">Kelola data stasi & wilayah lingkungan</p>
                        <div className="flex gap-2">
                            <button onClick={resetWilayah} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                            <button onClick={addWilayah} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" /> Tambah
                            </button>
                            <button onClick={saveWilayah} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save className="w-4 h-4" /> Simpan
                            </button>
                        </div>
                    </div>

                    {/* Statistik */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                        <h3 className="text-white font-semibold mb-4">Statistik Ringkas</h3>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-slate-400 text-xs mb-1.5">Total Lingkungan</label>
                                <input type="text" value={wilayah.totalLingkungan} onChange={(e) => setWilayah({ ...wilayah, totalLingkungan: e.target.value })} placeholder="4" className={smallInputCls} />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs mb-1.5">Total Keluarga</label>
                                <input type="text" value={wilayah.totalKeluarga} onChange={(e) => setWilayah({ ...wilayah, totalKeluarga: e.target.value })} placeholder="105" className={smallInputCls} />
                            </div>
                            <div>
                                <label className="block text-slate-400 text-xs mb-1.5">Total Jiwa (perkiraan)</label>
                                <input type="text" value={wilayah.totalJiwa} onChange={(e) => setWilayah({ ...wilayah, totalJiwa: e.target.value })} placeholder="~380" className={smallInputCls} />
                            </div>
                        </div>
                    </div>

                    {/* List Lingkungan */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 space-y-3">
                        <h3 className="text-white font-semibold">Daftar Lingkungan</h3>
                        {wilayah.items.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/60 border border-slate-700 rounded-xl p-3">
                                <div className="grid sm:grid-cols-3 gap-3 items-end">
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Nama Lingkungan</label>
                                        <input type="text" value={item.name} onChange={(e) => updateWilayahItem(idx, "name", e.target.value)} placeholder="Lingkungan Santo Petrus" className={smallInputCls} />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Nama Ketua</label>
                                        <input type="text" value={item.ketua} onChange={(e) => updateWilayahItem(idx, "ketua", e.target.value)} placeholder="Bapak Antonius" className={smallInputCls} />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <label className="block text-slate-400 text-xs mb-1.5">Jml. Keluarga</label>
                                            <input type="number" value={item.families} onChange={(e) => updateWilayahItem(idx, "families", e.target.value)} min={0} className={smallInputCls} />
                                        </div>
                                        <button onClick={() => removeWilayah(idx, item)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {wilayah.items.length === 0 && (
                            <p className="text-center text-slate-500 text-sm py-6">Belum ada lingkungan. Klik "Tambah" untuk menambahkan.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
