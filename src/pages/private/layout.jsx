import {
  AddOutlined,
  AirplaneTicketOutlined,
  ConfirmationNumberOutlined,
  EventNoteOutlined,
  LogoutOutlined,
  PersonOutlined,
  SearchOutlined,
  SortOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export const PrivateRoutesLayout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  useEffect(() => {
    if (!auth?.token) {
      navigate("/auth");
    }
  }, []);

  if (!auth?.token) {
    return null; // Will be redirected by the effect
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
