import { FaMicrochip, FaCheckCircle } from "react-icons/fa";

const features = [
  "ডিজিটাল ক্যাম্পাস ও কম্পিউটার ল্যাব",
  "প্রতিটি শ্রেণিকক্ষে সিসি ক্যামেরা",
  "সার্বক্ষণিক বিদ্যুৎ ব্যবস্থা",
  "ডিজিটাল সাউন্ড সিস্টেম",
  "শিক্ষক ও শিক্ষার্থীদের ডিজিটাল হাজিরা",
  "অনুপস্থিতি ও তথ্য SMS এর মাধ্যমে জানানো",
  "আরবি ক্লাস সম্পূর্ণ ফ্রি (প্লে থেকে দশম)"
];

export default function DigitalActivities() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">ডিজিটাল কার্যক্রম</h1>
            <p className="text-lg text-gray-600">আধুনিক বিশ্বের সাথে তাল মিলিয়ে আমাদের শিক্ষা ব্যবস্থা</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">আমাদের ডিজিটাল কার্যক্রমসমূহ:</h2>
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
                  <FaCheckCircle className="text-green-500 shrink-0" />
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-[2rem] shadow-2xl border border-gray-200">
            <div className="bg-purple-50 rounded-2xl p-8 text-center h-full flex flex-col justify-center">
               <FaMicrochip className="text-6xl text-purple-700 mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-purple-900 mb-2">ডিজিটাল শিক্ষা ব্যবস্থা</h3>
               <p className="text-gray-600">আমরা শিক্ষার্থীদের আধুনিক বিশ্বের চ্যালেঞ্জ মোকাবেলায় প্রস্তুত করতে ডিজিটাল ল্যাব এবং স্মার্ট ক্লাসরুম নিশ্চিত করি। প্রযুক্তির সঠিক ব্যবহারের মাধ্যমে শিক্ষাকে আরও আনন্দদায়ক করা হয়।</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}