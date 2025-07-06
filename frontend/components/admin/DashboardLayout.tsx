'use client';
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import VoterManagement from "./VoterManagement";
import CandidateManagement from "./CandidateManagement";
import VotingStatus from "./VotingStatus";
import ResultsVisualization from "./ResultsVisualization";
import AuditTrail from "./AuditTrail";
import SecurityPanel from "./SecurityPanel";
import AdminProfile from "./AdminProfile";
import { FaBars } from 'react-icons/fa';

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("status");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "voters":
        return <VoterManagement />;
      case "candidates":
        return <CandidateManagement />;
      case "status":
        return <VotingStatus />;
      case "results":
        return <ResultsVisualization />;
      case "audit":
        return <AuditTrail />;
      case "security":
        return <SecurityPanel />;
      case "profile":
        return <AdminProfile />;
      default:
        return <VotingStatus />; // Default to the main dashboard view
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-white shadow-lg hover:bg-gray-100 transition-colors"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars className="h-5 w-5 text-gray-600" />
      </button>
      {/* Sidebar - responsive */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false); // close sidebar on mobile after selection
        }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}