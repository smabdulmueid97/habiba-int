import Link from 'next/link';
import { FaDownload, FaFilePdf, FaTable } from 'react-icons/fa';

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

export default function Results() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            রেজাল্ট
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            শিক্ষার্থীদের একাডেমিক ফলাফল এবং সিলেবাস
          </p>
        </div>

        {/* --- DOWNLOADS SECTION --- */}
        <section className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-6 md:p-8 flex items-center gap-4 text-white">
            <div className="bg-amber-400 p-3 rounded-2xl text-slate-900">
              <FaTable className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black">সিলেবাস ও ফলাফল</h2>
              <p className="text-slate-400 text-xs md:text-sm">শ্রেণি ভিত্তিক প্রয়োজনীয় তথ্য ডাউনলোড করুন</p>
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-8 py-5">শ্রেণি</th>
                  <th className="px-8 py-5 text-center">সিলেবাস</th>
                  <th className="px-8 py-5 text-center">ফলাফল</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {academicData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-800 text-lg">{item.class}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <Link href={item.syllabus} className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <FaFilePdf /> ডাউনলোড
                      </Link>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <Link href={item.result} className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm">
                        <FaDownload /> সংগ্রহ
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-slate-100 p-4">
            {academicData.map((item, idx) => (
              <div key={idx} className="py-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-bold text-sm">#{idx + 1}</span>
                  <h3 className="font-black text-slate-900 text-lg">{item.class}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link href={item.syllabus} className="flex flex-col items-center justify-center gap-2 bg-blue-50 text-blue-600 p-4 rounded-2xl font-bold text-xs active:scale-95 transition-transform">
                    <FaFilePdf className="text-xl" /> সিলেবাস
                  </Link>
                  <Link href={item.result} className="flex flex-col items-center justify-center gap-2 bg-green-50 text-green-600 p-4 rounded-2xl font-bold text-xs active:scale-95 transition-transform">
                    <FaDownload className="text-xl" /> ফলাফল
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 p-6 text-center text-slate-400 text-[10px] md:text-xs italic">
            * কোনো সমস্যা হলে সরাসরি স্কুল অফিসে যোগাযোগ করার অনুরোধ রইল।
          </div>
        </section>
      </div>
    </main>
  );
}