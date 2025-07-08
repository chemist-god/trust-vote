"use client"
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface LoginCredentials {
  indexNumber: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    indexNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.indexNumber.trim() || !credentials.password.trim()) {
      toast.error('Please fill in all fields', {
        position: 'bottom-right',
        style: { background: '#ff4444', color: '#fff' },
      });
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Signing in...', { position: 'bottom-right' });

    try {
      const response = await authApi.login(credentials);
      
      if (response.token) {
        // Set the token in cookies
        document.cookie = `token=${response.token}; path=/;`;
        
        toast.success('Signed in successfully!', {
          position: 'bottom-right',
          id: loadingToast,
          style: { background: '#00C851', color: '#fff' },
        });
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        throw new Error('No token received');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to sign in. Please check your credentials.';
      toast.error(errorMessage, {
        position: 'bottom-right',
        id: loadingToast,
        style: { background: '#ff4444', color: '#fff' },
      });
    } finally {
      setLoading(false);
    }
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
              type="text"
              name="indexNumber"
              placeholder="Student ID"
              value={credentials.indexNumber}
              onChange={handleChange}
              disabled={loading}
              className="w-full py-3 pl-12 pr-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
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