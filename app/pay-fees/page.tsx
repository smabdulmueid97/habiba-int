"use client";

import { useState } from 'react';
import { FaSearch, FaCheckCircle, FaMoneyBillWave, FaUserGraduate, FaIdCard } from 'react-icons/fa';

export default function PayFees() {
  const [studentId, setStudentId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [studentName, setStudentName] = useState('');
  
  const [amount, setAmount] = useState('');
  const [feeType, setFeeType] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // স্টুডেন্ট আইডি ভেরিফাই করার ফাংশন (Simulated)
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim().length > 3) {
      // এখানে ডাটাবেজ/API থেকে শিক্ষার্থীর নাম খোঁজার কোড হবে
      setIsVerified(true);
      setStudentName("আব্দুল্লাহ আল মামুন"); // ডেমো নাম
    } else {
      alert("দয়া করে সঠিক স্টুডেন্ট আইডি প্রদান করুন।");
    }
  };

  // পেমেন্ট সম্পন্ন করার ফাংশন
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("দয়া করে একটি পেমেন্ট মাধ্যম (bKash, Nagad, Rocket) নির্বাচন করুন।");
      return;
    }
    setIsProcessing(true);
    
    // পেমেন্ট প্রসেসিং সিমুলেশন
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 flex items-center justify-center gap-3">
            <FaMoneyBillWave className="text-green-600" /> অনলাইন ফি প্রদান
          </h1>
          <p className="text-gray-600">কোনো একাউন্ট ছাড়াই শুধুমাত্র স্টুডেন্ট আইডি দিয়ে আপনার সন্তানের স্কুলের ফি প্রদান করুন।</p>
        </div>

        {isSuccess ? (
          <div className="bg-white p-8 rounded-2xl text-center shadow-xl border-t-8 border-green-500 animate-fade-in">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-500 text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">পেমেন্ট সফল হয়েছে!</h2>
            <p className="text-gray-600 mb-6">আপনার <strong>{amount} টাকা</strong> পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে।</p>
            
            <div className="bg-gray-50 p-6 rounded-xl text-left inline-block w-full max-w-sm border border-gray-200 mb-8">
              <p className="text-sm text-gray-500 mb-1">শিক্ষার্থীর নাম:</p>
              <p className="font-bold text-gray-800 mb-3">{studentName}</p>
              <p className="text-sm text-gray-500 mb-1">স্টুডেন্ট আইডি:</p>
              <p className="font-bold text-gray-800 mb-3">{studentId}</p>
              <p className="text-sm text-gray-500 mb-1">ফি এর ধরণ:</p>
              <p className="font-bold text-gray-800 mb-3 capitalize">{feeType.replace('-', ' ')}</p>
              <p className="text-sm text-gray-500 mb-1">ট্রানজেকশন আইডি:</p>
              <p className="font-mono text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded inline-block">TXN{Math.floor(Math.random() * 100000000)}</p>
            </div>
            
            <button onClick={() => window.location.reload()} className="bg-purple-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-800 transition">
              নতুন পেমেন্ট করুন
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            
            {/* Step 1: Verify Student */}
            <div className={`p-6 md:p-8 ${isVerified ? 'bg-gray-50 border-b border-gray-200' : ''}`}>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="bg-purple-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">১</span> 
                শিক্ষার্থীর তথ্য যাচাই করুন
              </h3>
              
              {!isVerified ? (
                <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <FaIdCard className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                    <input 
                      type="text" 
                      value={studentId} 
                      onChange={(e) => setStudentId(e.target.value)} 
                      placeholder="স্টুডেন্ট আইডি লিখুন (যেমন: HIS-2026-001)" 
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <button type="submit" className="bg-purple-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2 shrink-0">
                    <FaSearch /> যাচাই করুন
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-green-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full"><FaUserGraduate className="text-green-600 text-xl" /></div>
                    <div>
                      <p className="text-sm text-gray-500">শিক্ষার্থীর নাম</p>
                      <p className="font-bold text-lg text-gray-800">{studentName}</p>
                    </div>
                  </div>
                  <button onClick={() => setIsVerified(false)} className="text-red-500 text-sm font-bold underline hover:text-red-700">পরিবর্তন করুন</button>
                </div>
              )}
            </div>

            {/* Step 2: Payment Details */}
            {isVerified && (
              <form onSubmit={handlePayment} className="p-6 md:p-8 animate-fade-in">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="bg-purple-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">২</span> 
                  ফি এবং পেমেন্ট মাধ্যম নির্বাচন
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-sm">ফি এর খাত নির্বাচন করুন *</label>
                    <select value={feeType} onChange={(e) => setFeeType(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                      <option value="monthly-fee">মাসিক বেতন (Monthly Fee)</option>
                      <option value="admission-fee">ভর্তি ফি (Admission Fee)</option>
                      <option value="exam-fee">পরীক্ষার ফি (Exam Fee)</option>
                      <option value="session-charge">সেশন চার্জ (Session Charge)</option>
                      <option value="others">অন্যান্য (Others)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2 text-sm">টাকার পরিমাণ (৳) *</label>
                    <input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)} 
                      placeholder="e.g. 500" 
                      required
                      min="10"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-bold"
                    />
                  </div>
                </div>

                {/* Mobile Banking Options */}
                <div className="mb-8">
                  <label className="block text-gray-700 font-bold mb-4 text-sm">পেমেন্ট মাধ্যম (Mobile Banking) *</label>
                  <div className="grid grid-cols-3 gap-4">
                    {/* bKash */}
                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${paymentMethod === 'bkash' ? 'border-[#e2136e] bg-[#e2136e]/5 shadow-md' : 'border-gray-200 hover:border-[#e2136e]/50'}`}>
                      <input type="radio" name="payment" value="bkash" className="sr-only" onChange={(e) => setPaymentMethod(e.target.value)} />
                      <div className="w-12 h-12 bg-[#e2136e] rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-black text-xl">b</span>
                      </div>
                      <span className={`font-bold ${paymentMethod === 'bkash' ? 'text-[#e2136e]' : 'text-gray-500'}`}>bKash</span>
                    </label>

                    {/* Nagad */}
                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${paymentMethod === 'nagad' ? 'border-[#f7931e] bg-[#f7931e]/5 shadow-md' : 'border-gray-200 hover:border-[#f7931e]/50'}`}>
                      <input type="radio" name="payment" value="nagad" className="sr-only" onChange={(e) => setPaymentMethod(e.target.value)} />
                      <div className="w-12 h-12 bg-[#f7931e] rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-black text-xl">ন</span>
                      </div>
                      <span className={`font-bold ${paymentMethod === 'nagad' ? 'text-[#f7931e]' : 'text-gray-500'}`}>Nagad</span>
                    </label>

                    {/* Rocket */}
                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center transition-all ${paymentMethod === 'rocket' ? 'border-[#8c1596] bg-[#8c1596]/5 shadow-md' : 'border-gray-200 hover:border-[#8c1596]/50'}`}>
                      <input type="radio" name="payment" value="rocket" className="sr-only" onChange={(e) => setPaymentMethod(e.target.value)} />
                      <div className="w-12 h-12 bg-[#8c1596] rounded-full flex items-center justify-center mb-2">
                        <span className="text-white font-black text-xl">R</span>
                      </div>
                      <span className={`font-bold ${paymentMethod === 'rocket' ? 'text-[#8c1596]' : 'text-gray-500'}`}>Rocket</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className={`w-full text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isProcessing ? 'পেমেন্ট প্রসেস হচ্ছে...' : `পে করুন ${amount ? `৳${amount}` : ''}`}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}