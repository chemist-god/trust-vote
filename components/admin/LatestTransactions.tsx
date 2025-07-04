import React from 'react';
const transactions = [
    { id: '#MB2540', agent: 'SRC Election', start_time: '07 Oct, 2024', end_time: '20 oct, 2024', status: 'Pending' },
    { id: '#MB2541', agent: 'Staff Voting', start_time: '07 Oct, 2024', end_time: '20 oct, 2024', status: 'ended' },
    { id: '#MB2542', agent: 'Course Rep', start_time: '07 Oct, 2024', end_time: '20 oct, 2024', status: 'ended' },
    { id: '#MB2543', agent: 'ACS Voting', start_time: '20 Jun, 2025', end_time: '20 Jul, 2025', status: 'active'},
    { id: '#MB2544', agent: 'TechBiz', start_time: '07 Oct, 2024', end_time: '20 oct, 2024', status: 'ended'},
];

const statusStyles: { [key: string]: string } = {
    active: 'bg-green-100 text-green-700',
    ended: 'bg-red-100 text-red-700',
    Pending: 'bg-yellow-100 text-yellow-700',
};

export default function LatestTransactions() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                <h3 className="text-lg font-semibold text-slate-800">Election Updates</h3>
                <div className="flex flex-wrap items-center gap-2">
                    <select className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option>Election Id</option>
                    </select>
                    <select className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option>Select Date</option>
                    </select>
                    <select className="text-sm border border-slate-200 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option>Select Election Type</option>
                    </select>
                    <button className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700">View Details</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 font-medium"><input type="checkbox" className="rounded" /></th>
                            <th className="px-6 py-3 font-medium">Election ID</th>
                            <th className="px-6 py-3 font-medium">Eleciton Type</th>
                            <th className="px-6 py-3 font-medium">Start Time</th>
                            <th className="px-6 py-3 font-medium">end Time</th>
                            <th className="px-6 py-3 font-medium">Poll Status</th>
                            <th className="px-6 py-3 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                                <td className="px-6 py-4 font-mono text-slate-700">{tx.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{tx.agent}</td>
                                <td className="px-6 py-4 text-slate-500">{tx.start_time}</td>
                                <td className="px-6 py-4 text-slate-500">{tx.end_time}</td>
                                
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[tx.status]}`}>
                                        {tx.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="font-medium text-white bg-blue-600 px-3 py-1.5 text-xs rounded-md hover:bg-blue-700">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}