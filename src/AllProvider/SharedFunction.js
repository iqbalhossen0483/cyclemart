import { useEffect } from "react";
import { useState } from "react";
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
      fetch(`http://localhost:5000/cyclemart/users/${user.email}`, {
        headers: {
          authorization: userToken(),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAddedProduct(data.cart);
          setCustomer({ ...user, ...data });
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
