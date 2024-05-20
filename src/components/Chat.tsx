import React, { useState } from "react";
import axios from "axios";
import { Product } from "@/types/product";
import Link from "next/link";
import { useRouter } from "next/router";

interface Message {
  car_model_year: string;
  sender: "user" | "bot";
  product?: Product;
}

const Chat: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responseReceived, setResponseReceived] = useState<boolean>(false); // Track if response is received

  const router = useRouter();

  const navigateToProduct = (productId: any) => {
    router.push(`/products/${productId}`);
    onClose();
  };

  const styleOilConsistency = (text: string): JSX.Element => {
    const parts = text.split(/(\d{1,2}W-\d{1,2})/);
    return (
      <span>
        {parts.map((part, index) => {
          if (/\d{1,2}W-\d{1,2}/.test(part)) {
            return (
              <span key={index} className="text-red-500">
                {part}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  };

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage: Message = { car_model_year: input, sender: "user" };
    setMessages((messages) => [...messages, userMessage]);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}ai/oil/`,
        { car_model_year: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { recommendation, product } = response.data;
      const botMessage: Message = {
        car_model_year: recommendation,
        sender: "bot",
        product: product,
      };

      console.log(product);
      setMessages((messages) => [...messages, botMessage]);
      setResponseReceived(true); // Set response received to true
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setInput("");
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 text-white">
      <div className="relative bg-black rounded-lg shadow-xl p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg font-semibold">
          X
        </button>
        <div className="overflow-y-auto h-96">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-lg text-center flex${
                msg.sender === "user"
                  ? "bg-gray-800 ml-auto"
                  : "bg-black mr-auto"
              }`}>
              {msg.sender === "bot"
                ? styleOilConsistency(msg.car_model_year)
                : msg.car_model_year}
              {msg.product &&
                msg.product.name &&
                msg.product.viscosity &&
                msg.product.volume && (
                  <div className="text-sm mt-2 flex justify-center">
                    <button
                      onClick={() => navigateToProduct(msg.product?.id)}
                      className="ml-8 bg-red-500 p-1 rounded mt-10">
                      შესაბამისი პროდუქტის ნახვა
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
        {!responseReceived && (
          <>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="მარკა, მოდელი, ძრავი, წელი"
              className="mt-4 w-full px-4 py-2 border rounded-full shadow-sm text-black"
            />
            <div>{}</div>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="mt-4 w-full bg-black border border-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                "Send"
              )}
            </button>
          </>
        )}
        {responseReceived && (
          <div className="mt-4 text-center text-lg text-red-500">
            მადლობა რომ სარგებლობთ ჩვენი მომსახურებით
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
