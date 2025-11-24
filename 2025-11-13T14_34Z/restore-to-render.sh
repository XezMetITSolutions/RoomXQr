#!/bin/bash

# Render.com Veritabanına Backup Restore Script
# Bu script PostgreSQL backup'ını Render.com veritabanına restore eder

set -e

# Renkli çıktı için
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Render.com Veritabanına Backup Restore${NC}"
echo "==========================================="
echo ""

# Parametreleri kontrol et
if [ -z "$1" ]; then
    echo -e "${RED}❌ Hata: DATABASE_URL belirtilmedi${NC}"
    echo "Kullanım: ./restore-to-render.sh <DATABASE_URL> [backup_directory]"
    echo "Örnek: ./restore-to-render.sh 'postgresql://user:pass@host:port/db'"
    exit 1
fi

DATABASE_URL=$1
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

# PostgreSQL'in yüklü olup olmadığını kontrol et
if ! command -v pg_restore &> /dev/null; then
    echo -e "${RED}❌ Hata: pg_restore komutu bulunamadı${NC}"
    echo "PostgreSQL client tools yüklü olmalıdır."
    exit 1
fi

# DATABASE_URL'i parse et
echo -e "${YELLOW}🔍 Connection string parse ediliyor...${NC}"

if [[ ! $DATABASE_URL =~ ^postgresql:// ]]; then
    echo -e "${RED}❌ Hata: Geçersiz DATABASE_URL formatı${NC}"
    echo "Format: postgresql://user:password@host:port/database"
    exit 1
fi

# URL'i parse et
URL=${DATABASE_URL#postgresql://}
USER_PASS=${URL%%@*}
HOST_DB=${URL#*@}
USER=${USER_PASS%%:*}
PASSWORD=${USER_PASS#*:}
HOST_PORT=${HOST_DB%%/*}
DB=${HOST_DB#*/}

if [[ $HOST_PORT =~ : ]]; then
    HOST=${HOST_PORT%%:*}
    PORT=${HOST_PORT#*:}
else
    HOST=$HOST_PORT
    PORT=5432
fi

echo -e "${GREEN}✅ Connection bilgileri:${NC}"
echo -e "   ${CYAN}Host: $HOST${NC}"
echo -e "   ${CYAN}Port: $PORT${NC}"
echo -e "   ${CYAN}Database: $DB${NC}"
echo -e "   ${CYAN}User: $USER${NC}"
echo ""

# Onay iste
echo -e "${YELLOW}⚠️  UYARI: Bu işlem mevcut veritabanındaki verileri değiştirebilir!${NC}"
read -p "Devam etmek istediğinizden emin misiniz? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "İşlem iptal edildi."
    exit 0
fi

# PGPASSWORD environment variable'ını ayarla
export PGPASSWORD=$PASSWORD

# Bağlantıyı test et
echo -e "${YELLOW}🔌 Veritabanı bağlantısı test ediliyor...${NC}"
if ! psql -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" -c "SELECT version();" > /dev/null 2>&1; then
    echo -e "${RED}❌ Veritabanı bağlantısı başarısız!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Bağlantı başarılı!${NC}"
echo ""

# Backup'ı restore et
echo -e "${GREEN}🔄 Backup restore ediliyor...${NC}"
echo -e "${YELLOW}   Bu işlem birkaç dakika sürebilir...${NC}"
echo ""

if pg_restore -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" -Fd "$BACKUP_DIR" -v --no-owner --no-acl --if-exists; then
    echo ""
    echo -e "${GREEN}✅ Backup başarıyla restore edildi!${NC}"
    echo ""
    
    # Tabloları listele
    echo -e "${GREEN}📊 Veritabanı tabloları:${NC}"
    psql -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" -c "\dt" 2>/dev/null || true
    
    echo ""
    echo -e "${GREEN}✨ İşlem tamamlandı!${NC}"
    echo ""
    echo -e "${YELLOW}📝 Sonraki adımlar:${NC}"
    echo -e "   ${CYAN}1. Prisma migration'larını kontrol et: npx prisma migrate status${NC}"
    echo -e "   ${CYAN}2. Veritabanı verilerini kontrol et: npx prisma studio${NC}"
    echo -e "   ${CYAN}3. Uygulamayı yeniden başlat${NC}"
else
    echo ""
    echo -e "${RED}❌ Restore işlemi başarısız oldu${NC}"
    exit 1
fi

# PGPASSWORD'ı temizle
unset PGPASSWORD

