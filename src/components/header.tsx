// Import React and any other necessary libraries
import React, { ReactNode, useState } from "react"; // Include ReactNode for typing the children
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // Import icons
import { useAuth } from "@/context/authContext";

type HeaderProps = {
  children: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth()!;
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and title */}
          <Link href="/">
            <div className="flex items-center">
              <span className="text-xl font-semibold">Beka's Store</span>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/">
              <div className="hover:text-gray-400">Home</div>
            </Link>
            <Link href="/products">
              <div className="hover:text-gray-400">Products</div>
            </Link>
            <Link href="/about">
              <div className="hover:text-gray-400">About Us</div>
            </Link>
            {user ? (
              <div className="flex items-center">
                {/* Only show the shopping cart icon if the user is logged in */}
                <Link href="/cart">
                  <div className="hidden md:block">
                    <ShoppingCartIcon className="h-6 w-6" />
                  </div>
                </Link>
                <button onClick={logout} className="ml-4">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login">
                <div className="hover:text-gray-400">Login</div>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <ul
            className={`md:hidden flex flex-col justify-center items-center absolute bg-gray-800 z-20 left-0 w-full transition-all duration-500 ease-in ${
              isMenuOpen ? "top-16 h-auto" : "top-[-490px] h-0"
            }`}>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <a href="#" className="text-white hover:text-gray-400">
                Home
              </a>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <a href="#" className="text-white hover:text-gray-400">
                Products
              </a>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <a href="#" className="text-white hover:text-gray-400">
                About
              </a>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <a href="#" className="text-white hover:text-gray-400">
                Contact
              </a>
            </li>
            {user ? (
              <div className="">
                {/* Only show the shopping cart icon if the user is logged in */}

                <div className="md:block flex justify-center">
                  {" "}
                  <ShoppingCartIcon className="h-6 w-6" />
                </div>

                <button
                  onClick={logout}
                  className="md:ml-8 text-xl md:my-0 my-7">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login">
                <div className="md:ml-8 text-xl md:my-0 my-7">Login</div>
              </Link>
            )}
            {/* Add more navigation items here */}
          </ul>
        </div>
      </header>
      {/* Render children below the header */}
      <main>{children}</main>
    </>
  );
};

export default Header;
