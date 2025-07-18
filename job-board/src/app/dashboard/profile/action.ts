'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string;
  success: boolean;
};

export async function updateCompanyProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'User not authenticated.' };

  const name = formData.get('name') as string;
  const description = formData.get('company_description') as string;
  const fields = formData.get('company_fields') as string;
  const employees = formData.get('total_employees') as string;
  const website = formData.get('website_url') as string;

  const { error } = await supabase
    .from('companies')
    .update({
      name,
      company_description: description,
      company_fields: fields,
      total_employees: employees,
      website_url: website,
    })
    .eq('owned_by', user.id);

  if (error) {
    console.error('Update Error:', error);
    return { success: false, message: `Error: ${error.message}` };
  }

  revalidatePath('/dashboard/profile'); // Revalidasi halaman ini
  revalidatePath('/', 'layout'); // Revalidasi layout utama (jika nama company tampil di sana)
  return { success: true, message: 'Profile updated successfully!' };
}