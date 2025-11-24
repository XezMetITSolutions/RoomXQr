# Render.com Veritabanına Backup Restore Script
# Bu script PostgreSQL backup'ını Render.com veritabanına restore eder

param(
    [Parameter(Mandatory=$true)]
    [string]$DatabaseUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$BackupDirectory = "roomapp_eek6"
)

$ErrorActionPreference = "Stop"

Write-Host "🔄 Render.com Veritabanına Backup Restore" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

# Backup dizininin var olup olmadığını kontrol et
if (-not (Test-Path $BackupDirectory)) {
    Write-Host "❌ Hata: Backup dizini bulunamadı: $BackupDirectory" -ForegroundColor Red
    exit 1
}

# toc.dat dosyasının var olup olmadığını kontrol et
$tocFile = Join-Path $BackupDirectory "toc.dat"
if (-not (Test-Path $tocFile)) {
    Write-Host "❌ Hata: toc.dat dosyası bulunamadı: $tocFile" -ForegroundColor Red
    exit 1
}

# PostgreSQL'in yüklü olup olmadığını kontrol et
$pgRestore = Get-Command pg_restore -ErrorAction SilentlyContinue
if (-not $pgRestore) {
    Write-Host "❌ Hata: pg_restore komutu bulunamadı" -ForegroundColor Red
    Write-Host "PostgreSQL client tools yüklü olmalıdır." -ForegroundColor Yellow
    Write-Host "İndirme: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    exit 1
}

# DATABASE_URL'i parse et
Write-Host "🔍 Connection string parse ediliyor..." -ForegroundColor Yellow

if (-not $DatabaseUrl.StartsWith("postgresql://")) {
    Write-Host "❌ Hata: Geçersiz DATABASE_URL formatı" -ForegroundColor Red
    Write-Host "Format: postgresql://user:password@host:port/database" -ForegroundColor Yellow
    exit 1
}

try {
    $url = $DatabaseUrl -replace 'postgresql://', ''
    $parts = $url -split '@'
    
    if ($parts.Length -ne 2) {
        throw "Geçersiz URL formatı"
    }
    
    $userPass = $parts[0] -split ':'
    $user = $userPass[0]
    $password = $userPass[1]
    
    $hostDb = $parts[1] -split '/'
    $hostPort = $hostDb[0] -split ':'
    $host = $hostPort[0]
    $port = if ($hostPort.Length -gt 1) { $hostPort[1] } else { "5432" }
    $database = $hostDb[1]
    
    Write-Host "✅ Connection bilgileri:" -ForegroundColor Green
    Write-Host "   Host: $host" -ForegroundColor Cyan
    Write-Host "   Port: $port" -ForegroundColor Cyan
    Write-Host "   Database: $database" -ForegroundColor Cyan
    Write-Host "   User: $user" -ForegroundColor Cyan
    Write-Host ""
    
    # Onay iste
    Write-Host "⚠️  UYARI: Bu işlem mevcut veritabanındaki verileri değiştirebilir!" -ForegroundColor Yellow
    $confirm = Read-Host "Devam etmek istediğinizden emin misiniz? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "İşlem iptal edildi." -ForegroundColor Yellow
        exit 0
    }
    
    # PGPASSWORD environment variable'ını ayarla
    $env:PGPASSWORD = $password
    
    # Bağlantıyı test et
    Write-Host "🔌 Veritabanı bağlantısı test ediliyor..." -ForegroundColor Yellow
    $testResult = psql -h $host -p $port -U $user -d $database -c "SELECT version();" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Veritabanı bağlantısı başarısız!" -ForegroundColor Red
        Write-Host $testResult -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Bağlantı başarılı!" -ForegroundColor Green
    Write-Host ""
    
    # Backup'ı restore et
    Write-Host "🔄 Backup restore ediliyor..." -ForegroundColor Green
    Write-Host "   Bu işlem birkaç dakika sürebilir..." -ForegroundColor Yellow
    Write-Host ""
    
    $restoreArgs = @(
        "-h", $host
        "-p", $port
        "-U", $user
        "-d", $database
        "-Fd", $BackupDirectory
        "-v"
        "--no-owner"
        "--no-acl"
        "--if-exists"
    )
    
    $restoreResult = & pg_restore $restoreArgs 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Backup başarıyla restore edildi!" -ForegroundColor Green
        Write-Host ""
        
        # Tabloları listele
        Write-Host "📊 Veritabanı tabloları:" -ForegroundColor Green
        psql -h $host -p $port -U $user -d $database -c "\dt" 2>$null
        
        Write-Host ""
        Write-Host "✨ İşlem tamamlandı!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Sonraki adımlar:" -ForegroundColor Yellow
        Write-Host "   1. Prisma migration'larını kontrol et: npx prisma migrate status" -ForegroundColor Cyan
        Write-Host "   2. Veritabanı verilerini kontrol et: npx prisma studio" -ForegroundColor Cyan
        Write-Host "   3. Uygulamayı yeniden başlat" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ Restore işlemi başarısız oldu" -ForegroundColor Red
        Write-Host $restoreResult -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "❌ Hata: $_" -ForegroundColor Red
    exit 1
} finally {
    # PGPASSWORD'ı temizle
    Remove-Item Env:\PGPASSWORD -ErrorAction SilentlyContinue
}

