'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronDown, 
  FiCheckCircle, 
  FiUser, 
  FiLock, 
  FiShield, 
  FiAward,
  FiClock,
  FiAlertCircle,
  FiX
} from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
  category: 'voting' | 'wallet' | 'tokens' | 'general';
}

const faqItems: FAQItem[] = [
  {
    question: "How do I start the voting process?",
    answer: "First, sign in with your valid Index Number. Once authenticated, you'll be directed to the dashboard where you can connect your Web3 wallet. This wallet connection is essential for receiving the soul-bound token needed for voting.",
    category: 'voting'
  },
  {
    question: "What is a Soul-bound Token (SBT)?",
    answer: "A Soul-bound Token is a special non-transferable token that will be minted to your wallet when you're ready to vote. This token serves as your digital voting credential and expires after you cast your vote.",
    category: 'tokens'
  },
  {
    question: "How do I connect my Web3 wallet?",
    answer: "In your dashboard, click on 'Connect Wallet'. You'll need MetaMask or another compatible Web3 wallet. Follow the prompts to connect your wallet securely.",
    category: 'wallet'
  },
  {
    question: "What happens after I vote?",
    answer: "After casting your vote, your Soul-bound Token will automatically expire. Once the election ends, you'll receive a POAP (Proof of Attendance Protocol) token as proof of your participation.",
    category: 'voting'
  },
  {
    question: "What is a POAP?",
    answer: "POAP (Proof of Attendance Protocol) is a special NFT that proves your participation in the election. It serves as a permanent record of your civic engagement.",
    category: 'tokens'
  }
];

const FAQ_Terms = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { 
      icon: <FiUser className="w-6 h-6" />, 
      text: "Sign in with Index Number",
      description: "Authenticate using your valid student credentials"
    },
    { 
      icon: <FiLock className="w-6 h-6" />, 
      text: "Connect Web3 Wallet",
      description: "Link your MetaMask or compatible wallet"
    },
    { 
      icon: <FiShield className="w-6 h-6" />, 
      text: "Receive Soul-bound Token",
      description: "Get your unique voting credential"
    },
    { 
      icon: <FiClock className="w-6 h-6" />, 
      text: "Cast Your Vote",
      description: "Make your choice in the election"
    },
    { 
      icon: <FiAward className="w-6 h-6" />, 
      text: "Receive POAP",
      description: "Get your proof of participation"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 shadow-lg mb-8 text-white">
        <h1 className="text-3xl font-bold mb-4">FAQ & Terms</h1>
        <p className="text-white/90">
          Understand our secure blockchain-based voting process and learn how to participate in elections.
        </p>
      </div>

      {/* Interactive Timeline */}
      <div className="bg-white rounded-xl p-8 shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-20" />
        <h2 className="text-2xl font-semibold mb-8 relative">Voting Process</h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              onHoverStart={() => setActiveStep(index)}
              onHoverEnd={() => setActiveStep(null)}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  className={`p-3 rounded-full ${
                    activeStep === index 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-100 text-blue-500'
                  } transition-colors duration-200`}
                >
                  {step.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{step.text}</h3>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeStep === index ? 'auto' : 0,
                      opacity: activeStep === index ? 1 : 0
                    }}
                    className="text-sm text-gray-600 overflow-hidden"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-8 bg-blue-100" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced FAQ Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-colors duration-200"
              initial={false}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <motion.div
                  animate={{ rotate: openItems.has(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-blue-500"
                >
                  <FiChevronDown />
                </motion.div>
              </button>
              <AnimatePresence>
                {openItems.has(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Terms and Conditions */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <FiAlertCircle className="text-blue-500 w-6 h-6" />
          <h2 className="text-2xl font-semibold">Terms and Conditions</h2>
        </div>
        <div className="flex items-start space-x-3 mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-gray-600">
            I have read and agree to the terms and conditions of using TrustVote for election participation.
          </label>
        </div>
        <button
          onClick={() => setShowTermsModal(true)}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          View full terms
        </button>
      </div>

      {/* Enhanced Terms Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowTermsModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <FiX className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-semibold mb-6">Terms and Conditions</h3>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-600 mb-4">By using TrustVote, you agree to:</p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Provide accurate identification information</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Use only one wallet address for voting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Not attempt to manipulate the voting process</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Accept the finality of the voting results</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>Maintain the confidentiality of your voting credentials</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                I Understand
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ_Terms;