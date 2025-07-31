'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

export async function getCvUrl(filePath: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .storage
    .from('cv-uploads')
    .createSignedUrl(filePath, 60);

  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }
  
  return data.signedUrl;
}

export async function updateStatusAndNotify(
  applicationId: string,
  newStatus: string,
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: details, error: detailsError } = await supabase
      .from('application_details')
      .select('*')
      .eq('id', applicationId)
      .single();

    if (detailsError) throw detailsError;
    if (!details) throw new Error('Application details not found in view.');
    
    const { data: template } = await supabase
      .from('email_templates')
      .select('subject, body')
      .eq('company_id', details.company_id)
      .eq('status', newStatus)
      .single();

    if ((!template || !template.body)) {
      await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);
      
      revalidatePath('/dashboard/applicants');
      return { success: true, message: 'Status updated, but no email template found.' };
    }

    const finalBody = template?.body
      .replace(/{applicant_name}/g, details.applicant_name || 'there')
      .replace(/{job_title}/g, details.job_title || 'the position')
      .replace(/{company_name}/g, details.company_name || 'our company');
      
    const finalSubject = template?.subject
      ?.replace(/{job_title}/g, details.job_title || 'the position')
      .replace(/{company_name}/g, details.company_name || 'our company')
      .replace(/\n/g, '<br>');

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['bryanimanuell17@gmail.com'],
      subject: finalSubject || 'Update on your job application',
      text: finalBody,
    });

    const { error: updateError } = await supabase
      .from('applications')
      .update({ status: newStatus })
      .eq('id', applicationId);
    if (updateError) throw updateError;

    revalidatePath('/dashboard/applicants');
    return { success: true, message: `Status updated and email sent to applicant!` };
  
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}