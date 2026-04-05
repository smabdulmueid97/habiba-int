"use client";

import Link from 'next/link';
import { FaCalendarAlt } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import { useLanguage } from '@/context/LanguageContext';

// 1. We import the JSON file directly! Next.js automatically turns this into a JavaScript array.
import notices from '../../public/Database/notice.json';

export default function Notice() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-yellow-50 p-4 md:p-12">
      
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-8 text-center md:text-left pt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-900">
          {t("নোটিশ বোর্ড", "Notice Board")}
        </h1>
        <p className="mt-2 text-gray-700">
          {t(
            "স্কুলের সকল গুরুত্বপূর্ণ নোটিশ, পরীক্ষার রুটিন এবং ছুটির তালিকা নিচে দেওয়া হলো।",
            "All important notices, exam routines, and holiday lists are available below."
          )}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* ========================================= */}
        {/* MOBILE VIEW: Cards (Hidden on Desktop)    */}
        {/* ========================================= */}
        <div className="md:hidden space-y-4">
          {/* The imported 'notices' array works exactly the same as the old hardcoded one! */}
          {notices.map((notice) => (
            <div key={notice.id} className="bg-yellow-100 p-5 rounded-xl shadow-md border border-yellow-200 flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-yellow-200 pb-2">
                <span className="text-sm font-bold text-purple-900 flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-700" /> {language === "BN" ? notice.date : notice.dateEn}
                </span>
                <span className="bg-yellow-50 border border-yellow-300 text-gray-800 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                  {language === "BN" ? notice.category : notice.categoryEn}
                </span>
              </div>
              <h2 className="text-base font-semibold text-gray-900 leading-snug">
                {language === "BN" ? notice.subject : notice.subjectEn}
              </h2>
              <Link 
                href={notice.detailsLink}
                className="mt-2 w-full text-center bg-purple-700 text-white hover:bg-purple-800 py-3 rounded-lg font-bold transition shadow-sm text-sm flex justify-center items-center gap-2"
              >
                <MdFileDownload className="text-xl" /> {t("ডাউনলোড", "Download")}
              </Link>
            </div>
          ))}
        </div>

        {/* ========================================= */}
        {/* DESKTOP VIEW: Table (Hidden on Mobile)    */}
        {/* ========================================= */}
        <div className="hidden md:block bg-yellow-100 rounded-xl shadow-lg border border-yellow-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-800 text-white text-base">
                <th className="p-4 font-semibold whitespace-nowrap">{t("তারিখ", "Date")}</th>
                <th className="p-4 font-semibold">{t("বিষয়", "Subject")}</th>
                <th className="p-4 font-semibold whitespace-nowrap">{t("ক্যাটাগরি", "Category")}</th>
                <th className="p-4 font-semibold text-center whitespace-nowrap">{t("ডাউনলোড", "Download")}</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-base">
              {notices.map((notice) => (
                <tr key={notice.id} className="border-b border-yellow-200 hover:bg-yellow-200 transition duration-150">
                  <td className="p-4 whitespace-nowrap text-purple-900 font-bold flex items-center gap-2 h-full mt-1">
                    <FaCalendarAlt className="text-purple-600" /> {language === "BN" ? notice.date : notice.dateEn}
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {language === "BN" ? notice.subject : notice.subjectEn}
                  </td>
                  <td className="p-4">
                    <span className="bg-yellow-50 border border-yellow-300 text-gray-800 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                      {language === "BN" ? notice.category : notice.categoryEn}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Link 
                      href={notice.detailsLink}
                      className="inline-flex items-center justify-center gap-2 bg-purple-100 text-purple-800 hover:bg-purple-700 hover:text-white px-5 py-2 rounded-lg font-bold transition shadow-sm text-sm"
                    >
                      <MdFileDownload className="text-xl" /> {t("ডাউনলোড", "Download")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-yellow-50 p-4 border-t border-yellow-200 text-center text-sm text-gray-600 font-medium">
            {t("সর্বশেষ আপডেট: ০১ এপ্রিল ২০২৬", "Last updated: April 1, 2026")}
          </div>
        </div>

      </div>
    </main>
  );
}
