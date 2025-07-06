'use client'
import { FaUserCircle, FaSave, FaEdit } from "react-icons/fa";
import { useState } from 'react';

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Admin Profile</h2>
        <p className="mt-1 text-slate-500">Manage your profile information.</p>
      </div>
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center ring-4 ring-purple-200">
            <FaUserCircle className="text-purple-500 text-7xl" />
          </div>
          <div className="text-center sm:text-left mt-4 sm:mt-0">
            <h3 className="text-2xl font-bold">Admin</h3>
            <p className="text-slate-500">admin@trustvote.com</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value="admin"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value="admin@trustvote.com"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <input
              className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 cursor-not-allowed"
              value="Super Administrator"
              disabled
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition ${isEditing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isEditing ? <FaSave /> : <FaEdit />}
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}