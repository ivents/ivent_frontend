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

export const PrivateRoutesLayout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

  useEffect(() => {
    if (!auth?.token) {
      navigate("/auth");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
