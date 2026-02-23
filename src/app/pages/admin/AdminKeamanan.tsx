import { Key, Shield, AlertTriangle } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";
import { alertSukses, alertKonfirmasiResetSemua } from "../../utils/showAlert";

export function AdminKeamanan() {
    const { resetAll } = useSiteContent();

    const handleResetAll = async () => {
        const result = await alertKonfirmasiResetSemua();
        if (!result.isConfirmed) return;
        resetAll();
        alertSukses("Semua Data Direset!", "Konten website dikembalikan ke nilai default awal.");
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Keamanan & Reset</h1>
                <p className="text-slate-400 text-sm mt-1">Pengaturan keamanan dan opsi reset konten</p>
            </div>

            {/* Info Panel */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-white font-semibold mb-1">Informasi Sistem</h3>
                        <ul className="text-slate-300 text-sm space-y-1">
                            <li>• Password default: <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-blue-300">admin123</span></li>
                            <li>• Semua data tersimpan di localStorage browser ini</li>
                            <li>• Perubahan langsung diterapkan ke halaman website</li>
                            <li>• Untuk mengubah password, edit file <span className="font-mono text-xs bg-slate-800 px-1 py-0.5 rounded">SiteContentContext.tsx</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Login Info */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Key className="w-5 h-5 text-yellow-400" />
                    Akses Admin
                </h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                        <span className="text-slate-300 text-sm">Username</span>
                        <span className="text-white font-mono text-sm">Administrator</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                        <span className="text-slate-300 text-sm">Password</span>
                        <span className="text-white font-mono text-sm">admin123</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                        <span className="text-slate-300 text-sm">URL Login</span>
                        <span className="text-blue-400 font-mono text-sm">/admin/login</span>
                    </div>
                </div>
                <p className="text-slate-500 text-xs mt-3">
                    * Untuk keamanan produksi, ganti password di file context dan tambahkan backend authentication yang sesungguhnya.
                </p>
            </div>

            {/* Reset Data */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
                <h2 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Reset Semua Data
                </h2>
                <p className="text-slate-400 text-sm mb-4">
                    Mengembalikan semua konten ke nilai default awal. Tindakan ini tidak dapat dibatalkan.
                </p>
                <button
                    onClick={handleResetAll}
                    className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                    <AlertTriangle className="w-4 h-4" />
                    Reset Semua Konten
                </button>
            </div>
        </div>
    );
}
