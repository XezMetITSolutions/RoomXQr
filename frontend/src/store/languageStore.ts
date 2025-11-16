import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export interface Translations {
  [key: string]: string;
}

// Dil tanımları
export const languages: Language[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' },
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
];

// Çeviri metinleri
export const translations: Record<string, Translations> = {
  tr: {
    // Menü başlıkları
    'menu.title': 'Oda Servisi Menüsü',
    'menu.back': 'Geri',
    'menu.search': 'Arama...',
    'menu.categories': 'Kategoriler',
    'menu.items': 'Ürünler',
    
    // Kategoriler
    'category.all': 'Tümü',
    'category.breakfast': 'Kahvaltı',
    'category.main': 'Ana Yemekler',
    'category.appetizer': 'Mezeler',
    'category.dessert': 'Tatlılar',
    'category.beverage': 'İçecekler',
    'category.snack': 'Atıştırmalıklar',
    'menu.subcategories': 'Alt Kategoriler',
    
    // Alt Kategoriler
    'subcategory.classic': 'Klasik',
    'subcategory.meat': 'Et',
    'subcategory.fish': 'Balık',
    'subcategory.hot': 'Sıcak',
    'subcategory.juice': 'Meyve Suyu',
    
    // Ürün bilgileri
    'product.price': '₺',
    'product.preparation': 'Hazırlık',
    'product.minutes': 'dk',
    'product.rating': 'Puan',
    'product.allergens': 'Alerjenler',
    'product.add_to_cart': 'Sepete Ekle',
    'product.quantity': 'Adet',
    'product.total': 'Toplam',
    'product.show_details': 'Detay',
    'product.show_less': 'Daha az göster',
    
    // Sepet
    'cart.title': 'Sepetim',
    'cart.empty': 'Sepetiniz boş',
    'cart.remove': 'Kaldır',
    'cart.checkout': 'Sipariş Ver',
    'cart.add_products': 'Ürün eklemek için menüden seçim yapın',
    
    // Anket/Değerlendirme
    'survey.title': 'Bizi Değerlendirin',
    'survey.cleanliness': 'Temizlik',
    'survey.service': 'Oda Servisi',
    'survey.staff': 'Personel',
    'survey.overall': 'Genel Memnuniyet',
    'survey.comment': 'Yorum (İsteğe Bağlı)',
    'survey.comment_placeholder': 'Deneyiminizi bizimle paylaşın...',
    'survey.submit': 'İşletmeye Gönderin',
    'survey.google_review': 'Google\'da Değerlendirin',
    'survey.thank_you': 'Teşekkürler!',
    'survey.submitted': 'Değerlendirmeniz başarıyla gönderildi.',
    
    // Bildirimler
    'notifications.housekeeping_title': 'Temizlik Talebi',
    'notifications.housekeeping_message': 'Oda temizliği talebiniz resepsiyona iletildi. En kısa sürede yanıtlanacaktır.',
    'notifications.housekeeping_description': 'Oda temizliği talep edildi',
    'notifications.maintenance_title': 'Teknik Arıza',
    'notifications.maintenance_message': 'Teknik arıza talebiniz resepsiyona iletildi. Acil durumlar için personelimiz yolda.',
    'notifications.maintenance_description': 'Teknik arıza bildirimi',
    'notifications.survey_title': 'Değerlendirme',
    'notifications.survey_thank_you': 'Yorumunuz için teşekkür ederiz! Geri bildiriminiz bizim için çok değerli.',
    'notifications.general_request_title': 'Genel Talep',
    
    // Genel
    'general.loading': 'Yükleniyor...',
    'general.error': 'Bir hata oluştu',
    'general.success': 'Başarılı',
    'general.cancel': 'İptal',
    'general.confirm': 'Onayla',
    'general.save': 'Kaydet',
    'general.edit': 'Düzenle',
    'general.delete': 'Sil',
    'general.no_products': 'Ürün Bulunamadı',
    'general.no_search_results': 'Arama kriterlerinize uygun ürün bulunamadı.',
    'general.no_category_products': 'Bu kategoride ürün bulunmuyor.',
    
    // Oda Arayüzü
    'room.welcome': 'Hoş Geldiniz',
    'room.services': 'Hizmetler',
    'room.room_service': 'Oda Servisi',
    'room.housekeeping': 'Temizlik',
    'room.maintenance': 'Bakım',
    'room.concierge': 'Concierge',
    'room.wifi': 'WiFi',
    'room.menu': 'Menü',
    'room.survey': 'Anket',
    'room.social_media': 'Sosyal Medya',
    'room.follow_us': 'Bizi Takip Edin',
    'room.quick_select': 'Hızlı seçim',
    'room.request_details': 'İstek Detayı',
    'room.quantity': 'Miktar',
    'room.send_request': 'İsteği Gönder',
    
    // Hızlı seçim öğeleri
    'quick.towel': 'Havlu',
    'quick.slippers': 'Terlik',
    'quick.toothpaste': 'Diş Macunu',
    'quick.pillow': 'Yastık',
    'quick.blanket': 'Battaniye',
    'quick.shampoo': 'Şampuan',
    'quick.soap': 'Sabun',
    'quick.water': 'Su',
    
    // Login
    'login.title': 'İşletme Paneline Giriş',
    'login.subtitle': 'Hesabınızla giriş yapın',
    'login.email': 'E-posta Adresi veya Kullanıcı Adı',
    'login.password': 'Şifre',
    'login.remember': 'Beni hatırla',
    'login.forgot': 'Şifremi unuttum',
    'login.submit': 'Giriş Yap',
    'login.submitting': 'Giriş yapılıyor...',
    'login.email_placeholder': 'ornek@email.com veya kullaniciadi',
    'login.password_placeholder': 'Şifrenizi girin',
    'login.error_invalid': 'Geçersiz email veya şifre',
    'login.error_general': 'Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.',
    'login.error_session': 'Giriş başarılı ancak oturum kaydedilemedi. Lütfen tekrar deneyin.',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Otel yönetim paneline hoş geldiniz',
    'dashboard.total_guests': 'Toplam Misafir',
    'dashboard.active_orders': 'Aktif Siparişler',
    'dashboard.pending_requests': 'Bekleyen Talepler',
    'dashboard.daily_revenue': 'Günlük Gelir',
    'dashboard.recent_orders': 'Son Siparişler',
    'dashboard.recent_requests': 'Son Talepler',
    'dashboard.no_orders': 'Henüz sipariş bulunmuyor',
    'dashboard.no_requests': 'Henüz talep bulunmuyor',
    'dashboard.view_all_orders': 'Tüm siparişleri görüntüle',
    'dashboard.view_all_requests': 'Tüm talepleri görüntüle',
    'dashboard.quick_actions': 'Hızlı İşlemler',
    'dashboard.create_qr': 'QR Kod Oluştur',
    'dashboard.edit_menu': 'Menü Düzenle',
    'dashboard.add_announcement': 'Duyuru Ekle',
    'dashboard.add_staff': 'Personel Ekle',
    'dashboard.view_reports': 'Rapor Görüntüle',
    'dashboard.social_media': 'Sosyal Medya',
    'dashboard.room': 'Oda',
    'dashboard.unknown_product': 'Bilinmeyen Ürün',
    'dashboard.product_id': 'Ürün #',
    
    // Sidebar
    'sidebar.business_panel': 'İşletme Paneli',
    'sidebar.management_system': 'Yönetim Sistemi',
    'sidebar.loading': 'Yükleniyor...',
    'sidebar.logout': 'Çıkış Yap',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.qr_generator': 'QR Kod Oluşturucu',
    'sidebar.menu_management': 'Menü Yönetimi',
    'sidebar.announcements': 'Duyurular',
    'sidebar.hotel_info': 'Otel Bilgileri',
    'sidebar.users': 'Kullanıcılar',
    'sidebar.notifications': 'Bildirimler',
    'sidebar.analytics': 'Analitik',
    'sidebar.settings': 'Ayarlar',
    
    // Page Titles
    'page.announcements.title': 'Duyuru Yönetimi',
    'page.announcements.subtitle': 'Misafirlere gösterilecek duyuruları yönetin',
    'page.notifications.title': 'Bildirimler',
    'page.notifications.subtitle': 'Sistem bildirimlerini yönetin',
    'page.analytics.title': 'Analitik & Raporlar',
    'page.analytics.subtitle': 'Performans metriklerini ve detaylı raporları görüntüleyin',
    'page.users.title': 'Kullanıcı Yönetimi',
    'page.users.subtitle': 'Personel hesaplarını yönetin ve yetkilendirin',
    'page.hotel_info.title': 'Otel Bilgileri',
    'page.hotel_info.subtitle': 'Misafirlerin göreceği bilgileri buradan yönetebilirsiniz',
    'page.settings.title': 'Ayarlar',
    'page.settings.subtitle': 'Sistem ayarlarını yönetin',
    
    // QR Kod Page
    'qr.select_room': 'Oda Seçimi',
    'qr.database_rooms': 'Veritabanı Odaları',
    'qr.generated_rooms': 'Oluşturulan Odalar',
    'qr.custom_rooms': 'Özel Odalar',
    'qr.add_custom_room': 'Yeni Özel Oda Ekle',
    'qr.room_placeholder': 'Örn: 201, 301, A101, Suite-1...',
    'qr.save': 'Kaydet',
    'qr.download': 'İndir',
    'qr.print': 'Yazdır',
    'qr.copy': 'Kopyala',
    'qr.copied': 'Kopyalandı!',
    'qr.create_rooms': 'Odaları Oluştur',
    'qr.rooms_created': 'oda oluşturuldu',
    'qr.no_rooms': 'Henüz oda bulunmuyor. Yukarıdaki "Odaları Oluştur" butonuna tıklayın.',
    'qr.loading_rooms': 'Odalar yükleniyor...',
    'qr.hotel_config': 'Otel Konfigürasyonu',
    'qr.floor_count': 'Kat Sayısı',
    'qr.rooms_per_floor': 'Her Katta Oda Sayısı',
    'qr.total': 'Toplam',
    'qr.example': 'Örnek',
    'qr.rooms_will_be_created': 'oda oluşturulacak',
    'page.qr.subtitle': 'Her oda için özel QR kod oluşturun ve yazdırın',
    
    // Common Buttons
    'common.add': 'Ekle',
    'common.edit': 'Düzenle',
    'common.delete': 'Sil',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.search': 'Ara',
    'common.filter': 'Filtrele',
    'common.all': 'Tümü',
    'common.active': 'Aktif',
    'common.inactive': 'Pasif',
    'common.loading': 'Yükleniyor...',
    'common.no_data': 'Veri bulunamadı',
    
    // Announcements Page
    'announcements.add': 'Duyuru Ekle',
    'announcements.filter': 'Filtrele:',
    'announcements.all': 'Tümü',
    'announcements.active': 'Aktif',
    'announcements.inactive': 'Pasif',
    'announcements.edit': 'Düzenle',
    'announcements.delete': 'Sil',
    'announcements.new': 'Yeni Duyuru Ekle',
    'announcements.edit_title': 'Duyuru Düzenle',
    'announcements.not_found': 'Duyuru bulunamadı',
    'announcements.not_found_desc': 'Yeni bir duyuru oluşturmak için "Duyuru Ekle" butonuna tıklayın.',
    'announcements.title_label': 'Başlık (Türkçe) *',
    'announcements.content_label': 'İçerik (Türkçe) *',
    'announcements.title_placeholder': 'Duyuru başlığı',
    'announcements.content_placeholder': 'Duyuru içeriği',
    'announcements.translations_title': 'Çok Dilli Çeviriler (Otomatik)',
    'announcements.start_date': 'Başlangıç',
    'announcements.end_date': 'Bitiş',
    'announcements.created_by': 'Oluşturan',
    'announcements.make_active': 'Aktif yap',
    'announcements.make_inactive': 'Pasif yap',
    
    // Users Page
    'users.add': 'Kullanıcı Ekle',
    'users.search_placeholder': 'Kullanıcı ara...',
    'users.table.user': 'Kullanıcı',
    'users.table.role': 'Rol',
    'users.table.contact': 'İletişim',
    'users.table.last_login': 'Son Giriş',
    'users.table.permissions': 'Yetkiler',
    'users.table.status': 'Durum',
    'users.table.actions': 'İşlemler',
    'users.loading': 'Kullanıcılar yükleniyor...',
    'users.not_found': 'Kullanıcı bulunamadı',
    'users.not_found_desc': 'Arama kriterlerinizi değiştirerek tekrar deneyin.',
    'users.manage_permissions': 'Yetkileri Yönet',
    'users.make_active': 'Aktif yap',
    'users.make_inactive': 'Pasif yap',
    'users.edit': 'Düzenle',
    'users.delete': 'Sil',
    'users.new_user': 'Yeni Kullanıcı Ekle',
    'users.edit_user': 'Kullanıcı Düzenle',
    'users.no_login': 'Hiç giriş yapmamış',
    'users.pages': 'sayfa',
    
    // Notifications Page
    'notifications.refresh': 'Yenile',
    'notifications.mark_all_read': 'Tümünü Okundu İşaretle',
    'notifications.total': 'Toplam Bildirim',
    'notifications.unread': 'Okunmamış',
    'notifications.read': 'Okunmuş',
    'notifications.search_placeholder': 'Bildirimlerde ara...',
    'notifications.not_found': 'Bildirim bulunamadı',
    'notifications.mark_read': 'Okundu olarak işaretle',
    'notifications.mark_unread': 'Okunmamış olarak işaretle',
    'notifications.new': 'Yeni',
    
    // Analytics Page
    'analytics.total_revenue': 'Toplam Gelir',
    'analytics.total_orders': 'Toplam Sipariş',
    'analytics.avg_order': 'Ortalama Sipariş',
    'analytics.active_guests': 'Aktif Misafir',
    'analytics.previous_period': 'önceki döneme göre',
    'analytics.download_report': 'Rapor İndir',
    'analytics.revenue_trend': 'Gelir Trendi',
    'analytics.category_distribution': 'Kategori Dağılımı',
    'analytics.recent_orders': 'Son Siparişler',
    'analytics.view_all': 'Tümünü Görüntüle',
    'analytics.order': 'Sipariş',
    'analytics.room': 'Oda',
    'analytics.amount': 'Tutar',
    'analytics.status': 'Durum',
    'analytics.chart_placeholder': 'Grafik buraya gelecek',
    'analytics.chart_note': 'Chart.js veya başka bir kütüphane ile',
    'analytics.orders': 'sipariş',
  },
  
  en: {
    // Menu titles
    'menu.title': 'Room Service Menu',
    'menu.back': 'Back',
    'menu.search': 'Search...',
    'menu.categories': 'Categories',
    'menu.items': 'Items',
    
    // Categories
    'category.all': 'All',
    'category.breakfast': 'Breakfast',
    'category.main': 'Main Dishes',
    'category.appetizer': 'Appetizers',
    'category.dessert': 'Desserts',
    'category.beverage': 'Beverages',
    'category.snack': 'Snacks',
    'menu.subcategories': 'Subcategories',
    
    // Subcategories
    'subcategory.classic': 'Classic',
    'subcategory.meat': 'Meat',
    'subcategory.fish': 'Fish',
    'subcategory.hot': 'Hot',
    'subcategory.juice': 'Juice',
    
    // Product info
    'product.price': '$',
    'product.preparation': 'Prep',
    'product.minutes': 'min',
    'product.rating': 'Rating',
    'product.allergens': 'Allergens',
    'product.add_to_cart': 'Add to Cart',
    'product.quantity': 'Quantity',
    'product.total': 'Total',
    'product.show_details': 'Details',
    'product.show_less': 'Show Less',
    
    // Cart
    'cart.title': 'My Cart',
    'cart.empty': 'Your cart is empty',
    'cart.remove': 'Remove',
    'cart.checkout': 'Checkout',
    'cart.add_products': 'Select items from the menu to add to cart',
    
    // General
    'general.loading': 'Loading...',
    'general.error': 'An error occurred',
    'general.success': 'Success',
    'general.cancel': 'Cancel',
    'general.confirm': 'Confirm',
    'general.save': 'Save',
    'general.edit': 'Edit',
    'general.delete': 'Delete',
    'general.no_products': 'No Products Found',
    'general.no_search_results': 'No products found matching your search criteria.',
    'general.no_category_products': 'No products available in this category.',
    
    // Room Interface
    'room.welcome': 'Welcome',
    'room.services': 'Services',
    'room.room_service': 'Room Service',
    'room.housekeeping': 'Housekeeping',
    'room.maintenance': 'Maintenance',
    'room.concierge': 'Concierge',
    'room.wifi': 'WiFi',
    'room.menu': 'Menu',
    'room.survey': 'Survey',
    'room.social_media': 'Social Media',
    'room.follow_us': 'Follow Us',
    'room.quick_select': 'Quick Select',
    'room.request_details': 'Request Details',
    'room.quantity': 'Quantity',
    'room.send_request': 'Send Request',
    
    // Quick select items
    'quick.towel': 'Towel',
    'quick.slippers': 'Slippers',
    'quick.toothpaste': 'Toothpaste',
    'quick.pillow': 'Pillow',
    'quick.blanket': 'Blanket',
    'quick.shampoo': 'Shampoo',
    'quick.soap': 'Soap',
    'quick.water': 'Water',
    
    // Login
    'login.title': 'Business Panel Login',
    'login.subtitle': 'Sign in to your account',
    'login.email': 'Email Address or Username',
    'login.password': 'Password',
    'login.remember': 'Remember me',
    'login.forgot': 'Forgot password',
    'login.submit': 'Sign In',
    'login.submitting': 'Signing in...',
    'login.email_placeholder': 'example@email.com or username',
    'login.password_placeholder': 'Enter your password',
    'login.error_invalid': 'Invalid email or password',
    'login.error_general': 'An error occurred during login. Please try again.',
    'login.error_session': 'Login successful but session could not be saved. Please try again.',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Welcome to the hotel management panel',
    'dashboard.total_guests': 'Total Guests',
    'dashboard.active_orders': 'Active Orders',
    'dashboard.pending_requests': 'Pending Requests',
    'dashboard.daily_revenue': 'Daily Revenue',
    'dashboard.recent_orders': 'Recent Orders',
    'dashboard.recent_requests': 'Recent Requests',
    'dashboard.no_orders': 'No orders yet',
    'dashboard.no_requests': 'No requests yet',
    'dashboard.view_all_orders': 'View all orders',
    'dashboard.view_all_requests': 'View all requests',
    'dashboard.quick_actions': 'Quick Actions',
    'dashboard.create_qr': 'Create QR Code',
    'dashboard.edit_menu': 'Edit Menu',
    'dashboard.add_announcement': 'Add Announcement',
    'dashboard.add_staff': 'Add Staff',
    'dashboard.view_reports': 'View Reports',
    'dashboard.social_media': 'Social Media',
    'dashboard.room': 'Room',
    'dashboard.unknown_product': 'Unknown Product',
    'dashboard.product_id': 'Product #',
    
    // Sidebar
    'sidebar.business_panel': 'Business Panel',
    'sidebar.management_system': 'Management System',
    'sidebar.loading': 'Loading...',
    'sidebar.logout': 'Logout',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.qr_generator': 'QR Code Generator',
    'sidebar.menu_management': 'Menu Management',
    'sidebar.announcements': 'Announcements',
    'sidebar.hotel_info': 'Hotel Information',
    'sidebar.users': 'Users',
    'sidebar.notifications': 'Notifications',
    'sidebar.analytics': 'Analytics',
    'sidebar.settings': 'Settings',
    
    // Page Titles
    'page.announcements.title': 'Announcement Management',
    'page.announcements.subtitle': 'Manage announcements to show to guests',
    'page.notifications.title': 'Notifications',
    'page.notifications.subtitle': 'Manage system notifications',
    'page.analytics.title': 'Analytics & Reports',
    'page.analytics.subtitle': 'View performance metrics and detailed reports',
    'page.users.title': 'User Management',
    'page.users.subtitle': 'Manage and authorize staff accounts',
    'page.hotel_info.title': 'Hotel Information',
    'page.hotel_info.subtitle': 'Manage information that guests will see',
    'page.settings.title': 'Settings',
    'page.settings.subtitle': 'Manage system settings',
    
    // QR Kod Page
    'qr.select_room': 'Select Room',
    'qr.database_rooms': 'Database Rooms',
    'qr.generated_rooms': 'Generated Rooms',
    'qr.custom_rooms': 'Custom Rooms',
    'qr.add_custom_room': 'Add New Custom Room',
    'qr.room_placeholder': 'E.g: 201, 301, A101, Suite-1...',
    'qr.save': 'Save',
    'qr.download': 'Download',
    'qr.print': 'Print',
    'qr.copy': 'Copy',
    'qr.copied': 'Copied!',
    'qr.create_rooms': 'Create Rooms',
    'qr.rooms_created': 'rooms created',
    'qr.no_rooms': 'No rooms found yet. Click the "Create Rooms" button above.',
    'qr.loading_rooms': 'Loading rooms...',
    'qr.hotel_config': 'Hotel Configuration',
    'qr.floor_count': 'Floor Count',
    'qr.rooms_per_floor': 'Rooms Per Floor',
    'qr.total': 'Total',
    'qr.example': 'Example',
    'qr.rooms_will_be_created': 'rooms will be created',
    'page.qr.subtitle': 'Create and print custom QR codes for each room',
    
    // Common Buttons
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.loading': 'Loading...',
    'common.no_data': 'No data found',
    
    // Announcements Page
    'announcements.add': 'Add Announcement',
    'announcements.filter': 'Filter:',
    'announcements.all': 'All',
    'announcements.active': 'Active',
    'announcements.inactive': 'Inactive',
    'announcements.edit': 'Edit',
    'announcements.delete': 'Delete',
    'announcements.new': 'Add New Announcement',
    'announcements.edit_title': 'Edit Announcement',
    'announcements.not_found': 'No announcements found',
    'announcements.not_found_desc': 'Click the "Add Announcement" button to create a new announcement.',
    'announcements.title_label': 'Title (Turkish) *',
    'announcements.content_label': 'Content (Turkish) *',
    'announcements.title_placeholder': 'Announcement title',
    'announcements.content_placeholder': 'Announcement content',
    'announcements.translations_title': 'Multi-language Translations (Automatic)',
    'announcements.start_date': 'Start',
    'announcements.end_date': 'End',
    'announcements.created_by': 'Created by',
    'announcements.make_active': 'Make Active',
    'announcements.make_inactive': 'Make Inactive',
    
    // Users Page
    'users.add': 'Add User',
    'users.search_placeholder': 'Search users...',
    'users.table.user': 'User',
    'users.table.role': 'Role',
    'users.table.contact': 'Contact',
    'users.table.last_login': 'Last Login',
    'users.table.permissions': 'Permissions',
    'users.table.status': 'Status',
    'users.table.actions': 'Actions',
    'users.loading': 'Loading users...',
    'users.not_found': 'User not found',
    'users.not_found_desc': 'Try changing your search criteria.',
    'users.manage_permissions': 'Manage Permissions',
    'users.make_active': 'Make Active',
    'users.make_inactive': 'Make Inactive',
    'users.edit': 'Edit',
    'users.delete': 'Delete',
    'users.new_user': 'Add New User',
    'users.edit_user': 'Edit User',
    'users.no_login': 'Never logged in',
    'users.pages': 'pages',
    
    // Notifications Page
    'notifications.refresh': 'Refresh',
    'notifications.mark_all_read': 'Mark All as Read',
    'notifications.total': 'Total Notifications',
    'notifications.unread': 'Unread',
    'notifications.read': 'Read',
    'notifications.search_placeholder': 'Search notifications...',
    'notifications.not_found': 'No notifications found',
    'notifications.mark_read': 'Mark as Read',
    'notifications.mark_unread': 'Mark as Unread',
    'notifications.new': 'New',
    
    // Analytics Page
    'analytics.total_revenue': 'Total Revenue',
    'analytics.total_orders': 'Total Orders',
    'analytics.avg_order': 'Average Order',
    'analytics.active_guests': 'Active Guests',
    'analytics.previous_period': 'vs previous period',
    'analytics.download_report': 'Download Report',
    'analytics.revenue_trend': 'Revenue Trend',
    'analytics.category_distribution': 'Category Distribution',
    'analytics.recent_orders': 'Recent Orders',
    'analytics.view_all': 'View All',
    'analytics.order': 'Order',
    'analytics.room': 'Room',
    'analytics.amount': 'Amount',
    'analytics.status': 'Status',
    'analytics.chart_placeholder': 'Chart will appear here',
    'analytics.chart_note': 'Using Chart.js or another library',
    'analytics.orders': 'orders',
    
    // Survey/Evaluation
    'survey.title': 'Rate Us',
    'survey.cleanliness': 'Cleanliness',
    'survey.service': 'Room Service',
    'survey.staff': 'Staff',
    'survey.overall': 'Overall Satisfaction',
    'survey.comment': 'Comment (Optional)',
    'survey.comment_placeholder': 'Share your experience with us...',
    'survey.submit': 'Submit to Business',
    'survey.google_review': 'Review on Google',
    'survey.thank_you': 'Thank You!',
    'survey.submitted': 'Your evaluation has been submitted successfully.',
    
    // Notifications
    'notifications.housekeeping_title': 'Housekeeping Request',
    'notifications.housekeeping_message': 'Your housekeeping request has been sent to reception. You will receive a response shortly.',
    'notifications.housekeeping_description': 'Housekeeping requested',
    'notifications.maintenance_title': 'Technical Issue',
    'notifications.maintenance_message': 'Your technical issue request has been sent to reception. Our staff is on the way for emergencies.',
    'notifications.maintenance_description': 'Technical issue reported',
    'notifications.survey_title': 'Evaluation',
    'notifications.survey_thank_you': 'Thank you for your comment! Your feedback is very valuable to us.',
    'notifications.general_request_title': 'General Request',
  },
  
  ru: {
    // Заголовки меню
    'menu.title': 'Меню Обслуживания',
    'menu.back': 'Назад',
    'menu.search': 'Поиск...',
    'menu.categories': 'Категории',
    'menu.items': 'Блюда',
    
    // Категории
    'category.all': 'Все',
    'category.breakfast': 'Завтрак',
    'category.main': 'Основные Блюда',
    'category.appetizer': 'Закуски',
    'category.dessert': 'Десерты',
    'category.beverage': 'Напитки',
    'category.snack': 'Закуски',
    'menu.subcategories': 'Подкатегории',
    
    // Подкатегории
    'subcategory.classic': 'Классические',
    'subcategory.meat': 'Мясные',
    'subcategory.fish': 'Рыбные',
    'subcategory.hot': 'Горячие',
    'subcategory.juice': 'Соки',
    
    // Информация о продукте
    'product.price': '₽',
    'product.preparation': 'Готовка',
    'product.minutes': 'мин',
    'product.rating': 'Рейтинг',
    'product.allergens': 'Аллергены',
    'product.add_to_cart': 'В Корзину',
    'product.quantity': 'Количество',
    'product.total': 'Итого',
    'product.show_details': 'Подробности',
    'product.show_less': 'Скрыть',
    
    // Корзина
    'cart.title': 'Моя Корзина',
    'cart.empty': 'Ваша корзина пуста',
    'cart.remove': 'Удалить',
    'cart.checkout': 'Оформить',
    'cart.add_products': 'Выберите блюда из меню для добавления в корзину',
    
    // Общее
    'general.loading': 'Загрузка...',
    'general.error': 'Произошла ошибка',
    'general.success': 'Успешно',
    'general.cancel': 'Отмена',
    'general.confirm': 'Подтвердить',
    'general.save': 'Сохранить',
    'general.edit': 'Редактировать',
    'general.delete': 'Удалить',
    'general.no_products': 'Товары не найдены',
    'general.no_search_results': 'По вашему запросу товары не найдены.',
    'general.no_category_products': 'В этой категории нет товаров.',
    
    // Интерфейс Номера
    'room.welcome': 'Добро пожаловать',
    'room.services': 'Услуги',
    'room.room_service': 'Обслуживание в номере',
    'room.housekeeping': 'Уборка',
    'room.maintenance': 'Техническое обслуживание',
    'room.concierge': 'Консьерж',
    'room.wifi': 'WiFi',
    'room.menu': 'Меню',
    'room.survey': 'Опрос',
    'room.social_media': 'Социальные сети',
    'room.follow_us': 'Подписывайтесь на нас',
    'room.quick_select': 'Быстрый выбор',
    'room.request_details': 'Детали запроса',
    'room.quantity': 'Количество',
    'room.send_request': 'Отправить запрос',
    
    // Быстрый выбор
    'quick.towel': 'Полотенце',
    'quick.slippers': 'Тапочки',
    'quick.toothpaste': 'Зубная паста',
    'quick.pillow': 'Подушка',
    'quick.blanket': 'Одеяло',
    'quick.shampoo': 'Шампунь',
    'quick.soap': 'Мыло',
    'quick.water': 'Вода',
    
    // Опрос/Оценка
    'survey.title': 'Оцените нас',
    'survey.cleanliness': 'Чистота',
    'survey.service': 'Обслуживание в номере',
    'survey.staff': 'Персонал',
    'survey.overall': 'Общее удовлетворение',
    'survey.comment': 'Комментарий (необязательно)',
    'survey.comment_placeholder': 'Поделитесь своим опытом с нами...',
    'survey.submit': 'Отправить в отель',
    'survey.google_review': 'Оценить в Google',
    'survey.thank_you': 'Спасибо!',
    'survey.submitted': 'Ваша оценка успешно отправлена.',
    
    // Уведомления
    'notifications.housekeeping_title': 'Запрос на уборку',
    'notifications.housekeeping_message': 'Ваш запрос на уборку передан на ресепшн. Вам ответят в ближайшее время.',
    'notifications.housekeeping_description': 'Запрошена уборка',
    'notifications.maintenance_title': 'Техническая проблема',
    'notifications.maintenance_message': 'Ваш запрос о технической проблеме передан на ресепшн. Наш персонал в пути для экстренных случаев.',
    'notifications.maintenance_description': 'Сообщена техническая проблема',
    'notifications.survey_title': 'Оценка',
    'notifications.survey_thank_you': 'Спасибо за ваш комментарий! Ваш отзыв очень ценен для нас.',
    'notifications.general_request_title': 'Общий запрос',
  },
  
  ar: {
    // عناوين القائمة
    'menu.title': 'قائمة خدمة الغرف',
    'menu.back': 'رجوع',
    'menu.search': 'بحث...',
    'menu.categories': 'الفئات',
    'menu.items': 'العناصر',
    
    // الفئات
    'category.all': 'الكل',
    'category.breakfast': 'الإفطار',
    'category.main': 'الأطباق الرئيسية',
    'category.appetizer': 'المقبلات',
    'category.dessert': 'الحلويات',
    'category.beverage': 'المشروبات',
    'category.snack': 'الوجبات الخفيفة',
    'menu.subcategories': 'الفئات الفرعية',
    
    // الفئات الفرعية
    'subcategory.classic': 'كلاسيكي',
    'subcategory.meat': 'لحوم',
    'subcategory.fish': 'أسماك',
    'subcategory.hot': 'ساخن',
    'subcategory.juice': 'عصائر',
    
    // معلومات المنتج
    'product.price': 'ريال',
    'product.preparation': 'التحضير',
    'product.minutes': 'دقيقة',
    'product.rating': 'التقييم',
    'product.allergens': 'مسببات الحساسية',
    'product.add_to_cart': 'أضف للسلة',
    'product.quantity': 'الكمية',
    'product.total': 'المجموع',
    'product.show_details': 'التفاصيل',
    'product.show_less': 'عرض أقل',
    
    // السلة
    'cart.title': 'سلتي',
    'cart.empty': 'سلتك فارغة',
    'cart.remove': 'إزالة',
    'cart.checkout': 'الدفع',
    'cart.add_products': 'اختر العناصر من القائمة لإضافتها إلى السلة',
    
    // عام
    'general.loading': 'جاري التحميل...',
    'general.error': 'حدث خطأ',
    'general.success': 'نجح',
    'general.cancel': 'إلغاء',
    'general.confirm': 'تأكيد',
    'general.save': 'حفظ',
    'general.edit': 'تعديل',
    'general.delete': 'حذف',
    'general.no_products': 'لم يتم العثور على منتجات',
    'general.no_search_results': 'لم يتم العثور على منتجات تطابق معايير البحث الخاصة بك.',
    'general.no_category_products': 'لا توجد منتجات متاحة في هذه الفئة.',
    
    // واجهة الغرفة
    'room.welcome': 'مرحباً',
    'room.services': 'الخدمات',
    'room.room_service': 'خدمة الغرف',
    'room.housekeeping': 'التنظيف',
    'room.maintenance': 'الصيانة',
    'room.concierge': 'الكونسيرج',
    'room.wifi': 'واي فاي',
    'room.menu': 'القائمة',
    'room.survey': 'الاستطلاع',
    'room.social_media': 'وسائل التواصل الاجتماعي',
    'room.follow_us': 'تابعونا',
    'room.quick_select': 'اختيار سريع',
    'room.request_details': 'تفاصيل الطلب',
    'room.quantity': 'الكمية',
    'room.send_request': 'إرسال الطلب',
    
    // الاختيار السريع
    'quick.towel': 'منشفة',
    'quick.slippers': 'نعال',
    'quick.toothpaste': 'معجون أسنان',
    'quick.pillow': 'وسادة',
    'quick.blanket': 'بطانية',
    'quick.shampoo': 'شامبو',
    'quick.soap': 'صابون',
    'quick.water': 'ماء',
    
    // الاستطلاع/التقييم
    'survey.title': 'قيمنا',
    'survey.cleanliness': 'النظافة',
    'survey.service': 'خدمة الغرف',
    'survey.staff': 'الموظفون',
    'survey.overall': 'الرضا العام',
    'survey.comment': 'تعليق (اختياري)',
    'survey.comment_placeholder': 'شاركنا تجربتك...',
    'survey.submit': 'إرسال للفندق',
    'survey.google_review': 'تقييم على جوجل',
    'survey.thank_you': 'شكراً لك!',
    'survey.submitted': 'تم إرسال تقييمك بنجاح.',
    
    // الإشعارات
    'notifications.housekeeping_title': 'طلب التنظيف',
    'notifications.housekeeping_message': 'تم إرسال طلب التنظيف إلى الاستقبال. ستحصل على رد قريباً.',
    'notifications.housekeeping_description': 'طلب التنظيف',
    'notifications.maintenance_title': 'مشكلة تقنية',
    'notifications.maintenance_message': 'تم إرسال طلب المشكلة التقنية إلى الاستقبال. موظفونا في الطريق للحالات الطارئة.',
    'notifications.maintenance_description': 'تم الإبلاغ عن مشكلة تقنية',
    'notifications.survey_title': 'التقييم',
    'notifications.survey_thank_you': 'شكراً لك على تعليقك! ملاحظاتك ثمينة جداً بالنسبة لنا.',
    'notifications.general_request_title': 'طلب عام',
  },
  
  de: {
    // Menü-Titel
    'menu.title': 'Zimmerservice-Menü',
    'menu.back': 'Zurück',
    'menu.search': 'Suchen...',
    'menu.categories': 'Kategorien',
    'menu.items': 'Gerichte',
    
    // Kategorien
    'category.all': 'Alle',
    'category.breakfast': 'Frühstück',
    'category.main': 'Hauptgerichte',
    'category.appetizer': 'Vorspeisen',
    'category.dessert': 'Desserts',
    'category.beverage': 'Getränke',
    'category.snack': 'Snacks',
    'menu.subcategories': 'Unterkategorien',
    
    // Unterkategorien
    'subcategory.classic': 'Klassisch',
    'subcategory.meat': 'Fleisch',
    'subcategory.fish': 'Fisch',
    'subcategory.hot': 'Heiß',
    'subcategory.juice': 'Saft',
    
    // Produktinformationen
    'product.price': '€',
    'product.preparation': 'Zubereitung',
    'product.minutes': 'Min',
    'product.rating': 'Bewertung',
    'product.allergens': 'Allergene',
    'product.add_to_cart': 'In den Warenkorb',
    'product.quantity': 'Menge',
    'product.total': 'Gesamt',
    
    // Warenkorb
    'cart.title': 'Mein Warenkorb',
    'cart.empty': 'Ihr Warenkorb ist leer',
    'cart.remove': 'Entfernen',
    'cart.checkout': 'Zur Kasse',
    
    // Allgemein
    'general.loading': 'Wird geladen...',
    'general.error': 'Ein Fehler ist aufgetreten',
    'general.success': 'Erfolgreich',
    'general.cancel': 'Abbrechen',
    'general.confirm': 'Bestätigen',
    'general.save': 'Speichern',
    'general.edit': 'Bearbeiten',
    'general.delete': 'Löschen',
    'general.no_products': 'Keine Produkte gefunden',
    'general.no_search_results': 'Keine Produkte gefunden, die Ihren Suchkriterien entsprechen.',
    'general.no_category_products': 'Keine Produkte in dieser Kategorie verfügbar.',
    
    // Zimmer-Interface
    'room.welcome': 'Willkommen',
    'room.services': 'Dienstleistungen',
    'room.room_service': 'Zimmerservice',
    'room.housekeeping': 'Hausreinigung',
    'room.maintenance': 'Wartung',
    'room.concierge': 'Concierge',
    'room.wifi': 'WiFi',
    'room.menu': 'Menü',
    'room.survey': 'Umfrage',
    'room.social_media': 'Soziale Medien',
    'room.follow_us': 'Folgen Sie uns',
    'room.quick_select': 'Schnellauswahl',
    'room.request_details': 'Anfrage-Details',
    'room.quantity': 'Anzahl',
    'room.send_request': 'Anfrage senden',
    
    // Schnellauswahl
    'quick.towel': 'Handtuch',
    'quick.slippers': 'Hausschuhe',
    'quick.toothpaste': 'Zahnpasta',
    'quick.pillow': 'Kissen',
    'quick.blanket': 'Decke',
    'quick.shampoo': 'Shampoo',
    'quick.soap': 'Seife',
    'quick.water': 'Wasser',
    
    // Login
    'login.title': 'Geschäftspanel-Anmeldung',
    'login.subtitle': 'Melden Sie sich mit Ihrem Konto an',
    'login.email': 'E-Mail-Adresse oder Benutzername',
    'login.password': 'Passwort',
    'login.remember': 'Angemeldet bleiben',
    'login.forgot': 'Passwort vergessen',
    'login.submit': 'Anmelden',
    'login.submitting': 'Wird angemeldet...',
    'login.email_placeholder': 'beispiel@email.com oder benutzername',
    'login.password_placeholder': 'Geben Sie Ihr Passwort ein',
    'login.error_invalid': 'Ungültige E-Mail oder Passwort',
    'login.error_general': 'Bei der Anmeldung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    'login.error_session': 'Anmeldung erfolgreich, aber Sitzung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Willkommen im Hotel-Verwaltungspanel',
    'dashboard.total_guests': 'Gesamte Gäste',
    'dashboard.active_orders': 'Aktive Bestellungen',
    'dashboard.pending_requests': 'Ausstehende Anfragen',
    'dashboard.daily_revenue': 'Täglicher Umsatz',
    'dashboard.recent_orders': 'Letzte Bestellungen',
    'dashboard.recent_requests': 'Letzte Anfragen',
    'dashboard.no_orders': 'Noch keine Bestellungen',
    'dashboard.no_requests': 'Noch keine Anfragen',
    'dashboard.view_all_orders': 'Alle Bestellungen anzeigen',
    'dashboard.view_all_requests': 'Alle Anfragen anzeigen',
    'dashboard.quick_actions': 'Schnellaktionen',
    'dashboard.create_qr': 'QR-Code erstellen',
    'dashboard.edit_menu': 'Menü bearbeiten',
    'dashboard.add_announcement': 'Ankündigung hinzufügen',
    'dashboard.add_staff': 'Personal hinzufügen',
    'dashboard.view_reports': 'Berichte anzeigen',
    'dashboard.social_media': 'Soziale Medien',
    'dashboard.room': 'Zimmer',
    'dashboard.unknown_product': 'Unbekanntes Produkt',
    'dashboard.product_id': 'Produkt #',
    
    // Sidebar
    'sidebar.business_panel': 'Geschäftspanel',
    'sidebar.management_system': 'Verwaltungssystem',
    'sidebar.loading': 'Wird geladen...',
    'sidebar.logout': 'Abmelden',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.qr_generator': 'QR-Code-Generator',
    'sidebar.menu_management': 'Menüverwaltung',
    'sidebar.announcements': 'Ankündigungen',
    'sidebar.hotel_info': 'Hotelinformationen',
    'sidebar.users': 'Benutzer',
    'sidebar.notifications': 'Benachrichtigungen',
    'sidebar.analytics': 'Analytik',
    'sidebar.settings': 'Einstellungen',
    
    // Page Titles
    'page.announcements.title': 'Ankündigungsverwaltung',
    'page.announcements.subtitle': 'Verwalten Sie Ankündigungen für Gäste',
    'page.notifications.title': 'Benachrichtigungen',
    'page.notifications.subtitle': 'Systembenachrichtigungen verwalten',
    'page.analytics.title': 'Analytik & Berichte',
    'page.analytics.subtitle': 'Leistungsmetriken und detaillierte Berichte anzeigen',
    'page.users.title': 'Benutzerverwaltung',
    'page.users.subtitle': 'Personalverwaltung und Autorisierung',
    'page.hotel_info.title': 'Hotelinformationen',
    'page.hotel_info.subtitle': 'Verwalten Sie Informationen, die Gäste sehen werden',
    'page.settings.title': 'Einstellungen',
    'page.settings.subtitle': 'Systemeinstellungen verwalten',
    
    // QR Kod Page
    'qr.select_room': 'Zimmer auswählen',
    'qr.database_rooms': 'Datenbank-Zimmer',
    'qr.generated_rooms': 'Generierte Zimmer',
    'qr.custom_rooms': 'Benutzerdefinierte Zimmer',
    'qr.add_custom_room': 'Neues benutzerdefiniertes Zimmer hinzufügen',
    'qr.room_placeholder': 'Z.B: 201, 301, A101, Suite-1...',
    'qr.save': 'Speichern',
    'qr.download': 'Herunterladen',
    'qr.print': 'Drucken',
    'qr.copy': 'Kopieren',
    'qr.copied': 'Kopiert!',
    'qr.create_rooms': 'Zimmer erstellen',
    'qr.rooms_created': 'Zimmer erstellt',
    'qr.no_rooms': 'Noch keine Zimmer gefunden. Klicken Sie auf die Schaltfläche "Zimmer erstellen" oben.',
    'qr.loading_rooms': 'Zimmer werden geladen...',
    'qr.hotel_config': 'Hotel-Konfiguration',
    'qr.floor_count': 'Anzahl der Etagen',
    'qr.rooms_per_floor': 'Zimmer pro Etage',
    'qr.total': 'Gesamt',
    'qr.example': 'Beispiel',
    'qr.rooms_will_be_created': 'Zimmer werden erstellt',
    'page.qr.subtitle': 'Erstellen und drucken Sie benutzerdefinierte QR-Codes für jedes Zimmer',
    
    // Common Buttons
    'common.add': 'Hinzufügen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.search': 'Suchen',
    'common.filter': 'Filtern',
    'common.all': 'Alle',
    'common.active': 'Aktiv',
    'common.inactive': 'Inaktiv',
    'common.loading': 'Wird geladen...',
    'common.no_data': 'Keine Daten gefunden',
    
    // Announcements Page
    'announcements.add': 'Ankündigung hinzufügen',
    'announcements.filter': 'Filtern:',
    'announcements.all': 'Alle',
    'announcements.active': 'Aktiv',
    'announcements.inactive': 'Inaktiv',
    'announcements.edit': 'Bearbeiten',
    'announcements.delete': 'Löschen',
    'announcements.new': 'Neue Ankündigung hinzufügen',
    'announcements.edit_title': 'Ankündigung bearbeiten',
    'announcements.not_found': 'Keine Ankündigungen gefunden',
    'announcements.not_found_desc': 'Klicken Sie auf die Schaltfläche "Ankündigung hinzufügen", um eine neue Ankündigung zu erstellen.',
    'announcements.title_label': 'Titel (Türkisch) *',
    'announcements.content_label': 'Inhalt (Türkisch) *',
    'announcements.title_placeholder': 'Ankündigungstitel',
    'announcements.content_placeholder': 'Ankündigungsinhalt',
    'announcements.translations_title': 'Mehrsprachige Übersetzungen (Automatisch)',
    'announcements.start_date': 'Start',
    'announcements.end_date': 'Ende',
    'announcements.created_by': 'Erstellt von',
    'announcements.make_active': 'Aktivieren',
    'announcements.make_inactive': 'Deaktivieren',
    
    // Users Page
    'users.add': 'Benutzer hinzufügen',
    'users.search_placeholder': 'Benutzer suchen...',
    'users.table.user': 'Benutzer',
    'users.table.role': 'Rolle',
    'users.table.contact': 'Kontakt',
    'users.table.last_login': 'Letzter Login',
    'users.table.permissions': 'Berechtigungen',
    'users.table.status': 'Status',
    'users.table.actions': 'Aktionen',
    'users.loading': 'Benutzer werden geladen...',
    'users.not_found': 'Benutzer nicht gefunden',
    'users.not_found_desc': 'Versuchen Sie, Ihre Suchkriterien zu ändern.',
    'users.manage_permissions': 'Berechtigungen verwalten',
    'users.make_active': 'Aktivieren',
    'users.make_inactive': 'Deaktivieren',
    'users.edit': 'Bearbeiten',
    'users.delete': 'Löschen',
    'users.new_user': 'Neuen Benutzer hinzufügen',
    'users.edit_user': 'Benutzer bearbeiten',
    'users.no_login': 'Nie eingeloggt',
    'users.pages': 'Seiten',
    
    // Notifications Page
    'notifications.refresh': 'Aktualisieren',
    'notifications.mark_all_read': 'Alle als gelesen markieren',
    'notifications.total': 'Gesamt Benachrichtigungen',
    'notifications.unread': 'Ungelesen',
    'notifications.read': 'Gelesen',
    'notifications.search_placeholder': 'Benachrichtigungen suchen...',
    'notifications.not_found': 'Keine Benachrichtigungen gefunden',
    'notifications.mark_read': 'Als gelesen markieren',
    'notifications.mark_unread': 'Als ungelesen markieren',
    'notifications.new': 'Neu',
    
    // Analytics Page
    'analytics.total_revenue': 'Gesamteinnahmen',
    'analytics.total_orders': 'Gesamtbestellungen',
    'analytics.avg_order': 'Durchschnittliche Bestellung',
    'analytics.active_guests': 'Aktive Gäste',
    'analytics.previous_period': 'im Vergleich zur Vorperiode',
    'analytics.download_report': 'Bericht herunterladen',
    'analytics.revenue_trend': 'Umsatztrend',
    'analytics.category_distribution': 'Kategorieverteilung',
    'analytics.recent_orders': 'Letzte Bestellungen',
    'analytics.view_all': 'Alle anzeigen',
    'analytics.order': 'Bestellung',
    'analytics.room': 'Zimmer',
    'analytics.amount': 'Betrag',
    'analytics.status': 'Status',
    'analytics.chart_placeholder': 'Diagramm wird hier angezeigt',
    'analytics.chart_note': 'Mit Chart.js oder einer anderen Bibliothek',
    'analytics.orders': 'Bestellungen',
    
    // Umfrage/Bewertung
    'survey.title': 'Bewerten Sie uns',
    'survey.cleanliness': 'Sauberkeit',
    'survey.service': 'Zimmerservice',
    'survey.staff': 'Personal',
    'survey.overall': 'Gesamtzufriedenheit',
    'survey.comment': 'Kommentar (optional)',
    'survey.comment_placeholder': 'Teilen Sie Ihre Erfahrung mit uns...',
    'survey.submit': 'An Hotel senden',
    'survey.google_review': 'Bei Google bewerten',
    'survey.thank_you': 'Vielen Dank!',
    'survey.submitted': 'Ihre Bewertung wurde erfolgreich gesendet.',
    
    // Benachrichtigungen
    'notifications.housekeeping_title': 'Zimmerservice-Anfrage',
    'notifications.housekeeping_message': 'Ihre Zimmerservice-Anfrage wurde an die Rezeption gesendet. Sie erhalten bald eine Antwort.',
    'notifications.housekeeping_description': 'Zimmerservice angefordert',
    'notifications.maintenance_title': 'Technisches Problem',
    'notifications.maintenance_message': 'Ihre Anfrage zu einem technischen Problem wurde an die Rezeption gesendet. Unser Personal ist für Notfälle unterwegs.',
    'notifications.maintenance_description': 'Technisches Problem gemeldet',
    'notifications.survey_title': 'Bewertung',
    'notifications.survey_thank_you': 'Vielen Dank für Ihren Kommentar! Ihr Feedback ist sehr wertvoll für uns.',
    'notifications.general_request_title': 'Allgemeine Anfrage',
  },
  
  fr: {
    // Titres de menu
    'menu.title': 'Menu Service Chambre',
    'menu.back': 'Retour',
    'menu.search': 'Recherche...',
    'menu.categories': 'Catégories',
    'menu.items': 'Articles',
    
    // Catégories
    'category.all': 'Tous',
    'category.breakfast': 'Petit-déjeuner',
    'category.main': 'Plats Principaux',
    'category.appetizer': 'Entrées',
    'category.dessert': 'Desserts',
    'category.beverage': 'Boissons',
    'category.snack': 'Collations',
    'menu.subcategories': 'Sous-catégories',
    
    // Sous-catégories
    'subcategory.classic': 'Classique',
    'subcategory.meat': 'Viande',
    'subcategory.fish': 'Poisson',
    'subcategory.hot': 'Chaud',
    'subcategory.juice': 'Jus',
    
    // Informations produit
    'product.price': '€',
    'product.preparation': 'Préparation',
    'product.minutes': 'min',
    'product.rating': 'Note',
    'product.allergens': 'Allergènes',
    'product.add_to_cart': 'Ajouter au Panier',
    'product.quantity': 'Quantité',
    'product.total': 'Total',
    'product.show_details': 'Détails',
    'product.show_less': 'Afficher Moins',
    
    // Panier
    'cart.title': 'Mon Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.remove': 'Supprimer',
    'cart.checkout': 'Commander',
    'cart.add_products': 'Sélectionnez des articles du menu pour les ajouter au panier',
    
    // Général
    'general.loading': 'Chargement...',
    'general.error': 'Une erreur s\'est produite',
    'general.success': 'Succès',
    'general.cancel': 'Annuler',
    'general.confirm': 'Confirmer',
    'general.save': 'Enregistrer',
    'general.edit': 'Modifier',
    'general.delete': 'Supprimer',
    'general.no_products': 'Aucun Produit Trouvé',
    'general.no_search_results': 'Aucun produit trouvé correspondant à vos critères de recherche.',
    'general.no_category_products': 'Aucun produit disponible dans cette catégorie.',
    
    // Interface Chambre
    'room.welcome': 'Bienvenue',
    'room.services': 'Services',
    'room.room_service': 'Service Chambre',
    'room.housekeeping': 'Ménage',
    'room.maintenance': 'Maintenance',
    'room.concierge': 'Concierge',
    'room.wifi': 'WiFi',
    'room.menu': 'Menu',
    'room.survey': 'Enquête',
    'room.social_media': 'Réseaux Sociaux',
    'room.follow_us': 'Suivez-nous',
    'room.quick_select': 'Sélection Rapide',
    'room.request_details': 'Détails de la Demande',
    'room.quantity': 'Quantité',
    'room.send_request': 'Envoyer la Demande',
    
    // Sélection rapide
    'quick.towel': 'Serviette',
    'quick.slippers': 'Pantoufles',
    'quick.toothpaste': 'Dentifrice',
    'quick.pillow': 'Oreiller',
    'quick.blanket': 'Couverture',
    'quick.shampoo': 'Shampoing',
    'quick.soap': 'Savon',
    'quick.water': 'Eau',
    
    // Login
    'login.title': 'Connexion au Panneau d\'Administration',
    'login.subtitle': 'Connectez-vous à votre compte',
    'login.email': 'Adresse e-mail ou nom d\'utilisateur',
    'login.password': 'Mot de passe',
    'login.remember': 'Se souvenir de moi',
    'login.forgot': 'Mot de passe oublié',
    'login.submit': 'Se connecter',
    'login.submitting': 'Connexion en cours...',
    'login.email_placeholder': 'exemple@email.com ou nomutilisateur',
    'login.password_placeholder': 'Entrez votre mot de passe',
    'login.error_invalid': 'E-mail ou mot de passe invalide',
    'login.error_general': 'Une erreur s\'est produite lors de la connexion. Veuillez réessayer.',
    'login.error_session': 'Connexion réussie mais la session n\'a pas pu être enregistrée. Veuillez réessayer.',
    
    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.subtitle': 'Bienvenue dans le panneau de gestion de l\'hôtel',
    'dashboard.total_guests': 'Total des invités',
    'dashboard.active_orders': 'Commandes actives',
    'dashboard.pending_requests': 'Demandes en attente',
    'dashboard.daily_revenue': 'Revenus quotidiens',
    'dashboard.recent_orders': 'Commandes récentes',
    'dashboard.recent_requests': 'Demandes récentes',
    'dashboard.no_orders': 'Aucune commande pour le moment',
    'dashboard.no_requests': 'Aucune demande pour le moment',
    'dashboard.view_all_orders': 'Voir toutes les commandes',
    'dashboard.view_all_requests': 'Voir toutes les demandes',
    'dashboard.quick_actions': 'Actions rapides',
    'dashboard.create_qr': 'Créer un code QR',
    'dashboard.edit_menu': 'Modifier le menu',
    'dashboard.add_announcement': 'Ajouter une annonce',
    'dashboard.add_staff': 'Ajouter du personnel',
    'dashboard.view_reports': 'Voir les rapports',
    'dashboard.social_media': 'Réseaux sociaux',
    'dashboard.room': 'Chambre',
    'dashboard.unknown_product': 'Produit inconnu',
    'dashboard.product_id': 'Produit #',
    
    // Sidebar
    'sidebar.business_panel': 'Panneau d\'Administration',
    'sidebar.management_system': 'Système de Gestion',
    'sidebar.loading': 'Chargement...',
    'sidebar.logout': 'Déconnexion',
    'sidebar.dashboard': 'Tableau de bord',
    'sidebar.qr_generator': 'Générateur de QR Code',
    'sidebar.menu_management': 'Gestion du Menu',
    'sidebar.announcements': 'Annonces',
    'sidebar.hotel_info': 'Informations sur l\'Hôtel',
    'sidebar.users': 'Utilisateurs',
    'sidebar.notifications': 'Notifications',
    'sidebar.analytics': 'Analytique',
    'sidebar.settings': 'Paramètres',
    
    // Page Titles
    'page.announcements.title': 'Gestion des Annonces',
    'page.announcements.subtitle': 'Gérer les annonces à afficher aux invités',
    'page.notifications.title': 'Notifications',
    'page.notifications.subtitle': 'Gérer les notifications système',
    'page.analytics.title': 'Analytique et Rapports',
    'page.analytics.subtitle': 'Afficher les métriques de performance et les rapports détaillés',
    'page.users.title': 'Gestion des Utilisateurs',
    'page.users.subtitle': 'Gérer et autoriser les comptes du personnel',
    'page.hotel_info.title': 'Informations sur l\'Hôtel',
    'page.hotel_info.subtitle': 'Gérer les informations que les invités verront',
    'page.settings.title': 'Paramètres',
    'page.settings.subtitle': 'Gérer les paramètres système',
    
    // QR Kod Page
    'qr.select_room': 'Sélectionner la Chambre',
    'qr.database_rooms': 'Chambres de la Base de Données',
    'qr.generated_rooms': 'Chambres Générées',
    'qr.custom_rooms': 'Chambres Personnalisées',
    'qr.add_custom_room': 'Ajouter une Nouvelle Chambre Personnalisée',
    'qr.room_placeholder': 'Ex: 201, 301, A101, Suite-1...',
    'qr.save': 'Enregistrer',
    'qr.download': 'Télécharger',
    'qr.print': 'Imprimer',
    'qr.copy': 'Copier',
    'qr.copied': 'Copié!',
    'qr.create_rooms': 'Créer des Chambres',
    'qr.rooms_created': 'chambres créées',
    'qr.no_rooms': 'Aucune chambre trouvée pour le moment. Cliquez sur le bouton "Créer des Chambres" ci-dessus.',
    'qr.loading_rooms': 'Chargement des chambres...',
    'qr.hotel_config': 'Configuration de l\'Hôtel',
    'qr.floor_count': 'Nombre d\'Étages',
    'qr.rooms_per_floor': 'Chambres par Étage',
    'qr.total': 'Total',
    'qr.example': 'Exemple',
    'qr.rooms_will_be_created': 'chambres seront créées',
    'page.qr.subtitle': 'Créez et imprimez des codes QR personnalisés pour chaque chambre',
    
    // Common Buttons
    'common.add': 'Ajouter',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.all': 'Tous',
    'common.active': 'Actif',
    'common.inactive': 'Inactif',
    'common.loading': 'Chargement...',
    'common.no_data': 'Aucune donnée trouvée',
    
    // Announcements Page
    'announcements.add': 'Ajouter une Annonce',
    'announcements.filter': 'Filtrer:',
    'announcements.all': 'Tous',
    'announcements.active': 'Actif',
    'announcements.inactive': 'Inactif',
    'announcements.edit': 'Modifier',
    'announcements.delete': 'Supprimer',
    'announcements.new': 'Ajouter une Nouvelle Annonce',
    'announcements.edit_title': 'Modifier l\'Annonce',
    'announcements.not_found': 'Aucune annonce trouvée',
    'announcements.not_found_desc': 'Cliquez sur le bouton "Ajouter une Annonce" pour créer une nouvelle annonce.',
    'announcements.title_label': 'Titre (Turc) *',
    'announcements.content_label': 'Contenu (Turc) *',
    'announcements.title_placeholder': 'Titre de l\'annonce',
    'announcements.content_placeholder': 'Contenu de l\'annonce',
    'announcements.translations_title': 'Traductions Multilingues (Automatique)',
    'announcements.start_date': 'Début',
    'announcements.end_date': 'Fin',
    'announcements.created_by': 'Créé par',
    'announcements.make_active': 'Activer',
    'announcements.make_inactive': 'Désactiver',
    
    // Users Page
    'users.add': 'Ajouter un Utilisateur',
    'users.search_placeholder': 'Rechercher des utilisateurs...',
    'users.table.user': 'Utilisateur',
    'users.table.role': 'Rôle',
    'users.table.contact': 'Contact',
    'users.table.last_login': 'Dernière Connexion',
    'users.table.permissions': 'Autorisations',
    'users.table.status': 'Statut',
    'users.table.actions': 'Actions',
    'users.loading': 'Chargement des utilisateurs...',
    'users.not_found': 'Utilisateur non trouvé',
    'users.not_found_desc': 'Essayez de modifier vos critères de recherche.',
    'users.manage_permissions': 'Gérer les Autorisations',
    'users.make_active': 'Activer',
    'users.make_inactive': 'Désactiver',
    'users.edit': 'Modifier',
    'users.delete': 'Supprimer',
    'users.new_user': 'Ajouter un Nouvel Utilisateur',
    'users.edit_user': 'Modifier l\'Utilisateur',
    'users.no_login': 'Jamais connecté',
    'users.pages': 'pages',
    
    // Notifications Page
    'notifications.refresh': 'Actualiser',
    'notifications.mark_all_read': 'Tout Marquer comme Lu',
    'notifications.total': 'Total des Notifications',
    'notifications.unread': 'Non Lu',
    'notifications.read': 'Lu',
    'notifications.search_placeholder': 'Rechercher des notifications...',
    'notifications.not_found': 'Aucune notification trouvée',
    'notifications.mark_read': 'Marquer comme Lu',
    'notifications.mark_unread': 'Marquer comme Non Lu',
    'notifications.new': 'Nouveau',
    
    // Analytics Page
    'analytics.total_revenue': 'Revenu Total',
    'analytics.total_orders': 'Total des Commandes',
    'analytics.avg_order': 'Commande Moyenne',
    'analytics.active_guests': 'Invités Actifs',
    'analytics.previous_period': 'par rapport à la période précédente',
    'analytics.download_report': 'Télécharger le Rapport',
    'analytics.revenue_trend': 'Tendance des Revenus',
    'analytics.category_distribution': 'Répartition par Catégorie',
    'analytics.recent_orders': 'Commandes Récentes',
    'analytics.view_all': 'Voir Tout',
    'analytics.order': 'Commande',
    'analytics.room': 'Chambre',
    'analytics.amount': 'Montant',
    'analytics.status': 'Statut',
    'analytics.chart_placeholder': 'Le graphique apparaîtra ici',
    'analytics.chart_note': 'En utilisant Chart.js ou une autre bibliothèque',
    'analytics.orders': 'commandes',
    
    // Enquête/Évaluation
    'survey.title': 'Évaluez-nous',
    'survey.cleanliness': 'Propreté',
    'survey.service': 'Service Chambre',
    'survey.staff': 'Personnel',
    'survey.overall': 'Satisfaction Globale',
    'survey.comment': 'Commentaire (Optionnel)',
    'survey.comment_placeholder': 'Partagez votre expérience avec nous...',
    'survey.submit': 'Soumettre à l\'Hôtel',
    'survey.google_review': 'Évaluer sur Google',
    'survey.thank_you': 'Merci!',
    'survey.submitted': 'Votre évaluation a été soumise avec succès.',
    
    // Notifications
    'notifications.housekeeping_title': 'Demande de Ménage',
    'notifications.housekeeping_message': 'Votre demande de ménage a été envoyée à la réception. Vous recevrez une réponse sous peu.',
    'notifications.housekeeping_description': 'Ménage demandé',
    'notifications.maintenance_title': 'Problème Technique',
    'notifications.maintenance_message': 'Votre demande de problème technique a été envoyée à la réception. Notre personnel est en route pour les urgences.',
    'notifications.maintenance_description': 'Problème technique signalé',
    'notifications.survey_title': 'Évaluation',
    'notifications.survey_thank_you': 'Merci pour votre commentaire! Votre retour est très précieux pour nous.',
    'notifications.general_request_title': 'Demande Générale',
  },
  
  es: {
    // Títulos de menú
    'menu.title': 'Menú Servicio Habitación',
    'menu.back': 'Atrás',
    'menu.search': 'Buscar...',
    'menu.categories': 'Categorías',
    'menu.items': 'Artículos',
    
    // Categorías
    'category.all': 'Todos',
    'category.breakfast': 'Desayuno',
    'category.main': 'Platos Principales',
    'category.appetizer': 'Entrantes',
    'category.dessert': 'Postres',
    'category.beverage': 'Bebidas',
    'category.snack': 'Aperitivos',
    'menu.subcategories': 'Subcategorías',
    
    // Subcategorías
    'subcategory.classic': 'Clásico',
    'subcategory.meat': 'Carne',
    'subcategory.fish': 'Pescado',
    'subcategory.hot': 'Caliente',
    'subcategory.juice': 'Jugo',
    
    // Información del producto
    'product.price': '€',
    'product.preparation': 'Preparación',
    'product.minutes': 'min',
    'product.rating': 'Calificación',
    'product.allergens': 'Alérgenos',
    'product.add_to_cart': 'Añadir al Carrito',
    'product.quantity': 'Cantidad',
    'product.total': 'Total',
    'product.show_details': 'Detalles',
    'product.show_less': 'Mostrar Menos',
    
    // Carrito
    'cart.title': 'Mi Carrito',
    'cart.empty': 'Tu carrito está vacío',
    'cart.remove': 'Eliminar',
    'cart.checkout': 'Pedir',
    'cart.add_products': 'Selecciona artículos del menú para añadir al carrito',
    
    // General
    'general.loading': 'Cargando...',
    'general.error': 'Ocurrió un error',
    'general.success': 'Éxito',
    'general.cancel': 'Cancelar',
    'general.confirm': 'Confirmar',
    'general.save': 'Guardar',
    'general.edit': 'Editar',
    'general.delete': 'Eliminar',
    'general.no_products': 'No se Encontraron Productos',
    'general.no_search_results': 'No se encontraron productos que coincidan con tus criterios de búsqueda.',
    'general.no_category_products': 'No hay productos disponibles en esta categoría.',
    
    // Interfaz Habitación
    'room.welcome': 'Bienvenido',
    'room.services': 'Servicios',
    'room.room_service': 'Servicio Habitación',
    'room.housekeeping': 'Limpieza',
    'room.maintenance': 'Mantenimiento',
    'room.concierge': 'Conserjería',
    'room.wifi': 'WiFi',
    'room.menu': 'Menú',
    'room.survey': 'Encuesta',
    'room.social_media': 'Redes Sociales',
    'room.follow_us': 'Síguenos',
    'room.quick_select': 'Selección Rápida',
    'room.request_details': 'Detalles de la Solicitud',
    'room.quantity': 'Cantidad',
    'room.send_request': 'Enviar Solicitud',
    
    // Selección rápida
    'quick.towel': 'Toalla',
    'quick.slippers': 'Pantuflas',
    'quick.toothpaste': 'Pasta Dental',
    'quick.pillow': 'Almohada',
    'quick.blanket': 'Manta',
    'quick.shampoo': 'Champú',
    'quick.soap': 'Jabón',
    'quick.water': 'Agua',
    
    // Encuesta/Evaluación
    'survey.title': 'Evalúanos',
    'survey.cleanliness': 'Limpieza',
    'survey.service': 'Servicio Habitación',
    'survey.staff': 'Personal',
    'survey.overall': 'Satisfacción General',
    'survey.comment': 'Comentario (Opcional)',
    'survey.comment_placeholder': 'Comparte tu experiencia con nosotros...',
    'survey.submit': 'Enviar al Hotel',
    'survey.google_review': 'Evaluar en Google',
    'survey.thank_you': '¡Gracias!',
    'survey.submitted': 'Tu evaluación ha sido enviada exitosamente.',
    
    // Notificaciones
    'notifications.housekeeping_title': 'Solicitud de Limpieza',
    'notifications.housekeeping_message': 'Tu solicitud de limpieza ha sido enviada a recepción. Recibirás una respuesta pronto.',
    'notifications.housekeeping_description': 'Limpieza solicitada',
    'notifications.maintenance_title': 'Problema Técnico',
    'notifications.maintenance_message': 'Tu solicitud de problema técnico ha sido enviada a recepción. Nuestro personal está en camino para emergencias.',
    'notifications.maintenance_description': 'Problema técnico reportado',
    'notifications.survey_title': 'Evaluación',
    'notifications.survey_thank_you': '¡Gracias por tu comentario! Tu retroalimentación es muy valiosa para nosotros.',
    'notifications.general_request_title': 'Solicitud General',
  },
  
  it: {
    // Titoli menu
    'menu.title': 'Menu Servizio Camera',
    'menu.back': 'Indietro',
    'menu.search': 'Cerca...',
    'menu.categories': 'Categorie',
    'menu.items': 'Articoli',
    
    // Categorie
    'category.all': 'Tutti',
    'category.breakfast': 'Colazione',
    'category.main': 'Piatti Principali',
    'category.appetizer': 'Antipasti',
    'category.dessert': 'Dolci',
    'category.beverage': 'Bevande',
    'category.snack': 'Snack',
    'menu.subcategories': 'Sottocategorie',
    
    // Sottocategorie
    'subcategory.classic': 'Classico',
    'subcategory.meat': 'Carne',
    'subcategory.fish': 'Pesce',
    'subcategory.hot': 'Caldo',
    'subcategory.juice': 'Succo',
    
    // Informazioni prodotto
    'product.price': '€',
    'product.preparation': 'Preparazione',
    'product.minutes': 'min',
    'product.rating': 'Valutazione',
    'product.allergens': 'Allergeni',
    'product.add_to_cart': 'Aggiungi al Carrello',
    'product.quantity': 'Quantità',
    'product.total': 'Totale',
    'product.show_details': 'Dettagli',
    'product.show_less': 'Mostra Meno',
    
    // Carrello
    'cart.title': 'Il Mio Carrello',
    'cart.empty': 'Il tuo carrello è vuoto',
    'cart.remove': 'Rimuovi',
    'cart.checkout': 'Ordina',
    'cart.add_products': 'Seleziona articoli dal menu per aggiungere al carrello',
    
    // Generale
    'general.loading': 'Caricamento...',
    'general.error': 'Si è verificato un errore',
    'general.success': 'Successo',
    'general.cancel': 'Annulla',
    'general.confirm': 'Conferma',
    'general.save': 'Salva',
    'general.edit': 'Modifica',
    'general.delete': 'Elimina',
    'general.no_products': 'Nessun Prodotto Trovato',
    'general.no_search_results': 'Nessun prodotto trovato che corrisponda ai tuoi criteri di ricerca.',
    'general.no_category_products': 'Nessun prodotto disponibile in questa categoria.',
    
    // Interfaccia Camera
    'room.welcome': 'Benvenuto',
    'room.services': 'Servizi',
    'room.room_service': 'Servizio Camera',
    'room.housekeeping': 'Pulizia',
    'room.maintenance': 'Manutenzione',
    'room.concierge': 'Concierge',
    'room.wifi': 'WiFi',
    'room.menu': 'Menu',
    'room.survey': 'Sondaggio',
    'room.social_media': 'Social Media',
    'room.follow_us': 'Seguici',
    'room.quick_select': 'Selezione Rapida',
    'room.request_details': 'Dettagli Richiesta',
    'room.quantity': 'Quantità',
    'room.send_request': 'Invia Richiesta',
    
    // Selezione rapida
    'quick.towel': 'Asciugamano',
    'quick.slippers': 'Pantalofole',
    'quick.toothpaste': 'Dentifricio',
    'quick.pillow': 'Cuscino',
    'quick.blanket': 'Coperta',
    'quick.shampoo': 'Shampoo',
    'quick.soap': 'Sapone',
    'quick.water': 'Acqua',
    
    // Sondaggio/Valutazione
    'survey.title': 'Valutaci',
    'survey.cleanliness': 'Pulizia',
    'survey.service': 'Servizio Camera',
    'survey.staff': 'Personale',
    'survey.overall': 'Soddisfazione Generale',
    'survey.comment': 'Commento (Opzionale)',
    'survey.comment_placeholder': 'Condividi la tua esperienza con noi...',
    'survey.submit': 'Invia all\'Hotel',
    'survey.google_review': 'Valuta su Google',
    'survey.thank_you': 'Grazie!',
    'survey.submitted': 'La tua valutazione è stata inviata con successo.',
    
    // Notifiche
    'notifications.housekeeping_title': 'Richiesta Pulizia',
    'notifications.housekeeping_message': 'La tua richiesta di pulizia è stata inviata alla reception. Riceverai una risposta a breve.',
    'notifications.housekeeping_description': 'Pulizia richiesta',
    'notifications.maintenance_title': 'Problema Tecnico',
    'notifications.maintenance_message': 'La tua richiesta di problema tecnico è stata inviata alla reception. Il nostro personale è in viaggio per le emergenze.',
    'notifications.maintenance_description': 'Problema tecnico segnalato',
    'notifications.survey_title': 'Valutazione',
    'notifications.survey_thank_you': 'Grazie per il tuo commento! Il tuo feedback è molto prezioso per noi.',
    'notifications.general_request_title': 'Richiesta Generale',
  },
  
  zh: {
    // 菜单标题
    'menu.title': '客房服务菜单',
    'menu.back': '返回',
    'menu.search': '搜索...',
    'menu.categories': '分类',
    'menu.items': '项目',
    
    // 分类
    'category.all': '全部',
    'category.breakfast': '早餐',
    'category.main': '主菜',
    'category.appetizer': '开胃菜',
    'category.dessert': '甜点',
    'category.beverage': '饮料',
    'category.snack': '小吃',
    'menu.subcategories': '子分类',
    
    // 子分类
    'subcategory.classic': '经典',
    'subcategory.meat': '肉类',
    'subcategory.fish': '鱼类',
    'subcategory.hot': '热饮',
    'subcategory.juice': '果汁',
    
    // 产品信息
    'product.price': '¥',
    'product.preparation': '准备',
    'product.minutes': '分钟',
    'product.rating': '评分',
    'product.allergens': '过敏原',
    'product.add_to_cart': '加入购物车',
    'product.quantity': '数量',
    'product.total': '总计',
    'product.show_details': '详情',
    'product.show_less': '显示更少',
    
    // 购物车
    'cart.title': '我的购物车',
    'cart.empty': '您的购物车是空的',
    'cart.remove': '移除',
    'cart.checkout': '结账',
    'cart.add_products': '从菜单中选择项目添加到购物车',
    
    // 一般
    'general.loading': '加载中...',
    'general.error': '发生错误',
    'general.success': '成功',
    'general.cancel': '取消',
    'general.confirm': '确认',
    'general.save': '保存',
    'general.edit': '编辑',
    'general.delete': '删除',
    'general.no_products': '未找到产品',
    'general.no_search_results': '没有找到符合您搜索条件的产品。',
    'general.no_category_products': '此类别中没有可用产品。',
    
    // 房间界面
    'room.welcome': '欢迎',
    'room.services': '服务',
    'room.room_service': '客房服务',
    'room.housekeeping': '清洁',
    'room.maintenance': '维护',
    'room.concierge': '礼宾',
    'room.wifi': 'WiFi',
    'room.menu': '菜单',
    'room.survey': '调查',
    'room.social_media': '社交媒体',
    'room.follow_us': '关注我们',
    'room.quick_select': '快速选择',
    'room.request_details': '请求详情',
    'room.quantity': '数量',
    'room.send_request': '发送请求',
    
    // 快速选择
    'quick.towel': '毛巾',
    'quick.slippers': '拖鞋',
    'quick.toothpaste': '牙膏',
    'quick.pillow': '枕头',
    'quick.blanket': '毯子',
    'quick.shampoo': '洗发水',
    'quick.soap': '肥皂',
    'quick.water': '水',
    
    // 调查/评估
    'survey.title': '评价我们',
    'survey.cleanliness': '清洁度',
    'survey.service': '客房服务',
    'survey.staff': '员工',
    'survey.overall': '整体满意度',
    'survey.comment': '评论（可选）',
    'survey.comment_placeholder': '与我们分享您的体验...',
    'survey.submit': '提交给酒店',
    'survey.google_review': '在Google上评价',
    'survey.thank_you': '谢谢！',
    'survey.submitted': '您的评价已成功提交。',
    
    // 通知
    'notifications.housekeeping_title': '清洁请求',
    'notifications.housekeeping_message': '您的清洁请求已发送到前台。您将很快收到回复。',
    'notifications.housekeeping_description': '请求清洁',
    'notifications.maintenance_title': '技术问题',
    'notifications.maintenance_message': '您的技术问题请求已发送到前台。我们的员工正在路上处理紧急情况。',
    'notifications.maintenance_description': '报告技术问题',
    'notifications.survey_title': '评估',
    'notifications.survey_thank_you': '感谢您的评论！您的反馈对我们非常宝贵。',
    'notifications.general_request_title': '一般请求',
  },
};

