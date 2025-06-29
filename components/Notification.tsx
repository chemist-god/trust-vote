'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiCheck, FiInfo, FiAlertCircle } from 'react-icons/fi';

interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Election Created',
    message: 'SRC Presidential Election has been scheduled for August 15th, 2025',
    timestamp: '2 days ago',
    isRead: false
  },
  {
    id: '2',
    type: 'success',
    title: 'Vote Confirmed',
    message: 'Your vote for the Department Representative has been recorded successfully',
    timestamp: '1 mins ago',
    isRead: true
  },
  {
    id: '3',
    type: 'warning',
    title: 'Verification Required',
    message: 'Please complete your KYC verification to participate in upcoming elections',
    timestamp: '2 hours ago',
    isRead: false
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <FiCheck className="text-green-500" size={20} />;
    case 'warning':
      return <FiAlertCircle className="text-yellow-500" size={20} />;
    default:
      return <FiInfo className="text-blue-500" size={20} />;
  }
};

const Notification = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FiBell className="text-gray-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border ${
                notification.isRead ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-gray-100">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {notification.timestamp}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">{notification.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm text-gray-600 hover:text-gray-800">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;