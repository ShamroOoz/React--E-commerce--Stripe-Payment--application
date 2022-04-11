import React, { useReducer, useContext } from "react";
import { ShoppingCartIcon, MenuAlt3Icon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/cart-context";

const Navbar = () => {
  const [open, openSet] = useReducer((state) => !state, false);
  const { itemCount } = useContext(CartContext);

  return (
    <nav>
      <div className="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <a
              className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
              href="/"
            >
              Brand
            </a>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => openSet()}
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <MenuAlt3Icon className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>

        <div
          className={`flex-col ${
            open ? "flex" : "hidden"
          } flex text-gray-600  capitalize dark:text-gray-300 md:flex md:px-16 md:-mx-4 md:flex-row md:items-center`}
        >
          <div className="flex flex-col lg:flex-row lg:mx-6">
            <NavLink
              className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 lg:mx-4 lg:my-0"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 lg:mx-4 lg:my-0"
              to="shop"
            >
              Shop
            </NavLink>
            <NavLink
              className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 lg:mx-4 lg:my-0"
              to="/"
            >
              Contact
            </NavLink>
            <NavLink
              className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 lg:mx-4 lg:my-0"
              to="/"
            >
              About
            </NavLink>
          </div>
        </div>

        <div
          className={`justify-center mt-6 md:flex md:mt-0 md:-mx-2 ${
            open ? "flex" : "hidden"
          }`}
        >
          <NavLink
            className="relative text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
            to="cart"
          >
            <ShoppingCartIcon className="w-5 h-5" />

            <span className="absolute p-1 text-xs text-white bg-blue-500 rounded-full -right-2 -top-4">
              {itemCount}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