interface LanguageStore {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  getTranslation: (key: string) => string;
  getCurrentLanguage: () => Language;
  getSupportedLanguages: () => Language[];
}

// Settings'ten desteklenen dilleri al
const getSupportedLanguagesFromSettings = (): string[] => {
  if (typeof window === 'undefined') return ['tr', 'en', 'de', 'fr'];
  
  try {
    const savedSettings = localStorage.getItem('hotel-settings');
    if (savedSettings) {
      const settingsData = JSON.parse(savedSettings);
      if (settingsData.language?.supportedLanguages && Array.isArray(settingsData.language.supportedLanguages)) {
        // En az bir dil olmalı
        if (settingsData.language.supportedLanguages.length > 0) {
          return settingsData.language.supportedLanguages;
        }
      }
    }
  } catch (error) {
    console.warn('Settings yüklenirken hata:', error);
  }
  
  // Varsayılan diller
  return ['tr', 'en', 'de', 'fr'];
};

// Settings'ten varsayılan dili al
const getDefaultLanguageFromSettings = (): string => {
  if (typeof window === 'undefined') return 'tr';
  
  try {
    const savedSettings = localStorage.getItem('hotel-settings');
    if (savedSettings) {
      const settingsData = JSON.parse(savedSettings);
      if (settingsData.language?.defaultLanguage) {
        return settingsData.language.defaultLanguage;
      }
    }
  } catch (error) {
    console.warn('Settings yüklenirken hata:', error);
  }
  
  return 'tr';
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: typeof window !== 'undefined' ? getDefaultLanguageFromSettings() : 'tr',
      
      setLanguage: (language: string) => {
        set({ currentLanguage: language });
      },
      
      getTranslation: (key: string) => {
        const { currentLanguage } = get();
        const langTranslations = translations[currentLanguage];
        return langTranslations?.[key] || key;
      },
      
      getCurrentLanguage: () => {
        const { currentLanguage } = get();
        return languages.find(lang => lang.code === currentLanguage) || languages[0];
      },
      
      getSupportedLanguages: () => {
        const supportedCodes = getSupportedLanguagesFromSettings();
        const supported = languages.filter(lang => supportedCodes.includes(lang.code));
        
        // Eğer currentLanguage desteklenmiyorsa, varsayılan dile geç
        const { currentLanguage } = get();
        if (!supportedCodes.includes(currentLanguage)) {
          const defaultLang = getDefaultLanguageFromSettings();
          // Varsayılan dil de desteklenmiyorsa, ilk desteklenen dile geç
          if (!supportedCodes.includes(defaultLang)) {
            set({ currentLanguage: supportedCodes[0] || 'tr' });
          } else {
            set({ currentLanguage: defaultLang });
          }
        }
        
        return supported;
      },
    }),
    {
      name: 'language-store',
      skipHydration: false, // Hydration'ı etkinleştir
    }
  )
);
