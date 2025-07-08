'use client';
import Elections from './Elections';
import Notification from './Notification';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FAQ_Terms from '../FAQ-Terms';
import {
  FiUser, FiShield, FiBell, FiBookOpen, FiMenu, FiLogOut,
} from 'react-icons/fi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { authApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface DashboardProps {
  // No need for studentId prop as we'll get it from the token
}

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { id: 'user', label: 'User', icon: <FiUser size={20} /> },
  { id: 'elections', label: 'Elections', icon: <FiShield size={20} /> },
  { id: 'notifications', label: 'Notifications', icon: <FiBell size={20} /> },
  { id: 'faq', label: 'FAQ / Terms', icon: <FiBookOpen size={20} /> },
];

export default function Dashboard({}: DashboardProps) {
  const [active, setActive] = useState<string>('user');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isWalletLinked, setIsWalletLinked] = useState(false);
  const [userData, setUserData] = useState<{ indexNumber?: string }>({});

  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    // Get user data from token
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/voter');
      return;
    }

    // Decode the token to get user data
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserData({
        indexNumber: payload.indexNumber,
      });
    } catch (error) {
      console.error('Error decoding token:', error);
      authApi.logout();
      router.push('/voter');
    }
  }, [router]);

  const handleLogout = () => {
    authApi.logout();
    router.push('/voter');
  };

  useEffect(() => {
    const linkWalletToBackend = async (walletAddress: string) => {
      const token = localStorage.getItem('token');
      if (!token) {
        setApiMessage({ type: 'error', text: 'Authentication error. Please log in again.' });
        setTimeout(() => router.push('/voter'), 3000);
        return;
      }

      setIsLoading(true);
      setApiMessage(null);

      try {
        const response = await authApi.connectWallet(walletAddress);
        setApiMessage({ 
          type: 'success', 
          text: response.data.message || 'Wallet connected successfully!' 
        });
        setIsWalletLinked(true);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to connect wallet';
        setApiMessage({ type: 'error', text: errorMessage });
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected && address && !isWalletLinked) {
      linkWalletToBackend(address);
    } else if (!isConnected) {
      setApiMessage(null);
      setIsWalletLinked(false);
    }
  }, [address, isConnected, isWalletLinked, router]);

  const renderMainContent = () => {
    if (active === 'user') {
      return (
        <>
          <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Student Information</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium">{userData.indexNumber || 'Loading...'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wallet Status</p>
                    <p className="font-medium">
                      {isConnected ? 'Connected' : 'Not Connected'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col space-y-4">
                  <ConnectButton />
                  {apiMessage && (
                    <div className={`mt-4 p-3 rounded ${
                      apiMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {apiMessage.text}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (active === 'elections') {
      return <Elections />;
    } else if (active === 'notifications') {
      return <Notification />;
    } else if (active === 'faq') {
      return <FAQ_Terms />;
    }
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Content for {active} section</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 bg-grey bg-opacity-50 z-40 lg:hidden transition-opacity ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold">TrustVote</h1>
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 mt-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActive(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                      active === item.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
          <button 
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">
            {navItems.find(item => item.id === active)?.label || 'Dashboard'}
          </h1>
          <div className="w-10"></div> {/* For alignment */}
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}