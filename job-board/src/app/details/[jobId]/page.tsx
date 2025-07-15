import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';
import { Database } from '@/types/supabase';

type Profile = Pick<Database['public']['Tables']['profiles']['Row'], 'role'>;

export default async function ApplyPage({ params, profile }: { params: { jobId: number }; profile: Profile | null; }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', params.jobId)
    .single(); 

  if (error || !job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 my-10 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2 text-white">Apply for Job</h1>
      <p className="text-gray-400 mb-6">
        You are applying for the position of:
      </p>

      <div className="border border-gray-700 bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-white">{job.title}</h2>
        <p className="text-md text-gray-300">{job.company_name}</p>
        <p className="text-sm text-gray-400">📍 {job.location}</p>
        <br />
        <h2 className="text-l font-semibold text-white">Job Description</h2>
        <p className="text-md text-gray-300">{job.description}</p>
      </div>
      
      <div className="mt-6">
        <p className="text-gray-300">
          Logged in as: <strong>{user.email}</strong>
        </p>
      </div>

      <div className="mt-8">
        {/* Nanti di sini kita bisa taruh form aplikasi (upload CV, dll) */}
        {/* atau langsung tombol konfirmasi apply */}
        { profile?.role !== 'Company' && (
          <button className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            Apply Job
          </button>)}
      </div>
    </div>
  );
}