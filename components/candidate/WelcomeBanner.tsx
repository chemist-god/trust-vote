'use client';
import { motion } from 'framer-motion';
import { FaUserTie } from 'react-icons/fa';

const WelcomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-8 mb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      
      {/* Content */}
      <div className="relative z-10 flex items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <FaUserTie className="text-white/90 w-6 h-6" />
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
              Candidate Portal
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome back, John Doe
          </h1>
          <p className="text-white/80 mb-6 max-w-lg">
            Manage your campaign, track your certification progress, and engage with the voting community through our secure blockchain-based platform.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Complete Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              View Guidelines
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden lg:grid grid-cols-2 gap-4 min-w-[240px]">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/60 text-sm mb-1">Certification</p>
            <p className="text-white text-2xl font-semibold">50%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/60 text-sm mb-1">Days Left</p>
            <p className="text-white text-2xl font-semibold">14</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;