import React, { createContext, useState, useContext, ReactNode } from "react";
import { AuthUser } from "@/types";
import { mockLogin, mockRegister } from "@/services/authService";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<AuthUser>;
  register: (name: string, email: string, pass: string) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (email: string, pass: string) => {
    const loggedUser = await mockLogin(email, pass);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (name: string, email: string, pass: string) => {
    const registeredUser = await mockRegister(name, email, pass);
    setUser(registeredUser);
    return registeredUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
