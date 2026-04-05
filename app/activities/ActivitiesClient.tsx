"use client";

import ImageSlider from '@/components/ImageSlider';
import { FaAward } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

type Achievement = {
  id: number;
  year: string;
  yearEn?: string;
  title: string;
  titleEn?: string;
  achievements: string[];
  achievementsEn?: string[];
};

export default function ActivitiesClient({
  imageFiles,
  accomplishments,
}: {
  imageFiles: string[];
  accomplishments: Achievement[];
}) {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {t("ক্রিয়া", "Activities")}
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            {t(
              "আমাদের স্কুলের গৌরবময় সাফল্যসমূহ এবং বিভিন্ন ক্রিয়াকলাপের ঝলক",
              "Highlights of our school’s achievements and activities"
            )}
          </p>
        </div>

        {/* --- SECTION: GALLERY & SUCCESS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Gallery Slider */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-200">
              <ImageSlider images={imageFiles} />
            </div>
          </div>

          {/* Achievements */}
          <div className="order-1 lg:order-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
              <FaAward className="text-amber-500" /> {t("অর্জিত সাফল্য", "Achievements")}
            </h2>
            <div className="space-y-4">
              {accomplishments.map((data) => (
                <div key={data.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-800 leading-tight">
                      {language === "BN" ? data.title : data.titleEn ?? data.title}
                    </h3>
                    <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-bold shrink-0">
                      {language === "BN" ? data.year : data.yearEn ?? data.year}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {(language === "BN" ? data.achievements : data.achievementsEn ?? data.achievements).map(
                      (item, index) => (
                        <li key={index} className="text-xs text-slate-500 flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">★</span> {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
