// src/userContext.tsx
import React, { ReactNode, createContext, useState } from "react";
import api from "./lib/axios";
import { AxiosError } from "axios";


export type FlashMessage = {
  type: "success" | "error";
  message: string;
};

export type User = {
  userId: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  referralCode?: string;
  referredBy?: string;
  membership?: string;
  soundsEnabled?: boolean;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  flashMessage: FlashMessage | null;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => void;
};

// CONTEXT 

export const UserContext = createContext<UserContextType | undefined>(undefined);

// PROVIDER 

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);

  // LOGIN
  const handleLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      const userData: User = {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        referralCode: user.referralCode,
        referredBy: user.referredBy,
        membership: user.membership,
        soundsEnabled: user.soundsEnabled,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      setUser(userData);
      setFlashMessage({
        type: "success",
        message: "Login successful. Welcome back!",
      });

      return true;
    } catch (err) {
      const error = err as AxiosError<any>;

      setFlashMessage({
        type: "error",
        message:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      });

      return false;
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        flashMessage,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
