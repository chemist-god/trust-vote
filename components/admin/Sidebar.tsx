'use client';
import { FaVoteYea, FaUsers, FaUserTie, FaChartBar, FaShieldAlt, FaUserCircle, FaCog, FaTimes } from 'react-icons/fa';
import { RiDashboardFill } from 'react-icons/ri';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const tabs = [
  { key: "status", label: "Dashboard", icon: RiDashboardFill },
  { key: "voters", label: "Voters", icon: FaUsers },
  { key: "candidates", label: "Candidates", icon: FaUserTie },
  { key: "results", label: "Results", icon: FaChartBar },
  { key: "audit", label: "Audit Trail", icon: FaVoteYea },
  { key: "security", label: "Security", icon: FaShieldAlt },
];

const bottomTabs = [
  { key: "settings", label: "Settings", icon: FaCog },
  { key: "profile", label: "Profile", icon: FaUserCircle },
]

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  open?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ activeTab, setActiveTab, open = false, onClose = () => { } }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  // Sidebar classes for responsive/overlay
  const sidebarBase = "w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col z-40";
  const sidebarDesktop = "hidden md:flex";
  const sidebarMobile = `fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} md:hidden shadow-2xl`;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden" onClick={onClose} aria-label="Sidebar overlay" />
      )}
      {/* Sidebar for desktop */}
      <aside className={`${sidebarBase} ${sidebarDesktop}`}>
        <div className="h-16 flex items-center justify-center border-b border-slate-200">
          <h1 className="text-xl font-bold text-blue-600">TrustVote</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-slate-200 space-y-2">
          {bottomTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </aside>
      {/* Sidebar for mobile (overlay) */}
      <aside
        ref={sidebarRef}
        className={`${sidebarBase} ${sidebarMobile}`}
        style={{ boxShadow: open ? '0 0 40px 0 rgba(0,0,0,0.15)' : undefined }}
        aria-modal={open ? 'true' : undefined}
        role="dialog"
      >
        <div className="h-16 flex items-center justify-between border-b border-slate-200 px-4">
          <h1 className="text-xl font-bold text-blue-600">TrustVote</h1>
          <button onClick={onClose} aria-label="Close sidebar" className="p-2 rounded hover:bg-slate-100">
            <FaTimes className="h-5 w-5 text-slate-600" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-slate-200 space-y-2">
          {bottomTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}