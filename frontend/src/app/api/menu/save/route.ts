import { NextResponse } from 'next/server';

// Backend API URL'i
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://roomxqr-backend.onrender.com';

type IncomingItem = {
  name: string;
  price: number | string;
  description?: string;
  category?: string;
  image?: string;
  preparationTime?: number;
  allergens?: string[];
  calories?: number;
  rating?: number;
  available?: boolean;
  isAvailable?: boolean;
  translations?: { [lang: string]: { name: string; description: string } };
  id?: string;
};

export async function POST(request: Request) {
  try {
    // Admin anahtar kontrolü (isteğe bağlı). ENV yoksa serbest.
    const requiredKey = process.env.ADMIN_KEY;
    if (requiredKey) {
      const provided = (request.headers.get('x-admin-key') || '').trim();
      if (!provided || provided !== requiredKey) {
        return NextResponse.json({ error: 'Yetkisiz işlem' }, { status: 401 });
      }
    }

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

    const body = await request.json();
    const items: IncomingItem[] = body?.items || [];

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Ürün listesi boş' }, { status: 400 });
    }

    const errors: string[] = [];
    items.forEach((it, idx) => {
      if (!it.name) errors.push(`Satır ${idx + 1}: name zorunlu`);
      if (it.price === undefined || it.price === null || it.price === '') errors.push(`Satır ${idx + 1}: price zorunlu`);
    });
    if (errors.length > 0) {
      return NextResponse.json({ error: 'Doğrulama hatası', details: errors }, { status: 422 });
    }

    // Backend API'ye proxy yap
    try {
      const backendHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-tenant': tenantSlug,
      };

      // Authorization header'ı varsa ekle
      if (authHeader) {
        backendHeaders['Authorization'] = authHeader;
      }

      // Items'ı backend formatına çevir (isAvailable -> available, translations'ı ekle)
      const backendItems = items.map((item: IncomingItem) => {
        const backendItem: any = {
          name: item.name,
          price: item.price,
          description: item.description || '',
          category: item.category || 'Diğer',
          image: item.image || '',
          preparationTime: item.preparationTime || 15,
          allergens: item.allergens || [],
          calories: item.calories,
          rating: item.rating || 4,
          isAvailable: item.isAvailable !== false && item.available !== false,
        };

        // Translations'ı ekle
        if (item.translations) {
          backendItem.translations = item.translations;
        }

        return backendItem;
      });

      console.log('Backend\'e gönderilecek items:', JSON.stringify(backendItems, null, 2));

      const backendResponse = await fetch(`${BACKEND_URL}/api/menu/save`, {
        method: 'POST',
        headers: backendHeaders,
        body: JSON.stringify({ items: backendItems }),
      });

      // 404 - Backend endpoint yok, client-side'da zaten kaydedildi, başarılı dön
      if (backendResponse.status === 404) {
        // Local save fallback
        try {
          const fs = require('fs').promises;
          const path = require('path');
          const DATA_DIR = path.join(process.cwd(), '.data');
          const MENU_FILE = path.join(DATA_DIR, 'menu.json');

          try {
            await fs.mkdir(DATA_DIR, { recursive: true });
          } catch (e) { }

          let currentMenu = [];
          try {
            const fileContent = await fs.readFile(MENU_FILE, 'utf8');
            currentMenu = JSON.parse(fileContent);
            if (!Array.isArray(currentMenu)) currentMenu = [];
          } catch (e) {
            currentMenu = [];
          }

          const newItemsWithIds = items.map(item => ({
            ...item,
            id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
            available: item.isAvailable !== false && item.available !== false
          }));

          const updatedMenu = [...currentMenu, ...newItemsWithIds];

          await fs.writeFile(MENU_FILE, JSON.stringify(updatedMenu, null, 2), 'utf8');

          return NextResponse.json({
            success: true,
            count: items.length,
            message: 'Menü kaydedildi (backend endpoint yok, local dosya güncellendi)',
            warning: 'Backend endpoint bulunamadı: /api/menu/save',
            note: 'Backend\'de bu endpoint oluşturulmalı',
            items: newItemsWithIds
          }, { status: 200 });
        } catch (fileError: any) {
          return NextResponse.json({
            success: false,
            error: 'Backend endpoint bulunamadı ve local dosya yazılamadı',
            details: fileError.message
          }, { status: 500 });
        }
      }

      const backendData = await backendResponse.json();

      if (backendResponse.ok) {
        // Backend başarılı döndü ama items array'i boşsa veya yoksa kontrol et
        if (backendData.items && backendData.items.length > 0) {
          return NextResponse.json({
            success: true,
            ...backendData
          }, { status: 200 });
        } else {
          // Backend başarılı dedi ama item kaydedilmedi
          return NextResponse.json({
            success: false,
            error: 'Backend başarılı döndü ama item kaydedilmedi',
            warning: backendData.message || 'Item kaydedilemedi',
            backendResponse: backendData
          }, { status: 500 });
        }
      } else {
        // Backend hatası - ama yine de local dosyaya kaydedelim (demo için)
        console.warn('Backend hata döndü, local dosyaya kaydediliyor:', backendData);

        try {
          const fs = require('fs').promises;
          const path = require('path');
          const DATA_DIR = path.join(process.cwd(), '.data');
          const MENU_FILE = path.join(DATA_DIR, 'menu.json');

          try {
            await fs.mkdir(DATA_DIR, { recursive: true });
          } catch (e) { }

          let currentMenu = [];
          try {
            const fileContent = await fs.readFile(MENU_FILE, 'utf8');
            currentMenu = JSON.parse(fileContent);
            if (!Array.isArray(currentMenu)) currentMenu = [];
          } catch (e) {
            currentMenu = [];
          }

          const newItemsWithIds = items.map(item => ({
            ...item,
            id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
            available: item.isAvailable !== false && item.available !== false
          }));

          const updatedMenu = [...currentMenu, ...newItemsWithIds];

          await fs.writeFile(MENU_FILE, JSON.stringify(updatedMenu, null, 2), 'utf8');

          return NextResponse.json({
            success: true,
            count: items.length,
            message: 'Menü kaydedildi (backend hata döndü, local dosya güncellendi)',
            warning: 'Backend hatası: ' + (backendData.message || 'Bilinmeyen hata'),
            items: newItemsWithIds
          }, { status: 200 });
        } catch (fileError: any) {
          return NextResponse.json({
            success: false,
            error: 'Backend hatası ve local dosya yazılamadı',
            message: backendData.message || 'Bilinmeyen hata',
            details: backendData.details || backendData.error,
            backendResponse: backendData
          }, { status: backendResponse.status });
        }
      }
    } catch (backendError: any) {
      // Backend'e ulaşılamazsa, client-side'da zaten kaydedildi, başarılı dön
      console.warn('Backend menu save hatası (devam ediliyor):', backendError);

      try {
        const fs = require('fs').promises;
        const path = require('path');
        const DATA_DIR = path.join(process.cwd(), '.data');
        const MENU_FILE = path.join(DATA_DIR, 'menu.json');

        // Klasör yoksa oluştur
        try {
          await fs.mkdir(DATA_DIR, { recursive: true });
        } catch (e) { }

        // Mevcut menüyü oku
        let currentMenu = [];
        try {
          const fileContent = await fs.readFile(MENU_FILE, 'utf8');
          currentMenu = JSON.parse(fileContent);
          if (!Array.isArray(currentMenu)) currentMenu = [];
        } catch (e) {
          currentMenu = [];
        }

        // Yeni itemları ekle
        const newItemsWithIds = items.map(item => ({
          ...item,
          id: item.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
          available: item.isAvailable !== false && item.available !== false
        }));

        const updatedMenu = [...currentMenu, ...newItemsWithIds];

        await fs.writeFile(MENU_FILE, JSON.stringify(updatedMenu, null, 2), 'utf8');

        return NextResponse.json({
          success: true,
          count: items.length,
          message: 'Menü kaydedildi (backend bağlantısı yok, local dosya güncellendi)',
          warning: 'Backend bağlantısı kurulamadı: ' + (backendError?.message || 'Bilinmeyen hata'),
          items: newItemsWithIds
        }, { status: 200 });
      } catch (fileError: any) {
        return NextResponse.json({
          success: false,
          error: 'Backend bağlantısı kurulamadı ve local dosya yazılamadı',
          details: fileError.message
        }, { status: 500 });
      }
    }

  } catch (err: any) {
    console.error('Menu save API hatası:', err);
    return NextResponse.json({ error: err?.message || 'Sunucu hatası' }, { status: 500 });
  }
}
