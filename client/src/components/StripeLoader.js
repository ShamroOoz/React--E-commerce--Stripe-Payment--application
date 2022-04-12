//get the api key from server
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchFromAPI } from "../Utils/helpers";
import { Outlet } from "react-router-dom";

const StripeLoader = () => {
  let stripePromise;
  const getStripe = async () => {
    if (!stripePromise) {
      const { publishableKey } = await fetchFromAPI("config", {
        method: "GET",
      });
      stripePromise = loadStripe(publishableKey);
    }
    return stripePromise;
  };
  return (
    <Elements stripe={getStripe()}>
      <Outlet />
    </Elements>
  );
};

export default StripeLoader;
