import fs from 'fs';
import path from 'path';
import ImageSlider from '@/components/ImageSlider';
import accomplishments from '../../public/Database/results-activities.json';
import Link from 'next/link';
import { FaDownload, FaFilePdf, FaTable, FaAward } from 'react-icons/fa';

// 1. Static Data for the Table
const academicData = [
  { class: "প্লে (Play)", syllabus: "/Downloads/play-syllabus.pdf", result: "/Downloads/play-result.pdf" },
  { class: "নার্সারি (Nursery)", syllabus: "#", result: "#" },
  { class: "কেজি (KG)", syllabus: "#", result: "#" },
  { class: "প্রথম (One)", syllabus: "#", result: "#" },
  { class: "দ্বিতীয় (Two)", syllabus: "#", result: "#" },
  { class: "তৃতীয় (Three)", syllabus: "#", result: "#" },
  { class: "চতুর্থ (Four)", syllabus: "#", result: "#" },
  { class: "পঞ্চম (Five)", syllabus: "#", result: "#" },
  { class: "ষষ্ঠ (Six)", syllabus: "#", result: "#" },
  { class: "সপ্তম (Seven)", syllabus: "#", result: "#" },
  { class: "অষ্টম (Eight)", syllabus: "#", result: "#" },
  { class: "নবম (Nine)", syllabus: "#", result: "#" },
  { class: "দশম (Ten)", syllabus: "#", result: "#" },
];

// Helper to shuffle the image gallery
function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function ResultsAndActivities() {
  // 2. Server-side Image Fetching
  let imageFiles: string[] = [];
  try {
    const picturesDirectory = path.join(process.cwd(), 'public/Pictures');
    const files = fs.readdirSync(picturesDirectory);
    imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => `/Pictures/${file}`);
    imageFiles = shuffleArray(imageFiles);
  } catch (error) {
    console.error("Directory read error:", error);
  }

  return (
    <main className="min-h-screen bg-white p-4 md:p-12">
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-10 border-b pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">রেজাল্ট ও ক্রিয়া</h1>
          <p className="text-gray-500 text-sm mt-1">একাডেমিক ফলাফল এবং সহশিক্ষা কার্যক্রমের তথ্যাদি</p>
        </div>
        <div className="bg-amber-400 text-slate-900 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
          Academic Hub 2026
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: Gallery and Accomplishments */}
        <div className="flex flex-col lg:flex-row gap-10 items-start mb-16">
          
          {/* Left Side: Image Slider (2/3) */}
          <div className="w-full lg:w-2/3">
             <div className="bg-slate-50 p-2 rounded-[2rem] border border-gray-100 shadow-inner">
                <ImageSlider images={imageFiles} />
             </div>
          </div>

          {/* Right Side: Achievements (1/3) */}
          <div className="w-full lg:w-1/3 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FaAward className="text-amber-500" /> অর্জিত সাফল্য
            </h2>
            {accomplishments.map((data) => (
              <div key={data.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800">{data.title}</h3>
                  <span className="bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold">{data.year}</span>
                </div>
                <ul className="space-y-3">
                  {data.achievements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                      <span className="text-amber-500 mt-0.5">★</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: Full-Width Table */}
        <section className="w-full bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-xl">
          <div className="bg-slate-950 p-6 flex items-center gap-4 text-white">
            <div className="bg-amber-400 p-2.5 rounded-xl text-slate-950 text-xl">
              <FaTable />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">সিলেবাস ও ফলাফল ডাউনলোড</h2>
              <p className="text-slate-400 text-xs">শ্রেণি অনুযায়ী আপনার প্রয়োজনীয় ফাইলটি সংগ্রহ করুন</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-slate-600">
                  <th className="px-8 py-5 font-black text-sm uppercase tracking-wider">শ্রেণি (Class)</th>
                  <th className="px-8 py-5 font-black text-sm uppercase tracking-wider text-center">সিলেবাস (Syllabus)</th>
                  <th className="px-8 py-5 font-black text-sm uppercase tracking-wider text-center">ফলাফল (Final Result)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {academicData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-800 md:text-lg">{item.class}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <Link 
                        href={item.syllabus} 
                        className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        <FaFilePdf /> ডাউনলোড
                      </Link>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <Link 
                        href={item.result} 
                        className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm"
                      >
                        <FaDownload /> সংগ্রহ করুন
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50 p-6 text-center border-t border-gray-100 text-gray-400 text-xs italic">
            * ফাইল ডাউনলোড করতে সংশ্লিষ্ট বাটনে ক্লিক করুন। কোনো সমস্যা হলে অফিস যোগাযোগ করুন।
          </div>
        </section>

      </div>
    </main>
  );
}