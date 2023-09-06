"use client";

import React, { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

export const User_data = createContext(null);

function Context({ children }) {
  const {user} = useAuthContext();
  const [userData, setUserData] = useState({
    email: user ? user.email : "",
    booking_date: "",
    bookings: []
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await fetch("/api/pullUserBookings", {
            method: "POST",
            body: JSON.stringify({
              email: user.email
            }),
          });
          const responseData = await response.json();
          setUserData(prevUserData => ({
            ...prevUserData,
            bookings: responseData.bookings
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <User_data.Provider value={{ userData, setUserData }}>
      {children}
    </User_data.Provider>  
  );
}

export default Context;
