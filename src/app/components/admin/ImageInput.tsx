import { useState, useRef, ChangeEvent } from "react";
import { Link, Upload, X, Image } from "lucide-react";

interface ImageInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    previewHeight?: string; // e.g. "h-40" or "h-32"
    hint?: string;
}

export function ImageInput({ label, value, onChange, previewHeight = "h-40", hint }: ImageInputProps) {
    const [mode, setMode] = useState<"url" | "file">(
        value && value.startsWith("data:") ? "file" : "url"
    );
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processFile(file);
    };

    const processFile = (file: File) => {
        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Hanya file gambar yang diperbolehkan.");
            return;
        }
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran file maksimal 5MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result as string;
            onChange(result);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    const clearImage = () => {
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const isDataUrl = value && value.startsWith("data:");

    return (
        <div className="space-y-3">
            {/* Label */}
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
                    {/* Drop Zone */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${dragOver
                                ? "border-blue-400 bg-blue-500/10"
                                : "border-slate-600 hover:border-slate-500 hover:bg-slate-700/30"
                            }`}
                    >
                        <Image className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                        <p className="text-slate-300 text-sm font-medium">
                            Klik atau seret & lepas gambar di sini
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                            PNG, JPG, WEBP • Maks. 5MB
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                    {/* Show selected file name if data URL */}
                    {isDataUrl && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                            File berhasil dimuat
                            <button
                                type="button"
                                onClick={clearImage}
                                className="ml-auto flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors"
                            >
                                <X className="w-3 h-3" /> Hapus
                            </button>
                        </div>
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
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
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

            {/* Hint */}
            {hint && <p className="text-slate-500 text-xs">{hint}</p>}
        </div>
    );
}
