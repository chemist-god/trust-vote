
'use client'
import { motion } from "framer-motion";
import { FaVoteYea,FaCubes, FaUserShield, FaNetworkWired } from "react-icons/fa";

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const featureCards = [
    {
      icon: <FaVoteYea className="text-6xl text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />,
      title: "Voting Process",
      description: "Track your vote in real-time with our transparent blockchain ledger system",
      gradient: "from-cyan-600/20 via-cyan-500/10 to-transparent"
    },
    {
      icon: <FaCubes className="text-6xl text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />,
      title: "Smart Contract Governance",
      description: "Automated election rules enforcement through immutable smart contracts on the blockchain.",
      gradient: "from-violet-600/20 via-violet-500/10 to-transparent"
    },
    {
      icon: <FaUserShield className="text-6xl text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />,
      title: "Zero-Knowledge Proofs",
      description: "Privacy-preserving vote verification without revealing individual voter choices.",
      gradient: "from-emerald-600/20 via-emerald-500/10 to-transparent"
    },
    {
      icon: <FaNetworkWired className="text-6xl text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />,
      title: "Decentralized Network",
      description: "Distributed consensus mechanism ensures fair and transparent vote counting.",
      gradient: "from-amber-600/20 via-amber-500/10 to-transparent"
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-[#0F172A]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/80 to-[#0F172A]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-5"></div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-violet-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-amber-500/30 to-emerald-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
            Key feature of our Technology
          </h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Empowering democratic processes with cutting-edge blockchain technology and
            Web3 infrastructure for unparalleled security and transparency.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className={`group relative p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} 
                border border-white/5 hover:border-white/10 transition-all duration-300
                backdrop-blur-xl hover:backdrop-blur-2xl`}
            >
              {/* Card Content */}
              <div className="relative z-10">
                <div className="mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-cyan-300 to-violet-300 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold 
            hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
             Explore All Features
           </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;