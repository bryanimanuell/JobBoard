import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ApplicationActions } from './applicationActions'; 
import { ApplicationFilters } from './applicationFilters';

type ApplicationWithDetails = {
  id: string;
  status: string | null;
  applied_at: string;
  job_title: string | null;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
  applicant_linkedin: string | null;
  applicant_github: string | null;
  relatives: string | null;
  years_of_experience: number | null;
  cover_letter: string | null;
  submitted_cv_path: string;
};

type DashboardApplicationsPageProps = {
  searchParams: Promise<{
    status?: string;
    job_title?: string;
    sort?: string;
  }>;
};

export default async function DashboardApplicantsPage(props: DashboardApplicationsPageProps) {
    const supabase = await createClient();
    const searchParams = await props.searchParams;
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

    const { data: jobsForFilter } = await supabase
      .from('jobs')
      .select('id, title')
      .eq('company_id', company.id);

    const { data: applications, error } = await supabase
        .rpc('get_applications_for_company', {
        company_uuid: company.id,
        filter_status: searchParams.status === 'all' ? null : searchParams.status,
        filter_job_title: searchParams.job_title === 'all' ? null : searchParams.job_title,
        })
        .select('*')
        .order('applied_at', { ascending: searchParams.sort === 'oldest' });

    if (error) {
        console.error("Error fetching applications:", error);
        return <p>Could not fetch applications.</p>;
    }

    return (
        <div className="w-full mx-auto p-4 sm:p-8 space-y-4">
        <header>
            <h1 className="text-2xl font-bold text-white">Manage Applicants</h1>
            <p className="text-gray-400">
            Review and manage applications for your job postings.
            </p>
        </header>
        <div className="flex justify-start">
            <ApplicationFilters jobs={jobsForFilter || []}/>
        </div>
        <div className="border border-gray-700 rounded-lg">
            <Table>
            <TableHeader>
                <TableRow className="hover:bg-gray-800 border-gray-700">
                <TableHead className="text-white">Applicant Name</TableHead>
                <TableHead className="text-white">Applied for</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Applied At</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications && applications.length > 0 ? (
                (applications as ApplicationWithDetails[]).map((app) => (
                    <TableRow key={app.id} className="hover:bg-gray-800 border-gray-700">
                    <TableCell className="font-medium">{app.applicant_name || 'N/A'}</TableCell>
                    <TableCell>{app.job_title || 'N/A'}</TableCell>
                    <TableCell>
                        <Badge>{app.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(app.applied_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                        <ApplicationActions application={app as ApplicationWithDetails} />
                    </TableCell>
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-400 h-24">
                    No applications received yet.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        </div>
    );
}