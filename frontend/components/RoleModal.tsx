'use client'
import { useState } from "react";
import { FaUser, FaCrown, FaUserTie } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Types
interface RoleModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  identifier: string;
  password: string;
}

const roles = [
  { 
    label: "Voter", 
    icon: <FaUser className="text-blue-400" />,
    route: '/dashboard'
  },
  { 
    label: "Candidate", 
    icon: <FaUserTie className="text-purple-400" />,
    route: '/sidebar'
  },
  { 
    label: "Admin", 
    icon: <FaCrown className="text-amber-400" />,
    route: '/admin'
  },
];

export default function RoleModal({ open, onClose }: RoleModalProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.identifier.trim()) {
      toast.error(`${selectedRole} ID cannot be empty`, {
        position: 'top-center',
        style: { background: '#ff4444', color: '#fff' },
      });
      return;
    }

    if (!formData.password.trim()) {
      toast.error('Password cannot be empty', {
        position: 'top-center',
        style: { background: '#ff4444', color: '#fff' },
      });
      return;
    }

    setLoading(true);
    toast.loading('Signing in...', {
      position: 'top-center',
      id: 'signin-loading',
    });

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      toast.success('Signed in successfully!', {
        position: 'top-center',
        id: 'signin-loading',
        style: { background: '#00C851', color: '#fff' },
      });
      
      const selectedRoleData = roles.find(role => role.label === selectedRole);
      if (selectedRoleData) {
        router.push(selectedRoleData.route);
      }
    }, 1500);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.2 }}
          className="bg-[#151A2E] rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
          
          {!selectedRole ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-white">Choose Your Role</h2>
              <div className="flex justify-center gap-6">
                {roles.map((role) => (
                  <motion.button
                    key={role.label}
                    onClick={() => setSelectedRole(role.label)}
                    className="flex flex-col items-center bg-[#1A223A] hover:bg-blue-900/30 rounded-xl p-6 transition-all duration-200 shadow-lg hover:shadow-xl group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-3xl mb-2 transform group-hover:-translate-y-1 transition-transform duration-200">
                      {role.icon}
                    </span>
                    <span className="font-semibold text-white">{role.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-bold text-center mb-4 text-white">
                Sign In as {selectedRole}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    name="identifier"
                    placeholder={`${selectedRole} ID`}
                    value={formData.identifier}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full rounded-lg px-4 py-2 bg-[#222B45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full rounded-lg px-4 py-2 bg-[#222B45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
                    loading
                      ? 'bg-gray-500 cursor-not-allowed'
                      : selectedRole === 'Voter'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : selectedRole === 'Candidate'
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-amber-500 hover:bg-amber-600'
                  } text-white`}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
              
              <button
                onClick={() => setSelectedRole(null)}
                className="mt-6 text-sm text-blue-300 hover:text-blue-200 transition-colors"
              >
                &larr; Back to Role Selection
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}