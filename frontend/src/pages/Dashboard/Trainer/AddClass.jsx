import React, { useState } from 'react';
import api from '../../../helpers/api';

/**
 * AddClass – Modern UI
 * Trainers can schedule new classes with a premium experience
 */
const AddClass = ({ onClassAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Fitness',
        duration: 60,
        date: '',
        time: '',
        price: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            await api.post('/classes/create', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            onClassAdded?.();
            setFormData({
                name: '',
                type: 'Fitness',
                duration: 60,
                date: '',
                time: '',
                price: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to create class');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative max-w-3xl mx-auto">
            {/* Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-orange-400/20 to-pink-500/20 blur-2xl rounded-3xl" />

            <div className="
                relative
                bg-white dark:bg-zinc-900
                rounded-3xl
                shadow-2xl
                p-10
                animate-in fade-in slide-in-from-bottom-6 duration-300
            ">
                {/* Header */}
                <header className="mb-10">
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
                        Schedule a New Class
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
                        Set up your class schedule and make it available to members instantly.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1 */}
                    <Section title="Class Details">
                        <Field label="Class Name">
                            <Input
                                name="name"
                                placeholder="Power Lifting 101"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field label="Class Type">
                            <Select name="type" value={formData.type} onChange={handleChange}>
                                {['Yoga', 'Fitness', 'HIIT', 'Pilates', 'CrossFit', 'Zumba'].map(t => (
                                    <option key={t}>{t}</option>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Duration (minutes)">
                            <Input
                                name="duration"
                                type="number"
                                min="1"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                            />
                        </Field>
                    </Section>

                    {/* Section 2 */}
                    <Section title="Schedule">
                        <Field label="Date">
                            <Input
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field label="Time">
                            <Input
                                name="time"
                                type="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />
                        </Field>

                        <Field label="Price (LKR)">
                            <Input
                                name="price"
                                type="number"
                                min="0"
                                placeholder="1500"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </Field>
                    </Section>

                    {error && (
                        <p className="text-center text-sm text-red-500">{error}</p>
                    )}

                    <button
                        disabled={loading}
                        className="
                            w-full py-4 rounded-2xl
                            bg-gradient-to-r from-red-600 to-red-500
                            hover:from-red-700 hover:to-red-600
                            text-white font-semibold text-lg
                            shadow-xl shadow-red-600/30
                            transition-all
                            disabled:opacity-60
                        "
                    >
                        {loading ? 'Publishing Class...' : 'Publish Class'}
                    </button>
                </form>
            </div>
        </section>
    );
};

/* -------------------- UI Components -------------------- */

const Section = ({ title, children }) => (
    <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {title}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {children}
        </div>
    </div>
);

const Field = ({ label, children }) => (
    <div className="flex flex-col gap-1 sm:col-span-1">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
        </label>
        {children}
    </div>
);

const baseInput = `
    w-full px-4 py-3 rounded-xl
    bg-gray-50 dark:bg-zinc-950
    text-gray-900 dark:text-white
    border border-gray-200 dark:border-zinc-800
    focus:outline-none focus:ring-2 focus:ring-red-600/40
    transition
`;

const Input = (props) => <input {...props} className={baseInput} />;
const Select = ({ children, ...props }) => (
    <select {...props} className={baseInput}>{children}</select>
);

export default AddClass;
