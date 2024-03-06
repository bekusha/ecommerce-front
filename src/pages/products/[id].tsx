import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "@/store/slices/productSlice";
import { RootState } from "@/types/RootState";
import { AppDispatch } from "@/store/store";

const ProductDetailsPage = () => {
  const router = useRouter();
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : router.query.id;
  const dispatch = useDispatch<AppDispatch>();

  const { currentProduct, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "succeeded" && currentProduct && (
        <div>
          <h1>{currentProduct.name}</h1>
          <p>{currentProduct.description}</p>
          <p>{`Price: ${currentProduct.price}`}</p>
          <p>{`Vendor: ${currentProduct.vendor}`}</p>
        </div>
      )}
      {status === "failed" && <div>Error: {error}</div>}
    </div>
  );
};

export default ProductDetailsPage;
