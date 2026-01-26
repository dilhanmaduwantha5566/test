import React from 'react';

/**
 * StatCard Component
 * 
 * A reusable UI component for displaying statistics.
 * Used in Overview dashboards.
 * 
 * @param {string} label - The label for the statistic (e.g., "Total Revenue")
 * @param {string|number} value - The main value to display
 * @param {string} trend - Optional trend indicator (e.g., "+12%")
 * @param {ReactNode} icon - Icon element to display
 */
const StatCard = ({ label, value, trend, icon }) => (
    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-gray-200 dark:border-zinc-800/50 p-6 rounded-2xl hover:shadow-lg dark:hover:bg-zinc-900 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-100 dark:bg-zinc-800 rounded-xl text-gray-500 dark:text-zinc-400 group-hover:text-white group-hover:bg-red-600 transition-all duration-300">
                {icon}
            </div>
            {trend && <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{trend}</span>}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
        <p className="text-gray-500 dark:text-zinc-500 text-sm font-medium uppercase tracking-wide">{label}</p>
    </div>
);

export default StatCard;
