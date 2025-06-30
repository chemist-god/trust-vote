'use client';
import React, { useState } from 'react';
import { 
  FaUsers, FaCalendarAlt, FaComments, 
  FaHashtag, FaHandshake, FaBullhorn 
} from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
  attendees: number;
}

interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'announcement' | 'update';
}

const CampaignNetwork = () => {
  const [activeTab, setActiveTab] = useState('updates');

  // Sample data - To be replaced with backend data
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Virtual Town Hall',
      date: '2024-03-15',
      type: 'online',
      attendees: 150
    },
    // Add more events
  ];

  const campaignUpdates: Update[] = [
    {
      id: '1',
      title: 'New Campaign Policy Released',
      content: 'We are excited to announce our new education policy...',
      date: '2024-03-10',
      type: 'announcement'
    },
    // Add more updates
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-gray-200">
        {[
          { id: 'updates', label: 'Updates', icon: <FaBullhorn /> },
          { id: 'events', label: 'Events', icon: <FaCalendarAlt /> },
          { id: 'engagement', label: 'Engagement', icon: <FaComments /> },
          { id: 'social', label: 'Social', icon: <FaHashtag /> },
          { id: 'support', label: 'Support', icon: <FaHandshake /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Updates/Events Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'New Update', icon: <FaBullhorn /> },
                { label: 'Schedule Event', icon: <FaCalendarAlt /> },
                { label: 'Message Team', icon: <FaComments /> }
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Updates Feed */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
            <div className="space-y-4">
              {campaignUpdates.map((update) => (
                <div key={update.id} className="border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{update.title}</h3>
                    <span className="text-sm text-gray-500">{update.date}</span>
                  </div>
                  <p className="text-gray-600">{update.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Engagement Stats */}
        <div className="space-y-6">
          {/* Team Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Team Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Active Volunteers</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Campaign Staff</span>
                <span className="font-semibold">8</span>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignNetwork;