//get the api key from server
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchFromAPI } from "../Utils/helpers";
import { Outlet } from "react-router-dom";
import { CartContext } from "../context/cart-context";
import React, { useContext } from "react";
let shipping = {
  name: "shamroz",
  address: "Stårgatan 1",
  receipt_email: "shamrozwarraich@gmail.com",
};

const StripeCustomLoader = () => {
  const { cartItems } = useContext(CartContext);

  const items = cartItems.map((item) => ({
    price: item.price,
    quantity: item.quantity,
  }));

  const body = {
    cartItems: items,
    shipping: {
      name: shipping.name,
      carrier: "dhl",
      phone: "0765260666",
      tracking_number: "12345",
      address: {
        city: "Ankeborg",
        line1: shipping.address,
        postal_code: "12345",
        country: "SE",
      },
    },
    billing_details: {
      email: "jenny.rosen@example.com",
    },
    description: "payment intent for Dev shop",
    receipt_email: shipping.receipt_email,
  };

  const appearance = {
    theme: "flat",
    variables: {
      colorText: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    },
  };

  let options = {
    appearance,
  };

  let stripePromise;
  const getStripe = async () => {
    if (!stripePromise) {
      const { publishableKey } = await fetchFromAPI("config", {
        method: "GET",
      });
      const { clientSecret } = await fetchFromAPI(
        "create-custom-payment-intent",
        {
          body,
          method: "POST",
        }
      );

      stripePromise = loadStripe(publishableKey);
      options.clientSecret = clientSecret;
    }
    return stripePromise;
  };

  return (
    <Elements stripe={getStripe()} options={options}>
      <Outlet />
    </Elements>
  );
};

export default StripeCustomLoader;
