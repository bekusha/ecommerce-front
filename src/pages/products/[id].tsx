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
import { useAuth } from "@/context/authContext";

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
  const { isLoggedIn } = useAuth()!;

  useEffect(() => {
    console.log(product);
  }, []);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("თქვენ უნდა შეხვიდეთ თქვენი ექაუნთით რათა გაიაროთ რეგისტრაცია");
      return; // Prevent further execution if not logged in
    }
    if (product.quantity === 0) {
      alert("სამწუხაროდ პროდუქტის მარაგი ამოწურულია");
      return; // Prevent further execution
    }
    await addToCart(product, quantity);
    alert("პროდუქტი წარმატებით დაემატა კალათში");
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
    <div className="flex flex-col md:flex-row items-center justify-center text-center bg-black text-white p-4 gap-8">
      <div className="w-full md:w-1/2 mt-[10rem] ">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="swiper-container h-[500px]">
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              {image && (
                <div className="relative w-full h-full">
                  <Image
                    className="rounded-sm"
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
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 mt-4  ">
          {product.name}
        </h1>
        <p className="text-md md:text-md lg:text-2xl mb-4 mx-auto max-w-[30rem]">
          {product.description}
        </p>
        <p
          className={`text-md font-semibold mb-4 ${
            product.quantity! > 0 ? "text-blue-300" : "text-red-500"
          }`}>
          {product.quantity! > 0
            ? `მარაგშია: ${product.quantity}`
            : "ამჟამად მარაგი ამოწურულია"}
        </p>
        <p className="text-md font-semibold mb-4">
          ბოთლის მოცულობა:{" "}
          <span className="font-semibold">{product.liter}</span> ლიტრი
        </p>
        <p className="text-md font-semibold mb-4">
          {product.price * quantity} $
        </p>
        <div className="flex gap-2 mb-4 items-center justify-center">
          <button
            disabled={product.quantity === 0}
            onClick={handleAddToCart}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded min-w-[20] max-w-[10rem] text-sm  disabled:opacity-50 disabled:cursor-not-allowed">
            შეძენა
          </button>
          <div className="flex items-center">
            <button
              className="text-black bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
              onClick={() => handleQuantityChange(-1)}>
              -
            </button>
            <span className="mx-2 text-white">{quantity}</span>
            <button
              className="text-black bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
              onClick={() => handleQuantityChange(1)}>
              +
            </button>
          </div>
        </div>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded min-w-[20] max-w-[10rem] text-sm ">
          სერვისის გამოძახება
        </button>
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
