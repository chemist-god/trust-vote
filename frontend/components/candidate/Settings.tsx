'use client';
import React, { useState } from 'react';
import { 
  FaUser, 
  FaShieldAlt, 
  FaBell, 
  FaLock, 
  FaWallet,
  FaCamera,
} from 'react-icons/fa';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [notificationSettings, setNotificationSettings] = useState({
      email: true,
      push: true,
      updates: true,        
      security: true
    });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Settings Navigation */}
          <div className="p-6 border-r border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: <FaUser /> },
                { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
                { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
                { id: 'privacy', label: 'Privacy', icon: <FaLock /> },
                { id: 'wallet', label: 'Wallet', icon: <FaWallet /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="col-span-3 p-6">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Profile Settings</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                {/* Profile Photo */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUser className="w-12 h-12 text-gray-400" />
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full">
                        <FaCamera className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">Profile Photo</h4>
                    <p className="text-sm text-gray-500">
                      Upload a professional photo for your campaign
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Campaign Bio
                    </label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'wallet' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Wallet Settings</h3>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium mb-2">Connected Wallet</h4>
                  <div className="flex items-center justify-between">
                    <code className="text-sm bg-gray-100 px-3 py-1 rounded">
                      0x1234...5678
                    </code>
                    <button className="text-blue-600 hover:text-blue-700">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add other sections (security, notifications, privacy) with similar structure */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;