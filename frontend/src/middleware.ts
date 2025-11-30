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
            try {
                // Parse accept-language header
                // Example: "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
                const languages = acceptLanguage.split(',')
                    .map(lang => {
                        const [tag, quality] = lang.split(';');
                        return {
                            tag: tag.trim().split('-')[0].toLowerCase(),
                            quality: quality ? parseFloat(quality.split('=')[1]) : 1.0
                        };
                    })
                    .sort((a, b) => b.quality - a.quality)
                    .map(l => l.tag);

                // Find first supported language
                const supportedLang = languages.find(lang => supportedLocales.includes(lang));

                if (supportedLang) {
                    locale = supportedLang;
                } else {
                    // If user's preferred language is not supported, default to English
                    // unless it's specifically Turkish or German (which are supported and would be caught above)
                    // This fallback is for languages like French, Spanish, etc.
                    locale = 'en';
                }
            } catch (e) {
                console.error('Error parsing accept-language:', e);
                // Fallback to default locale (tr)
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
