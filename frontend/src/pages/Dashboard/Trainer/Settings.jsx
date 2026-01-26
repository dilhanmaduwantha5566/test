import React, { useState, useEffect } from 'react';
import api from '../../../helpers/api';

const Settings = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
                setUserData({ name: res.data.name, email: res.data.email, password: "" });
            } catch (err) {
                console.error("Failed to fetch user data", err);
            }
        };
        fetchUser();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await api.put("/auth/update-profile", userData, { headers: { Authorization: `Bearer ${token}` } });
            alert("Profile updated successfully!");
            setUserData({ ...userData, password: "" }); // Clear password field
        } catch (err) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 max-w-2xl">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Profile Details</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-500 dark:text-zinc-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 dark:text-zinc-400 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={userData.email}
                            readOnly
                            className="w-full bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-2 text-gray-500 dark:text-zinc-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 dark:text-zinc-400 mb-1">New Password (leave blank to keep current)</label>
                        <input
                            type="password"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white"
                            placeholder="********"
                        />
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
