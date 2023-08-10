import React, { useState } from "react";
import { auth, useAuthContext } from "../../../context/AuthContext";
import { signOut } from "firebase/auth";
import styles from "./navigation.module.css";
import { useRouter } from "next/router";

function Navigation() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out")
      })
      .catch(error => {
        // Handle logout error
        console.error("Logout error:", error);
      });
  };
  const redirectMe = () => {
    router.push("/login")
  }
  const menu_items = [
    {
      text: "Home",
      image: "./home.png"
    },
    {
      text: "My Account",
      image: "./user.png"
    },
    {
      text: "Make a booking",
      image: "./make-booking.png"
    },
    {
      text: "My Bookings",
      image: "./booking.png"
    },
    {
      text: user ? "Log Out" : "Log In",
      image: "logout.png",
      onClick: user ? handleLogout : redirectMe // Use the defined function here
    },
  ];

  return (
    <div className={styles.navbar_container}>
      <div
        className={open ? styles.navbar_open : styles.navbar}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.nav_line} />
        <div className={styles.nav_line} />
        <div className={styles.nav_line} />
      </div>
      <div className={open ? styles.menu_open : styles.menu}>
        <ul className={styles.menu_list}>
          {menu_items.map((item, index) => (
            <li key={index} className={styles.menu_item} onClick={item.onClick}>
              <img src={item.image} alt={item.text} />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
