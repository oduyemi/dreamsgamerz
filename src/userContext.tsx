import React, { createContext, useState } from "react";
import api from "./lib/axios";

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState(null);

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const handleLogin = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      const { token, user } = res.data;

      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          referralCode: user.referralCode,
          referredBy: user.referredBy,
          membership: user.membership,
          soundsEnabled: user.soundsEnabled,
        })
      );

      localStorage.setItem("token", token);

      setUser({
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        referralCode: user.referralCode,
        referredBy: user.referredBy,
        membership: user.membership,
        soundsEnabled: user.soundsEnabled,
      });      

      setFlashMessage({
        type: "success",
        message: "Login successful. Welcome back!",
      });
    } catch (error) {
      setFlashMessage({
        type: "error",
        message:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      });
    }
  };

  const handleSignout = () => {
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
        handleSignout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
