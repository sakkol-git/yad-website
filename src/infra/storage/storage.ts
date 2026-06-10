import { SupabaseClient } from '@supabase/supabase-js';

export class StorageService {
  private bucket: string;

  constructor(bucket: string = 'public-assets') {
    this.bucket = bucket;
  }

  async uploadFile(supabase: SupabaseClient, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(this.bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) throw error;
    
    // Return the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(this.bucket)
      .getPublicUrl(data.path);

    return publicUrl;
  }

  async deleteFile(supabase: SupabaseClient, path: string) {
    const { error } = await supabase.storage
      .from(this.bucket)
      .remove([path]);

    if (error) throw error;
    return true;
  }
}
