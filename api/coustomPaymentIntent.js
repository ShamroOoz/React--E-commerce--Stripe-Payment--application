import stripeAPI from "../Helper/stripe.js";

const calculateOrderAmount = (cartItems) => {
  return (
    cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0) * 100
  );
};

const coustomPaymentIntent = async (req, res) => {
  const { cartItems, description, receipt_email, shipping } = req.body;
  let paymentIntent;
  try {
    paymentIntent = await stripeAPI.paymentIntents.create({
      amount: calculateOrderAmount(cartItems),
      currency: "sek",
      description,
      automatic_payment_methods: {
        enabled: true,
      },
      //setup_future_usage: "off_session",if we use this then we can use the other method like klarna because they not support saving info
      receipt_email,
      shipping,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "an error occured, unable to create payment intent" });
  }
};

export default coustomPaymentIntent;
