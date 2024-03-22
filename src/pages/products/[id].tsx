import { useEffect, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useCart } from "@/context/cartContext";
import { Product } from "@/types/product";
import { useRouter } from "next/router";

interface ProductDetailProps {
  product: Product;
  vendorData: string | undefined;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  vendorData,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (product.quantity === 0) {
      alert("This product is out of stock.");
      return; // Prevent further execution
    }
    await addToCart(product, quantity);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleVendorClick = async () => {
    try {
      // Extract vendor ID from the product data
      const vendorId = product.vendor;

      // Navigate to the vendor products page
      router.push(`/vendor-products/${vendorId}`);
    } catch (error) {
      console.error("Error navigating to vendor products:", error);
    }
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
    <div className="product-detail justify-center align-center text-center">
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
      <p
        className={`text-xl font-semibold mb-4 ${
          product.quantity! > 0 ? "text-green-600" : "text-red-600"
        }`}>
        {product.quantity! > 0
          ? `In Stock: ${product.quantity!} available`
          : "Out of Stock"}
      </p>

      <p className="text-xl font-semibold mb-4">{product.price * quantity} $</p>
      <p
        onClick={handleVendorClick}
        className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold underline mb-5">
        Vendor: {vendorData}
      </p>
      <div className="flex gap-2 mb-4 md:flex-row items-center justify-center">
        <button
          disabled={product.quantity === 0}
          onClick={handleAddToCart}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-[20] max-w-[10rem] text-lg md:text-xl ${
            product.quantity === 0 && "opacity-50 cursor-not-allowed"
          }`}>
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
  try {
    const { id } = context.params!;

    // Fetch product data
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}product/${id}`
    );

    if (!response.data) {
      throw new Error("Product data not found");
    }

    const product = response.data;

    // Extract vendor ID from the product data
    const vendorId = product.vendor;

    // Fetch vendor data based on the vendor ID
    const vendorResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/vendor/${vendorId}`
    );

    if (!vendorResponse.data) {
      throw new Error("Vendor data not found");
    }

    const vendorUsername = vendorResponse.data.username;
    console.log(vendorUsername);
    return {
      props: {
        product,
        vendorData: vendorUsername,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }
};

export default ProductDetail;
