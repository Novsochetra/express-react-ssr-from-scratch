import { createContext, useContext } from "react";
const AuthContext = createContext({
  isAuthenticated: false,
});

export const AuthProvider = ({ children, isAuthenticated }) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
