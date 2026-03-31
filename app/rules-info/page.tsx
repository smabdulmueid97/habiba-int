"use client";

import { 
  FaSchool, 
  FaMoneyBillWave, 
  FaQuestionCircle, 
  FaUserGraduate, 
  FaGavel, 
  FaFileAlt, 
  FaEnvelopeOpenText, 
  FaUserTimes, 
  FaPenNib 
} from "react-icons/fa";

const infoSections = [
  {
    id: "introduction",
    title: "স্কুলের বিস্তারিত পরিচিতি",
    icon: <FaSchool className="text-purple-600 text-2xl" />,
    content: "হাবিবা ইন্টারন্যাশনাল স্কুল একটি আধুনিক ও যুগোপযোগী শিক্ষাপ্রতিষ্ঠান। আমাদের লক্ষ্য শুধু পাঠ্যপুস্তকের শিক্ষা নয়, বরং শিক্ষার্থীদের নৈতিক, সামাজিক ও মানসিক বিকাশ নিশ্চিত করা। উন্নত শিক্ষার পরিবেশ, অভিজ্ঞ শিক্ষকমণ্ডলী এবং আধুনিক প্রযুক্তির সমন্বয়ে আমরা একটি আলোকিত প্রজন্ম গড়তে প্রতিশ্রুতিবদ্ধ।"
  },
  {
    id: "rules",
    title: "নিয়মাবলি",
    icon: <FaGavel className="text-purple-600 text-2xl" />,
    content: "সকল শিক্ষার্থীকে প্রতিদিন সঠিক সময়ে পরিষ্কার স্কুল ড্রেস পরে উপস্থিত হতে হবে। স্কুল প্রাঙ্গণে শৃঙ্খলা বজায় রাখা বাধ্যতামূলক। শিক্ষকদের প্রতি সম্মান প্রদর্শন এবং সহপাঠীদের সাথে ভালো আচরণ করতে হবে। বিনা অনুমতিতে স্কুল চলাকালীন সময়ে বাইরে যাওয়া সম্পূর্ণ নিষেধ।"
  },
  {
    id: "supplies",
    title: "কলম, বই ও খাতা",
    icon: <FaPenNib className="text-purple-600 text-2xl" />,
    content: "শিক্ষার্থীদের পড়াশোনার মান নিশ্চিত করতে এবং অভিভাবকদের চিন্তামুক্ত রাখতে, হাবিবা ইন্টারন্যাশনাল স্কুলের পক্ষ থেকে শিক্ষার্থীদের প্রয়োজনীয় কলম, বই এবং খাতা প্রদান করা হবে। শিক্ষার্থীদের এগুলো যত্ন সহকারে ব্যবহার করতে হবে।"
  },
  {
    id: "fees",
    title: "বেতন",
    icon: <FaMoneyBillWave className="text-purple-600 text-2xl" />,
    content: "প্রতি মাসের ১০ তারিখের মধ্যে চলতি মাসের বেতন পরিশোধ করতে হবে। বেতন পরিশোধে বিলম্ব হলে জরিমানা ধার্য করা হতে পারে। পরীক্ষার আগে অবশ্যই সকল বকেয়া পরিষ্কার করতে হবে। বেতন সংক্রান্ত যেকোনো আপডেটের জন্য নোটিশ বোর্ড লক্ষ্য রাখুন।"
  },
  {
    id: "admission",
    title: "ভর্তি সংক্রান্ত",
    icon: <FaUserGraduate className="text-purple-600 text-2xl" />,
    content: "নতুন শিক্ষাবর্ষের ভর্তি প্রক্রিয়া সাধারণত ডিসেম্বর মাসে শুরু হয়। ভর্তির সময় শিক্ষার্থীর জন্ম নিবন্ধন, পাসপোর্ট সাইজ ছবি এবং পূর্ববর্তী স্কুলের ছাড়পত্র (প্রযোজ্য ক্ষেত্রে) জমা দিতে হবে। ভর্তি পরীক্ষার ফলাফলের ভিত্তিতে মেধা তালিকা প্রকাশ করা হয়।"
  },
  {
    id: "exams",
    title: "পরীক্ষা সংক্রান্ত",
    icon: <FaFileAlt className="text-purple-600 text-2xl" />,
    content: "বছরে মোট তিনটি প্রধান পরীক্ষা অনুষ্ঠিত হয় (প্রথম সাময়িক, দ্বিতীয় সাময়িক এবং বার্ষিক)। এছাড়াও প্রতি মাসে ক্লাস টেস্ট নেওয়া হয়। পরীক্ষায় অসদুপায় অবলম্বন করলে কঠোর শাস্তিমূলক ব্যবস্থা গ্রহণ করা হবে।"
  },
  {
    id: "absence",
    title: "অনুপস্থিতি",
    icon: <FaUserTimes className="text-purple-600 text-2xl" />,
    content: "বিনা নোটিশে পর পর ৩ দিন অনুপস্থিত থাকলে অভিভাবককে তলব করা হবে। অসুস্থতা বা অন্য কোনো যুক্তিসঙ্গত কারণে অনুপস্থিত থাকলে অবশ্যই ক্লাস টিচারকে জানাতে হবে। মোট উপস্থিতির হার ৭৫% এর নিচে হলে পরীক্ষায় অংশগ্রহণের সুযোগ বাতিল হতে পারে।"
  },
  {
    id: "applications",
    title: "দরখাস্ত",
    icon: <FaEnvelopeOpenText className="text-purple-600 text-2xl" />,
    content: "ছুটি, ছাড়পত্র বা অন্য যেকোনো প্রাতিষ্ঠানিক প্রয়োজনে প্রধান শিক্ষক বরাবর লিখিত দরখাস্ত জমা দিতে হবে। অসুস্থতাজনিত ছুটির ক্ষেত্রে অবশ্যই চিকিৎসকের ব্যবস্থাপত্র (Medical Certificate) দরখাস্তের সাথে সংযুক্ত করতে হবে।"
  },
  {
    id: "qna",
    title: "প্রশ্ন ও উত্তর",
    icon: <FaQuestionCircle className="text-purple-600 text-2xl" />,
    content: "প্রশ্ন: স্কুলের সময়সূচি কী?\nউত্তর: সকাল ৮:০০ টা থেকে দুপুর ১:৩০ টা পর্যন্ত ক্লাস চলে।\n\nপ্রশ্ন: স্কুলে কি ট্রান্সপোর্টের ব্যবস্থা আছে?\nউত্তর: হ্যাঁ, নির্দিষ্ট রুটে স্কুলের নিজস্ব পরিবহন ব্যবস্থা রয়েছে। বিস্তারিত জানতে অফিসে যোগাযোগ করুন।"
  }
];

export default function RulesAndInfo() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-white p-6 md:p-12">
      
      {/* Page Header */}
      {/* Increased max-w to 7xl to match the grid width below */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-purple-900">
          নিয়ম ও তথ্যাদি
        </h1>
        <p className="mt-4 text-gray-700 text-lg max-w-3xl mx-auto">
          স্কুলের সকল নিয়ম-কানুন, ভর্তি প্রক্রিয়া এবং অন্যান্য গুরুত্বপূর্ণ তথ্যাদি নিচে বিস্তারিত আলোচনা করা হলো।
        </p>
      </div>

      {/* Content Sections - Updated to 3 Column Grid */}
      {/* grid-cols-1 for mobile, md:grid-cols-2 for tablet, lg:grid-cols-3 for desktop */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {infoSections.map((section) => (
          <div 
            key={section.id} 
            // Added h-full to make all cards in a row stretch to the same height
            className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
              <div className="bg-purple-50 p-3 rounded-full shrink-0">
                {section.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {section.title}
              </h2>
            </div>
            
            {/* The text takes up the remaining space */}
            <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line flex-grow">
              {section.content}
            </p>
          </div>
        ))}
      </div>

    </main>
  );
}