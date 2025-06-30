'use client';
import { FaVoteYea, FaUsers, FaChartBar } from 'react-icons/fa';

const activities = [
  {
    icon: FaVoteYea,
    title: "Voting Progress",
    description: "Track your  voting statistics",
    action: "Open",
  },
  {
    icon: FaUsers,
    title: "Voter Engagement",
    description: "Monitor voter participation and feedback",
    action: "Open",
  },
  {
    icon: FaChartBar,
    title: "Analytics Dashboard",
    description: "View detailed campaign analytics",
    action: "Open",
  },
];

const RecentActivities = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <activity.icon className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.title}</h3>
            <p className="text-gray-500 mb-4">{activity.description}</p>
            <button className="text-blue-600 font-medium hover:text-blue-700">
              {activity.action} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;