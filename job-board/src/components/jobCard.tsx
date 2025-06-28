import { Database } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';

type Job = Database['public']['Tables']['jobs']['Row'];

export default async function JobCard({ job, user}: { job: Job; user: User | null}) {
    console.log("job: ",job)
    const link = user ? `/apply/${job.id}` : `/login`;
    const formattedSalary = job.salary
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(job.salary)
    : 'Tidak ditampilkan';    
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:border-indigo-500 transition-all duration-200">
      <h2 className="text-xl font-bold text-white">{job.title}</h2>
      <p className="text-md text-gray-300 mt-1">{job.company_name}</p>
      <p className="text-sm text-gray-400 mt-2">📍 {job.location}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-gray-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {job.job_type}
        </span>
      </div>

      <div className="w-full flex justify-center mt-4 pt-4 border-t border-gray-700">
        <div className='w-full flex justify-between'>
            <p className="text-lg font-semibold text-green-400">{formattedSalary}</p>
            <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <Link
                    href={link}
                    className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                    >
                    Apply
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}