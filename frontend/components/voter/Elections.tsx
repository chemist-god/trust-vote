'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FiAlertTriangle } from 'react-icons/fi';
import ElectionCard from './ElectionCard';
import ElectionDetail from './ElectionDetail';

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

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-2xl shadow p-0 overflow-hidden flex flex-col border border-gray-100 min-h-[320px]">
    <div className="w-full h-48 bg-gray-200" />
    <div className="flex-1 flex flex-col p-5 pb-3">
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-full mb-4" />
      <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
      <div className="flex gap-2 mt-2">
        <div className="h-6 w-20 bg-gray-100 rounded-full" />
        <div className="h-6 w-20 bg-gray-100 rounded-full" />
      </div>
    </div>
  </div>
);

export default function Elections() {
  const { isConnected } = useAccount();
  const [elections, setElections] = useState<Election[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedElectionId, setSelectedElectionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchElections = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/elections');
        const data = await res.json();
        setElections(data.elections || []);
      } catch (err) {
        setElections([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchElections();
  }, []);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50 rounded-xl min-h-[60vh]">
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
    const selectedElection = elections.find(e => e.id === selectedElectionId);
    return selectedElection ? (
      <ElectionDetail election={selectedElection} onBack={() => setSelectedElectionId(null)} />
    ) : (
      <div>Election not found</div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="pt-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">Current Elections</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : elections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <svg className="w-16 h-16 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8M12 8v8" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No elections found</h3>
            <p className="text-gray-500 mb-4">Elections created by the admin will appear here. Please check back later.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
          >
            {elections.map((election) => (
              <motion.div
                key={election.id}
                whileHover={{ scale: 1.025, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ElectionCard
                  title={election.name}
                  description={election.description}
                  bannerUrl={election.bannerUrl}
                  openDate={election.startDate}
                  endDate={election.endDate}
                  status={election.status === 'ACTIVE' ? 'Active' : election.status === 'ENDED' ? 'Ended' : 'Upcoming'}
                  onViewDetails={() => setSelectedElectionId(election.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-100">
        2025 © All Rights Reserved
      </footer>
    </div>
  );
}
