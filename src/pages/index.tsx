import React, { useState } from "react";
import { useProducts } from "@/context/productContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const { products, categories, fetchProductsByCategory } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (categoryId: number) => {
    fetchProductsByCategory(categoryId);
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container ${inter.className}`}>
      <header className="hero-banner">
        <h1>Welcome to Our Online Store</h1>
        <p>Find the best products at unbeatable prices.</p>
        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </header>

      <nav className="category-nav">
        <h4>
          <b>Filter products by categories:</b>
        </h4>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            style={{ margin: "0 10px" }}>
            {category.name}
          </button>
        ))}
      </nav>

      <main>
        <section className="products">
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} passHref>
                <div>
                  <ProductCard product={product} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

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
        .category-nav {
          text-align: center;
          margin-bottom: 20px;
        }
        .products {
          margin-bottom: 50px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
