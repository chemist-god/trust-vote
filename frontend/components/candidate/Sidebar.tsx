'use client';
import React from 'react';
import { 
  FaHome, 
  FaFileUpload, 
  FaChartBar, 
  FaUsers, 
  FaCog,
} from 'react-icons/fa';

interface SidebarProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const menuItems = [
  { icon: FaHome, label: 'Home', id: 'home' },
  { icon: FaFileUpload, label: 'Documents', id: 'documents' },
  { icon: FaChartBar, label: 'Analytics', id: 'analytics' },
  { icon: FaUsers, label: 'Community', id: 'community' },
  { icon: FaCog, label: 'Settings', id: 'settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ onTabChange, activeTab }) => {
  return (
    <div className="flex flex-col w-full md:w-64">
      <div className="flex flex-col h-full bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-white border-b border-gray-200">
          <span className="text-xl md:text-2xl font-bold text-blue-600">TrustVote</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 md:px-4 py-4 md:py-6 space-y-1 md:space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-3 md:px-4 py-2.5 md:py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 mr-3 flex-shrink-0 ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="flex items-center p-3 md:p-4 border-t border-gray-200">
          <img
            className="h-8 w-8 rounded-full flex-shrink-0"
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="User avatar"
          />
          <div className="ml-3 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">John Doe</p>
            <p className="text-xs text-gray-500 truncate">Candidate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;