import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VendorLogin from "./components/VendorLogin";
import VendorSignup from "./components/VendorSignup";
import { useUserMode } from "../../../contexts/UserModeContext";

const VendorAuth = () => {
  const [visibleComponent, setVisibleComponent] = useState("login");
  const { userMode, setUserMode } = useUserMode();
  const location = useLocation();
  const navigate = useNavigate();

  // Check for redirect from mode switch
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    
    if (mode === 'switch-to-vendor') {
      // Check if already authenticated as vendor
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      if (auth && auth.user && auth.user.is_vendor) {
        // Already authenticated as vendor, redirect to vendor dashboard
        navigate("/vendor/dashboard");
      }
      // Otherwise, stay on vendor auth page
    }
  }, [location.search, navigate]);

  // Set user mode to vendor when on vendor auth pages
  useEffect(() => {
    setUserMode("vendor");
  }, [setUserMode]);

  if (visibleComponent === "signup") {
    return (
      <VendorSignup 
        setVisibleComponent={setVisibleComponent} 
        prevPage={location.state?.from?.pathname || "/vendor/dashboard"} 
      />
    );
  } else {
    return (
      <VendorLogin 
        setVisibleComponent={setVisibleComponent} 
        prevPage={location.state?.from?.pathname || "/vendor/dashboard"} 
      />
    );
  }
};

export default VendorAuth;
