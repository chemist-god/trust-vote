'use client'
import dynamic from 'next/dynamic';
import StatCard from './StatCard';
import ActivityFeed from './ActivityFeed';

const RealTimeChart = dynamic(() => import('./RealTimeChart'), {
  ssr: false,
  loading: () => <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center"><p className="text-slate-400">Loading chart...</p></div>
});
const LatestTransactions = dynamic(() => import('./LatestTransactions'), {
  ssr: false,
  loading: () => <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center"><p className="text-slate-400">Loading transactions...</p></div>
});

const statData = [
  {
    title: "Total Votes Cast",
    value: "7,093,746",
    trend: "+5.66%",
    trendPeriod: "since last 24hrs",
    chartData: [{ value: 10 }, { value: 40 }, { value: 20 }, { value: 80 }, { value: 50 }],
    chartColor: "#3b82f6"
  },
  {
    title: "Registered Voters",
    value: "45,648",
    trend: "-0.83%",
    trendPeriod: "since last week",
    chartData: [{ value: 50 }, { value: 20 }, { value: 60 }, { value: 30 }, { value: 70 }],
    chartColor: "#10b981"
  },
  {
    title: "Voter Turnout",
    value: "56.43%",
    trend: "+5.64%",
    trendPeriod: "since last week",
    chartData: [{ value: 20 }, { value: 50 }, { value: 30 }, { value: 90 }, { value: 40 }],
    chartColor: "#f97316"
  },
  {
    title: "Active Candidates",
    value: "24",
    trend: "+2",
    trendPeriod: "this election",
    chartData: [{ value: 60 }, { value: 30 }, { value: 70 }, { value: 40 }, { value: 80 }],
    chartColor: "#8b5cf6"
  }
]


export default function VotingStatus() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
        <p className="mt-1 text-slate-500">Real-time overview of the election process.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statData.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RealTimeChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
      <LatestTransactions />
    </div>
  );
}