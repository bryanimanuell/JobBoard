'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { getCvUrl } from './action';

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
        </DialogContent>
        </Dialog>
    );
}