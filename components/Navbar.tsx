"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaPlayCircle, FaPauseCircle, FaUserCircle, FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { language, toggleLanguage, t } = useLanguage();

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const tryPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };
    tryPlay();
    const handleFirstInteraction = () => {
      if (audio.paused) tryPlay();
      document.removeEventListener('click', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <nav className="bg-purple-900 text-white shadow-lg sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-full shrink-0">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight">
              {t("হাবিবা ইন্টারন্যাশনাল", "Habiba International")}
            </span>
          </Link>

          {/* Music Button */}
          <button onClick={togglePlay} className="text-purple-300 text-3xl transition-transform active:scale-95">
            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
          </button>
          <audio ref={audioRef} src="/Music/his2026.mp3" preload="auto" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-4 font-medium text-sm">
          <li><Link href="/" className="hover:text-purple-300 transition">{t("হোম", "Home")}</Link></li>
          <li><Link href="/notice" className="hover:text-purple-300 transition">{t("নোটিশ", "Notices")}</Link></li>
          <li><Link href="/results-activities" className="hover:text-purple-300 transition">{t("রেজাল্ট", "Results")}</Link></li>
          <li><Link href="/activities" className="hover:text-purple-300 transition">{t("ক্রিয়া", "Activities")}</Link></li>
          <li><Link href="/digital-activities" className="hover:text-purple-300 transition">{t("ডিজিটাল কার্যক্রম", "Digital Activities")}</Link></li>
          <li><Link href="/teachers" className="hover:text-purple-300 transition">{t("শিক্ষকগণ", "Teachers")}</Link></li>
          <li><Link href="/rules-info" className="hover:text-purple-300 transition">{t("তথ্য", "Rules & Info")}</Link></li>
          <li><Link href="/admission" className="hover:text-purple-300 transition">{t("ভর্তি", "Admission")}</Link></li>
          <li><Link href="/pay-fees" className="bg-amber-500 text-purple-900 px-3 py-1 rounded-full hover:bg-amber-400 font-bold transition">{t("বেতন দিন", "Pay Fees")}</Link></li>
          
          {/* EN/BN Toggle */}
          <li>
            <button onClick={toggleLanguage} className="flex items-center gap-1 bg-purple-800 px-3 py-1 rounded-full hover:bg-purple-700 transition border border-purple-500">
              <FaGlobe /> {language === 'BN' ? 'EN' : 'BN'}
            </button>
          </li>
          
          <li><Link href="/account" className="text-2xl hover:text-purple-300 ml-2"><FaUserCircle /></Link></li>
        </ul>

        {/* Hamburger Icon */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden text-2xl p-2">
          <FaBars />
        </button>
      </div>

      {/* --- MOBILE SIDE NAV DRAWER --- */}
      <div className={`fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu} />
      
      <div className={`fixed top-0 right-0 h-full w-64 bg-purple-950 shadow-2xl z-[201] p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
          <span className="font-bold text-purple-300">{t("মেনু", "Menu")}</span>
          <button onClick={closeMenu} className="text-2xl text-white"><FaTimes /></button>
        </div>

        <ul className="flex flex-col gap-5 text-base font-semibold" onClick={closeMenu}>
          <li><Link href="/" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> {t("হোম", "Home")}</Link></li>
          <li><Link href="/notice" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> {t("নোটিশ", "Notices")}</Link></li>
          <li><Link href="/results-activities" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> {t("রেজাল্ট", "Results")}</Link></li>
          <li><Link href="/activities" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> {t("ক্রিয়া", "Activities")}</Link></li>
          <li><Link href="/digital-activities" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> {t("ডিজিটাল কার্যক্রম", "Digital Activities")}</Link></li>
          <li><Link href="/teachers" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> {t("শিক্ষকগণ", "Teachers")}</Link></li>
          <li><Link href="/rules-info" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> {t("নিয়ম ও তথ্যাদি", "Rules & Info")}</Link></li>
          <li><Link href="/admission" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> {t("ভর্তি", "Admission")}</Link></li>
          <li><Link href="/pay-fees" className="flex items-center gap-3 text-amber-400"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full"/> {t("বেতন দিন", "Pay Fees")}</Link></li>
          
          <li className="pt-2 border-t border-purple-800">
            <button onClick={(e) => { e.stopPropagation(); toggleLanguage(); }} className="flex items-center gap-2 text-purple-300 bg-purple-800/50 px-4 py-2 rounded-lg w-full">
              <FaGlobe /> {t("ভাষা পরিবর্তন", "Change Language")} ({language === 'BN' ? 'English' : 'বাংলা'})
            </button>
          </li>

          <li className="mt-2 pt-4 border-t border-purple-800">
            <Link href="/account" className="flex items-center gap-3 text-purple-300"><FaUserCircle className="text-2xl" /> {t("একাউন্ট লগইন", "Account Login")}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
