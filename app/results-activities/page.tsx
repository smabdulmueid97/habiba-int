import Link from 'next/link';
import { FaDownload, FaFilePdf, FaTable } from 'react-icons/fa';

// ৩টি টার্মের ডেমো ডাটা সেটআপ
const classes = [
  "প্লে (Play)", "নার্সারি (Nursery)", "কেজি (KG)", 
  "প্রথম (One)", "দ্বিতীয় (Two)", "তৃতীয় (Three)", 
  "চতুর্থ (Four)", "পঞ্চম (Five)", "ষষ্ঠ (Six)", 
  "সপ্তম (Seven)", "অষ্টম (Eight)", "নবম (Nine)", "দশম (Ten)"
];

const academicData = classes.map(cls => ({
  class: cls,
  syllabus: "#",
  term1: "#",
  term2: "#",
  final: "#"
}));

export default function Results() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
            রেজাল্ট ও সিলেবাস
          </h1>
          <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">
            শিক্ষার্থীদের বাৎসরিক ৩টি টার্মের (১ম সাময়িক, ২য় সাময়িক এবং বার্ষিক) ফলাফল এবং সিলেবাস এখান থেকে ডাউনলোড করতে পারবেন।
          </p>
        </div>

        {/* --- DOWNLOADS SECTION --- */}
        <section className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-amber-400 p-3 rounded-2xl text-slate-900">
                <FaTable className="text-2xl" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black">শ্রেণি ভিত্তিক ফলাফল</h2>
                <p className="text-slate-400 text-xs md:text-sm mt-1">২০২৬ শিক্ষাবর্ষ</p>
              </div>
            </div>
            
            {/* Legend for terms */}
            <div className="flex gap-3 text-xs font-bold">
              <span className="bg-blue-900/50 px-3 py-1.5 rounded-lg border border-blue-700/50">T1 = ১ম সাময়িক</span>
              <span className="bg-indigo-900/50 px-3 py-1.5 rounded-lg border border-indigo-700/50">T2 = ২য় সাময়িক</span>
              <span className="bg-green-900/50 px-3 py-1.5 rounded-lg border border-green-700/50">Final = বার্ষিক</span>
            </div>
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-sm font-black uppercase tracking-wider">
                  <th className="px-6 py-5 w-1/5">শ্রেণি (Class)</th>
                  <th className="px-6 py-5 text-center">সিলেবাস</th>
                  <th className="px-6 py-5 text-center">১ম সাময়িক ফলাফল</th>
                  <th className="px-6 py-5 text-center">২য় সাময়িক ফলাফল</th>
                  <th className="px-6 py-5 text-center">বার্ষিক ফলাফল</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {academicData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-800 text-base">{item.class}</span>
                      </div>
                    </td>
                    
                    <td className="px-4 py-4 text-center">
                      <Link href={item.syllabus} className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all">
                        <FaFilePdf className="text-red-500" /> সিলেবাস
                      </Link>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <Link href={item.term1} className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-all">
                        <FaDownload /> ডাউনলোড (T1)
                      </Link>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <Link href={item.term2} className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-600 hover:text-white transition-all">
                        <FaDownload /> ডাউনলোড (T2)
                      </Link>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <Link href={item.final} className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm">
                        <FaDownload /> ডাউনলোড (Final)
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE / TABLET CARD VIEW */}
          <div className="lg:hidden divide-y divide-slate-100 p-4">
            {academicData.map((item, idx) => (
              <div key={idx} className="py-6 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-2 border-b border-gray-100 pb-2">
                  <span className="bg-amber-400 text-slate-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">{idx + 1}</span>
                  <h3 className="font-black text-slate-900 text-xl">{item.class}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link href={item.syllabus} className="col-span-2 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 p-3 rounded-xl font-bold text-sm active:scale-95 transition-transform">
                    <FaFilePdf className="text-red-500 text-lg" /> সিলেবাস ডাউনলোড
                  </Link>
                  
                  <Link href={item.term1} className="flex flex-col items-center justify-center gap-1 bg-blue-50 text-blue-700 p-3 rounded-xl font-bold text-xs active:scale-95 transition-transform">
                    <FaDownload className="text-lg mb-1" /> ১ম সাময়িক
                  </Link>
                  
                  <Link href={item.term2} className="flex flex-col items-center justify-center gap-1 bg-indigo-50 text-indigo-700 p-3 rounded-xl font-bold text-xs active:scale-95 transition-transform">
                    <FaDownload className="text-lg mb-1" /> ২য় সাময়িক
                  </Link>
                  
                  <Link href={item.final} className="col-span-2 flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl font-bold text-sm active:scale-95 transition-transform">
                    <FaDownload className="text-lg" /> বার্ষিক পরীক্ষার ফলাফল
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 p-6 text-center text-slate-500 text-xs md:text-sm font-medium">
            * ফলাফল বা সিলেবাস ডাউনলোড করতে কোনো সমস্যা হলে সরাসরি স্কুল অফিসে যোগাযোগ করার অনুরোধ রইল।
          </div>
        </section>
      </div>
    </main>
  );
}