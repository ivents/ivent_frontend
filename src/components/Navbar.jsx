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
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserModeContext } from "../contexts/UserModeContext";
import Community from "../pages/public/community";
// import Blog from "../pages/public/blog";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userMode, setUserMode } = useContext(UserModeContext);

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    location.pathname === "/" ? navigate(0) : navigate("/");
  };

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-900 text-gray-300 py-2 px-[10%]">
      <Link to="/">
        <img className="h-8" src={logo} alt="Iventverse" />
      </Link>

      {!auth?.token ? (
        <Link className="flex items-center gap-2 btn btn-accent" to="/auth">
          <ExitToAppOutlined fontSize="inherit" />
          <span className="text-sm">Log in</span>
        </Link>
      ) : (
        <>
          {/* desktop menu */}
          <ul className="hidden md:flex items-center gap-2">
            {/* <li>
              <Link
                to={userMode === "vendor" ? "/vendor/create-event" : "/create-event"}
                className={`${location.pathname === (userMode === "vendor" ? "/vendor/create-event" : "/create-event") && "text-accent"
                  } flex items-center gap-2 btn hover:text-accent`}
              >
                <AddOutlined fontSize="inherit" />
                <span className="text-sm">Create event</span>
              </Link>
            </li> */}
            
            {/* <li>
              <Link
                to={userMode === "vendor" ? "/vendor/my-events" : "/my-events"}
                className={`${location.pathname === (userMode === "vendor" ? "/vendor/my-events" : "/my-events") && "text-accent"
                  } flex items-center gap-2 btn hover:text-accent`}
              >
                <SortOutlined fontSize="inherit" />
                <span className="text-sm">My events</span>
              </Link>
            </li> */}
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
          

            <li className="relative">
              <button
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 hover:bg-gray-700 hover:opacity-100 p-2 rounded-lg"
              >
                <img
                  src={auth.user.avatar}
                  alt="Avatar"
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-sm">{auth.user.first_name}</span>
                <ExpandMoreOutlined fontSize="inherit" />
              </button>

              {isProfileMenuOpen && (
                <ul
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="absolute top-14 p-4 min-w-64 rounded-lg right-0 bg-gray-800"
                >
                  <li>
                    <Link
                      to="/profile"
                      className={`${location.pathname === "/profile" && "text-accent"
                        } flex items-center gap-2 btn hover:text-accent`}
                    >
                      <PersonOutlined fontSize="inherit" />
                      <span className="text-sm">Profile</span>
                    </Link>
                  </li>

                  <Link>

                    <li className="flex items-center gap-2 btn hover:text-accent">
                      <Wallet fontSize="inherit" />
                      <span className="text-sm">Wallet</span>
                    </li>
                  </Link>

                  {/* <Link>

<li className="flex items-center gap-2 btn hover:text-accent">
  <ArticleOutlined fontSize="inherit" />
  <span className="text-sm">Blog</span>
</li>
</Link> */}

                  <Link>

                    <li className="flex items-center gap-2 btn hover:text-accent">
                      <Home fontSize="inherit" />
                      <span className="text-sm">Community</span>
                    </li>
                  </Link>

                  <Link>

<li className="flex items-center gap-2 btn hover:text-accent">
  <SupportAgentOutlined fontSize="inherit" />
  <span className="text-sm">Support</span>
</li>
</Link>


                  {/* User/Vendor Toggle - Always visible */}
                  <li>
                    <button 
                      onClick={() => {
                        if (userMode === "user") {
                          setUserMode("vendor");
                          navigate("/vendor/dashboard");
                        } else {
                          setUserMode("user");
                          navigate("/Home");
                        }
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
                  
                  {/**theme toggle button */}
                  <li>
                    <button 
                      onClick={toggleTheme} 
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

          {/* mobile menu */}
          {isMenuOpen && (
            <ul
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-14 right-[10%] bg-gray-900 px-4 py-8 rounded-md shadow-lg flex md:hidden flex-col items-start gap-2"
            >
              <li>
                <Link
                  to="/create-event"
                  className={`${location.pathname === "/create-event" && "text-accent"
                    } flex items-center gap-2 btn hover:text-accent`}
                >
                  <AddOutlined fontSize="inherit" />
                  <span className="text-sm">Create event</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-events"
                  className={`${location.pathname === "/my-events" && "text-accent"
                    } flex items-center gap-2 btn hover:text-accent`}
                >
                  <SortOutlined fontSize="inherit" />
                  <span className="text-sm">My events</span>
                </Link>
              </li>
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
              <li>
                <Link
                  to="/dashboard"
                  className={`${location.pathname === "/dashboard" && "text-accent"
                    } flex items-center gap-2 btn hover:text-accent`}
                >
                  <Wallet fontSize="inherit" />
                  <span className="text-sm">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to={userMode === "vendor" ? "/vendor/profile" : "/profile"}
                  className={`${location.pathname === (userMode === "vendor" ? "/vendor/profile" : "/profile") && "text-accent"
                    } flex items-center gap-2 btn hover:text-accent`}
                >
                  {auth.user.avatar ? (
                    <img
                      src={auth.user.avatar}
                      alt="Avatar"
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <PersonOutlined />
                  )}
                  <span className="text-sm">Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 btn hover:text-red-500"
                >
                  <LogoutOutlined fontSize="inherit" />
                  <span className="text-sm">Log out</span>
                </button>
              </li>
            </ul>
          )}

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="block md:hidden"
          >
            {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
