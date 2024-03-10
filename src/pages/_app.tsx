import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProductProvider } from "@/context/productContext";
import Header from "@/components/header";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductProvider>
        {" "}
        {/* Wrap your component tree with AuthProvider */}
        <Header>
          <Component {...pageProps} />
        </Header>
      </ProductProvider>
    </AuthProvider>
  );
}
