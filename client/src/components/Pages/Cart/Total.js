import React from "react";
import { useNavigate } from "react-router-dom";

const Total = ({ itemCount, total, clearCart }) => {
  let navigator = useNavigate();
  return (
    <div className="w-full px-4 xl:w-4/12">
      <div className="p-6 bg-orange-300 md:p-12">
        <h2 className="mb-6 text-4xl font-bold text-white font-heading">
          Cart totals
        </h2>
        <div className="flex items-center justify-between pb-5 mb-8 border-b border-blue-100">
          <span className="text-blue-50">Subtotal</span>
          <span className="text-xl font-bold text-white font-heading">
            ${total}
          </span>
        </div>
        <div className="flex items-center justify-between pb-5 mb-8 border-b border-blue-100">
          <span className="text-blue-50">Total Items</span>
          <span className="text-xl font-bold text-white font-heading">
            {itemCount}
          </span>
        </div>
        <h4 className="mb-2 text-xl font-bold text-white font-heading">
          Shipping
        </h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-blue-50">Next day</span>
          <span className="text-xl font-bold text-white font-heading">
            $11.00
          </span>
        </div>
        <div className="flex items-center justify-between mb-10">
          <span className="text-blue-50">Shipping to United States</span>
          <span className="text-xl font-bold text-white font-heading">-</span>
        </div>
        <div className="flex items-center justify-between mb-10">
          <span className="text-xl font-bold text-white font-heading">
            Order total
          </span>
          <span className="text-xl font-bold text-white font-heading">
            ${total}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigator("/checkout")}
            className="block w-full py-4 font-bold text-center text-white uppercase transition duration-200 bg-blue-600 rounded-md hover:bg-blue-400 font-heading"
          >
            Go to Checkout
          </button>
          <button
            onClick={() => {
              clearCart();
              navigator("/shop");
            }}
            className="block w-full py-4 font-bold text-center text-white uppercase transition duration-200 bg-pink-600 rounded-md hover:bg-pink-400 font-heading"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Total;
