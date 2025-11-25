import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Demo tenant oluştur
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      name: 'Demo İşletme',
      slug: 'demo',
      domain: 'demo.roomxr.com',
      isActive: true,
      settings: {
        theme: {
          primaryColor: '#D4AF37',
          secondaryColor: '#f3f4f6'
        },
        currency: 'TRY',
        language: 'tr'
      }
    }
  });

  console.log('✅ Tenant created:', tenant.name);

  // Demo hotel oluştur
  const hotel = await prisma.hotel.upsert({
    where: { id: 'demo-hotel' },
    update: {},
    create: {
      id: 'demo-hotel',
      name: 'Demo Otel',
      address: 'Demo Adres, İstanbul',
      phone: '+90 212 555 0123',
      email: 'info@demo-otel.com',
      website: 'https://demo-otel.com',
      isActive: true,
      tenantId: tenant.id
    }
  });

  console.log('✅ Hotel created:', hotel.name);

  // Demo tenant için mevcut tüm menu item'ları sil (tekrar eden ürünleri önlemek için)
  console.log('🗑️  Mevcut demo menu item'ları siliniyor...');
  const deletedCount = await prisma.menuItem.deleteMany({
    where: {
      tenantId: tenant.id
    }
  });
  console.log(`✅ ${deletedCount.count} menu item silindi`);

  // Demo menu ürünleri oluştur (çok dilli)
  const menuItems = [
    {
      name: 'Akdeniz Kahvaltı Tabağı',
      description: 'Zeytinyağlı peynirler, taze domates, salatalık, ev yapımı reçeller ve sıcak bazlama ile dengeli kahvaltı tabağı.',
      price: 260,
      category: 'Kahvaltı',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
      allergens: ['Süt', 'Gluten', 'Fındık'],
      calories: 520,
      translations: {
        tr: {
          name: 'Akdeniz Kahvaltı Tabağı',
          description: 'Zeytinyağlı peynirler, taze domates, salatalık, ev yapımı reçeller ve sıcak bazlama ile dengeli kahvaltı tabağı.'
        },
        en: {
          name: 'Mediterranean Breakfast Platter',
          description: 'Olive-oil marinated cheeses, fresh tomatoes, cucumbers, homemade jams and warm flatbread for a balanced start.'
        },
        de: {
          name: 'Mediterranes Frühstück',
          description: 'In Olivenöl eingelegte Käse, frische Tomaten, Gurken, hausgemachte Marmeladen und warmes Fladenbrot.'
        },
        fr: {
          name: 'Petit-déjeuner Méditerranéen',
          description: 'Fromages marinés à l\'huile d\'olive, tomates fraîches, concombres, confitures maison et pain plat chaud.'
        }
      }
    },
    {
      name: 'Izgara Levrek',
      description: 'Taze levrek, zeytinyağı ve limon ile marine edilmiş, yanında mevsim sebzeleri ile servis edilir.',
      price: 185,
      category: 'Ana Yemekler',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
      allergens: ['Balık'],
      calories: 320,
      translations: {
        tr: {
          name: 'Izgara Levrek',
          description: 'Taze levrek, zeytinyağı ve limon ile marine edilmiş, yanında mevsim sebzeleri ile servis edilir.'
        },
        en: {
          name: 'Grilled Sea Bass',
          description: 'Fresh sea bass marinated with olive oil and lemon, served with seasonal vegetables.'
        },
        de: {
          name: 'Gegrillter Wolfsbarsch',
          description: 'Frischer Wolfsbarsch in Olivenöl und Zitrone mariniert, serviert mit saisonalem Gemüse.'
        },
        fr: {
          name: 'Bar Grillé',
          description: 'Bar frais mariné à l\'huile d\'olive et au citron, servi avec des légumes de saison.'
        }
      }
    },
    {
      name: 'Kuzu Tandır',
      description: 'Yavaş pişirilmiş kuzu eti, baharatlı sos ve pilav ile servis edilir.',
      price: 320,
      category: 'Ana Yemekler',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80',
      allergens: [],
      calories: 680,
      translations: {
        tr: {
          name: 'Kuzu Tandır',
          description: 'Yavaş pişirilmiş kuzu eti, baharatlı sos ve pilav ile servis edilir.'
        },
        en: {
          name: 'Slow-Cooked Lamb',
          description: 'Tender slow-cooked lamb with spiced sauce, served with rice.'
        },
        de: {
          name: 'Langsam Gegartes Lamm',
          description: 'Zartes, langsam gegartes Lammfleisch mit würziger Soße, serviert mit Reis.'
        },
        fr: {
          name: 'Agneau Braisé',
          description: 'Agneau tendre cuit lentement avec sauce épicée, servi avec du riz.'
        }
      }
    },
    {
      name: 'Mevsim Salatası',
      description: 'Taze roka, marul, domates, salatalık, zeytin ve özel sos ile hazırlanmış nefis salata.',
      price: 95,
      category: 'Mezeler',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
      allergens: [],
      calories: 120,
      translations: {
        tr: {
          name: 'Mevsim Salatası',
          description: 'Taze roka, marul, domates, salatalık, zeytin ve özel sos ile hazırlanmış nefis salata.'
        },
        en: {
          name: 'Seasonal Salad',
          description: 'Fresh arugula, lettuce, tomatoes, cucumbers, olives and special dressing.'
        },
        de: {
          name: 'Saisonsalat',
          description: 'Frischer Rucola, Salat, Tomaten, Gurken, Oliven und spezielle Soße.'
        },
        fr: {
          name: 'Salade de Saison',
          description: 'Roquette fraîche, laitue, tomates, concombres, olives et vinaigrette spéciale.'
        }
      }
    },
    {
      name: 'Humus',
      description: 'Nohut, tahin, zeytinyağı ve limon ile hazırlanmış geleneksel mezze.',
      price: 75,
      category: 'Mezeler',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=900&q=80',
      allergens: ['Susam'],
      calories: 180,
      translations: {
        tr: {
          name: 'Humus',
          description: 'Nohut, tahin, zeytinyağı ve limon ile hazırlanmış geleneksel mezze.'
        },
        en: {
          name: 'Hummus',
          description: 'Traditional dip made with chickpeas, tahini, olive oil and lemon.'
        },
        de: {
          name: 'Hummus',
          description: 'Traditioneller Dip aus Kichererbsen, Tahini, Olivenöl und Zitrone.'
        },
        fr: {
          name: 'Houmous',
          description: 'Trempette traditionnelle à base de pois chiches, tahini, huile d\'olive et citron.'
        }
      }
    },
    {
      name: 'Baklava',
      description: 'İnce yufka, ceviz ve şerbet ile hazırlanmış geleneksel Türk tatlısı.',
      price: 120,
      category: 'Tatlılar',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
      allergens: ['Gluten', 'Fındık'],
      calories: 450,
      translations: {
        tr: {
          name: 'Baklava',
          description: 'İnce yufka, ceviz ve şerbet ile hazırlanmış geleneksel Türk tatlısı.'
        },
        en: {
          name: 'Baklava',
          description: 'Traditional Turkish dessert made with thin pastry, walnuts and syrup.'
        },
        de: {
          name: 'Baklava',
          description: 'Traditionelles türkisches Dessert aus dünnem Teig, Walnüssen und Sirup.'
        },
        fr: {
          name: 'Baklava',
          description: 'Dessert turc traditionnel à base de pâte fine, noix et sirop.'
        }
      }
    },
    {
      name: 'Sütlaç',
      description: 'Pirinç, süt ve şeker ile hazırlanmış geleneksel Türk muhallebisi.',
      price: 65,
      category: 'Tatlılar',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4bcaf211?auto=format&fit=crop&w=900&q=80',
      allergens: ['Süt', 'Gluten'],
      calories: 280,
      translations: {
        tr: {
          name: 'Sütlaç',
          description: 'Pirinç, süt ve şeker ile hazırlanmış geleneksel Türk muhallebisi.'
        },
        en: {
          name: 'Rice Pudding',
          description: 'Traditional Turkish rice pudding made with rice, milk and sugar.'
        },
        de: {
          name: 'Milchreis',
          description: 'Traditioneller türkischer Milchreis aus Reis, Milch und Zucker.'
        },
        fr: {
          name: 'Riz au Lait',
          description: 'Dessert turc traditionnel à base de riz, lait et sucre.'
        }
      }
    },
    {
      name: 'Türk Kahvesi',
      description: 'Geleneksel yöntemle pişirilmiş Türk kahvesi, lokum ile servis edilir.',
      price: 45,
      category: 'İçecekler',
      image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=900&q=80',
      allergens: [],
      calories: 15,
      translations: {
        tr: {
          name: 'Türk Kahvesi',
          description: 'Geleneksel yöntemle pişirilmiş Türk kahvesi, lokum ile servis edilir.'
        },
        en: {
          name: 'Turkish Coffee',
          description: 'Traditionally brewed Turkish coffee, served with Turkish delight.'
        },
        de: {
          name: 'Türkischer Kaffee',
          description: 'Traditionell gebrühter türkischer Kaffee, serviert mit türkischem Honig.'
        },
        fr: {
          name: 'Café Turc',
          description: 'Café turc préparé de manière traditionnelle, servi avec des loukoums.'
        }
      }
    },
    {
      name: 'Taze Sıkılmış Portakal Suyu',
      description: 'Günlük taze sıkılmış portakal suyu, C vitamini deposu.',
      price: 55,
      category: 'İçecekler',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80',
      allergens: [],
      calories: 110,
      translations: {
        tr: {
          name: 'Taze Sıkılmış Portakal Suyu',
          description: 'Günlük taze sıkılmış portakal suyu, C vitamini deposu.'
        },
        en: {
          name: 'Fresh Orange Juice',
          description: 'Daily fresh squeezed orange juice, rich in vitamin C.'
        },
        de: {
          name: 'Frisch Gepresster Orangensaft',
          description: 'Täglich frisch gepresster Orangensaft, reich an Vitamin C.'
        },
        fr: {
          name: 'Jus d\'Orange Frais',
          description: 'Jus d\'orange pressé quotidiennement, riche en vitamine C.'
        }
      }
    },
    {
      name: 'Mercimek Çorbası',
      description: 'Kırmızı mercimek, havuç ve baharatlarla hazırlanmış geleneksel çorba.',
      price: 85,
      category: 'Mezeler',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80',
      allergens: [],
      calories: 180,
      translations: {
        tr: {
          name: 'Mercimek Çorbası',
          description: 'Kırmızı mercimek, havuç ve baharatlarla hazırlanmış geleneksel çorba.'
        },
        en: {
          name: 'Lentil Soup',
          description: 'Traditional soup made with red lentils, carrots and spices.'
        },
        de: {
          name: 'Linsensuppe',
          description: 'Traditionelle Suppe aus roten Linsen, Karotten und Gewürzen.'
        },
        fr: {
          name: 'Soupe de Lentilles',
          description: 'Soupe traditionnelle à base de lentilles rouges, carottes et épices.'
        }
      }
    },
    {
      name: 'Izgara Tavuk Şiş',
      description: 'Marine edilmiş tavuk eti, közlenmiş sebzeler ve pilav ile servis edilir.',
      price: 195,
      category: 'Ana Yemekler',
      image: 'https://images.unsplash.com/photo-1608039829573-8036e3a8f3c0?auto=format&fit=crop&w=900&q=80',
      allergens: [],
      calories: 420,
      translations: {
        tr: {
          name: 'Izgara Tavuk Şiş',
          description: 'Marine edilmiş tavuk eti, közlenmiş sebzeler ve pilav ile servis edilir.'
        },
        en: {
          name: 'Grilled Chicken Kebab',
          description: 'Marinated chicken meat, grilled vegetables and rice.'
        },
        de: {
          name: 'Gegrilltes Hähnchenspieß',
          description: 'Mariniertes Hähnchenfleisch, gegrilltes Gemüse und Reis.'
        },
        fr: {
          name: 'Brochette de Poulet Grillée',
          description: 'Viande de poulet marinée, légumes grillés et riz.'
        }
      }
    },
    {
      name: 'Künefe',
      description: 'İnce kadayıf, taze peynir ve şerbet ile hazırlanmış sıcak tatlı.',
      price: 135,
      category: 'Tatlılar',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=80',
      allergens: ['Gluten', 'Süt'],
      calories: 520,
      translations: {
        tr: {
          name: 'Künefe',
          description: 'İnce kadayıf, taze peynir ve şerbet ile hazırlanmış sıcak tatlı.'
        },
        en: {
          name: 'Kunefe',
          description: 'Hot dessert made with thin kadayif, fresh cheese and syrup.'
        },
        de: {
          name: 'Künefe',
          description: 'Heißes Dessert aus dünnem Kadayif, frischem Käse und Sirup.'
        },
        fr: {
          name: 'Kunefe',
          description: 'Dessert chaud à base de kadayif fin, fromage frais et sirop.'
        }
      }
    },
    {
      name: 'Ayran',
      description: 'Geleneksel Türk ayranı, taze yoğurt ve su ile hazırlanmış serinletici içecek.',
      price: 35,
      category: 'İçecekler',
      image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=900&q=80',
      allergens: ['Süt'],
      calories: 60,
      translations: {
        tr: {
          name: 'Ayran',
          description: 'Geleneksel Türk ayranı, taze yoğurt ve su ile hazırlanmış serinletici içecek.'
        },
        en: {
          name: 'Ayran',
          description: 'Traditional Turkish ayran, refreshing drink made with fresh yogurt and water.'
        },
        de: {
          name: 'Ayran',
          description: 'Traditionelles türkisches Ayran, erfrischendes Getränk aus frischem Joghurt und Wasser.'
        },
        fr: {
          name: 'Ayran',
          description: 'Ayran turc traditionnel, boisson rafraîchissante à base de yaourt frais et d\'eau.'
        }
      }
    },
    {
      name: 'Menemen',
      description: 'Yumurta, domates, biber ve soğan ile hazırlanmış geleneksel Türk kahvaltısı.',
      price: 125,
      category: 'Kahvaltı',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=900&q=80',
      allergens: ['Yumurta'],
      calories: 280,
      translations: {
        tr: {
          name: 'Menemen',
          description: 'Yumurta, domates, biber ve soğan ile hazırlanmış geleneksel Türk kahvaltısı.'
        },
        en: {
          name: 'Menemen',
          description: 'Traditional Turkish breakfast dish made with eggs, tomatoes, peppers and onions.'
        },
        de: {
          name: 'Menemen',
          description: 'Traditionelles türkisches Frühstücksgericht aus Eiern, Tomaten, Paprika und Zwiebeln.'
        },
        fr: {
          name: 'Menemen',
          description: 'Plat de petit-déjeuner turc traditionnel à base d\'œufs, tomates, poivrons et oignons.'
        }
      }
    },
    {
      name: 'Lahmacun',
      description: 'İnce hamur üzerine kıyma, domates, biber ve baharatlarla hazırlanmış geleneksel yemek.',
      price: 75,
      category: 'Ana Yemekler',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
      allergens: ['Gluten'],
      calories: 320,
      translations: {
        tr: {
          name: 'Lahmacun',
          description: 'İnce hamur üzerine kıyma, domates, biber ve baharatlarla hazırlanmış geleneksel yemek.'
        },
        en: {
          name: 'Lahmacun',
          description: 'Traditional dish made with thin dough topped with minced meat, tomatoes, peppers and spices.'
        },
        de: {
          name: 'Lahmacun',
          description: 'Traditionelles Gericht aus dünnem Teig mit Hackfleisch, Tomaten, Paprika und Gewürzen.'
        },
        fr: {
          name: 'Lahmacun',
          description: 'Plat traditionnel à base de pâte fine garnie de viande hachée, tomates, poivrons et épices.'
        }
      }
    }
  ];

  console.log('🍽️ Creating menu items...');
  for (const itemData of menuItems) {
    try {
      const menuItem = await prisma.menuItem.upsert({
        where: {
          id: `demo-menu-${itemData.name.toLowerCase().replace(/\s+/g, '-')}`
        },
        update: {
          name: itemData.name,
          description: itemData.description,
          price: itemData.price,
          category: itemData.category,
          image: itemData.image,
          allergens: itemData.allergens,
          calories: itemData.calories,
          isAvailable: true,
          isActive: true,
          translations: itemData.translations
        },
        create: {
          id: `demo-menu-${itemData.name.toLowerCase().replace(/\s+/g, '-')}`,
          name: itemData.name,
          description: itemData.description,
          price: itemData.price,
          category: itemData.category,
          image: itemData.image,
          allergens: itemData.allergens,
          calories: itemData.calories,
          isAvailable: true,
          isActive: true,
          tenantId: tenant.id,
          hotelId: hotel.id,
          translations: itemData.translations
        }
      });
      console.log(`✅ Menu item created: ${menuItem.name}`);
    } catch (error: any) {
      // Translations kolonu yoksa, translations olmadan dene
      if (error.message && error.message.includes('translations')) {
        console.log(`⚠️ Translations kolonu yok, ${itemData.name} translations olmadan kaydediliyor...`);
        const menuItem = await prisma.menuItem.upsert({
          where: {
            id: `demo-menu-${itemData.name.toLowerCase().replace(/\s+/g, '-')}`
          },
          update: {
            name: itemData.name,
            description: itemData.description,
            price: itemData.price,
            category: itemData.category,
            image: itemData.image,
            allergens: itemData.allergens,
            calories: itemData.calories,
            isAvailable: true,
            isActive: true
          },
          create: {
            id: `demo-menu-${itemData.name.toLowerCase().replace(/\s+/g, '-')}`,
            name: itemData.name,
            description: itemData.description,
            price: itemData.price,
            category: itemData.category,
            image: itemData.image,
            allergens: itemData.allergens,
            calories: itemData.calories,
            isAvailable: true,
            isActive: true,
            tenantId: tenant.id,
            hotelId: hotel.id
          }
        });
        console.log(`✅ Menu item created (without translations): ${menuItem.name}`);
      } else {
        console.error(`❌ Error creating menu item ${itemData.name}:`, error);
      }
    }
  }

  // Demo kullanıcıları oluştur
  const users = [
    {
      id: 'admin-user',
      email: 'admin@hotel.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN' as const,
      permissions: ['dashboard', 'analytics', 'menu', 'users', 'announcements', 'qr-kod', 'notifications', 'settings', 'support']
    },
    {
      id: 'manager-user',
      email: 'manager@hotel.com',
      password: 'manager123',
      firstName: 'Manager',
      lastName: 'User',
      role: 'MANAGER' as const,
      permissions: ['dashboard', 'menu', 'announcements', 'qr-kod', 'notifications']
    },
    {
      id: 'reception-user',
      email: 'reception@hotel.com',
      password: 'reception123',
      firstName: 'Reception',
      lastName: 'User',
      role: 'RECEPTION' as const,
      permissions: ['dashboard', 'qr-kod', 'notifications']
    }
  ];

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = await prisma.user.upsert({
      where: { id: userData.id },
      update: {},
      create: {
        id: userData.id,
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        isActive: true,
        tenantId: tenant.id,
        hotelId: hotel.id
      }
    });

    // Permissions'ları ayrı olarak oluştur
    await prisma.userPermission.createMany({
      data: userData.permissions.map(pageName => ({
        userId: user.id,
        pageName
      })),
      skipDuplicates: true
    });

    console.log(`✅ User created: ${user.email}`);
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
