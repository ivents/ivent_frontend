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
  PeopleAltOutlined,
  CampaignOutlined,
  HelpCenterOutlined,
  AccountBalanceWalletOutlined,
  GroupsOutlined,
  SupportOutlined
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
      label: 'Overview' 
    },
    { 
      to: '/vendor/create-event', 
      icon: <AddCircleOutlineOutlined />, 
      label: 'Create Event' 
    },
    { 
      to: '/vendor/eventlisting', 
      icon: <ConfirmationNumberOutlined />, 
      label: 'Event Listing' 
    },
    { 
      to: '/vendor/ticketmanagement', 
      icon: <AnalyticsOutlined />, 
      label: 'Ticket Management' 
    },
    { 
      to: '/vendor/analysis-and-report', 
      icon: <AnalyticsOutlined />, 
      label: 'Analysis and Report' 
    },
    // {  
    //   to: '/vendor/settings', 
    //   icon: <CampaignOutlined />, 
    //   label: 'Marketing' 
    // },
    { 
      to: '/vendor/help', 
      icon: <HelpCenterOutlined />, 
      label: 'Help & Support' 
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
      <nav className="sticky top-0 p-0 right-0 z-50 w-full md:pl-64 dark:bg-black">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 mr-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:hidden"
            >
              <MenuOutlined />
            </button>
            {/* Page title removed as per user request */}
          </div>
          
          {/**light/dark mode */}
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
                  className="absolute right-0 mt-2 w-64 bg-slate-800 dark:bg-slate-800 rounded-xl shadow-xl py-4 z-50"
                  onMouseLeave={() => setIsProfileMenuOpen(false)}
                >
                  {/* User info header */}
                  <div className="px-6 py-3 mb-2">
                    <p className="text-base font-medium text-white">
                      User
                    </p>
                    <p className="text-sm text-slate-400 truncate">
                      {auth?.user?.email || 'jeffibezoo.001@gmail.com'}
                    </p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="space-y-1">
                    <Link
                      to="/vendor/profile"
                      className="flex items-center px-6 py-3 text-white hover:bg-slate-700 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <PersonOutlined className="mr-4 text-white w-5 h-5" /> 
                      <span className="text-base">Profile</span>
                    </Link>
                    
                    <Link
                      to="/vendor/wallet"
                      className="flex items-center px-6 py-3 text-white hover:bg-slate-700 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <AccountBalanceWalletOutlined className="mr-4 text-white w-5 h-5" /> 
                      <span className="text-base">Wallet</span>
                    </Link>
                    
                    {/* <Link
                      to="/vendor/community"
                      className="flex items-center px-6 py-3 text-white hover:bg-slate-700 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <GroupsOutlined className="mr-4 text-white w-5 h-5" /> 
                      <span className="text-base">Community</span>
                    </Link> */}
                    
                    {/* <Link
                      to="/vendor/support"
                      className="flex items-center px-6 py-3 text-white hover:bg-slate-700 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <SupportOutlined className="mr-4 text-white w-5 h-5" /> 
                      <span className="text-base">Support</span>
                    </Link> */}
                  </div>
                  
                  {/* Toggle Section */}
                  <div className="px-6 py-4 space-y-4">
                    {/* Switch to User Mode */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <PeopleAltOutlined className="mr-4 text-white w-5 h-5" />
                        <div>
                          <span className="text-white text-base block">Switch to User</span>
                          <span className="text-white text-base block">Mode</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          navigate('/Home');
                        }}
                        className="relative inline-flex h-6 w-12 items-center rounded-full bg-purple-600 transition-colors"
                      >
                        <span className="inline-block h-4 w-4 transform translate-x-7 rounded-full bg-white transition-transform" />
                      </button>
                    </div>
                    
                    {/* Light Mode Toggle */}
                    {/* <div className="flex items-center justify-between"> */}
                      {/* <div className="flex items-center">
                        <LightModeOutlined className="mr-4 text-white w-5 h-5" />
                        <span className="text-white text-base">Light Mode</span>
                      </div> */}
                      {/* <button
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          theme === 'light' ? 'bg-purple-600' : 'bg-gray-500'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          theme === 'light' ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button> */}
                    {/* </div> */}
                  </div>
                  
                  {/* Logout */}
                  <div className="px-6 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center py-3 text-red-400 hover:bg-slate-700 transition-colors rounded-lg px-0"
                    >
                      <LogoutOutlined className="mr-4 w-5 h-5" /> 
                      <span className="text-base">Log out</span>
                    </button>
                  </div>
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