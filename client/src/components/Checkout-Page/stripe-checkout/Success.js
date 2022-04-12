import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../../../Utils/helpers";
import { CartContext } from "../../../context/cart-context";

const Success = () => {
  let [searchParams] = useSearchParams();
  const { clearCart, cartItems } = useContext(CartContext);
  let navigator = useNavigate();
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
      <div className="checkout">
        <h1>Thank you for your order</h1>
        <p>
          We are currently processing your order and will send you a
          confirmation email shortly
        </p>
        <div>
          <button
            className="button is-black nomad-btn submit"
            onClick={() => navigator("/shop", { replace: true })}
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <pre>{JSON.stringify(dataObject, null, 2)}</pre>
    </div>
  );
};

export default Success;
