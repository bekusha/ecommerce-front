// import React, { useEffect } from "react";
// import { useCart } from "@/context/cartContext";

// declare global {
//   interface Window {
//     paypal: any;
//   }
// }

// const Checkout = () => {
//   const { cart, processPayment } = useCart();

//   useEffect(() => {
//     const scriptId = "paypal-sdk-script";
//     const existingScript = document.getElementById(scriptId);

//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.id = scriptId;
//       script.src = `https://www.paypal.com/sdk/js?client-id=Afo-N4I1tAovg0YGH7fP6JHYsyo1akDwD0GRjY9AZOlJ_KQuLiFzvcQygNHgZvDvjpSrM_sktsiTea5u&currency=USD`;
//       script.onload = () => {
//         if (window.paypal) {
//           window.paypal
//             .Buttons({
//               createOrder: (data: any, actions: any) => {
//                 return actions.order.create({
//                   purchase_units: [
//                     { amount: { value: cart?.totalPrice || "0" } },
//                   ],
//                 });
//               },
//               onApprove: async (data: any, actions: any) => {
//                 const details = await actions.order.capture();
//                 await processPayment();
//                 console.log("Payment successful!", details);
//               },
//               onError: (err: any) => {
//                 console.error("PayPal Payment Error", err);
//               },
//             })
//             .render("#paypal-button-container");
//         }
//       };
//       document.body.appendChild(script);
//     }

//     return () => {
//       // Remove the PayPal script when the component unmounts
//       const existingScript = document.getElementById(scriptId);
//       if (existingScript) {
//         existingScript.remove();
//       }
//     };
//   }, [cart, processPayment]);

//   return (
//     <div>
//       <h1>Checkout</h1>
//       <div id="paypal-button-container"></div>
//     </div>
//   );
// };

// export default Checkout;
