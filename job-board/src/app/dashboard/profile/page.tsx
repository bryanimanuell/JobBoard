import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import CompanyProfileForm from './company-profile-form'; // Komponen form kita

export default async function CompanyProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: companyProfile, error } = await supabase
    .from('companies')
    .select('*')
    .eq('owned_by', user.id)
    .single();

  if (error || !companyProfile) {
    redirect('/company/create');
  }

  return (
    <div className="w-full mx-auto p-4 sm:p-8 space-y-4">
      <header>
        <h1 className="text-2xl font-bold text-white">Company Profile</h1>
        <p className="text-gray-400">
          Update your company&apos;s information here.
        </p>
      </header>
      <div className="p-8 my-10 bg-gray-800 rounded-lg shadow-md">
        <CompanyProfileForm company={companyProfile} />
      </div>
    </div>
  );
}