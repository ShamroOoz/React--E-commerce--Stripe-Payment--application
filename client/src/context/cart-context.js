import React, { createContext, useReducer } from "react";
import cartReducer, { sumItems } from "./cart-reducer";
import toast from "react-hot-toast";

export const CartContext = createContext();

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: cartFromStorage,
  promotionCodes: undefined,
  ...sumItems(cartFromStorage),
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProduct = (product) => {
    toast.success("Product Added Successfully...");
    return dispatch({ type: "ADD_ITEM", payload: product });
  };
  const increase = (product) => {
    toast.success("Product Added Successfully...");
    return dispatch({ type: "INCREASE", payload: product });
  };

  const decrease = (product) => {
    toast.success("Product Removed... ");
    return dispatch({ type: "DECREASE", payload: product });
  };
  const removeProduct = (product) => {
    toast.success("Cart Cleared..");
    return dispatch({ type: "REMOVE_ITEM", payload: product });
  };
  const setpromotionCodes = (code) => {
    console.log(code);
    return dispatch({ type: "Add_coupon", payload: code });
  };
  const clearCart = () => dispatch({ type: "CLEAR" });
  const contextValues = {
    ...state,
    addProduct,
    increase,
    decrease,
    removeProduct,
    clearCart,
    setpromotionCodes,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
