import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import Shop from "./components/Pages/Shop";
import CartPage from "./components/Pages/Cart/CartPage";
import Checkout from "./components/Checkout-Page/Checkout";
import Success from "./components/Checkout-Page/stripe-checkout/Success";
import Canceled from "./components/Checkout-Page/stripe-checkout/Canceled";
import Layout from "./components/Layout";
import CustomCheckout from "./components/Checkout-Page/Custom-Checkout";
import CustomSuccess from "./components/Checkout-Page/Custom-Checkout/CustomSuccess";
import CheckoutByelement from "./components/Checkout-Page/Checkout-Element";
import CheckouElSuccess from "./components/Checkout-Page/Checkout-Element/Checkou-El-Success";
const StripeLoader = React.lazy(() => import("./components/StripeLoader"));
const StripeCustomLoader = React.lazy(() =>
  import("./components/StripeCustomLoader")
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<CartPage />} />

          <Route
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <StripeLoader />
              </React.Suspense>
            }
          >
            {/* Pay by checkout Api */}
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="canceled" element={<Canceled />} />
            {/* Pay my custom card element */}
            <Route path="custom-checkout" element={<CustomCheckout />} />
            <Route path="custom-checkout/success" element={<CustomSuccess />} />
          </Route>

          <Route
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <StripeCustomLoader />
              </React.Suspense>
            }
          >
            <Route
              path="custom-checkout-element"
              element={<CheckoutByelement />}
            />
            <Route
              path="custom-checkout-element/success"
              element={<CheckouElSuccess />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
