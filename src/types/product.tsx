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
}

export interface Category {
  id: number;
  name: string;
  parent?: number | null; // Optional, can be null or missing if it's a top-level category
}
