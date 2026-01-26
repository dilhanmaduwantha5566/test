// File: src/pages/Plans.jsx
import Navbar from "../components/Navbar";
import React from "react";

export default function Plans() {
  const plans = [
    { id: 1, name: "1 Month", price: "5,000", desc: "Standard monthly access" },
    { id: 2, name: "6 Months", price: "25,000", desc: "Save ~16% on half-yearly" },
    { id: 3, name: "12 Months", price: "45,000", desc: "Best value! Save ~25%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Membership Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all"
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{plan.name}</h3>
            <p className="text-gray-500 dark:text-zinc-400 mb-4">{plan.desc}</p>
            <p className="text-3xl font-extrabold text-purple-600 mb-4">
              LKR {plan.price}
            </p>
            <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
              Join Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
