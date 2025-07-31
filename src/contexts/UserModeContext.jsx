import { createContext, useState, useEffect } from "react";

export const UserModeContext = createContext();

export const UserModeProvider = ({ children }) => {
  // Check if user has a mode preference stored in localStorage
  // Default to 'user' if none is found
  const [userMode, setUserMode] = useState(
    localStorage.getItem("userMode") || "user"
  );

  // Update userMode in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userMode", userMode);
    
    // You can add additional logic here if needed when userMode changes
  }, [userMode]);

  // Function to toggle userMode
  const toggleUserMode = () => {
    setUserMode(prevMode => prevMode === "user" ? "vendor" : "user");
  };

  return (
    <UserModeContext.Provider value={{ userMode, toggleUserMode }}>
      {children}
    </UserModeContext.Provider>
  );
};
