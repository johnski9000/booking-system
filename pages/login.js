"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import signIn from "../firebase/signin";
import checkLogin from "../firebase/checkLogin";
import { useAuthContext } from "../context/AuthContext";
import Navigation from "./components/Navigation/Navigation";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const { user } = useAuthContext();

  function handleChange(input) {
    if (input.target.name === "email") {
      setEmail(input.target.value);
    } else if (input.target.name === "password") {
      setPassword(input.target.value);
    }
  }

  async function handleForm() {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
  }

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  return (
    <div className={styles.outer_container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by JW Digital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <section className={styles.inner_container}>
        <Navigation/>
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form} onSubmit={handleForm}>
            <div className={styles.input_container}>
              <label htmlFor="email">Email</label>

              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.input_container}>
              <label htmlFor="password">Password</label>

              <input
                type="text"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button type="submit">Enter</button>
          </form>
          <Link href="/signup" className={styles.got_account}>
            Need to sign up? Click here
          </Link>
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
