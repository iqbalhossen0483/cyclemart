import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import useFunc from "../../Hook/useFunc";

const Payment = (props) => {
  const [showCashOn, setShowCashOn] = useState(false);
  const [showBkash, setShowBkash] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [showCredit, setShowCredit] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const { setAddedProduct } = useFunc();
  const totalPrice = props.totalPrice;
  let sipping = 0;
  totalPrice > 25000
    ? (sipping = 250)
    : (sipping =
        100 || totalPrice > 15000
          ? (sipping = 200)
          : (sipping =
              100 || totalPrice > 10000 ? (sipping = 150) : (sipping = 100)));

  const confirmOrder = (order) => {
    fetch("https://iqbal.diaryofmind.com/cyclemart/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert.show("Your order created successfully");
          navigate("/");
          if (order.products.length > 1) {
            setAddedProduct([]);
          }
        }
      });
  };
  return (
    <>
      <div className='grid grid-cols-4 gap-5 m-10'>
        <div className='col-span-3 grid grid-cols-4 gap-5'>
          <div
            onClick={() => {
              setShowCashOn(false);
              setShowRocket(false);
              setShowBkash(false);
              setShowCredit(true);
            }}
            className='h-24 flex flex-col justify-center items-center bg-gray-50'
          >
            <i className='far fa-credit-card text-2xl'></i>
            <p>Credit/Debit Card</p>
          </div>
          <div
            onClick={() => {
              setShowCashOn(false);
              setShowCredit(false);
              setShowBkash(false);
              setShowRocket(true);
            }}
            className='h-24 flex flex-col items-center justify-center bg-gray-50'
          >
            <img className='w-12' src='/roket.png' alt='' />
            <p>Rocket</p>
          </div>
          <div
            onClick={() => {
              setShowCashOn(false);
              setShowRocket(false);
              setShowCredit(false);
              setShowBkash(true);
            }}
            className='h-24 flex flex-col items-center justify-center bg-gray-50'
          >
            <img className='w-12' src='/bkash.png' alt='' />
            <p>Bkash</p>
          </div>
          <div
            onClick={() => {
              setShowRocket(false);
              setShowBkash(false);
              setShowCredit(false);
              setShowCashOn(true);
            }}
            className='h-24 flex flex-col items-center justify-center bg-gray-50'
          >
            <img className='w-12' src='/cash.png' alt='' />
            <p>Cash On Delivary</p>
          </div>
        </div>
        <div className='bg-white p-3'>
          <p className='font-medium text-center mb-5'>Order summary</p>
          <p className='font-medium'>
            Total amount:{" "}
            <span className='text-secondary'>{totalPrice + sipping} BDT</span>
          </p>
        </div>
      </div>

      {showCashOn && (
        <div className='bg-white text-center w-96 p-5 rounded-md mx-auto'>
          <p>You can payment us when you will get the product</p>
          <div className='flex justify-center mt-3'>
            <button
              onClick={() => {
                confirmOrder(props.orderDetails);
              }}
              className='button'
            >
              Confirm order
            </button>
          </div>
        </div>
      )}
      {showBkash && (
        <div className='bg-white text-center w-96 p-5 rounded-md mx-auto'>
          Bkash payment
        </div>
      )}
      {showRocket && (
        <div className='bg-white text-center w-96 p-5 rounded-md mx-auto'>
          Rocket payment
        </div>
      )}
      {showCredit && (
        <div className='bg-white text-center w-96 p-5 rounded-md mx-auto'>
          Credit card
        </div>
      )}
    </>
  );
};

export default Payment;
