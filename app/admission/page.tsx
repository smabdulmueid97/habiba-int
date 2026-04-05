"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  FaCheckCircle, 
  FaBookOpen,
  FaUserGraduate,
  FaIdCard
} from "react-icons/fa";

export default function Admission() {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    studentName: '',
    classLevel: '01',
    phone: ''
  });
  
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/admission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGeneratedId(data.student.id);
      } else {
        alert("There was an error generating your ID.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An error occurred connecting to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. Hero Section */}
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

      {/* 2. Interactive Registration Section */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 underline underline-offset-8 decoration-purple-500">
            অনলাইন রেজিস্ট্রেশন
          </h2>
          <p className="text-gray-600 mt-4">ফর্মটি পূরণ করে আপনার সন্তানের জন্য একটি ইউনিক আইডি সংগ্রহ করুন।</p>
        </div>

        {generatedId ? (
          <div className="bg-green-50 p-8 rounded-3xl text-center border-2 border-green-400 shadow-xl animate-fade-in">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">অভিনন্দন! রেজিস্ট্রেশন সফল হয়েছে।</h3>
            <p className="text-gray-700 mb-6 text-lg">শিক্ষার্থীর নাম: <strong>{formData.studentName}</strong></p>
            
            <div className="bg-white py-6 px-8 rounded-2xl shadow-inner border border-green-200 inline-block">
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <FaIdCard /> আপনার ইউনিক স্টুডেন্ট আইডি
              </p>
              <div className="text-4xl md:text-5xl font-black text-purple-700 tracking-wider">
                {generatedId}
              </div>
            </div>
            
            <p className="mt-6 text-sm text-red-500 font-bold bg-red-50 py-2 px-4 rounded-lg inline-block">
              ⚠️ দয়া করে এই আইডিটি সংরক্ষণ করুন। এটি অনুমোদনের অপেক্ষায় আছে।
            </p>
            
            <div className="mt-8">
              <button 
                onClick={handleGoToProfile} 
                className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg"
              >
                প্রোফাইলে যান (Go to Profile)
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
            <div className="space-y-6">
              
              {/* Student Name */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">শিক্ষার্থীর পুরো নাম *</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400"><FaUserGraduate /></span>
                  <input 
                    type="text" 
                    name="studentName"
                    required
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="যেমন: আব্দুল্লাহ আল মামুন" 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Class Selection */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">ভর্তির শ্রেণি *</label>
                <select 
                  name="classLevel"
                  required
                  value={formData.classLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all cursor-pointer"
                >
                  <option value="00">Play / Nursery</option>
                  <option value="01">Class 1 (প্রথম)</option>
                  <option value="02">Class 2 (দ্বিতীয়)</option>
                  <option value="03">Class 3 (তৃতীয়)</option>
                  <option value="04">Class 4 (চতুর্থ)</option>
                  <option value="05">Class 5 (পঞ্চম)</option>
                  <option value="06">Class 6 (ষষ্ঠ)</option>
                  <option value="07">Class 7 (সপ্তম)</option>
                  <option value="08">Class 8 (অষ্টম)</option>
                  <option value="09">Class 9 (নবম)</option>
                  <option value="10">Class 10 (দশম)</option>
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">অভিভাবকের মোবাইল নম্বর *</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full text-white font-black text-lg py-4 rounded-xl shadow-[0_10px_20px_rgba(109,40,217,0.3)] transform transition-all hover:scale-[1.02] active:scale-[0.98] ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-700 to-red-600 hover:from-purple-800 hover:to-red-700'}`}
              >
                {isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'ইউনিক আইডি তৈরি করুন'}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* 3. Required Documents */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaBookOpen className="text-purple-700" /> ভর্তির জন্য প্রয়োজনীয় কাগজপত্র:
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

    </main>
  );
}