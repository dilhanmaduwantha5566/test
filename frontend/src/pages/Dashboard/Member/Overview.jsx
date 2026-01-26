import React from 'react';
import StatCard from '../components/StatCard';

const Overview = ({ myBookings = [], availableClasses = [], onBrowseClick }) => {
    const randomQuote = "Push yourself because no one else is going to do it for you!";

    // Filter bookings safely
    const pastBookings = myBookings.filter(
        b => b.status === 'confirmed' && b.classId?.date && new Date(b.classId.date) < new Date()
    );

    const upcomingBookings = myBookings.filter(
        b => b.status === 'confirmed' && b.classId?.date && new Date(b.classId.date) >= new Date()
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Motivational Quote Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-900 to-black border border-zinc-800 p-8 mb-8">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/20 rounded-full blur-3xl"></div>
                <h3 className="relative z-10 text-2xl md:text-3xl font-bold text-white italic">"{randomQuote}"</h3>
                <p className="relative z-10 text-red-200 mt-2 font-medium">- Supreme Motivation</p>
            </div>

            {/* Stat Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    label="Classes Attended"
                    value={pastBookings.length}
                    trend="+3 this week"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    }
                />
                <StatCard
                    label="Upcoming Bookings"
                    value={upcomingBookings.length}
                    trend="Get ready!"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Available Classes"
                    value={availableClasses.length}
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                    }
                />
            </section>

            {/* New Classes */}
            <h2 className="text-xl font-bold">New Classes Added</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableClasses.length > 0 ? (
                    availableClasses.slice(0, 3).map((cls, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-4 hover:border-red-600/50 transition-colors group cursor-pointer"
                        >
                            <div className="h-32 bg-gray-100 dark:bg-zinc-800 rounded-xl mb-4 w-full object-cover relative overflow-hidden flex items-center justify-center">
                                <span className="text-4xl text-gray-300 dark:text-zinc-700 font-black uppercase tracking-widest">{cls.type || "?"}</span>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <span className="absolute bottom-2 left-2 text-white font-bold text-sm bg-red-600 px-2 py-1 rounded">New</span>
                                <span className="absolute bottom-2 right-2 text-white font-bold text-sm">LKR {cls.price ?? "N/A"}</span>
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{cls.name || "Unnamed Class"}</h4>
                            <p className="text-gray-500 dark:text-zinc-500 text-sm mb-3">
                                {cls.duration ? `${cls.duration} mins` : "Duration N/A"} • {cls.date ?? "Date N/A"}
                            </p>
                            <button
                                onClick={onBrowseClick}
                                className="w-full py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors font-medium"
                            >
                                View Schedule
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-zinc-500">No new classes available.</p>
                )}
            </div>
        </div>
    );
};

export default Overview;
