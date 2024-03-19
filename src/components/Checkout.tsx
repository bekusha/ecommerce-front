import React, { useContext } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/context/cartContext";
import axios from "axios";

const Checkout = () => {
  const { cart } = useCart();

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Your Cart Items",
          amount: {
            currency_code: "USD",
            value: cart!.totalPrice,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: cart!.totalPrice,
              },
            },
          },
          items: cart!.items.map((item) => ({
            name: item.product.name,
            unit_amount: {
              currency_code: "USD",
              value: item.product.price,
            },
            quantity: item.quantity.toString(),
          })),
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    console.log("Order aproved");
    console.log();
    return actions.order.capture().then((details: any) => {
      console.log(details);
      alert("Transaction completed by " + details.payer.name.given_name);
      const accessToken = localStorage.getItem("access");
      const transactionData = {
        transaction_id: details.id,
        total_amount: details.purchase_units[0].amount.value.toString(), // Ensure it's included and correctly named
        currency: details.purchase_units[0].amount.currency_code,
        payer_details: details.payer, // This must match the expected structure in your Django model
        items: cart?.items.map((item) => ({
          product: item.product.id, // Only the ID, ensuring it's not an object
          quantity: item.quantity,
          price_at_transaction: item.product.price.toString(), // Must be included for each item
        })),
      };

      console.log(transactionData);

      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}payment/transactions/`,
          transactionData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(
            "Transaction successfully stored in the backend",
            response.data
          );
        })
        .catch((error) => console.error("Error:", error));
    });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart!.items.map((item, index) => (
          <li key={index}>
            <div>
              <h3>{item.product.name}</h3>
              {/* <p>{item.product.description}</p> */}
              <p> Quantity:{item.quantity}</p>
              <p>Price per item: ${item.product.price}</p>
              <p>Subtotal: ${item.product.price * item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <strong>Total Price:</strong> ${cart!.totalPrice}
      </div>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};

export default Checkout;
