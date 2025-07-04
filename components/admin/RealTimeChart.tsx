'use client';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaArrowDown, FaArrowUp, FaMinus } from 'react-icons/fa';

const chartData = [
  { candidate: 'A', points: 28 },
  { candidate: 'B', points: 55 },
  { candidate: 'C', points: 42 },
  { candidate: 'D', points: 78 },
  { candidate: 'E', points: 60 },
  { candidate: 'F', points: 48 },
  { candidate: 'G', points: 70 },
  { candidate: 'H', points: 58 },
  { candidate: 'I', points: 85 },
  { candidate: 'J', points: 65 },
  { candidate: 'K', points: 75 },
  { candidate: 'L', points: 92 },
];

const trendIndicators = [
  { label: 'Steep slop', color: 'bg-green-500' },
  { label: 'Failing', color: 'bg-red-500' },
  { label: 'Flat', color: 'bg-gray-500' },
  { label: 'Rising', color: 'bg-blue-500' },
  { label: 'Gentle', color: 'bg-yellow-500' },
]

export default function RealTimeChart() {
  const [timeRange, setTimeRange] = useState('Yearly');
  const [sortTrend, setSortTrend] = useState('Hourly');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Real-Time Election Metrics</h3>
          <div className="flex items-center flex-wrap gap-4 md:gap-6 mt-2 text-slate-500 text-sm">
            <span><span className="font-bold text-slate-800">2,341</span> Ballots</span>
            <span><span className="font-bold text-slate-800">538</span> Votes</span>
            <span><span className="font-bold text-slate-800">3.6%</span> Turnout Ratio</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Sort By:</span>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="text-sm border border-slate-200 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Yearly</option>
            <option>Monthly</option>
            <option>Daily</option>
          </select>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            <XAxis dataKey="candidate" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0',
                padding: '8px 12px'
              }}
            />
            <Area type="monotone" dataKey="points" stroke="#8884d8" strokeWidth={2} fillOpacity={1} fill="url(#colorPoints)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1"><FaArrowUp className="text-green-500" /> Steep</div>
          <div className="flex items-center gap-1"><FaArrowDown className="text-red-500" /> Rising</div>
          <div className="flex items-center gap-1"><FaMinus className="text-yellow-500" /> Gentle</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-blue-50 text-blue-800 p-3 rounded-lg flex-grow sm:flex-grow-0">
            <h4 className="font-semibold text-sm">Enhance your Campaign for better outreach</h4>
            <button className="text-xs font-medium bg-blue-600 text-white px-3 py-1 rounded-md mt-1 hover:bg-blue-700">Upgrade Account</button>
          </div>
          <div className="border rounded-lg p-3 w-full sm:w-auto">
            <div className="flex justify-between items-center mb-2">
              <h5 className="text-sm font-semibold">Trend Indicator</h5>
              <select value={sortTrend} onChange={(e) => setSortTrend(e.target.value)} className="text-xs border border-slate-200 rounded-md px-1 py-0.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Hourly</option>
                <option>Daily</option>
              </select>
            </div>
            <div className="space-y-2">
              {trendIndicators.map(indicator => (
                <div key={indicator.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${indicator.color}`}></div>{indicator.label}</span>
                  <div className="h-1 w-20 bg-gray-200 rounded-full"><div className={`${indicator.color} h-1 rounded-full`} style={{ width: `${Math.floor(Math.random() * (90 - 30 + 1)) + 30}%` }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}