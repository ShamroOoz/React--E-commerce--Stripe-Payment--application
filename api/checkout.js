import stripeAPI from "../Helper/stripe.js";

const createCheckoutSession = async (req, res) => {
  const domainUrl = process.env.WEB_APP_URL;
  const { line_items, customer_email, promotionCodes } = req.body;

  // check req body has line items and email
  if (!line_items || !customer_email) {
    return res
      .status(400)
      .json({ error: "Missing required session parameters" });
  }
  let session;

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card", "klarna"],
      mode: "payment",
      line_items,
      customer_email,
      discounts: [
        {
          coupon: promotionCodes,
        },
      ],
      shipping_rates: ["shr_1KmzKRLMgvU1cp6VDqC9of40"],
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled?session_id={CHECKOUT_SESSION_ID}`,
      shipping_address_collection: { allowed_countries: ["US", "SE"] },
    });
    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "an error occured, unable to create session" });
  }

  res.send("Heloo");
};

export default createCheckoutSession;
