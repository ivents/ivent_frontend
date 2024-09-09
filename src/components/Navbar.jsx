import {
  AddOutlined,
  CloseOutlined,
  ConfirmationNumberOutlined,
  ExitToAppOutlined,
  ExpandMoreOutlined,
  LogoutOutlined,
  MenuOutlined,
  PersonOutlined,
  SortOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
            <li>
              <Link
                to="/create-event"
                className={`${
                  location.pathname === "/create-event" && "text-accent"
                } flex items-center gap-2 btn hover:text-accent`}
              >
                <AddOutlined fontSize="inherit" />
                <span className="text-sm">Create event</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-events"
                className={`${
                  location.pathname === "/my-events" && "text-accent"
                } flex items-center gap-2 btn hover:text-accent`}
              >
                <SortOutlined fontSize="inherit" />
                <span className="text-sm">My events</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tickets"
                className={`${
                  location.pathname === "/tickets" && "text-accent"
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
                  className="absolute top-14 p-4 min-w-40 rounded-lg right-0 bg-gray-800"
                >
                  <li>
                    <Link
                      to="/profile"
                      className={`${
                        location.pathname === "/profile" && "text-accent"
                      } flex items-center gap-2 btn hover:text-accent`}
                    >
                      <PersonOutlined fontSize="inherit" />
                      <span className="text-sm">Profile</span>
                    </Link>
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
                  className={`${
                    location.pathname === "/create-event" && "text-accent"
                  } flex items-center gap-2 btn hover:text-accent`}
                >
                  <AddOutlined fontSize="inherit" />
                  <span className="text-sm">Create event</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-events"
                  className={`${
                    location.pathname === "/my-events" && "text-accent"
                  } flex items-center gap-2 btn hover:text-accent`}
                >
                  <SortOutlined fontSize="inherit" />
                  <span className="text-sm">My events</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tickets"
                  className={`${
                    location.pathname === "/tickets" && "text-accent"
                  } flex items-center gap-2 btn hover:text-accent`}
                >
                  <ConfirmationNumberOutlined fontSize="inherit" />
                  <span className="text-sm">Tickets</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`${
                    location.pathname === "/profile" && "text-accent"
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
