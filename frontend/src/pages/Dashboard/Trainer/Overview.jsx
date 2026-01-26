import React from 'react';
import StatCard from '../components/StatCard';

const Overview = ({ classes }) => {
    const totalStudents = classes.reduce((acc, curr) => acc + (curr.attendees ? curr.attendees.length : 0), 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    label="Total Classes"
                    value={classes.length}
                    trend="Active"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
                />
                <StatCard
                    label="Active Students"
                    value={totalStudents}
                    trend="Enrolled"
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                />
                <StatCard
                    label="Upcoming"
                    value={classes.filter(c => new Date(c.date) >= new Date()).length}
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                />
            </section>

            {/* Quick Activity Feed */}
            <h2 className="text-xl font-bold">Your Scheduled Classes</h2>
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
                {classes.slice(0, 3).map((cls, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-zinc-800 last:border-0">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-zinc-800 flex flex-col items-center justify-center text-xs font-bold text-gray-500 dark:text-zinc-400">
                                <span>{cls.time}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">{cls.name}</h4>
                                <p className="text-xs text-gray-500 dark:text-zinc-500">{cls.date} • {cls.attendees?.length || 0} Attendees</p>
                            </div>
                        </div>
                        <span className="text-xs bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-gray-600 dark:text-zinc-400">{cls.type}</span>
                    </div>
                ))}
                {classes.length === 0 && <p className="text-gray-500 dark:text-zinc-500 text-center">No classes scheduled yet.</p>}
            </div>
        </div>
    );
};

export default Overview;
