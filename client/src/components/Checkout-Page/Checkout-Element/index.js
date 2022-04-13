import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutByelement = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setProcessing(true);

    const payload = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          process.env.NODE_ENV === "production"
            ? "https://react-e-commerce-stripe-payment-application.vercel.app/success"
            : "http://localhost:3000/custom-checkout-element/success",
      },
      // Uncomment below if you only want redirect for redirect-based payments
      // redirect: 'if_required',
    });

    if (payload.error) {
      setProcessing(false);
      setError(`Payment Failed: ${payload.error.message}`);
    } else {
      console.log(
        "you need to add th succes link in the confirmCardPayment method.. ",
        payload
      );
    }
  };

  return (
    <div className="mx-auto container mt-16 p-8 max-w-xl rounded-lg shadow-lg">
      <PaymentElement />
      <button
        type="button"
        disabled={processing}
        onClick={() => handleCheckout()}
        className=" mt-3 inline-block px-10 py-3 disabled:opacity-50 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
      >
        {processing ? "PROCESSING" : "PAY"}
      </button>
      <div className="mt-3">
        {error && <p className="text-pink-400">{error}</p>}
      </div>
    </div>
  );
};

export default CheckoutByelement;
