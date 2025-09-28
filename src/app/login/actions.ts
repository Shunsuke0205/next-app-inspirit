'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword(data)

  if (authError) {
    redirect('/error')
  }

  const { error: updateError } = await supabase
    .from('student_profiles_private')
    .update({
      last_login_at: new Date().toISOString()
    })
    .eq('user_id', authData.user.id)

  if (updateError) {
    console.error("Failed to update last_login_at:", updateError);
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: 'https://inspirit-for-student.vercel.app',
      data: { role: 'student'}
    }
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/signup/guide')
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }
  console.log("Successfully logged out");

  revalidatePath('/login', 'layout');
  redirect('/login');
}

