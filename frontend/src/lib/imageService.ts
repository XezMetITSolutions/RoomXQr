// Ürün fotoğrafları için dinamik arama servisi
// Ürün adını İngilizce'ye çevirip Unsplash'tan uygun fotoğraf bulur

import { translateText } from './translateService';

// Kategori bazlı arama terimleri (İngilizce)
const categorySearchTerms: Record<string, string> = {
  'Kahvaltı': 'breakfast',
  'Breakfast': 'breakfast',
  'Ana Yemekler': 'main course',
  'Main Course': 'main course',
  'Mezeler': 'appetizer',
  'Appetizer': 'appetizer',
  'Tatlılar': 'dessert',
  'Dessert': 'dessert',
  'İçecekler': 'drink',
  'Beverage': 'drink',
  'Drink': 'drink',
  'Salata': 'salad',
  'Salad': 'salad',
  'Çorba': 'soup',
  'Soup': 'soup',
  'Pizza': 'pizza',
  'Burger': 'burger',
  'Sandwich': 'sandwich',
  'Köfte': 'meatball',
  'Meatball': 'meatball',
  'Kebap': 'kebab',
  'Kebab': 'kebab',
  'Pilav': 'rice',
  'Rice': 'rice',
  'Makarna': 'pasta',
  'Pasta': 'pasta',
  'Balık': 'fish',
  'Fish': 'fish',
  'Tavuk': 'chicken',
  'Chicken': 'chicken',
  'Et': 'meat',
  'Meat': 'meat',
  'Sebze': 'vegetable',
  'Vegetable': 'vegetable',
  'Kahve': 'coffee',
  'Coffee': 'coffee',
  'Çay': 'tea',
  'Tea': 'tea',
  'Meyve Suyu': 'juice',
  'Juice': 'juice',
  'Smoothie': 'smoothie',
  'Kek': 'cake',
  'Cake': 'cake',
  'Pasta': 'cake',
  'Dondurma': 'ice cream',
  'Ice Cream': 'ice cream',
  'Çikolata': 'chocolate',
  'Chocolate': 'chocolate',
};

