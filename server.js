import "dotenv/config";
import express from "express";
import cors from "cors";
import stripeAPI from "./Helper/stripe.js";
import createCheckoutSession from "./api/checkout.js";
import webhook from "./api/webhook.js";
import paymentIntent from "./api/paymentIntent.js";
import coustomPaymentIntent from "./api/coustomPaymentIntent.js";
import setupIntent from "./api/setupIntent.js";
import getCards from "./api/getPaymentMethod.js";
import updatePaymentIntent from "./api/updatePaymentIntent.js";

const app = express();
const port = 5000;

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
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

    if (session.customer) {
      const customer = await stripeAPI.customers.retrieve(session.customer);
    }
    return res.status(200).json(session);
  } catch (error) {
    console.log(error);
  }
});

//get the promotion code by this methos and then apply in checkout sesssion
app.get("/check-promotioncode/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const { data } = await stripeAPI.promotionCodes.list({
      code,
    });

    if (data.length && data[0]?.active) {
      return res.status(200).json({ ...data[0] });
    }
    throw new Error("Not a valid promotion Code");
  } catch (error) {
    res.status(408).send(error.message);
  }
});

app.post("/create-custom-payment-intent", coustomPaymentIntent);

app.post("/create-payment-intent", paymentIntent);

app.post("/save-payment-method", setupIntent);

app.get("/get-payment-methods", getCards);

app.put("/update-payment-intent", updatePaymentIntent);

app.post("/webhook", webhook);

app.listen(port, () => console.log("server listening on port", port));
