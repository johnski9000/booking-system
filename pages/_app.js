import "../styles/globals.css";
import { AuthContextProvider } from "./context/AuthContext";
import Context from "./context/Context";

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
