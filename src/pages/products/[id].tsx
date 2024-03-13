import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import React from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
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
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div>{product.name}</div>
      <div>{product.description}</div>
      <div>{product.price} $</div>
      <button>Add To Cart</button>
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
