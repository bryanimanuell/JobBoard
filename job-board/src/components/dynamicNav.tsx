// src/components/DynamicNav.tsx (Versi Final)
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import LogoutButton from './logoutButton';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function DynamicNav() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setProfile(data);
      } else {
        setProfile(null);
      }
    });

    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        setProfile(data);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

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
          Hey, {profile?.full_name || user.email}
          <LogoutButton />
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