'use client';

import { useState, useTransition } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { getCvUrl, updateStatusAndNotify } from './action';
import toast from 'react-hot-toast';

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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: ApplicationWithDetails; 
}
type BadgeVariant = "destructive" | "success" | "warning" | "interview";

export function ApplicantDetailsModal({ isOpen, onClose, application }: ModalProps) {
    const [selectedStatus, setSelectedStatus] = useState(application.status || '');
    const [isPending, startTransition] = useTransition();
    const statusVariantMap: { [key: string]: BadgeVariant } = {
        'Under Review': 'warning',
        'Invited for Interview': 'interview',
        'Accepted': 'success',
        'Rejected': 'destructive',
    };
    const badgeVariant = statusVariantMap[application.status || ''] || 'warning';

    const handleViewCv = async () => {
        const url = await getCvUrl(application.submitted_cv_path);
        if (url) {
        window.open(url, '_blank');
        } else {
        alert('Could not retrieve CV URL.');
        }
    };

    const handleUpdateStatus = () => {
        if (selectedStatus === application.status) {
        toast.error("You haven't changed the status.");
        return;
        }
    
        startTransition(async () => {
        const result = await updateStatusAndNotify(application.id, selectedStatus);
        if (result.success) {
            toast.success(result.message);
            onClose();
        } else {
            toast.error(result.message);
        }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[625px] bg-gray-800 border-gray-700 text-white flex flex-col max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Applicant Details</DialogTitle>
                    <DialogDescription>
                        {application.job_title || 'Job Title'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{application.applicant_name}</h3>
                        <Badge variant={badgeVariant}>
                            {application.status}
                        </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                        <p className="text-gray-400">Email</p>
                        <p>{application.applicant_email}</p>
                        </div>
                        <div>
                        <p className="text-gray-400">Phone</p>
                        <p>{application.applicant_phone || 'Not provided'}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {application.applicant_linkedin && (
                        <a href={application.applicant_linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline">
                            <FaLinkedin /> LinkedIn
                        </a>
                        )}
                        {application.applicant_github && (
                        <a href={application.applicant_github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline">
                            <FaGithub /> GitHub
                        </a>
                        )}
                    </div>
                    
                    <div className="border-t border-gray-700 pt-4 space-y-4">
                        <div>
                            <p className="text-gray-400">Submitted CV</p>
                            <button onClick={handleViewCv} className="text-indigo-400 hover:underline">
                                View CV
                            </button>
                        </div>
                        <div>
                            <p className="text-gray-400">Years of Experience</p>
                            <p>{application.years_of_experience ?? 'Not provided'}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Relatives at Company</p>
                            <p>{application.relatives || 'None'}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Cover Letter</p>
                            <p className="whitespace-pre-wrap bg-gray-900 p-3 rounded-md">{application.cover_letter || 'Not provided'}</p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="pt-4 border-t border-gray-700">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex-1">
                        <Select defaultValue={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-[220px] bg-gray-700 border-gray-600">
                                <SelectValue placeholder="Change status..." />
                            </SelectTrigger>
                            <SelectContent className='bg-gray-900 border-gray-600'>
                                <SelectItem className='focus:bg-gray-100/10' value="Under Review">Under Review</SelectItem>
                                <SelectItem className='focus:bg-gray-100/10' value="Invited for Interview">Invited for Interview</SelectItem>
                                <SelectItem className='focus:bg-gray-100/10' value="Accepted">Accepted</SelectItem>
                                <SelectItem className='focus:bg-gray-100/10' value="Rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <Button onClick={handleUpdateStatus} disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700">
                        {isPending ? 'Updating...' : 'Update Status & Notify'}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}