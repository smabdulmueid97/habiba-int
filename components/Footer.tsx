"use client";
import Link from 'next/link';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const phone = t("০১৭XX-XXXXXX", "017XX-XXXXXX");

  return (
    // 'bg-black' makes it pitch black. 'pt-16 pb-8' makes it thick and tall.
    // Added a subtle purple top border to seamlessly tie into your school's theme colors.
    <footer className="bg-black text-white pt-16 pb-8 border-t-[4px] border-purple-900">
      
      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Column 1: About the School */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            {t("হাবিবা ইন্টারন্যাশনাল স্কুল", "Habiba International School")}
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            {t(
              "একটি আধুনিক, বিজ্ঞানসম্মত ও নৈতিক শিক্ষায় আলোকিত প্রজন্ম গড়ার প্রত্যয়ে আমাদের পথচলা। শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ গড়তে আমরা সর্বদা সচেষ্ট।",
              "We are committed to building an enlightened generation through modern, scientific, and moral education. We are always dedicated to shaping a bright future for our students."
            )}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2 inline-block">
            {t("গুরুত্বপূর্ণ লিংক", "Quick Links")}
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm md:text-base">
            <li><Link href="/notice" className="hover:text-purple-400 transition-colors">{t("নোটিশ বোর্ড", "Notice Board")}</Link></li>
            <li><Link href="/teachers" className="hover:text-purple-400 transition-colors">{t("আমাদের শিক্ষকগণ", "Our Teachers")}</Link></li>
            <li><Link href="/results-activities" className="hover:text-purple-400 transition-colors">{t("রেজাল্ট ও ক্রিয়া", "Results & Activities")}</Link></li>
            <li><Link href="/admission" className="hover:text-purple-400 transition-colors">{t("ভর্তি ও তথ্যাদি", "Admission & Info")}</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2 inline-block">
            {t("যোগাযোগ", "Contact")}
          </h3>
          <ul className="space-y-4 text-gray-400 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-purple-400 mt-1 shrink-0 text-lg" />
              <span>{t("২৯ আল মদিনা রোড, মিরপুর-১, ঢাকা", "29 Al Madina Road, Mirpur-1, Dhaka")}</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-purple-400 shrink-0 text-lg" />
              <span>{phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-purple-400 shrink-0 text-lg" />
              <span>info@habiba-int-school.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar at the very bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-6 border-t border-gray-900 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Habiba International School. All rights reserved.
      </div>
      
    </footer>
  );
}
