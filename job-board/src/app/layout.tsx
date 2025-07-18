import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react'; 
import NotificationHandler from '@/components/notificationHandler';
import { Toaster } from 'react-hot-toast';

import DynamicNav from '@/components/dynamicNav';
import { createClient } from '@/lib/supabase/server';

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { 
    data: profile 
  } = user ? await supabase.from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() : { data: null };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <DynamicNav user={user} profile={profile} />
                </div>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <Suspense>
          <NotificationHandler />
        </Suspense>
      </body>
    </html>
  );
}