import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';
import { postJobAction } from './action';

export default async function PostJobPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id, name, is_verified')
    .eq('owned_by', user.id)
    .single();

  if (companyError || !company) {
    redirect('/company/create');
  }

  if (!company.is_verified) {
    redirect('/?error=unverified_company');
  }

  return (
    <div className="max-w-2xl mx-auto p-8 my-10 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-white">Post a New Job</h1>
      <form action={postJobAction} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Job Title</label>
          <input type="text" name="title" id="title" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-gray-300">Company Name</label>
          <input value={company.name} disabled type="text" name="company_name" id="company_name" className="mt-1 text-muted block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-300">City</label>
          <input type="text" name="city" id="city" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
          <input type="text" name="address" id="address" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">Job Description</label>
          <textarea name="description" id="description" rows={4} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div>
          <label htmlFor="job_type" className="block text-sm font-medium text-gray-300">Job Type</label>
          <select name="job_type" id="job_type" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Freelance</option>
            <option>Internship</option>
          </select>
        </div>
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-300">Salary (optional)</label>
          <input type="number" name="salary" id="salary" placeholder="e.g., 10000000" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
}