'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import CreateElectionForm from '@/components/admin/CreateElectionForm';

interface Election {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  bannerUrl?: string;
  status: 'ACTIVE' | 'UPCOMING' | 'ENDED';
  createdBy: string;
}

export default function AdminElectionsPage() {
  const [elections, setElections] = useState<Election[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const fetchElections = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/elections');
      if (!response.ok) {
        throw new Error('Failed to fetch elections');
      }
      const data = await response.json();
      setElections(data.elections || []);
    } catch (error) {
      console.error('Error fetching elections:', error);
      toast.error('Failed to load elections');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const handleElectionCreated = () => {
    fetchElections();
    setShowCreateForm(false);
  };

  const filteredElections = elections.filter(election =>
    election.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    election.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-800';
      case 'ENDED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Elections</h1>
          <p className="text-gray-600">Manage and monitor all elections</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search elections..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <FiPlus className="h-5 w-5" />
            New Election
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredElections.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No elections found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new election.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                  New Election
                </button>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredElections.map((election) => (
                <motion.li
                  key={election.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/admin/elections/${election.id}`)}
                >
                  <div className="px-6 py-4 flex items-center">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {election.name}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(election.status)}`}>
                            {election.status}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {election.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <span className="font-medium">Starts:</span>
                          <span className="ml-1">{formatDate(election.startDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">Ends:</span>
                          <span className="ml-1">{formatDate(election.endDate)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showCreateForm && (
        <CreateElectionForm
          onClose={() => setShowCreateForm(false)}
          onElectionCreated={handleElectionCreated}
        />
      )}
    </div>
  );
}
