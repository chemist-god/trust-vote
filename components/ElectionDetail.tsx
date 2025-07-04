'use client';
import React from 'react';
import { electionData } from '../data/electionData';
import Image from 'next/image';
import { FiArrowLeft, FiCheckCircle, FiBookmark, FiInfo, FiAward, FiLock } from 'react-icons/fi';

interface ElectionDetailProps {
  electionId: string;
  onBack: () => void;
}

// Mock candidates for display purposes
const mockCandidates = [
  {
    name: 'Alice Williams',
    position: 'Computer Science',
    image: '/assets/candidate1.png',
  },
  {
    name: 'Robert Johnson',
    position: 'Computer Science',
    image: '/assets/candidate2.png',
  },
  {
    name: 'Emily Brown',
    position: 'Computer Science',
    image: '/assets/candidate6.png',
  },
  {
    name: 'Michael Davis',
    position: 'Computer Science',
    image: '/assets/candidate4.png',
  },
];

const ElectionDetail: React.FC<ElectionDetailProps> = ({ electionId, onBack }) => {
  const election = electionData.find((e) => e.id === electionId);

  if (!election) {
    return <div>Election not found</div>;
  }

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
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{election.type}</h1>
        <p className="text-gray-500 mt-2">{election.date}</p>
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
            <p className="text-gray-600 mb-6">Election for the position of {election.type}. Vote for the candidate of your choice.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Display multiple candidates */}
              {mockCandidates.map((candidate, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-lg font-bold">{candidate.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{candidate.position}</p>
                  {/* <button className="w-full py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 text-sm mb-2">
                    Manifesto
                  </button> */}
                  <button
                    className={`w-full py-2 px-4 rounded-lg text-white font-semibold text-sm transition-colors ${isLive ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}>
                    Vote
                  </button>
                </div>
              ))}
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