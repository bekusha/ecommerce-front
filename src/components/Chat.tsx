// components/Chat.tsx
import React, { useState } from "react";
import axios from "axios";

interface Message {
  car_model_year: string;
  sender: "user" | "bot";
}

const Chat: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

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

      const { recommendation } = response.data; // Adjusted field to match what your API might be sending back
      const botMessage: Message = {
        car_model_year: recommendation,
        sender: "bot",
      };
      setMessages((messages) => [...messages, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg font-semibold">
          X
        </button>
        <div className="overflow-y-auto h-96">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-200 ml-auto"
                  : "bg-green-200 mr-auto"
              }`}>
              {msg.car_model_year}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="მარკა, მოდელი, ძრავი, წელი"
          className="mt-4 w-full px-4 py-2 border rounded-full shadow-sm text-black"
        />
        <button
          onClick={sendMessage}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
