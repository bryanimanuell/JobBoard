'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { ApplicantDetailsModal } from './applicantDetailsModal';

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

export function ApplicationActions({ application }: { application: ApplicationWithDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-black' align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className='focus:bg-gray-100/10' onClick={() => setIsModalOpen(true)}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem disabled className='text-green-500 focus:text-green-500'>
            Accept
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="text-red-500 focus:text-red-500">
            Reject
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <ApplicantDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        application={application}
      />
    </>
  );
}