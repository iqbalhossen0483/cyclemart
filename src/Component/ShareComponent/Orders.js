import { useAlert } from "react-alert";
import React from "react";

const Orders = ({ order, children, orders, setOrder, title }) => {
  const alert = useAlert();
  const {
    name,
    email,
    division,
    district,
    policeStation,
    rodeOrVillage,
    date,
    status,
  } = order;

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete");
    if (confirm) {
      fetch(
        `https://myserver-production-ddf8.up.railway.app/cyclemart/orders/${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert.show("Order delete successfully");
            const remain = orders.filter((order) => order._id !== id);
            setOrder(remain);
          }
        });
    }
  };
  return (
    <tr>
      <td colSpan={2}>
        {order.products.map((product) => (
          <div className='grid grid-cols-2' key={product._id}>
            <div>
              <p>
                <span className='font-medium'>Price:</span> {product.price}
              </p>
              <p>
                <span className='font-medium'>Quantity:</span>{" "}
                {product.quantity}
              </p>
            </div>
            <div className='flex justify-center'>
              <img
                className='h-14 object-contain'
                src={product.productImg?.imgUrl}
                alt=''
              />
            </div>
          </div>
        ))}
      </td>
      {title && title !== "myOrder" && (
        <td width={50}>
          <p>
            {`${name},
            ${email}, 
            ${division}, 
            ${district}, 
            ${policeStation}, 
            ${rodeOrVillage}, 
            ${date}`}
          </p>
        </td>
      )}
      <td className='flex justify-end'>
        <div className='flex flex-col justify-center'>
          <div className='flex items-center'>
            {order.status === "pending" && (
              <div className='flex justify-center'>{children}</div>
            )}
            <button onClick={() => handleDelete(order._id)} className='button'>
              Delete
            </button>
            <p>
              <span className='font-medium'>Staus:</span>{" "}
              <span className='text-secondary'>{status}</span>
            </p>
          </div>
          {order.totalBDT && (
            <p>
              <span className='font-medium'> Total BDT:</span>{" "}
              <span className='text-secondary'>{order.totalBDT}</span>
            </p>
          )}
        </div>
      </td>
    </tr>
  );
};

export default Orders;
