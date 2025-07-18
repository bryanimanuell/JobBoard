'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string;
  success: boolean;
};

export async function createCompanyProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'User not authenticated' };

  const name = formData.get('companyName') as string;
  const description = formData.get('companyDescription') as string;
  const fields = formData.get('companyFields') as string;
  const totalEmployees = formData.get('totalEmployees') as string;
  const website = formData.get('website') as string;

  if (!name || !description || !fields || !totalEmployees) {
    return { success: false, message: 'Please fill all required fields.' };
  }
  
  const { error } = await supabase.from('companies').insert({
    name: name,
    company_description: description,
    company_fields: fields,
    total_employees: totalEmployees,
    website_url: website,
    owned_by: user.id, 
  });

  if (error) {
    return { success: false, message: `Error: ${error.message}` };
  }

  revalidatePath('/', 'layout');
  redirect('/');
//   redirect('/dashboard');
}