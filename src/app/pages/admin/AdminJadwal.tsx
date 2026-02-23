import { useState } from "react";
import { Save, RotateCcw, Plus, Trash2, Calendar, Star, Church, Cross } from "lucide-react";
import { useSiteContent, WeeklyMass, HolyDay, Sacrament, Devotion, defaultContent } from "../../context/SiteContentContext";
import { alertSukses, alertKonfirmasiSimpan, alertKonfirmasiReset, alertKonfirmasiHapus } from "../../utils/showAlert";

type Tab = "weekly" | "holyday" | "sakramen" | "devosi";

export function AdminJadwal() {
    const { content, updateContent, resetSection } = useSiteContent();
    const [activeTab, setActiveTab] = useState<Tab>("weekly");

    const [weeklyMass, setWeeklyMass] = useState<WeeklyMass[]>([...content.weeklyMass]);
    const [holyDays, setHolyDays] = useState<HolyDay[]>([...content.holyDays]);
    const [sacraments, setSacraments] = useState<Sacrament[]>([...content.sacraments]);
    const [devotions, setDevotions] = useState<Devotion[]>([...content.devotions]);

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    // ─── Weekly Mass ───
    const addWeekly = () => {
        setWeeklyMass([...weeklyMass, { day: "", time: "", type: "Misa", language: "Bahasa Indonesia" }]);
    };
    const removeWeekly = async (idx: number, item: WeeklyMass) => {
        const result = await alertKonfirmasiHapus(`Jadwal ${item.day} ${item.time}`);
        if (!result.isConfirmed) return;
        setWeeklyMass(weeklyMass.filter((_, i) => i !== idx));
        alertSukses("Dihapus!", "Jadwal berhasil dihapus.");
    };
    const updateWeekly = (idx: number, field: keyof WeeklyMass, value: string) => {
        const updated = [...weeklyMass];
        updated[idx] = { ...updated[idx], [field]: value };
        setWeeklyMass(updated);
    };
    const saveWeekly = async () => {
        const result = await alertKonfirmasiSimpan("Jadwal Misa Mingguan");
        if (!result.isConfirmed) return;
        updateContent("weeklyMass", weeklyMass);
        alertSukses("Tersimpan!", "Jadwal misa mingguan berhasil diperbarui.");
    };
    const resetWeekly = async () => {
        const result = await alertKonfirmasiReset("Jadwal Misa Mingguan");
        if (!result.isConfirmed) return;
        resetSection("weeklyMass");
        setWeeklyMass([...defaultContent.weeklyMass]);
        alertSukses("Direset!", "Jadwal misa mingguan dikembalikan ke default.");
    };

    // ─── Holy Days ───
    const addHolyDay = () => {
        setHolyDays([...holyDays, { date: "", event: "", time: "" }]);
    };
    const removeHolyDay = async (idx: number, item: HolyDay) => {
        const result = await alertKonfirmasiHapus(item.event ? `"${item.event}"` : "hari raya ini");
        if (!result.isConfirmed) return;
        setHolyDays(holyDays.filter((_, i) => i !== idx));
        alertSukses("Dihapus!", "Hari raya berhasil dihapus.");
    };
    const updateHolyDay = (idx: number, field: keyof HolyDay, value: string) => {
        const updated = [...holyDays];
        updated[idx] = { ...updated[idx], [field]: value };
        setHolyDays(updated);
    };
    const saveHolyDays = async () => {
        const result = await alertKonfirmasiSimpan("Jadwal Hari Raya");
        if (!result.isConfirmed) return;
        updateContent("holyDays", holyDays);
        alertSukses("Tersimpan!", "Jadwal hari raya berhasil diperbarui.");
    };
    const resetHolyDays = async () => {
        const result = await alertKonfirmasiReset("Jadwal Hari Raya");
        if (!result.isConfirmed) return;
        resetSection("holyDays");
        setHolyDays([...defaultContent.holyDays]);
        alertSukses("Direset!", "Jadwal hari raya dikembalikan ke default.");
    };

    // ─── Sacraments ───
    const addSacrament = () => {
        setSacraments([...sacraments, { name: "", schedule: "", contact: "", requirements: [""] }]);
    };
    const removeSacrament = async (idx: number, item: Sacrament) => {
        const result = await alertKonfirmasiHapus(item.name ? `"${item.name}"` : "sakramen ini");
        if (!result.isConfirmed) return;
        setSacraments(sacraments.filter((_, i) => i !== idx));
        alertSukses("Dihapus!", "Sakramen berhasil dihapus.");
    };
    const updateSacrament = (idx: number, field: keyof Omit<Sacrament, "requirements">, value: string) => {
        const updated = [...sacraments];
        updated[idx] = { ...updated[idx], [field]: value };
        setSacraments(updated);
    };
    const addRequirement = (sacIdx: number) => {
        const updated = [...sacraments];
        updated[sacIdx] = { ...updated[sacIdx], requirements: [...updated[sacIdx].requirements, ""] };
        setSacraments(updated);
    };
    const updateRequirement = (sacIdx: number, reqIdx: number, value: string) => {
        const updated = [...sacraments];
        const reqs = [...updated[sacIdx].requirements];
        reqs[reqIdx] = value;
        updated[sacIdx] = { ...updated[sacIdx], requirements: reqs };
        setSacraments(updated);
    };
    const removeRequirement = (sacIdx: number, reqIdx: number) => {
        const updated = [...sacraments];
        updated[sacIdx] = { ...updated[sacIdx], requirements: updated[sacIdx].requirements.filter((_, i) => i !== reqIdx) };
        setSacraments(updated);
    };
    const saveSacraments = async () => {
        const result = await alertKonfirmasiSimpan("Sakramen");
        if (!result.isConfirmed) return;
        updateContent("sacraments", sacraments);
        alertSukses("Tersimpan!", "Data sakramen berhasil diperbarui.");
    };
    const resetSacraments = async () => {
        const result = await alertKonfirmasiReset("Sakramen");
        if (!result.isConfirmed) return;
        resetSection("sacraments");
        setSacraments([...defaultContent.sacraments]);
        alertSukses("Direset!", "Sakramen dikembalikan ke default.");
    };

    // ─── Devotions ───
    const addDevotion = () => {
        setDevotions([...devotions, { name: "", schedule: "", description: "" }]);
    };
    const removeDevotion = async (idx: number, item: Devotion) => {
        const result = await alertKonfirmasiHapus(item.name ? `"${item.name}"` : "devosi ini");
        if (!result.isConfirmed) return;
        setDevotions(devotions.filter((_, i) => i !== idx));
        alertSukses("Dihapus!", "Devosi berhasil dihapus.");
    };
    const updateDevotion = (idx: number, field: keyof Devotion, value: string) => {
        const updated = [...devotions];
        updated[idx] = { ...updated[idx], [field]: value };
        setDevotions(updated);
    };
    const saveDevotions = async () => {
        const result = await alertKonfirmasiSimpan("Doa & Devosi");
        if (!result.isConfirmed) return;
        updateContent("devotions", devotions);
        alertSukses("Tersimpan!", "Data doa & devosi berhasil diperbarui.");
    };
    const resetDevotions = async () => {
        const result = await alertKonfirmasiReset("Doa & Devosi");
        if (!result.isConfirmed) return;
        resetSection("devotions");
        setDevotions([...defaultContent.devotions]);
        alertSukses("Direset!", "Doa & devosi dikembalikan ke default.");
    };

    // ─── Tab config ───
    const tabs: { id: Tab; label: string; icon: typeof Calendar }[] = [
        { id: "weekly", label: "Misa Mingguan", icon: Calendar },
        { id: "holyday", label: "Hari Raya", icon: Star },
        { id: "sakramen", label: "Sakramen", icon: Church },
        { id: "devosi", label: "Doa & Devosi", icon: Cross },
    ];

    const inputCls = "w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors";
    const inputSmCls = "w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Jadwal & Liturgi</h1>
                    <p className="text-slate-400 text-sm mt-1">Kelola jadwal misa, hari raya, sakramen, dan doa devosi</p>
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
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeTab === tab.id
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

            {/* ── Tab: Misa Mingguan ── */}
            {activeTab === "weekly" && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <h2 className="text-white font-semibold">Jadwal Misa Mingguan</h2>
                        <div className="flex items-center gap-2">
                            <button onClick={resetWeekly} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50">
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                            <button onClick={addWeekly} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" /> Tambah
                            </button>
                            <button onClick={saveWeekly} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save className="w-4 h-4" /> Simpan
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {weeklyMass.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                                <div className="grid sm:grid-cols-4 gap-3 items-end">
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Hari</label>
                                        <select value={item.day} onChange={(e) => updateWeekly(idx, "day", e.target.value)} className={inputSmCls}>
                                            <option value="">Pilih Hari</option>
                                            {days.map((d) => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Waktu</label>
                                        <input type="text" value={item.time} onChange={(e) => updateWeekly(idx, "time", e.target.value)} placeholder="06:00 WIB" className={inputSmCls} />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Jenis Misa</label>
                                        <input type="text" value={item.type} onChange={(e) => updateWeekly(idx, "type", e.target.value)} placeholder="Misa Minggu" className={inputSmCls} />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <label className="block text-slate-400 text-xs mb-1.5">Bahasa</label>
                                            <input type="text" value={item.language} onChange={(e) => updateWeekly(idx, "language", e.target.value)} placeholder="Bahasa Indonesia" className={inputSmCls} />
                                        </div>
                                        <button onClick={() => removeWeekly(idx, item)} className="flex-shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {weeklyMass.length === 0 && <div className="text-center py-10 text-slate-500 text-sm">Belum ada jadwal. Klik "Tambah" untuk menambahkan.</div>}
                    </div>
                </div>
            )}

            {/* ── Tab: Hari Raya ── */}
            {activeTab === "holyday" && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <h2 className="text-white font-semibold">Jadwal Hari Raya</h2>
                        <div className="flex items-center gap-2">
                            <button onClick={resetHolyDays} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50">
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                            <button onClick={addHolyDay} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" /> Tambah
                            </button>
                            <button onClick={saveHolyDays} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save className="w-4 h-4" /> Simpan
                            </button>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {holyDays.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                                <div className="grid sm:grid-cols-3 gap-3 items-end">
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Tanggal / Periode</label>
                                        <input type="text" value={item.date} onChange={(e) => updateHolyDay(idx, "date", e.target.value)} placeholder="25 Desember" className={inputSmCls} />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Nama Perayaan</label>
                                        <input type="text" value={item.event} onChange={(e) => updateHolyDay(idx, "event", e.target.value)} placeholder="Hari Natal" className={inputSmCls} />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <div className="flex-1">
                                            <label className="block text-slate-400 text-xs mb-1.5">Jam Misa</label>
                                            <input type="text" value={item.time} onChange={(e) => updateHolyDay(idx, "time", e.target.value)} placeholder="00:00 & 06:00 WIB" className={inputSmCls} />
                                        </div>
                                        <button onClick={() => removeHolyDay(idx, item)} className="flex-shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {holyDays.length === 0 && <div className="text-center py-10 text-slate-500 text-sm">Belum ada jadwal hari raya. Klik "Tambah" untuk menambahkan.</div>}
                    </div>
                </div>
            )}

            {/* ── Tab: Sakramen ── */}
            {activeTab === "sakramen" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="text-white font-semibold">Sakramen</h2>
                            <p className="text-slate-400 text-xs mt-0.5">Kelola info sakramen, jadwal, dan persyaratannya</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={resetSacraments} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50">
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                            <button onClick={addSacrament} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" /> Tambah
                            </button>
                            <button onClick={saveSacraments} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save className="w-4 h-4" /> Simpan
                            </button>
                        </div>
                    </div>

                    {sacraments.map((sac, sacIdx) => (
                        <div key={sacIdx} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-white font-medium text-sm">{sac.name || `Sakramen #${sacIdx + 1}`}</span>
                                <button onClick={() => removeSacrament(sacIdx, sac)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Nama Sakramen</label>
                                    <input type="text" value={sac.name} onChange={(e) => updateSacrament(sacIdx, "name", e.target.value)} placeholder="mis. Baptis" className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Jadwal</label>
                                    <input type="text" value={sac.schedule} onChange={(e) => updateSacrament(sacIdx, "schedule", e.target.value)} placeholder="mis. Minggu ke-2, pukul 15:00 WIB" className={inputCls} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-slate-300 text-sm font-medium mb-2">Info Pendaftaran / Kontak</label>
                                    <input type="text" value={sac.contact} onChange={(e) => updateSacrament(sacIdx, "contact", e.target.value)} placeholder="mis. Hubungi sekretariat 2 minggu sebelumnya" className={inputCls} />
                                </div>
                            </div>

                            {/* Persyaratan */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-slate-300 text-sm font-medium">Persyaratan</label>
                                    <button onClick={() => addRequirement(sacIdx)} className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs px-2 py-1 rounded-lg hover:bg-blue-500/10 transition-colors">
                                        <Plus className="w-3 h-3" /> Tambah
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {sac.requirements.map((req, reqIdx) => (
                                        <div key={reqIdx} className="flex gap-2">
                                            <span className="text-slate-500 text-sm mt-2.5 flex-shrink-0">{reqIdx + 1}.</span>
                                            <input
                                                type="text"
                                                value={req}
                                                onChange={(e) => updateRequirement(sacIdx, reqIdx, e.target.value)}
                                                placeholder={`Persyaratan ${reqIdx + 1}...`}
                                                className="flex-1 bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                            />
                                            <button onClick={() => removeRequirement(sacIdx, reqIdx)} className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors flex-shrink-0">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                    {sac.requirements.length === 0 && (
                                        <button onClick={() => addRequirement(sacIdx)} className="text-slate-500 text-xs hover:text-blue-400 transition-colors">+ Tambah persyaratan</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {sacraments.length === 0 && (
                        <div className="text-center py-16 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
                            <p className="text-slate-400 mb-4">Belum ada data sakramen</p>
                            <button onClick={addSacrament} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors mx-auto">
                                <Plus className="w-4 h-4" /> Tambah Sakramen
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── Tab: Doa & Devosi ── */}
            {activeTab === "devosi" && (
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h2 className="text-white font-semibold">Doa & Devosi</h2>
                            <p className="text-slate-400 text-xs mt-0.5">Kelola jadwal doa dan kegiatan devosi umat</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={resetDevotions} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50">
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </button>
                            <button onClick={addDevotion} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Plus className="w-4 h-4" /> Tambah
                            </button>
                            <button onClick={saveDevotions} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                                <Save className="w-4 h-4" /> Simpan
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {devotions.map((dev, idx) => (
                            <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                                <div className="grid sm:grid-cols-3 gap-3 items-start">
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Nama Kegiatan</label>
                                        <input type="text" value={dev.name} onChange={(e) => updateDevotion(idx, "name", e.target.value)} placeholder="mis. Doa Rosario" className={inputSmCls} />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-xs mb-1.5">Jadwal</label>
                                        <input type="text" value={dev.schedule} onChange={(e) => updateDevotion(idx, "schedule", e.target.value)} placeholder="mis. Setiap hari, 17:30 WIB" className={inputSmCls} />
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="flex-1">
                                            <label className="block text-slate-400 text-xs mb-1.5">Deskripsi</label>
                                            <textarea value={dev.description} onChange={(e) => updateDevotion(idx, "description", e.target.value)} placeholder="Deskripsi singkat kegiatan..." rows={2} className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" />
                                        </div>
                                        <button onClick={() => removeDevotion(idx, dev)} className="mt-5 flex-shrink-0 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {devotions.length === 0 && (
                            <div className="text-center py-10 text-slate-500 text-sm">
                                Belum ada data. Klik "Tambah" untuk menambahkan.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
