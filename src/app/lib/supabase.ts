import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Jika env vars belum diset, supabase client tidak dibuat (app fallback ke localStorage)
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey &&
    supabaseUrl !== "https://xxxxxxxxxxxxxxxx.supabase.co" &&
    supabaseUrl.startsWith("https://")) {
    try {
        supabase = createClient(supabaseUrl, supabaseAnonKey);
    } catch (e) {
        console.warn("[Supabase] Gagal membuat client:", e);
    }
} else {
    console.info("[Supabase] URL tidak dikonfigurasi, menggunakan localStorage sebagai penyimpanan.");
}

export { supabase };
