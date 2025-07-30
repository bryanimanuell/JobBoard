'use client'
import { Database } from '@/types/database';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Job = Database['public']['Tables']['jobs']['Row'];
type Profile = Pick<Database['public']['Tables']['profiles']['Row'], 'role'>;

export default function JobCard({ job, user, profile}: { job: Job; user: User | null; profile: Profile | null; }) {
  const router = useRouter();
  const link = user ? `/details/${job.id}`: `/login`;
  const formattedSalary = job.salary
  ? new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(job.salary)
  : 'Not specified';


  return (
    <div onClick={() => router.push(link)} className="cursor-pointer bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:border-indigo-500 transition-all duration-200">
      <h2 className="text-xl font-bold text-white">{job.title}</h2>
      <p className="text-md text-gray-300 mt-1">{job.company_name}</p>
      <p className="text-sm text-gray-400 mt-2">📍 {job.address}</p>

      <div className="flex flex-wrap gap-1 mt-4">
        <span className="bg-gray-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {job.job_type}
        </span>
        <span className="bg-gray-700 text-gray-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
          {job.experience_level}
        </span>
      </div>

      <div className="w-full flex justify-center mt-4 pt-4 border-t border-gray-700">
        <div className='w-full flex justify-between'>
          <p className="text-lg font-semibold text-green-400">{formattedSalary}</p>
          {profile?.role !== 'Company'? (
          <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <Link
              href={link}
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Apply
            </Link>
          </div>) : null}
        </div>
      </div>
    </div>
  );
}