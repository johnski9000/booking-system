"use client"
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/navigation'
import signUp from "./firebase/signup";
import Link from "next/link"
import signIn from "./firebase/signin";


export default function SignUp() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { user } = useAuthContext()
  const router = useRouter()

  function handleChange(input) {
    if(input.target.name === "email") {
      setEmail(input.target.value)
    } else if (input.target.name === "password") {
      setPassword(input.target.value)
    }
  }
  function onSubmit(e) {
    e.preventDefault() 
    console.log(email, password)
  }
  async function handleForm (event) {
    event.preventDefault()

    const { result, error } = await signUp(email, password);
    console.log(result, error)

    if (error) {
        return console.log(error)
    } 
    else if (result) {
        const {result, error} = await signIn(email, password)
        if (error) {
            console.log("error signing in")
        }
    }
  }


  useEffect(() => {
      if (user) router.push("/")
  }, [user])

  return (
    <div className={styles.outer_container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <section className={styles.inner_container}>
          <h1 className={styles.title}>Create your account</h1>
          <form className={styles.form}  onSubmit={handleForm}>
            <div className={styles.input_container}>
            <label htmlFor="email">Email</label>

              <input type="text" name="email" placeholder="Enter your email" value={email} onChange={(e) => handleChange(e)}/>
            </div>
            <div className={styles.input_container}>
            <label htmlFor="password">Password</label>

              <input type="text" name="password" placeholder="Enter your password" value={password} onChange={(e) => handleChange(e)}/>
            </div>
            <button type="submit">Sign up</button>
          </form>
          <Link href="/login" className={styles.got_account}>Got an account? Log in</Link>
        </section>
      </main>
    </div>
  );
}