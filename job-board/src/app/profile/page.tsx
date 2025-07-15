import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfileClientComponent from './profileClientComponent';

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // if (!profile || profile.role !== 'Personal') {
  //   redirect('/');
  // }

  const { data: cvs } = await supabase
    .from('user_cvs')
    .select('*')
    .eq('user_id', user.id);

  return <ProfileClientComponent user={user} profile={profile} savedCvs={cvs || []} />;
}