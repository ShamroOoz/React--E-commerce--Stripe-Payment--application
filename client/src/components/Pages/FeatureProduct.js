import React, { useContext } from "react";
import { ProductsContext } from "../../context/products-context";
import { Link } from "react-router-dom";
import Product from "./Product";

const FeatureProduct = () => {
  const { products } = useContext(ProductsContext);
  const productItems = products
    .filter((product, i) => i < 3)
    .map((product) => <Product {...product} key={product.id} />);

  return (
    <section className="py-20 bg-gray-100">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-between -mx-4">
          <div className="w-full px-3">
            <div className="flex flex-wrap -mx-3">{productItems}</div>
          </div>
        </div>
        <div className="text-center">
          <Link
            className="inline-block px-8 py-6 font-bold text-white uppercase bg-blue-600 rounded-md hover:bg-blue-400 font-heading"
            to="shop"
          >
            Show More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;
