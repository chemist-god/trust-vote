'use client';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import Notifications from './Notifications';

export default function TopNav() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex-shrink-0">
      <div className="flex items-center justify-between h-full px-6">
        <div className="relative hidden md:block">
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search voters, candidates..."
            className="w-full max-w-xs pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:hidden">
        </div>

        <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-blue-600 rounded-full hover:bg-slate-100">
              <FaBell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white" />
            </button>

          <div className="w-px h-6 bg-slate-200" />

          <div className="flex items-center gap-3">
            <FaUserCircle className="h-8 w-8 text-slate-500" />
            <div>
              <p className="text-sm font-semibold text-slate-700">Admin</p>
              <p className="text-xs text-slate-500">System Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}