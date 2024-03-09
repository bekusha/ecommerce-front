import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap your component tree with AuthProvider */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}