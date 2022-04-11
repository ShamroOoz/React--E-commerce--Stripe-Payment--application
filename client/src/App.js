import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import Shop from "./components/Pages/Shop";
import CartPage from "./components/Pages/Cart/CartPage";
import Checkout from "./components/Checkout-Page/Checkout";
import Success from "./components/Checkout-Page/stripe-checkout/Success";
import Canceled from "./components/Checkout-Page/stripe-checkout/Canceled";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="success" element={<Success />} />
        <Route path="canceled" element={<Canceled />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
