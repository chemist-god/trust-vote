'use client'
import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaShieldAlt } from "react-icons/fa";

const AboutUs = () => (
  <section className="relative py-24 bg-gradient-to-b from-[#0F172A] via-[#151A2E] to-[#1A223A] text-white overflow-hidden">
    {/* Animated Gradient Orb */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" />
    <div className="container mx-auto px-4 md:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-purple-300 to-amber-300 bg-clip-text text-transparent">
          About TrustVote
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          TrustVote is revolutionizing digital democracy with secure, transparent, and tamper-proof blockchain voting technology. Our mission is to empower institutions and individuals to participate in elections with confidence, privacy, and trust.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-[#19213A] rounded-2xl p-8 shadow-lg"
        >
          <FaUsers className="text-4xl text-cyan-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Inclusive</h3>
          <p className="text-gray-400 text-center">
            Designed for everyone—students, candidates, and admins—TrustVote ensures fair participation and equal opportunity for all.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-[#19213A] rounded-2xl p-8 shadow-lg"
        >
          <FaGlobe className="text-4xl text-violet-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Transparent</h3>
          <p className="text-gray-400 text-center">
            Every vote is recorded immutably on the blockchain, providing real-time transparency and verifiable results.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center bg-[#19213A] rounded-2xl p-8 shadow-lg"
        >
          <FaShieldAlt className="text-4xl text-amber-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Secure</h3>
          <p className="text-gray-400 text-center">
            Advanced cryptography and decentralized infrastructure protect voter privacy and prevent tampering or fraud.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutUs;