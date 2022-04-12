import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductsContextProvider from "./context/products-context";
import CartContextProvider from "./context/cart-context";
import UserContextProvider from "./context/user-context";

//get the api key from server

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductsContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </CartContextProvider>
    </ProductsContextProvider>
  </BrowserRouter>
);
