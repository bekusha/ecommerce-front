import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Make sure to import Link from next/link
import { useProducts } from "@/context/productContext";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard"; // Adjust the import path as needed

const VendorProductsPage: React.FC = () => {
  const router = useRouter();
  const { vendorId } = router.query;
  const { products, fetchProductsByVendor } = useProducts();

  useEffect(() => {
    if (vendorId) {
      // Fetch products by vendor ID
      fetchProductsByVendor(Number(vendorId));
    }
  }, [vendorId]);

  if (!products) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products available for this vendor.</div>;
  }

  return (
    <div className="">
      <h1 className="flex justify-center">Selected Vendors Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product: Product) => (
          <Link key={product.id} href={`/products/${product.id}`} passHref>
            <div>
              {" "}
              <ProductCard
                product={product}
                onEdit={() => {}}
                onDelete={() => {}}
                isAdminView={false}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VendorProductsPage;
