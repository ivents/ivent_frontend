import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Layout mounted or location changed:', location.pathname);
    return () => {
      console.log('Layout unmounting');
    };
  }, [location]);
  
  console.log('Rendering Layout component');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
