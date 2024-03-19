import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useProducts } from "@/context/productContext";
import { NewProductData, Product } from "@/types/product";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

const Dashboard = () => {
  const auth = useAuth();
  const { addProduct, editProduct, deleteProduct } = useProducts();
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}product/my/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setMyProducts(response.data);
        })
        .catch((error) => console.error("Error fetching my products:", error));
    }
  }, [setMyProducts]);

  const handleEdit = (productId: number) => {
    console.log("Edit product", productId);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setMyProducts(myProducts.filter((product) => product.id !== productId));
        alert("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

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
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl mb-4">
          Welcome, {auth.user.username}
        </p>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mb-8">
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            required
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            required
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            required
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <input name="image1" type="file" accept="image/*" className="mb-4" />
          <input name="image2" type="file" accept="image/*" className="mb-4" />
          <input name="image3" type="file" accept="image/*" className="mb-4" />
          <input name="image4" type="file" accept="image/*" className="mb-4" />
          <input name="image5" type="file" accept="image/*" className="mb-4" />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Product
          </button>
        </form>

        <h1 className="text-xl font-bold mb-4">My Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {myProducts.map((product) => (
            <ProductCard
              key={product.id}
              isAdminView={true}
              product={product}
              onDelete={() => handleDelete(product.id)}
              onEdit={() => handleEdit(product.id)} // You need to pass a proper implementation
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <p className="text-center text-xl">
        Please log in to access the dashboard.
      </p>
    );
  }
};

export default Dashboard;
