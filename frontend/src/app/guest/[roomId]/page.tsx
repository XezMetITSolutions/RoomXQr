"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GuestInterfaceRedirect({ params }: { params: { roomId: string } }) {
  const router = useRouter();

  useEffect(() => {
    // Browser language detection
    let browserLang = 'en';

    if (typeof navigator !== 'undefined') {
      if (navigator.languages && navigator.languages.length > 0) {
        // Find the first supported language
        const supportedLangs = ['tr', 'en', 'de'];
        const foundLang = navigator.languages.find(lang => {
          const code = lang.split('-')[0];
          return supportedLangs.includes(code);
        });

        if (foundLang) {
          browserLang = foundLang.split('-')[0];
        }
      } else if (navigator.language) {
        browserLang = navigator.language.split('-')[0];
      }
    }

    const supportedLangs = ['tr', 'en', 'de'];
    const targetLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

    // Redirect to localized guest page
    router.replace(`/${targetLang}/guest/${params.roomId}`);
  }, [params.roomId, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
