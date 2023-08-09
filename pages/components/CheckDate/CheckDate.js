"use client";
import React, { useState } from "react";
import styles from "./checkdate.module.css";
function CheckDate( {checkData }) {
  const [date, setDate] = useState("")
  function handleChange(e) {
    setDate(e.target.value);
  }
  return (
    <form className={styles.form}>
      <div className={styles.flex_column_container}>
        <label className={styles.date_label} htmlFor="date">
          Select a date:
        </label>
        <input
          className={styles.date_input}
          type="date"
          name="date"
          onChange={(e) => handleChange(e)}
          value={date}
        />
      </div>
      <button onClick={(e) => checkData(e, date)}>Check booking</button>
    </form>
  );
}

export default CheckDate;
