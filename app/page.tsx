"use client";
import Link from 'next/link';
import { FaUserPlus, FaLaptopCode, FaVideo, FaBookOpen } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      
      {/* --- BACKGROUND VIDEO --- */}
      <video 
        autoPlay loop muted playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none"
      >
        <source src="/Background/bg2.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        
        {/* --- PROMOTIONAL BANNER --- */}
        <section className="w-full bg-gradient-to-r from-gray-950 via-slate-900 to-slate-950 py-10 md:py-16 px-6 border-b-4 border-amber-400 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
            
            {/* Left Side: Animated Text */}
            <div className="lg:w-3/5 text-center lg:text-left space-y-5">
              <div className="inline-block bg-amber-400 text-slate-950 px-3 py-1 rounded-full font-black text-xs md:text-sm uppercase tracking-wider shadow-lg">
                ভর্তি চলছে — শিক্ষাবর্ষ ২০২৬
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-white via-amber-200 to-purple-200 bg-clip-text text-transparent animate-color-shift">
                আপনার সন্তানের উজ্জল ভবিষ্যৎ আমাদের অঙ্গীকার
              </h1>
              
              <p className="max-w-xl mx-auto lg:mx-0 leading-relaxed bg-gradient-to-r from-slate-200 via-amber-100 to-slate-100 bg-clip-text text-transparent text-base md:text-lg animate-color-shift">
                আধুনিক ডিজিটাল ল্যাব, সিসি ক্যামেরা নিয়ন্ত্রিত ক্যাম্পাস এবং নৈতিক শিক্ষার সমন্বয়ে মিরপুরের শ্রেষ্ঠ বিদ্যাপীঠ। প্লে থেকে দশম শ্রেণি পর্যন্ত ভর্তি চলছে!
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-5">
                <FeatureBadge icon={<FaLaptopCode />} text="ডিজিটাল ল্যাব" />
                <FeatureBadge icon={<FaVideo />} text="সিসি ক্যামেরা" />
                <FeatureBadge icon={<FaBookOpen />} text="আরবি সম্পূর্ণ ফ্রি" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                {/* RAINBOW BUTTON CONTAINER */}
                <Link 
                  href="/admission" 
                  className="btn-rainbow-focus inline-block group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-black text-lg transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] group-hover:scale-105 active:scale-95">
                    <FaUserPlus className="transition-transform group-hover:rotate-12"/> এখনই ভর্তি হোন
                  </span>
                </Link>
                
                {/* REPLACED BUTTON WITH LOCATION */}
                <div className="bg-white/5 text-white border border-white/20 px-6 py-4 rounded-xl font-bold text-base md:text-lg backdrop-blur-md flex items-center shadow-lg">
                  📍 ২৯ আল মদিনা রোড, মিরপুর-১
                </div>
              </div>
            </div>

            {/* Right Side: Location Map (Mobile Responsive) */}
            <div className="lg:w-2/5 w-full relative flex justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="w-full max-w-md bg-white/10 p-3 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-2xl relative">
                <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden bg-gray-100">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.643336440232!2d90.344445376106!3d23.795701887034176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0e0727a0431%3A0xe52a5b521283c254!2sHabiba%20international%20school!5e0!3m2!1sen!2sbd!4v1711960000000!5m2!1sen!2sbd" 
                    className="absolute top-0 left-0 w-full h-full border-0" 
                    allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map Location"
                  ></iframe>
                </div>
                <div className="mt-4 text-center pb-2">
                  <a href="https://maps.app.goo.gl/BTE7EA2fDgbrSAKR7" target="_blank" className="inline-block bg-amber-400 text-slate-950 px-8 py-3 rounded-xl font-bold hover:bg-amber-500 transition shadow-lg text-sm">
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

function FeatureBadge({ icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-xs md:text-sm font-medium">
      <span className="text-amber-400">{icon}</span>
      {text}
    </div>
  );
}