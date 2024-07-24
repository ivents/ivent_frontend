import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>Navigation</nav>
      <Outlet />
    </>
  );
};

export default Layout;
