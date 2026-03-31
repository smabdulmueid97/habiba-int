"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaUserCircle, FaSignOutAlt, FaGraduationCap, FaChalkboardTeacher, 
  FaUserShield, FaFileInvoiceDollar, FaClipboardList, FaUsers, 
  FaBullhorn, FaCogs, FaChartLine, FaDatabase 
} from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || !savedRole) {
      router.push('/account');
    } else {
      setRole(savedRole);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear(); // Clears everything
    router.push('/account');
  };

  if (isLoading) return <div className="p-10 text-center font-bold text-purple-900">সিস্টেম লোড হচ্ছে...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Navigation / Header */}
        <div className={`flex flex-col md:flex-row justify-between items-center p-8 rounded-3xl shadow-xl mb-8 text-white ${role === 'admin' ? 'bg-slate-900' : 'bg-purple-900'}`}>
          <div className="flex items-center gap-6">
            <div className="relative">
              <FaUserCircle className="text-7xl text-white/80" />
              {role === 'admin' && <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-4 border-slate-900"></div>}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {role === 'admin' ? 'সুপার এডমিন ড্যাশবোর্ড' : 'স্বাগতম ইউজার!'}
              </h1>
              <p className="text-sm opacity-80 mt-1">ID: {role === 'admin' ? 'ADMIN-001' : 'STU-2026-X'}</p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 md:mt-0">
            {role === 'admin' && (
              <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-sm font-bold transition">সিস্টেম সেটিংস</button>
            )}
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2">
              <FaSignOutAlt /> লগআউট
            </button>
          </div>
        </div>

        {/* ADMIN EXCLUSIVE: System Quick Stats */}
        {role === 'admin' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatBox label="মোট শিক্ষার্থী" value="৪৫০" color="border-blue-500" />
            <StatBox label="মোট শিক্ষক" value="২৫" color="border-green-500" />
            <StatBox label="আজকের উপস্থিতি" value="৯২%" color="border-purple-500" />
            <StatBox label="মাসিক সংগ্রহ" value="৳ ২.৫ লক্ষ" color="border-orange-500" />
          </div>
        )}

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {role === 'student' && <StudentDashboard />}
          {role === 'teacher' && <TeacherDashboard />}
          {role === 'admin' && <AdminDashboard />}
        </div>

      </div>
    </main>
  );
}

/* --- ADMIN DASHBOARD: ACCESS TO EVERYTHING --- */
function AdminDashboard() {
  return (
    <>
      <DashboardCard icon={<FaUsers />} title="সকল শিক্ষার্থী" desc="সকল ক্লাসের ডাটাবেস ম্যানেজ করুন" color="text-blue-600" />
      <DashboardCard icon={<FaChalkboardTeacher />} title="শিক্ষক ম্যানেজমেন্ট" desc="নতুন শিক্ষক নিয়োগ ও প্রোফাইল" color="text-green-600" />
      <DashboardCard icon={<FaFileInvoiceDollar />} title="অ্যাকাউন্টস ও ফি" desc="বেতন সংগ্রহ ও খরচের রিপোর্ট" color="text-emerald-600" />
      <DashboardCard icon={<FaBullhorn />} title="নোটিশ পাবলিশ" desc="ওয়েবসাইটে নতুন নোটিশ আপলোড করুন" color="text-orange-600" />
      <DashboardCard icon={<FaChartLine />} title="ফলাফল ম্যানেজমেন্ট" desc="পুরো স্কুলের রেজাল্ট প্রসেসিং" color="text-indigo-600" />
      <DashboardCard icon={<FaDatabase />} title="ব্যাকআপ ডাটা" desc="সিস্টেমের সব তথ্যের ব্যাকআপ নিন" color="text-gray-600" />
      <DashboardCard icon={<FaClipboardList />} title="ক্লাস রুটিন সেটআপ" desc="মাস্টার রুটিন এডিট করুন" color="text-purple-600" />
      <DashboardCard icon={<FaCogs />} title="রোল পারমিশন" desc="কে কি দেখতে পারবে তা ঠিক করুন" color="text-red-600" />
    </>
  );
}

/* --- TEACHER & STUDENT DASHBOARDS (Restricted) --- */
function TeacherDashboard() {
  return (
    <>
      <DashboardCard icon={<FaUsers />} title="আমার ক্লাস" desc="আপনার নির্ধারিত ক্লাসের তালিকা" color="text-indigo-600" />
      <DashboardCard icon={<FaClipboardList />} title="হাজিরা ইনপুট" desc="শিক্ষার্থীদের উপস্থিতি আপডেট করুন" color="text-orange-600" />
      <DashboardCard icon={<FaChartLine />} title="মার্কস এন্ট্রি" desc="পরীক্ষার নম্বর ইনপুট দিন" color="text-blue-600" />
    </>
  );
}

function StudentDashboard() {
  return (
    <>
      <DashboardCard icon={<FaGraduationCap />} title="আমার রেজাল্ট" desc="আপনার পরীক্ষার ফলাফল দেখুন" color="text-blue-600" />
      <DashboardCard icon={<FaFileInvoiceDollar />} title="পেমেন্ট হিস্ট্রি" desc="বেতন ও ফি সংক্রান্ত তথ্য" color="text-green-600" />
      <DashboardCard icon={<FaClipboardList />} title="ক্লাস রুটিন" desc="আপনার দৈনিক ক্লাসের সময়সূচী" color="text-purple-600" />
    </>
  );
}

/* --- UI HELPER COMPONENTS --- */

function StatBox({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className={`bg-white p-5 rounded-2xl border-l-8 shadow-sm ${color}`}>
      <p className="text-gray-500 text-xs font-bold uppercase">{label}</p>
      <p className="text-2xl font-black text-gray-800">{value}</p>
    </div>
  );
}

function DashboardCard({ icon, title, desc, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-blue-400 hover:shadow-xl transition-all group cursor-pointer">
      <div className={`text-4xl mb-4 transition-transform group-hover:scale-110 ${color}`}>{icon}</div>
      <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}