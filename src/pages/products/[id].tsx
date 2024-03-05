// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
// import { fetchProducts } from '@/store/slices/productSlice';
// import { RootState } from '@/store/store';
// import { useDispatch } from '@/hooks';

// const ProductDetailsPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const dispatch = useDispatch();
//   const { items: products, status, error } = useSelector((state: RootState) => state.products);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchProducts());
//     }
//   }, [status, dispatch]);

//   // Find the product with the matching ID
//   const product: Product | undefined = products.find((product) => product.id === id);

//   // If the product is not found or ID is undefined, handle accordingly
//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   if (!product || !id) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>{product.description}</p>
//       <p>{product.price}</p>
//     </div>
//   );
// };

// export default ProductDetailsPage;
