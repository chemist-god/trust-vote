import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Election } from '@/types/election';

interface Props {
  election: Election;
  index: number;
}

export const ElectionCard: React.FC<Props> = ({ election, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl p-6 shadow-sm"
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-base font-medium text-gray-900">{election.type}</h3>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
        Upcoming
      </span>
    </div>
    <div className="flex items-center space-x-4">
      <Image
        src={election.candidate.image}
        alt={election.candidate.name}
        className="w-12 h-12 rounded-full object-cover"
        width={48}
        height={48}
      />
      <div>
        <p className="text-sm font-medium text-gray-900">{election.candidate.name}</p>
        <button className="mt-2 px-4 py-1 bg-pink-50 text-pink-500 rounded-full text-xs font-medium hover:bg-pink-100 transition-colors">
          VOTE
        </button>
      </div>
    </div>
  </motion.div>
);