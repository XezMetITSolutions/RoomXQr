// Backend'de translations kolonunu kontrol et ve ekle
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://roomxqr-backend.onrender.com';

async function ensureTranslationsColumn() {
  try {
    console.log('🔄 Backend\'de translations kolonu kontrol ediliyor...');
    
    const response = await fetch(`${BACKEND_URL}/debug/ensure-translations-column`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Translations kolonu başarıyla kontrol edildi/eklendi');
      console.log('Response:', data);
      return true;
    } else {
      console.error('❌ Translations kolonu eklenirken hata:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Backend endpoint hatası:', error);
    return false;
  }
}

// Script çalıştır
ensureTranslationsColumn()
  .then(success => {
    if (success) {
      console.log('✅ İşlem tamamlandı');
      process.exit(0);
    } else {
      console.error('❌ İşlem başarısız');
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('❌ Beklenmeyen hata:', error);
    process.exit(1);
  });

