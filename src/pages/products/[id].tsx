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
    <div className="product-detail">
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

      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-4">{product.price * quantity} $</p>
      <div className="flex items-center gap-2 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToCart}>
          Add To Cart
        </button>
        <button
          className="text-gray-700 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
          onClick={() => handleQuantityChange(-1)}>
          -
        </button>
        <span>{quantity}</span>
        <button
          className="text-gray-700 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
          onClick={() => handleQuantityChange(1)}>
          +
        </button>
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
