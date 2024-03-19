import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import React, { useState } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useCart } from "@/context/cartContext";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    await addToCart(product, quantity);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ].filter(Boolean);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail justify-center align-center text-center h-screen">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            {image && (
              <div
                className="mt-20 mb-20"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "500px",
                }}>
                <Image
                  src={image}
                  alt={`Image ${index + 1}`}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:text-center mt-10">
        {product.name}
      </h1>
      <p className="text-gray-700 mb-4 text-lg md:text-xl lg:text-2xl text-center max-w-[30rem] mx-auto">
        {product.description}
      </p>
      <p className="text-xl font-semibold mb-4">{product.price * quantity} $</p>
      <div className="flex gap-2 mb-4 md:flex-row items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-[20] max-w-[10rem] text-lg md:text-xl "
          onClick={handleAddToCart}>
          Add To Cart
        </button>
        <div className="flex items-center">
          <button
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
            onClick={() => handleQuantityChange(-1)}>
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
            onClick={() => handleQuantityChange(1)}>
            +
          </button>
        </div>
      </div>
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
