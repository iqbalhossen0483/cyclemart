import { useEffect, useState } from "react";

import useFirebase from "../Component/Hook/useFirebase";

const SharedFunction = () => {
  const [addedProduct, setAddedProduct] = useState([]);
  const [customer] = useState({});
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
        `${import.meta.env.VITE_BACKEND_URL}/cyclemart/users/${user.email}`,
        {
          headers: {
            authorization: userToken(),
          },
        }
      )
        .then((res) => {
          console.log(res.status, res.headers.get("content-type"));
          return res.text(); // temporarily
        })
        .then((text) => {
          console.log(text); // see what the server actually returned
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  // console.log(user);

  return {
    addedProduct,
    setAddedProduct,
    customer,
    userToken,
  };
};

export default SharedFunction;
