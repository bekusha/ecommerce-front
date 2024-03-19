import React, { useState } from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import Checkout from "./checkout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const CartComponent = ({ onClose }: { onClose: () => void }) => {
  const { cart, removeFromCart, updateCartItem } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false); // State to control the checkout view

  const handleQuantityChange = (productId: number, change: number) => {
    const item = cart?.items.find((item) => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateCartItem?.(productId, newQuantity);
      } else {
        removeFromCart?.(productId);
      }
    }
  };

  // Render only the Checkout component when isCheckingOut is true
  if (isCheckingOut) {
    return (
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}>
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
            <Checkout />
            <button
              onClick={() => setIsCheckingOut(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      </PayPalScriptProvider>
    );
  }

  // Else, render the cart view
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg p-4 z-50">
      <button onClick={onClose} className="absolute top-2 right-2">
        Close
      </button>
      {cart && cart.items.length > 0 ? (
        cart.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center my-2">
            <span className="text-sm">{item.product.name}</span>
            <div className="flex items-center">
              <Image
                src={item.product.image1!}
                alt={item.product.name}
                width={50}
                height={50}
                className="rounded"
              />
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded">
                -
              </button>
              <span className="mx-2">Qty: {item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded">
                +
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              X
            </button>
          </div>
        ))
      ) : (
        <div>Your cart is empty.</div>
      )}
      <div className="mt-4">
        <strong>Total Items:</strong> {cart?.totalItems || 0}
        <br />
        <strong>Total Price:</strong> ${cart?.totalPrice || 0}
      </div>
      <button
        onClick={() => setIsCheckingOut(true)} // Trigger checkout view
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Purchase
      </button>
    </div>
  );
};

export default CartComponent;
