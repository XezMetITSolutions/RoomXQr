# Manuel Restore Script - PostgreSQL client tools olmadan
# Bu script, backup dosyalarını SQL formatına çevirmek için alternatif yöntemler sunar

param(
    [Parameter(Mandatory=$true)]
    [string]$DatabaseUrl
)

Write-Host "🔄 Manuel Restore İşlemi" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

Write-Host "⚠️  PostgreSQL client tools (pg_restore) bulunamadı!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Seçenekler:" -ForegroundColor Cyan
Write-Host "1. PostgreSQL client tools'u yükleyin:" -ForegroundColor White
Write-Host "   https://www.postgresql.org/download/windows/" -ForegroundColor Gray
Write-Host "   'Command Line Tools' seçeneğini seçin" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Docker kullanarak restore edin:" -ForegroundColor White
Write-Host "   docker run --rm -v `"`$PWD`":/backup postgres:17 pg_restore -h host -U user -d database -Fd /backup/roomapp_eek6" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Render.com dashboard'dan SQL dump oluşturun ve import edin" -ForegroundColor White
Write-Host ""

# Connection bilgilerini parse et ve göster
$url = $DatabaseUrl -replace 'postgresql://', ''
$parts = $url -split '@'
$userPass = $parts[0] -split ':'
$hostDb = $parts[1] -split '/'
$hostPort = $hostDb[0] -split ':'

$user = $userPass[0]
$password = $userPass[1]
$host = $hostPort[0]
$port = if ($hostPort.Length -gt 1) { $hostPort[1] } else { "5432" }
$database = $hostDb[1]

Write-Host "📋 Connection Bilgileri:" -ForegroundColor Green
Write-Host "   Host: $host" -ForegroundColor Cyan
Write-Host "   Port: $port" -ForegroundColor Cyan
Write-Host "   Database: $database" -ForegroundColor Cyan
Write-Host "   User: $user" -ForegroundColor Cyan
Write-Host ""

Write-Host "💡 Docker ile Restore Komutu:" -ForegroundColor Yellow
Write-Host ""
$dockerCmd = "docker run --rm -v `"`$PWD/roomapp_eek6`":/backup postgres:17 pg_restore -h $host -p $port -U $user -d $database -Fd /backup -v --no-owner --no-acl"
Write-Host $dockerCmd -ForegroundColor Gray
Write-Host ""
Write-Host "   Önce şunu çalıştırın:" -ForegroundColor Yellow
Write-Host "   `$env:PGPASSWORD=`"$password`"" -ForegroundColor Gray
Write-Host ""

