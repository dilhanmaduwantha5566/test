import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../helpers/api";


// Sub-components
import Overview from "./Trainer/Overview";
import MyClasses from "./Trainer/MyClasses";
import AddClass from "./Trainer/AddClass";
import StudentProgress from "./Trainer/StudentProgress";
import Settings from "./Trainer/Settings";

/**
 * TrainerDashboard Component
 * 
 * Main dashboard view for Trainers.
 * Allows trainers to manage their classes, view scheduled sessions, and (future) track student progress.
 */
export default function TrainerDashboard() {
  // State to track current view
  const [activeTab, setActiveTab] = useState("overview");

  // State to store the list of classes created by the trainer
  const [classes, setClasses] = useState([]);



  const navigate = useNavigate();

  /**
   * Fetches the classes specific to the logged-in trainer.
   */
  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/classes/trainer", { headers: { Authorization: `Bearer ${token}` } });
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

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
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Supreme<span className="text-red-600">Trainer</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem
            id="overview"
            label="Overview"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
          />
          <SidebarItem
            id="classes"
            label="My Classes"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
          />
          <SidebarItem
            id="add-class"
            label="Schedule Class"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <SidebarItem
            id="progress"
            label="Student Progress"
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
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
              {activeTab === 'overview' && 'Welcome Back'}
              {activeTab === 'classes' && 'My Classes'}
              {activeTab === 'add-class' && 'Create New Class'}
              {activeTab === 'progress' && 'Student Performance'}
              {activeTab === 'settings' && 'Account Settings'}
            </h1>
            <p className="text-gray-500 dark:text-zinc-500 mt-1">Manage your training schedule and student progress.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-400 dark:text-zinc-400 hover:text-red-600 dark:hover:text-white hover:border-red-200 dark:hover:border-zinc-700 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-700 to-blue-600 border-2 border-zinc-800 shadow-sm flex items-center justify-center font-bold text-xs">TR</div>
          </div>
        </header>

        {activeTab === 'overview' && <Overview classes={classes} />}
        {activeTab === 'classes' && <MyClasses classes={classes} onAddClassClick={() => setActiveTab('add-class')} />}
        {activeTab === 'add-class' && <AddClass onClassAdded={() => { fetchClasses(); setActiveTab('classes'); }} />}
        {activeTab === 'progress' && <StudentProgress />}
        {activeTab === 'settings' && <Settings />}

      </main>
    </div>
  );
}
