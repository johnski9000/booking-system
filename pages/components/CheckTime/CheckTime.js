"use client"
import React, { useContext, useEffect, useState } from "react";
import { Booking_data } from "../../../context/Context";
import styles from "./checktime.module.css";

function CheckTime({changeStep}) {
    const [error, setError] = useState("")
    const [fullName, setFullName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [bookingTime, setBookingTime] = useState("");

  const { booking } = useContext(Booking_data);
    const date = booking[0].booking_date
//   sort time for display purposes
  const availableTimes =
    booking[1].data.booking_times &&
    Object.keys(booking[1].data.booking_times).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    // submit booking object to firebase to store in the user object and db object
  async function handleSubmit(e) {
    e.preventDefault();
    const booking_data = {
        name: fullName,
        contact_number: contactNumber,
        email: email,
        booking_time: bookingTime,
        booking_date: date,
        booking_id: booking[0].booking_date_id
    }
    try {
        const response = await fetch("/api/makeBooking", {
          method: "POST",
          body: JSON.stringify({
            booking_data
          }),
        });
        const responseData = await response.json();
        if (responseData.error) {
            setError(responseData.error)

        }
    } catch (error) {
        console.log(error, "error");
        setError(error.message)
      }
  }

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.flex_column_container}>
        <label className={styles.date_label} htmlFor="date">
          Full name -
        </label>
        <input className={styles.date_input} type="text" name="name" 
        onChange={(e) => setFullName(e.target.value)}
        value={fullName}
/>
      </div>
      <div className={styles.flex_column_container}>
        <label className={styles.date_label} htmlFor="date">
          Contact number -
        </label>
        <input className={styles.date_input} type="text" name="number"
        onChange={(e) => setContactNumber(e.target.value)}
        value={contactNumber}
/>
      </div>
      <div className={styles.flex_column_container}>
        <label className={styles.date_label} htmlFor="date">
          Email -
        </label>
        <input className={styles.date_input} type="text" name="email" 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      </div>
      <div className={styles.flex_column_container}>
        <label className={styles.date_label} htmlFor="date">
          Available booking times -
        </label>
        <div className={styles.flexContainer}>
          {availableTimes.map((item, index) => (
            <div className={styles.time_card}                 key={index}
            >
              <input
                id={index}
                className={styles.time_card}
                type="radio"
                value={item}
                name="select_time"
                onClick={(e) => setBookingTime(e.target.value)}
              />
              <label htmlFor={index}>{item}</label>
            </div>
          ))}
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" style={error ? {marginTop: "10px"} : {}}>Check booking</button>
    </form>
  );
}

export default CheckTime;
