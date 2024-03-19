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
    <div className={`container mx-auto px-5 ${inter.className}`}>
      <header className="text-center mb-12 p-10 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Our Online Store
        </h1>
        <p className="text-gray-600 text-lg mt-4">
          Find the best products at unbeatable prices.
        </p>
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-full w-full shadow-inner"
          />
        </div>
      </header>

      <nav className="text-center mb-5">
        <h4 className="font-bold">
          <b>Filter products by categories:</b>
        </h4>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="m-2 bg-white border border-gray-200 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-100 shadow transition duration-300 ease-in-out">
            {category.name}
          </button>
        ))}
      </nav>

      <main>
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} passHref>
                <div>
                  <ProductCard
                    product={product}
                    onEdit={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                    onDelete={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
