import React from 'react';
import api from '../../../helpers/api';

/**
 * UserManagement
 *
 * Centralized administrative panel for managing
 * all approved platform users.
 *
 * Administrators can:
 * • Review active Trainers and Members
 * • Temporarily deactivate accounts
 * • Permanently remove users from the system
 */
const UserManagement = ({ approvedUsers, onRefresh }) => {

    /**
     * Temporarily disables a user account.
     * The account remains in the system and can be restored.
     */
    const handleDeactivate = async (role, id) => {
        if (
            !window.confirm(
                `Deactivate this ${role} account?\n\nThis will immediately restrict access without deleting user data.`
            )
        ) return;

        try {
            const token = localStorage.getItem("token");
            await api.put(
                `/admin/deactivate/${role}/${id}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Account successfully deactivated.");
            onRefresh();
        } catch {
            alert("Action failed. Please try again.");
        }
    };

    /**
     * Permanently deletes a user account.
     * This action is irreversible.
     */
    const handleDelete = async (role, id) => {
        if (
            !window.confirm(
                `PERMANENT DELETION WARNING\n\nThis will permanently remove the ${role} account and all associated data.\n\nContinue?`
            )
        ) return;

        try {
            const token = localStorage.getItem("token");
            await api.delete(
                `/admin/reject/${role}/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("User permanently deleted.");
            onRefresh();
        } catch {
            alert("Deletion failed. Please try again.");
        }
    };

    return (
        <section className="space-y-6 animate-in fade-in duration-300">
            {/* Header */}
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        User Administration
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-zinc-500 mt-1">
                        Manage all active user accounts across the platform
                    </p>
                </div>
            </header>

            {/* Table Container */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left text-gray-500 dark:text-zinc-400">
                    <thead className="bg-gray-100 dark:bg-zinc-950 text-xs uppercase font-semibold tracking-wide">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {approvedUsers.trainers.map((t) => (
                            <tr key={t._id} className="group hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {t.name}
                                </td>
                                <td className="px-6 py-4">{t.email}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-blue-500/10 text-blue-500">
                                        Trainer
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center text-green-500 font-medium">
                                        ● Active
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-3 opacity-90 group-hover:opacity-100">
                                        <button
                                            onClick={() => handleDeactivate('trainer', t._id)}
                                            className="text-yellow-600 dark:text-yellow-500 hover:text-black dark:hover:text-white transition"
                                        >
                                            Deactivate
                                        </button>
                                        <button
                                            onClick={() => handleDelete('trainer', t._id)}
                                            className="text-red-500 hover:text-black dark:hover:text-white transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {approvedUsers.members.map((m) => (
                            <tr key={m._id} className="group hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {m.name}
                                </td>
                                <td className="px-6 py-4">{m.email}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                        Member
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center text-green-500 font-medium">
                                        ● Active
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-3 opacity-90 group-hover:opacity-100">
                                        <button
                                            onClick={() => handleDeactivate('member', m._id)}
                                            className="text-yellow-600 dark:text-yellow-500 hover:text-black dark:hover:text-white transition"
                                        >
                                            Deactivate
                                        </button>
                                        <button
                                            onClick={() => handleDelete('member', m._id)}
                                            className="text-red-500 hover:text-black dark:hover:text-white transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {approvedUsers.members.length === 0 && approvedUsers.trainers.length === 0 && (
                    <div className="p-10 text-center">
                        <p className="text-sm text-gray-500 dark:text-zinc-500">
                            There are currently no active user accounts.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserManagement;
