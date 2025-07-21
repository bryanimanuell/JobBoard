import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';
import { FaGlobe, FaLocationDot, FaUsers } from 'react-icons/fa6'; 

export default async function DetailsPage({ params }: {params: { jobId: string }; }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let profile = null;
  if (user) {
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    profile = userProfile;
  }

  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', params.jobId)
    .single(); 

  const { data: company } = await supabase
    .from('companies')  
    .select('*')
    .eq('id', job.company_id)
    .single();  

  if (!company) {
    return <div>Company not found.</div>;
  } 

  if (error || !job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 my-10 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2 text-white">Job Details</h1>
      <p className="text-gray-400 mb-6">
        You are viewing the job details for the position of:
      </p>

      <div className="border border-gray-700 bg-gray-900 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-white">{job.title}</h2>
        <p className="text-gray-400 mb-4">{job.job_type}</p> 
        <h2 className="text-l font-semibold text-white">Job Description</h2>
        <p className="text-md text-gray-300">{job.description}</p>
      </div>
      <div className="border border-gray-700 bg-gray-900 p-4 rounded-lg mt-5">
        <h2 className="text-xl font-semibold text-white mb-3">Company Description</h2>
        <p className="text-md text-gray-200">{company.name} | {company.company_fields} Company</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {company.website_url && (
          <div>
            <FaGlobe className="text-sm text-gray-400 mt-1 absolute"/>
            <a className="text-sm text-gray-400 ms-5 hover:text-white" href={company.website_url}>{company.website_url}</a>
          </div>
          )}
          <div>
            <FaLocationDot className="text-sm text-gray-400 mt-1 absolute"/>
            <a className="text-sm text-gray-400 ms-5 hover:text-white" href={`https://www.google.com/maps/search/${job.location}`}>{job.location}</a>
          </div>
        </div>
        <FaUsers size={17} className="text-sm text-gray-400 mt-4 absolute"/>
        <p className="text-sm text-gray-400 mb-3 mt-4 ms-6">This company has {company.total_employees} employees in total.</p>
        <textarea className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white" disabled 
          defaultValue={company.company_description || ''} 
          rows={5} />
      </div>

      <div className="mt-8">
        { profile?.role !== 'Company' && (
          <button className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            Apply Job
          </button>)}
      </div>
    </div>
  );
}