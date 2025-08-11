import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import useFunc from "../../Hook/useFunc";
import Orders from "../../ShareComponent/Orders";

const ManageOrder = () => {
  const [orders, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useFunc();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/orders`, {
      headers: {
        authorization: userToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setIsLoading(false);
      });
  }, [isLoading, userToken]);

  const handleApprove = (id) => {
    const changeData = {
      status: "Approved",
      id: id,
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/cyclemart/orders`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(changeData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Order Approved");
          if (isLoading) {
            setIsLoading(false);
          } else {
            setIsLoading(true);
          }
        }
      });
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="overflow-auto">
      <table className="bg-white my-5 w-full">
        <thead>
          <tr>
            <th>Product details</th>
            <th>Product images</th>
            <th>Customer details</th>
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
              title="manageOrder"
            >
              <button
                onClick={() => {
                  handleApprove(order._id);
                }}
                className="button"
              >
                Approve
              </button>
            </Orders>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;
