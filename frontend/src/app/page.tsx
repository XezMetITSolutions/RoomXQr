'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        const supportedLocales = ['tr', 'de', 'en'];

        let targetLocale = 'en'; // Default fallback for unsupported languages

        if (supportedLocales.includes(browserLang)) {
            targetLocale = browserLang;
        }

        router.replace(`/${targetLocale}`);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
}
