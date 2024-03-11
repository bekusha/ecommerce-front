import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 flex flex-col justify-center items-center text-center text-white p-4  bottom-0 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column 1: About the company */}

        {/* Column 2: Quick Links */}
        <div>
          <ul>
            <li>
              <Link href="/products">
                <div className="text-blue-400 hover:underline">Products</div>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <div className="text-blue-400 hover:underline">Contact Us</div>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <div className="text-blue-400 hover:underline">FAQ</div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col justify-center text-center items-center">
          <h2 className="font-bold text-lg mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            {/* Replace # with your actual social media links */}
            <a href="#" className="hover:text-gray-400">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-400">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Legal & Copy */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>
          © {new Date().getFullYear()} Beka's Store, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
