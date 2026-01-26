import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-200 p-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        <span className="text-black">About</span> <span className="text-red-600">Supreme Fitness</span>
      </h2>

      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        Welcome to <span className="font-semibold text-black">Supreme Fitness</span> — your destination for strength,
        stamina, and community wellness in the Elpitiya region of Sri Lanka. Our mission is to help every member
        reach their fitness goals with personalized training, supportive staff, and a motivating environment. Whether
        you’re just starting your fitness journey or looking to elevate your performance, we’re here to support you
        every step of the way.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-bold text-black mb-2">World-Class Equipment</h3>
          <p className="text-gray-600 text-sm">
            Fully equipped gym floor with cardio machines, strength training, free weights, and functional gear to suit
            every workout style.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-bold text-black mb-2">Expert Trainers</h3>
          <p className="text-gray-600 text-sm">
            Certified trainers ready to guide you with personalized plans, technique support, and motivation tailored
            to your goals.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-bold text-black mb-2">Community & Support</h3>
          <p className="text-gray-600 text-sm">
            A welcoming community atmosphere with fellow fitness enthusiasts to keep you inspired and consistent.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl">
        <h3 className="text-2xl font-semibold text-black mb-3">Location & Hours</h3>
        <p className="text-gray-800 text-md mb-2">
          📍 Located at: Ambalangoda Road, Kurundugahahetekma, Sri Lanka
        </p>
        <p className="text-gray-700 text-md">
          🕐 Open Daily: Early morning to late evening — perfect for any schedule.
        </p>
      </div>
    </div>
  );
}
