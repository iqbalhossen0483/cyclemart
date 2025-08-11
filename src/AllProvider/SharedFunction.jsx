import { useEffect, useState } from "react";

import useFirebase from "../Component/Hook/useFirebase";

const SharedFunction = () => {
  const [addedProduct, setAddedProduct] = useState([]);
  const [customer, setCustomer] = useState({});
  const { user } = useFirebase();

  //jwt token which is stored in local storige
  const userToken = () => {
    const gettoken = localStorage.getItem("token");
    const token = JSON.parse(gettoken);
    return token;
  };

  //check user has token or not
  useEffect(() => {
    if (user.email && userToken()) {
      fetch(
        `${import.meta.env.REACT_APP_BACKEND_URL}/cyclemart/users/${
          user.email
        }`,
        {
          headers: {
            authorization: userToken(),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAddedProduct(data.cart);
          setCustomer({ ...user, ...data });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  return {
    addedProduct,
    setAddedProduct,
    customer,
    userToken,
  };
};

export default SharedFunction;
