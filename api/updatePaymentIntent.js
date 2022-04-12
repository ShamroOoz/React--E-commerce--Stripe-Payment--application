import stripeAPI from "../Helper/stripe.js";
import { getCustomer } from "../Helper/getCustomer.js";

const updatePaymentIntent = async (req, res) => {
  const {
    body: { paymentIntentId },
  } = req;

  const customer = await getCustomer();
  let paymentIntent;

  try {
    paymentIntent = await stripeAPI.paymentIntents.update(paymentIntentId, {
      customer: customer.id,
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "unable to update payment intent" });
  }
};

export default updatePaymentIntent;
