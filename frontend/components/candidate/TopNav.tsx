'use client';
import React, { useState, useRef, useEffect } from 'react';
import { 
  FaBell, 
  FaSearch, 
  FaTimes, 
  FaCheckCircle, 
  FaInfoCircle,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaVoteYea,
  FaBullhorn,
  FaShieldAlt 
} from 'react-icons/fa';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'vote' | 'campaign' | 'security';
  timestamp: string;
  isRead: boolean;
  priority?: 'low' | 'medium' | 'high';
  actionUrl?: string;
  category?: 'system' | 'campaign' | 'voting' | 'security' | 'document';
  metadata?: {
    campaignId?: string;
    voteId?: string;
    documentId?: string;
    [key: string]: any;
  };
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <FaCheckCircle className="h-6 w-6 text-green-500" />;
    case 'info':
      return <FaInfoCircle className="h-6 w-6 text-blue-500" />;
    case 'warning':
      return <FaExclamationTriangle className="h-6 w-6 text-yellow-500" />;
    case 'error':
      return <FaExclamationCircle className="h-6 w-6 text-red-500" />;
    case 'vote':
      return <FaVoteYea className="h-6 w-6 text-purple-500" />;
    case 'campaign':
      return <FaBullhorn className="h-6 w-6 text-indigo-500" />;
    case 'security':
      return <FaShieldAlt className="h-6 w-6 text-orange-500" />;
    default:
      return <FaBell className="h-6 w-6 text-gray-500" />;
  }
};

const getPriorityClass = (priority?: string) => {
  switch (priority) {
    case 'high':
      return 'border-l-4 border-red-500';
    case 'medium':
      return 'border-l-4 border-yellow-500';
    case 'low':
      return 'border-l-4 border-green-500';
    default:
      return '';
  }
};

const TopNav = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Campaign Update',
      message: 'Your campaign verification is complete',
      type: 'success',
      timestamp: '2024-03-10T10:00:00',
      isRead: false,
      priority: 'high',
      category: 'campaign',
      actionUrl: '/campaign/verification'
    },
    {
      id: '2',
      title: 'Document Verification',
      message: 'Please complete your document verification',
      type: 'info',
      timestamp: '2024-03-09T15:30:00',
      isRead: false,
      priority: 'medium',
      category: 'document',
      actionUrl: '/documents/verify'
    },
    {
      id: '3',
      title: 'New Votes Received',
      message: 'You have received 50 new votes in the last hour',
      type: 'vote',
      timestamp: '2024-03-10T09:00:00',
      isRead: false,
      priority: 'low',
      category: 'voting',
      metadata: {
        voteCount: 50,
        totalVotes: 1500
      }
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    return notification.category === activeFilter;
  });

  const groupNotificationsByDate = (notifications: Notification[]) => {
    const groups: { [key: string]: Notification[] } = {
      'Today': [],
      'Yesterday': [],
      'This Week': [],
      'Earlier': []
    };

    notifications.forEach(notification => {
      const date = new Date(notification.timestamp);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) groups['Today'].push(notification);
      else if (diffDays === 1) groups['Yesterday'].push(notification);
      else if (diffDays <= 7) groups['This Week'].push(notification);
      else groups['Earlier'].push(notification);
    });

    return groups;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
         <div className="hidden md:flex md:flex-1 md:max-w-lg">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors">
              Start Campaign
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
              View Results
            </button>
            
            {/* Notification Button */}
            <div className="relative" ref={notificationRef}>
              <button 
                className="relative p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <FaBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <span className="text-sm text-gray-500">{unreadCount} unread</span>
                    </div>
                  </div>

                  {/* Notification Filters */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="flex space-x-2 overflow-x-auto">
                      {['all', 'campaign', 'voting', 'security', 'document'].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveFilter(filter)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            activeFilter === filter
                              ? 'bg-blue-100 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {Object.entries(groupNotificationsByDate(filteredNotifications)).map(([date, notifications]) => (
                      notifications.length > 0 && (
                        <div key={date}>
                          <div className="px-4 py-2 bg-gray-50">
                            <span className="text-sm font-medium text-gray-600">{date}</span>
                          </div>
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={`p-4 hover:bg-gray-50 transition-colors ${
                                !notification.isRead ? 'bg-blue-50' : ''
                              } ${getPriorityClass(notification.priority)}`}
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="ml-3 flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                      {notification.title}
                                    </p>
                                    <button
                                      onClick={() => deleteNotification(notification.id)}
                                      className="text-gray-400 hover:text-gray-600"
                                    >
                                      <FaTimes className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {notification.message}
                                  </p>
                                  <div className="mt-2 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                      {new Date(notification.timestamp).toLocaleTimeString()}
                                    </span>
                                    {!notification.isRead && (
                                      <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="text-xs text-blue-600 hover:text-blue-800"
                                      >
                                        Mark as read
                                      </button>
                                    )}
                                  </div>
                                  {notification.actionUrl && (
                                    <div className="mt-2">
                                      <a
                                        href={notification.actionUrl}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                      >
                                        View Details →
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    ))}
                    {filteredNotifications.length === 0 && (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-gray-100">
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;