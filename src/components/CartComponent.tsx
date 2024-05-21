import React, { useState } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Checkout from "./Checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const CartComponent = ({ onClose }: { onClose: () => void }) => {
  const { cart, removeFromCart, updateCartItem } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  function getImageUrl(path: any) {
    if (path.startsWith("http")) {
      return path; // Path is already a full URL
    }
    return `${process.env.NEXT_PUBLIC_API_BASE}${path}`;
  }

  const handleQuantityChange = (productId: number, change: number) => {
    const item = cart?.items.find((item) => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      console.log(item!.product.image1);
      if (newQuantity > 0) {
        updateCartItem?.(productId, newQuantity);
      } else {
        removeFromCart?.(productId);
      }
    }
  };

  if (isCheckingOut) {
    return (
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
            <Checkout />
            <button
              onClick={() => setIsCheckingOut(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150">
              Cancel
            </button>
          </div>
        </div>
      </PayPalScriptProvider>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg p-4 z-50">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition ease-in-out duration-150">
        Close
      </button>
      {cart && cart.items.length > 0 ? (
        cart.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center my-2">
            <span className="text-sm overflow-hidden overflow-ellipsis max-h-10 max-w-10">
              {item.product.name}
            </span>
            <div className="flex items-center">
              <Image
                src={getImageUrl(item.product.image1)}
                alt={item.product.name}
                width={50}
                height={50}
                className="rounded"
              />
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded ml-2 transition ease-in-out duration-150">
                -
              </button>
              <span className="mx-2">Qty: {item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded transition ease-in-out duration-150">
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition ease-in-out duration-150">
              X
            </button>
          </div>
        ))
      ) : (
        <div>თქვენი კალათი ცარიელია</div>
      )}
      <div className="mt-4">
        <strong>ნივთების რაოდენობა:</strong> {cart?.totalItems || 0}
        <br />
        <strong>ჯამური ფასი:</strong> ${cart?.totalPrice || 0}
      </div>
      <button
        onClick={() => setIsCheckingOut(true)}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150">
        შეძენა
      </button>
    </div>
  );
};

export default CartComponent;
