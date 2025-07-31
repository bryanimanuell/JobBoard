import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import TemplateEditor from './templateEditor';

export default async function EmailTemplatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('owned_by', user.id)
    .single();

  if (!company) {
    redirect('/company/create');
  }
  
  const { data: templates } = await supabase
    .from('email_templates')
    .select('*')
    .eq('company_id', company.id);

  return (
    <div className="w-full mx-auto p-4 sm:p-8 space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-white">Email Templates</h1>
        <p className="text-gray-400">
          Customize the emails sent to applicants when their status changes.
        </p>
      </header>
      <div className="p-8 my-4 rounded-lg shadow-md">
        <TemplateEditor templates={templates || []} />
      </div>
    </div>
  );
}