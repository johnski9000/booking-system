"use client";
import React, { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import styles from "../../../styles/Home.module.css";

function Item({ item, index }) {
  const [cancel, setCancel] = useState(false)
  console.log(item)

  const { user } = useAuthContext();

console.log(user)
  async function cancelBooking () {
    try {
      const response = await fetch("/api/cancelBooking", {
        method: "POST",
        body: JSON.stringify({
          ref : item.booking_ref,
          time: item.booking_time,
          date: item.booking_date,
          id: "1"
        }),
      });
      const responseData = await response.json();
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <li className={styles.bookings_list_item} key={index}>
      <h3>{item.booking_date}</h3>
      <p>
        Booking at {item.booking_time} for {item.guests} guests.
      </p>
      <p>Confirmation pending...</p>
      <div className={styles.button_container}>
        <button>Edit</button>
        <button onClick={() => setCancel(!cancel)}>Cancel </button>
      </div>
      {
        cancel === true && <div className={styles.booking_list_item_modal}>
          <div className={styles.booking_list_item_modal_relative}>
          {/* <img src="./close.png" alt="close"/>
          <div className={styles.booking_list_item_modal_cancel}>cancel</div> */}
                  <button onClick={() => cancelBooking()}>Confirm</button>
                  <button onClick={() => setCancel(!cancel)}>Go back</button>

          </div>
        </div>
      }
    </li>
  );
}

export default Item;
