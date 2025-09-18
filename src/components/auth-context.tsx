import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { loginUser, saveAuth, getAuth, clearAuth } from "../services/authService";

export type UserRole = 'customer' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  // 🔹 Restore on mount
  useEffect(() => {
    const storedAuth = getAuth();
    if (storedAuth?.user) {
      setUser(storedAuth.user);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await loginUser({ email, password });
    if (result?.token && result?.user) {
      saveAuth(result);
      setUser(result.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    clearAuth();

    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      // 🔹 also update localStorage so it persists after refresh
      const storedAuth = getAuth();
      if (storedAuth) {
        saveAuth({ ...storedAuth, user: updatedUser });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
