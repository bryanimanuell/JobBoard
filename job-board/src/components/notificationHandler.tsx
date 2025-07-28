'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NotificationHandler() { 
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');
    
    switch(error){
        case 'unverified_company':
          toast.error('Your company profile is not verified. Please wait for us to complete your company verification.');
          break;
        case 'company_not_found':
          toast.error('Company profile not found for this user.');
          break;
        case 'unauthenticated':
          toast.error('You are not authenticated.');
          break;
        case 'post_job_error':
          toast.error('Error posting job: '+message+' Please try again later.');
          break;
    }

    // const success = searchParams.get('success');
    // if (success === 'profile_updated') {
    //   toast.success('Profile updated successfully!');
    // }

  }, [searchParams]); 
  
  return null;
}