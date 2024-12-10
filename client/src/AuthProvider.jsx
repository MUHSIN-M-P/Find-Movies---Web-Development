import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login,setGuestSession } from './Store/authSlice';
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();



useEffect(() => {
  const checkAuth = async () => {
    try {
      
      const response = await fetch("http://localhost:5000/auth/user", {
        credentials: "include", 
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.user; 
        dispatch(login({ token })); 
      } else {
        console.error("Not authenticated");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  checkAuth();
}, [dispatch]);
  
  return <>{children}</>;
};
