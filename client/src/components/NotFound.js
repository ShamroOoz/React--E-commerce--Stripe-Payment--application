import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="pb-20 bg-white">
      <div className="relative py-20 bg-white md:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-md">
            <h2 className="mb-8 text-4xl font-bold md:text-5xl font-heading ">
              Sorry, we can&rsquo;t find that page or something has gone wrong
            </h2>
            <p className="mb-8 text-lg md:mb-16">
              Checkout for any URL misspelling.
            </p>
            <Link
              className="inline-block px-8 py-4 font-bold text-white uppercase transition duration-200 bg-blue-300 rounded-md hover:bg-blue-400 font-heading"
              to="/"
            >
              Homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
