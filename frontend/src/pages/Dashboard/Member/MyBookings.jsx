import React from 'react';
import api from '../../../helpers/api';

/**
 * MyBookings Component
 * 
 * Displays a table of classes the member has booked.
 * Shows status (confirmed/cancelled) and payment status.
 * Allows cancelling upcoming bookings.
 */
const MyBookings = ({ myBookings, onRefresh }) => {
    /**
     * Cancels a booking via API call.
     */
    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel?")) return;
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/bookings/cancel/${bookingId}`, { headers: { Authorization: `Bearer ${token}` } });
            alert("Booking cancelled.");
            onRefresh(); // Refresh data
        } catch (err) {
            alert(err.response?.data?.message || "Cancellation failed");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold">My Bookings</h2>
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-gray-500 dark:text-zinc-400">
                    <thead className="bg-gray-100 dark:bg-zinc-950 text-xs uppercase font-medium text-gray-500 dark:text-zinc-500">
                        <tr>
                            <th className="px-6 py-4">Class</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                        {myBookings.map((b, i) => (
                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{b.classId.name}</td>
                                <td className="px-6 py-4">{b.classId.date}</td>
                                <td className="px-6 py-4">{b.classId.time}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${b.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                                        'bg-red-500/10 text-red-500'
                                        }`}>{b.status}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${b.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500' :
                                        'bg-yellow-500/10 text-yellow-500'
                                        }`}>{b.paymentStatus || 'Pending'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    {b.status === 'confirmed' && (
                                        <button onClick={() => handleCancelBooking(b._id)} className="text-red-500 hover:text-black dark:hover:text-white transition-colors">Cancel</button>
                                    )}
                                    {b.status === 'cancelled' && <span className="text-gray-400 dark:text-zinc-600">Cancelled</span>}
                                </td>
                            </tr>
                        ))}
                        {myBookings.length === 0 && (
                            <tr><td colSpan="6" className="text-center py-6 text-gray-500 dark:text-zinc-500">You haven't booked any classes yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default MyBookings;
