/// <reference types="vite/client" />
import { useState, useRef, ChangeEvent } from "react";
import { Link, Upload, X, Image, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface ImageInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    previewHeight?: string;
    hint?: string;
}

/** Upload file ke Supabase Storage dan kembalikan public URL-nya */
async function uploadToSupabase(file: File): Promise<string> {
    if (!supabase) throw new Error("Supabase tidak dikonfigurasi");

    const ext = file.name.split(".").pop() ?? "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `images/${fileName}`;

    const { error } = await supabase.storage
        .from("site-media")
        .upload(filePath, file, { upsert: false, contentType: file.type });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("site-media").getPublicUrl(filePath);
    return data.publicUrl;
}

export function ImageInput({ label, value, onChange, previewHeight = "h-40", hint }: ImageInputProps) {
    const [mode, setMode] = useState<"url" | "file">(
        value && value.startsWith("data:") ? "file" : "url"
    );
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file);
    };

    const processFile = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            setUploadError("Hanya file gambar yang diperbolehkan.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setUploadError("Ukuran file maksimal 5MB.");
            return;
        }

        setUploadError(null);

        // Jika Supabase tersedia, upload ke Storage
        if (supabase) {
            setUploading(true);
            try {
                const publicUrl = await uploadToSupabase(file);
                onChange(publicUrl);
            } catch (err) {
                console.error("[ImageInput] Upload gagal, fallback ke base64:", err);
                // Fallback ke base64 jika upload gagal
                readAsBase64(file);
                setUploadError("Upload ke cloud gagal, gambar disimpan lokal (tidak sinkron antar perangkat).");
            } finally {
                setUploading(false);
            }
        } else {
            // Tidak ada Supabase — fallback ke base64
            readAsBase64(file);
        }
    };

    const readAsBase64 = (file: File) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            onChange(ev.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const clearImage = () => {
        onChange("");
        setUploadError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const isDataUrl = value && value.startsWith("data:");
    const isSupabaseUrl = value && value.includes("supabase");

    return (
        <div className="space-y-3">
            <label className="block text-slate-300 text-sm font-medium">{label}</label>

            {/* Mode Toggle */}
            <div className="flex gap-1 bg-slate-900/80 border border-slate-700 rounded-xl p-1 w-fit">
                <button
                    type="button"
                    onClick={() => setMode("url")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${mode === "url"
                        ? "bg-blue-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                        }`}
                >
                    <Link className="w-3.5 h-3.5" />
                    URL
                </button>
                <button
                    type="button"
                    onClick={() => setMode("file")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${mode === "file"
                        ? "bg-blue-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                        }`}
                >
                    <Upload className="w-3.5 h-3.5" />
                    Upload File
                </button>
            </div>

            {/* URL Input Mode */}
            {mode === "url" && (
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={isDataUrl ? "" : value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="https://example.com/gambar.jpg"
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {value && (
                        <button
                            type="button"
                            onClick={clearImage}
                            className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-slate-800 hover:bg-red-500/20 border border-slate-600 hover:border-red-500/50 rounded-xl text-slate-400 hover:text-red-400 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            )}

            {/* File Upload Mode */}
            {mode === "file" && (
                <div>
                    <div
                        onClick={() => !uploading && fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${uploading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${dragOver
                            ? "border-blue-400 bg-blue-500/10"
                            : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/30"
                            }`}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-8 h-8 text-blue-400 mx-auto mb-2 animate-spin" />
                                <p className="text-slate-300 text-sm font-medium">Mengupload gambar...</p>
                                <p className="text-slate-500 text-xs mt-1">Mohon tunggu</p>
                            </>
                        ) : (
                            <>
                                <Image className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                <p className="text-slate-300 text-sm font-medium">
                                    Klik atau seret &amp; lepas gambar di sini
                                </p>
                                <p className="text-slate-500 text-xs mt-1">PNG, JPG, WEBP • Maks. 5MB</p>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={uploading}
                        />
                    </div>

                    {/* Status */}
                    {!uploading && isSupabaseUrl && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                            Gambar berhasil diupload ke cloud ✓
                            <button type="button" onClick={clearImage} className="ml-auto flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors">
                                <X className="w-3 h-3" /> Hapus
                            </button>
                        </div>
                    )}
                    {!uploading && isDataUrl && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-yellow-400">
                            <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                            Gambar disimpan lokal (tidak sinkron antar perangkat)
                            <button type="button" onClick={clearImage} className="ml-auto flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors">
                                <X className="w-3 h-3" /> Hapus
                            </button>
                        </div>
                    )}
                    {uploadError && (
                        <p className="mt-2 text-xs text-red-400">{uploadError}</p>
                    )}
                </div>
            )}

            {/* Preview */}
            {value && (
                <div className={`relative ${previewHeight} rounded-xl overflow-hidden border border-slate-600 group`}>
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            type="button"
                            onClick={clearImage}
                            className="bg-red-500/80 hover:bg-red-500 text-white rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors"
                        >
                            <X className="w-3.5 h-3.5" /> Hapus Gambar
                        </button>
                    </div>
                </div>
            )}

            {hint && <p className="text-slate-500 text-xs">{hint}</p>}
        </div>
    );
}
