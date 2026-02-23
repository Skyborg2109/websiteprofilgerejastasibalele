import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import { alertSukses, alertKonfirmasiSimpan, alertKonfirmasiReset } from "../../utils/showAlert";

export function AdminTampilan() {
    const { content, updateContent, resetSection } = useSiteContent();
    const [navbar, setNavbar] = useState({ ...content.navbar });
    const [footer, setFooter] = useState({ ...content.footer });

    const handleSave = async () => {
        const result = await alertKonfirmasiSimpan("Navbar & Footer");
        if (!result.isConfirmed) return;
        updateContent("navbar", navbar);
        updateContent("footer", footer);
        alertSukses("Tersimpan!", "Navbar & Footer berhasil diperbarui.");
    };

    const handleResetNavbar = async () => {
        const result = await alertKonfirmasiReset("Navbar");
        if (!result.isConfirmed) return;
        resetSection("navbar");
        setNavbar({ ...content.navbar });
        alertSukses("Direset!", "Navbar dikembalikan ke default.");
    };

    const handleResetFooter = async () => {
        const result = await alertKonfirmasiReset("Footer");
        if (!result.isConfirmed) return;
        resetSection("footer");
        setFooter({ ...content.footer });
        alertSukses("Direset!", "Footer dikembalikan ke default.");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Navbar & Footer</h1>
                    <p className="text-slate-400 text-sm mt-1">Kustomisasi tampilan navbar dan footer di semua halaman</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Simpan Semua
                    </button>
                </div>
            </div>

            {/* Navbar */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">Navbar (Header)</h2>
                    <button
                        onClick={handleResetNavbar}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                </div>

                {/* Preview */}
                <div className="bg-white rounded-xl p-3 border border-slate-600">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">⛪</span>
                        </div>
                        <div>
                            <div className="font-bold text-sm text-gray-900">{navbar.churchName || "Nama Gereja"}</div>
                            <div className="text-xs text-gray-600">{navbar.subName || "Sub Nama"}</div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Nama Gereja (baris 1)</label>
                        <input
                            type="text"
                            value={navbar.churchName}
                            onChange={(e) => setNavbar({ ...navbar, churchName: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Sub Nama (baris 2)</label>
                        <input
                            type="text"
                            value={navbar.subName}
                            onChange={(e) => setNavbar({ ...navbar, subName: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-white font-semibold">Footer</h2>
                    <button
                        onClick={handleResetFooter}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                </div>

                {/* Preview */}
                <div className="bg-gray-900 rounded-xl p-4 border border-slate-600">
                    <p className="text-gray-400 text-sm mb-2">{footer.description || "Deskripsi footer..."}</p>
                    <p className="text-gray-500 text-xs">© {new Date().getFullYear()} {footer.copyright}</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Deskripsi Gereja</label>
                        <textarea
                            value={footer.description}
                            onChange={(e) => setFooter({ ...footer, description: e.target.value })}
                            rows={3}
                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-2">Teks Copyright</label>
                        <input
                            type="text"
                            value={footer.copyright}
                            onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <p className="text-slate-500 text-xs mt-1">Tahun otomatis ditambahkan di depan</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
