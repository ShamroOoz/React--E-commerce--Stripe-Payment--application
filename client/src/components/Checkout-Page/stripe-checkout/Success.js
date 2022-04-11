import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchFromAPI } from "../../../Utils/helpers";
import { CartContext } from "../../../context/cart-context";

const Success = () => {
  let [searchParams] = useSearchParams();
  const { clearCart, cartItems } = useContext(CartContext);

  const [dataObject, setdataObject] = useState({});

  useEffect(() => {
    const getResult = async () => {
      const responce = await fetchFromAPI(
        `get-checkout-session?id=${searchParams.get("session_id")}`
      );
      setdataObject(responce);
    };
    if (cartItems.length !== 0) {
      clearCart();
    }
    getResult();
  }, [searchParams, clearCart, cartItems]);

  return (
    <div>
      <h2>Order Placed Successfully 🛫 </h2>
      <pre>{JSON.stringify(dataObject, null, 2)}</pre>
    </div>
  );
};

export default Success;
