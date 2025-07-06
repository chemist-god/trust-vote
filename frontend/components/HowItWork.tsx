
'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HowItWork = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1128] via-[#1B3C6B] to-[#0A1128] text-white py-24">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <motion.div 
        className="container mx-auto px-4 md:px-8"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Side (Text Content) */}
          <div className="w-full md:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                Blockchain Voting Revolution
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Experience the future of voting with our cutting-edge blockchain technology. 
                Secure, transparent, and tamper-proof.
              </p>
            </motion.div>

            {/* Feature Points */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Immutable Security</h3>
                  <p className="text-gray-400">Your vote is cryptographically secured and cannot be altered</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">zK Proof Architecture</h3>
                  <p className="text-gray-400">Fully decentralized system with no single point of failure</p>
                </div>
              </motion.div>
            </div>

            <motion.button
              className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore How It Works
            </motion.button>
          </div>

          {/* Right Side (Illustration) */}
          <motion.div 
            className="w-full md:w-1/2 relative"
            animate={floatingAnimation}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Image
                src="/assets/wallet.png"
                alt="Blockchain Voting Illustration"
                width={300}
                height={300}
                className="relative z-10 rounded-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWork;