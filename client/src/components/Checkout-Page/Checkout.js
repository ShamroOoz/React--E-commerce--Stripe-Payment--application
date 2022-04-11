import React, { useState, useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../../Utils/helpers";

const Checkout = () => {
  const [error, seterror] = useState("");
  const { cartItems } = useContext(CartContext);
  const elements = useElements();
  const stripe = useStripe();

  const handleGuestCheckout = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const data = new FormData(e.target);
    let formResult = {
      name: data.get("name"),
      email: data.get("email"),
      adress: data.get("adress"),
    };
    if (!Object.values(formResult).every(Boolean)) {
      return seterror("Please Fill All fileds...");
    } else seterror("");

    const line_items = cartItems.map((item) => {
      return {
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
        price_data: {
          currency: "usd",
          unit_amount: item.price * 100, // amount is in cents
          product_data: {
            name: item.title,
            description: item.description,
            images: [item.imageUrl],
          },
        },
      };
    });

    try {
      const { sessionId } = await fetchFromAPI("create-checkout-session", {
        body: { line_items, customer_email: formResult.email },
        method: "POST",
      });

      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-20 overflow-x-hidden bg-gray-100">
      <div className="container relative px-4 mx-auto">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 my-24 -ml-4 -mr-4 bg-blue-200"></div>
          <div className="relative px-4 py-16 bg-white md:pt-32 md:pb-20 sm:px-8">
            <div className="max-w-lg mx-auto text-center">
              <h3 className="mb-8 text-4xl font-bold md:text-5xl font-heading">
                Checkout Summary
              </h3>
              <p className="mb-10 font-semibold text-pink-600 font-heading">
                {error}
              </p>
              <form onSubmit={handleGuestCheckout}>
                <input
                  className="w-full px-12 py-6 mb-4 border border-gray-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                  type="text"
                  placeholder="steven@gamil.com"
                  name="email"
                />
                <input
                  className="w-full px-12 py-6 mb-4 border border-gray-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                  type="text"
                  placeholder="Name"
                  name="name"
                />
                <input
                  className="w-full px-12 py-6 mb-10 border border-gray-200 rounded-md focus:ring-blue-300 focus:border-blue-300"
                  type="Adress"
                  placeholder="Enter Adress"
                  name="adress"
                />
                <button className="px-8 py-5 mt-8 font-bold text-white uppercase bg-blue-500 rounded-md md:mt-10 hover:bg-blue-700 font-heading">
                  Pay now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
