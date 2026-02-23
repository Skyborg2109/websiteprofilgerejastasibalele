import Swal from "sweetalert2";

const baseConfig = {
    background: "#1e293b",        // slate-800
    color: "#f1f5f9",             // slate-100
    confirmButtonColor: "#2563eb", // blue-600
    cancelButtonColor: "#475569",  // slate-600
    customClass: {
        popup: "!rounded-2xl !shadow-2xl !border !border-slate-700/50",
        title: "!text-white !font-bold",
        htmlContainer: "!text-slate-300",
        confirmButton: "!rounded-xl !font-semibold !px-5",
        cancelButton: "!rounded-xl !font-semibold !px-5",
        icon: "!border-0",
    },
};

/** Tampilkan notifikasi sukses */
export function alertSukses(title: string, text?: string) {
    return Swal.fire({
        ...baseConfig,
        icon: "success",
        title,
        text,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        iconColor: "#4ade80", // green-400
    });
}

/** Tampilkan notifikasi error */
export function alertError(title: string, text?: string) {
    return Swal.fire({
        ...baseConfig,
        icon: "error",
        title,
        text,
        iconColor: "#f87171", // red-400
    });
}

/** Tampilkan dialog konfirmasi Simpan (Ya/Batal) */
export function alertKonfirmasiSimpan(namaSection: string = "perubahan ini") {
    return Swal.fire({
        ...baseConfig,
        icon: "question",
        title: "Simpan Perubahan?",
        html: `Apakah Anda yakin ingin menyimpan <b class="text-white">${namaSection}</b>?`,
        showCancelButton: true,
        confirmButtonText: "✓ Ya, Simpan",
        cancelButtonText: "Batal",
        iconColor: "#60a5fa", // blue-400
        reverseButtons: true,
    });
}

/** Tampilkan dialog konfirmasi Reset section (Ya/Batal) */
export function alertKonfirmasiReset(namaSection: string = "bagian ini") {
    return Swal.fire({
        ...baseConfig,
        icon: "warning",
        title: "Reset Konten?",
        html: `<b class="text-white">${namaSection}</b> akan dikembalikan ke nilai default.<br><span class="text-sm text-slate-400">Tindakan ini tidak dapat dibatalkan.</span>`,
        showCancelButton: true,
        confirmButtonText: "Ya, Reset",
        confirmButtonColor: "#dc2626", // red-600
        cancelButtonText: "Batal",
        iconColor: "#fb923c", // orange-400
        reverseButtons: true,
    });
}

/** Tampilkan dialog konfirmasi Hapus item (Ya/Batal) */
export function alertKonfirmasiHapus(namaItem: string = "item ini") {
    return Swal.fire({
        ...baseConfig,
        icon: "warning",
        title: "Hapus Item?",
        html: `<b class="text-white">${namaItem}</b> akan dihapus secara permanen.`,
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#dc2626",
        cancelButtonText: "Batal",
        iconColor: "#f87171",
        reverseButtons: true,
    });
}

/** Tampilkan dialog konfirmasi Reset SEMUA data */
export function alertKonfirmasiResetSemua() {
    return Swal.fire({
        ...baseConfig,
        icon: "warning",
        title: "⚠️ Reset Semua Data?",
        html: `Semua konten website akan dikembalikan ke nilai <b class="text-white">default awal</b>.<br><span class="text-red-400 text-sm font-semibold">Tindakan ini tidak dapat dibatalkan!</span>`,
        showCancelButton: true,
        confirmButtonText: "Ya, Reset Semua",
        confirmButtonColor: "#dc2626",
        cancelButtonText: "Batal",
        iconColor: "#f87171",
        reverseButtons: true,
        input: "text",
        inputPlaceholder: "Ketik \"RESET\" untuk konfirmasi",
        inputAttributes: {
            style: "background:#0f172a;border:1px solid #475569;color:#f1f5f9;border-radius:12px;padding:10px 16px;margin-top:12px;width:100%;",
            autocomplete: "off",
        },
        preConfirm: (val: string) => {
            if (val !== "RESET") {
                Swal.showValidationMessage("Ketik tepat \"RESET\" untuk melanjutkan");
                return false;
            }
            return true;
        },
    });
}
