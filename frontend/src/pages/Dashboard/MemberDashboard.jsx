import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../helpers/api";

import PaymentModal from "../../components/PaymentModal";

// Sub-components
import Overview from "./Member/Overview";
import BrowseClasses from "./Member/BrowseClasses";
import MyBookings from "./Member/MyBookings";
import Progress from "./Member/Progress";
import Settings from "./Member/Settings";

/**
 * MemberDashboard Component
 * 
 * Main dashboard view for Gym Members.
 * Provides functionality to browse classes, manage bookings, view progress, and update settings.
 */
export default function MemberDashboard() {
  // Navigation state
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [availableClasses, setAvailableClasses] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [progressHistory, setProgressHistory] = useState([]);


  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const navigate = useNavigate();

  /**
   * Loads all initial data required for the member dashboard:
   * - Available classes for booking
   * - Member's existing bookings
   * - Progress history (BMI, weight, etc.)
   */
  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [classesRes, bookingsRes, progressRes] = await Promise.all([
        api.get("/classes/all"),
        api.get("/bookings/my-bookings", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/progress/history", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setAvailableClasses(classesRes.data);
      setMyBookings(bookingsRes.data);
      setProgressHistory(progressRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleBookClass = (cls) => {
    if (cls.price > 0) {
      setSelectedClass(cls);
      setShowPaymentModal(true);
    } else {
      processBooking(cls._id);
    }
  };

  const processBooking = async (classId, paymentIntent = null) => {
    try {
      const token = localStorage.getItem("token");
      const payload = { classId };
      if (paymentIntent) {
        payload.paymentIntentId = paymentIntent.id;
        payload.amount = paymentIntent.amount / 100; // Convert back from smallest currency unit
      }

      await api.post("/bookings/book", payload, { headers: { Authorization: `Bearer ${token}` } });
      alert("Class booked successfully!");
      setShowPaymentModal(false);
      fetchAllData(); // Refresh data
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const SidebarItem = ({ icon, label, id }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === id
        ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
        : "text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-white"
        }`}
    >
      <div className={`p-1 ${activeTab === id ? "text-white" : "text-gray-400 dark:text-zinc-400 group-hover:text-red-500 dark:group-hover:text-white"}`}>{icon}</div>
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-sans transition-colors duration-300">

      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-900 p-6 flex flex-col fixed h-full z-10 transition-colors duration-300">
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-lg object-cover border-2 border-red-600" />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Supreme<span className="text-red-600">Member</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem
            id="overview"
            label="Home"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
          />
          <SidebarItem
            id="browse"
            label="Browse Classes"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          />
          <SidebarItem
            id="bookings"
            label="My Bookings"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          />
          <SidebarItem
            id="progress"
            label="My Progress"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
          />
          <SidebarItem
            id="achievements"
            label="Achievements"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
          />
        </nav>

        <div className="pt-6 border-t border-gray-200 dark:border-zinc-900 space-y-2">
          <SidebarItem
            id="settings"
            label="Settings"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-red-500 group"
          >
            <div className="p-1 text-gray-400 dark:text-zinc-400 group-hover:text-red-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </div>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
              {activeTab === 'overview' && 'Let\'s Crush It!'}
              {activeTab === 'browse' && 'Class Schedule'}
              {activeTab === 'bookings' && 'My Bookings'}
              {activeTab === 'progress' && 'Your Journey'}
              {activeTab === 'achievements' && 'Trophies & Badges'}
              {activeTab === 'settings' && 'User Settings'}
            </h1>
            <p className="text-gray-500 dark:text-zinc-500 mt-1">
              {activeTab === 'overview' ? "Today is a great day to be better than yesterday." : "Manage your fitness journey."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-400 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white hover:border-red-200 dark:hover:border-zinc-700 transition-all relative">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-red-700 to-red-600 border-2 border-zinc-800 shadow-sm flex items-center justify-center font-bold text-xs">ME</div>
          </div>
        </header>

        {activeTab === 'overview' && <Overview myBookings={myBookings} availableClasses={availableClasses} onBrowseClick={() => setActiveTab('browse')} />}
        {activeTab === 'browse' && <BrowseClasses availableClasses={availableClasses} onBookClass={handleBookClass} />}
        {activeTab === 'bookings' && <MyBookings myBookings={myBookings} onRefresh={fetchAllData} />}
        {activeTab === 'progress' && <Progress progressHistory={progressHistory} onUpdate={fetchAllData} />}
        {activeTab === 'settings' && <Settings />}
      </main>

      <PaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={selectedClass?.price || 0}
        classDetails={selectedClass}
        onPaymentSuccess={(paymentIntent) => processBooking(selectedClass._id, paymentIntent)}
      />
    </div>
  );
}
