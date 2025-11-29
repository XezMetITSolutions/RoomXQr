'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Middleware will handle the redirect, but this is a fallback
    const browserLang = navigator.language.split('-')[0].toLowerCase();

    if (browserLang === 'tr') {
      router.push('/tr');
    } else if (browserLang === 'de') {
      router.push('/de');
    } else {
      router.push('/en');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
