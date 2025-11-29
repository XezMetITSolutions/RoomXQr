'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hotel, QrCode, Settings, CheckCircle, Star, Play, Shield, Globe, Smartphone, CreditCard, Zap, ChevronDown, ChevronUp, Camera, Image, Users, TrendingUp, Clock, DollarSign, Heart, MessageCircle, BarChart3, Award, Target, Sparkles, ArrowRight, CheckCircle2, XCircle, Lightbulb, Megaphone, ThumbsUp, Share2, Instagram, Facebook, Twitter } from 'lucide-react';
import { Language } from '@/types';
import { translate } from '@/lib/translations';
import HeroBlue from '../hero-blue';

export default function HomePageEN() {
    const router = useRouter();
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
    const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: number | null }>({ 'yillik': null, '6aylik': null, 'sube': null });

    useEffect(() => {
        const elements = document.querySelectorAll('[data-scroll]');
        elements.forEach((el) => {
            setVisibleElements(prev => new Set(prev).add(el.id));
        });

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

    const features = [
        { icon: QrCode, title: 'QR Code System', description: 'Guests instantly access the menu with a unique QR code for each room', color: 'text-blue-600' },
        { icon: Globe, title: 'Multi-Language Support', description: 'Perfect experience for international guests with AI-powered translation', color: 'text-green-600' },
        { icon: Camera, title: 'AI Image Enhancement', description: 'Transform phone photos into professional menu images', color: 'text-purple-600' },
        { icon: Zap, title: 'Real-Time', description: 'Fast service with instant notifications and updates', color: 'text-yellow-600' },
        { icon: CreditCard, title: 'Integrated Payment', description: 'Easy room service with secure payment system', color: 'text-indigo-600' },
        { icon: Smartphone, title: 'Mobile Friendly', description: 'Responsive design that works perfectly on all devices', color: 'text-pink-600' },
        { icon: Megaphone, title: 'Announcement System', description: 'Send special campaigns and announcements to guests', color: 'text-orange-600' },
        { icon: BarChart3, title: 'Detailed Analytics', description: 'Sales reports and customer behavior analysis', color: 'text-cyan-600' },
        { icon: Shield, title: 'Secure System', description: 'Industry-standard security and data protection', color: 'text-red-600' }
    ];

    const stats = [
        { number: '15+', label: 'Happy Hotels' },
        { number: '1.5K+', label: 'Daily Orders' },
        { number: '99.9%', label: 'Uptime' },
        { number: '24/7', label: 'Support' }
    ];

    const faqs = [
        { question: 'How does AI image enhancement work?', answer: 'When you upload product photos taken with your phone to the system, our AI technology automatically removes the background, corrects colors, adds professional shadows, and makes the image suitable for menu standards. This process takes only a few seconds.' },
        { question: 'How does the installation process work?', answer: 'Our installation process is very simple! After selecting your package, our technical team will contact you within 24 hours. They will create your QR codes, set up your system, and train your staff. The entire process is completed within 2-3 days.' },
        { question: 'How does social media integration work?', answer: 'We collect satisfaction surveys from your guests. We direct satisfied guests to your Instagram, Facebook, and Google My Business profiles. This way, you get organic follower growth and real customer reviews.' },
        { question: 'Is there a 14-day free trial?', answer: 'Yes! All our packages include a 14-day free trial period. During this time, you can test all features of the system and cancel without paying any fees if you are not satisfied.' },
        { question: 'What happens if I want to cancel?', answer: 'If you want to cancel, you only need to pay the setup fee (15,000₺). Customers who purchase 6-month or longer packages have the right to cancel within the first month.' }
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
                            <div
                                key={index}
                                id={`stat-${index}`}
                                data-scroll
                                className="text-center group"
                            >
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
                    <div
                        id="features-header"
                        data-scroll
                        className="text-center mb-8 md:mb-20"
                    >
                        <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-700 text-xs md:text-sm font-medium mb-4 md:mb-6">
                            <Zap className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                            Powerful Features
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-3 md:mb-6">Why RoomXQR?</h2>
                        <p className="text-base md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">All the features you need for modern hotel management in one platform</p>
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

            {/* FAQ Section */}
            <div className="py-12 md:py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 md:mb-4 tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-base md:text-xl text-gray-600">Everything you want to know is here</p>
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
                    <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs md:text-sm font-medium mb-6 md:mb-8">
                        <Zap className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Get Started Now
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-white mb-3 md:mb-6 tracking-tight">Digitalize Your Hotel</h2>
                    <p className="text-lg md:text-2xl text-slate-300 mb-8 md:mb-12 leading-relaxed">Switch to modern hotel management in just a few minutes</p>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                        <button onClick={() => router.push('/isletme')} className="px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-bold text-slate-900 bg-gradient-to-r from-amber-400 to-yellow-500 shadow-2xl shadow-amber-500/25 hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 hover:scale-105 hover:shadow-3xl">
                            🚀 Start Free Trial
                        </button>
                        <button onClick={() => router.push('/guest/demo')} className="px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl text-base md:text-xl font-bold text-white border-2 border-white/30 hover:bg-white hover:text-slate-900 transition-all duration-200 backdrop-blur-sm hover:scale-105">
                            👀 Live QR Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.03),transparent_60%)]"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-slate-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-slate-400 text-sm">© 2024 RoomXQR. All rights reserved.</p>
                            <div className="flex space-x-8 mt-4 md:mt-0">
                                <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Privacy Policy</a>
                                <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Terms of Service</a>
                                <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Cookie Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
