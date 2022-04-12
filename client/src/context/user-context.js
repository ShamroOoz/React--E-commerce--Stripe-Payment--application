import React, { useEffect, createContext, useState } from "react";

export const UserContext = createContext();

const userAuth = {
  id: "1234567890",
  name: "shamroz",
  email: "shamrozwarraich@gmail.com",
  verfied_email: true,
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(userAuth);
    setLoading(false);
  }, []);

  const userContext = { user, loading };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
