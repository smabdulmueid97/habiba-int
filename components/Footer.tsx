import Link from 'next/link';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    // 'bg-black' makes it pitch black. 'pt-16 pb-8' makes it thick and tall.
    // Added a subtle purple top border to seamlessly tie into your school's theme colors.
    <footer className="bg-black text-white pt-16 pb-8 border-t-[4px] border-purple-900">
      
      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Column 1: About the School */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            হাবিবা ইন্টারন্যাশনাল স্কুল
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            একটি আধুনিক, বিজ্ঞানসম্মত ও নৈতিক শিক্ষায় আলোকিত প্রজন্ম গড়ার প্রত্যয়ে আমাদের পথচলা। শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ গড়তে আমরা সর্বদা সচেষ্ট।
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2 inline-block">
            গুরুত্বপূর্ণ লিংক
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm md:text-base">
            <li><Link href="/notice" className="hover:text-purple-400 transition-colors">নোটিশ বোর্ড</Link></li>
            <li><Link href="/teachers" className="hover:text-purple-400 transition-colors">আমাদের শিক্ষকগণ</Link></li>
            <li><Link href="/results-activities" className="hover:text-purple-400 transition-colors">রেজাল্ট ও ক্রিয়া</Link></li>
            <li><Link href="/admission" className="hover:text-purple-400 transition-colors">ভর্তি ও তথ্যাদি</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white border-b border-gray-800 pb-2 inline-block">
            যোগাযোগ
          </h3>
          <ul className="space-y-4 text-gray-400 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-purple-400 mt-1 shrink-0 text-lg" />
              <span>২৯ আল মদিনা রোড, মিরপুর-১, ঢাকা</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-purple-400 shrink-0 text-lg" />
              <span>০১৭XX-XXXXXX</span>
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