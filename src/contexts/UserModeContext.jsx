import { createContext, useState, useEffect, useContext, useCallback } from "react";

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
  // Check if user has a mode preference stored in localStorage
  // Default to 'user' if none is found
  const [userMode, _setUserMode] = useState(
    localStorage.getItem("userMode") || "user"
  );

  // Wrapped in useCallback to prevent unnecessary re-renders
  const setUserMode = useCallback((mode) => {
    _setUserMode(mode);
    localStorage.setItem("userMode", mode);
  }, []);

  // Function to toggle userMode
  const toggleUserMode = useCallback((newMode) => {
    const nextMode = newMode || (userMode === "user" ? "vendor" : "user");
    setUserMode(nextMode);
    return nextMode;
  }, [userMode, setUserMode]);

  return (
    <UserModeContext.Provider value={{ 
      userMode, 
      setUserMode,
      toggleUserMode 
    }}>
      {children}
    </UserModeContext.Provider>
  );
};
