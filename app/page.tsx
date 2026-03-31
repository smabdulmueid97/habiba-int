"use client";
import Link from 'next/link';
// Importing specific icons for the new theme
import { FaUserPlus, FaCheckCircle, FaLaptopCode, FaVideo, FaBookOpen, FaAward } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      
      {/* --- BACKGROUND VIDEO (10% Opacity) --- */}
      <video 
        autoPlay loop muted playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 pointer-events-none"
      >
        <source src="/Background/bg2.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        
        {/* ========================================= */}
        {/* 1. NEW REFINED PROMOTIONAL BANNER         */}
        {/* ========================================= */}
        <section className="w-full bg-gradient-to-r from-gray-950 via-slate-900 to-slate-950 py-10 md:py-16 px-6 border-b-4 border-amber-400 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
            
            {/* Left Side: Promotional Text (Smaller Sizes) */}
            <div className="lg:w-3/5 text-center lg:text-left space-y-5">
              <div className="inline-block bg-amber-400 text-slate-950 px-3 py-1 rounded-full font-black text-xs md:text-sm uppercase tracking-wider shadow-lg">
                ভর্তি চলছে — শিক্ষাবর্ষ ২০২৬
              </div>
              {/* Reduced size to 4xl/5xl/6xl for a cleaner look */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                আপনার সন্তানের <span className="text-amber-400">উজ্জ্বল ভবিষ্যৎ</span> আমাদের অঙ্গীকার
              </h1>
              {/* Reduced size to lg/xl */}
              <p className="text-slate-200 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                আধুনিক ডিজিটাল ল্যাব, সিসি ক্যামেরা নিয়ন্ত্রিত ক্যাম্পাস এবং নৈতিক শিক্ষার সমন্বয়ে মিরপুরের শ্রেষ্ঠ বিদ্যাপীঠ। প্লে থেকে দশম শ্রেণি পর্যন্ত ভর্তি চলছে!
              </p>
              
              {/* Feature Badges (Sleeker design) */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-5">
                <FeatureBadge icon={<FaLaptopCode />} text="ডিজিটাল ল্যাব" />
                <FeatureBadge icon={<FaVideo />} text="সিসি ক্যামেরা" />
                <FeatureBadge icon={<FaBookOpen />} text="আরবি সম্পূর্ণ ফ্রি" />
              </div>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <Link href="/admission" className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-8 py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center justify-center gap-2 group">
                  <FaUserPlus className="group-hover:scale-110 transition-transform"/> এখনই ভর্তি হোন
                </Link>
                <Link href="/rules-info" className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-base transition-all backdrop-blur-md">
                  বিস্তারিত জানুন
                </Link>
              </div>
            </div>

            {/* Right Side: High-End Graphic & Animated Badge */}
            <div className="lg:w-2/5 w-full relative flex justify-center lg:justify-end">
              <div className="bg-white/5 p-4 rounded-[2.5rem] backdrop-blur-sm border border-white/10 shadow-2xl relative max-w-sm">
                {/* School Logo */}
                <img 
                  src="/logo.png" 
                  alt="Habiba School Logo" 
                  className="w-full h-auto rounded-[2rem] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                />
                
                {/* Floating "1000%" Success Badge (Right below the logo, or -left/top) */}
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 animate-pulse-slow">
                  <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600 text-xl"><FaAward /></div>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">পাসের হার</p>
                    <p className="text-2xl font-black text-slate-950 tracking-tighter">১০০০%</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================= */}
        {/* 2. MAP & CONTACT SECTION                  */}
        {/* ========================================= */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
            
            <div className="lg:w-1/2 space-y-6">
              <span className="text-slate-700 font-black tracking-widest uppercase">লোকেশন</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                সহজেই আমাদের <span className="text-slate-600">খুঁজে পান</span>
              </h2>
              <p className="text-gray-600 text-lg">
                মিরপুর-১ এর প্রাণকেন্দ্রে নিরাপদ ও মনোরম পরিবেশে আমাদের ক্যাম্পাস অবস্থিত। যেকোনো তথ্যের জন্য সরাসরি অফিসে চলে আসুন।
              </p>
              <div className="p-6 bg-slate-50 rounded-2xl border-l-8 border-slate-950 shadow-sm">
                <p className="text-slate-950 font-bold text-xl">📍 ২৯ আল মদিনা রোড, মিরপুর-১</p>
                <p className="text-gray-500 mt-2 font-medium">খোলা আছে: শনি-বৃহস্পতি (সকাল ৮টা - বিকাল ৪টা)</p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="w-full max-w-lg bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden ml-auto">
                <div className="relative w-full h-80 rounded-3xl overflow-hidden bg-gray-100">
                  <iframe 
                    src="https://maps.google.com/maps?q=Habiba%20International%20School,%2029%20Al%20Madina%20Road,%20Mirpur%20-1,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    className="absolute top-0 left-0 w-full h-full border-0" 
                    allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map Location"
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <a href="https://www.google.com/maps/search/?api=1&query=Habiba+International+School+Mirpur+Dhaka" target="_blank" className="inline-block bg-slate-950 text-white px-10 py-3 rounded-xl font-bold hover:bg-black transition shadow-lg text-sm">
                    গুগল ম্যাপে দেখুন
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

// Helper Component for the Feature Badges (Updated Color)
function FeatureBadge({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs md:text-sm font-medium">
      <span className="text-amber-400">{icon}</span>
      {text}
    </div>
  );
}