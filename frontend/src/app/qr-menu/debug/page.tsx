"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

interface DebugResult {
  test: string;
  status: 'success' | 'error' | 'pending' | 'warning';
  message: string;
  details?: any;
  timestamp: Date;
}

export default function QRMenuDebugPage() {
  const [results, setResults] = useState<DebugResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState('');
  const [tenantSlug, setTenantSlug] = useState('');

  useEffect(() => {
    // Backend URL'i düzelt - roomxqr.onrender.com yerine roomxqr-backend.onrender.com olmalı
    const defaultUrl = 'https://roomxqr-backend.onrender.com';
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || defaultUrl);
    
    // Tenant slug'ını al
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const subdomain = hostname.split('.')[0];
      if (subdomain && subdomain !== 'www' && subdomain !== 'roomxqr' && subdomain !== 'roomxqr-backend') {
        setTenantSlug(subdomain);
      } else {
        setTenantSlug('demo');
      }
    }
  }, []);

  const addResult = (test: string, status: 'success' | 'error' | 'pending' | 'warning', message: string, details?: any) => {
    setResults(prev => [...prev, {
      test,
      status,
      message,
      details,
      timestamp: new Date()
    }]);
  };

  const testFrontendMenuAPI = async () => {
    addResult('Frontend Menu API', 'pending', 'Test başlatılıyor...');
    try {
      const response = await fetch('/api/menu', {
        headers: {
          'x-tenant': tenantSlug
        }
      });
      const data = await response.json();
      
      if (response.ok) {
        const menuCount = data.menu?.length || 0;
        addResult('Frontend Menu API', 'success', 
          `Başarılı: ${menuCount} ürün bulundu`, 
          { menu: data.menu, count: menuCount }
        );
      } else {
        addResult('Frontend Menu API', 'error', 
          `Hata: ${data.error || data.message || 'Bilinmeyen hata'}`, 
          data
        );
      }
    } catch (error: any) {
      addResult('Frontend Menu API', 'error', 
        `Hata: ${error.message}`, 
        error
      );
    }
  };

  const testBackendMenuAPI = async () => {
    addResult('Backend Menu API', 'pending', 'Test başlatılıyor...');
    try {
      const response = await fetch(`${apiUrl}/api/menu`, {
        headers: {
          'x-tenant': tenantSlug,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const menuCount = data.menuItems?.length || data.menu?.length || 0;
        addResult('Backend Menu API', 'success', 
          `Başarılı: ${menuCount} ürün bulundu`, 
          { 
            menuItems: data.menuItems,
            menu: data.menu,
            count: menuCount,
            rawResponse: data
          }
        );
      } else {
        addResult('Backend Menu API', 'error', 
          `Hata (${response.status}): ${data.message || data.error || 'Bilinmeyen hata'}`, 
          data
        );
      }
    } catch (error: any) {
      addResult('Backend Menu API', 'error', 
        `Bağlantı hatası: ${error.message}`, 
        { error: error.message, apiUrl }
      );
    }
  };

  const testTenantInfo = async () => {
    addResult('Tenant Bilgisi', 'pending', 'Kontrol ediliyor...');
    try {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
      const subdomain = hostname.split('.')[0];
      
      const detectedTenant = (subdomain && subdomain !== 'www' && subdomain !== 'roomxqr' && subdomain !== 'roomxqr-backend') 
        ? subdomain 
        : 'demo';
      
      addResult('Tenant Bilgisi', 'success', 
        `Tenant slug: ${detectedTenant}`, 
        { 
          hostname,
          subdomain,
          detectedTenant,
          currentTenant: tenantSlug
        }
      );
    } catch (error: any) {
      addResult('Tenant Bilgisi', 'error', 
        `Hata: ${error.message}`, 
        error
      );
    }
  };

  const testBackendHealth = async () => {
    addResult('Backend Health Check', 'pending', 'Kontrol ediliyor...');
    try {
      const response = await fetch(`${apiUrl}/health`);
      
      if (response.ok) {
        const data = await response.json();
        addResult('Backend Health Check', 'success', 
          'Backend çalışıyor', 
          data
        );
      } else {
        addResult('Backend Health Check', 'error', 
          `Backend yanıt vermiyor (${response.status})`, 
          { status: response.status, statusText: response.statusText }
        );
      }
    } catch (error: any) {
      addResult('Backend Health Check', 'error', 
        `Backend'e ulaşılamıyor: ${error.message}`, 
        { error: error.message, apiUrl }
      );
    }
  };

  const testDatabaseConnection = async () => {
    addResult('Database Bağlantısı', 'pending', 'Kontrol ediliyor...');
    try {
      // Backend'den menu çekmeyi dene - eğer boş geliyorsa database'de ürün yok demektir
      const response = await fetch(`${apiUrl}/api/menu`, {
        headers: {
          'x-tenant': tenantSlug,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const menuCount = data.menuItems?.length || data.menu?.length || 0;
        
        if (menuCount === 0) {
          addResult('Database Bağlantısı', 'warning', 
            'Database bağlantısı var ama ürün bulunamadı. Seed script çalıştırılmalı.', 
            { 
              menuCount: 0,
              suggestion: 'Aşağıdaki "Seed Script Çalıştır" butonunu kullanın'
            }
          );
        } else {
          addResult('Database Bağlantısı', 'success', 
            `Database bağlantısı başarılı, ${menuCount} ürün bulundu`, 
            { menuCount }
          );
        }
      } else {
        addResult('Database Bağlantısı', 'error', 
          `Database bağlantı hatası (${response.status})`, 
          { status: response.status }
        );
      }
    } catch (error: any) {
      addResult('Database Bağlantısı', 'error', 
        `Hata: ${error.message}`, 
        error
      );
    }
  };

  const runSeedScript = async () => {
    addResult('Seed Script', 'pending', 'Seed script çalıştırılıyor...');
    try {
      // Secret key - production'da environment variable'dan alınmalı
      const secretKey = prompt('Seed secret key girin (varsayılan: demo-seed-secret-key-change-in-production):') || 'demo-seed-secret-key-change-in-production';
      
      console.log('🌱 Seed script çağrılıyor:', { apiUrl, secretKey: secretKey.substring(0, 10) + '...' });
      
      const response = await fetch(`${apiUrl}/api/admin/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-seed-secret': secretKey,
          'x-tenant': tenantSlug
        },
        mode: 'cors',
        credentials: 'include'
      });
      
      console.log('📡 Seed script response:', { status: response.status, ok: response.ok });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText, status: response.status };
        }
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        addResult('Seed Script', 'success', 
          'Seed script başarıyla çalıştırıldı! Ürünler yüklendi.', 
          { 
            message: data.message,
            output: data.output
          }
        );
        
        // 2 saniye sonra menu API'sini tekrar test et
        setTimeout(() => {
          testBackendMenuAPI();
        }, 2000);
      } else {
        addResult('Seed Script', 'error', 
          `Seed script hatası: ${data.message || 'Bilinmeyen hata'}`, 
          data
        );
      }
    } catch (error: any) {
      addResult('Seed Script', 'error', 
        `Hata: ${error.message}`, 
        error
      );
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setResults([]);
    
    await testTenantInfo();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testBackendHealth();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testBackendMenuAPI();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testFrontendMenuAPI();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testDatabaseConnection();
    
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'pending':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'pending':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">QR Menu Debug Sayfası</h1>
          <p className="text-gray-600 mb-6">
            Bu sayfa QR menu sayfasında ürünlerin neden görünmediğini tespit etmek için testler yapar.
          </p>
          
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold mb-2">Bilgiler:</h2>
            <ul className="text-sm space-y-1">
              <li><strong>Backend URL:</strong> {apiUrl}</li>
              <li><strong>Tenant Slug:</strong> {tenantSlug}</li>
              <li><strong>Hostname:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'N/A'}</li>
            </ul>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={runAllTests}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Testler Çalışıyor...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Tüm Testleri Çalıştır
                </>
              )}
            </button>
            
            <button
              onClick={() => setResults([])}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
            >
              Sonuçları Temizle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={testTenantInfo}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-left"
            >
              Tenant Bilgisi Testi
            </button>
            <button
              onClick={testBackendHealth}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-left"
            >
              Backend Health Check
            </button>
            <button
              onClick={testBackendMenuAPI}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-left"
            >
              Backend Menu API Testi
            </button>
            <button
              onClick={testFrontendMenuAPI}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-left"
            >
              Frontend Menu API Testi
            </button>
            <button
              onClick={testDatabaseConnection}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-left"
            >
              Database Bağlantı Testi
            </button>
            <button
              onClick={runSeedScript}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              🌱 Seed Script Çalıştır
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
              Henüz test çalıştırılmadı. Yukarıdaki butonlardan birini tıklayın.
            </div>
          ) : (
            results.map((result, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${getStatusColor(result.status)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(result.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{result.test}</h3>
                      <span className="text-xs text-gray-500">
                        {result.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{result.message}</p>
                    {result.details && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
                          Detayları Göster
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-96">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-3">Olası Çözümler:</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Ürün bulunamadı:</strong> Backend'de <code className="bg-yellow-100 px-2 py-1 rounded">npm run db:seed</code> komutunu çalıştırın</li>
            <li>• <strong>Backend'e ulaşılamıyor:</strong> Backend servisinin çalıştığından emin olun</li>
            <li>• <strong>Tenant hatası:</strong> x-tenant header'ının doğru gönderildiğini kontrol edin</li>
            <li>• <strong>CORS hatası:</strong> Backend CORS ayarlarını kontrol edin</li>
            <li>• <strong>Database bağlantı hatası:</strong> DATABASE_URL environment variable'ını kontrol edin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

