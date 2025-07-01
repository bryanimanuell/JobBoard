import { createClient } from '@/lib/supabase/server'
import JobCard from '@/components/jobCard'; 

export const dynamic = 'force-dynamic'; 

export default async function Home() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
  .from('jobs').select('*')
  .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Find Your Next Opportunity
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!jobs || jobs.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            Belum ada lowongan yang tersedia saat ini.
          </p>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} user={user} />
          ))
        )}
      </div>
    </main>
  );
}