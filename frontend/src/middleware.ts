import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en', 'de'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
    // URL'den locale kontrolü
    const pathname = request.nextUrl.pathname;
    const pathnameLocale = locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameLocale) return pathnameLocale;

    // Accept-Language header'dan locale al
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
        // İlk tercih edilen dili al
        const preferredLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();

        // Türkçe için
        if (preferredLang === 'tr') return 'tr';
        // Almanca için
        if (preferredLang === 'de') return 'de';
    }

    // Varsayılan İngilizce
    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // API, static files ve özel rotaları atla
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.startsWith('/sw.js') ||
        pathname.startsWith('/workbox') ||
        pathname.includes('.') ||
        pathname.startsWith('/guest') ||
        pathname.startsWith('/isletme') ||
        pathname.startsWith('/demo_') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/kitchen') ||
        pathname.startsWith('/reception') ||
        pathname.startsWith('/system-admin') ||
        pathname.startsWith('/qr-menu') ||
        pathname.startsWith('/paneller') ||
        pathname.startsWith('/bilgi')
    ) {
        return NextResponse.next();
    }

    // Zaten locale ile başlıyorsa devam et
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Root path için locale yönlendirmesi
    if (pathname === '/') {
        const locale = getLocale(request);
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
