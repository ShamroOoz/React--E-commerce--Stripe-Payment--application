import React, { useContext } from "react";
import Product from "./Product";
import { ProductsContext } from "../../context/products-context";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  const allProducts = products.map((product) => (
    <Product {...product} key={product.id} />
  ));

  return (
    <div className="py-20 bg-gray-100">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-between -mx-4">
          <div className="w-full px-4 mb-12 lg:w-auto xl:mb-0">
            <h2 className="text-5xl font-bold font-heading">
              <span>Found {allProducts.length} results :</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between -mx-4">
          <div className="w-full px-3">
            <div className="flex flex-wrap -mx-3">{allProducts}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
