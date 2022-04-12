import stripeAPI from "../Helper/stripe.js";
import { getCustomer } from "../Helper/getCustomer.js";

const getCards = async (req, res) => {
  //const { currentUser } = req;
  const customer = await getCustomer();
  let cards;
  try {
    cards = await stripeAPI.paymentMethods.list({
      customer: customer.id,
      type: "card",
    });
    res.status(200).json(cards.data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "an error occured, unable to get cards" });
  }
};

export default getCards;
