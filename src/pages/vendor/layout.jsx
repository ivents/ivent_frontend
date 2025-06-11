import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  EventOutlined,
  LogoutOutlined,
  MenuOutlined,
  PersonOutlined,
  ReceiptOutlined,
  SettingsOutlined,
  CloseOutlined,
  LightModeOutlined,
  DarkModeOutlined,
  AnalyticsOutlined,
  AddCircleOutlineOutlined,
  ConfirmationNumberOutlined,
  PeopleAltOutlined
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const VendorLayout = () => {
  console.log('VendorLayout rendering...');
  console.log('Current path:', window.location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')));

  // Check if user is authenticated
  useEffect(() => {
    console.log('Checking authentication...');
    try {
      const auth = JSON.parse(localStorage.getItem('auth') || 'null');
      console.log('Auth data from localStorage:', auth);
      
      if (!auth?.token) {
        console.log('No auth token found, redirecting to login');
        navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname));
      } else {
        console.log('User is authenticated, setting auth state');
        setAuth(auth);
      }
    } catch (error) {
      console.error('Error parsing auth data:', error);
      navigate('/auth?redirect=' + encodeURIComponent(window.location.pathname));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/auth/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { 
      to: '/vendor/dashboard', 
      icon: <DashboardOutlined />, 
      label: 'Dashboard' 
    },
    { 
      to: '/vendor/profile', 
      icon: <PersonOutlined />, 
      label: 'Profile' 
    },
    { 
      to: '/vendor/events', 
      icon: <EventOutlined />, 
      label: 'Events' 
    },
    { 
      to: '/vendor/create-event', 
      icon: <AddCircleOutlineOutlined />, 
      label: 'Create Event' 
    },
    { 
      to: '/vendor/tickets', 
      icon: <ConfirmationNumberOutlined />, 
      label: 'Tickets' 
    },
    { 
      to: '/vendor/attendees', 
      icon: <PeopleAltOutlined />, 
      label: 'Attendees' 
    },
    { 
      to: '/vendor/analytics', 
      icon: <AnalyticsOutlined />, 
      label: 'Analytics' 
    },
    
    { 
      to: '/vendor/settings', 
      icon: <SettingsOutlined />, 
      label: 'Settings' 
    },
  ];

  console.log('Rendering VendorLayout with auth:', auth);
  
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {!auth?.token && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">Checking authentication...</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Please wait while we verify your session.</p>
          </div>
        </div>
      )}
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-screen pt-16 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-black text-white dark:bg-black dark:border-gray-700 md:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center p-2 rounded-lg hover:bg-purple-400 dark:hover:bg-purple-400 ${
                    location.pathname === item.to
                      ? 'bg-[#884cff] dark:bg-[#884cff] text-white dark:text-white'
                      : 'text-white dark:text-white'
                  }`}
                  onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                >
                  <span className="w-6 flex justify-center">{item.icon}</span>
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-2 text-red-600 dark:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="w-6 flex justify-center"><LogoutOutlined /></span>
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Navbar */}
      <nav className="fixed top-0 right-0 z-20 w-full md:pl-64 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 mr-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:hidden"
            >
              <MenuOutlined />
            </button>
            <h1 className="text-xl font-semibold text-black dark:text-white">
              {navItems.find(item => item.to === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <PersonOutlined className="text-indigo-600 dark:text-indigo-300" />
                </div>
                <span className="hidden md:inline text-gray-700 dark:text-gray-300">
                  {auth?.user?.name?.split(' ')[0] || 'Account'}
                </span>
              </button>
              
              {isProfileMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {auth?.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {auth?.user?.email || ''}
                    </p>
                  </div>
                  
                  {/* User/Vendor Toggle */}
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vendor Mode</span>
                      <button
                        onClick={() => {
                          navigate('/Home');
                        }}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-accent"
                      >
                        <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Switch back to user mode</p>
                  </div>
                  
                  <Link
                    to="/vendor/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <PersonOutlined className="mr-3 text-gray-500" /> Profile
                  </Link>
                  <Link
                    to="/vendor/settings"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <SettingsOutlined className="mr-2" /> Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <LogoutOutlined className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16 px-4 md:pl-64 min-h-screen">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendorLayout;
