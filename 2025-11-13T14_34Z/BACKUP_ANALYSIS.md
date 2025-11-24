# Database Backup Analizi

## Backup Bilgileri

- **Tarih**: 13 Kasım 2025, 15:37:36
- **Veritabanı Adı**: `roomapp_eek6`
- **PostgreSQL Versiyonu**: 17.6 (Debian 17.6-2.pgdg12+1)
- **Backup Format**: PostgreSQL Custom Format (pg_dump -Fc)
- **Toplam Boyut**: ~442 KB

## Dosya Yapısı

| Dosya | Boyut (KB) | Açıklama |
|-------|-----------|----------|
| `toc.dat` | 31.56 | Table of Contents (İçindekiler tablosu) |
| `3516.dat` | 407.46 | En büyük veri dosyası (muhtemelen tablo verileri) |
| `3511.dat` | 0.99 | Küçük veri dosyası |
| `3512.dat` | 0.52 | Küçük veri dosyası |
| `3513.dat` | 1.00 | Küçük veri dosyası |
| `3514.dat` | 0.15 | Küçük veri dosyası |
| `3515.dat` | 0.17 | Küçük veri dosyası |
| `3517.dat` | 0.37 | Küçük veri dosyası |
| `3518.dat` | 0.18 | Küçük veri dosyası |
| `3519.dat` | 0.00 | Boş dosya |
| `3520.dat` | 0.00 | Boş dosya |
| `3521.dat` | 1.03 | Küçük veri dosyası |
| `3522.dat` | 0.00 | Boş dosya |
| `3523.dat` | 0.09 | Küçük veri dosyası |

## Backup İçeriği (Tahmini)

Bu backup muhtemelen şu tabloları içeriyor:
- `tenants` - Tenant bilgileri
- `hotels` - Otel bilgileri
- `users` - Kullanıcı bilgileri
- `rooms` - Oda bilgileri
- `guests` - Misafir bilgileri
- `menu_items` - Menü öğeleri
- `orders` - Siparişler
- `order_items` - Sipariş öğeleri
- `guest_requests` - Misafir talepleri
- `notifications` - Bildirimler
- `user_permissions` - Kullanıcı izinleri
- `tenant_features` - Tenant özellikleri

## Restore İşlemi

Bu backup'ı restore etmek için:

```bash
# PostgreSQL'e bağlan ve yeni veritabanı oluştur
createdb roomapp_eek6_restored

# Backup'ı restore et
pg_restore -d roomapp_eek6_restored -Fd 2025-11-13T14_34Z/roomapp_eek6

# Veya tek bir dosya olarak restore etmek için:
pg_restore -d roomapp_eek6_restored toc.dat
```

## Önemli Notlar

1. **Backup Format**: Bu bir PostgreSQL custom format backup'ıdır. `pg_restore` komutu ile restore edilmelidir.
2. **Veritabanı Adı**: Backup'taki veritabanı adı `roomapp_eek6` olarak görünüyor. Bu muhtemelen Render veya başka bir hosting sağlayıcısının otomatik oluşturduğu bir isimdir.
3. **Migration Uyumluluğu**: Bu backup restore edildikten sonra, Prisma migration'larının uyumlu olduğundan emin olunmalıdır.
4. **Veri Bütünlüğü**: Restore işleminden önce mevcut veritabanının yedeğini alın.

## Güvenlik

- Bu backup dosyaları hassas veriler içerebilir (kullanıcı şifreleri, kişisel bilgiler vb.)
- Backup dosyalarını güvenli bir yerde saklayın
- Git repository'ye commit etmeyin (zaten .gitignore'da *.backup var)

