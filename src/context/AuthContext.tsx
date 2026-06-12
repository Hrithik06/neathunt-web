import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useLogout } from "@/features/auth/hooks/useLogout";

import type { User } from "@/types/user";
import React, { createContext, useContext } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  loginWithGoogle: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: user, isLoading } = useCurrentUser();

  const isAuthenticated = !!user;

  const { mutateAsync: logout } = useLogout();

  // move to auth.service.ts
  const loginWithGoogle = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    window.location.href = `${apiUrl}/api/auth/google`;
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, logout, loginWithGoogle }}
    >
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
