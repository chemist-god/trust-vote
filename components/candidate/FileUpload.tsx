'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileUpload, 
  FaFilePdf, 
  FaFileImage, 
  FaCheckCircle, 
  FaTimesCircle,
  FaExclamationCircle
} from 'react-icons/fa';

interface DocumentRequirement {
  id: string;
  title: string;
  description: string;
  required: boolean;
  accepted_formats: string[];
  max_size: string;
  status: 'pending' | 'uploaded' | 'rejected';
  file?: File;
}

const documentRequirements: DocumentRequirement[] = [
  {
    id: 'manifesto',
    title: 'Campaign Manifesto',
    description: 'A detailed document outlining your campaign promises and plans',
    required: true,
    accepted_formats: ['.pdf', '.doc', '.docx'],
    max_size: '5MB',
    status: 'pending'
  },
  {
    id: 'banner',
    title: 'Campaign Banner',
    description: 'High-resolution campaign banner for display',
    required: true,
    accepted_formats: ['.jpg', '.png', '.jpeg'],
    max_size: '2MB',
    status: 'pending'
  },
  {
    id: 'id_proof',
    title: 'Identity Proof',
    description: 'Valid government-issued ID',
    required: true,
    accepted_formats: ['.pdf', '.jpg', '.png'],
    max_size: '2MB',
    status: 'pending'
  },
  {
    id: 'credentials',
    title: 'Academic Credentials',
    description: 'Academic certificates and qualifications',
    required: true,
    accepted_formats: ['.pdf'],
    max_size: '5MB',
    status: 'pending'
  }
];

const FileUpload = () => {
  const [documents, setDocuments] = useState<DocumentRequirement[]>(documentRequirements);

  const handleFileUpload = (id: string, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, file, status: 'uploaded' } : doc
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Document Upload</h2>
        <p className="text-gray-600">Upload all required documents for your candidacy verification</p>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Upload Progress</span>
            <span>{documents.filter(d => d.status === 'uploaded').length} of {documents.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(documents.filter(d => d.status === 'uploaded').length / documents.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Document Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{doc.title}</h3>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </div>
              {doc.status === 'uploaded' && (
                <FaCheckCircle className="text-green-500 text-xl" />
              )}
            </div>

            <div className="space-y-4">
              {/* File Requirements */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded-full">
                  Formats: {doc.accepted_formats.join(', ')}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">
                  Max size: {doc.max_size}
                </span>
                {doc.required && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full">
                    Required
                  </span>
                )}
              </div>

              {/* Upload Button/Status */}
              {doc.status === 'uploaded' ? (
                <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FaFilePdf className="text-green-500" />
                    <span className="text-sm text-green-700 truncate">
                      {doc.file?.name || 'File uploaded'}
                    </span>
                  </div>
                  <button 
                    onClick={() => setDocuments(prev => prev.map(d => 
                      d.id === doc.id ? { ...d, status: 'pending', file: undefined } : d
                    ))}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTimesCircle />
                  </button>
                </div>
              ) : (
                <label className="block">
                  <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-blue-500 focus:outline-none">
                    <div className="flex flex-col items-center space-y-2">
                      <FaFileUpload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept={doc.accepted_formats.join(',')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(doc.id, file);
                    }}
                  />
                </label>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Ready to Submit?</h3>
            <p className="text-sm text-gray-600">
              Please ensure all required documents are uploaded before submission
            </p>
          </div>
          <button
            disabled={documents.some(doc => doc.required && doc.status !== 'uploaded')}
            className={`px-6 py-2 rounded-lg font-medium ${
              documents.some(doc => doc.required && doc.status !== 'uploaded')
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;