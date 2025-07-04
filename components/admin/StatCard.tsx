'use client'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendPeriod: string;
  chartData: { value: number }[];
  chartColor: string;
}

export default function StatCard({ title, value, trend, trendPeriod, chartData, chartColor }: StatCardProps) {
  const isPositive = trend.startsWith('+');
  const trendValue = trend.substring(1);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
        <div className="flex items-center gap-1 mt-2">
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trendValue}
          </span>
          <span className="text-sm text-slate-400">{trendPeriod}</span>
        </div>
      </div>
      <div className="w-24 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <YAxis hide domain={['dataMin', 'dataMax']} />
            <Line type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}