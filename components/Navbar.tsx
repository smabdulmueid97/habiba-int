"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
// 1. Added FaUserCircle to the imports
import { FaPlayCircle, FaPauseCircle, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay waiting for user interaction...");
            setIsPlaying(false);
          });
      }
    };

    tryPlay();

    const handleFirstInteraction = () => {
      if (audio.paused) {
        tryPlay();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <nav className="bg-purple-900 text-white shadow-lg sticky top-0 z-50">
      <div className="w-full px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center">
        
        {/* Top Section: Logo, Title, Music Button & Hamburger */}
        <div className="flex justify-between items-center w-full md:w-auto">
          
          <div className="flex items-center gap-3">
            
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
              <div className="bg-white p-1 rounded-full shadow-md flex items-center justify-center shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Habiba International School Logo" 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
              </div>
              <span className="font-bold text-lg md:text-xl lg:text-2xl tracking-wide whitespace-nowrap">
                হাবিবা ইন্টারন্যাশনাল স্কুল
              </span>
            </Link>

            <button 
              onClick={togglePlay} 
              className="text-purple-300 hover:text-purple-200 text-3xl md:text-4xl transition-transform active:scale-95 focus:outline-none flex items-center justify-center shrink-0"
              title={isPlaying ? "সংগীত থামান" : "সংগীত শুনুন"}
            >
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </button>
            <audio ref={audioRef} src="/Music/his2026.mp3" preload="auto" />

          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-2xl focus:outline-none ml-2 shrink-0"
          >
            {isMobileMenuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Navigation Links Section */}
        <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row items-center gap-2 lg:gap-3 font-medium text-sm lg:text-base w-full">
            <li className="w-full md:w-auto"><Link href="/" className="block text-center border border-purple-300 px-3 py-2 md:py-1 rounded hover:bg-purple-800 hover:text-white transition duration-200 whitespace-nowrap">হোম</Link></li>
            <li className="w-full md:w-auto"><Link href="/notice" className="block text-center border border-purple-300 px-3 py-2 md:py-1 rounded hover:bg-purple-800 hover:text-white transition duration-200 whitespace-nowrap">নোটিশ</Link></li>
            <li className="w-full md:w-auto"><Link href="/results-activities" className="block text-center border border-purple-300 px-3 py-2 md:py-1 rounded hover:bg-purple-800 hover:text-white transition duration-200 whitespace-nowrap">রেজাল্ট ও ক্রিয়া</Link></li>
            <li className="w-full md:w-auto"><Link href="/teachers" className="block text-center border border-purple-300 px-3 py-2 md:py-1 rounded hover:bg-purple-800 hover:text-white transition duration-200 whitespace-nowrap">শিক্ষকগণ</Link></li>
            <li className="w-full md:w-auto"><Link href="/rules-info" className="block text-center border border-purple-300 px-3 py-2 md:py-1 rounded hover:bg-purple-800 hover:text-white transition duration-200 whitespace-nowrap">নিয়ম ও তথ্যাদি</Link></li>
            <li className="w-full md:w-auto"><Link href="/admission" className="block text-center border border-purple-300 px-3 py-2 md:py-1 rounded hover:bg-purple-800 hover:text-white transition duration-200 whitespace-nowrap">ভর্তি</Link></li>
            
            {/* 2. Replaced 'একাউন্ট' text with FaUserCircle icon */}
            <li className="w-full md:w-auto">
              <Link 
                href="/account" 
                title="একাউন্ট" 
                className="flex justify-center  px-3 py-2 md:py-1 rounded hover:bg-purple-800 hover:text-white transition duration-200 whitespace-nowrap"
              >
                <FaUserCircle className="text-xl md:text-2xl" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}