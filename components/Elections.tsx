import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ElectionCard from './ElectionCard';
import { Candidate, Election } from '../types/election';

const sponsoredCandidates: Candidate[] = [
  {
    name: 'George Denis Mavo',
    position: 'SRC PRESIDENT (Hopeful)',
    image: '/assets/candidate1.png',
    flag: '/assets/flag1.png',
    votes: 23,
    percentage: 23.67
  },
  {
    name: 'Sarah Ann Wilson',
    position: 'GENERAL SECRETARY (Hopeful)',
    image: '/assets/candidate2.png',
    flag: '/assets/flag2.png',
    votes: 45,
    percentage: 33.57
  },
  {
    name: 'Paul Simon Avera',
    position: 'SRC PRESIDENT (Hopeful)',
    image: '/assets/candidate6.png',
    flag: '/assets/flag3.png',
    votes: 17,
    percentage: 17.89
  },
  {
    name: 'John Van Pelt',
    position: 'SRC TREASURER (Hopeful)',
    image: '/assets/candidate4.png',
    flag: '/assets/flag4.png',
    votes: 64,
    percentage: 84.34
  }
];

const electionData: Election[] = [
  {
    type: 'GCTU GENERAL SRC ELECTIONS',
    date: '07 Oct, 2023',
    startTime: '8:00 AM',
    endTime: '5:00 PM',
    status: 'ENDED',
    pollingStation: 'Main Campus',
    candidate: {
      name: 'Robert Mercer',
      image: '/assets/flyer.jpg'
    }
  },
  {
    type: 'BSC COMPUTER SCIENCE COURSE REP ELECTION (GROUP A)',
    date: '14 Oct, 2023',
    startTime: '9:00 AM',
    endTime: '4:00 PM',
    status: 'ACTIVE',
    pollingStation: 'Main Campus',
    candidate: {
      name: 'Sarah Wilson',
      image: '/assets/campaign.jpeg'
    }
  },
  {
    type: 'GESA GENERAL ELECTIONS',
    date: '07 Oct, 2023',
    startTime: '8:00 AM',
    endTime: '5:00 PM',
    status: 'PENDING',
    pollingStation: 'Main Campus',
    candidate: {
      name: 'Robert Mercer',
      image: '/assets/election.jpeg'
    }
  }
];

const pollingStations = ['Main Campus', 'Science Block', 'Engineering Block', 'Business School'];
const electionTypes = ['SRC Elections', 'Department Elections', 'Course Rep Elections'];

// Helper to map status
function mapStatus(status: string): 'Active' | 'Ended' | 'Upcoming' {
  if (status === 'ACTIVE') return 'Active';
  if (status === 'ENDED') return 'Ended';
  return 'Upcoming';
}

export default function Elections() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage] = useState(0);
  const [searchParams, setSearchParams] = useState({
    electionType: '',
    dateOfElection: '',
    pollingStation: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
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

  return (
    <div className="flex flex-col space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Sponsored Ads Section */}
      <section className="sponsored-section pt-4">
        <h5 className="text-sm text-gray-600 font-medium mb-6">Sponsored Ads</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sponsoredCandidates.map((candidate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative w-full aspect-square mb-3">
                <div className="absolute top-2 left-2 z-10">
                  <Image
                    src={candidate.flag || ''}
                    alt="Country flag"
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="absolute top-2 right-2 z-10 bg-blue-400 px-2 py-0.5 rounded-full text-xs">
                  {candidate.percentage?.toFixed(1) || 0}%
                </div>
                <div className="relative h-full w-full">
                  <Image
                    src={candidate.image}
                    alt={candidate.name}
                    className="rounded-lg object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600">{candidate.position}</p>
                <h3 className="text-sm font-medium mt-1">{candidate.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Current Elections Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {electionData.slice(currentPage * 2, (currentPage + 1) * 2).map((election, index) => (
          <ElectionCard
            key={index}
            title={election.type}
            description={`Polling Station: ${election.pollingStation}`}
            bannerUrl={election.candidate.image}
            openDate={new Date().toISOString()} // Replace with actual open date if available
            endDate={new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString()} // Example: 2 hours from now
            status={mapStatus(election.status)}
            onViewDetails={() => { }}
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

///display poster