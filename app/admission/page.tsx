"use client";

import { 
  FaUserEdit, 
  FaIdCard, 
  FaDoorOpen, 
  FaMicrochip, 
  FaVideo, 
  FaBookOpen, 
  FaCheckCircle 
} from "react-icons/fa";

const features = [
  "ডিজিটাল ক্যাম্পাস ও কম্পিউটার ল্যাব",
  "প্রতিটি শ্রেণিকক্ষে সিসি ক্যামেরা",
  "সার্বক্ষণিক বিদ্যুৎ ব্যবস্থা",
  "ডিজিটাল সাউন্ড সিস্টেম",
  "শিক্ষক ও শিক্ষার্থীদের ডিজিটাল হাজিরা",
  "অনুপস্থিতি ও তথ্য SMS এর মাধ্যমে জানানো",
  "আরবি ক্লাস সম্পূর্ণ ফ্রি (প্লে থেকে দশম)"
];

export default function Admission() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Hero Section (Inspired by the Red/Yellow Flyer) */}
      <section className="bg-gradient-to-r from-red-600 to-purple-800 text-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">ভর্তি চলছে — ২০২৬</h1>
          <p className="text-xl md:text-2xl font-medium text-yellow-300">
            শিক্ষাই জাতির মেরুদণ্ড, সন্তান আপনার — দায়িত্ব আমাদের
          </p>
          <div className="mt-8 inline-block bg-yellow-400 text-red-700 px-6 py-2 rounded-full font-bold text-lg shadow-lg">
            প্লে থেকে দশম শ্রেণি পর্যন্ত
          </div>
        </div>
      </section>

      {/* 2. Admission Process (The Important Part!) */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 underline underline-offset-8 decoration-purple-500">ভর্তি প্রক্রিয়া</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 border-2 border-dashed border-purple-200 rounded-3xl">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <FaDoorOpen className="text-purple-700 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">১. অফিস যোগাযোগ</h3>
            <p className="text-gray-600">ভর্তির জন্য সরাসরি আমাদের স্কুল অফিসে যোগাযোগ করুন। অফিস থেকে ভর্তি ফরম সংগ্রহ করতে হবে।</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-purple-900 text-white rounded-3xl shadow-xl transform md:-translate-y-4">
            <div className="bg-white/20 p-4 rounded-full mb-4">
              <FaUserEdit className="text-yellow-300 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">২. ফরম পূরণ ও জমা</h3>
            <p className="text-purple-100">সঠিক তথ্যাদি এবং প্রয়োজনীয় কাগজপত্রসহ ফরমটি অফিসে জমা দিন।</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 border-2 border-dashed border-purple-200 rounded-3xl">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <FaIdCard className="text-purple-700 text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">৩. ইউনিক আইডি সংগ্রহ</h3>
            <p className="text-gray-600 font-medium">ভর্তি নিশ্চিত হলে অফিস থেকে একটি <span className="text-purple-800 font-bold">স্থায়ী ইউনিক আইডি</span> প্রদান করা হবে। এটি দিয়ে আজীবন লগইন করা যাবে।</p>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us (Data from your Flyer) */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">আমাদের ডিজিটাল কার্যক্রম:</h2>
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
             {/* Note: You can replace this src with your flyer image later */}
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
               <FaMicrochip className="text-6xl text-purple-700 mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-purple-900 mb-2">ডিজিটাল শিক্ষা ব্যবস্থা</h3>
               <p className="text-gray-600">আমরা শিক্ষার্থীদের আধুনিক বিশ্বের চ্যালেঞ্জ মোকাবেলায় প্রস্তুত করতে ডিজিটাল ল্যাব এবং স্মার্ট ক্লাসরুম নিশ্চিত করি।</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Required Documents */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaBookOpen className="text-purple-700" /> ভর্তির জন্য প্রয়োজনীয় কাগজপত্র:
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc list-inside text-gray-700 font-medium">
            <li>ছাত্র/ছাত্রীর ১ কপি পাসপোর্ট সাইজ ছবি</li>
            <li>পিতার ১ কপি পাসপোর্ট সাইজ ছবি</li>
            <li>মাতার ১ কপি পাসপোর্ট সাইজ ছবি</li>
            <li>জন্ম নিবন্ধন সনদের ফটোকপি</li>
            <li>পিতা/মাতার এনআইডি (NID) কার্ডের ফটোকপি</li>
            <li>পূর্ববর্তী স্কুলের টিসি (যদি থাকে)</li>
          </ul>
        </div>
      </section>

      {/* 5. Visit Invitation */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-purple-50 rounded-2xl p-8 border border-purple-100">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">সরাসরি ঘুরে দেখার আমন্ত্রণ</h3>
          <p className="text-gray-600 mb-6">আপনার সন্তানকে স্কুলে ভর্তি করার পূর্বে আমাদের নিজস্ব ক্যাম্পাসটি সশরীরে এসে ঘুরে দেখার জন্য বিশেষ অনুরোধ রইল।</p>
          <div className="text-lg font-bold text-purple-800">
            মোবাইল: ০১৮৮১-৬৫৯৯০৬, ০১৮৭৩-১৪৪২৬৪
          </div>
        </div>
      </section>

    </main>
  );
}