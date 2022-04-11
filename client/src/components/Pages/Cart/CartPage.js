import React, { useContext } from "react";
import { CartContext } from "../../../context/cart-context";
import Cartitem from "./Cart-item";
import Total from "./Total";
const CartPage = () => {
  const {
    cartItems,
    itemCount,
    total,
    increase,
    decrease,
    removeProduct,
    clearCart,
  } = useContext(CartContext);

  const funcs = { increase, decrease, removeProduct };
  return (
    <section className="py-20 bg-gray-100">
      <div className="container px-4 mx-auto">
        <div className="p-8 bg-white lg:p-20">
          <h2 className="mb-20 text-5xl font-bold font-heading">Your cart</h2>
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
                  className="flex-1 px-8 py-4 mb-4 mr-6 font-bold placeholder-gray-800 border rounded-md md:flex-none sm:mr-0 md:mr-6 font-heading"
                  type="text"
                  placeholder="SUMMER30X"
                />
                <a
                  className="flex-1 inline-block px-8 py-4 mb-4 font-bold text-center text-white uppercase bg-gray-800 rounded-md md:flex-none font-heading hover:bg-gray-700"
                  href="/"
                >
                  Apply
                </a>
              </div>
            </div>

            <Total itemCount={itemCount} total={total} clearCart={clearCart} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
