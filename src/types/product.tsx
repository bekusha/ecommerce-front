import { User } from "./user";

export interface Product {
  id: number;
  vendor: User;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
}

export interface ProductContextType {
  products: Product[];
  categories: Category[];
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (categoryId: number) => Promise<void>;
  addProduct: (productData: FormData) => Promise<void>;
}

export interface Category {
  id: number;
  name: string;
  parent?: number | null;
}

export interface NewProductData {
  name: string;
  description: string;
  price: number;
  // Include types for your images if they are being sent as part of the form data
  image1?: File | null;
  image2?: File | null;
  image3?: File | null;
  image4?: File | null;
  image5?: File | null;
}
