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
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryClick = (categoryId: any) => {
    setSelectedCategoryId(categoryId); // Set the selected category ID
    fetchProductsByCategory(categoryId);
  };
  const handleResetFilters = () => {
    fetchProducts();
    setSelectedCategoryId(null);
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
      <header className="text-center mb-12 p-10 bg-gray-900 rounded-lg  border border-red-500 ">
        <h1 className="text-4xl font-bold text-white">
          მოგესალმებათ <span className="text-red-500">KROSS Georgia</span>
        </h1>
        <p className="text-white text-lg mt-4">
          ჩვენთან შეგიძლიათ შეიძინოთ უმაღლესი ხარისხის პროდუქტი
        </p>
        <div className="mt-8">
          <input
            type="text"
            placeholder="ძიება..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2  rounded-full w-full shadow-inne text-red-800"
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
            className={`m-2 px-4 py-2 rounded-full cursor-pointer shadow transition duration-300 ease-in-out ${
              selectedCategoryId === category.id
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-blue-500 hover:text-white"
            }`}>
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
