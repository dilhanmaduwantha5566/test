import React from 'react';

const MyClasses = ({ classes, onAddClassClick }) => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Class Management</h2>
            <button onClick={onAddClassClick} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                + Schedule Class
            </button>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm text-gray-500 dark:text-zinc-400">
                <thead className="bg-gray-100 dark:bg-zinc-950 text-xs uppercase font-medium text-gray-500 dark:text-zinc-500">
                    <tr>
                        <th className="px-6 py-4">Class Name</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Date & Time</th>
                        <th className="px-6 py-4">Duration</th>
                        <th className="px-6 py-4">Price (LKR)</th>
                        <th className="px-6 py-4">Attendees</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                    {classes.map((cls, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                            <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{cls.name}</td>
                            <td className="px-6 py-4"><span className="bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">{cls.type}</span></td>
                            <td className="px-6 py-4">{cls.date} at {cls.time}</td>
                            <td className="px-6 py-4">{cls.duration} min</td>
                            <td className="px-6 py-4">{cls.price ? `${cls.price}` : 'Free'}</td>
                            <td className="px-6 py-4">{cls.attendees?.length || 0}</td>
                        </tr>
                    ))}
                    {classes.length === 0 && (
                        <tr><td colSpan="6" className="text-center py-6 text-gray-500 dark:text-zinc-500">No classes found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default MyClasses;
