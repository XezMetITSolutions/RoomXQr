"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteDemoItemsPage() {
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        loadMenuItems();
    }, []);

    const loadMenuItems = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/menu');
            if (response.ok) {
                const data = await response.json();
                const items = data.menu || [];
                // Sadece karniyarik ve cheeseburger içeren ürünleri göster
                const targetItems = items.filter((item: any) => {
                    const name = item.name.toLowerCase();
                    return name.includes('karniyarik') ||
                        name.includes('karnıyarık') ||
                        name.includes('cheeseburger') ||
                        name.includes('cheese burger');
                });
                setMenuItems(targetItems);
            }
        } catch (error) {
            console.error('Menü yükleme hatası:', error);
            setMessage('❌ Menü yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const deleteAllItems = async () => {
        if (menuItems.length === 0) {
            setMessage('✓ Silinecek ürün bulunamadı!');
            return;
        }

        if (!confirm(`${menuItems.length} ürün silinecek:\n\n${menuItems.map(i => `- ${i.name}`).join('\n')}\n\nEmin misiniz?`)) {
            return;
        }

        try {
            setDeleting(true);
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://roomxqr-backend.onrender.com';

            let successCount = 0;
            let errorCount = 0;

            for (const item of menuItems) {
                try {
                    const response = await fetch(`${API_URL}/api/menu/${item.id}`, {
                        method: 'DELETE',
                        headers: {
                            'x-tenant': 'demo',
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        successCount++;
                        console.log(`✓ Silindi: ${item.name}`);
                    } else {
                        errorCount++;
                        console.error(`✗ Silinemedi: ${item.name}`);
                    }
                } catch (err) {
                    errorCount++;
                    console.error(`✗ Hata: ${item.name}`, err);
                }

                // Kısa bekleme
                await new Promise(resolve => setTimeout(resolve, 300));
            }

            if (errorCount === 0) {
                setMessage(`✓ Tüm ürünler başarıyla silindi! (${successCount} ürün)`);
                setTimeout(() => {
                    router.push('/qr-menu?roomId=101');
                }, 2000);
            } else {
                setMessage(`⚠️ ${successCount} ürün silindi, ${errorCount} ürün silinemedi`);
            }

            // Listeyi yenile
            await loadMenuItems();
        } catch (error) {
            console.error('Silme hatası:', error);
            setMessage(`❌ Hata: ${error}`);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-4">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Demo Ürünleri Sil</h1>
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        <span className="ml-4 text-gray-600">Yükleniyor...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">Demo Ürünleri Sil</h1>
                    <p className="text-gray-600 mb-6">Karnıyarık ve Cheeseburger ürünlerini veritabanından sil</p>

                    {message && (
                        <div className={`mb-6 p-4 rounded-lg ${message.startsWith('✓') ? 'bg-green-100 text-green-800 border border-green-200' :
                                message.startsWith('⚠️') ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                    'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                            <p className="font-semibold">{message}</p>
                        </div>
                    )}

                    {menuItems.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">✓</div>
                            <h2 className="text-2xl font-bold text-green-600 mb-2">Tamamlandı!</h2>
                            <p className="text-gray-600 mb-6">Silinecek ürün bulunamadı. Tüm hedef ürünler temizlenmiş.</p>
                            <button
                                onClick={() => router.push('/qr-menu?roomId=101')}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
                            >
                                QR Menüye Git
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-3 text-gray-700">Silinecek Ürünler ({menuItems.length}):</h2>
                                <div className="space-y-2">
                                    {menuItems.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <div>
                                                <p className="font-semibold text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-600">{item.category} - {item.price}₺</p>
                                            </div>
                                            <div className="text-red-600">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={deleteAllItems}
                                    disabled={deleting}
                                    className="flex-1 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors shadow-lg hover:shadow-xl"
                                >
                                    {deleting ? (
                                        <span className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Siliniyor...
                                        </span>
                                    ) : (
                                        `Tüm Ürünleri Sil (${menuItems.length})`
                                    )}
                                </button>
                                <button
                                    onClick={() => router.push('/qr-menu?roomId=101')}
                                    className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                                >
                                    İptal
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
