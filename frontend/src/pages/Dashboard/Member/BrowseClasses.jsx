import React from 'react';

/**
 * BrowseClasses Component
 * 
 * Displays a list of all available classes that members can book.
 * Allows filtering (placeholder) and initiating the booking process.
 * 
 * @param {Array} availableClasses - List of class objects fetched from API
 * @param {Function} onBookClass - Callback to handle the booking action (opens payment modal)
 */
const BrowseClasses = ({ availableClasses, onBookClass }) => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Explore Classes</h2>
            <input type="text" placeholder="Search classes..." className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-4 py-2 rounded-lg text-gray-900 dark:text-white focus:border-red-600 outline-none w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableClasses.map((cls, i) => (
                <div key={i} className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-red-900/10 transition-all">
                    <div className="h-40 bg-gray-100 dark:bg-zinc-800 relative flex items-center justify-center">
                        <span className="text-5xl text-gray-300 dark:text-zinc-700 font-black uppercase tracking-widest opacity-30">{cls.type.substring(0, 3)}</span>
                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white">{cls.time}</div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">{cls.name}</h3>
                            <span className="text-xs text-gray-500 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-950 px-2 py-1 rounded">{cls.type}</span>
                        </div>
                        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-2"><span className="text-gray-400 dark:text-zinc-500">Trainer:</span> {cls.trainer?.name || 'TBA'}</p>
                        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4">Duration: {cls.duration} min • Date: {cls.date}</p>

                        <div className="flex justify-between items-center mb-4 bg-gray-50 dark:bg-zinc-800/50 p-2 rounded-lg">
                            <span className="text-sm text-gray-500 dark:text-zinc-400">Price</span>
                            <span className="font-bold text-red-600">LKR {cls.price}</span>
                        </div>

                        <button
                            onClick={() => onBookClass(cls)}
                            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Book & Pay
                        </button>
                    </div>
                </div>
            ))}
            {availableClasses.length === 0 && <p className="text-gray-500 dark:text-zinc-500 col-span-3 text-center py-10">No classes scheduled yet. Check back later!</p>}
        </div>
    </div>
);
export default BrowseClasses;
