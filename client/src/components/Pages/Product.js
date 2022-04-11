import React, { useContext } from "react";
import { isInCart } from "../../Utils/helpers";
import { CartContext } from "../../context/cart-context";
import { PlusIcon } from "@heroicons/react/outline";

///
const Product = (props) => {
  const { title, imageUrl, price, id, description } = props;
  const product = { title, imageUrl, price, id, description };
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const itemInCart = isInCart(product, cartItems);

  return (
    <div className="w-full px-3 mb-8 sm:w-1/2 md:w-1/3">
      <div className="p-6 bg-gray-50">
        <span className="px-2 py-1 text-xs font-bold text-red-500 bg-white border-2 border-red-500 rounded-full font-heading">
          -15%
        </span>
        <a className="block px-6 mt-6 mb-2" href="/">
          <img
            className="object-contain w-full h-56 mx-auto mb-5"
            src={imageUrl}
            alt={title}
          />
          <h3 className="mb-2 text-xl font-bold font-heading">
            BRILE water filter
          </h3>
          <p className="text-lg font-bold text-orange-500 font-heading">
            <span>$29.89</span>
            <span className="text-xs font-semibold text-gray-500 line-through font-heading">
              ${price}
            </span>
          </p>
        </a>

        {itemInCart ? (
          <button
            onClick={() => increase(product)}
            className="flex items-center justify-center w-12 h-12 ml-auto mr-2 border rounded-lg hover:border-gray-500"
          >
            <PlusIcon className="w-5 h-12 fill-black" />
          </button>
        ) : (
          <button
            onClick={() => addProduct(product)}
            className="flex items-center justify-center w-12 h-12 ml-auto mr-2 border rounded-lg hover:border-gray-500"
          >
            <PlusIcon className="w-5 h-12 fill-black" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
