import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/' || 
    path === '/whitepaper' || 
    path === '/architecture' ||
    path === '/logs' || 
    path === '/about' ||
    path.startsWith('/auth') || 
    path.startsWith('/api/auth');
    
  // Define premium paths that require subscription
  const isPremiumPath = 
    path === '/reflect' || 
    path.startsWith('/reflect/');
    
  // Define admin paths
  const isAdminPath = 
    path === '/admin' || 
    path.startsWith('/admin/');

  // Get the token from the request
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Redirect logic
  if (!isPublicPath && !token) {
    // If not logged in and trying to access protected route, redirect to login
    const url = new URL('/auth/signin', request.url);
    url.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(url);
  }

  // Handle premium paths
  if (isPremiumPath) {
    // Check if user has subscription
    // In a real implementation, you'd verify the user's subscription status
    // For now, we'll use a placeholder check
    const hasSubscription = (token as any)?.hasSubscription === true;
    
    if (!hasSubscription) {
      // Redirect to subscription page
      return NextResponse.redirect(new URL('/subscribe', request.url));
    }
  }

  // Handle admin paths
  if (isAdminPath) {
    const isAdmin = (token as any)?.isAdmin === true;
    
    if (!isAdmin) {
      // Redirect unauthorized users
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    '/memory/:path*',
    '/reflect/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/api/memory/:path*',
    '/api/reflect/:path*',
    // Public routes that need token check for conditional display
    '/reflect',
    '/memory',
    '/admin',
    '/profile',
    // Explicitly exclude the following paths from the middleware
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};