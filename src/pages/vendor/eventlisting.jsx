import React, { useState } from 'react';

export default function EventListing() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
  ];

  const events = [
    { id: 1, title: "Sustainable Dev", date: "August 2, 2023", ticketsSold: 196, status: "Completed" },
    { id: 2, title: "Portfolio Review", date: "September 9, 2023", ticketsSold: 0, status: "Draft" },
    { id: 3, title: "Demo Day", date: "October 30, 2023", ticketsSold: 0, status: "Pending approval" },
    { id: 4, title: "Demo Day", date: "November 7, 2023", ticketsSold: 0, status: "Pending approval" },
    { id: 5, title: "Hackathon", date: "May 6, 2023", ticketsSold: 0, status: "Draft" },
    { id: 6, title: "Framer Workshop", date: "February 28, 2023", ticketsSold: 447, status: "Completed" },
    { id: 7, title: "Launch Party", date: "May 9, 2023", ticketsSold: 0, status: "Draft" },
    { id: 8, title: "Member Retreat", date: "February 29, 2023", ticketsSold: 583, status: "Completed" },
    { id: 9, title: "Movie Night", date: "October 31, 2023", ticketsSold: 357, status: "Completed" },
    { id: 10, title: "Framer Workshop", date: "August 24, 2023", ticketsSold: 798, status: "Completed" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Draft':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'Pending approval':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    // Here you would typically fetch filtered events based on the selected filter
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-8 bg-white dark:bg-black'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
        <div className='flex-1'>
          <h1 className='text-2xl font-bold text-black dark:text-white'>Event Listing</h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Here is a list of all the events you have created since you joined the platform
          </p>
        </div>

        <div className='w-full md:w-auto'>
          <ul className='flex gap-2 text-black dark:text-white'>
            {filters.map((filter) => (
              <li key={filter.id}>
                <button
                  onClick={() => handleFilterClick(filter.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-ivent dark:bg-purple-900 text-white dark:text-purple-200 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Events Table */}
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
            <thead className='bg-ivent dark:bg-gray-700 text-white'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                  S/N
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                  Event Title
                </th>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider'>
                  Ticket Sold
                </th>
                <th scope='col' className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
              {events.map((event) => (
                <tr key={event.id} className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium'>
                    {event.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900 dark:text-white'>{event.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-600 dark:text-gray-300'>{event.date}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <div className='text-sm text-gray-900 dark:text-white font-medium'>{event.ticketsSold}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}