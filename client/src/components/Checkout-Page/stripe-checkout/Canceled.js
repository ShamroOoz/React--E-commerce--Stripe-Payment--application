import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../../../Utils/helpers";

const Canceled = () => {
  let [searchParams] = useSearchParams();
  const [dataObject, setdataObject] = useState({});
  let Navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      const responce = await fetchFromAPI(
        `get-checkout-session?id=${searchParams.get("session_id")}`
      );
      setdataObject(responce);
    };
    getResult();
  }, [searchParams]);

  return (
    <div className="bg-slate-300 rounded-2xl container mx-auto">
      <h2>Order Canceled Reason Behind... 😢 </h2>
      <div className="flex gap-3 ">
        <button
          onClick={() => (window.location.href = dataObject.url)}
          className="px-8 py-5 mt-8 font-bold text-white uppercase bg-blue-500 rounded-md md:mt-10 hover:bg-blue-700 font-heading"
        >
          Try AGAIN TO pAY
        </button>
        <button
          onClick={() => Navigate("/", { replace: true })}
          className="px-8 py-5 mt-8 font-bold text-white uppercase bg-blue-500 rounded-md md:mt-10 hover:bg-blue-700 font-heading"
        >
          Back to Home
        </button>
      </div>
      <pre>{JSON.stringify(dataObject, null, 2)}</pre>
    </div>
  );
};

export default Canceled;
