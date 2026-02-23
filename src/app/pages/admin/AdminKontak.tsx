import { useState } from "react";
import { Save, RotateCcw, MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import { useSiteContent, ContactInfo } from "../../context/SiteContentContext";
import { alertSukses, alertKonfirmasiSimpan, alertKonfirmasiReset } from "../../utils/showAlert";

export function AdminKontak() {
    const { content, updateContent, resetSection } = useSiteContent();
    const [contact, setContact] = useState<ContactInfo>({ ...content.contact });

    const handleSave = async () => {
        const result = await alertKonfirmasiSimpan("Informasi Kontak");
        if (!result.isConfirmed) return;
        updateContent("contact", contact);
        alertSukses("Tersimpan!", "Informasi kontak berhasil diperbarui.");
    };

    const handleReset = async () => {
        const result = await alertKonfirmasiReset("Informasi Kontak");
        if (!result.isConfirmed) return;
        resetSection("contact");
        setContact({ ...content.contact });
        alertSukses("Direset!", "Kontak dikembalikan ke default.");
    };

    const fields: { key: keyof ContactInfo; label: string; icon: typeof MapPin; type?: string; rows?: number }[] = [
        { key: "address", label: "Alamat Lengkap", icon: MapPin, rows: 3 },
        { key: "phone", label: "Nomor Telepon", icon: Phone },
        { key: "email", label: "Email", icon: Mail, type: "email" },
        { key: "officeHours", label: "Jam Kantor", icon: Clock },
        { key: "facebook", label: "Link Facebook", icon: Globe, type: "url" },
        { key: "instagram", label: "Link Instagram", icon: Globe, type: "url" },
        { key: "youtube", label: "Link YouTube", icon: Globe, type: "url" },
        { key: "mapEmbedUrl", label: "Google Maps Embed URL", icon: MapPin, type: "url" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Informasi Kontak</h1>
                    <p className="text-slate-400 text-sm mt-1">Edit alamat, telepon, email, dan media sosial gereja</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Simpan
                    </button>
                </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {fields.map(({ key, label, icon: Icon, type = "text", rows }) => (
                        <div key={key} className={rows ? "md:col-span-2" : ""}>
                            <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2">
                                <Icon className="w-4 h-4 text-slate-500" />
                                {label}
                            </label>
                            {rows ? (
                                <textarea
                                    value={contact[key]}
                                    onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                                    rows={rows}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            ) : (
                                <input
                                    type={type}
                                    value={contact[key]}
                                    onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Map Preview */}
                {contact.mapEmbedUrl && contact.mapEmbedUrl.includes("google.com/maps") && (
                    <div className="mt-6">
                        <p className="text-slate-300 text-sm font-medium mb-2">Preview Peta</p>
                        <div className="h-64 rounded-xl overflow-hidden border border-slate-600">
                            <iframe
                                src={contact.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                loading="lazy"
                                className="border-0"
                                title="Map Preview"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
