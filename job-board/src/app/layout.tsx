import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import LogoutButton from '@/components/logoutButton';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Job Board App',
  description: 'Find your next job here!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <Link href="/">Home</Link>
            <div>
              {user ? (
                <div className="flex items-center gap-4">
                  Hey, {user.email}
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
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}