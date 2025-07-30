import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import EditJobForm from './editJobForm';

type Params = Promise<{ jobId: string}>

export default async function EditJobPage({ params }: { params: Params }) {
  const supabase = await createClient();
  const awaited = await params;
  const jobId = awaited.jobId;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .select('*, companies ( owned_by )')
    .eq('id', jobId)
    .single();

  if (jobError || !job) {
    redirect('/dashboard/jobs');
  }

  if (job.companies?.owned_by !== user.id) {
    redirect('/dashboard/jobs');
  }
  
  return (
    <div className="w-full mx-auto p-4 sm:p-8 space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-white">Edit Job Posting</h1>
        <p className="text-gray-400">
          Update the details for the position: <span className="font-semibold text-white">{job.title}</span>
        </p>
      </header>
      <div className="p-8 my-10 bg-gray-800 rounded-lg shadow-md">
        <EditJobForm job={job} />
      </div>
    </div>
  );
}