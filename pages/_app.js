import { AuthContextProvider, useAuthContext } from "../context/AuthContext";
import Context from "../context/Context";
import { useRouter } from "next/navigation";
import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { user } = useAuthContext();

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/login")
  //   }
  // }, [user])
  
  return (
    <AuthContextProvider>
      <Context>
        <Component {...pageProps} />
      </Context>
    </AuthContextProvider>
  );
}

export default MyApp;
