'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function JobFilters() {
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
          <SelectItem className='focus:bg-gray-100/10' value="ACTIVE">Active</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="INACTIVE">Inactive</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="ARCHIEVED">Archieved</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter by Job Type */}
      <Select
        defaultValue={searchParams.get('job_type') || 'all'}
        onValueChange={(value) => handleFilterChange('job_type', value)}
      >
        <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
          <SelectValue placeholder="Filter by job type" />
        </SelectTrigger>
        <SelectContent className='bg-black'>
          <SelectItem className='focus:bg-gray-100/10' value="all">All Job Types</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="Full-time">Full-time</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="Part-time">Part-time</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="Freelance">Freelance</SelectItem>
          <SelectItem className='focus:bg-gray-100/10' value="Internship">Internship</SelectItem>
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