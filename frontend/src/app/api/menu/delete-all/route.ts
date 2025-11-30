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

      // Local dosyayı da temizle (her durumda)
      try {
        const fs = require('fs').promises;
        const path = require('path');
        const DATA_DIR = path.join(process.cwd(), '.data');
        const MENU_FILE = path.join(DATA_DIR, 'menu.json');

        // Klasör yoksa oluştur
        try {
          await fs.mkdir(DATA_DIR, { recursive: true });
        } catch (e) { }

        await fs.writeFile(MENU_FILE, '[]', 'utf8');
      } catch (fileError) {
        console.error('Local dosya silme hatası:', fileError);
      }

      if (backendResponse.ok) {
        const backendData = await backendResponse.json();
        return NextResponse.json({
          success: true,
          ...backendData
        }, { status: 200 });
      } else {
        // Backend başarısız olsa bile local temizlendiği için başarılı sayabiliriz (demo modu için)
        // Ama backend hatasını da dönelim
        const backendData = await backendResponse.json().catch(() => ({}));
        return NextResponse.json({
          success: true, // Local silindiği için true dönüyoruz
          warning: 'Backend silinemedi ama local temizlendi',
          error: backendData.message || 'Backend hatası',
          details: backendData
        }, { status: 200 });
      }
    } catch (backendError: any) {
      console.error('Backend silme hatası:', backendError);

      // Backend'e ulaşılamazsa local dosyayı temizle ve başarılı dön
      try {
        const fs = require('fs').promises;
        const path = require('path');
        const DATA_DIR = path.join(process.cwd(), '.data');
        const MENU_FILE = path.join(DATA_DIR, 'menu.json');

        try {
          await fs.mkdir(DATA_DIR, { recursive: true });
        } catch (e) { }

        await fs.writeFile(MENU_FILE, '[]', 'utf8');

        return NextResponse.json({
          success: true,
          message: 'Local menü temizlendi (backend bağlantısı yok)'
        }, { status: 200 });
      } catch (fileError) {
        return NextResponse.json({
          success: false,
          error: 'Backend bağlantısı kurulamadı ve local dosya silinemedi',
          details: backendError.message
        }, { status: 500 });
      }
    }

  } catch (err: any) {
    console.error('Menu delete all API hatası:', err);
    return NextResponse.json({
      success: false,
      error: err?.message || 'Sunucu hatası'
    }, { status: 500 });
  }
}

