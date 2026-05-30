import { http } from "@/services/http";
import type { User } from "@/types/user";
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;
  useEffect(() => {
    // On mount, check token validity with server
    async function checkAuth() {
      try {
        const response = await http.get(`/user/me`, {
          withCredentials: true,
        });

        setUser(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);

  const logout = async () => {
    console.log("TEST");
    try {
      console.log("Logout Try");
      const response = await http.get(`/auth/logout`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status) {
        setUser(null);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
