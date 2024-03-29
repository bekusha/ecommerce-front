import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 flex flex-col justify-center items-center text-center text-white p-4  bottom-0 w-full">
      <div className="container ">
        <div>
          <ul>
            <li>
              <Link href="/">
                <div className="text-blue-400 hover:underline">Home</div>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <div className="text-blue-400 hover:underline">Contact Us</div>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <div className="text-blue-400 hover:underline">About</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>
          © {new Date().getFullYear()}
          {"Beka's"} Store, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
