'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NotificationHandler() { 
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    
    switch(error){
        case 'unverified_company':
            toast.error('Your company profile is not verified. Please wait for us to complete your company verification.');
            break;
    }

    // const success = searchParams.get('success');
    // if (success === 'profile_updated') {
    //   toast.success('Profile updated successfully!');
    // }

  }, [searchParams]); 
  
  return null;
}