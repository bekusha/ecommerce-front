import React, { useState } from "react";
import { Product } from "@/types/product";

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  product: Product; // Add product to the props
}

const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product, // Destructure product
}) => {
  const [formData, setFormData] = useState({
    first_name: "", // Change to match Django model field
    last_name: "", // Change to match Django model field
    email: "",
    phone_number: "", // Change to match Django model field
    address: "",
    car_make: "", // Change to match Django model field
    car_model: "", // Change to match Django model field
    car_year: "", // This matches the Django model field
    mileage: "",
    product: product.id, // This matches the Django model field
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center mt-20">
      <div className="bg-black rounded-lg p-8 w-full max-w-md mx-auto max-h-screen overflow-scroll">
        <h2 className="text-xl font-bold mb-4 text-red-500">
          სერვისის გამოძახება
        </h2>
        <p>
          შეიყვანეთ თქვენი მონაცემები და ჩვენი ოპერატორი ძალიან მალე
          დაგიკავშირდებათ
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <p>
              ზეთი: <span className="text-red-500">{product.name}</span>
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="first_name">
              სახელი
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="last_name">
              გვარი
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="email">
              მეილი
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="phone_number">
              ტელეფონი
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="address">
              მისამართი
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="car_make">
              მანქანის მარკა
            </label>
            <input
              type="text"
              id="car_make"
              name="car_make"
              className="w-full px-3 py-2 border rounded-lg text-black"
              value={formData.car_make}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="car_model">
              მანქანის მოდელი
            </label>
            <input
              type="text"
              id="car_model"
              name="car_model"
              className="w-full px-3 py-2 border rounded-lg text-black"
              value={formData.car_model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="car_year">
              წელი
            </label>
            <input
              type="text"
              id="car_year"
              name="car_year"
              className="w-full px-3 py-2 border rounded-lg text-black"
              value={formData.car_year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-red-500 text-sm font-bold mb-2"
              htmlFor="mileage">
              გარბენი
            </label>
            <input
              type="text"
              id="mileage"
              name="mileage"
              className="w-full px-3 py-2 border rounded-lg text-black"
              value={formData.mileage}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
            გამოძახება
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestModal;
