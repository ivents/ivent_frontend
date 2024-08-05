import {
  AddOutlined,
  ConfirmationNumberOutlined,
  ExitToAppOutlined,
  PersonOutlined,
  SortOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

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
          <span className="text-sm">Sign up</span>
        </Link>
      ) : (
        <ul className="flex items-center gap-2">
          <li>
            <Link
              to="/create-event"
              className="flex items-center gap-2 btn hover:text-accent"
            >
              <AddOutlined fontSize="inherit" />
              <span className="text-sm">Create event</span>
            </Link>
          </li>
          <li>
            <Link
              to="/my-events"
              className="flex items-center gap-2 btn hover:text-accent"
            >
              <SortOutlined fontSize="inherit" />
              <span className="text-sm">My events</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tickets"
              className="flex items-center gap-2 btn hover:text-accent"
            >
              <ConfirmationNumberOutlined fontSize="inherit" />
              <span className="text-sm">Tickets</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-2 btn hover:text-accent"
            >
              <PersonOutlined fontSize="inherit" />
              <span className="text-sm">Profile</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
