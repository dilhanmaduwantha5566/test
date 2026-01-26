import React from 'react';

/**
 * PendingCard Component
 * 
 * Displays a single user approval request.
 * Provides Approve and Reject buttons.
 * 
 * @param {Object} user - The user object containing details like name and email
 * @param {string} role - The role of the user ('member' or 'trainer')
 * @param {Function} onApprove - Callback for approval action
 * @param {Function} onReject - Callback for rejection action
 */
const PendingCard = ({ user, role, onApprove, onReject }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/40 border border-gray-200 dark:border-zinc-800 rounded-xl hover:border-gray-300 dark:hover:border-zinc-700 transition-all">
        <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {user.name[0]}
            </div>
            <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                <p className="text-xs text-gray-500 dark:text-zinc-500">{user.email} • <span className="capitalize text-gray-400 dark:text-zinc-400">{role}</span></p>
            </div>
        </div>
        <div className="flex gap-2">
            <button onClick={() => onApprove(role, user._id)} className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all" title="Approve">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </button>
            <button onClick={() => onReject(role, user._id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Reject">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    </div>
);

export default PendingCard;
