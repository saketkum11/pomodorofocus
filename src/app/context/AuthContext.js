"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState("");
  const signUp = async (user) => {
    try {
      const response = await axios.post("/api/user/signup", user);
      setUserData(response.data.savedUser);
    } catch (error) {
      console.error(error);
    }
  };
  const login = async (user) => {
    try {
      const response = await axios.post("/api/user/login", user);
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider value={{ signUp, login, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
export { useAuth, AuthProvider };
