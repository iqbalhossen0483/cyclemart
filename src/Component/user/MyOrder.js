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
    <div>
      {orders.length ? (
        <>
          <div className='m-5 bg-white text-center'>
            <div className='hidden lg:grid grid-cols-4 gap-3 border-b py-3'>
              <p>Product details</p>
              <p>Product images</p>
              <p>Cutomer details</p>
              <p></p>
            </div>
            <div>
              {orders.map((order) => (
                <Orders
                  key={order._id}
                  order={order}
                  orders={orders}
                  setOrder={setOrder}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className='text-2xl flex justify-center items-center mt-8'>
          <p>you didn't any order place</p>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
