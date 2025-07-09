import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const UserModeContext = createContext();

// Custom hook to use the user mode context
export const useUserMode = () => {
  const context = useContext(UserModeContext);
  if (context === undefined) {
    throw new Error('useUserMode must be used within a UserModeProvider');
  }
  return context;
};

export const UserModeProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Initialize state with a function to avoid checking localStorage on every render
  const [userMode, _setUserMode] = useState(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      // If user is not authenticated, default to user mode
      if (!auth?.token) return "user";
      // If authenticated, check if they have a saved mode, otherwise use their default mode
      return localStorage.getItem("userMode") || (auth?.user?.is_vendor ? "vendor" : "user");
    }
    return "user";
  });

  // Check authentication status
  const isAuthenticated = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    return !!auth?.token;
  }, []);

  // Check if current user is a vendor
  const isVendor = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    return auth?.user?.is_vendor === true;
  }, []);

  // Wrapped in useCallback to prevent unnecessary re-renders
  const setUserMode = useCallback((mode) => {
    _setUserMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem("userMode", mode);
    }
  }, []);

  // Function to toggle userMode
  const toggleUserMode = useCallback((newMode) => {
    const nextMode = newMode || (userMode === "user" ? "vendor" : "user");
    
    // If switching to vendor mode
    if (nextMode === "vendor") {
      // If not authenticated, redirect to login
      if (!isAuthenticated()) {
        const currentPath = window.location.pathname + window.location.search;
        navigate(`/auth?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }
      // If authenticated but not a vendor, redirect to vendor auth
      if (!isVendor()) {
        const currentPath = window.location.pathname + window.location.search;
        navigate(`/vendor-auth?mode=switch-to-vendor`, { 
          state: { from: { pathname: currentPath } } 
        });
        return;
      }
    }
    
    // If switching to user mode or already has required permissions
    setUserMode(nextMode);
    // Return the new mode for the caller to use if needed
    return nextMode;
    
  }, [userMode, isAuthenticated, isVendor, navigate, setUserMode]);

  // Check authentication on mount and when userMode changes
  useEffect(() => {
    if (userMode === "vendor" && isAuthenticated() && !isVendor()) {
      // User is authenticated but not as a vendor, redirect to vendor auth
      const currentPath = window.location.pathname + window.location.search;
      navigate(`/vendor-auth?mode=switch-to-vendor`, { 
        state: { from: { pathname: currentPath } } 
      });
    }
  }, [userMode, isAuthenticated, isVendor, navigate]);

  return (
    <UserModeContext.Provider value={{ 
      userMode, 
      setUserMode,
      toggleUserMode,
      isAuthenticated,
      isVendor
    }}>
      {children}
    </UserModeContext.Provider>
  );
};
