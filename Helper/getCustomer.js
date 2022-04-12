import stripeAPI from "./stripe.js";

const userAuth = {
  id: "1234567890",
  name: "shamroz",
  email: "shamrozwarraich@gmail.com",
  verfied_email: true,
  stripeCustomerId: "cus_LUmEgGFzZysvHr",
};

export const createCustomer = async () => {
  const { email, name, id } = userAuth;

  const customer = await stripeAPI.customers.create({
    email,
    name,
    metadata: {
      UID: id,
    },
  });

  userAuth.stripeCustomerId = customer.id;

  return customer;
};

export const getCustomer = async () => {
  const { stripeCustomerId } = userAuth;
  if (!stripeCustomerId) {
    return createCustomer();
  }

  const customer = await stripeAPI.customers.retrieve(stripeCustomerId);
  return customer;
};
