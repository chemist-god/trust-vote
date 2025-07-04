"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ElectionCardProps {
  title: string;
  description: string;
  bannerUrl?: string;
  openDate: string; // ISO string
  endDate: string; // ISO string
  status: 'Active' | 'Ended' | 'Upcoming';
  onViewDetails?: () => void;
}

function getTimeLeft(endDate: string) {
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  let diff = Math.max(0, end - now);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

const ElectionCard: React.FC<ElectionCardProps> = ({
  title,
  description,
  bannerUrl,
  openDate,
  endDate,
  status,
  onViewDetails,
}) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="max-w-xs w-full bg-white rounded-2xl shadow p-0 overflow-hidden flex flex-col border border-gray-100">
      {/* Banner */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt="Election banner"
            fill
            className="object-cover"
          />
        ) : (
          <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8M12 8v8" />
          </svg>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col p-5 pb-3">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>Opens: {new Date(openDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Ends In {timeLeft}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status === 'Active' ? 'bg-green-50 text-green-600 border-green-200' :
            status === 'Ended' ? 'bg-gray-100 text-gray-500 border-gray-200' :
              'bg-yellow-50 text-yellow-700 border-yellow-200'
            }`}>
            {status}
          </span>
          <button
            className="text-xs text-gray-500 hover:underline font-medium"
            onClick={onViewDetails}
            type="button"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionCard;