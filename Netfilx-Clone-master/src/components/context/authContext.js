import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Import jwt_decode

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = async (email, password) => {
    let responses;
    try {
      responses = await axios.post("http://localhost:3001/api/user/sign-in", {
        email: email,
        password: password,
      });

      localStorage.setItem("refresh_token", JSON.stringify(responses.data.response.refresh_token));

      // Giải mã access token để lấy thông tin người dùng
      const decodedToken = jwt_decode(responses.data.response.access_token);

      // Lưu cả access token và thông tin người dùng vào user
      setUser({ ...decodedToken, access_token: responses.data.response.access_token });
      // Lưu user vào localStorage
      localStorage.setItem("user", JSON.stringify(user));
      console.log('123',responses);
      
      
    } catch (error) {
      console.error("Login failed:", error);
    }
    return responses;
  };

  useEffect(() => {
    
    // Lưu user vào localStorage
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};