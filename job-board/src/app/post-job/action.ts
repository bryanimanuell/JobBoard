'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function postJobAction(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('owned_by', user.id)
    .single();

  if (!company) {
    throw new Error('Company not found.');
  }

  const jobData = {
    company_id: company.id,
    company_name: formData.get('company_name') as string,
    title: formData.get('title') as string,
    job_type: formData.get('job_type') as string,
    experience_level: formData.get('experience_level') as string,
    address: formData.get('address') as string,
    city: formData.get('city') as string,
    salary: Number(formData.get('salary')) || null,
    responsibilities: formData.get('responsibilities') as string,
    qualifications: formData.get('qualifications') as string,
  };

  const { error } = await supabase.from('jobs').insert(jobData);

  if (error) {
    console.error('Error inserting job:', error);
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/dashboard/jobs');
  redirect('/dashboard/jobs');
}