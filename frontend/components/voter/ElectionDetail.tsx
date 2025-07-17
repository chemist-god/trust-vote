'use client';
import React from 'react';
import Image from 'next/image';
import { FiArrowLeft, FiCheckCircle, FiBookmark, FiInfo, FiAward, FiLock } from 'react-icons/fi';

interface Election {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  bannerUrl?: string;
  status: 'ACTIVE' | 'UPCOMING' | 'ENDED';
  createdBy: string;
}

interface ElectionDetailProps {
  election: Election;
  onBack: () => void;
}

const ElectionDetail: React.FC<ElectionDetailProps> = ({ election, onBack }) => {
  const isLive = election.status === 'ACTIVE';

  const voterStatus = [
    { icon: <FiCheckCircle />, label: 'SBT Issued', status: 'Issued', color: 'text-green-500' },
    { icon: <FiBookmark />, label: 'Voting Ticket', status: 'Available', color: 'text-green-500' },
    { icon: <FiInfo />, label: 'Vote', status: 'Pending', color: 'text-yellow-500' },
    { icon: <FiLock />, label: 'Merkle Proof', status: 'Not available', color: 'text-gray-400' },
    { icon: <FiAward />, label: 'POAP', status: 'Not available', color: 'text-gray-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
        <FiArrowLeft className="mr-2" />
        Back to Elections
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{election.name}</h1>
        <p className="text-gray-500 mt-2">{new Date(election.startDate).toLocaleDateString()}</p>
        <span
          className={`mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-medium ${isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {isLive ? 'Ongoing' : election.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Candidates */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">Approved Candidates</h2>
            <p className="text-gray-600 mb-6">No candidates yet. (To be implemented)</p>
            {/* Placeholder for candidate list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center text-gray-400">
                No candidates available.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Voter Status */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-xl mb-4">Voter Status</h3>
            <ul className="space-y-4">
              {voterStatus.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <span className={`mr-3 ${item.color}`}>{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <span className="text-gray-500 font-medium">{item.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionDetail;