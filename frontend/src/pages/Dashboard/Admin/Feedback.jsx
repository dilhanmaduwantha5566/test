import React from 'react';

const Feedback = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Feedback</h2>
        <div className="grid grid-cols-1 gap-4">
            {[1, 2].map((i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-2xl flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-gray-500 dark:text-zinc-500">U</div>
                    <div className="flex-1">
                        <div className="flex justify-between mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white">Anonymous User</h4>
                            <span className="text-yellow-500 text-sm">★★★★★</span>
                        </div>
                        <p className="text-gray-500 dark:text-zinc-400 text-sm">The facilities are amazing! Really love the new equipment.</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Feedback;
