import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProductProvider } from "@/context/productContext";
import Header from "@/components/header";
import Footer from "@/components/footer";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductProvider>
        <Header children={undefined} />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ProductProvider>
    </AuthProvider>
  );
}
