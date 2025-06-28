'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Database } from '@/types/supabase';

export async function postJobAction(formData: FormData) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not authenticated.');
  }

  const title = formData.get('title') as string;
  const company_name = formData.get('company_name') as string;
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
    user_id: user.id,
  });

  if (error) {
    console.error('Error inserting job:', error);
    throw new Error(error.message);
  }

  revalidatePath('/');
  redirect('/');
}