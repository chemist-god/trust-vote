'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type CategoryType = 'DeFi' | 'Wallet' | 'Gaming' | 'Loyalty' | 'Social';

const content: Record<CategoryType, { image: string; logo: string; quote: string }> = {
  DeFi: {
    image: '/assets/safe-modal.png',
    logo: '/assets/safe-logo.png',
    quote: 'Security is non-negotiable and wallets designed to be intuitive for projects was what we needed.',
  },
  Wallet: {
    image: '/assets/modal.png',
    logo: '/assets/Skymavis.svg',
    quote: '97% of our new users created their wallets with social logins instead of seed phrases.',
  },
  Gaming: {
    image: '/assets/chess-modal.png',
    logo: '/assets/chess-logo.png',
    quote: 'We brought our existing chess.com identity seamlessly to mint and create NFTs.',
  },
  Loyalty: {
    image: '/assets/fox-modal.png',
    logo: '/assets/fox-logo.png',
    quote: 'Web3Auth empowered us to own the end-to-end user experience and first-party data beyond NFTs.',
  },
  Social: {
    image: '/assets/fantv-modal.png',
    logo: '/assets/fantv-logo.png',
    quote: 'On launch, we were able to onboard 100,000 users seamlessly.',
  },
};

const tabs: CategoryType[] = ['DeFi', 'Wallet', 'Gaming', 'Loyalty', 'Social'];

const CategoryModal = () => {
  const [selected, setSelected] = useState<CategoryType>('DeFi');

  return (
    <div className="min-h-[600px] bg-gradient-to-r from-purple-100 to-blue-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex  flex-wrap justify-center gap-4 sm:gap-12 mb-8 sm:mb-16 overflow-x-auto px-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelected(tab)}
              className={`pb-2 text-lg font-medium transition-all duration-300 relative ${
                selected === tab
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {tab}
              {selected === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>

        {/* Modal Box */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 flex w-full max-w-5xl mx-auto flex-col md:flex-row items-center gap-12"
        >
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] aspect-square">
              <Image
                src={content[selected].image}
                alt={`${selected} screenshot`}
                fill
                className="rounded-xl object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 flex flex-col justify-center space-y-8">
            <div className="h-12 relative">
              <Image
                src={content[selected].logo}
                alt={`${selected} logo`}
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-2xl text-gray-800 font-semibold leading-relaxed">
              {content[selected].quote}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-900 transition"
            >
              →
            </motion.button>
          </div>
        </motion.div>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-12 text-center">
          <button className="text-blue-600 border border-blue-500 sm:px-8 py-3 rounded-full hover:bg-blue-50 transition-all duration-300">
            View more 
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;