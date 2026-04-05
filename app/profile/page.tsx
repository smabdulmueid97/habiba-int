// File: app/profile/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaUserCircle, FaSignOutAlt, FaGraduationCap, FaChalkboardTeacher, 
  FaUserShield, FaFileInvoiceDollar, FaClipboardList, FaUsers, 
  FaBullhorn, FaCogs, FaChartLine, FaDatabase, FaCheck, FaTimes
} from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function ProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
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

  if (isLoading) {
    return (
      <div className="p-10 text-center font-bold text-purple-900 text-xl">
        {t("সিস্টেম লোড হচ্ছে...", "Loading system...")}
      </div>
    );
  }

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
                {role === 'admin'
                  ? t("সুপার এডমিন ড্যাশবোর্ড", "Super Admin Dashboard")
                  : t("স্বাগতম ইউজার!", "Welcome!")}
              </h1>
              <p className="text-sm opacity-80 mt-1">
                {t("আইডি", "ID")}: {role === 'admin' ? 'ADMIN-001' : 'STU-2026-X'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6 md:mt-0">
            {role === 'admin' && (
              <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl text-sm font-bold transition">
                {t("সিস্টেম সেটিংস", "System Settings")}
              </button>
            )}
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2">
              <FaSignOutAlt /> {t("লগআউট", "Log Out")}
            </button>
          </div>
        </div>

        {/* ADMIN EXCLUSIVE: System Quick Stats */}
        {role === 'admin' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatBox label={t("মোট শিক্ষার্থী", "Total Students")} value={t("৪৫০", "450")} color="border-blue-500" />
            <StatBox label={t("মোট শিক্ষক", "Total Teachers")} value={t("২৫", "25")} color="border-green-500" />
            <StatBox label={t("আজকের উপস্থিতি", "Today's Attendance")} value={t("৯২%", "92%")} color="border-purple-500" />
            <StatBox label={t("মাসিক সংগ্রহ", "Monthly Collection")} value={t("৳ ২.৫ লক্ষ", "BDT 2.5 Lakh")} color="border-orange-500" />
          </div>
        )}

        {/* Render the correct dashboard based on role */}
        {role === 'admin' && <AdminDashboard />}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {role === 'student' && <StudentDashboard />}
          {role === 'teacher' && <TeacherDashboard />}
        </div>

      </div>
    </main>
  );
}