// Ürün adından arama terimi oluştur
function extractSearchTerm(itemName: string, category?: string): string {
  const name = itemName.toLowerCase().trim();
  
  // Önce kategori bazlı arama terimi kontrol et
  if (category && categorySearchTerms[category]) {
    return categorySearchTerms[category];
  }
  
  // Ürün adından anahtar kelimeleri çıkar
  const keywords = [
    'burger', 'cheeseburger', 'hamburger',
    'pizza', 'margherita', 'pepperoni',
    'salad', 'caesar', 'salata',
    'soup', 'çorba',
    'pasta', 'spaghetti', 'makarna',
    'rice', 'pilav',
    'chicken', 'tavuk',
    'fish', 'balık',
    'meat', 'et', 'kebab', 'kebap', 'köfte',
    'coffee', 'kahve', 'cappuccino', 'espresso',
    'tea', 'çay',
    'juice', 'meyve suyu', 'orange juice', 'portakal suyu',
    'smoothie',
    'cake', 'kek', 'pasta',
    'dessert', 'tatlı', 'tiramisu',
    'ice cream', 'dondurma',
    'chocolate', 'çikolata',
    'breakfast', 'kahvaltı', 'omelet', 'omlet', 'yumurta', 'egg',
    'sandwich', 'sandviç',
    'appetizer', 'meze',
    'drink', 'içecek', 'beverage',
  ];
  
  for (const keyword of keywords) {
    if (name.includes(keyword)) {
      // İngilizce anahtar kelimeyi döndür
      const englishKeywords: Record<string, string> = {
        'burger': 'burger',
        'cheeseburger': 'cheeseburger',
        'hamburger': 'burger',
        'pizza': 'pizza',
        'margherita': 'pizza margherita',
        'pepperoni': 'pepperoni pizza',
        'salad': 'salad',
        'caesar': 'caesar salad',
        'salata': 'salad',
        'soup': 'soup',
        'çorba': 'soup',
        'pasta': 'pasta',
        'spaghetti': 'spaghetti',
        'makarna': 'pasta',
        'rice': 'rice dish',
        'pilav': 'rice dish',
        'chicken': 'chicken dish',
        'tavuk': 'chicken dish',
        'fish': 'fish dish',
        'balık': 'fish dish',
        'meat': 'meat dish',
        'et': 'meat dish',
        'kebab': 'kebab',
        'kebap': 'kebab',
        'köfte': 'meatball',
        'coffee': 'coffee',
        'kahve': 'coffee',
        'cappuccino': 'cappuccino',
        'espresso': 'espresso',
        'tea': 'tea',
        'çay': 'tea',
        'juice': 'juice',
        'meyve suyu': 'juice',
        'orange juice': 'orange juice',
        'portakal suyu': 'orange juice',
        'smoothie': 'smoothie',
        'cake': 'cake',
        'kek': 'cake',
        'dessert': 'dessert',
        'tatlı': 'dessert',
        'tiramisu': 'tiramisu',
        'ice cream': 'ice cream',
        'dondurma': 'ice cream',
        'chocolate': 'chocolate',
        'çikolata': 'chocolate',
        'breakfast': 'breakfast',
        'kahvaltı': 'breakfast',
        'omelet': 'omelet',
        'omlet': 'omelet',
        'yumurta': 'egg',
        'egg': 'egg',
        'sandwich': 'sandwich',
        'sandviç': 'sandwich',
        'appetizer': 'appetizer',
        'meze': 'appetizer',
        'drink': 'drink',
        'içecek': 'drink',
        'beverage': 'drink',
      };
      
      return englishKeywords[keyword] || keyword;
    }
  }
  
  // Eğer hiçbir anahtar kelime bulunamazsa, ürün adının kendisini döndür
  return name;
}

/**
 * Ürün için uygun fotoğraf URL'i oluşturur
 * Önce veritabanından gelen image'ı kontrol eder,
 * yoksa ürün adını İngilizce'ye çevirip Unsplash'tan dinamik arama yapar
 */
export async function getProductImageUrl(
  itemName: string,
  existingImage?: string,
  category?: string
): Promise<string> {
  // Eğer zaten bir image varsa, onu kullan
  if (existingImage && existingImage.trim() !== '') {
    return existingImage;
  }
  
  try {
    // Ürün adını İngilizce'ye çevir
    const englishName = await translateText(itemName, 'en');
    
    // Arama terimini oluştur
    let searchTerm = extractSearchTerm(englishName, category);
    
    // Eğer çeviri başarısız olduysa (orijinal metin döndüyse), Türkçe adı kullan
    if (englishName === itemName) {
      searchTerm = extractSearchTerm(itemName, category);
    }
    
    // Unsplash Source API kullanarak dinamik URL oluştur
    // Not: Unsplash Source API deprecated ama hala çalışıyor
    // Format: https://source.unsplash.com/800x600/?{search-term}
    const encodedTerm = encodeURIComponent(searchTerm);
    const imageUrl = `https://source.unsplash.com/800x600/?${encodedTerm}`;
    
    return imageUrl;
  } catch (error) {
    console.warn('Image URL oluşturma hatası:', error);
    // Hata durumunda boş string döndür (placeholder gösterilecek)
    return '';
  }
}

/**
 * Ürün adı ve kategorisinden direkt Unsplash arama URL'i oluşturur
 * (Çeviri yapmadan, daha hızlı)
 */
export function getQuickImageUrl(itemName: string, category?: string): string {
  const searchTerm = extractSearchTerm(itemName, category);
  const encodedTerm = encodeURIComponent(searchTerm);
  return `https://source.unsplash.com/800x600/?${encodedTerm}`;
}

