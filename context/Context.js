"use client";

import React, { createContext, useState } from "react";
import { useAuthContext } from "./AuthContext";

export const User_data = createContext(null);

function Context({ children }) {
  const {user} = useAuthContext();

  const [userData, setUserData] = useState({
    email: user ? user.email : "",
    name: "",
    contact_number: "",
    booking_date: "",
    booking_time: "",
    guest_amount: "",
  });

  return (
    <User_data.Provider value={{ userData, setUserData }}>
      {children}
    </User_data.Provider>  
  );
}

export default Context;
