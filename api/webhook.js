import stripeAPI from "../Helper/stripe.js";

const webHookHandlers = {
  "checkout.session.completed": (data) => {
    if (data.payment_status === "paid") {
      return console.log("Checkout completed successfully", data);
    }
    console.log(
      "Checkout completed successfully but the payment is in processing ..."
    );
  },
  "checkout.session.async_payment_succeeded": (session) => {
    console.log("checkout.session.async_payment_succeeded", session);
  },
  "checkout.session.async_payment_failed": (session) => {
    console.log("checkout.session.async_payment_failed", session);
  },

  "payment_intent.succeeded": (data) => {
    console.log("Payment succeeded", data);
  },
  "payment_intent.payment_failed": (data) => {
    console.log("Payment Failed", data);
  },
  //Todo these hooks work with custom checkout

  "payment_intent.created": (data) => {
    console.log("💰 Payment intent created!", data);
  },
  "payment_intent.succeeded": (data) => {
    console.log("💰 Payment captured!", data);
  },
  "payment_intent.processing": (data) => {
    console.log("processing");
  },
  "payment_intent.payment_failed": (data) => {
    console.log("❌ Payment failed.");
  },
};

const webhook = (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    let event;
    let signature = req.headers["stripe-signature"];
    try {
      event = stripeAPI.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.status(400).send(`Webhook error ${error.message}`);
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }
  if (webHookHandlers[eventType]) {
    webHookHandlers[eventType](data);
  }
  res.sendStatus(200);
};

export default webhook;
