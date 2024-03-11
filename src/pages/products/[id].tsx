import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { Product } from "@/types/product";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params!;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}product/${id}`
  );
  return {
    props: {
      product: response.data,
    },
  };
};

export default ProductDetail;
