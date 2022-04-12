import React, { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

const CustomSuccess = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  let location = useLocation();

  let { paymentIntent } = location?.state;

  useEffect(() => {
    if (!stripe) {
      return;
    }
    stripe
      .retrievePaymentIntent(paymentIntent.client_secret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Success! Payment received.");
            break;

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            );
            break;

          case "requires_payment_method":
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage("Payment failed. Please try another payment method.");
            break;

          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe, paymentIntent.client_secret]);

  return (
    <div className="bg-slate-300 rounded-2xl container mx-auto">
      <p className="text-lg font-bold">{message}</p>
      <pre>{JSON.stringify(paymentIntent, null, 2)}</pre>
    </div>
  );
};

export default CustomSuccess;
