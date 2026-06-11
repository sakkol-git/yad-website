'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authService } from '../services/auth.service';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();
  let targetUrl: string | undefined;

  try {
    const { role } = await authService.login(supabase, email, password);
    revalidatePath('/', 'layout');
    targetUrl = role === 'admin' ? '/admin/dashboard' : '/portal/dashboard';
  } catch (error: any) {
    return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  if (targetUrl) {
    redirect(targetUrl);
  }
}

export async function register(formData: FormData) {
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();
  let success = false;

  try {
    await authService.register(supabase, email, password, firstName, lastName);
    revalidatePath('/', 'layout');
    success = true;
  } catch (error: any) {
    return redirect(`/auth/register?error=${encodeURIComponent(error.message)}`);
  }

  if (success) {
    redirect('/portal/dashboard');
  }
}

export async function logout() {
  const supabase = await createClient();
  try {
    await authService.logout(supabase);
  } catch (error) {
    console.error('Logout error:', error);
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function loginWithGoogle() {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const redirectTo = `${origin}/auth/callback?next=/portal/dashboard`;

  let targetUrl: string | undefined;

  try {
    const data = await authService.signInWithGoogle(supabase, redirectTo);
    if (data.url) {
      targetUrl = data.url;
    }
  } catch (error: any) {
    return redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  if (targetUrl) {
    redirect(targetUrl);
  }
}
