import React from "react";
import { useProducts } from "@/context/productContext";
import ProductCard from "@/components/ProductCard";

const Home = () => {
  const { products } = useProducts();

  return (
    <div className="container">
      <header className="hero-banner">
        <h1>Welcome to Our Online Store</h1>
        <p>Find the best products at unbeatable prices.</p>
      </header>

      <main>
        <section className="products">
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
              // Make sure you pass the product as a prop here
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          max-height: 80%;
        }
        .hero-banner {
          text-align: center;
          margin-bottom: 50px;
        }
        .products {
          margin-bottom: 50px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 50px;
        }
      `}</style>
    </div>
  );
};

export default Home;
