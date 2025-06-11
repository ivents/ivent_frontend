import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Event as EventIcon, 
  Receipt as ReceiptIcon, 
  People as PeopleIcon,
  MonetizationOn as RevenueIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
  PersonOutlined
} from '@mui/icons-material';

const VendorDashboard = () => {
  // Sample data - replace with actual data from your API
  const stats = [
    { 
      title: 'Total Events', 
      value: '12', 
      change: '+2.5%', 
      icon: <EventIcon className="text-blue-500" fontSize="large" />,
      link: '/vendor/events'
    },
    { 
      title: 'Total Sales', 
      value: '$8,540', 
      change: '+12.3%', 
      icon: <ReceiptIcon className="text-green-500" fontSize="large" />,
      link: '/vendor/tickets'
    },
    { 
      title: 'Total Attendees', 
      value: '1,245', 
      change: '+5.7%', 
      icon: <PeopleIcon className="text-purple-500" fontSize="large" />,
      link: '/vendor/attendees'
    },
    { 
      title: 'Revenue', 
      value: '$24,320', 
      change: '+8.2%', 
      icon: <RevenueIcon className="text-yellow-500" fontSize="large" />,
      link: '/vendor/analytics'
    },
  ];

  const upcomingEvents = [
    { id: 1, name: 'Tech Conference 2023', date: '2023-11-15', attendees: 320, status: 'Upcoming' },
    { id: 2, name: 'Music Festival', date: '2023-12-05', attendees: 850, status: 'Upcoming' },
    { id: 3, name: 'Business Workshop', date: '2023-11-22', attendees: 45, status: 'Upcoming' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white"></h1>
        <Link
          to="/vendor/create-event"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
        >
          <span className="mr-2">+</span> Create Event
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white dark:bg-black rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1 text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm mt-2 text-green-500 flex items-center">
                  <TrendingUpIcon fontSize="small" className="mr-1" />
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 rounded-full bg-indigo-50 dark:bg-gray-700">
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Events</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div key={event.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-white">{event.name}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      <span className="mx-2">•</span>
                      {event.attendees} attendees
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    {event.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No upcoming events. Create your first event to get started!</p>
              <Link
                to="/vendor/create-event"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Event
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/vendor/create-event"
              className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-md mr-3">
                <EventIcon className="text-indigo-600 dark:text-indigo-300" />
              </span>
              <span className="text-gray-700 dark:text-gray-300">Create New Event</span>
            </Link>
            <Link
              to="/vendor/events"
              className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="bg-green-100 dark:bg-green-900 p-2 rounded-md mr-3">
                <EventIcon className="text-green-600 dark:text-green-300" />
              </span>
              <span className="text-gray-700 dark:text-gray-300">Manage Events</span>
            </Link>
            <Link
              to="/vendor/analytics"
              className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-md mr-3">
                <TrendingUpIcon className="text-purple-600 dark:text-purple-300" />
              </span>
              <span className="text-gray-700 dark:text-gray-300">View Analytics</span>
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                  <PersonOutlined className="text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">New ticket sold</span> for Tech Conference 2023
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
            <div className="text-center">
              <Link to="/vendor/activity" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                View all activity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
