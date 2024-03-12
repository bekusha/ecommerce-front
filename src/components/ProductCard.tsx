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
  return (
    <div className="product-card">
      {isAdminView && (
        <div className="admin-actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
      <div className="product-image">
        {/* Display the first image if it exists */}
        {product.image1 && (
          <img
            src={product.image1}
            alt={product.name}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>

      <style jsx>{`
        .product-card {
          border: 1px solid #ccc;
          padding: 20px;
          text-align: center;
        }
        .product-info h3 {
          margin: 10px 0;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
