'use client';
import React from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { FaUsers, FaChartLine, FaMapMarkerAlt, FaVoteYea, FaEye, FaShareAlt, FaComments } from 'react-icons/fa';

const Analytics = () => {
  // Sample data - Replace with real data from  backend
  const votingTrendData = [
    { name: 'Week 1', votes: 400 },
    { name: 'Week 2', votes: 650 },
    { name: 'Week 3', votes: 900 },
    { name: 'Week 4', votes: 1200 },
  ];

  const demographicData = [
    { name: '18-24', value: 30 },
    { name: '25-34', value: 40 },
    { name: '35-44', value: 15 },
    { name: '45+', value: 15 },
  ];

  const locationData = [
    { name: 'North Campus', votes: 850 },
    { name: 'South Campus', votes: 720 },
    { name: 'East Campus', votes: 640 },
    { name: 'West Campus', votes: 780 },
  ];

  const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];
  const CHART_GRADIENT = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    background: '#EEF2FF'
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Voters', 
            value: '2,945', 
            change: '+12.5%',
            icon: <FaUsers className="w-6 h-6 text-blue-500" />
          },
          { 
            title: 'Engagement Rate', 
            value: '68.2%', 
            change: '+5.4%',
            icon: <FaChartLine className="w-6 h-6 text-green-500" />
          },
          { 
            title: 'Campus Coverage', 
            value: '4/4', 
            change: '100%',
            icon: <FaMapMarkerAlt className="w-6 h-6 text-purple-500" />
          },
          { 
            title: 'Votes Received', 
            value: '1,847', 
            change: '+254',
            icon: <FaVoteYea className="w-6 h-6 text-orange-500" />
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Voting Trends */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Voting Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={votingTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="votes" 
                stroke="#6366F1" 
                strokeWidth={2}
                dot={{ fill: '#6366F1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographic Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Voter Demographics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Campus Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votes" fill="#6366F1">
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Enhanced Campaign Performance Metrics */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Campaign Performance</h2>
            <p className="text-sm text-gray-500 mt-1">Key engagement metrics</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              label: 'Manifesto Views',
              value: '1,234',
              change: '+15%',
              icon: <FaEye className="w-8 h-8 text-indigo-500" />,
              trend: 'up'
            },
            { 
              label: 'Social Engagement',
              value: '856',
              change: '+23%',
              icon: <FaShareAlt className="w-8 h-8 text-green-500" />,
              trend: 'up'
            },
            { 
              label: 'Support Messages',
              value: '432',
              change: '+8%',
              icon: <FaComments className="w-8 h-8 text-amber-500" />,
              trend: 'up'
            }
          ].map((metric, index) => (
            <div 
              key={index} 
              className="relative p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                {metric.icon}
                <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h4>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;