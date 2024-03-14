import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProductProvider } from "@/context/productContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cartContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Header children={undefined} />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
