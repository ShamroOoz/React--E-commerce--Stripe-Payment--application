import React from "react";
import { Link } from "react-router-dom";
import Notfound from "../Utils/Notfound.svg";
const NotFound = () => {
  return (
    <section className="bg-gray-100 pb-20">
      <div className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <a className="text-3xl font-bold font-heading" href="/">
            <img className="h-9" src={Notfound} alt="notFound" width="auto" />
          </a>
        </div>
      </div>
      <div className="relative py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md">
            <h2 className="mb-8 text-4xl md:text-5xl font-bold font-heading bg-gray-50">
              Sorry, we can&rsquo;t find that page or something has gone wrong
            </h2>
            <p className="mb-8 md:mb-16 text-lg">
              Checkout for any URL misspelling.
            </p>
            <Link
              className="inline-block bg-orange-300 hover:bg-orange-400 text-white font-bold font-heading py-4 px-8 rounded-md uppercase transition duration-200"
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
