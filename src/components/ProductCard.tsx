import React from "react";
import { Product } from "@/types/product";

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
  // Truncate function to limit description length
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  // Truncate description to keep it uniform
  const truncatedDescription = truncateText(product.description, 100);

  return (
    <div className="flex flex-col  border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
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
        </div>
      )}
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div className="flex-1">
          {product.image1 && (
            <img
              src={product.image1}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
          )}
          <div className="product-info">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 text-sm mb-4 overflow-hidden">
              {truncatedDescription}
            </p>
          </div>
        </div>
        <div className="text-gray-900 font-bold">${product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
