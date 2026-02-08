"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useLanguageStore, languages } from '@/store/languageStore';

export default function LandingLanguageToggle() {
    const { currentLanguage, setLanguage } = useLanguageStore();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentLang = languages.find(l => l.code === currentLanguage) || languages[0];

    return (
        <div className={`fixed top-4 right-4 z-[100] transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all shadow-2xl group"
                >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg overflow-hidden border border-white/10">
                        {currentLang.flag}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest hidden md:block">
                        {currentLang.name}
                    </span>
                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-2"
                        >
                            <div className="grid grid-cols-1 gap-1">
                                {languages.filter(l => ['tr', 'en', 'de'].includes(l.code)).map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${currentLanguage === lang.code
                                                ? 'bg-blue-600 text-white'
                                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <span className="text-xl">{lang.flag}</span>
                                        <div className="text-left">
                                            <div className="text-xs font-black uppercase tracking-widest">{lang.name}</div>
                                            <div className="text-[10px] opacity-60 font-bold">{lang.nativeName}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
