import stripe from "stripe";

const stripeAPI = new stripe(process.env.STRIPE_SECRET_KEY);

export default stripeAPI;
