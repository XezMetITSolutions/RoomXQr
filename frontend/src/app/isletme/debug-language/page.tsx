"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Client-side only component
function DebugLanguageContent() {
  const [localStorageData, setLocalStorageData] = useState<any>(null);
  const [languageStore, setLanguageStore] = useState<any>(null);
  const [menuTranslatorSupported, setMenuTranslatorSupported] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Language store'dan bilgileri al (null kontrolü ile)
  let languageStoreState: any = null;
  try {
    languageStoreState = useLanguageStore();
  } catch (error) {
    console.warn('Language store henüz hazır değil:', error);
  }

  useEffect(() => {
    // Client-side only
    if (typeof window === 'undefined') return;
    
    // Language store hazır olana kadar bekle
    if (!languageStoreState) {
      const timeout = setTimeout(() => {
        setRefreshKey(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
    
    loadData();
    
    // Her 2 saniyede bir güncelle
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, [refreshKey, languageStoreState]);

  const loadData = () => {
    // LocalStorage'dan settings'i oku
    try {
      const savedSettings = localStorage.getItem('hotel-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setLocalStorageData(parsed);
      } else {
        setLocalStorageData(null);
      }
    } catch (error) {
      console.error('LocalStorage okuma hatası:', error);
      setLocalStorageData({ error: String(error) });
    }

    // Language store'dan bilgileri al
    try {
      if (!languageStoreState) {
        setLanguageStore({ error: 'Language store henüz hazır değil' });
        return;
      }
      
      const currentLanguage = languageStoreState.currentLanguage;
      const getCurrentLanguage = languageStoreState.getCurrentLanguage?.();
      const getSupportedLanguages = languageStoreState.getSupportedLanguages?.();
      
      if (!getSupportedLanguages || !Array.isArray(getSupportedLanguages)) {
        setLanguageStore({ error: 'getSupportedLanguages fonksiyonu çalışmıyor' });
        return;
      }
      
      setLanguageStore({
        currentLanguage,
        getCurrentLanguage,
        getSupportedLanguages,
        supportedLanguagesCount: getSupportedLanguages.length
      });
    } catch (error) {
      console.error('Language store okuma hatası:', error);
      setLanguageStore({ error: String(error) });
    }

    // MenuTranslator'ın kullandığı fonksiyonu simüle et
    try {
      const savedSettings = localStorage.getItem('hotel-settings');
      if (savedSettings) {
        const settingsData = JSON.parse(savedSettings);
        if (settingsData.language?.supportedLanguages && Array.isArray(settingsData.language.supportedLanguages)) {
          const supported = settingsData.language.supportedLanguages
            .filter((lang: string) => lang !== 'tr');
          setMenuTranslatorSupported(supported);
        } else {
          setMenuTranslatorSupported([]);
        }
      } else {
        setMenuTranslatorSupported([]);
      }
    } catch (error) {
      console.error('MenuTranslator simülasyon hatası:', error);
      setMenuTranslatorSupported([]);
    }
  };

  const clearLocalStorage = () => {
    if (typeof window === 'undefined') return;
    if (confirm('localStorage\'daki hotel-settings silinsin mi?')) {
      localStorage.removeItem('hotel-settings');
      setRefreshKey(prev => prev + 1);
    }
  };

  const testSave = () => {
    if (typeof window === 'undefined') return;
    const testSettings = {
      hotel: { name: 'Test Hotel' },
      theme: { mode: 'light' },
      language: {
        defaultLanguage: 'tr',
        supportedLanguages: ['tr', 'en', 'de', 'fr']
      },
      socialMedia: {},
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('hotel-settings', JSON.stringify(testSettings));
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Dil Ayarları Debug Sayfası</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setRefreshKey(prev => prev + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                🔄 Yenile
              </button>
              <button
                onClick={testSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                🧪 Test Kaydet
              </button>
              <button
                onClick={clearLocalStorage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                🗑️ Temizle
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Bu sayfa dil ayarlarının nereden yüklendiğini, nereye kaydedildiğini ve nasıl kullanıldığını gösterir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LocalStorage Durumu */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">📦 LocalStorage Durumu</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  hotel-settings Key'i:
                </p>
                <p className={`text-sm px-3 py-2 rounded ${localStorageData ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {localStorageData ? '✅ Var' : '❌ Yok'}
                </p>
              </div>

              {localStorageData && (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Language Object:</p>
                    <div className="bg-gray-50 p-3 rounded border">
                      <pre className="text-xs overflow-auto">
                        {JSON.stringify(localStorageData.language, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Supported Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {localStorageData.language?.supportedLanguages?.map((lang: string) => (
                        <span
                          key={lang}
                          className={`px-3 py-1 rounded text-sm ${
                            lang === 'tr' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {lang === 'tr' ? '🇹🇷 Türkçe (Orijinal)' : `🌍 ${lang.toUpperCase()}`}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Toplam: {localStorageData.language?.supportedLanguages?.length || 0} dil
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Default Language:</p>
                    <p className="text-sm px-3 py-2 bg-blue-100 text-blue-800 rounded">
                      {localStorageData.language?.defaultLanguage || 'Belirtilmemiş'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Last Updated:</p>
                    <p className="text-xs text-gray-600">
                      {localStorageData.lastUpdated 
                        ? new Date(localStorageData.lastUpdated).toLocaleString('tr-TR')
                        : 'Belirtilmemiş'}
                    </p>
                  </div>
                </>
              )}

              {!localStorageData && (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ LocalStorage'da hotel-settings bulunamadı. Settings sayfasından dilleri seçip kaydedin.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Language Store Durumu */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🏪 Language Store Durumu</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Current Language:</p>
                <p className="text-sm px-3 py-2 bg-blue-100 text-blue-800 rounded">
                  {languageStore?.currentLanguage || 'Yükleniyor...'}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Get Current Language:</p>
                <div className="bg-gray-50 p-3 rounded border">
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(languageStore?.getCurrentLanguage, null, 2)}
                  </pre>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Get Supported Languages:</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {languageStore?.getSupportedLanguages?.map((lang: any) => (
                    <span
                      key={lang.code}
                      className="px-3 py-1 rounded text-sm bg-green-100 text-green-800"
                    >
                      {lang.flag} {lang.name} ({lang.code})
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Toplam: {languageStore?.supportedLanguagesCount || 0} dil
                </p>
              </div>
            </div>
          </div>

          {/* MenuTranslator Simülasyonu */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🌍 MenuTranslator Simülasyonu</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  MenuTranslator'ın Göreceği Diller (Türkçe Hariç):
                </p>
                {menuTranslatorSupported.length > 0 ? (
                  <>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {menuTranslatorSupported.map((lang: string) => (
                        <span
                          key={lang}
                          className="px-3 py-1 rounded text-sm bg-purple-100 text-purple-800"
                        >
                          🌍 {lang.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Toplam: {menuTranslatorSupported.length} dil (Türkçe hariç)
                    </p>
                  </>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <p className="text-sm text-yellow-800">
                      ⚠️ MenuTranslator için dil bulunamadı. Varsayılan diller kullanılacak.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Varsayılan Diller (Settings Yoksa):</p>
                <div className="flex flex-wrap gap-2">
                  {['en', 'de', 'fr', 'es', 'it', 'ru', 'ar', 'zh'].map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 rounded text-sm bg-gray-100 text-gray-800"
                    >
                      🌍 {lang.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Veri Akışı */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔄 Veri Akışı</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">1. Settings Sayfası (/isletme/settings)</h3>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>Kullanıcı dilleri seçer</li>
                  <li>Checkbox değiştiğinde otomatik localStorage'a kaydedilir</li>
                  <li>"Kaydet" butonuna tıklanınca localStorage'a kaydedilir</li>
                  <li>Backend'e gönderilir (başarısız olsa bile localStorage'a kaydedilir)</li>
                  <li>settings-updated eventi gönderilir</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">2. Language Store (languageStore.ts)</h3>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>getSupportedLanguagesFromSettings() - localStorage'dan okur</li>
                  <li>getDefaultLanguageFromSettings() - localStorage'dan okur</li>
                  <li>getSupportedLanguages() - Settings'ten dilleri filtreler</li>
                  <li>currentLanguage desteklenmiyorsa varsayılan dile geçer</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">3. MenuTranslator (MenuTranslator.tsx)</h3>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>getSupportedLanguagesForTranslation() - localStorage'dan okur</li>
                  <li>Türkçe'yi filtreler (orijinal dil)</li>
                  <li>Settings yoksa varsayılan dilleri kullanır</li>
                  <li>settings-updated eventini dinler</li>
                  <li>500ms interval ile kontrol eder</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">4. Guest Interface (GuestInterfaceClient.tsx)</h3>
                <ul className="text-xs text-gray-600 space-y-1 ml-4 list-disc">
                  <li>getSupportedLanguages() - Language store'dan okur</li>
                  <li>Sadece seçili dilleri gösterir</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sorun Giderme */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔧 Sorun Giderme</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">✅ Kontrol Listesi:</h3>
                <ul className="text-xs text-blue-800 space-y-1 ml-4 list-disc">
                  <li>LocalStorage'da hotel-settings var mı?</li>
                  <li>language object'i var mı?</li>
                  <li>supportedLanguages array mi?</li>
                  <li>supportedLanguages boş değil mi?</li>
                  <li>Language store doğru çalışıyor mu?</li>
                  <li>MenuTranslator settings'i okuyabiliyor mu?</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <h3 className="text-sm font-semibold text-yellow-900 mb-2">⚠️ Yaygın Sorunlar:</h3>
                <ul className="text-xs text-yellow-800 space-y-1 ml-4 list-disc">
                  <li><strong>Settings yok:</strong> Settings sayfasından dilleri seçip kaydedin</li>
                  <li><strong>supportedLanguages array değil:</strong> Settings formatı yanlış olabilir</li>
                  <li><strong>MenuTranslator boş dil gösteriyor:</strong> Settings'te sadece Türkçe seçili olabilir</li>
                  <li><strong>Diller güncellenmiyor:</strong> Sayfayı yenileyin veya settings-updated eventini kontrol edin</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-4">
                <h3 className="text-sm font-semibold text-green-900 mb-2">💡 İpuçları:</h3>
                <ul className="text-xs text-green-800 space-y-1 ml-4 list-disc">
                  <li>Settings sayfasında dilleri seçtiğinizde otomatik localStorage'a kaydedilir</li>
                  <li>MenuTranslator 500ms interval ile settings'i kontrol eder</li>
                  <li>Settings yoksa varsayılan tüm diller gösterilir</li>
                  <li>Console'da "MenuTranslator" loglarını kontrol edin</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dynamic import ile client-side only render
const DebugLanguagePage = dynamic(() => Promise.resolve(DebugLanguageContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    </div>
  ),
});

export default DebugLanguagePage;

