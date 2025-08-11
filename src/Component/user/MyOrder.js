import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useFirebase from "../Hook/useFirebase";
import useFunc from "../Hook/useFunc";
import Orders from "../ShareComponent/Orders";

const MyOrder = () => {
  const [orders, setOrder] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { user } = useFirebase();
  const { userToken } = useFunc();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/cyclemart/orders/${user.email}`,
      {
        headers: {
          authorization: userToken(),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setIsloading(false);
      })
      .catch(() => {
        toast.error("Unexpected error ocurs");
        setIsloading(false);
      });
  }, [user.email, userToken]);

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="my-5">
      {orders.length ? (
        <table>
          <thead>
            <tr>
              <th>Product details</th>
              <th>Product images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Orders
                key={order._id}
                order={order}
                orders={orders}
                setOrder={setOrder}
                title="myOrder"
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-xl py-8 text-gray-500">
          <p>You didn't any order place</p>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
