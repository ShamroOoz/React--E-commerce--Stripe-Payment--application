import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductsContextProvider from "./context/products-context";
import CartContextProvider from "./context/cart-context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchFromAPI } from "./Utils/helpers";

//get the api key from server

let stripePromise;
const getStripe = async () => {
  if (!stripePromise) {
    const { publishableKey } = await fetchFromAPI("config", {
      method: "GET",
    });
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsContextProvider>
      <CartContextProvider>
        <Elements stripe={getStripe()}>
          <App />
        </Elements>
      </CartContextProvider>
    </ProductsContextProvider>
  </BrowserRouter>
);
