import React, { useState } from "react";
import { useAuth } from "@/context/authContext"; // Adjust import path as needed
import { useProducts } from "@/context/productContext";
import { NewProductData } from "@/types/product";

const Dashboard = () => {
  const auth = useAuth();
  const { addProduct } = useProducts();

  // Function to handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      if (auth?.user) {
        await addProduct(formData);
        alert("Product added successfully!");
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      console.error("Failed to add the product:", error);
    }
  };

  if (auth && auth.user) {
    return (
      <div>
        <p>Welcome, {auth.user.username}</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input name="name" type="text" placeholder="Product Name" required />
          <textarea
            name="description"
            placeholder="Product Description"
            required
          />
          <input name="price" type="number" placeholder="Price" required />
          <input name="image1" type="file" accept="image/*" />
          <input name="image2" type="file" accept="image/*" />
          <input name="image3" type="file" accept="image/*" />
          <input name="image4" type="file" accept="image/*" />
          <input name="image5" type="file" accept="image/*" />
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  } else {
    return <p>Please log in to access the dashboard.</p>;
  }
};

export default Dashboard;
