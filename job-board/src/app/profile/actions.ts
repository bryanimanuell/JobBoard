'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string;
  success: boolean;
};

export async function updateBasicProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'User not authenticated' };

  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const linkedin = formData.get('linkedin') as string;
  const github = formData.get('github') as string;

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      phone: phone,
      linkedin_url: linkedin,
      github_url: github,
    })
    .eq('id', user.id);

  if (error) {
    return { success: false, message: `Error: ${error.message}` };
  }

  revalidatePath('/profile');
  return { success: true, message: 'Profile updated successfully!' };
}

export async function updateUserPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const newPassword = formData.get('newPassword') as string;
  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
  return { success: true, message: 'Password updated successfully!' };
}

export async function deleteCv(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const cvPath = formData.get('cvPath') as string;
  if (!cvPath) throw new Error('CV path not found.');
  
  const { error } = await supabase.storage.from('cv-uploads').remove([cvPath]);
  if (error) {
    console.error("Storage Error:", error.message); 
    return; 
  }
 
  const { error: dbError } = await supabase.from('user_cvs').delete().eq('file_path', cvPath).eq('user_id', user.id);
  if (dbError) {
    console.error("Database Error:", dbError.message);
    return;
  }
  
  revalidatePath('/profile');
}

export async function uploadNewCv(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'User not authenticated' };

  const { count } = await supabase
    .from('user_cvs')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id);
    
  if (count !== null && count >= 2) {
    return { success: false, message: 'You can only save a maximum of 2 CVs.' };
  }

  const file = formData.get('cvFile') as File;
  if (!file || file.size === 0) {
    return { success: false, message: 'No file selected.' };
  }

  const filePath = `${user.id}/${Date.now()}_${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from('cv-uploads')
    .upload(filePath, file);

  if (uploadError) {
    return { success: false, message: `Storage Error: ${uploadError.message}` };
  }

  const { error: dbError } = await supabase.from('user_cvs').insert({
    user_id: user.id,
    file_path: filePath,
    cv_name: file.name,
  });

  if (dbError) {
    return { success: false, message: `Database Error: ${dbError.message}` };
  }

  revalidatePath('/profile');
  return { success: true, message: 'New CV uploaded successfully!' };
}

export async function switchEdit(value: boolean) {
  return !value;
}