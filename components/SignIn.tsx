"use client"
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId.trim()) {
      toast.error('Student ID cannot be empty', {
        position: 'top-center',
        style: {
          background: '#ff4444',
          color: '#fff',
        },
      });
      return;
    }

    if (!password.trim()) {
      toast.error('Password cannot be empty', {
        position: 'top-center',
        style: {
          background: '#ff4444',
          color: '#fff',
        },
      });
      return;
    }

    setLoading(true);
    toast.loading('Signing in...', {
      position: 'top-center',
      id: 'signin-loading',
    });

    setTimeout(() => {
      console.log('Signed in with:', { studentId, password });
      setStudentId('');
      setPassword('');
      setLoading(false);
      
      toast.success('Signed in successfully!', {
        position: 'top-center',
        id: 'signin-loading', 
        style: {
          background: '#00C851',
          color: '#fff',
        },
      });
      router.push(`/dashboard?studentId=${encodeURIComponent(studentId)}`);// Redirect to /dashboard after sign in
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black px-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
        <p className="text-gray-300 text-center mb-8">Sign in to continue</p>
        
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text" // Changed from number to text to handle input more gracefully
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              disabled={loading}
              className="w-full py-3 pl-12 pr-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className="w-full py-3 pl-12 pr-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;