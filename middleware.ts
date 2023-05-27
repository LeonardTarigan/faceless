import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        if (request.cookies.get('user') === undefined) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}
