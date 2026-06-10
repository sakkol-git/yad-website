import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.resolve(__dirname, '.env.local');
let url = '';
let key = '';

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
  });
}

if (!url || !key) {
  console.error("❌ ERROR: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

async function testConnection() {
  console.log(`🔌 Testing connection to Supabase Project: ${url}`);
  try {
    const { data, error } = await supabase.from('members').select('*').limit(1);
    
    if (error) {
      if (error.code === '42P01') {
        console.log("✅ SUCCESS: Connection is WORKING!");
        console.log("⚠️ NOTE: The query returned an error because the 'members' table does not exist yet.");
        console.log("   This means you need to run the SQL migration files in the Supabase Dashboard SQL Editor.");
      } else {
        console.error("❌ ERROR: Connection might be working, but query failed with:", error.message);
      }
    } else {
      console.log("✅ SUCCESS: Connection is WORKING!");
      console.log("📊 Data returned from 'members' table:", data);
    }
  } catch (err) {
    console.error("❌ FATAL ERROR: Could not reach Supabase.", err);
  }
}

testConnection();
