# Database Backup Restore Kılavuzu

## Yöntem 1: Render.com Veritabanına Doğrudan Restore (Önerilen)

### Gereksinimler
- PostgreSQL client tools (pg_restore komutu)
- Render.com veritabanı connection string'i

### Adımlar

#### 1. DATABASE_URL'i Al
Render.com dashboard'dan veritabanı connection string'ini kopyala:
```
postgresql://user:password@host:port/database
```

#### 2. Backup'ı Restore Et

**Windows PowerShell:**
```powershell
# Connection string'i environment variable olarak ayarla
$env:PGPASSWORD="your_password"
$env:PGHOST="dpg-xxxxx-a.oregon-postgres.render.com"
$env:PGPORT=5432
$env:PGUSER="your_user"
$env:PGDATABASE="your_database"

# Backup'ı restore et
pg_restore -h $env:PGHOST -p $env:PGPORT -U $env:PGUSER -d $env:PGDATABASE -Fd "2025-11-13T14_34Z\roomapp_eek6" -v --no-owner --no-acl
```

**Linux/Mac:**
```bash
# Connection string'i parse et ve restore et
pg_restore -h host -p port -U user -d database -Fd 2025-11-13T14_34Z/roomapp_eek6 -v --no-owner --no-acl
```

**Not:** `--no-owner --no-acl` flag'leri Render.com'un kullanıcı izinlerini atlamak için gereklidir.

---

## Yöntem 2: Lokal PostgreSQL'e Restore, Sonra Migrate

### Adımlar

#### 1. Lokal PostgreSQL'e Restore Et

**Windows PowerShell:**
```powershell
cd "2025-11-13T14_34Z"
.\restore.ps1 -DatabaseName "roomapp_eek6_local"
```

**Linux/Mac:**
```bash
cd 2025-11-13T14_34Z
chmod +x restore.sh
./restore.sh roomapp_eek6_local
```

#### 2. Verileri Render Veritabanına Migrate Et

**pg_dump ile SQL dump oluştur:**
```bash
pg_dump -h localhost -U postgres -d roomapp_eek6_local -Fp > backup.sql
```

**Render veritabanına import et:**
```bash
psql "postgresql://user:password@host:port/database" < backup.sql
```

---

## Yöntem 3: Prisma Studio ile Manuel Import

### Adımlar

1. Backup'ı lokal PostgreSQL'e restore et (Yöntem 2, Adım 1)
2. Prisma Studio'yu aç:
   ```bash
   cd backend
   npx prisma studio
   ```
3. Verileri manuel olarak kopyala-yapıştır yap

---

## Yöntem 4: SQL Script ile Seçici Import

Backup'tan sadece belirli tabloları import etmek için:

```bash
# Sadece tenants tablosunu restore et
pg_restore -d target_database -Fd backup_directory -t tenants -v

# Birden fazla tablo
pg_restore -d target_database -Fd backup_directory -t tenants -t hotels -t users -v
```

---

## Önemli Notlar

### ⚠️ Dikkat Edilmesi Gerekenler

1. **Migration Uyumluluğu**: Backup restore edildikten sonra Prisma migration'larının uyumlu olduğundan emin olun.

2. **Veri Çakışması**: Mevcut verilerle çakışma olabilir. Önce mevcut veritabanının yedeğini alın.

3. **Foreign Key Constraints**: Restore sırasında foreign key hataları alabilirsiniz. Bu durumda:
   ```sql
   -- Foreign key constraint'leri geçici olarak devre dışı bırak
   SET session_replication_role = 'replica';
   -- Restore işlemi
   SET session_replication_role = 'origin';
   ```

4. **Owner ve ACL**: Render.com'da restore ederken `--no-owner --no-acl` flag'lerini kullanın.

5. **Schema Farklılıkları**: Backup'taki schema ile mevcut schema farklı olabilir. Önce schema'yı kontrol edin.

### ✅ Restore Sonrası Kontroller

1. Tabloların oluşturulduğunu kontrol et:
   ```sql
   \dt
   ```

2. Veri sayılarını kontrol et:
   ```sql
   SELECT 
     schemaname,
     tablename,
     n_live_tup as row_count
   FROM pg_stat_user_tables
   ORDER BY n_live_tup DESC;
   ```

3. Tenant'ları kontrol et:
   ```sql
   SELECT id, name, slug, "isActive" FROM tenants;
   ```

4. Prisma migration'larını kontrol et:
   ```bash
   cd backend
   npx prisma migrate status
   ```

---

## Hata Çözümleri

### "permission denied" Hatası
```bash
# --no-owner --no-acl flag'lerini kullan
pg_restore ... --no-owner --no-acl
```

### "relation already exists" Hatası
```bash
# Mevcut tabloları sil veya --clean flag'i kullan
pg_restore ... --clean
```

### "connection refused" Hatası
- DATABASE_URL'in doğru olduğundan emin ol
- Firewall/network ayarlarını kontrol et
- Render.com'da veritabanının aktif olduğunu kontrol et

---

## Hızlı Başlangıç (Render.com için)

```powershell
# 1. DATABASE_URL'i environment variable olarak ayarla
$DATABASE_URL = "postgresql://user:password@host:port/database"

# 2. Connection bilgilerini parse et
$parts = $DATABASE_URL -replace 'postgresql://', '' -split '@'
$userPass = $parts[0] -split ':'
$hostPort = $parts[1] -split '/'
$host = ($hostPort[0] -split ':')[0]
$port = if (($hostPort[0] -split ':').Length -gt 1) { ($hostPort[0] -split ':')[1] } else { "5432" }
$database = $hostPort[1]

# 3. Restore et
pg_restore -h $host -p $port -U $userPass[0] -d $database -Fd "2025-11-13T14_34Z\roomapp_eek6" -v --no-owner --no-acl
```

