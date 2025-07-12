import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("quickbillUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("quickbillUser", JSON.stringify(userData));
    localStorage.setItem("quickbillToken", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("quickbillUser");
    localStorage.removeItem("quickbillToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
