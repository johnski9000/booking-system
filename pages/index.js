"use client";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useContext, useEffect } from "react";
import Context, { User_data } from "../context/Context";
import Navigation from "./components/Navigation/Navigation";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

function Page() {
  const { userData, setUserData } = useContext(User_data);
  const {user} = useAuthContext()
  console.log(userData);
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      setUserData({
        email: user ? user.email : "",
        booking_date: "",
        bookings: []
      })
      router.push("/login")
    }
  }, [user])

  return (
    <div className={styles.outer_container}>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by JW Digital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <section className={styles.inner_container}>
          <Navigation/>
          <h1 style={{
            marginTop: "60px",
            textAlign:"center"
          }}>Dashboard</h1>

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
