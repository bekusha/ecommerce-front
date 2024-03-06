import { Product } from "./product";

export interface RootState {
  products: {
    items: Product[];
    currentProduct: Product;
    status: string;
    error: string | null;
  };
}
