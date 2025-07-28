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
    redirect('/?error=unauthenticated');
  }

  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id, name, is_verified')
    .eq('owned_by', user.id)
    .single();

  if (companyError || !company) {
    redirect('/company/create?error=company_not_found');
  }

  const title = formData.get('title') as string;
  const company_name = company.name as string;
  const address = formData.get('address') as string;
  const description = formData.get('description') as string;
  const job_type = formData.get('job_type') as string;
  const salary = Number(formData.get('salary'));

  const { error } = await supabase.from('jobs').insert({
    title,
    description,
    company_name,
    address,
    job_type,
    salary,
    company_id: company.id,
  });

  if (error) {
    redirect('/post-job?error=post_job_error&message='+error.message);
  }

  revalidatePath('/');
  redirect('/');
}