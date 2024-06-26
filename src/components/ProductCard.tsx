import React from "react";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  isAdminView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  isAdminView,
}) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedDescription = truncateText(product.description, 100);
  console.log(product.image1);
  return (
    <div className="flex flex-col bg-black border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out justify-center items-center text-center h-full">
      {isAdminView && (
        <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
          <button
            onClick={onEdit}
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
          <p className="text-gray-600 text-sm ml-3">
            Quantity: {product.quantity}
          </p>
        </div>
      )}
      <div className="flex-grow p-4 flex flex-col justify-between h-full text-white">
        <div className="flex-1">
          {product.image1 && (
            <div className="image-container w-full h-48 relative mb-4 ">
              <Image
                src={product.image1}
                alt={product.name}
                className="object-contain w-full h-full "
                layout="fill"
              />
            </div>
          )}
          <div className="product-info h-32 overflow-hidden">
            <h3 className="text-lg font-semibold mb-2 text-white hover:text-red-500">
              {product.name}
            </h3>
            <p className=" text-sm mb-4 text-white">{truncatedDescription}</p>
          </div>
        </div>
        <div className="text-gray-900 font-bold">${product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
