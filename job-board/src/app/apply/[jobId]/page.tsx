import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ApplyForm from './applyForm';
import Link from 'next/link';

type Params = Promise<{ jobId: string}>

export default async function ApplyPage({ params }: { params: Params }) {
  const supabase = await createClient();
  const { jobId } = await params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect_to=/apply/${jobId}`);
  }
  const { data: existingApplication, error: checkError } = await supabase
    .from('applications')
    .select('id')
    .eq('user_id', user.id)
    .eq('job_id', jobId)
    .maybeSingle();

  if (checkError) {
    return <div>Error checking your application status. Please try again.</div>;
  }
  const profilePromise = supabase.from('profiles').select('*').eq('id', user.id).single();
  const jobPromise = supabase.from('jobs').select('*, companies(*)').eq('id', jobId).single();
  const savedCvsPromise = supabase.from('user_cvs').select('*').eq('user_id', user.id);
  
  const [{ data: profile }, { data: job }, { data: savedCvs }] = await Promise.all([
    profilePromise,
    jobPromise,
    savedCvsPromise,
  ]);

  if (!profile || profile.role !== 'Personal') {
    redirect('/');
  }

  if (!job || !job.companies) {
    return <div>Job not found.</div>;
  }
  if (existingApplication) {
    return (
      <div className="max-w-3xl mx-auto p-8 my-10 text-center">
        <div className="p-8 bg-gray-800 rounded-lg border border-gray-700">
          <h1 className="text-2xl font-bold text-white">Application Already Submitted</h1>
          <p className="text-gray-400 mt-4">
            You have already applied for the position of{' '}
            <span className="font-semibold text-white">{job.title}</span> at{' '}
            <span className="font-semibold text-white">{job.companies.name}</span>.
          </p>
          <p className="text-gray-400 mt-2">
            The company will review your application and get back to you.
          </p>
          <Link href="/" className="mt-6 inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 my-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Apply for Job</h1>
        <p className="text-gray-400 mt-2">
          You are applying for the position of{' '}
          <span className="font-semibold text-white">{job.title}</span> at{' '}
          <span className="font-semibold text-white">{job.companies.name}</span>.
        </p>
      </header>
      
      <div className="p-8 bg-gray-800 rounded-lg border border-gray-700">
        <ApplyForm
          job={job}
          company={job.companies}
          savedCvs={savedCvs || []}
        />
      </div>
    </div>
  );
}