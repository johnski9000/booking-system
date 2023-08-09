"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./context/AuthContext";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebase_app from "./firebase/firebase.config";
import CheckDate from "./components/CheckDate/CheckDate";
import CheckTime from "./components/CheckTime/CheckTime";
import { Booking_data } from "./context/Context";

function Page() {
  const [step, setStep] = useState("date");

  const { user } = useAuthContext();
  const { booking, setBooking } = useContext(Booking_data);
  const router = useRouter();
  useEffect(() => {
    if (user == null) router.push("/login");
  }, [user]);
  
  // check date in the database, save in context the query and move to next step
  async function checkData(e, date) {
    e.preventDefault();
    try {
      const response = await fetch("/api/checkDate", {
        method: "POST",
        body: JSON.stringify({
          date: date,
        }),
      });
      const responseData = await response.json();
      setBooking([{...booking, booking_date: date, booking_date_id:responseData.id}, responseData])
      console.log(responseData.data,);
      console.log(responseData.id)
      setStep("time")
    } catch (error) {
      console.log(error);
    }
  }

  //

  function submitBooking() {

  }

  return (
    <div className={styles.outer_container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <section className={styles.inner_container}>
          <h1 className={styles.title}>Book a table</h1>

          {step === "date" && (
            <CheckDate
              checkData={checkData}
            />
          )}
          {step === "time" && (
            <CheckTime/>
          )}
        </section>
        <div className="creds">
          <div>
            Powered by <a href="https://jw-digital.co.uk">JW Digital</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
