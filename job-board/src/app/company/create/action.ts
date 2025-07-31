'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string;
  success: boolean;
};

const defaultTemplates = [
    {
        status: 'Invited for Interview',
        subject: 'Invitation to Interview for {job_title} at {company_name}',
        body: 'Hi {applicant_name},\n\nThank you for applying for the {job_title} position. We were impressed with your background and would like to invite you for an interview.\n\nPlease let us know your availability for the coming week.\n\nBest regards,\nThe Hiring Team at {company_name}'
    },
    {
        status: 'Accepted',
        subject: 'Job Offer for {job_title} at {company_name}',
        body: 'Hi {applicant_name},\n\nCongratulations! Following your recent interview, we are pleased to offer you the position of {job_title} at {company_name}.\n\nWe will send a separate email with the official offer letter and contract details shortly.\n\nBest regards,\nThe Hiring Team at {company_name}'
    },
    {
        status: 'Rejected',
        subject: 'Update on your application for {job_title}',
        body: 'Hi {applicant_name},\n\nThank you for your interest in the {job_title} position at {company_name} and for taking the time to interview with our team.\n\nAfter careful consideration, we have decided to move forward with other candidates. We wish you the best of luck in your job search.\n\nBest regards,\nThe Hiring Team at {company_name}'
    }
];

export async function createCompanyProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'User not authenticated' };

  const companyData = {
    name: formData.get('companyName') as string,
    company_description: formData.get('companyDescription') as string,
    company_fields: formData.get('companyFields') as string,
    total_employees: formData.get('totalEmployees') as string,
    website_url: formData.get('website') as string,
  }
  if (!companyData.name || !companyData.company_description || !companyData.company_fields || !companyData.total_employees) {
    return { success: false, message: 'Please fill all required fields.' };
  }
  
  const { data: newCompany, error } = await supabase
    .from('companies')
    .insert(companyData)
    .select('id')
    .single();

  if (error || !newCompany) {
    return { success: false, message: `Error: ${error?.message}` };
  }

  const templatesToInsert = defaultTemplates.map(template => ({
    ...template,
    company_id: newCompany.id,
  }));

  const { error: templateError } = await supabase
    .from('email_templates')
    .insert(templatesToInsert);

  if (templateError) {
    console.error('Template Insert Error:', templateError);
  }
  
  revalidatePath('/', 'layout');
  redirect('/dashboard/profile');
}