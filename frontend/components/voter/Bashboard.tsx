'use client';
import Elections from './Elections';
import Notification from './Notification';
import FAQ_Terms from '../FAQ-Terms';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FiUser, FiShield, FiBell, FiBookOpen, FiMenu, FiLogOut,
} from 'react-icons/fi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

interface DashboardProps {
  studentId: string;
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

export default function Dashboard({ studentId }: DashboardProps) {
  const [active, setActive] = useState<string>('user');
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const handleLogout = () => router.push('/');

  useEffect(() => {
    if (isConnected) {
      console.log('Wallet address is now:', address);
    }
  }, [address, isConnected]);

  const renderMainContent = () => {
    if (active === 'user') {
      return (
        <>
          <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">S</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{studentId}</h2>
                <p className="text-sm text-gray-500">Member since {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Index Number:
                </label>
                <p className="text-lg font-semibold">{studentId}</p>
              </div>

              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallet Connection
                </label>
                <ConnectButton />
                {isConnected ? (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      Wallet connected. You can now proceed to the elections tab.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Please connect your wallet to view elections and vote.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      );
    } else if (active === 'elections') {
      return <Elections />;
    } else if (active === 'notifications') {
      return <Notification />
    } else if (active === 'faq') {
      return <FAQ_Terms />
    }
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-gray-600">Content for {active} section</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 bg-grey bg-opacity-50 z-40 lg:hidden transition-opacity ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform lg:hidden transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <Image src="/assets/logo.jpg" alt="Logo" width={32} height={32} />
            <span className="ml-2 text-xl text-gray-500 font-bold">TrustVote</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden">
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                active === item.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 border-r border-gray-200 bg-white">
        <div className="flex items-center h-16 px-6 border-b">
          <Image src="/assets/logo.jpg" alt="Logo" width={32} height={32} />
          <span className="ml-2 text-xl text-gray-700 font-bold">TrustVote</span>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                active === item.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button 
            onClick={() => setMobileOpen(true)} 
            className="lg:hidden"
          >
            <FiMenu size={24} />
          </button>
          <h3 className="text-lg text-gray-500 font-semibold">Dashboard</h3>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <FiLogOut size={18} />
            <span className='text-red-300'>Logout</span>
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}