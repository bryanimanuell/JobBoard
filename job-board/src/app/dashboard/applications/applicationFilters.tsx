'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Job = {
  id: string;
  title: string | null;
}

export function ApplicationFilters({ jobs }: { jobs: Job[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Filter by Status */}
      <Select
        defaultValue={searchParams.get('status') || 'all'}
        onValueChange={(value) => handleFilterChange('status', value)}
      >
        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent className='bg-black'>
          <SelectItem className='focus:bg-gray-100/10' value="all">All Statuses</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="Under Review">Under Review</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="Invited for Interview">Invited for Interview</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="Rejected">Rejected</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="Accepted">Accepted</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter by Job Title (Dinamis) */}
      <Select
        defaultValue={searchParams.get('job_title') || 'all'}
        onValueChange={(value) => handleFilterChange('job_title', value)}
      >
        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
          <SelectValue placeholder="Filter by job" />
        </SelectTrigger>
        <SelectContent className='bg-black'>
          <SelectItem className='focus:bg-gray-100/10' value="all">All Jobs</SelectItem>
          {jobs.map((job) => (
            <SelectItem key={job.id} value={job.title || ''} className='focus:bg-gray-100/10'>
              {job.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort By */}
      <Select
         defaultValue={searchParams.get('sort') || 'newest'}
        onValueChange={(value) => handleFilterChange('sort', value)}
      >
        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className='bg-black'>
          <SelectItem className='focus:bg-gray-100/10' value="newest">Newest First</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="oldest">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}