export const isInCart = (product, cartItems) => {
  return cartItems.find((item) => item.id === product.id);
};

const API =
  process.env.NODE_ENV === "production"
    ? "https://react-e-commerce-stripe-payment-application-backend-server.vercel.app"
    : "http://localhost:5000";

export async function fetchFromAPI(endpoint, opts) {
  const { method, body } = { body: null, ...opts };
  //   const user = auth.currentUser;
  const token = 123455; //user && (await user.getIdToken());
  const res = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}
