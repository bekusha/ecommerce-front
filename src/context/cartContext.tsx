import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types/product";
import { Cart, CartItem } from "@/types/cart";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cart: null,
  loading: false,
  addToCart: async () => {},
  removeFromCart: async (productId: number) => {
    /* no-op */
  },
  updateCartItem: async () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<Cart | null>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("access");
  useEffect(() => {
    // Logic here will run whenever `cart` changes.
    console.log("Cart has changed!", cart);
  }, [cart]);
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const token = getToken();
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/detail/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCart({
          items: response.data,
          totalItems: response.data.reduce(
            (acc: any, item: any) => acc + item.quantity,
            0
          ),
          totalPrice: response.data
            .reduce(
              (acc: any, item: any) =>
                acc + item.quantity * parseFloat(item.product.price),
              0
            )
            .toFixed(2),
        });
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateCartItem = async (cartItemId: number, quantity: number) => {
    setLoading(true);
    const token = getToken();
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/update/${cartItemId}/`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);

      setCart((currentCart) => {
        if (!currentCart) return null;

        const updatedItems = currentCart.items.map((item) => {
          if (item.id === cartItemId) {
            return { ...item, quantity };
          }
          return item;
        });

        const updatedTotalItems = updatedItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        console.log(updatedTotalItems);
        const updatedTotalPrice = updatedItems.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        );

        return {
          ...currentCart,
          items: updatedItems,
          totalItems: updatedTotalItems,
          totalPrice: updatedTotalPrice,
        };
      });
    } catch (error) {
      console.error("Failed to update cart item:", error);
      // Handle the error appropriately
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    setLoading(true);
    const token = getToken();
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/remove/${productId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the request is successful, update the local cart state to remove the item.
      // This assumes you have a way to easily identify or find the item in the cart by productId.
      setCart((currentCart) => {
        if (!currentCart) return null;

        const updatedItems = currentCart.items.filter(
          (item) => item.id !== productId
        );
        // Calculate the new totals after removal
        const updatedTotalItems = updatedItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const updatedTotalPrice = updatedItems.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        );

        return {
          ...currentCart,
          items: updatedItems,
          totalItems: updatedTotalItems,
          totalPrice: updatedTotalPrice,
        };
      });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      // Handle the error appropriately
    } finally {
      setLoading(false);
    }
  };
  const addToCart = async (product: Product, quantity: number) => {
    setLoading(true);
    const token = getToken();

    try {
      // Perform the API request to add the item to the server-side cart
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}cart/add/`,
        {
          product_id: product.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming the response contains the updated cart or added cart item
      const addedCartItem = response.data;

      // Update local cart state
      setCart((currentCart) => {
        if (!currentCart) {
          // If there's no current cart, initialize with the added item
          return {
            items: [{ ...addedCartItem, product, quantity }],
            totalItems: quantity,
            totalPrice: parseFloat((product.price * quantity).toFixed(2)),
          };
        } else {
          // Check if the product is already in the cart
          const existingItemIndex = currentCart.items.findIndex(
            (item) => item.product.id === product.id
          );

          let updatedItems = [...currentCart.items];
          if (existingItemIndex !== -1) {
            // Update quantity for existing item
            const existingItem = updatedItems[existingItemIndex];
            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + quantity,
            };
          } else {
            // Add new item to cart
            updatedItems.push({ ...addedCartItem, product, quantity });
          }

          // Recalculate totalItems and totalPrice
          const updatedTotalItems = updatedItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          const updatedTotalPrice = updatedItems.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
          );

          // Return updated cart
          return {
            items: updatedItems,
            totalItems: updatedTotalItems,
            totalPrice: parseFloat(updatedTotalPrice.toFixed(2)),
          };
        }
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
