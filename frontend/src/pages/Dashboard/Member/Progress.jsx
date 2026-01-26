import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../../../helpers/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Progress = ({ progressHistory, onUpdate }) => {
    const [newWeight, setNewWeight] = useState("");
    const [newHeight, setNewHeight] = useState("");

    const handleAddProgress = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await api.post("/progress/add", { weight: newWeight, height: newHeight }, { headers: { Authorization: `Bearer ${token}` } });
            alert("Progress updated!");
            setNewWeight("");
            setNewHeight("");
            onUpdate();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add progress");
        }
    };

    const chartData = {
        labels: progressHistory.map(p => new Date(p.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Weight (kg)',
                data: progressHistory.map(p => p.weight),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'BMI',
                data: progressHistory.map(p => p.bmi),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const latest = progressHistory[progressHistory.length - 1];

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold">Your Progress</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add New Entry Form */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Update Stats</h3>
                    <form onSubmit={handleAddProgress} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-zinc-400 mb-1">Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white"
                                placeholder="e.g. 75.5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 dark:text-zinc-400 mb-1">Height (cm)</label>
                            <input
                                type="number"
                                value={newHeight}
                                onChange={(e) => setNewHeight(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white"
                                placeholder="e.g. 175"
                                required
                            />
                        </div>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors">
                            Update Progress
                        </button>
                    </form>
                </div>

                {/* Current Stats */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-center items-center">
                    <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Current Stats</h3>
                    {latest ? (
                        <div className="grid grid-cols-2 gap-8 text-center w-full">
                            <div>
                                <p className="text-gray-500 dark:text-zinc-400 text-sm uppercase">BMI</p>
                                <p className={`text-4xl font-black ${latest.bmi < 18.5 ? 'text-blue-500' : latest.bmi < 25 ? 'text-green-500' : 'text-red-500'}`}>
                                    {latest.bmi}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {latest.bmi < 18.5 ? 'Underweight' : latest.bmi < 25 ? 'Normal' : 'Overweight'}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-zinc-400 text-sm uppercase">Weight</p>
                                <p className="text-4xl font-black text-gray-900 dark:text-white">{latest.weight} <span className="text-lg text-gray-500">kg</span></p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">No data yet. Add your first entry!</p>
                    )}
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Progress History</h3>
                <div className="h-64 md:h-80 w-full">
                    {progressHistory.length > 0 ? (
                        <Line options={{ responsive: true, maintainAspectRatio: false }} data={chartData} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">No chart data available</div>
                    )}
                </div>
            </div>

        </div>
    );
};
export default Progress;
