"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { 
  FaCheckCircle, 
  FaUserGraduate,
  FaIdCard,
  FaUserTie,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaCamera
} from "react-icons/fa";
import { useLanguage } from '@/context/LanguageContext';

export default function Admission() {
  const router = useRouter(); 
  const { t, language } = useLanguage();

  const classOptions = [
    { value: "Play", bn: "প্লে (Play)", en: "Play" },
    { value: "Nursery", bn: "নার্সারি (Nursery)", en: "Nursery" },
    { value: "KG", bn: "কেজি (KG)", en: "KG" },
    { value: "01", bn: "প্রথম (Class 1)", en: "Class 1" },
    { value: "02", bn: "দ্বিতীয় (Class 2)", en: "Class 2" },
    { value: "03", bn: "তৃতীয় (Class 3)", en: "Class 3" },
    { value: "04", bn: "চতুর্থ (Class 4)", en: "Class 4" },
    { value: "05", bn: "পঞ্চম (Class 5)", en: "Class 5" },
    { value: "06", bn: "ষষ্ঠ (Class 6)", en: "Class 6" },
    { value: "07", bn: "সপ্তম (Class 7)", en: "Class 7" },
    { value: "08", bn: "অষ্টম (Class 8)", en: "Class 8" },
    { value: "09", bn: "নবম (Class 9)", en: "Class 9" },
    { value: "10", bn: "দশম (Class 10)", en: "Class 10" }
  ];
  
  // Text Form Data State
  const [formData, setFormData] = useState({
    studentNameBN: '',
    studentNameEN: '',
    classLevel: '01',
    dob: '',
    nationality: 'বাংলাদেশী',
    religion: '',
    bloodGroup: '',
    
    fatherNameBN: '',
    fatherNameEN: '',
    fatherPhone: '',
    fatherNID: '',
    
    motherNameBN: '',
    motherNameEN: '',
    motherPhone: '',
    motherNID: '',
    
    presentAddress: '',
    permVillage: '',
    permPost: '',
    permUpazila: '',
    permDistrict: '',
    
    prevSchoolName: '',
    prevClass: '',
    prevYear: '',
    tcNo: '',
    
    guardianName: '',
    guardianAddress: '',
    guardianPhone: '',
    
    pscUpazila: '',
    pscDistrict: '',
    pscRoll: '',
    pscYear: '',
    pscGpa: '',
    
    jscBoard: '',
    jscRoll: '',
    jscReg: '',
    jscYear: '',
    jscGpa: '',

    isAgreed: false
  });

  useEffect(() => {
    setFormData((prev) => {
      if (language === "EN" && prev.nationality === "বাংলাদেশী") {
        return { ...prev, nationality: "Bangladeshi" };
      }
      if (language === "BN" && prev.nationality === "Bangladeshi") {
        return { ...prev, nationality: "বাংলাদেশী" };
      }
      return prev;
    });
  }, [language]);

  // File Upload State
  const [fileData, setFileData] = useState({
    studentPhoto: null as File | null,
    fatherPhoto: null as File | null,
    motherPhoto: null as File | null,
  });
  
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Handle Text Inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  // Handle File Inputs
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFileData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  // Handle Submit (Updated for File Upload using FormData)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!formData.isAgreed) {
        alert(t("আপনাকে অঙ্গীকারনামায় সম্মতি প্রদান করতে হবে।", "You must agree to the declaration."));
        return;
    }
    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      
      // Append all text fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value));
      });

      // Append files to FormData
      if (fileData.studentPhoto) submitData.append('studentPhoto', fileData.studentPhoto);
      if (fileData.fatherPhoto) submitData.append('fatherPhoto', fileData.fatherPhoto);
      if (fileData.motherPhoto) submitData.append('motherPhoto', fileData.motherPhoto);

      const response = await fetch('/api/admission', {
        method: 'POST',
        // Note: Do not set 'Content-Type': 'application/json' when sending FormData.
        // The browser will automatically set 'Content-Type': 'multipart/form-data'.
        body: submitData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setGeneratedId(data.student?.id || "HIS-2026-001"); 
      } else {
        alert(t("আপনার আইডি তৈরি করতে সমস্যা হয়েছে।", "There was an error generating your ID."));
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert(t("সার্ভারের সাথে সংযোগে সমস্যা হয়েছে।", "An error occurred connecting to the server."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  return (
    <main className="min-h-screen bg-gray-100 pb-16">
      
      {/* 1. Header Section - Teal Background */}
      <section className="bg-teal-800 text-white pt-16 pb-24 px-6 text-center shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-widest uppercase">
            {t("ভর্তি ফরম", "Admission Form")}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-rose-200">
            {t("হাবিবা ইন্টারন্যাশনাল স্কুল", "Habiba International School")}
          </h2>
          <p className="text-sm md:text-base font-medium opacity-90">
            {t(
              "(কম্পিউটার সমৃদ্ধ একটি আদর্শ ও ব্যতিক্রমধর্মী শিক্ষা প্রতিষ্ঠান)",
              "(A modern and distinctive institution enriched with technology)"
            )}
            <br/>
            {t("২৯, আল-মদিনা রোড, পূর্ব আহম্মদনগর, মিরপুর, ঢাকা।", "29 Al Madina Road, East Ahmednagar, Mirpur, Dhaka.")}
            <br/>
            <span className="bg-white text-teal-900 px-3 py-1 rounded-full text-xs font-bold mt-3 inline-block">EIIN: 134452</span>
          </p>
        </div>
      </section>

      {/* 2. Form Section */}
      <section className="px-4 max-w-5xl mx-auto mt-[-4rem] relative z-10">
        
        {generatedId ? (
          <div className="bg-white p-8 rounded-xl text-center border-t-8 border-teal-600 shadow-xl max-w-2xl mx-auto">
            <div className="bg-teal-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-teal-600 text-5xl" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t("অভিনন্দন! রেজিস্ট্রেশন সফল হয়েছে।", "Congratulations! Registration successful.")}
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              {t("শিক্ষার্থীর নাম:", "Student Name:")} <strong className="text-gray-900">{formData.studentNameBN || formData.studentNameEN}</strong>
            </p>
            
            <div className="bg-gray-50 py-6 px-8 rounded-xl border border-gray-200 inline-block mb-6">
              <p className="text-teal-700 text-sm font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                <FaIdCard /> {t("আপনার ইউনিক স্টুডেন্ট আইডি", "Your Unique Student ID")}
              </p>
              <div className="text-4xl md:text-5xl font-black text-rose-600 tracking-wider">
                {generatedId}
              </div>
            </div>
            
            <p className="mb-8 text-sm text-rose-600 font-bold bg-rose-50 py-3 px-4 rounded-lg">
              {t("⚠️ দয়া করে এই আইডিটি সংরক্ষণ করুন। এটি অনুমোদনের অপেক্ষায় আছে।", "⚠️ Please save this ID. It is pending approval.")}
            </p>
            
            <button 
              onClick={handleGoToProfile} 
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-10 py-4 rounded-lg transition-colors shadow-md w-full md:w-auto text-lg"
            >
              {t("প্রোফাইলে যান", "Go to Profile")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* --- ১. শিক্ষার্থীর তথ্য --- */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="bg-teal-800 text-white px-6 py-4 flex items-center gap-3">
                <FaUserGraduate className="text-xl" />
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  {t("শিক্ষার্থীর তথ্য", "Student Information")}
                </h2>
              </div>
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">{t("শিক্ষার্থীর নাম (বাংলায়) *", "Student Name (Bangla) *")}</label>
                  <input type="text" name="studentNameBN" required value={formData.studentNameBN} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">{t("শিক্ষার্থীর নাম (ইংরেজি) *", "Student Name (English) *")}</label>
                  <input type="text" name="studentNameEN" required value={formData.studentNameEN} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none uppercase transition-all" />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">{t("ভর্তি ইচ্ছুক শ্রেণি *", "Applying For Class *")}</label>
                  <select name="classLevel" required value={formData.classLevel} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all cursor-pointer">
                    {classOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {language === "BN" ? option.bn : option.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">{t("জন্ম তারিখ *", "Date of Birth *")}</label>
                  <input type="date" name="dob" required value={formData.dob} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">{t("জাতীয়তা", "Nationality")}</label>
                  <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-sm">{t("ধর্ম", "Religion")}</label>
                    <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-sm">{t("রক্তের গ্রুপ", "Blood Group")}</label>
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all">
                      <option value="">{t("নির্বাচন করুন", "Select")}</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* --- ২. পিতা-মাতার তথ্য --- */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="bg-teal-800 text-white px-6 py-4 flex items-center gap-3">
                <FaUserTie className="text-xl" />
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  {t("পিতা-মাতার তথ্য", "Parents Information")}
                </h2>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-bold text-teal-700 border-b border-gray-200 pb-2 mb-4">
                  {t("পিতার তথ্য", "Father's Info")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div><label className="block text-gray-700 font-bold mb-2 text-sm">{t("পিতার নাম (বাংলায়) *", "Father's Name (Bangla) *")}</label><input type="text" name="fatherNameBN" required value={formData.fatherNameBN} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none" /></div>
                  <div><label className="block text-gray-700 font-bold mb-2 text-sm">{t("পিতার নাম (ইংরেজি)", "Father's Name (English)")}</label><input type="text" name="fatherNameEN" value={formData.fatherNameEN} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none uppercase" /></div>
                  <div><label className="block text-gray-700 font-bold mb-2 text-sm">{t("মোবাইল নম্বর *", "Mobile No *")}</label><input type="tel" name="fatherPhone" required value={formData.fatherPhone} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none" /></div>
                  <div><label className="block text-gray-700 font-bold mb-2 text-sm">{t("জাতীয় পরিচয়পত্র নম্বর", "NID Number")}</label><input type="text" name="fatherNID" value={formData.fatherNID} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none" /></div>
                </div>

                <h3 className="font-bold text-teal-700 border-b border-gray-200 pb-2 mb-4">
                  {t("মাতার তথ্য", "Mother's Info")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-gray-700 font-bold mb-2 text-sm">{t("মাতার নাম (বাংলায়) *", "Mother's Name (Bangla) *")}</label><input type="text" name="motherNameBN" required value={formData.motherNameBN} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none" /></div>
                  <div><label className="block text-gray-700 font-bold mb-2 text-sm">{t("মাতার নাম (ইংরেজি)", "Mother's Name (English)")}</label><input type="text" name="motherNameEN" value={formData.motherNameEN} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none uppercase" /></div>
                  <div><label className="block text-gray-700 font-bold mb-2 text-sm">{t("মোবাইল নম্বর", "Mobile No")}</label><input type="tel" name="motherPhone" value={formData.motherPhone} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none" /></div>
                  <div><label className="block text-gray-700 font-bold mb-2 text-sm">{t("জাতীয় পরিচয়পত্র নম্বর", "NID Number")}</label><input type="text" name="motherNID" value={formData.motherNID} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none" /></div>
                </div>
              </div>
            </div>

            {/* --- ৩. ঠিকানার তথ্য --- */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="bg-teal-800 text-white px-6 py-4 flex items-center gap-3">
                <FaMapMarkerAlt className="text-xl" />
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  {t("ঠিকানা", "Address")}
                </h2>
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <label className="block text-gray-700 font-bold mb-2 text-sm">{t("বর্তমান ঠিকানা *", "Present Address *")}</label>
                  <textarea name="presentAddress" required value={formData.presentAddress} onChange={handleChange} rows={2} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-3 text-sm">{t("স্থায়ী ঠিকানা:", "Permanent Address:")}</label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("গ্রাম", "Village")}</label><input type="text" name="permVillage" value={formData.permVillage} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("ডাকঘর", "Post")}</label><input type="text" name="permPost" value={formData.permPost} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("উপজেলা", "Upazila")}</label><input type="text" name="permUpazila" value={formData.permUpazila} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("জেলা", "District")}</label><input type="text" name="permDistrict" value={formData.permDistrict} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- ৪. পূর্ববর্তী শিক্ষা ও অভিভাবকের তথ্য --- */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="bg-teal-800 text-white px-6 py-4 flex items-center gap-3">
                <FaGraduationCap className="text-xl" />
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  {t("অন্যান্য তথ্য", "Other Information")}
                </h2>
              </div>
              <div className="p-6 md:p-8">
                
                <div className="mb-8">
                  <h3 className="font-bold text-teal-700 border-b border-gray-200 pb-2 mb-4">
                    {t("পূর্ববর্তী বিদ্যালয়ের তথ্য (যদি থাকে)", "Previous School Info (if any)")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2"><label className="text-xs text-gray-500 mb-1 block uppercase">{t("স্কুলের নাম ও ঠিকানা", "School Name & Address")}</label><input type="text" name="prevSchoolName" value={formData.prevSchoolName} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("শ্রেণি", "Class")}</label><input type="text" name="prevClass" value={formData.prevClass} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("সন", "Year")}</label><input type="text" name="prevYear" value={formData.prevYear} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                    <div className="md:col-span-4"><label className="text-xs text-gray-500 mb-1 block uppercase">{t("টিসি নম্বর", "TC No.")}</label><input type="text" name="tcNo" value={formData.tcNo} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-teal-700 border-b border-gray-200 pb-2 mb-4">
                    {t("স্থানীয় অভিভাবকের তথ্য (পিতা-মাতার অবর্তমানে)", "Local Guardian Info (if parents are absent)")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("নাম", "Name")}</label><input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("ঠিকানা", "Address")}</label><input type="text" name="guardianAddress" value={formData.guardianAddress} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                    <div><label className="text-xs text-gray-500 mb-1 block uppercase">{t("মোবাইল", "Mobile")}</label><input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 outline-none" /></div>
                  </div>
                </div>

                {/* PSC & JSC */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">{t("PSC / সমাপনী পরীক্ষার তথ্য", "PSC / Primary Exam Info")}</h3>
                    <div className="space-y-3">
                      <input type="text" name="pscUpazila" placeholder={t("উপজেলা", "Upazila")} value={formData.pscUpazila} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                      <input type="text" name="pscDistrict" placeholder={t("জেলা", "District")} value={formData.pscDistrict} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                      <input type="text" name="pscRoll" placeholder={t("রোল নম্বর", "Roll Number")} value={formData.pscRoll} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                      <div className="flex gap-3">
                        <input type="text" name="pscYear" placeholder={t("পাসের সন", "Passing Year")} value={formData.pscYear} onChange={handleChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                        <input type="text" name="pscGpa" placeholder={t("প্রাপ্ত জিপিএ", "GPA")} value={formData.pscGpa} onChange={handleChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">{t("JSC / JDC পরীক্ষার তথ্য", "JSC / JDC Exam Info")}</h3>
                    <div className="space-y-3">
                      <input type="text" name="jscBoard" placeholder={t("বোর্ডের নাম", "Board Name")} value={formData.jscBoard} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                      <input type="text" name="jscReg" placeholder={t("রেজিঃ নম্বর", "Registration No")} value={formData.jscReg} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                      <input type="text" name="jscRoll" placeholder={t("রোল নম্বর", "Roll Number")} value={formData.jscRoll} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                      <div className="flex gap-3">
                        <input type="text" name="jscYear" placeholder={t("পাসের সন", "Passing Year")} value={formData.jscYear} onChange={handleChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                        <input type="text" name="jscGpa" placeholder={t("প্রাপ্ত জিপিএ", "GPA")} value={formData.jscGpa} onChange={handleChange} className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:border-teal-500 outline-none text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- ৫. ছবি আপলোড (Photo Upload) --- */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="bg-teal-800 text-white px-6 py-4 flex items-center gap-3">
                <FaCamera className="text-xl" />
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  {t("ছবি আপলোড", "Photo Upload")}
                </h2>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-sm text-gray-500 mb-6 font-medium">
                  {t("দয়া করে পাসপোর্ট সাইজের ছবি আপলোড করুন।", "Please upload passport-size photos.")}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Student Photo */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-sm">
                      {t("শিক্ষার্থীর ছবি *", "Student Photo *")}
                    </label>
                    <input 
                      type="file" 
                      name="studentPhoto" 
                      accept="image/*" 
                      required 
                      onChange={handleFileChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all cursor-pointer" 
                    />
                  </div>
                  
                  {/* Father Photo */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-sm">
                      {t("পিতার ছবি *", "Father Photo *")}
                    </label>
                    <input 
                      type="file" 
                      name="fatherPhoto" 
                      accept="image/*" 
                      required 
                      onChange={handleFileChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all cursor-pointer" 
                    />
                  </div>

                  {/* Mother Photo */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-sm">
                      {t("মাতার ছবি *", "Mother Photo *")}
                    </label>
                    <input 
                      type="file" 
                      name="motherPhoto" 
                      accept="image/*" 
                      required 
                      onChange={handleFileChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all cursor-pointer" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* --- ৬. অঙ্গীকারনামা ও সাবমিট --- */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200 text-center">
              <label className="inline-flex items-start gap-3 cursor-pointer text-left mb-8 max-w-3xl mx-auto">
                <input type="checkbox" name="isAgreed" checked={formData.isAgreed} onChange={handleChange} className="w-5 h-5 mt-1 accent-teal-600 cursor-pointer" />
                <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                  <strong>{t("অঙ্গীকারনামা:", "Declaration:")}</strong>{" "}
                  {t(
                    "আমি এ মর্মে অঙ্গীকার করছি যে, অত্র বিদ্যালয়ের সকল নিয়ম-কানুন মেনে চলব এবং স্বীকার করছি যে, ফরমে উল্লেখিত তথ্যগুলো সঠিক।",
                    "I hereby declare that I will follow all school rules and confirm that the information provided in this form is correct."
                  )}
                </span>
              </label>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`block w-full max-w-md mx-auto text-white font-bold text-xl py-4 rounded-md shadow-lg transform transition-all uppercase tracking-wide ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700 hover:scale-[1.02] active:scale-[0.98]'}`}
              >
                {isSubmitting ? t("প্রক্রিয়াধীন...", "Processing...") : t("ফরম জমা দিন", "Submit Form")}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
