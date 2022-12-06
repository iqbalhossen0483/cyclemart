import React, { useEffect, useState } from "react";
import useFirebase from "../Hook/useFirebase";
import Orders from "../ShareComponent/Orders";
import { useAlert } from "react-alert";
import useFunc from "../Hook/useFunc";

const MyOrder = () => {
  const [orders, setOrder] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { user } = useFirebase();
  const alart = useAlert();
  const { userToken } = useFunc();

  useEffect(() => {
    fetch(`https://iqbal.diaryofmind.com/cyclemart/orders/${user.email}`, {
      headers: {
        authorization: userToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setIsloading(false);
      })
      .catch((err) => {
        alart.show("Unexpected error ocurs");
        setIsloading(false);
      });
  }, [user.email, alart, userToken]);

  if (isLoading) {
    return (
      <div className='spinner-container'>
        <div className='spinner'></div>
      </div>
    );
  }
  return (
    <div className='my-5'>
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
                title='myOrder'
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className='text-center text-xl py-8 text-gray-500'>
          <p>You didn't any order place</p>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
