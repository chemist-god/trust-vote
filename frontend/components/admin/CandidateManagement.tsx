'use client';
import { FaEye, FaSearch, FaFileExport } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import CandidateReviewModal from './CandidateReviewModal';

interface Candidate {
  id: string;
  name: string;
  position: string;
  status: string;
  avatar: string;
  program: string;
  manifesto: string;
  studentInfo: string;
  socialLinks: { [key: string]: string };
  feedback: string;
  photo: string;
}

const initialCandidates = [
  {
    id: 'C001',
    name: 'John Doe',
    position: 'SRC President',
    status: 'Pending',
    avatar: '/avatars/avatar-1.png',
    program: 'Computer Science',
    manifesto: '',
    studentInfo: 'Level 300, ID: 123456',
    socialLinks: { twitter: '', linkedin: '' },
    feedback: '',
    photo: '/avatars/avatar-1.png',
  },
  {
    id: 'C002',
    name: 'Jane Smith',
    position: 'General Secretary',
    status: 'Approved',
    avatar: '/avatars/avatar-2.png',
    program: 'Business Administration',
    manifesto: '',
    studentInfo: 'Level 400, ID: 654321',
    socialLinks: { twitter: '', linkedin: '' },
    feedback: '',
    photo: '/avatars/avatar-2.png',
  },
  {
    id: 'C003',
    name: 'Peter Jones',
    position: 'Treasurer',
    status: 'Rejected',
    avatar: '/avatars/avatar-3.png',
    program: 'Accounting',
    manifesto: '',
    studentInfo: 'Level 200, ID: 789012',
    socialLinks: { twitter: '', linkedin: '' },
    feedback: '',
    photo: '/avatars/avatar-3.png',
  },
  {
    id: 'C004',
    name: 'Mary Johnson',
    position: "Womens's Commissioner",
    status: 'Approved',
    avatar: '/avatars/avatar-4.png',
    program: 'Law',
    manifesto: '',
    studentInfo: 'Level 300, ID: 345678',
    socialLinks: { twitter: '', linkedin: '' },
    feedback: '',
    photo: '/avatars/avatar-4.png',
  },
  {
    id: 'C005',
    name: 'David Lee',
    position: 'SRC President',
    status: 'Pending',
    avatar: '/avatars/avatar-5.png',
    program: 'Political Science',
    manifesto: '',
    studentInfo: 'Level 100, ID: 567890',
    socialLinks: { twitter: '', linkedin: '' },
    feedback: '',
    photo: '/avatars/avatar-5.png',
  },
];

const statusStyles: { [key: string]: string } = {
  Approved: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Rejected: 'bg-red-100 text-red-700',
};


export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleReview = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleApprove = (feedback: string) => {
    if (!selectedCandidate) return;
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate.id
          ? { ...c, status: 'Approved', feedback }
          : c
      )
    );
    handleCloseModal();
  };

  const handleReject = (feedback: string) => {
    if (!selectedCandidate) return;
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate.id
          ? { ...c, status: 'Rejected', feedback }
          : c
      )
    );
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Candidate Management</h2>
        <p className="mt-1 text-slate-500">Approve, reject, and manage candidate applications.</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search candidate..." className="pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <span>All Candidate</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200">
              <FaFileExport />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-medium">Candidate</th>
                <th className="px-6 py-3 font-medium">Position</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                        {/* In a real app, i will use Next/Image */}
                        <Image
                          src={candidate.avatar}
                          alt={candidate.name}
                          width={40}
                          height={40}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{candidate.name}</p>
                        <p className="font-mono text-xs text-slate-500">{candidate.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{candidate.position}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[candidate.status]}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        title="Review Application"
                        className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                        onClick={() => handleReview(candidate)}
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CandidateReviewModal
        open={modalOpen}
        onClose={handleCloseModal}
        candidate={selectedCandidate}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}