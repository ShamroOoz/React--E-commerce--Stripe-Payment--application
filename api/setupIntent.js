import stripeAPI from "../Helper/stripe.js";
import { getCustomer } from "../Helper/getCustomer.js";

const setupIntent = async (req, res) => {
  const { currentUser } = req;
  // get stripe customer
  const customer = await getCustomer();
  let setupIntent;

  try {
    setupIntent = await stripeAPI.setupIntents.create({
      customer: customer.id,
    });
    res.status(200).json(setupIntent);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "an error occured, unable to create setup intent" });
  }
};

export default setupIntent;
