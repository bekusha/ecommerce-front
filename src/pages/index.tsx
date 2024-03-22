import React, { useState } from "react";
import { useProducts } from "@/context/productContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const { products, categories, fetchProductsByCategory, fetchProducts } =
    useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (categoryId: number) => {
    fetchProductsByCategory(categoryId);
  };
  const handleResetFilters = () => {
    fetchProducts(); // This assumes you have such a function to reset or fetch all products without filter
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
        <button
          onClick={handleResetFilters}
          className="m-2 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out">
          Reset Filters
        </button>
      </nav>

      <main>
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} passHref>
                <div className="flex flex-col">
                  {" "}
                  {/* Adjust this wrapper to ensure it’s flex and fills the height */}
                  <ProductCard
                    product={product}
                    onEdit={() => {
                      /* Edit function */
                    }}
                    onDelete={() => {
                      /* Delete function */
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
