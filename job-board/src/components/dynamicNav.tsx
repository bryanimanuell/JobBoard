'use client';

import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import ProfileDropdown from './profileDropdown';

type Profile = Database['public']['Tables']['profiles']['Row'] | null;

export default function DynamicNav({ user, profile }: { user: User | null; profile: Profile}) { 
  return (
    <>
      <Link href="/">Home</Link>
      { profile?.role === "Company" && (
        <>
          <Link
            href="/post-job"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Post Job
          </Link>
          <Link
            href="/dashboard/profile"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Dashboard
          </Link>
        </>
      )}
      {user ? (
        <div className="flex items-center gap-4">
          <ProfileDropdown user={user} profile={profile} />
        </div>
      ) : (
        <Link
          href="/login"
          className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
        >
          Login
        </Link>
      )}
    </>
  );
}