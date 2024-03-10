import React from "react";
import { useProducts } from "@/context/productContext";

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
          <h2>Featured Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {/* <img src={product.image} alt={product.name} /> */}
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  {/* <button onClick={() => addToCart(product)}>Add to Cart</button> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Your Store Name. All rights
          reserved.
        </p>
      </footer>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
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
        .product-card {
          border: 1px solid #ccc;
          padding: 20px;
          text-align: center;
        }
        .product-card img {
          max-width: 100%;
          height: auto;
        }
        .product-info h3 {
          margin: 10px 0;
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
