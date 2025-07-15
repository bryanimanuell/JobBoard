'use client';

import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import ProfileDropdown from './profileDropdown';

type Profile = Database['public']['Tables']['profiles']['Row'] | null;

export default function DynamicNav({ user, profile }: { user: User | null; profile: Profile}) {
  console.log(profile);
  return (
    <>
      { profile?.role === "Company" ? (
        <div className="flex items-center gap-4">
          <Link
            href="/post-job"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Post Job
          </Link>
          <Link
            href="/dashboard"
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Dashboard
          </Link>
        </div>
      ) : null}
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