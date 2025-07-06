'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FiAlertTriangle } from 'react-icons/fi';
import ElectionCard from './ElectionCard';
import { electionData, sponsoredCandidates, pollingStations, electionTypes } from '../../data/electionData';
import ElectionDetail from './ElectionDetail'; 

// Helper to map status
function mapStatus(status: string): 'Active' | 'Ended' | 'Upcoming' {
  if (status === 'ACTIVE') return 'Active';
  if (status === 'ENDED') return 'Ended';
  return 'Upcoming';
}

export default function Elections() {
  const { isConnected } = useAccount();
  const [currentPage] = useState(0);
  const [searchParams, setSearchParams] = useState({
    electionType: '',
    dateOfElection: '',
    pollingStation: ''
  });
  const [selectedElectionId, setSelectedElectionId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {},
      { threshold: 0.1 }
    );

    const sponsoredSection = document.querySelector('.sponsored-section');
    if (sponsoredSection) {
      observer.observe(sponsoredSection);
    }

    return () => {
      if (sponsoredSection) {
        observer.unobserve(sponsoredSection);
      }
    };
  }, []);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50 rounded-xl">
        <FiAlertTriangle className="w-16 h-16 text-yellow-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          To view and participate in elections, you need to connect your Web3
          wallet. This ensures a secure and transparent voting process.
        </p>
        <ConnectButton />
      </div>
    );
  }

  if (selectedElectionId) {
    return <ElectionDetail electionId={selectedElectionId} onBack={() => setSelectedElectionId(null)} />;
  }

  return (
    <div className="flex flex-col space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sponsored Ads Section */}
      <section className="sponsored-section pt-4 overflow-hidden">
        <h5 className="text-sm text-gray-600 font-medium mb-6">Sponsored Ads</h5>
        <div className="relative whitespace-nowrap">
          <motion.div
            className="gap-4 inline-flex"
            animate={{
              x: ["-100%", "0%"],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            {[...sponsoredCandidates, ...sponsoredCandidates].map((candidate, index) => (
              <div
                key={index}
                className="flex-none w-32 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative w-full aspect-[4/3] mb-3">
                  <Image
                    src={candidate.image}
                    alt={candidate.name}
                    className="rounded-lg object-cover"
                    fill
                    sizes="256px"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[8px] text-gray-600">{candidate.position}</p>
                  <h3 className="text-[9px] text-gray-600 mt-1">{candidate.name}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Current Elections Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {electionData.slice(currentPage * 3, (currentPage + 1) * 3).map((election) => (
          <ElectionCard
            key={election.id}
            title={election.type}
            description={`Polling Station: ${election.pollingStation}`}
            bannerUrl={election.candidate.image}
            openDate={new Date().toISOString()} // Replace with actual open date if available
            endDate={new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString()} // Example: 2 hours from now
            status={mapStatus(election.status)}
            onViewDetails={() => setSelectedElectionId(election.id)}
          />
        ))}
      </section>

      {/* Search Section */}
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-base font-medium text-gray-900 mb-6">Search Election Updates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchParams.electionType}
            onChange={(e) => setSearchParams({ ...searchParams, electionType: e.target.value })}
          >
            <option value="">Select Election Type</option>
            {electionTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchParams.dateOfElection}
            onChange={(e) => setSearchParams({ ...searchParams, dateOfElection: e.target.value })}
          />
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchParams.pollingStation}
            onChange={(e) => setSearchParams({ ...searchParams, pollingStation: e.target.value })}
          >
            <option value="">Select Polling Station</option>
            {pollingStations.map((station, index) => (
              <option key={index} value={station}>{station}</option>
            ))}
          </select>
        </div>

        {/* Election Updates Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-100">
                <th className="pb-3 text-sm font-medium text-gray-600">Election Type</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Polling Station</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Date of Election</th>
                <th className="pb-3 text-sm font-medium text-gray-600">Start Time</th>
                <th className="pb-3 text-sm font-medium text-gray-600">End Time</th>
                <th className="pb-3 text-sm font-medium text-gray-600">STATUS</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {electionData.map((election, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 text-gray-400 text-sm">{election.type}</td>
                  <td className="py-4 text-gray-400 text-sm">{election.pollingStation}</td>
                  <td className="py-4 text-gray-400 text-sm">{election.date}</td>
                  <td className="py-4 text-gray-400 text-sm">{election.startTime}</td>
                  <td className="py-4 text-gray-400 text-sm">{election.endTime}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${election.status === 'ENDED' ? 'bg-green-50 text-green-700' :
                      election.status === 'PENDING' ? 'bg-red-50 text-red-700' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                      {election.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-blue-500 text-sm hover:text-blue-600 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-100">
        2025 © All Rights Reserved
      </footer>
    </div>
  );
}
