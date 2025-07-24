'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string;
  success: boolean;
};

export async function submitApplication(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'User not authenticated.' };

  const cvSource = formData.get('cvSource') as string;
  const jobId = formData.get('jobId') as string;
  const companyId = formData.get('companyId') as string;
  let cvPath = formData.get('savedCvPath') as string;

  if (cvSource === 'new') {
    const newCvFile = formData.get('newCvFile') as File;
    if (!newCvFile || newCvFile.size === 0) {
      return { success: false, message: 'Please select a new CV file.' };
    }
    const filePath = `${user.id}/${Date.now()}_${newCvFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('cv-uploads')
      .upload(filePath, newCvFile);

    if (uploadError) return { success: false, message: `Upload error: ${uploadError.message}` };
    cvPath = filePath;
  }
  
  if (!cvPath) {
    return { success: false, message: 'CV is required.' };
  }

  const { error } = await supabase.from('applications').insert({
    job_id: jobId,
    user_id: user.id,
    company_id: companyId,
    submitted_cv_path: cvPath,
    relatives: formData.get('relativesInfo') as string,
    years_of_experience: Number(formData.get('experience')),
    cover_letter: formData.get('coverLetter') as string,
  });

  if (error) {
    console.error('Application Error:', error);
    return { success: false, message: `Database error: ${error.message}` };
  }
  
  revalidatePath('/'); 
  redirect('/');
}