'use server';

import { createClient } from '@/lib/supabase/server';

export async function getCvUrl(filePath: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .storage
    .from('cv-uploads')
    .createSignedUrl(filePath, 60);

  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }
  
  
  return data.signedUrl;
}