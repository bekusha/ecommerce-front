import React, { useEffect } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { fetchProducts } from "@/store/slices/productSlice";
import { RootState } from "@/store/store";
import { useDispatch } from "@/hooks";
import Link from "next/link";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <div>{product.name}</div>
            </Link>
            - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
