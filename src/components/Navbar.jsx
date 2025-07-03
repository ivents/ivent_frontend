import {
  AddOutlined,
  ArticleOutlined,
  CloseOutlined,
  ConfirmationNumberOutlined,
  ExitToAppOutlined,
  ExpandMoreOutlined,
  Home,
  LightModeOutlined,
  DarkModeOutlined,
  LogoutOutlined,
  MenuOutlined,
  People,
  PersonOutlined,
  SortOutlined,
  SupportAgentOutlined,
  Wallet,
  StorefrontOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserModeContext } from "../contexts/UserModeContext";
import useOnClickOutside from "../hooks/useOnClickOutside";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userMode, toggleUserMode, isAuthenticated, isVendor } = useContext(UserModeContext);

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || { user: { avatar: '', first_name: 'Guest' } });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Handle user mode toggle with authentication check
  const handleUserModeToggle = async () => {
    try {
      const newMode = await toggleUserMode();
      
      // If toggleUserMode returned a mode (meaning it didn't redirect)
      if (newMode) {
        if (newMode === 'vendor' && !location.pathname.startsWith('/vendor')) {
          // If switching to vendor mode and not on a vendor page, go to vendor dashboard
          navigate('/vendor/dashboard');
        } else if (newMode === 'user' && location.pathname.startsWith('/vendor')) {
          // If switching to user mode and on a vendor page, go to home
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error toggling user mode:', error);
    }
  };
  
  // Refs for handling outside clicks
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Close menus when clicking outside
  useOnClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));
  useOnClickOutside(mobileMenuRef, () => setIsMenuOpen(false));

  const handleLogout = () => {
    if (userMode === 'vendor') {
      // Switch to user mode without clearing auth
      toggleUserMode('user');
      // Redirect to client side
      navigate('/');
    } else {
      // Regular user logout - clear all auth
      localStorage.removeItem("auth");
      location.pathname === "/" ? navigate(0) : navigate("/");
    }
  };

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-900/95 backdrop-blur-sm text-gray-300 py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
      <Link to="/" className="flex-shrink-0">
        <img className="h-8 w-auto" src={logo} alt="Iventverse" />
      </Link>
      
      {/* Mobile menu button - Only show when authenticated */}
      {auth?.token && (
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <CloseOutlined className="h-6 w-6" />
            ) : (
              <MenuOutlined className="h-6 w-6" />
            )}
          </button>
        </div>
      )}

      {!auth?.token ? (
        <div className="flex items-center gap-2">
          <Link className="flex items-center gap-2 btn btn-accent" to="/auth">
            <ExitToAppOutlined fontSize="inherit" />
            <span className="text-sm">Log in</span>
          </Link>
          <Link 
            to="/vendor-auth" 
            className="flex items-center gap-2 btn btn-outline border-gray-600 hover:bg-gray-800/50"
          >
            <SupportAgentOutlined fontSize="inherit" />
            <span className="text-sm">Vendor Login</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-3 ml-4">
            <li>
              <Link
                to="/my-events"
                className={`${location.pathname === "/my-events" ? "text-accent" : ""} flex items-center gap-2 btn hover:text-accent`}
              >
                <ConfirmationNumberOutlined fontSize="inherit" />
                <span className="text-sm">My Events</span>
              </Link>
            </li>
            
            <li>
              <Link
                to="/ticket-purchase"
                className={`${location.pathname.startsWith("/ticket-purchase") ? "text-accent" : ""} flex items-center gap-2 btn hover:text-accent`}
              >
                <ConfirmationNumberOutlined fontSize="inherit" />
                <span className="text-sm">Buy Ticket</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tickets" 
                className={`${location.pathname === "/tickets" ? "text-accent" : ""} flex items-center gap-2 btn hover:text-accent`}
              >
                <ArticleOutlined fontSize="inherit" />
                <span className="text-sm">My Tickets</span>
              </Link>
            </li>

            <li className="relative" ref={profileMenuRef}>
              <button
                onClick={() => {
                  setIsProfileMenuOpen(prev => !prev);
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 hover:bg-gray-800/50 hover:opacity-100 p-2 rounded-lg transition-colors duration-200"
                aria-expanded={isProfileMenuOpen}
                aria-haspopup="true"
              >
                {auth?.user?.avatar ? (
                  <img
                    src={auth.user.avatar}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=' + (auth.user.first_name || 'User') + '&background=4f46e5&color=fff';
                    }}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <PersonOutlined className="text-gray-300" />
                  </div>
                )}
                <span className="text-sm font-medium hidden lg:inline">{auth.user?.first_name || 'User'}</span>
                <ExpandMoreOutlined className="text-gray-400" />
              </button>

              {isProfileMenuOpen && (
                <ul
                  className="absolute top-14 right-0 w-64 bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-200 transform origin-top-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <li>
                    <Link
                      to="/profile"
                      className={`${location.pathname === "/profile" && "text-accent"
                        } flex items-center gap-2 btn hover:text-accent`}
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <PersonOutlined fontSize="inherit" />
                      <span className="text-sm">Profile</span>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/wallet" 
                      className="flex items-center gap-2 btn hover:text-accent"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Wallet fontSize="inherit" />
                      <span className="text-sm">Wallet</span>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/community" 
                      className="flex items-center gap-2 btn hover:text-accent"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Home fontSize="inherit" />
                      <span className="text-sm">Community</span>
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/support" 
                      className="flex items-center gap-2 btn hover:text-accent"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <SupportAgentOutlined fontSize="inherit" />
                      <span className="text-sm">Support</span>
                    </Link>
                  </li>

                  {/* User/Vendor Toggle */}
                  <li>
                    <button
                      onClick={async () => {
                        try {
                          await handleUserModeToggle();
                          setIsProfileMenuOpen(false);
                        } catch (error) {
                          console.error('Error toggling user mode:', error);
                        }
                      }}
                      className="w-full flex items-center justify-between btn hover:text-accent"
                    >
                      <div className="flex items-center gap-2">
                        {userMode === "user" ? (
                          <SupportAgentOutlined fontSize="inherit" />
                        ) : (
                          <PersonOutlined fontSize="inherit" />
                        )}
                        <span className="text-sm">
                          {userMode === "user" ? "Switch to Vendor Mode" : "Switch to User Mode"}
                        </span>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${userMode === "user" ? "bg-gray-600" : "bg-accent"}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userMode === "user" ? "translate-x-1" : "translate-x-6"}`} />
                      </div>
                    </button>
                  </li>

                  {/* Theme toggle button */}
                  <li>
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between btn hover:text-accent"
                    >
                      <div className="flex items-center gap-2">
                        {theme === "dark" ? (
                          <LightModeOutlined fontSize="inherit" />
                        ) : (
                          <DarkModeOutlined fontSize="inherit" />
                        )}
                        <span className="text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === "dark" ? "bg-gray-600" : "bg-accent"}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-1" : "translate-x-6"}`} />
                      </div>
                    </button>
                  </li>

                  {/* <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 btn hover:text-red-400"
                    >
                      <LogoutOutlined fontSize="inherit" />
                      <span className="text-sm">
                        {userMode === 'vendor' ? 'Exit Vendor Mode' : 'Log out'}
                      </span>
                    </button>
                  </li> */}
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile menu - Fixed positioning */}
          {isMenuOpen && (
            <div 
              ref={mobileMenuRef}
              className="fixed inset-0 z-[9999] md:hidden"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                pointerEvents: 'auto',
              }}
            >
              <div 
                className="absolute inset-0 bg-black/70" 
                onClick={() => setIsMenuOpen(false)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                }}
              />
              <div 
                className="absolute inset-y-0 left-0 w-4/5 max-w-xs bg-gray-900 overflow-y-auto shadow-2xl"
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  height: '100vh',
                  transform: 'translateX(0)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3 px-2 py-3">
                  {auth?.user?.avatar ? (
                    <img
                      src={auth.user.avatar}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border-2 border-gray-700"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <PersonOutlined className="text-gray-300" />
                    </div>
                  )}
                    <div>
                      <p className="text-sm font-medium text-white">{auth?.user?.first_name || 'Guest'}</p>
                      <p className="text-xs text-gray-400">{auth?.user?.email || 'guest@example.com'}</p>
                    </div>
                  </div>
                </div>
                <ul className="py-2">
                  {userMode === "user" ? (
                    <>
                      <li>
                        <Link
                          to="/"
                          className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            location.pathname === "/" ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <Home className="mr-3 h-5 w-5 text-gray-400" />
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/my-events"
                          className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            location.pathname === "/my-events" ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <ConfirmationNumberOutlined className="mr-3 h-5 w-5 text-gray-400" />
                          My Events
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tickets"
                          className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            location.pathname === "/tickets" ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <ArticleOutlined className="mr-3 h-5 w-5 text-gray-400" />
                          My Tickets
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            location.pathname === "/profile" ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <PersonOutlined className="mr-3 h-5 w-5 text-gray-400" />
                          Profile
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/vendor/dashboard"
                          className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            location.pathname === "/vendor/dashboard" ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <Home className="mr-3 h-5 w-5 text-gray-400" />
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/vendor/events"
                          className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            location.pathname.startsWith("/vendor/events") ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <ConfirmationNumberOutlined className="mr-3 h-5 w-5 text-gray-400" />
                          My Events
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/vendor/create-event"
                          className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            location.pathname === "/vendor/create-event" ? "bg-gray-100 dark:bg-gray-700" : ""
                          }`}
                        >
                          <AddOutlined className="mr-3 h-5 w-5 text-gray-400" />
                          Create Event
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        const newMode = toggleUserMode();
                        navigate(newMode === "user" ? "/" : "/vendor/dashboard");
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <People fontSize="small" />
                        {userMode === "user" ? "Switch to Vendor Mode" : "Switch to User Mode"}
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${userMode === "user" ? "bg-gray-600" : "bg-accent"}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${userMode === "user" ? "translate-x-1" : "translate-x-6"}`} />
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        {theme === 'dark' ? (
                          <>
                            <LightModeOutlined fontSize="small" />
                            Light Mode
                          </>
                        ) : (
                          <>
                            <DarkModeOutlined fontSize="small" />
                            Dark Mode
                          </>
                        )}
                      </div>
                      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === "dark" ? "bg-gray-600" : "bg-accent"}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-1" : "translate-x-6"}`} />
                      </div>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 w-full text-sm text-left text-red-500 hover:bg-gray-800"
                    >
                      <LogoutOutlined fontSize="small" />
                      {userMode === 'vendor' ? 'Exit Vendor Mode' : 'Log out'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
