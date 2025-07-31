'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string;
  success: boolean;
};

export async function updateEmailTemplate(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Not authenticated.' };
  
  const templateId = formData.get('templateId') as string;
  const subject = formData.get('subject') as string;
  const body = formData.get('body') as string;

  const { error } = await supabase
    .from('email_templates')
    .update({ subject, body })
    .eq('id', templateId);

  if (error) {
    return { success: false, message: `Error: ${error.message}` };
  }

  revalidatePath('/dashboard/templates');
  return { success: true, message: 'Template updated successfully!' };
}