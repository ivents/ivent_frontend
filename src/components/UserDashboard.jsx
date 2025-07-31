import React from "react";
import { useContext } from "react";
import { UserModeContext } from "../contexts/UserModeContext";

const UserDashboard = () => {
  const { userMode } = useContext(UserModeContext);

  return (
    <div className="p-8">
      {userMode === "user" ? (
        <div className="user-content">
          <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              <p className="text-gray-600 dark:text-gray-300">View all your upcoming event bookings.</p>
              <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md">View Events</button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">My Tickets</h2>
              <p className="text-gray-600 dark:text-gray-300">Access and manage all your event tickets.</p>
              <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md">View Tickets</button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Explore Events</h2>
              <p className="text-gray-600 dark:text-gray-300">Discover new events based on your interests.</p>
              <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md">Explore</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="vendor-content">
          <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Manage Events</h2>
              <p className="text-gray-600 dark:text-gray-300">Create and manage your events.</p>
              <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md">Manage Events</button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
              <p className="text-gray-600 dark:text-gray-300">View analytics for your event sales.</p>
              <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md">View Analytics</button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
              <p className="text-gray-600 dark:text-gray-300">Manage customer information and communications.</p>
              <button className="mt-4 bg-accent text-white px-4 py-2 rounded-md">Manage Customers</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
