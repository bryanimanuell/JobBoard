'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type FormState = {
  message: string;
  success: boolean;
};

export async function updateJob(
  jobId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: 'User not authenticated.' };

    const { data: jobOwner } = await supabase
        .from('jobs')
        .select('companies ( owned_by )')
        .eq('id', jobId)
        .single();
  
    if (!jobOwner) {
        return { success: false, message: 'Company profile not found.' };
    }

    const updatedData = {
        title: formData.get('title') as string,
        job_type: formData.get('job_type') as string,
        address: formData.get('address') as string,
        salary: Number(formData.get('salary')),
        experience_level: formData.get('experience_level') as string,
        responsibilities: formData.get('responsibilities') as string,
        qualifications: formData.get('qualifications') as string,
    };

    const { error } = await supabase
        .from('jobs')
        .update(updatedData)
        .eq('id', jobId);

    if (error) {
        return { success: false, message: `Error: ${error.message}` };
    }

    revalidatePath(`/dashboard/jobs`);
    revalidatePath(`/details/${jobId}`);
    redirect(`/dashboard/jobs`);
}