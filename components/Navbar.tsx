"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FaPlayCircle, FaPauseCircle, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-close menu when a link is clicked
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
            <span className="font-bold text-lg md:text-xl tracking-tight">হাবিবা ইন্টারন্যাশনাল</span>
          </Link>

          {/* Music Button */}
          <button onClick={togglePlay} className="text-purple-300 text-3xl transition-transform active:scale-95">
            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
          </button>
          <audio ref={audioRef} src="/Music/his2026.mp3" preload="auto" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 font-medium">
          <li><Link href="/" className="hover:text-purple-300 transition">হোম</Link></li>
          <li><Link href="/notice" className="hover:text-purple-300 transition">নোটিশ</Link></li>
          <li><Link href="/results-activities" className="hover:text-purple-300 transition">রেজাল্ট</Link></li>
          <li><Link href="/teachers" className="hover:text-purple-300 transition">শিক্ষকগণ</Link></li>
          <li><Link href="/rules-info" className="hover:text-purple-300 transition">তথ্য</Link></li>
          <li><Link href="/admission" className="hover:text-purple-300 transition">ভর্তি</Link></li>
          <li><Link href="/account" className="text-2xl hover:text-purple-300"><FaUserCircle /></Link></li>
        </ul>

        {/* Hamburger Icon */}
        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-2xl p-2">
          <FaBars />
        </button>
      </div>

      {/* --- MOBILE SIDE NAV DRAWER --- */}
      <div className={`fixed inset-0 bg-black/60 z-[200] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu} />
      
      <div className={`fixed top-0 right-0 h-full w-64 bg-purple-950 shadow-2xl z-[201] p-6 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-10">
          <span className="font-bold text-purple-300">মেনু</span>
          <button onClick={closeMenu} className="text-2xl text-white"><FaTimes /></button>
        </div>

        <ul className="flex flex-col gap-6 text-lg font-semibold" onClick={closeMenu}>
          <li><Link href="/" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> হোম</Link></li>
          <li><Link href="/notice" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> নোটিশ</Link></li>
          <li><Link href="/results-activities" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> রেজাল্ট ও ক্রিয়া</Link></li>
          <li><Link href="/teachers" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> শিক্ষকগণ</Link></li>
          <li><Link href="/rules-info" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> নিয়ম ও তথ্যাদি</Link></li>
          <li><Link href="/admission" className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-purple-400 rounded-full"/> ভর্তি</Link></li>
          <li className="mt-4 pt-4 border-t border-purple-800">
            <Link href="/account" className="flex items-center gap-3 text-purple-300"><FaUserCircle className="text-2xl" /> একাউন্ট লগইন</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}