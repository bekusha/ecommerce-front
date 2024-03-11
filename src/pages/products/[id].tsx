import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { Product } from "@/types/product";

// Correct the typing here to expect an object with a product property
interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();

  // Optionally use router.isFallback here if you were using getStaticProps with fallback: true

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* You can add more product details here */}
    </div>
  );
};

// This function runs on the server for each request
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
