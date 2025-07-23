import { createClient } from '@/lib/supabase/server'
import JobCard from '@/components/jobCard'; 
import SearchInput from '@/components/searchInput';

export const dynamic = 'force-dynamic'; 

export default async function Home({ 
  searchParams, 
} : { 
  searchParams: { q?: string }; 
}) {
  const supabase = await createClient();
  const searchQuery = searchParams?.q || '';

  let query = supabase.from('jobs').select('*');

  if(searchQuery) {
    const searchPattern = `%${searchQuery}%`;
    query = query.or(
      `title.ilike.${searchPattern},company_name.ilike.${searchPattern},city.ilike.${searchPattern}`
    );
  }
  query = query.order('created_at', { ascending: false });

  const { data: jobs, error } = await query;

  if (error) {
    console.error('Error fetching jobs:', error);
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { 
    data: profile 
  } = user ? await supabase.from('profiles').select('role')
  .eq('id', user.id).single() : { data: null };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-white">
        Find Your Next Opportunity
      </h1>
      <p className="text-center text-gray-400 mb-8">
        The best place to find your dream job in the tech industry.
      </p>
      <SearchInput />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!jobs || jobs.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            Belum ada lowongan yang tersedia saat ini.
          </p>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} user={user} profile={profile}/>
          ))
        )}
      </div>
    </main>
  );
}