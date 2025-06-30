'use client';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaFileUpload, FaUserCheck } from 'react-icons/fa';

const guidelines = [
  {
    icon: FaUserCheck,
    title: "Candidate Verification",
    description: "Complete your identity verification process",
    status: "completed",
  },
  {
    icon: FaFileUpload,
    title: "Document Submission",
    description: "Upload required campaign documents and credentials",
    status: "pending",
  },
  {
    icon: FaExclamationTriangle,
    title: "Campaign Guidelines",
    description: "Review and accept campaign conduct guidelines",
    status: "pending",
  },
  {
    icon: FaCheckCircle,
    title: "Admin Approval",
    description: "Await administrative approval of your candidacy",
    status: "pending",
  },
];

const CandidateGuidelines = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Certification Requirements</h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          2 of 4 Completed
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidelines.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className={`p-3 rounded-lg mr-4 ${
              item.status === 'completed' 
                ? 'bg-green-100 text-green-600'
                : 'bg-blue-100 text-blue-600'
            }`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                item.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.status === 'completed' ? 'Completed' : 'Pending'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 border border-blue-100 rounded-lg bg-blue-50">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Important Notice</h4>
        <p className="text-sm text-blue-600">
          All requirements must be completed and approved by the admin before your candidacy is officially confirmed. 
          Please ensure all submitted documents are accurate and up-to-date.
        </p>
      </div>
    </div>
  );
};

export default CandidateGuidelines;