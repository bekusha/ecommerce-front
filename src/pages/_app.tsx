import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProductProvider } from "@/context/productContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cartContext";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
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
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
