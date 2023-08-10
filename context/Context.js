"use client";

import React, { createContext, useState } from "react";

export const Booking_data = createContext(null);

function Context({ children }) {
  const [booking, setBooking] = useState({
    user_info: {},
    booking_date: "",
    booking_time: "",
    guest_amount: "",
  });

  return (
    <Booking_data.Provider value={{ booking, setBooking }}>
      {children}
    </Booking_data.Provider>
  );
}

export default Context;
