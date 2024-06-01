import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProductProvider } from "@/context/productContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cartContext";
// import { OilProvider } from "@/context/oilContext";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          {/* <OilProvider> */}
          <div className="flex flex-col h-screen bg-black">
            {" "}
            {/* Ensures the container takes the full viewport height */}
            <Header />
            <main className="flex-grow">
              {" "}
              {/* Allows main content to expand and fill available space */}
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
          {/* </OilProvider> */}
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
