"use client";

import { useState } from 'react';
import { Upload, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ImportResult {
  success: boolean;
  message: string;
  details?: any;
}

export default function ImportDemoProductsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [importing, setImporting] = useState(false);

  // Demo ürünler (15 adet, çok dilli)
  const demoProducts = [
    {
      name: 'Akdeniz Kahvaltı Tabağı',
      description: 'Zeytinyağlı peynirler, taze domates, salatalık, ev yapımı reçeller ve sıcak bazlama ile dengeli kahvaltı tabağı.',
      price: 260,
      category: 'Kahvaltı',
      image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=900&q=80',
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
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
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
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
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
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80',
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
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80',
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
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
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
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
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
      image: 'https://images.unsplash.com/photo-1532550907401-a5c9e77e3856?auto=format&fit=crop&w=900&q=80',
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

  const handleImport = async () => {
    setLoading(true);
    setImporting(true);
    setResult(null);

    try {
      // Tenant slug'ını al
      const getTenantSlug = (): string => {
        if (typeof window === 'undefined') return 'demo';
        const hostname = window.location.hostname;
        const subdomain = hostname.split('.')[0];
        if (subdomain && subdomain !== 'www' && subdomain !== 'roomxqr' && subdomain !== 'roomxqr-backend') {
          return subdomain;
        }
        return 'demo';
      };

      const tenantSlug = getTenantSlug();
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

      if (!token) {
        setResult({
          success: false,
          message: 'Giriş yapmanız gerekiyor. Lütfen önce giriş yapın.',
          details: { redirect: '/login' }
        });
        setLoading(false);
        setImporting(false);
        return;
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-tenant': tenantSlug,
        'Authorization': `Bearer ${token}`
      };

      // Ürünleri backend'e gönder
      const response = await fetch('/api/menu/save', {
        method: 'POST',
        headers,
        body: JSON.stringify({ items: demoProducts })
      });

      const responseData = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: `Başarıyla ${demoProducts.length} ürün import edildi!`,
          details: {
            imported: responseData.items?.length || demoProducts.length,
            total: demoProducts.length
          }
        });

        // 2 saniye sonra menu sayfasına yönlendir
        setTimeout(() => {
          router.push('/isletme/menu');
        }, 2000);
      } else {
        setResult({
          success: false,
          message: responseData.message || responseData.error || 'Import hatası',
          details: responseData
        });
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: `Hata: ${error.message}`,
        details: error
      });
    } finally {
      setLoading(false);
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">Demo Ürünleri Import Et</h1>
          <p className="text-gray-600 mb-6">
            Bu sayfa demo tenant için 15 çok dilli ürünü (Türkçe, İngilizce, Almanca, Fransızca) veritabanına yükler.
          </p>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold mb-2">Import Edilecek Ürünler ({demoProducts.length} adet):</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {demoProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-gray-500">#{index + 1}</span>
                  <span className="font-medium">{product.name}</span>
                  <span className="text-gray-400">({product.category})</span>
                </div>
              ))}
            </div>
          </div>

          {result && (
            <div className={`mb-6 p-4 rounded-lg ${
              result.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.success ? 'Başarılı!' : 'Hata!'}
                  </h3>
                  <p className={`text-sm ${
                    result.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {result.message}
                  </p>
                  {result.details && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-xs text-gray-600 hover:text-gray-800">
                        Detayları Göster
                      </summary>
                      <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-48">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleImport}
              disabled={loading || importing}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading || importing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Import Ediliyor...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Demo Ürünleri Import Et
                </>
              )}
            </button>

            <button
              onClick={() => router.push('/isletme/menu')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
            >
              Menu Sayfasına Dön
            </button>
          </div>

          {importing && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Ürünler import ediliyor, lütfen bekleyin... Bu işlem birkaç saniye sürebilir.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Ürün Kategorileri</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Kahvaltı', 'Ana Yemekler', 'Mezeler', 'Tatlılar', 'İçecekler'].map((category) => {
              const count = demoProducts.filter(p => p.category === category).length;
              return (
                <div key={category} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{category}</div>
                  <div className="text-sm text-gray-600">{count} ürün</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

