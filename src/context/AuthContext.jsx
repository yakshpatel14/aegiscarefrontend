import { createContext, useContext, useState } from "react";
import { ROLE_PERMISSIONS } from "../data/permissions";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("egiscare_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login user
  const login = (userData) => {
    localStorage.setItem(
      "egiscare_user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("egiscare_user");
    setUser(null);
  };

  // Check whether the logged-in user has a permission
  const hasPermission = (permission) => {
    if (!user) {
      return false;
    }

    return ROLE_PERMISSIONS[user.role]?.[permission] ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access authentication
export function useAuth() {
  return useContext(AuthContext);
}