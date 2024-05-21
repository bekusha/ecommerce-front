import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black flex flex-col justify-center items-center text-center text-white p-4 mt-20 bottom-0 w-full">
      <div className="container ">
        <div>
          <ul className="md:flex md:justify-center md:gap-10">
            <li>
              <Link href="/">
                <div className="u hover:text-red-500">მთავარი გვერდი</div>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <div className=" hover:text-red-500">კონტაქტი</div>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <div className=" hover:text-red-500">ჩვენს შესახებ</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>
          © {new Date().getFullYear()}
          KROSS Georgia, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
