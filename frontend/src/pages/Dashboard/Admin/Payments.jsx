import React from 'react';
import StatCard from '../components/StatCard';

const Payments = ({ payments }) => {
    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.paymentAmount || 0), 0);
    const totalTransactions = payments.length;
    const pendingPayments = payments.filter(p => !p.paymentStatus || p.paymentStatus === 'pending').length;

    // Badge colors for payment status
    const statusBadge = (status) => {
        if (status === 'paid') return 'bg-green-100/80 text-green-800 shadow-sm';
        if (status === 'pending') return 'bg-yellow-100/80 text-yellow-800 shadow-sm';
        if (status === 'failed') return 'bg-red-100/80 text-red-800 shadow-sm';
        return 'bg-gray-100/80 text-gray-700 shadow-sm';
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-300">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Manage Payments</h2>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Total Revenue"
                    value={`LKR ${Number(totalRevenue).toLocaleString()}`}
                    trend="Total"
                    icon={
                        <div className="bg-gradient-to-br from-green-300 to-green-400 p-4 rounded-full shadow-xl flex items-center justify-center">
                            <span className="text-green-900 text-xl font-bold">$</span>
                        </div>
                    }
                    bgGradient="from-green-50 to-green-100"
                />
                <StatCard
                    label="Transactions"
                    value={totalTransactions}
                    icon={
                        <div className="bg-gradient-to-br from-blue-300 to-blue-400 p-4 rounded-full shadow-xl flex items-center justify-center">
                            <span className="text-blue-900 text-xl font-bold">#</span>
                        </div>
                    }
                    bgGradient="from-blue-50 to-blue-100"
                />
                <StatCard
                    label="Pending Payments"
                    value={pendingPayments}
                    icon={
                        <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 p-4 rounded-full shadow-xl flex items-center justify-center">
                            <span className="text-yellow-900 text-xl font-bold">!</span>
                        </div>
                    }
                    bgGradient="from-yellow-50 to-yellow-100"
                />
            </div>

            {/* PAYMENTS TABLE */}
            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500 dark:text-zinc-400">
                    <thead className="bg-gray-100 dark:bg-zinc-950 text-xs uppercase font-medium text-gray-500 dark:text-zinc-500">
                        <tr>
                            <th className="px-6 py-4">Member</th>
                            <th className="px-6 py-4">Class</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Payment ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {payments.map((p, i) => (
                            <tr
                                key={i}
                                className="hover:bg-gray-50 dark:hover:bg-zinc-800/40 transition-all cursor-pointer transform hover:scale-[1.01]"
                            >
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                                    {p.member?.name || <span className="text-red-500">Deleted User</span>}
                                    <div className="text-xs text-gray-400">{p.member?.email}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">{p.classId?.name || "Deleted Class"}</td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                                    LKR {Number(p.paymentAmount || p.classId?.price || 0).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(p.paymentStatus)}`}>
                                        {p.paymentStatus || 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{new Date(p.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-xs font-mono text-gray-400">{p.paymentIntentId ? p.paymentIntentId.substring(0, 10) + "..." : "-"}</td>
                            </tr>
                        ))}
                        {payments.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-zinc-500">No payment records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
