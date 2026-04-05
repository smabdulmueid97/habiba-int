"use client"; 

import { FaBookReader, FaBriefcase, FaPhoneAlt } from "react-icons/fa";
import teachers from '../../public/Database/teachers.json';
import { useLanguage } from "@/context/LanguageContext";

export default function Teachers() {
  const { t, language } = useLanguage();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white p-6 md:p-12">
      
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-900">
          {t("আমাদের শিক্ষকগণ", "Our Teachers")}
        </h1>
        <p className="mt-3 text-gray-700 text-sm md:text-base max-w-3xl mx-auto">
          {t(
            "আমাদের রয়েছেন একদল উচ্চ শিক্ষিত, অভিজ্ঞ এবং নিবেদিতপ্রাণ শিক্ষকমণ্ডলী, যারা শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ গড়তে সর্বদা সচেষ্ট।",
            "We have a team of highly educated, experienced, and dedicated teachers committed to building a bright future for our students."
          )}
        </p>
      </div>

      {/* Teachers Directory List */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {teachers.map((teacher, index) => (
          <div 
            key={teacher.id} 
            className={`p-6 md:p-8 flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-10 hover:bg-gray-50 transition-colors duration-200 ${
              index !== teachers.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            
            {/* Circular Profile Picture looking inside public/Teachers-Profile */}
            <div className="shrink-0 relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-purple-300 shadow-sm bg-gray-200">
                <img 
                  src={`/Teachers-Profile/${teacher.image}`} 
                  alt={`${teacher.name} - Profile Picture`} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=No+Photo" }}
                />
              </div>
            </div>

            {/* Teacher Information Grid */}
            <div className="flex-1 w-full text-center md:text-left grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              
              {/* Name AND Designation */}
              <div className="md:col-span-1 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {language === "BN" ? teacher.name : teacher.nameEn ?? teacher.name}
                </h2>
                <span className="text-sm md:text-base font-bold text-purple-700 mt-1">
                  {language === "BN" ? teacher.designation : teacher.designationEn ?? teacher.designation}
                </span>
              </div>
              
              {/* Subject */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-gray-800 text-sm md:text-base md:col-span-1 md:justify-center">
                <div className="text-purple-700 mt-0.5 hidden md:block">
                  <FaBookReader />
                </div>
                <span className="font-medium">
                  <span className="text-gray-500 text-xs block md:inline md:mr-1">
                    {t("বিষয়:", "Subject:")}
                  </span>
                  {language === "BN" ? teacher.subject : teacher.subjectEn ?? teacher.subject}
                </span>
              </div>

              {/* Experience */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-gray-800 text-sm md:text-base md:col-span-1 md:justify-center">
                <div className="text-purple-700 mt-0.5 hidden md:block">
                  <FaBriefcase />
                </div>
                <span className="font-medium">
                  <span className="text-gray-500 text-xs block md:inline md:mr-1">
                    {t("অভিজ্ঞতা:", "Experience:")}
                  </span>
                  {language === "BN" ? teacher.experience : teacher.experienceEn ?? teacher.experience}
                </span>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-gray-800 text-sm md:text-base md:col-span-1 md:justify-end">
                <div className="text-purple-700 mt-0.5 hidden md:block">
                  <FaPhoneAlt />
                </div>
                <span className="font-medium">
                  <span className="text-gray-500 text-xs block md:inline md:mr-1">
                    {t("মোবাইল:", "Phone:")}
                  </span>
                  {language === "BN" ? teacher.phone : teacher.phoneEn ?? teacher.phone}
                </span>
              </div>

            </div>
            
            {/* Mobile Call Button */}
            <div className="md:hidden w-full mt-2">
             <a 
                 href={`tel:${language === "BN" ? teacher.phone : teacher.phoneEn ?? teacher.phone}`} 
                 className="block w-full text-center bg-purple-100 text-purple-800 font-bold py-2 rounded-lg text-sm hover:bg-purple-200 transition"
               >
                 {t("কল করুন", "Call Now")}
               </a>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}
