# Database Backup Restore Script (PowerShell)
# Bu script PostgreSQL custom format backup'ını restore eder

param(
    [Parameter(Mandatory=$true)]
    [string]$DatabaseName,
    
    [Parameter(Mandatory=$false)]
    [string]$BackupDirectory = "2025-11-13T14_34Z\roomapp_eek6"
)

$ErrorActionPreference = "Stop"

Write-Host "🔄 Database Backup Restore Script" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

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

Write-Host "📦 Backup Dizini: $BackupDirectory" -ForegroundColor Yellow
Write-Host "🗄️  Hedef Veritabanı: $DatabaseName" -ForegroundColor Yellow
Write-Host ""

# PostgreSQL'in yüklü olup olmadığını kontrol et
$pgRestore = Get-Command pg_restore -ErrorAction SilentlyContinue
if (-not $pgRestore) {
    Write-Host "❌ Hata: pg_restore komutu bulunamadı" -ForegroundColor Red
    Write-Host "PostgreSQL client tools yüklü olmalıdır." -ForegroundColor Yellow
    exit 1
}

# Veritabanının var olup olmadığını kontrol et
$dbExists = psql -lqt 2>$null | Select-String -Pattern "^\s*$DatabaseName\s*\|"
if ($dbExists) {
    Write-Host "⚠️  Uyarı: '$DatabaseName' veritabanı zaten mevcut" -ForegroundColor Yellow
    $confirm = Read-Host "Üzerine yazmak istediğinizden emin misiniz? (y/N)"
    if ($confirm -ne "y" -and $confirm -ne "Y") {
        Write-Host "İşlem iptal edildi." -ForegroundColor Yellow
        exit 0
    }
    Write-Host "🗑️  Mevcut veritabanı siliniyor..." -ForegroundColor Yellow
    dropdb $DatabaseName 2>$null
}

# Yeni veritabanı oluştur
Write-Host "📝 Yeni veritabanı oluşturuluyor: $DatabaseName" -ForegroundColor Green
createdb $DatabaseName
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Veritabanı oluşturulamadı" -ForegroundColor Red
    exit 1
}

# Backup'ı restore et
Write-Host "🔄 Backup restore ediliyor..." -ForegroundColor Green
$restoreResult = pg_restore -d $DatabaseName -Fd $BackupDirectory -v 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backup başarıyla restore edildi!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Veritabanı bilgileri:" -ForegroundColor Green
    psql -d $DatabaseName -c "\dt" 2>$null
} else {
    Write-Host "❌ Restore işlemi başarısız oldu" -ForegroundColor Red
    Write-Host $restoreResult -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✨ İşlem tamamlandı!" -ForegroundColor Green

