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
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserModeContext } from "../contexts/UserModeContext";
import Community from "../pages/public/community";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
// import Blog from "../pages/public/blog";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userMode, setUserMode } = useContext(UserModeContext);

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || { user: { avatar: '', first_name: 'Guest' } });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Refs for handling outside clicks
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  
  // Close menus when clicking outside
  useOnClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));
  useOnClickOutside(mobileMenuRef, () => setIsMenuOpen(false));

  const handleLogout = () => {
    localStorage.removeItem("auth");
    location.pathname === "/" ? navigate(0) : navigate("/");
  };

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-900/95 backdrop-blur-sm text-gray-300 py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
      <Link to="/" className="flex-shrink-0">
        <img className="h-8 w-auto" src={logo} alt="Iventverse" />
      </Link>

      {!auth?.token ? (
        <Link className="flex items-center gap-2 btn btn-accent" to="/auth">
          <ExitToAppOutlined fontSize="inherit" />
          <span className="text-sm">Log in</span>
        </Link>
      ) : (
        <>
          {/* Desktop menu */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-3 ml-4">
            <li>
              <Link
                to="/tickets"
                className={`${location.pathname === "/tickets" && "text-accent"
                  } flex items-center gap-2 btn hover:text-accent`}
              >
                <ConfirmationNumberOutlined fontSize="inherit" />
                <span className="text-sm">Tickets</span>
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
                      onClick={() => {
                        if (userMode === "user") {
                          setUserMode("vendor");
                          navigate("/vendor/dashboard");
                        } else {
                          setUserMode("user");
                          navigate("/");
                        }
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between btn hover:text-accent"
                    >
                      <div className="flex items-center gap-2">
                        <People fontSize="inherit" />
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

                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 btn hover:text-red-400"
                    >
                      <LogoutOutlined fontSize="inherit" />
                      <span className="text-sm">Log out</span>
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            onClick={() => {
              setIsMenuOpen(prev => !prev);
              setIsProfileMenuOpen(false);
            }}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <CloseOutlined className="h-6 w-6" />
            ) : (
              <MenuOutlined className="h-6 w-6" />
            )}
          </button>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div 
              ref={mobileMenuRef}
              className="fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden"
            >
              <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
              <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-gray-900 overflow-y-auto">
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
                  <li>
                    <Link
                      to="/tickets"
                      className={`${location.pathname === "/tickets" && "text-accent"
                        } flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ConfirmationNumberOutlined fontSize="small" />
                      Tickets
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <PersonOutlined fontSize="small" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wallet"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Wallet fontSize="small" />
                      Wallet
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/community"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Home fontSize="small" />
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/support"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <SupportAgentOutlined fontSize="small" />
                      Support
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        if (userMode === "user") {
                          setUserMode("vendor");
                          navigate("/vendor/dashboard");
                        } else {
                          setUserMode("user");
                          navigate("/");
                        }
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-left text-gray-300 hover:bg-gray-800"
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
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-left text-gray-300 hover:bg-gray-800"
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
                      Log out
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