import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAllMenuItems() {
  try {
    console.log('🗑️  Tüm menu item\'lar siliniyor...');

    // Tüm tenant'ları bul
    const tenants = await prisma.tenant.findMany({
      select: {
        id: true,
        slug: true,
        name: true
      }
    });

    console.log(`📋 Bulunan tenant sayısı: ${tenants.length}`);

    let totalDeleted = 0;

    for (const tenant of tenants) {
      // Her tenant için menu item'ları say
      const count = await prisma.menuItem.count({
        where: { tenantId: tenant.id }
      });

      if (count > 0) {
        console.log(`\n🔍 Tenant: ${tenant.name} (${tenant.slug}) - ${count} ürün bulundu`);

        // Menu item'ları listele
        const items = await prisma.menuItem.findMany({
          where: { tenantId: tenant.id },
          select: {
            id: true,
            name: true,
            category: true
          }
        });

        items.forEach(item => {
          console.log(`   - ${item.name} (${item.category})`);
        });

        // Tüm menu item'ları sil
        const result = await prisma.menuItem.deleteMany({
          where: { tenantId: tenant.id }
        });

        console.log(`   ✅ ${result.count} ürün silindi`);
        totalDeleted += result.count;
      } else {
        console.log(`\n✅ Tenant: ${tenant.name} (${tenant.slug}) - Ürün yok`);
      }
    }

    console.log(`\n🎉 Toplam ${totalDeleted} ürün silindi!`);
    return { success: true, deletedCount: totalDeleted };
  } catch (error) {
    console.error('❌ Hata:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Script'i çalıştır
deleteAllMenuItems()
  .then((result) => {
    console.log('\n✅ İşlem tamamlandı:', result);
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ İşlem başarısız:', error);
    process.exit(1);
  });

