import React, { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import StatCard from '../components/StatCard';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from 'chart.js';

/* ---------------- Chart Registration ---------------- */
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

/* ---------------- Elegant Chart Options ---------------- */
const elegantChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: '#9ca3af',
                font: { size: 12, weight: '500' },
                boxWidth: 12,
                usePointStyle: true,
            },
        },
        tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            borderWidth: 0,
            cornerRadius: 10,
        },
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { color: '#9ca3af' },
        },
        y: {
            grid: {
                color: 'rgba(148, 163, 184, 0.08)',
                drawBorder: false,
            },
            ticks: { color: '#9ca3af' },
        },
    },
};

/* ---------------- Component ---------------- */
const Reports = ({ reports = {} }) => {
    const attendance = reports?.charts?.attendance ?? [];
    const revenue = reports?.charts?.revenue ?? {};

    const attendanceData = useMemo(() => ({
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Check-ins',
                data: attendance.length ? attendance : Array(7).fill(0),
                backgroundColor: 'rgba(239, 68, 68, 0.75)',
                hoverBackgroundColor: 'rgba(239, 68, 68, 0.9)',
                borderRadius: 10,
                barThickness: 26,
            },
        ],
    }), [attendance]);

    const revenueData = useMemo(() => ({
        labels: revenue?.labels ?? [],
        datasets: [
            {
                label: 'Revenue (LKR)',
                data: revenue?.data ?? [],
                borderColor: '#22c55e',
                backgroundColor: 'rgba(34, 197, 94, 0.18)',
                tension: 0.45,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
        ],
    }), [revenue]);

    return (
        <section className="space-y-8 animate-in fade-in duration-300">
            {/* Header */}
            <header className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    Reports & Analytics
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    A clear view of system performance
                </p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Total Revenue"
                    value={`LKR ${Number(reports?.stats?.totalRevenue || 0).toLocaleString()}`}
                    trend="Live"
                    icon={<span className="text-xl opacity-80">$</span>}
                />
                <StatCard
                    label="Active Bookings"
                    value={reports?.stats?.activeCheckins || 0}
                    icon={<span className="text-xl opacity-80">✓</span>}
                />
                <StatCard
                    label="New Signups (30d)"
                    value={reports?.stats?.newSignups || 0}
                    trend="Monthly"
                    icon={<span className="text-xl opacity-80">+</span>}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <ElegantCard title="Attendance (Last 7 Days)">
                    <Bar data={attendanceData} options={elegantChartOptions} />
                </ElegantCard>

                <ElegantCard title="Revenue Growth (Last 6 Months)">
                    <Line data={revenueData} options={elegantChartOptions} />
                </ElegantCard>
            </div>
        </section>
    );
};

/* ---------------- Elegant Card Wrapper ---------------- */
const ElegantCard = ({ title, children }) => (
    <div className="
        relative h-80 rounded-3xl
        bg-white/70 dark:bg-zinc-900/70
        backdrop-blur-xl
        shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]
        border border-gray-200/60 dark:border-zinc-800/60
        p-7 transition-all
        hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]
    ">
        <h3 className="text-base font-medium mb-4 text-gray-800 dark:text-gray-100">
            {title}
        </h3>
        <div className="h-60">{children}</div>
    </div>
);

export default Reports;


