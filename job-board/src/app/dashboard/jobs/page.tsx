import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { JobActions } from './jobAction'; 

export default async function DashboardJobsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: company } = await supabase
    .from('companies')
    .select('id')
    .eq('owned_by', user.id)
    .single();

  if (!company) {
    return <p>Company profile not found.</p>;
  }

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('company_id', company.id)
    .order('created_at', { ascending: false });

  return (
    <div className="w-full mx-auto p-4 sm:p-8 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Jobs</h1>
          <p className="text-gray-400">
            Here are all the jobs you've posted for your company.
          </p>
        </div>
        <Link href="/post-job" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm">
          + Post New Job
        </Link>
      </div>
      
      <div className="border border-gray-700 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-800 border-gray-700">
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Job Type</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs && jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gray-800 border-gray-700">
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.job_type}</TableCell>
                  <TableCell>
                    <Badge variant={job.status === 'ACTIVE' ? 'default' : 'destructive'}>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <JobActions job={job} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">
                  You haven't posted any jobs yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}