import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import axios from "axios";
import {
  Product,
  ProductContextType,
  Category,
  NewProductData,
} from "@/types/product";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}): React.ReactElement => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const addProduct = useCallback(async (formData: FormData) => {
    const token = localStorage.getItem("access"); // Or wherever you store your token
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}product/`,
        formData, // No need to change anything here
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Don't set 'Content-Type': 'multipart/form-data' manually; let the browser set it
          },
        }
      );
      setProducts((currentProducts) => [...currentProducts, response.data]);
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL!}product/`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}product/categories/`
      );
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (categoryId: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}product/?category=${categoryId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error(
        `Failed to fetch products for category ${categoryId}:`,
        error
      );
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        categories,
        fetchProductsByCategory,
        fetchProducts,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
