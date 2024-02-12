import { createContext, useContext, useState, useEffect } from "react";

import { registerRequest, loginRequest } from "../api/user";

// ******* CONTEXTO DEL USUARIO  ******* //
export const userContext = createContext();
export const useAuth = () => {
  const context = useContext(userContext)
  if (!context) {
    throw new Error("La autenticación useAuth debe de usarse como UserProvider");
  }
  return context;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    // ******* Recoge los datos al recarga la página ******* //
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    }
  }, [user]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(null);
  };

  return (
    <userContext.Provider value={{
      signup,
      signin,
      logout,
      user,
      isAuthenticated,
      errors,
    }}>
      {children}
    </userContext.Provider>
  )
}