/* --- ADMIN DASHBOARD: ACCESS TO EVERYTHING & PENDING ADMISSIONS --- */
function AdminDashboard() {
  const { t } = useLanguage();
  const [students, setStudents] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch students from our API
  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/admin/admissions');
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle approving a student
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch('/api/admin/admissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'approved' })
      });
      
      const data = await res.json();
      if (data.success) {
        // Refresh the list after successful approval
        fetchStudents();
        alert(t("শিক্ষার্থীর রেজিস্ট্রেশন সফলভাবে অনুমোদিত হয়েছে!", "Student registration approved successfully!"));
      } else {
        alert(t("অনুমোদন ব্যর্থ হয়েছে।", "Approval failed."));
      }
    } catch (error) {
      console.error("Error approving student", error);
    }
  };

  // Filter out only the pending students
  const pendingStudents = students.filter(student => student.status === 'pending');

  return (
    <div className="space-y-8">
      {/* 1. Pending Admissions Section */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-red-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaUserShield className="text-red-500" /> {t("অপেক্ষমাণ রেজিস্ট্রেশন", "Pending Admissions")}
          <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full ml-2">
            {pendingStudents.length}
          </span>
        </h2>
        
        {isFetching ? (
          <p className="text-gray-500">{t("ডাটা লোড হচ্ছে...", "Loading data...")}</p>
        ) : pendingStudents.length === 0 ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl font-medium border border-green-200">
            {t("বর্তমানে কোনো অপেক্ষমাণ রেজিস্ট্রেশন নেই।", "No pending registrations at the moment.")}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 rounded-tl-xl font-bold">{t("স্টুডেন্ট আইডি", "Student ID")}</th>
                  <th className="p-4 font-bold">{t("নাম", "Name")}</th>
                  <th className="p-4 font-bold">{t("শ্রেণি", "Class")}</th>
                  <th className="p-4 font-bold">{t("মোবাইল", "Phone")}</th>
                  <th className="p-4 rounded-tr-xl font-bold text-center">{t("অ্যাকশন", "Action")}</th>
                </tr>
              </thead>
              <tbody>
                {pendingStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 font-mono font-bold text-purple-700">{student.id}</td>
                    <td className="p-4 font-medium text-gray-800">{student.studentName}</td>
                    <td className="p-4 text-gray-600">{t("শ্রেণি", "Class")} {student.classLevel}</td>
                    <td className="p-4 text-gray-600">{student.phone}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleApprove(student.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm transition flex items-center gap-2 mx-auto"
                      >
                        <FaCheck /> {t("অনুমোদন করুন", "Approve")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 2. Standard Admin Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard icon={<FaUsers />} title={t("সকল শিক্ষার্থী", "All Students")} desc={t("সকল ক্লাসের ডাটাবেস ম্যানেজ করুন", "Manage student data for all classes")} color="text-blue-600" />
        <DashboardCard icon={<FaChalkboardTeacher />} title={t("শিক্ষক ম্যানেজমেন্ট", "Teacher Management")} desc={t("নতুন শিক্ষক নিয়োগ ও প্রোফাইল", "Hire new teachers and manage profiles")} color="text-green-600" />
        <DashboardCard icon={<FaFileInvoiceDollar />} title={t("অ্যাকাউন্টস ও ফি", "Accounts & Fees")} desc={t("বেতন সংগ্রহ ও খরচের রিপোর্ট", "Fee collection and expense reports")} color="text-emerald-600" />
        <DashboardCard icon={<FaBullhorn />} title={t("নোটিশ পাবলিশ", "Publish Notices")} desc={t("ওয়েবসাইটে নতুন নোটিশ আপলোড করুন", "Upload new notices to the website")} color="text-orange-600" />
        <DashboardCard icon={<FaChartLine />} title={t("ফলাফল ম্যানেজমেন্ট", "Results Management")} desc={t("পুরো স্কুলের রেজাল্ট প্রসেসিং", "Process results for the whole school")} color="text-indigo-600" />
        <DashboardCard icon={<FaDatabase />} title={t("ব্যাকআপ ডাটা", "Backup Data")} desc={t("সিস্টেমের সব তথ্যের ব্যাকআপ নিন", "Back up all system data")} color="text-gray-600" />
        <DashboardCard icon={<FaClipboardList />} title={t("ক্লাস রুটিন সেটআপ", "Class Routine Setup")} desc={t("মাস্টার রুটিন এডিট করুন", "Edit the master routine")} color="text-purple-600" />
        <DashboardCard icon={<FaCogs />} title={t("রোল পারমিশন", "Role Permissions")} desc={t("কে কি দেখতে পারবে তা ঠিক করুন", "Control who can see what")} color="text-red-600" />
      </div>
    </div>
  );
}

/* --- TEACHER & STUDENT DASHBOARDS (Restricted) --- */
function TeacherDashboard() {
  const { t } = useLanguage();
  return (
    <>
      <DashboardCard icon={<FaUsers />} title={t("আমার ক্লাস", "My Classes")} desc={t("আপনার নির্ধারিত ক্লাসের তালিকা", "Your assigned class list")} color="text-indigo-600" />
      <DashboardCard icon={<FaClipboardList />} title={t("হাজিরা ইনপুট", "Attendance Input")} desc={t("শিক্ষার্থীদের উপস্থিতি আপডেট করুন", "Update student attendance")} color="text-orange-600" />
      <DashboardCard icon={<FaChartLine />} title={t("মার্কস এন্ট্রি", "Marks Entry")} desc={t("পরীক্ষার নম্বর ইনপুট দিন", "Enter exam marks")} color="text-blue-600" />
    </>
  );
}

function StudentDashboard() {
  const { t } = useLanguage();
  return (
    <>
      <DashboardCard icon={<FaGraduationCap />} title={t("আমার রেজাল্ট", "My Results")} desc={t("আপনার পরীক্ষার ফলাফল দেখুন", "View your exam results")} color="text-blue-600" />
      <DashboardCard icon={<FaFileInvoiceDollar />} title={t("পেমেন্ট হিস্ট্রি", "Payment History")} desc={t("বেতন ও ফি সংক্রান্ত তথ্য", "Fee and payment details")} color="text-green-600" />
      <DashboardCard icon={<FaClipboardList />} title={t("ক্লাস রুটিন", "Class Routine")} desc={t("আপনার দৈনিক ক্লাসের সময়সূচী", "Your daily class schedule")} color="text-purple-600" />
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
