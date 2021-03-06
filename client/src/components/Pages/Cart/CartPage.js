import React, { useContext, useState } from "react";
import { CartContext } from "../../../context/cart-context";
import Cartitem from "./Cart-item";
import Total from "./Total";
import { useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../../../Utils/helpers";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    cartItems,
    itemCount,
    total,
    increase,
    decrease,
    removeProduct,
    clearCart,
    setpromotionCodes,
  } = useContext(CartContext);

  let navigator = useNavigate();
  const [discountCode, setdiscountCode] = useState("");

  const funcs = { increase, decrease, removeProduct };

  const checkCouponValidaity = async () => {
    try {
      const result = await fetchFromAPI(`check-promotioncode/${discountCode}`, {
        method: "GET",
      });
      toast.success("Valid Coupon.. ");
      setpromotionCodes(result);
    } catch (error) {
      toast.error("Not valid discount code.. 😲 ");
    }
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="container px-4 mx-auto">
        <div className="p-8 bg-white lg:p-20">
          <h2 className="mb-20 text-5xl font-bold font-heading">
            {itemCount > 0 ? " Your cart " : " You need to buy..."}
          </h2>
          {itemCount > 0 && (
            <>
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full px-4 mb-8 xl:w-8/12 xl:mb-0">
                  <div className="hidden w-full md:flex">
                    <div className="w-full lg:w-3/6">
                      <h4 className="mb-6 font-bold text-gray-500 font-heading">
                        Description
                      </h4>
                    </div>
                    <div className="w-full text-center lg:w-1/6">
                      <h4 className="mb-6 font-bold text-gray-500 font-heading">
                        Quantity
                      </h4>
                    </div>
                    <div className="w-full text-right lg:w-1/6">
                      <h4 className="mb-6 font-bold text-gray-500 font-heading">
                        Price
                      </h4>
                    </div>
                  </div>

                  {cartItems.map((item) => (
                    <Cartitem {...item} key={item.id} {...funcs} />
                  ))}

                  {/* PromoCode section */}
                  <div className="flex flex-wrap items-center lg:-mb-4">
                    <span className="mb-4 mr-12 font-medium">
                      Apply discount code:
                    </span>
                    <input
                      className="flex-1 px-8 py-4 mb-4 mr-6 font-bold placeholder-gray-400 border rounded-md md:flex-none sm:mr-0 md:mr-6 font-heading"
                      type="text"
                      name="discount"
                      onChange={(e) => setdiscountCode(e.target.value)}
                      value={discountCode}
                      placeholder="SUMMER30X"
                    />
                    <button
                      className="flex-1 inline-block px-8 py-4 mb-4 font-bold text-center text-white uppercase bg-gray-800 rounded-md md:flex-none font-heading hover:bg-gray-700"
                      type="button"
                      onClick={() => checkCouponValidaity()}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <Total
                  itemCount={itemCount}
                  total={total}
                  clearCart={clearCart}
                />
              </div>
              <button
                onClick={() => navigator("/custom-checkout-element")}
                className="block mt-4 w-full py-4 font-bold text-center text-white uppercase transition duration-200 bg-blue-600 rounded-md hover:bg-blue-400 font-heading"
              >
                Go to Coustom Stripe Element checkout
              </button>
            </>
          )}

          <button
            onClick={() => navigator("/shop")}
            className="block mt-4 w-full py-4 font-bold text-center text-white uppercase transition duration-200 bg-blue-600 rounded-md hover:bg-blue-400 font-heading"
          >
            Go to Shop
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
