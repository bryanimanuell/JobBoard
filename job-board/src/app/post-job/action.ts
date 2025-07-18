'use server';

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function postJobAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not authenticated.');
  }

  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id, name, is_verified')
    .eq('owned_by', user.id)
    .single();

  if (companyError || !company) {
    // Nanti ini bisa di-redirect ke halaman untuk membuat profil perusahaan
    throw new Error('Company profile not found for this user.');
  }

  const title = formData.get('title') as string;
  const company_name = company.name as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const job_type = formData.get('job_type') as string;
  const salary = Number(formData.get('salary'));

  const { error } = await supabase.from('jobs').insert({
    title,
    description,
    company_name,
    location,
    job_type,
    salary,
    company_id: company.id,
  });

  if (error) {
    console.error('Error inserting job:', error);
    throw new Error(error.message);
  }

  revalidatePath('/');
  redirect('/');
}