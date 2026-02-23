import { useState } from "react";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import { useSiteContent, Organization, defaultContent } from "../../context/SiteContentContext";
import { alertSukses, alertKonfirmasiSimpan, alertKonfirmasiReset, alertKonfirmasiHapus } from "../../utils/showAlert";

const colorOptions = [
    { value: "blue", label: "Biru" },
    { value: "purple", label: "Ungu" },
    { value: "green", label: "Hijau" },
    { value: "orange", label: "Oranye" },
    { value: "pink", label: "Merah Muda" },
    { value: "teal", label: "Teal" },
    { value: "yellow", label: "Kuning" },
    { value: "red", label: "Merah" },
];

const categoryOptions = ["Kepemudaan", "Devosi", "Liturgi", "Sosial", "Koor", "Lainnya"];

export function AdminOrganisasi() {
    const { content, updateContent, resetSection } = useSiteContent();
    const [organizations, setOrganizations] = useState<Organization[]>([...content.organizations]);

    const addItem = () => {
        const newId = Math.max(0, ...organizations.map((o) => o.id)) + 1;
        setOrganizations([
            ...organizations,
            {
                id: newId,
                name: "",
                description: "",
                members: "",
                leader: "",
                schedule: "",
                category: "Lainnya",
                color: "blue",
            },
        ]);
    };

    const removeItem = async (id: number, name: string) => {
        const result = await alertKonfirmasiHapus(name ? `"${name}"` : "organisasi ini");
        if (!result.isConfirmed) return;
        setOrganizations(organizations.filter((o) => o.id !== id));
        alertSukses("Dihapus!", "Organisasi berhasil dihapus.");
    };

    const updateItem = (id: number, field: keyof Organization, value: string) => {
        setOrganizations(organizations.map((o) => (o.id === id ? { ...o, [field]: value } : o)));
    };

    const handleSave = async () => {
        const result = await alertKonfirmasiSimpan("Organisasi & Komunitas");
        if (!result.isConfirmed) return;
        updateContent("organizations", organizations);
        alertSukses("Tersimpan!", "Data organisasi berhasil diperbarui.");
    };

    const handleReset = async () => {
        const result = await alertKonfirmasiReset("Organisasi & Komunitas");
        if (!result.isConfirmed) return;
        resetSection("organizations");
        setOrganizations([...defaultContent.organizations]);
        alertSukses("Direset!", "Organisasi dikembalikan ke default.");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Organisasi & Komunitas</h1>
                    <p className="text-slate-400 text-sm mt-1">Kelola daftar organisasi dan komunitas gereja</p>
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
                        Tambah Organisasi
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
                {organizations.map((org, idx) => (
                    <div key={org.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400 text-sm font-medium">Organisasi #{idx + 1}</span>
                            <button
                                onClick={() => removeItem(org.id, org.name)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-slate-300 text-sm font-medium mb-2">Nama Organisasi</label>
                                <input
                                    type="text"
                                    value={org.name}
                                    onChange={(e) => updateItem(org.id, "name", e.target.value)}
                                    placeholder="Nama organisasi..."
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Kategori</label>
                                <select
                                    value={org.category}
                                    onChange={(e) => updateItem(org.id, "category", e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    {categoryOptions.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Warna Kartu</label>
                                <select
                                    value={org.color}
                                    onChange={(e) => updateItem(org.id, "color", e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    {colorOptions.map((c) => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Nama Ketua</label>
                                <input
                                    type="text"
                                    value={org.leader}
                                    onChange={(e) => updateItem(org.id, "leader", e.target.value)}
                                    placeholder="Nama ketua..."
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-300 text-sm font-medium mb-2">Jumlah Anggota</label>
                                <input
                                    type="text"
                                    value={org.members}
                                    onChange={(e) => updateItem(org.id, "members", e.target.value)}
                                    placeholder="mis: 45 anggota"
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-slate-300 text-sm font-medium mb-2">Jadwal Pertemuan</label>
                                <input
                                    type="text"
                                    value={org.schedule}
                                    onChange={(e) => updateItem(org.id, "schedule", e.target.value)}
                                    placeholder="mis: Setiap Sabtu, 16:00 WIB"
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-slate-300 text-sm font-medium mb-2">Deskripsi</label>
                                <textarea
                                    value={org.description}
                                    onChange={(e) => updateItem(org.id, "description", e.target.value)}
                                    placeholder="Deskripsi singkat organisasi..."
                                    rows={3}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {organizations.length === 0 && (
                    <div className="text-center py-16 bg-slate-800/30 border border-slate-700/50 rounded-2xl">
                        <p className="text-slate-400 mb-4">Belum ada organisasi</p>
                        <button
                            onClick={addItem}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors mx-auto"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Organisasi
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
