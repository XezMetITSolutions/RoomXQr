'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hotel, QrCode, Settings, CheckCircle, Star, Play, Shield, Globe, Smartphone, CreditCard, Zap, ChevronDown, ChevronUp, Camera, Image, Users, TrendingUp, Clock, DollarSign, Heart, MessageCircle, BarChart3, Award, Target, Sparkles, ArrowRight, CheckCircle2, XCircle, Lightbulb, Megaphone, ThumbsUp, Share2, Instagram, Facebook, Twitter, Map, Utensils, MessageSquare } from 'lucide-react';
import { Language, translations } from '@/lib/homeTranslations';
import HeroBlue from '../hero-blue';

export default function HomePage() {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('de');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: number | null }>({ 'yillik': null, '6aylik': null, 'sube': null });

  useEffect(() => {
    // Tüm elementleri hemen görünür yap - animasyonları kaldır
    const elements = document.querySelectorAll('[data-scroll]');
    elements.forEach((el) => {
      setVisibleElements(prev => new Set(prev).add(el.id));
    });

    // Tüm bölümleri zorla görünür yap
    setTimeout(() => {
      const allElements = [
        'features-header', 'how-it-works-header', 'ai-enhancement-header',
        'benefits-header', 'social-header', 'ai-process', 'ai-demo',
        'social-process', 'social-demo'
      ];
      allElements.forEach(id => {
        setVisibleElements(prev => new Set(prev).add(id));
      });
    }, 100);
  }, []);

  const t = translations[currentLanguage];

  const features = [
    { icon: QrCode, title: t.features.qr.title, description: t.features.qr.desc, color: 'text-blue-600' },
    { icon: Globe, title: t.features.lang.title, description: t.features.lang.desc, color: 'text-green-600' },
    { icon: Map, title: t.features.concierge.title, description: t.features.concierge.desc, color: 'text-purple-600' },
    { icon: Utensils, title: t.features.ordering.title, description: t.features.ordering.desc, color: 'text-orange-600' },
    { icon: Megaphone, title: t.features.ads.title, description: t.features.ads.desc, color: 'text-yellow-600' },
    { icon: Users, title: t.features.efficiency.title, description: t.features.efficiency.desc, color: 'text-indigo-600' },
    { icon: BarChart3, title: t.features.analytics.title, description: t.features.analytics.desc, color: 'text-cyan-600' },
    { icon: MessageSquare, title: t.features.feedback.title, description: t.features.feedback.desc, color: 'text-pink-600' },
    { icon: Shield, title: t.features.security.title, description: t.features.security.desc, color: 'text-red-600' }
  ];

  const packages = [
    {
      id: '6aylik',
      name: '6 Aylık Paket',
      price: 'Fiyat Sorunuz',
      originalPrice: 0,
      period: '',
      description: 'En popüler seçenek! Orta vadeli taahhüt ile ideal fiyat/performans.',
      features: [
        { name: 'Sınırsız QR Kod Üretimi', desc: 'Her oda için özel QR menü sistemi. Sınırsız kod oluşturun.' },
        { name: 'Çoklu Dil Desteği', desc: 'Türkçe, İngilizce, Almanca, Fransızca, Rusça, Arapça, Çince, Japonca, İspanyolca.' },
        { name: 'AI Görsel İyileştirme', desc: 'Telefon fotoğraflarını profesyonel menü görsellerine dönüştürün.' },
        { name: 'Detaylı Satış Raporları', desc: 'Günlük, haftalık, aylık satış analizi ve trend raporları.' },
        { name: 'Mutfak & Resepsiyon Paneli', desc: 'Siparişleri takip edin, misafir taleplerini yönetin.' },
        { name: 'Duyuru & Anket Sistemi', desc: 'Misafirlere özel kampanyalar ve memnuniyet anketleri.' },
        { name: '7/24 Müşteri Desteği', desc: 'Canlı destek, WhatsApp ve telefon desteği.' },
        { name: 'Otomatik Sistem Güncellemeleri', desc: 'Yeni özellikler otomatik olarak eklenir.' },
        { name: 'Sosyal Medya Entegrasyonu', desc: 'Memnun müşterileri sosyal medya hesaplarınıza yönlendirin.' },
        { name: 'Güvenli Ödeme Sistemi', desc: 'SSL şifreleme ile güvenli ödeme altyapısı.' }
      ],
      tag: 'En Popüler',
      color: 'border-amber-300 bg-amber-50',
      popular: false,
      savings: ''
    },
    {
      id: 'yillik',
      name: '1 Yıllık Paket',
      price: 'Fiyat Sorunuz',
      originalPrice: 0,
      period: '',
      description: 'Uzun vadeli taahhüt ile maksimum tasarruf! En avantajlı seçenek.',
      features: [
        { name: 'Sınırsız QR Kod Üretimi', desc: 'Her oda için özel QR menü sistemi. Sınırsız kod oluşturun.' },
        { name: 'Çoklu Dil Desteği', desc: 'Türkçe, İngilizce, Almanca, Fransızca, Rusça, Arapça, Çince, Japonca, İspanyolca.' },
        { name: 'AI Görsel İyileştirme', desc: 'Telefon fotoğraflarını profesyonel menü görsellerine dönüştürün.' },
        { name: 'Detaylı Satış Raporları', desc: 'Günlük, haftalık, aylık satış analizi ve trend raporları.' },
        { name: 'Mutfak & Resepsiyon Paneli', desc: 'Siparişleri takip edin, misafir taleplerini yönetin.' },
        { name: 'Duyuru & Anket Sistemi', desc: 'Misafirlere özel kampanyalar ve memnuniyet anketleri.' },
        { name: '7/24 Müşteri Desteği', desc: 'Canlı destek, WhatsApp ve telefon desteği.' },
        { name: 'Otomatik Sistem Güncellemeleri', desc: 'Yeni özellikler otomatik olarak eklenir.' },
        { name: 'Sosyal Medya Entegrasyonu', desc: 'Memnun müşterileri sosyal medya hesaplarınıza yönlendirin.' },
        { name: 'Güvenli Ödeme Sistemi', desc: 'SSL şifreleme ile güvenli ödeme altyapısı.' }
      ],
      tag: 'En Avantajlı',
      color: 'border-blue-300 bg-blue-50',
      popular: true,
      savings: ''
    },
    {
      id: 'sube',
      name: 'Çoklu Şube Paketi',
      price: 'Fiyat Sorunuz',
      originalPrice: 0,
      period: '',
      description: 'Otel zincirleri için özel! Merkezi yönetim ve kurumsal entegrasyon.',
      features: [
        { name: 'Merkezi Şube Yönetimi', desc: 'Tüm şubelerinizi tek panelden yönetin ve kontrol edin.' },
        { name: 'Şubeler Arası Analiz', desc: 'Tüm şubelerin performansını karşılaştırın ve analiz edin.' },
        { name: 'Kurumsal API Entegrasyonu', desc: 'Mevcut sistemlerinizle (PMS, Muhasebe, CRM) entegrasyon.' },
        { name: 'Sınırsız QR Kod Üretimi', desc: 'Her oda için özel QR menü sistemi. Sınırsız kod oluşturun.' },
        { name: 'Çoklu Dil Desteği', desc: 'Türkçe, İngilizce, Almanca, Fransızca, Rusça, Arapça, Çince, Japonca, İspanyolca.' },
        { name: 'AI Görsel İyileştirme', desc: 'Telefon fotoğraflarını profesyonel menü görsellerine dönüştürün.' },
        { name: 'Gelişmiş Raporlama', desc: 'Şube bazlı detaylı satış ve performans raporları.' },
        { name: 'Özel Markalama', desc: 'Her şube için özel logo ve tema özelleştirmesi.' },
        { name: 'Dedicated Müşteri Temsilcisi', desc: 'Size özel müşteri temsilcisi ve öncelikli destek.' },
        { name: 'Özel Eğitim Programı', desc: 'Personeliniz için özel eğitim ve onboarding süreci.' }
      ],
      tag: 'Kurumsal',
      color: 'border-purple-300 bg-purple-50',
      popular: false,
      savings: ''
    }
  ];

  const faqs = [
    { question: t.ai.step1.title, answer: t.ai.step1.desc }, // Placeholder logic or map from homeTranslations
    { question: t.howItWorks.step1.title, answer: t.howItWorks.step1.desc },
  ].slice(0, 0); // I'll just map them properly below if needed, but for now let's fix the hardcoded ones in the JSX

  const stats = [
    { number: '15+', label: 'Mutlu Otel' },
    { number: '1.5K+', label: 'Günlük Sipariş' },
    { number: '99.9%', label: 'Kesintisiz Hizmet' },
    { number: '24/7', label: 'Destek' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div id="hero">
        <HeroBlue lang="tr" />
      </div>

      {/* Comparison Section */}
      <div className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{t.comparison.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-300"></div>
              <h3 className="text-2xl font-bold text-slate-700 mb-6 flex items-center">
                <XCircle className="w-8 h-8 text-slate-400 mr-3" />
                {t.comparison.traditional.title}
              </h3>
              <ul className="space-y-4">
                {t.comparison.traditional.items.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start text-slate-500">
                    <XCircle className="w-5 h-5 text-slate-300 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl border-2 border-blue-500 shadow-xl relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-16 -mt-16"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mr-3" />
                {t.comparison.digital.title}
              </h3>
              <ul className="space-y-4">
                {t.comparison.digital.items.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start text-slate-800 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>



      {/* Features Section */}
      <div className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="features-header"
            data-scroll
            className="text-center mb-8 md:mb-20"
          >
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Zap className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Güçlü Özellikler
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-3 md:mb-6">{t.features.title}</h2>
            <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.features.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  id={`feature-${index}`}
                  data-scroll
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

      {/* Revenue Section */}
      <div className="py-12 md:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-4">
              <DollarSign className="w-4 h-4 mr-2" />
              {t.revenue.title}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">{t.revenue.subtitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.revenue.internal.title}</h3>
              <p className="text-slate-600">{t.revenue.internal.desc}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-purple-200 transition-all">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                <Map className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.revenue.external.title}</h3>
              <p className="text-slate-600">{t.revenue.external.desc}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:border-amber-200 transition-all">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 text-amber-600">
                <Megaphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t.revenue.ads.title}</h3>
              <p className="text-slate-600">{t.revenue.ads.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Section */}
      <div className="py-12 md:py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">{t.roi.title}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {t.roi.items.map((item: { value: string, label: string }, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-6xl font-black text-blue-400 mb-2">{item.value}</div>
                <div className="text-sm md:text-lg text-slate-300 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-12 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="how-it-works-header"
            data-scroll
            className="text-center mb-8 md:mb-20 opacity-100 translate-y-0"
          >
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Settings className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Basit Süreç
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 md:mb-6 tracking-tight">{t.howItWorks.title}</h2>
            <p className="text-base md:text-xl text-slate-600">{t.howItWorks.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {[
              {
                step: '1',
                title: 'Paket Seçin',
                description: 'İhtiyacınıza uygun paketi seçin ve hemen başlayın',
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200'
              },
              {
                step: '2',
                title: 'QR Kodlarınızı Alın',
                description: 'Her oda için özel QR kodlarınızı oluşturun',
                color: 'from-emerald-500 to-emerald-600',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200'
              },
              {
                step: '3',
                title: 'Hizmete Başlayın',
                description: 'Misafirleriniz QR kodları tarayarak tüm ihtiyaçlarını çözebilir',
                color: 'from-amber-500 to-amber-600',
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200'
              }
            ].map((step, index) => {
              return (
                <div
                  key={index}
                  id={`step-${index}`}
                  data-scroll
                  className="text-center group opacity-100 translate-y-0"
                >
                  <div className={`w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 ${step.bgColor} ${step.borderColor} border-2 rounded-xl md:rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 lg:mb-8 group-hover:scale-110 transition-transform duration-300 shadow-md md:shadow-lg`}>
                    <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-20 lg:h-20 text-white rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-br ${step.color} shadow-lg md:shadow-xl`}>
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-2 md:mb-3 lg:mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-sm md:text-base lg:text-lg text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* Social Media Integration Section */}
      <div className="py-12 md:py-24 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            id="social-header"
            data-scroll
            className="text-center mb-8 md:mb-20 opacity-100 translate-y-0"
          >
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Sosyal Medya Entegrasyonu
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-3 md:mb-6 tracking-tight">{t.social.title}</h2>
            <p className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{t.social.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-12 md:mb-20">
            <div
              id="social-process"
              data-scroll
              className="opacity-100 translate-x-0 order-2 lg:order-1"
            >
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2">{t.social.step1.title}</h3>
                    <p className="text-sm md:text-base text-slate-600">{t.social.step1.desc}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2">{t.social.step2.title}</h3>
                    <p className="text-sm md:text-base text-slate-600">{t.social.step2.desc}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2">{t.social.step3.title}</h3>
                    <p className="text-sm md:text-base text-slate-600">{t.social.step3.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="social-demo"
              data-scroll
              className="opacity-100 translate-x-0 order-1 lg:order-2"
            >
              <div className="relative bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl md:shadow-2xl border border-slate-200">
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                      </div>
                      <span className="font-semibold text-sm md:text-base text-slate-900">Memnuniyet Anketi</span>
                    </div>
                    <p className="text-slate-600 text-xs md:text-sm mb-3 md:mb-4">Konaklamanız nasıldı?</p>
                    <div className="flex space-x-1.5 md:space-x-2">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Instagram className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                      </div>
                      <span className="font-semibold text-sm md:text-base text-slate-900">Sosyal Medya</span>
                    </div>
                    <p className="text-slate-600 text-xs md:text-sm mb-3 md:mb-4">Bizi takip edin ve deneyiminizi paylaşın!</p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      <div className="px-2 md:px-3 py-1 bg-blue-500 text-white text-xs rounded-full">Instagram</div>
                      <div className="px-2 md:px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Facebook</div>
                      <div className="px-2 md:px-3 py-1 bg-red-500 text-white text-xs rounded-full">Google</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>

      {/* Packages Section */}
      <div className="py-12 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs md:text-sm font-medium mb-4 md:mb-6">
            <Star className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Fiyatlandırma
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3 md:mb-6 tracking-tight">Paketlerimiz</h2>
          <p className="text-base md:text-xl text-slate-300">İhtiyacınıza uygun paketi seçin, 14 gün ücretsiz deneyin</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`relative p-6 md:p-10 rounded-2xl md:rounded-3xl bg-white/5 border border-white/20 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 ${pkg.popular ? 'ring-2 ring-amber-400 scale-105' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="px-8 py-3 rounded-full text-sm font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg">
                    ⭐ En Popüler
                  </div>
                </div>
              )}
              <div className="text-center mb-6 md:mb-10">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  {pkg.id === 'yillik' ? (
                    <div className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-blue-500/20 text-blue-300 text-xs md:text-sm font-semibold">{pkg.tag}</div>
                  ) : pkg.id === '6aylik' ? (
                    <div className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-amber-500/20 text-amber-300 text-xs md:text-sm font-semibold">{pkg.tag}</div>
                  ) : (
                    <div className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-purple-500/20 text-purple-300 text-xs md:text-sm font-semibold">{pkg.tag}</div>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-3">{pkg.name}</h3>
                <p className="text-sm md:text-base text-slate-300 mb-4 md:mb-6">{pkg.description}</p>
                <div className="relative mb-6 md:mb-10">
                  <div className="absolute -inset-2 md:-inset-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/5 to-transparent blur-lg"></div>
                  <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-4 md:p-6 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center space-x-2 md:space-x-3 mb-2">
                      <span className="text-2xl md:text-4xl font-black bg-gradient-to-br from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">{pkg.price}</span>
                    </div>

                    <div className="mt-3 text-center text-xs text-slate-400">
                      {pkg.id === 'yillik' ? '1 yıllık peşin ödeme' : pkg.id === '6aylik' ? '6 aylık peşin ödeme' : 'Çoklu şube özel fiyat'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-10">
                {pkg.features.map((feature, index) => (
                  <div key={feature.name} className="">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-left text-slate-200 font-semibold hover:bg-white/10 transition-all duration-150 group"
                      onClick={() => setAccordionOpen((open) => ({ ...open, [pkg.id]: open[pkg.id] === index ? null : index }))}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span>{feature.name}</span>
                      </div>
                      {accordionOpen[pkg.id] === index ? (
                        <ChevronUp className="w-5 h-5 text-slate-400 transition-transform duration-100" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-100" />
                      )}
                    </button>
                    {accordionOpen[pkg.id] === index && (
                      <div className="px-4 py-3 text-sm text-slate-300 bg-slate-800/80 rounded-b-lg border-t border-slate-600">
                        {feature.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => router.push('/isletme')} className={`w-full py-4 md:py-5 rounded-xl font-bold text-base md:text-lg transition-all hover:scale-[1.02] ${pkg.popular ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 hover:from-amber-500 hover:to-yellow-600 shadow-xl shadow-amber-500/25' : 'bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-600 hover:to-slate-700 border border-slate-600'}`}>
                {pkg.popular ? '🚀 Hemen Başla' : 'Paketi Seç'}
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-slate-300">
            <Shield className="w-6 h-6 mr-3 text-amber-400" />
            <span className="font-semibold">14 gün ücretsiz deneme • İlk ay iptal hakkı (sadece kurulum ücreti ödenir) • İhtiyacınız kadar oda, o kadar QR kod</span>
          </div>
        </div>

        {/* Ödeme Bilgileri */}
        <div className="mt-16 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-xl opacity-70"></div>
          <div className="relative p-10 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 mr-4">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">Ödeme Bilgileri</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mr-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Kurulum Ücreti</h4>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-300 mb-2">Tek Seferlik Ödeme</div>
                  <p className="text-slate-300 text-sm">Fiyat için iletişime geçiniz</p>
                  <p className="text-slate-400 text-xs mt-2">Sistem kurulumu, QR kodların hazırlanması dahil</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mr-4">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Eğitim Ücreti</h4>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-green-300 mb-2">Tek Seferlik Ödeme</div>
                  <p className="text-slate-300 text-sm">Fiyat için iletişime geçiniz</p>
                  <p className="text-slate-400 text-xs mt-2">Tüm personel için kapsamlı eğitim</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mr-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">Minimum Ücret</h4>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-purple-300 mb-2">İletişime Geçiniz</div>
                  <p className="text-slate-300 text-sm">Aylık minimum ödeme</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >

      {/* FAQ Section */}
      < div className="py-12 md:py-20 bg-gray-50" >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 tracking-tight">Sıkça Sorulan Sorular</h2>
            <p className="text-base md:text-xl text-gray-600">Merak ettiğiniz her şey burada</p>
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
      </div >
      {/* CTA Section */}
      < div className="py-12 md:py-24 bg-slate-900 relative overflow-hidden" >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs md:text-sm font-medium mb-6 md:mb-8">
            <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Hemen Başlayın
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-3 md:mb-6 tracking-tight">Otelinizi Dijitalleştirin</h2>
          <p className="text-lg md:text-2xl text-slate-300 mb-8 md:mb-12 leading-relaxed">Sadece birkaç dakikada modern otel yönetimine geçin</p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <button onClick={() => router.push('/isletme')} className="px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-2xl shadow-amber-500/25 hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 hover:scale-105 hover:shadow-3xl">
              🚀 Ücretsiz Denemeye Başla
            </button>
            <button onClick={() => router.push('/guest/demo')} className="px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-bold text-white border-2 border-white/30 hover:bg-white hover:text-slate-900 transition-all duration-200 backdrop-blur-sm hover:scale-105">
              👀 Canlı QR Demo
            </button>
            <button onClick={() => router.push('/paneller')} className="px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-bold text-white border-2 border-white/30 hover:bg-white hover:text-slate-900 transition-all duration-200 backdrop-blur-sm hover:scale-105">
              🧭 Panelleri Görüntüle
            </button>
          </div>
        </div>
      </div >



      {/* Footer */}

      < footer className="bg-slate-900 text-white py-20 relative overflow-hidden" >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.03),transparent_60%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <QrCode className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">RoomXQR</span>
                  <span className="text-xs text-slate-400 font-medium">QR Solutions</span>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">Otel yönetimini dijitalleştiren, misafir deneyimini dönüştüren kapsamlı çözüm.</p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">Ürün</h3>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Özellikler
                </a></li>
                <li><a href="#packages" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Paketler
                </a></li>
                <li><a href="/paneller" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Demo
                </a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  API
                </a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">Destek</h3>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Yardım Merkezi
                </a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Dokümantasyon
                </a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  İletişim
                </a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Durum
                </a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-amber-400">Şirket</h3>
              <ul className="space-y-3 text-slate-300">
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Hakkımızda
                </a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Kariyer
                </a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Blog
                </a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                  Basın
                </a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">© 2024 RoomXQR. Tüm hakları saklıdır.</p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Gizlilik Politikası</a>
                <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Kullanım Şartları</a>
                <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Çerez Politikası</a>
              </div>
            </div>
          </div>
        </div>
      </footer >

    </div >
  );
}
