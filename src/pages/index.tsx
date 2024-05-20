import React, { useState } from "react";
import { useProducts } from "@/context/productContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Inter } from "next/font/google";
import Chat from "@/components/Chat";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const { products, categories, fetchProductsByCategory, fetchProducts } =
    useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleCategoryClick = (categoryId: number) => {
    fetchProductsByCategory(categoryId);
  };
  const handleResetFilters = () => {
    fetchProducts(); // This assumes you have such a function to reset or fetch all products without filter
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleChatToggle = () => setIsChatOpen(!isChatOpen);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container mx-auto px-5 ${inter.className} bg-black`}>
      <header className="text-center mb-12 p-10 bg-black rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-white">
          მოგესალმებათ <span className="text-red-500">KROSS Georgia</span>
        </h1>
        <p className="text-white text-lg mt-4">
          ჩვენთან შეგიძლიათ შეიძინოთ უმაღლესი ხარისხის პროდუქტი
        </p>
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-full w-full shadow-inne text-white"
          />
        </div>
      </header>

      <nav className="text-center mb-5">
        <h4 className="font-bold">
          <b>გაფილტრე პროდუქტი კატეგორიის მიხედვით</b>
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
          className="m-2 bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out">
          ფილტრის გამორთვა
        </button>
      </nav>

      <main>
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} passHref>
                <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow overflow-hidden text-red-800 ">
                  {/* Ensure that the ProductCard component takes the full height available */}
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
        <div>
          <button
            onClick={handleChatToggle}
            className="fixed bottom-4 right-4 z-50 cursor-pointer text-3xl bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-200">
            💬
          </button>
          <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
      </main>
    </div>
  );
};

export default Home;
