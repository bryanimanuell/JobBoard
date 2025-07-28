'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function archieveJob(formData: FormData) {
  const jobId = formData.get('jobId') as string;
  const supabase = await createClient();
   
  const { error } = await supabase.from('jobs').update({status: 'ARCHIEVED'}).eq('id', jobId);

  if (error) {
    console.error('Delete Job Error:', error); 
  }
  revalidatePath('/dashboard/jobs');
}

export async function updateJobStatus(formData: FormData) {
  const jobId = formData.get('jobId') as string;
  const newStatus = formData.get('status') as string;
  const supabase = await createClient();

  if (newStatus !== 'ACTIVE' && newStatus !== 'INACTIVE') {
    return;
  }
  
  const { error } = await supabase
    .from('jobs')
    .update({status: newStatus})
    .eq('id', jobId);

  if (error) {
    console.error('Update Status Error:', error); 
  }
  revalidatePath('/dashboard/jobs');
}