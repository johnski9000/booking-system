"use client"
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {  User_data } from "../../../context/Context";
import styles from "./checktime.module.css";

function CheckTime({bookingData}) {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")
    const [fullName, setFullName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [amountOfGuests, setAmountOfGuests] = useState();
    const [bookingTime, setBookingTime] = useState("");
    const router = useRouter();
    const date = bookingData.booking_date
//   sort time for display purposes
console.log("local state", bookingData)
  const availableTimes =
  bookingData.data.booking_times &&
    Object.keys(bookingData.data.booking_times).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    console.log("times", availableTimes)
    // submit booking object to firebase to store in the user object and db object
  async function handleSubmit(e) {
    setLoading(true)
    e.preventDefault();
    const booking_data = {
        name: fullName,
        contact_number: contactNumber,
        email: email,
        booking_time: bookingTime,
        booking_date: bookingData.data.date,
        booking_id: bookingData.id,
        guest_number: amountOfGuests
    }
    console.log("booking data", booking_data)
    try {
        const response = await fetch("/api/makeBooking", {
          method: "POST",
          body: JSON.stringify({
            booking_data
          }),
        });
        const responseData = await response.json();
        setLoading("Booking made")
        if (responseData.error) {
            setError(responseData.error)

        }
    } catch (error) {
        console.log(error, "error");
        setLoading(false)
        setError(error.message)
      }
  }
  useEffect(() => {
    if (loading === "Booking made") {
      router.push("/")
    }
    if (amountOfGuests >= 10) {
      setAmountOfGuests(10)
    }
  }, [loading, amountOfGuests])
  

  return (
    <div className={styles.main_container}>
      { loading ? <div className="loader"></div> : <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
        <div className={styles.flex_column_container}>
        <label className={styles.date_label} htmlFor="amountOfGuests">
          Number of guests -
        </label>
        <input className={styles.date_input} type="number" name="amountOfGuests"  min="1" max="10"
        onChange={(e) => setAmountOfGuests(e.target.value)}
        value={amountOfGuests}
        />
      </div>
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit" style={error ? {marginTop: "10px"} : {}}>Booking</button>
    </form>}
    </div>
   
  );
}

export default CheckTime;
