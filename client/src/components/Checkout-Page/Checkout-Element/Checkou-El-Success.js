import { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";

const CheckouElSuccess = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [PaymentIt, setPaymentIt] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setPaymentIt(paymentIntent);
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Success! Payment received.");
          break;

        case "processing":
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case "requires_payment_method":
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage("Payment failed. Please try another payment method.");
          break;

        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <div className="bg-slate-300 rounded-2xl container mx-auto">
      <p className="text-lg font-bold">{message}</p>
      <pre>{JSON.stringify(PaymentIt, null, 2)}</pre>
    </div>
  );
};

export default CheckouElSuccess;
