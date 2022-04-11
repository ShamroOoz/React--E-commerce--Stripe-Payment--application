import "dotenv/config";
import express from "express";
import cors from "cors";
import stripeAPI from "./stripe.js";
import createCheckoutSession from "./api/checkout.js";
// import webhook from "./api/webhook.js";
// import paymentIntent from "./api/paymentIntent";
// import setupIntent from "./api/setupIntent";
// import getCards from "./api/getPaymentMethod";
// import updatePaymentIntent from "./api/updatePaymentIntent";

const app = express();
const port = 5000;

app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);

app.use(cors({ origin: true }));

// app.use(decodeJWT);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/config", (req, res) => {
  return res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-checkout-session", createCheckoutSession);

app.get("/get-checkout-session", async (req, res) => {
  try {
    const session = await stripeAPI.checkout.sessions.retrieve(req.query.id, {
      expand: ["line_items"],
    });
    const customer = await stripeAPI.customers.retrieve(session.customer);
    console.log(customer);
    return res.status(200).json(session);
  } catch (error) {
    console.log(error);
  }
});

// app.post("/create-payment-intent", paymentIntent);

// app.post("/save-payment-method", validateUser, setupIntent);

// app.get("/get-payment-methods", validateUser, getCards);

// app.put("/update-payment-intent", validateUser, updatePaymentIntent);

// app.post("/webhook", webhook);

app.listen(port, () => console.log("server listening on port", port));
