import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envFiles = [".env", ".env.local"];
let envContent = "";
for (const file of envFiles) {
    if (fs.existsSync(file)) {
        envContent = fs.readFileSync(file, "utf8");
        break;
    }
}

const lines = envContent.split("\n");
const env = {};
for (const line of lines) {
    if (line.trim() && !line.startsWith("#")) {
        const parts = line.split("=");
        if (parts.length >= 2) {
            env[parts[0].trim()] = parts.slice(1).join("=").trim();
        }
    }
}

const supabaseUrl = env["VITE_SUPABASE_URL"];
const supabaseKey = env["VITE_SUPABASE_ANON_KEY"];

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE credentials!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
    console.log("Checking Supabase tables...");
    const { data, error } = await supabase.from('site_content').select('*').limit(1);

    if (error) {
        if (error.code === '42P01') {
            console.log("Table 'site_content' does not exist. You need to create it.");
        } else {
            console.error("Error accessing 'site_content':", error.message);
        }
    } else {
        console.log("Table 'site_content' exists. Test row count:", data.length);
    }
}

checkDatabase();
