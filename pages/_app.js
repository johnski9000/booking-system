import { AuthContextProvider } from "../context/AuthContext";
import Context from "../context/Context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Context>
        <Component {...pageProps} />
      </Context>
    </AuthContextProvider>
  );
}

export default MyApp;
