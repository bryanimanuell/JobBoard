'use client';

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut(); 
    router.refresh(); 
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-2 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-md"
    > Log Out </button>
  );
}