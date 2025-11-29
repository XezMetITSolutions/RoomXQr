'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hotel, QrCode, Settings, CheckCircle, Star, Play, Shield, Globe, Smartphone, CreditCard, Zap, ChevronDown, ChevronUp, Camera } from 'lucide-react';
import HeroBlue from '../hero-blue';

export default function HomePageDE() {
    const router = useRouter();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const features = [
        { icon: QrCode, title: 'QR-Code-System', description: 'Gäste greifen sofort mit einem einzigartigen QR-Code für jedes Zimmer auf das Menü zu', color: 'text-blue-600' },
        { icon: Globe, title: 'Mehrsprachige Unterstützung', description: 'Perfektes Erlebnis für internationale Gäste mit KI-gestützter Übersetzung', color: 'text-green-600' },
        { icon: Camera, title: 'KI-Bildverbesserung', description: 'Verwandeln Sie Handyfotos in professionelle Menübilder', color: 'text-purple-600' },
        { icon: Zap, title: 'Echtzeit', description: 'Schneller Service mit sofortigen Benachrichtigungen und Updates', color: 'text-yellow-600' },
        { icon: CreditCard, title: 'Integrierte Zahlung', description: 'Einfacher Zimmerservice mit sicherem Zahlungssystem', color: 'text-indigo-600' },
        { icon: Smartphone, title: 'Mobilfreundlich', description: 'Responsives Design, das auf allen Geräten perfekt funktioniert', color: 'text-pink-600' },
    ];

    const stats = [
        { number: '15+', label: 'Zufriedene Hotels' },
        { number: '1.5K+', label: 'Tägliche Bestellungen' },
        { number: '99.9%', label: 'Verfügbarkeit' },
        { number: '24/7', label: 'Support' }
    ];

    const faqs = [
        { question: 'Wie funktioniert die KI-Bildverbesserung?', answer: 'Wenn Sie mit Ihrem Telefon aufgenommene Produktfotos in das System hochladen, entfernt unsere KI-Technologie automatisch den Hintergrund, korrigiert Farben, fügt professionelle Schatten hinzu und macht das Bild für Menüstandards geeignet. Dieser Vorgang dauert nur wenige Sekunden.' },
        { question: 'Wie funktioniert der Installationsprozess?', answer: 'Unser Installationsprozess ist sehr einfach! Nach Auswahl Ihres Pakets wird sich unser technisches Team innerhalb von 24 Stunden mit Ihnen in Verbindung setzen. Sie erstellen Ihre QR-Codes, richten Ihr System ein und schulen Ihr Personal. Der gesamte Prozess ist innerhalb von 2-3 Tagen abgeschlossen.' },
        { question: 'Wie funktioniert die Social-Media-Integration?', answer: 'Wir sammeln Zufriedenheitsumfragen von Ihren Gästen. Wir leiten zufriedene Gäste zu Ihren Instagram-, Facebook- und Google My Business-Profilen weiter. Auf diese Weise erhalten Sie organisches Follower-Wachstum und echte Kundenbewertungen.' },
        { question: 'Gibt es eine 14-tägige kostenlose Testversion?', answer: 'Ja! Alle unsere Pakete beinhalten eine 14-tägige kostenlose Testphase. Während dieser Zeit können Sie alle Funktionen des Systems testen und ohne Gebühren stornieren, wenn Sie nicht zufrieden sind.' },
        { question: 'Was passiert, wenn ich kündigen möchte?', answer: 'Wenn Sie kündigen möchten, müssen Sie nur die Einrichtungsgebühr (15.000₺) bezahlen. Kunden, die 6-Monats- oder längere Pakete kaufen, haben das Recht, innerhalb des ersten Monats zu kündigen.' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div id="hero">
                <HeroBlue />
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-slate-800 via-blue-800 to-slate-900 bg-clip-text text-transparent mb-2 md:mb-3 group-hover:scale-110 transition-transform">{stat.number}</div>
                                <div className="text-xs md:text-base text-slate-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-20">
                        <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
                            <Zap className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                            Leistungsstarke Funktionen
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-3 md:mb-6">Warum RoomXQR?</h2>
                        <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Alle Funktionen, die Sie für modernes Hotelmanagement benötigen, auf einer Plattform</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group p-4 md:p-6 lg:p-8 text-center rounded-xl md:rounded-2xl lg:rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 ${feature.color} bg-opacity-10 rounded-xl md:rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-3 md:mb-4 lg:mb-6 shadow-md md:shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${feature.color}`} />
                                    </div>
                                    <h3 className="text-base md:text-lg lg:text-2xl font-bold text-slate-900 mb-2 md:mb-3 lg:mb-4 tracking-tight">{feature.title}</h3>
                                    <p className="text-xs md:text-sm lg:text-base text-slate-600 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-12 md:py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 tracking-tight">Häufig gestellte Fragen</h2>
                        <p className="text-base md:text-xl text-gray-600">Alles, was Sie wissen möchten, ist hier</p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-md">
                                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between text-left">
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-3 md:pr-4">{faq.question}</h3>
                                    {openFaq === index ? (
                                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                    )}
                                </button>
                                {openFaq === index && (
                                    <div className="mt-4 text-gray-600">{faq.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-12 md:py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]"></div>
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-6xl font-black text-white mb-3 md:mb-6 tracking-tight">Digitalisieren Sie Ihr Hotel</h2>
                    <p className="text-lg md:text-2xl text-slate-300 mb-8 md:mb-12 leading-relaxed">Wechseln Sie in nur wenigen Minuten zum modernen Hotelmanagement</p>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                        <button onClick={() => router.push('/isletme')} className="px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-2xl shadow-amber-500/25 hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 hover:scale-105">
                            🚀 Kostenlos testen
                        </button>
                        <button onClick={() => router.push('/guest/demo')} className="px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-bold text-white border-2 border-white/30 hover:bg-white hover:text-slate-900 transition-all duration-200 backdrop-blur-sm hover:scale-105">
                            👀 Live QR Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-slate-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-slate-400 text-sm">© 2024 RoomXQR. Alle Rechte vorbehalten.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
