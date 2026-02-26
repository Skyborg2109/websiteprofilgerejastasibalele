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

async function checkSupabase() {
    console.log("Checking Supabase buckets...");
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error("Error listing buckets:", error.message);
        return;
    }

    console.log("Buckets:", data.map(b => b.name));

    const bucketName = "site-media";
    const hasMediaBucket = data.some(b => b.name === bucketName);

    if (!hasMediaBucket) {
        console.log(`Bucket '${bucketName}' not found. You must create this bucket in the supabase dashboard.`);
    } else {
        console.log(`Bucket '${bucketName}' exists.`);
    }
}

checkSupabase();
