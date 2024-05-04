// Import React and any other necessary libraries
import React, { ReactNode, useRef, useState } from "react"; // Include ReactNode for typing the children
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; // Import icons
import { useAuth } from "@/context/authContext";
import { Role } from "@/types/user";
import CartComponent from "./CartComponent";

// type HeaderProps = {
//   children: ReactNode;
// };

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout, loading } = useAuth()!;
  const cartRef = useRef(null);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);
  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and title */}
          <Link href="/">
            <div className="flex items-center">
              <span className="text-xl font-semibold"> {"Beka's"} Store</span>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex ">
            <Link href="/">
              <div className="hover:text-gray-400">Home</div>
            </Link>
            <Link href="/about">
              <div className="hover:text-gray-400">About Us</div>
            </Link>
            <Link href="/contact">
              <div className="hover:text-gray-400">Contact</div>
            </Link>
            {user ? (
              <>
                {/* Cart icon for consumers */}
                {user.role === Role.CONSUMER && (
                  <button
                    onClick={toggleCart}
                    className="md:flex items-center hover:text-gray-400">
                    <ShoppingCartIcon className="h-6 w-6" />
                  </button>
                )}

                {user.role === Role.VENDOR && (
                  <Link href="/dashboard">
                    <div className="hover:text-gray-400 ml-4">Dashboard</div>
                  </Link>
                )}
                <button onClick={logout} className="ml-4">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/auth">
                <div className="hover:text-gray-400">Login/Register</div>
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
            onClick={() => setIsMenuOpen(false)}
            className={`md:hidden flex flex-col justify-center items-center absolute bg-gray-800 z-20 left-0 w-full transition-all duration-500 ease-in ${
              isMenuOpen ? "top-16 h-auto" : "top-[-490px] h-0"
            }`}>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link href="/">
                <div className="hover:text-gray-400">Home</div>
              </Link>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link href="/about">
                <div className="hover:text-gray-400">About Us</div>
              </Link>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link href="/contact">
                <div className="hover:text-gray-400">Contact</div>
              </Link>
            </li>
            {user ? (
              <>
                {/* Cart icon for consumers */}
                {user.role === Role.CONSUMER && (
                  <li className="md:ml-8 text-xl md:my-0 my-7">
                    <button
                      onClick={toggleCart}
                      className="md:flex items-center hover:text-gray-400">
                      <ShoppingCartIcon className="h-6 w-6" />
                    </button>
                  </li>
                )}

                {user.role === Role.VENDOR && (
                  <li className="md:ml-8 text-xl md:my-0 my-7">
                    <Link href="/dashboard">
                      <div className="hover:text-gray-400 ml-4">Dashboard</div>
                    </Link>
                  </li>
                )}
                <li className="md:ml-8 text-xl md:my-0 my-7">
                  <button onClick={logout} className="ml-4">
                    Logout
                  </button>
                </li>

                {/* Dashboard link for vendors */}
              </>
            ) : (
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <Link href="/auth">
                  <div className="hover:text-gray-400">Login/Register</div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
      {/* Conditionally render CartComponent based on isCartOpen */}
      {isCartOpen && <CartComponent onClose={closeCart} />}
      {/* <main>{children}</main> */}
    </>
  );
};

export default Header;
