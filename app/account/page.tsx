"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaLock } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function AccountPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  // State to track which role is currently being typed into
  const [role, setRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [idOrPhone, setIdOrPhone] = useState('');
  const [password, setPassword] = useState('');

  // Mock Login Function
  const handleLogin = (e: FormEvent<HTMLFormElement>, selectedRole: string) => {
    e.preventDefault();
    
    // For now, we will simulate a successful login
    // In a real app, you would fetch() to your backend here
    console.log(`Logging in as ${selectedRole}:`, idOrPhone, password);
    
    // Save role and "user" info to localStorage so the site "remembers" us
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect to a dashboard (we will build this next!)
    router.push('/profile');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-purple-900 mb-4">
            {t("অ্যাকাউন্ট লগইন", "Account Login")}
          </h1>
          <p className="text-gray-600">
            {t("আপনার সঠিক রোল নির্বাচন করে সিস্টেমে প্রবেশ করুন", "Select your role to access the system.")}
          </p>
        </div>

        {/* The Three Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Student Column */}
          <LoginCard 
            title={t("শিক্ষার্থী লগইন", "Student Login")}
            icon={<FaUserGraduate className="text-blue-600" />}
            label={t("ইউনিক আইডি (Unique ID)", "Unique ID")}
            placeholder={t("আপনার আইডি দিন", "Enter your ID")}
            type="text"
            role="student"
            value={idOrPhone}
            passValue={password}
            onIdChange={(e) => {setRole('student'); setIdOrPhone(e.target.value)}}
            onPassChange={(e) => setPassword(e.target.value)}
            onSubmit={(e) => handleLogin(e, 'student')}
          />

          {/* 2. Teacher Column */}
          <LoginCard 
            title={t("শিক্ষক লগইন", "Teacher Login")}
            icon={<FaChalkboardTeacher className="text-green-600" />}
            label={t("মোবাইল নম্বর", "Mobile Number")}
            placeholder={t("০১৭XXXXXXXX", "017XXXXXXXX")}
            type="tel"
            role="teacher"
            value={idOrPhone}
            passValue={password}
            onIdChange={(e) => {setRole('teacher'); setIdOrPhone(e.target.value)}}
            onPassChange={(e) => setPassword(e.target.value)}
            onSubmit={(e) => handleLogin(e, 'teacher')}
          />

          {/* 3. Admin Column */}
          <LoginCard 
            title={t("এডমিন লগইন", "Admin Login")}
            icon={<FaUserShield className="text-red-600" />}
            label={t("মোবাইল নম্বর / ইউজারনেম", "Mobile Number / Username")}
            placeholder={t("এডমিন আইডি", "Admin ID")}
            type="text"
            role="admin"
            value={idOrPhone}
            passValue={password}
            onIdChange={(e) => {setRole('admin'); setIdOrPhone(e.target.value)}}
            onPassChange={(e) => setPassword(e.target.value)}
            onSubmit={(e) => handleLogin(e, 'admin')}
          />

        </div>
      </div>
    </main>
  );
}

// Reusable UI Component for the Login Cards
type LoginCardProps = {
  title: string;
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type: string;
  role: 'student' | 'teacher' | 'admin';
  value: string;
  passValue: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onIdChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPassChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function LoginCard({ title, icon, label, placeholder, type, role, value, passValue, onSubmit, onIdChange, onPassChange }: LoginCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 flex flex-col hover:border-purple-300 transition-all">
      <div className="text-5xl mb-4 flex justify-center">{icon}</div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
          <input 
            required
            type={type}
            placeholder={placeholder}
            onChange={onIdChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {t("পাসওয়ার্ড", "Password")}
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input 
              required
              type="password"
              placeholder="••••••••"
              onChange={onPassChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl hover:bg-purple-800 transition shadow-lg mt-4"
        >
          {t("লগইন করুন", "Log In")}
        </button>
      </form>
      
      <p className="text-center text-xs text-gray-400 mt-6 italic">
        {t("* আইডি ভুলে গেলে অফিস যোগযোগ করুন", "* If you forget your ID, contact the office.")}
      </p>
    </div>
  );
}
