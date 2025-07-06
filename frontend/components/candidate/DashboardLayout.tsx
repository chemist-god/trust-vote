'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import WelcomeBanner from './WelcomeBanner';
import CandidateGuidelines from './CandidateGuidelines';
import RecentActivities from './RecentActivities';
import FileUpload from './FileUpload';
import { FaBars } from 'react-icons/fa';
import Analytics from './Analytics';
import CampaignNetwork from './CampaignNetwork';
import Settings from './Settings';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <WelcomeBanner />
            <CandidateGuidelines />
            <RecentActivities />
          </>
        );
      case 'documents':
        return <FileUpload />;
      case 'analytics':
        return <Analytics />;
      case 'community':
        return <CampaignNetwork />;
      case 'settings':
        return <Settings />;
      default:
        return <div>404 - Not Found</div>;
    }
  };

return (
  <div className="flex h-screen overflow-hidden bg-gray-50">
    {/* Mobile Menu Button */}
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-white shadow-lg hover:bg-gray-100 transition-colors"
      aria-label="Toggle menu"
    >
      <FaBars className="h-5 w-5 text-gray-600" />
    </button>

    {/* Sidebar - Fixed position */}
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-[280px] md:w-64 bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative
      `}
    >
      <div className="h-full overflow-y-auto scrollbar-hide">
        <Sidebar 
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false); // Close sidebar on mobile when tab changes
          }} 
          activeTab={activeTab}
        />
      </div>
    </aside>

    {/* Main Content Area - Scrollable */}
    <div className="flex-1 flex flex-col overflow-hidden w-full">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <TopNav />
      </nav>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 max-w-7xl">
          {renderContent()}
        </div>
      </main>
    </div>

    {/* Mobile Overlay */}
    {isSidebarOpen && (
      <div 
        className="fixed inset-0 bg-white bg-opacity-50 z-20 md:hidden transition-opacity"
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />
    )}
  </div>
);
};

export default DashboardLayout;