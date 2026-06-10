import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin')) {
    // Exclude login page from protection
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    const adminSecret = request.cookies.get('admin_secret')?.value;

    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
