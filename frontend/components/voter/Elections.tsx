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
        <h2 className="text-xl font-bold mb-4">Current Elections</h2>
        {isLoading ? (
          <div className="text-center py-12">Loading elections...</div>
        ) : elections.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No elections found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {elections.map((election) => (
              <ElectionCard
                key={election.id}
                title={election.name}
                description={election.description}
                bannerUrl={election.bannerUrl}
                openDate={election.startDate}
                endDate={election.endDate}
                status={election.status === 'ACTIVE' ? 'Active' : election.status === 'ENDED' ? 'Ended' : 'Upcoming'}
                onViewDetails={() => setSelectedElectionId(election.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-4 border-t border-gray-100">
        2025 © All Rights Reserved
      </footer>
    </div>
  );
}
