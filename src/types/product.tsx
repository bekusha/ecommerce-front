import { User } from "./user";

export interface Product {
  id: number;
  vendor: User;
  name: string;
  description: string;
  price: number;
  createdAt: string;
}

export interface ProductContextType {
  products: Product[];
  fetchProducts: () => void;
}
