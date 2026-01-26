import React from 'react';
import { Trophy, Star, Target, Lock, CheckCircle } from 'lucide-react';

const Achievements = () => {
  const stats = [
    { label: 'Total Points', value: '250', icon: Star, color: 'text-yellow-500' },
    { label: 'Badges Won', value: '12', icon: Trophy, color: 'text-blue-500' },
    { label: 'Rank', value: 'Gold', icon: Target, color: 'text-purple-500' },
  ];

  const badges = [
    { id: 1, title: 'Early Bird', desc: 'Invite five friends', earned: true, date: 'Jan 2026' },
    { id: 2, title: 'Top Contributor', desc: 'Posted 50+ helpful comments', earned: true, date: 'June 2026' },
    { id: 3, title: 'Century Club', desc: 'Attended 100 virtual events', earned: false, progress: 75 },
    
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Achievements</h1>
        <p className="text-gray-600">Track your progress and unlock new rewards.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Badges Grid */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Milestones & Badges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className={`relative p-6 rounded-2xl border-2 transition-all ${
              badge.earned ? 'bg-white border-green-100 shadow-md' : 'bg-gray-100 border-transparent opacity-75'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`mb-4 p-4 rounded-full ${badge.earned ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                {badge.earned ? <CheckCircle size={40} /> : <Lock size={40} />}
              </div>
              
              <h3 className="font-bold text-gray-900">{badge.title}</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">{badge.desc}</p>

              {badge.earned ? (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Unlocked {badge.date}
                </span>
              ) : (
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{badge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${badge.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;