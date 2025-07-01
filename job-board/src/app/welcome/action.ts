'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function completeProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const fullName = formData.get('fullName') as string;
  const role = formData.get('role') as string;
  console.log("WOI : ",fullName, role, user.id);
  if (!fullName || !role) {
    throw new Error('Full name and role are required.');
  }

  if (role !== 'Company' && role !== 'Personal') {
    throw new Error('Invalid role selected.');
  }

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    full_name: fullName,
    role: role,
  });

  if (error) {
    console.error('Error upserting profile:', error);
    return;
  }

  revalidatePath('/', 'layout')
  redirect('/');
}