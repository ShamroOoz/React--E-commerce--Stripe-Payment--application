import React from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";

const Cartitem = (props) => {
  const {
    title,
    imageUrl,
    price,
    quantity,
    id,
    description,
    increase,
    decrease,
  } = props;
  const product = { title, imageUrl, price, quantity, id, description };

  return (
    <div className="py-6 mb-12 border-t border-b border-gray-200">
      <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-3">
        <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full px-4 mb-3 md:w-1/3">
              <div className="flex items-center justify-center w-full h-32 bg-gray-100 md:w-24">
                <img
                  className="object-contain h-full"
                  src={imageUrl}
                  alt={title}
                />
              </div>
            </div>
            <div className="w-2/3 px-4">
              <h3 className="mb-2 text-xl font-bold font-heading">{title}</h3>
              <p className="text-gray-500">{description}</p>
            </div>
          </div>
        </div>
        <div className="flex w-auto gap-3 md:w-1/6 ">
          <div className="inline-flex items-center px-4 font-semibold text-white bg-pink-600 rounded-md hover:bg-pink-300 font-heading ">
            <button
              type="button"
              onClick={() => decrease(product)}
              className="py-2"
            >
              <MinusIcon className="w-5 h-9 " />
            </button>
          </div>
          <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md font-heading focus:ring-blue-300 focus:border-blue-300">
            <p>{quantity}</p>
          </div>

          <button
            type="button"
            onClick={() => increase(product)}
            className="inline-flex items-center px-4 py-2 font-semibold text-gray-500 border rounded-md hover:text-gray-700 hover:bg-slate-400 font-heading"
          >
            <PlusIcon className="w-5 h-9 " />
          </button>
        </div>
        <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12">
          <p className="text-lg font-bold text-blue-500 font-heading">
            ${price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
