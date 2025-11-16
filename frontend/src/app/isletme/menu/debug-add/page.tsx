"use client";

import { useState, useEffect } from 'react';
import { translateText } from '@/lib/translateService';

interface TranslationResult {
  lang: string;
  name: string;
  description: string;
  success: boolean;
  error?: string;
}

export default function MenuAddDebugPage() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [translations, setTranslations] = useState<TranslationResult[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<any>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Settings'ten desteklenen dilleri al
  useEffect(() => {
    const loadSupportedLanguages = () => {
      try {
        const savedSettings = localStorage.getItem('hotel-settings');
        if (savedSettings) {
          const settingsData = JSON.parse(savedSettings);
          if (settingsData.language?.supportedLanguages && Array.isArray(settingsData.language.supportedLanguages)) {
            // Türkçe'yi de dahil et
            setSelectedLanguages(settingsData.language.supportedLanguages);
          } else {
            // Varsayılan diller
            setSelectedLanguages(['tr', 'en', 'de', 'fr']);
          }
        } else {
          // Varsayılan diller
          setSelectedLanguages(['tr', 'en', 'de', 'fr']);
        }
      } catch (error) {
        console.error('Settings yüklenirken hata:', error);
        setSelectedLanguages(['tr', 'en', 'de', 'fr']);
      }
    };

    loadSupportedLanguages();
  }, []);

  // Çeviri yap
  const handleTranslate = async () => {
    if (!productName.trim() || !productDescription.trim()) {
      alert('Lütfen ürün adı ve açıklaması girin!');
      return;
    }

    setIsTranslating(true);
    setTranslations([]);
    setSaveResult(null);
    setSaveError(null);

    const results: TranslationResult[] = [];

    // Türkçe'yi ekle (orijinal)
    results.push({
      lang: 'tr',
      name: productName,
      description: productDescription,
      success: true
    });

    // Her dil için çeviri yap
    for (const lang of selectedLanguages) {
      if (lang === 'tr') continue;

      try {
        const translatedName = await translateText(productName, lang);
        const translatedDesc = await translateText(productDescription, lang);

        results.push({
          lang: lang,
          name: translatedName,
          description: translatedDesc,
          success: translatedName !== productName && translatedName.trim() !== ''
        });
      } catch (error: any) {
        results.push({
          lang: lang,
          name: productName,
          description: productDescription,
          success: false,
          error: error?.message || 'Çeviri hatası'
        });
      }
    }

    setTranslations(results);
    setIsTranslating(false);
  };

  // Backend'e kaydet
  const handleSave = async () => {
    if (!productName.trim() || !productDescription.trim()) {
      alert('Lütfen ürün adı ve açıklaması girin!');
      return;
    }

    setIsSaving(true);
    setSaveResult(null);
    setSaveError(null);

    try {
      // Translations objesi oluştur
      const translationsObj: { [lang: string]: { name: string; description: string } } = {};
      
      // Türkçe'yi ekle
      translationsObj['tr'] = {
        name: productName,
        description: productDescription
      };

      // Çevirileri ekle
      for (const result of translations) {
        if (result.lang !== 'tr' && result.success) {
          translationsObj[result.lang] = {
            name: result.name,
            description: result.description
          };
        }
      }

      // Eğer çeviri yapılmadıysa, şimdi yap
      if (translations.length === 0) {
        for (const lang of selectedLanguages) {
          if (lang === 'tr') continue;
          try {
            const translatedName = await translateText(productName, lang);
            const translatedDesc = await translateText(productDescription, lang);
            
            if (translatedName && translatedName !== productName && translatedName.trim() !== '') {
              translationsObj[lang] = {
                name: translatedName,
                description: translatedDesc || productDescription
              };
            }
          } catch (error) {
            // Çeviri başarısız, devam et
          }
        }
      }

      // Tenant slug'ını al
      const getTenantSlug = (): string => {
        if (typeof window === 'undefined') return 'demo';
        const hostname = window.location.hostname;
        const subdomain = hostname.split('.')[0];
        if (subdomain && subdomain !== 'www' && subdomain !== 'roomxqr' && subdomain !== 'roomxqr-backend') {
          return subdomain;
        }
        return 'demo';
      };

      const tenantSlug = getTenantSlug();
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-tenant': tenantSlug,
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // API item oluştur
      const apiItem = {
        name: productName,
        description: productDescription,
        price: 0,
        category: 'Test',
        image: '',
        allergens: [],
        calories: null,
        preparationTime: 15,
        rating: 4,
        isAvailable: true,
        translations: translationsObj,
      };

      console.log('Kaydedilecek item:', apiItem);
      console.log('Translations:', translationsObj);

      const response = await fetch('/api/menu/save', {
        method: 'POST',
        headers,
        body: JSON.stringify({ items: [apiItem] }),
      });

      const responseData = await response.json();
      console.log('Backend response:', responseData);
      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);

      if (!response.ok) {
        throw new Error(responseData.error || 'Kaydetme hatası');
      }

      // Backend'den dönen item'ı kontrol et
      const savedItem = responseData.items?.[0] || responseData.item || responseData.menuItems?.[0] || null;
      console.log('Saved item from backend:', savedItem);

      setSaveResult({
        success: true,
        response: responseData,
        savedItem: savedItem,
        translations: translationsObj,
        backendResponse: {
          status: response.status,
          ok: response.ok,
          data: responseData
        }
      });
    } catch (error: any) {
      console.error('Kaydetme hatası:', error);
      setSaveError(error?.message || 'Bilinmeyen hata');
    } finally {
      setIsSaving(false);
    }
  };

  const languageNames: { [key: string]: string } = {
    'tr': 'Türkçe',
    'en': 'English',
    'de': 'Deutsch',
    'fr': 'Français',
    'es': 'Español',
    'it': 'Italiano',
    'ru': 'Русский',
    'ar': 'العربية',
    'zh': '中文'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🧪 Ürün Ekleme Debug Sayfası</h1>
          <p className="text-gray-600 mb-6">
            Bu sayfa ürün ekleme ve çeviri işlemini test etmek için kullanılır.
          </p>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ürün Adı *
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Örn: Baklava"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ürün Açıklaması *
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Örn: Fıstıklı, şerbetli tatlı"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seçili Diller ({selectedLanguages.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedLanguages.map(lang => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                  >
                    {languageNames[lang] || lang} ({lang})
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Dilleri değiştirmek için /isletme/settings sayfasından "Dil Ayarları" bölümünü kullanın.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleTranslate}
                disabled={isTranslating || !productName.trim() || !productDescription.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTranslating ? 'Çeviriliyor...' : '🔄 Çevirileri Yap'}
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !productName.trim() || !productDescription.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Kaydediliyor...' : '💾 Backend\'e Kaydet'}
              </button>
            </div>
          </div>

          {/* Çeviri Sonuçları */}
          {translations.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📝 Çeviri Sonuçları</h2>
              <div className="space-y-3">
                {translations.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      result.success
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {languageNames[result.lang] || result.lang} ({result.lang})
                      </h3>
                      {result.success ? (
                        <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">✅ Başarılı</span>
                      ) : (
                        <span className="px-2 py-1 bg-red-500 text-white rounded text-xs">❌ Başarısız</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">İsim:</span> {result.name}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Açıklama:</span> {result.description}
                      </p>
                      {result.error && (
                        <p className="text-xs text-red-600">Hata: {result.error}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kaydetme Sonucu */}
          {saveResult && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">✅ Kaydetme Sonucu</h2>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-medium mb-2">Ürün başarıyla kaydedildi!</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Ürün ID:</span> {saveResult.savedItem?.id || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Ürün Adı:</span> {saveResult.savedItem?.name || productName}
                  </p>
                  <p className="text-xs text-gray-600 mt-3">
                    💡 Şimdi <a href="/isletme/menu" target="_blank" className="text-blue-600 underline">menü sayfasına</a> gidip ürünün göründüğünü kontrol edin. 
                    Eğer görünmüyorsa, sayfayı yenileyin (F5).
                  </p>
                  <details className="mt-2">
                    <summary className="cursor-pointer font-medium text-gray-700">Backend Response</summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-60">
                      {JSON.stringify(saveResult.response, null, 2)}
                    </pre>
                  </details>
                  <details className="mt-2">
                    <summary className="cursor-pointer font-medium text-gray-700">Kaydedilen Translations</summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-60">
                      {JSON.stringify(saveResult.translations, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* Hata Mesajı */}
          {saveError && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">❌ Kaydetme Hatası</h2>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">{saveError}</p>
              </div>
            </div>
          )}

          {/* Bilgi */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Bilgi</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Ürün adı ve açıklaması girip "Çevirileri Yap" butonuna tıklayın</li>
              <li>Çeviriler başarılı olduktan sonra "Backend'e Kaydet" butonuna tıklayın</li>
              <li>Kaydedilen ürün /isletme/menu sayfasında görünecektir</li>
              <li>Sayfa yenilendiğinde ürünün kaybolup kaybolmadığını kontrol edin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

