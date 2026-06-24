'use server';

import { createClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { authService } from '../services/auth.service';
import { LoginInput, RegisterInput } from '../validators/auth.schema';

export async function login(input: LoginInput) {
  const supabase = await createClient();

  try {
    const { role } = await authService.login(supabase, input.email, input.password);
    revalidatePath('/', 'layout');
    const targetUrl = role === 'admin' ? '/admin/dashboard' : '/portal/dashboard';
    return { success: true, targetUrl };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: 'Invalid email or password. Please try again.' };
  }
}

export async function register(input: RegisterInput) {
  const supabase = await createClient();

  try {
    await authService.register(supabase, input.email, input.password, input.first_name, input.last_name);
    revalidatePath('/', 'layout');
    return { success: true, targetUrl: '/portal/dashboard' };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Registration error:', error);
    const message = error.message?.includes('already registered') 
      ? 'An account with this email already exists.' 
      : 'Failed to register. Please try again.';
    return { success: false, error: message };
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

export async function loginWithGoogle(redirectPath?: string) {
  const supabase = await createClient();
  
  // Dynamically resolve the origin from headers to preserve custom domains
  const headersList = await import('next/headers').then(m => m.headers());
  const host = headersList.get('x-forwarded-host') || headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  
  // Fallback to env var if headers are somehow missing
  const origin = host ? `${protocol}://${host}` : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
  
  const targetPath = redirectPath || '/portal/dashboard';
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(targetPath)}`;

  try {
    const data = await authService.signInWithGoogle(supabase, redirectTo);
    if (data.url) {
      return { success: true, targetUrl: data.url };
    }
    return { success: false, error: 'Failed to generate Google login URL.' };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Google login error:', error);
    return { success: false, error: 'Failed to initialize Google login. Please try again.' };
  }
}
