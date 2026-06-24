import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            const secureOptions = {
              ...options,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax' as const,
              httpOnly: true,
            };
            supabaseResponse.cookies.set(name, value, secureOptions);
          });
        },
      },
    }
  );

  // refreshing the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route protection configurations
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isPortalRoute = request.nextUrl.pathname.startsWith('/portal');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth/');
  const isProtectedApiRoute = request.nextUrl.pathname.startsWith('/api/admin') || request.nextUrl.pathname.startsWith('/api/portal');

  // Handle API unauthorized access without redirecting to login page
  if (isProtectedApiRoute && !user) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  // Handle protected UI routes
  if ((isAdminRoute || isPortalRoute) && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/auth/login';
    loginUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle authenticated users visiting auth routes (e.g. /auth/login)
  // Just redirect them to portal dashboard, if they are admin, the portal or server logic can handle it
  if (isAuthRoute && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/portal/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
