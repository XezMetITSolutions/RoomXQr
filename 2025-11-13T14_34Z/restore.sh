#!/bin/bash

# Database Backup Restore Script
# Bu script PostgreSQL custom format backup'ını restore eder

set -e  # Hata durumunda dur

# Renkli çıktı için
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Database Backup Restore Script${NC}"
echo "=================================="

# Parametreleri kontrol et
if [ -z "$1" ]; then
    echo -e "${RED}❌ Hata: Veritabanı adı belirtilmedi${NC}"
    echo "Kullanım: ./restore.sh <database_name> [backup_directory]"
    echo "Örnek: ./restore.sh roomapp_eek6_restored"
    exit 1
fi

DB_NAME=$1
BACKUP_DIR=${2:-"2025-11-13T14_34Z/roomapp_eek6"}

# Backup dizininin var olup olmadığını kontrol et
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${RED}❌ Hata: Backup dizini bulunamadı: $BACKUP_DIR${NC}"
    exit 1
fi

# toc.dat dosyasının var olup olmadığını kontrol et
if [ ! -f "$BACKUP_DIR/toc.dat" ]; then
    echo -e "${RED}❌ Hata: toc.dat dosyası bulunamadı: $BACKUP_DIR/toc.dat${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Backup Dizini: $BACKUP_DIR${NC}"
echo -e "${YELLOW}🗄️  Hedef Veritabanı: $DB_NAME${NC}"
echo ""

# PostgreSQL'in yüklü olup olmadığını kontrol et
if ! command -v pg_restore &> /dev/null; then
    echo -e "${RED}❌ Hata: pg_restore komutu bulunamadı${NC}"
    echo "PostgreSQL client tools yüklü olmalıdır."
    exit 1
fi

# Veritabanının var olup olmadığını kontrol et
if psql -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo -e "${YELLOW}⚠️  Uyarı: '$DB_NAME' veritabanı zaten mevcut${NC}"
    read -p "Üzerine yazmak istediğinizden emin misiniz? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "İşlem iptal edildi."
        exit 1
    fi
    echo -e "${YELLOW}🗑️  Mevcut veritabanı siliniyor...${NC}"
    dropdb "$DB_NAME" || true
fi

# Yeni veritabanı oluştur
echo -e "${GREEN}📝 Yeni veritabanı oluşturuluyor: $DB_NAME${NC}"
createdb "$DB_NAME"

# Backup'ı restore et
echo -e "${GREEN}🔄 Backup restore ediliyor...${NC}"
if pg_restore -d "$DB_NAME" -Fd "$BACKUP_DIR" -v; then
    echo -e "${GREEN}✅ Backup başarıyla restore edildi!${NC}"
    echo ""
    echo -e "${GREEN}📊 Veritabanı bilgileri:${NC}"
    psql -d "$DB_NAME" -c "\dt" || true
else
    echo -e "${RED}❌ Restore işlemi başarısız oldu${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✨ İşlem tamamlandı!${NC}"

