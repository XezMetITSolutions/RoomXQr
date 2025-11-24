import { NextResponse } from 'next/server';

// Backend API URL'i
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://roomxqr-backend.onrender.com';

export async function DELETE(request: Request) {
  try {
    // Tenant bilgisini al
    let tenantSlug = request.headers.get('x-tenant') || '';
    
    // Eğer header'da yoksa, host header'ından subdomain'i çıkar
    if (!tenantSlug) {
      const host = request.headers.get('host') || '';
      const subdomain = host.split('.')[0];
      if (subdomain && subdomain !== 'www' && subdomain !== 'roomxqr' && subdomain !== 'roomxqr-backend' && subdomain !== 'localhost') {
        tenantSlug = subdomain;
      } else {
        // Varsayılan tenant
        tenantSlug = 'demo';
      }
    }

    // Authorization token'ını al
    const authHeader = request.headers.get('authorization') || '';

    // Backend API'ye proxy yap - DELETE /api/menu endpoint'ini kullan
    try {
      const backendHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-tenant': tenantSlug,
      };

      // Authorization header'ı varsa ekle
      if (authHeader) {
        backendHeaders['Authorization'] = authHeader;
      }

      const backendResponse = await fetch(`${BACKEND_URL}/api/menu`, {
        method: 'DELETE',
        headers: backendHeaders,
      });

      const backendData = await backendResponse.json();

      if (backendResponse.ok) {
        return NextResponse.json({ 
          success: true, 
          ...backendData
        }, { status: 200 });
      } else {
        return NextResponse.json({ 
          success: false,
          error: backendData.message || 'Tüm ürünler silinemedi',
          details: backendData
        }, { status: backendResponse.status });
      }
    } catch (backendError: any) {
      console.error('Backend silme hatası:', backendError);
      return NextResponse.json({ 
        success: false,
        error: 'Backend bağlantısı kurulamadı',
        details: backendError.message
      }, { status: 500 });
    }

  } catch (err: any) {
    console.error('Menu delete all API hatası:', err);
    return NextResponse.json({ 
      success: false,
      error: err?.message || 'Sunucu hatası'
    }, { status: 500 });
  }
}

