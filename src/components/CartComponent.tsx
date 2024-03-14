import React from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";

const CartComponent = ({ onClose }: { onClose: () => void }) => {
  const { cart, removeFromCart, updateCartItem } = useCart();
  console.log(cart?.items);
  const handleQuantityChange = (productId: number, change: number) => {
    const item = cart?.items.find((item) => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateCartItem?.(productId, newQuantity);
        console.log(newQuantity);
      } else {
        removeFromCart?.(productId);
      }
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg p-4 z-50">
      <button onClick={onClose} className="absolute top-2 right-2">
        Close
      </button>
      {cart && cart.items && cart.items.length > 0 ? (
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
              onClick={() => removeFromCart && removeFromCart(item.id)}
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
      <button>purchase</button>
    </div>
  );
};

export default CartComponent;
