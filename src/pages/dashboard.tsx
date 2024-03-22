import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useProducts } from "@/context/productContext";
import { NewProductData, Product } from "@/types/product";
import axios from "axios";
import ProductCard from "@/components/ProductCard";

const Dashboard = () => {
  const auth = useAuth();
  const { addProduct, editProduct, deleteProduct, categories } = useProducts();
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

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
    const productToEdit = myProducts.find(
      (product) => product.id === productId
    );
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    productId: number
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await editProduct(productId, formData);
    setIsEditModalOpen(false);
    // Optionally refresh products or handle UI update accordingly
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const categoryId = formData.get("category");

    if (categoryId !== null) {
      const categoryIdNumber = Number(categoryId);
      await addProduct(formData, categoryIdNumber);
      alert("Product added successfully!");
    } else {
      console.error("Category ID is null");
      // Handle the case where categoryId is null
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
          <select
            name="category"
            required
            className="block w-full mb-4 p-2 border border-gray-300 rounded">
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
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
        {isEditModalOpen && currentProduct && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <form
                onSubmit={(e) => handleEditSubmit(e, currentProduct.id)}
                encType="multipart/form-data">
                <input
                  defaultValue={currentProduct.name}
                  name="name"
                  type="text"
                  required
                  className="block w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                  defaultValue={currentProduct.quantity} // Ensure this is populated with the current product quantity
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  required
                  className="block w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <textarea
                  defaultValue={currentProduct.description}
                  name="description"
                  required
                  className="block w-full mb-4 p-2 border border-gray-300 rounded"
                />

                <input
                  defaultValue={currentProduct.price}
                  name="price"
                  type="number"
                  required
                  className="block w-full mb-4 p-2 border border-gray-300 rounded"
                />

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded">
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="ml-2 bg-gray-500 text-white py-2 px-4 rounded">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
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
