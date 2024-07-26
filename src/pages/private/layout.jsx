import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
      <p>Navigation</p>
      <Outlet />
    </>
  );
};
