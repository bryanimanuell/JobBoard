'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import LogoutButton from './logoutButton';
import { FaUserCircle } from 'react-icons/fa';

type Profile = Database['public']['Tables']['profiles']['Row'] | null;

export default function ProfileDropdown({ user, profile }: { user: User; profile: Profile }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-indigo-500 focus:outline-none focus:border-indigo-500 transition">
        {avatarUrl ? (
          <img src={avatarUrl} className="w-full h-full object-cover" />
        ) : (
          <FaUserCircle className="w-full h-full text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm text-white font-semibold truncate">{profile?.full_name || user.email}</p>
          </div>
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
            Profile
          </Link>
          <div className="px-2 py-1">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}