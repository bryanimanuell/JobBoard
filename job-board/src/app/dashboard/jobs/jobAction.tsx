'use client';

import type { Database } from '@/types/database';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { archieveJob, updateJobStatus } from './action';
import Link from 'next/link';

type Job = Database['public']['Tables']['jobs']['Row'];

export function JobActions({ job }: { job: Job }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-black' align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className='focus:bg-gray-100/10' asChild>
          <Link href={`/details/${job.id}`}>View Details</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='focus:bg-gray-100/10' asChild>
          <Link href={`/dashboard/jobs/${job.id}/edit`}>Edit Job</Link>
        </DropdownMenuItem>
        
        {job.status === 'ACTIVE' ? (
          <DropdownMenuItem className='focus:bg-gray-100/10' asChild>
            <form action={updateJobStatus}>
              <input type="hidden" name="jobId" value={job.id} />
              <input type="hidden" name="status" value="INACTIVE" />
              <button type="submit" className="w-full text-left">Deactivate</button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className='focus:bg-gray-100/10' asChild>
            <form action={updateJobStatus}>
              <input type="hidden" name="jobId" value={job.id} />
              <input type="hidden" name="status" value="ACTIVE" />
              <button type="submit" className="w-full text-left">Activate</button>
            </form>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem asChild className="text-red-500 focus:bg-red-500/10 focus:text-red-500">
           <form action={archieveJob}>
              <input type="hidden" name="jobId" value={job.id} />
              <button type="submit" className="w-full text-left">Archieve Job</button>
            </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}