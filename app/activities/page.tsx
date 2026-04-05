import fs from 'fs';
import path from 'path';
import ImageSlider from '@/components/ImageSlider';
import accomplishments from '../../public/Database/results-activities.json';
import { FaAward } from 'react-icons/fa';

function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Activities() {
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
    <main className="min-h-screen bg-slate-50 p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            ক্রিয়া
          </h1>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            আমাদের স্কুলের গৌরবময় সাফল্যসমূহ এবং বিভিন্ন ক্রিয়াকলাপের ঝলক
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
              <FaAward className="text-amber-500" /> অর্জিত সাফল্য
            </h2>
            <div className="space-y-4">
              {accomplishments.map((data) => (
                <div key={data.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-800 leading-tight">{data.title}</h3>
                    <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-bold shrink-0">
                      {data.year}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {data.achievements.map((item, index) => (
                      <li key={index} className="text-xs text-slate-500 flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">★</span> {item}
                      </li>
                    ))}
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