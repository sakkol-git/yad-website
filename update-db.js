import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: member } = await supabase.from('members').select('id, profile').eq('slug', 'resident-1').single();
  
  if (member) {
    const updatedProfile = {
      ...member.profile,
      khmerBiography: "សុខា ហេង បានចូលរួមកម្មវិធីស្នាក់នៅរបស់ YAD ក្នុងឆ្នាំ ២០២៣។ ដោយមកពីគ្រួសារកសិករនៅខេត្តព្រៃវែង ឥឡូវនេះគាត់កំពុងបន្តក្តីស្រមៃរបស់គាត់ក្នុងការក្លាយជាអ្នកអភិវឌ្ឍន៍កម្មវិធី ដើម្បីបង្កើតដំណោះស្រាយឌីជីថលសម្រាប់ការតាមដានកសិកម្មនៅកម្ពុជា។"
    };
    
    const { error } = await supabase.from('members').update({ profile: updatedProfile }).eq('id', member.id);
    console.log("DB UPDATE SUCCESS?", !error, error);
  }
}
run();
