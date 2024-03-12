import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext"; // Adjust import path as needed
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

        <h1>My Products</h1>
        <div className="product-list">
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
    return <p>Please log in to access the dashboard.</p>;
  }
};

export default Dashboard;
