import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['tr', 'de', 'en'];
const defaultLocale = 'tr';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for API routes, static files, and special Next.js paths
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/static/') ||
        pathname.includes('.') ||
        pathname.startsWith('/isletme') ||
        pathname.startsWith('/guest') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/demo') ||
        pathname.startsWith('/system-admin') ||
        pathname.startsWith('/kitchen') ||
        pathname.startsWith('/reception') ||
        pathname.startsWith('/qr-menu') ||
        pathname.startsWith('/paneller')
    ) {
        return NextResponse.next();
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = supportedLocales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect root to locale-specific page
    if (pathname === '/') {
        // Get browser language
        const acceptLanguage = request.headers.get('accept-language');
        let locale = defaultLocale;

        if (acceptLanguage) {
            // Parse accept-language header
            const languages = acceptLanguage.split(',').map(lang => {
                const parts = lang.trim().split(';');
                return parts[0].split('-')[0].toLowerCase();
            });

            // Find first supported language
            const supportedLang = languages.find(lang => supportedLocales.includes(lang));
            if (supportedLang) {
                locale = supportedLang;
            } else if (!languages.includes('tr') && !languages.includes('de')) {
                // If neither Turkish nor German, default to English
                locale = 'en';
            }
        }

        return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
