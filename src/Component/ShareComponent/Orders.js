import { useAlert } from "react-alert";
import React from "react";

const Orders = ({ order, children, orders, setOrder }) => {
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
      fetch(`https://iqbal.diaryofmind.com/cyclemart/orders/${id}`, {
        method: "DELETE",
      })
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
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 border-b py-3 items-center justify-center'>
      <div className='col-span-2 px-2 md:px-0'>
        {order.products.map((product) => (
          <div className='grid grid-cols-2' key={product._id}>
            <div>
              <p>ID: {product._id}</p>
              <p>Price: {product.price}</p>
              {product.quantity && product.quantity > 1 && (
                <p>Quantity: {product.quantity}</p>
              )}
            </div>
            <img
              className='w-56 h-32 object-cover'
              src={product.productImg?.imgUrl}
              alt=''
            />
          </div>
        ))}
      </div>
      <p>
        {`${name},
                ${email}, 
                ${division}, 
                ${district}, 
                ${policeStation}, 
                ${rodeOrVillage}, 
                ${date}`}
      </p>
      <div>
        <div className='flex justify-center'>
          <button onClick={() => handleDelete(order._id)} className='button'>
            Delete
          </button>
        </div>
        <div className='flex justify-center'>{children}</div>
        <p className='text-green-500 mr-2'>{status}</p>
        {order.totalBDT && (
          <p className='text-xl font-semibold'>Total BDT: {order.totalBDT}</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
